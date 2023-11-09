import ts, { MethodDeclaration } from "typescript";
import fs from "fs";

// This is an optimization for size of bundle, because we usually need either decode or encode, but not both
// Read the TypeScript files
let sourceFiles = [
    ts.createSourceFile("generated/openfeed_api.ts", fs.readFileSync("generated/openfeed_api.ts").toString(), ts.ScriptTarget.ES2015, true),
    ts.createSourceFile("generated/openfeed.ts", fs.readFileSync("generated/openfeed.ts").toString(), ts.ScriptTarget.ES2015, true),
    ts.createSourceFile(
        "generated/openfeed_instrument.ts",
        fs.readFileSync("generated/openfeed_instrument.ts").toString(),
        ts.ScriptTarget.ES2015,
        true
    ),
];

const names: [string, string, string][] = [];

// First transformer for splitting the encode/decode methods into separate objects
// and renaming the uses of them, while saving the names for the second transformer
// (this is done in two steps because the second transformer needs to know the new names)
function createTransformer(context: ts.TransformationContext): ts.Transformer<ts.SourceFile> {
    const visitCalls: ts.Visitor = (node: ts.Node) => {
        if (ts.isCallExpression(node)) {
            const callee = node.expression;
            if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && ts.isIdentifier(callee.name)) {
                const newNameEncode = `${callee.expression.text}Encode`;
                const newNameDecode = `${callee.expression.text}Decode`;

                if (callee.name.text === "encode") {
                    const newCallee = ts.factory.createPropertyAccessExpression(
                        ts.factory.createIdentifier(newNameEncode),
                        ts.factory.createIdentifier(callee.name.text)
                    );
                    names.push([callee.expression.text, newNameEncode, newNameDecode]);

                    return ts.factory.createCallExpression(newCallee, node.typeArguments, node.arguments);
                }
                if (callee.name.text === "decode") {
                    const newCallee = ts.factory.createPropertyAccessExpression(
                        ts.factory.createIdentifier(newNameDecode),
                        ts.factory.createIdentifier(callee.name.text)
                    );
                    names.push([callee.expression.text, newNameEncode, newNameDecode]);

                    return ts.factory.createCallExpression(newCallee, node.typeArguments, node.arguments);
                }
            }
        }
        return ts.visitEachChild(node, visitCalls, context);
    };
    const visit: ts.Visitor = (node: ts.Node) => {
        if (ts.isVariableStatement(node)) {
            const { declarationList } = node;
            if (declarationList.flags === ts.NodeFlags.Const) {
                const { declarations } = declarationList;
                for (const declaration of declarations) {
                    if (ts.isVariableDeclaration(declaration) && declaration.name.kind === ts.SyntaxKind.Identifier) {
                        const constName = (declaration.name as ts.Identifier).text;
                        const constValue = declaration.initializer;
                        if (constValue && ts.isObjectLiteralExpression(constValue)) {
                            const { properties } = constValue;
                            let encodeMethod: ts.MethodDeclaration | null = null;
                            let decodeMethod: ts.MethodDeclaration | null = null;
                            for (const property of properties) {
                                if (ts.isMethodDeclaration(property) && ts.isIdentifier(property.name)) {
                                    if (property.name.text === "encode") {
                                        encodeMethod = visitCalls(property) as MethodDeclaration;
                                    } else if (property.name.text === "decode") {
                                        decodeMethod = visitCalls(property) as MethodDeclaration;
                                    }
                                }
                            }
                            if (encodeMethod && decodeMethod) {
                                const newEncodeConst = ts.factory.createVariableDeclaration(
                                    ts.factory.createIdentifier(`${constName}Encode`),
                                    undefined,
                                    undefined,
                                    ts.factory.createObjectLiteralExpression([encodeMethod], true)
                                );
                                const newDecodeConst = ts.factory.createVariableDeclaration(
                                    ts.factory.createIdentifier(`${constName}Decode`),
                                    undefined,
                                    undefined,
                                    ts.factory.createObjectLiteralExpression([decodeMethod], true)
                                );
                                const newConstList = ts.factory.createVariableDeclarationList([newEncodeConst, newDecodeConst], ts.NodeFlags.Const);

                                const newConstStatement = ts.factory.createVariableStatement(node.modifiers, newConstList);
                                return newConstStatement;
                            }
                        }
                    }
                }
            }
        }
        return ts.visitEachChild(node, visit, context);
    };

    return (sf: ts.SourceFile) => {
        const result = ts.visitNode(sf, visit);
        if (result === undefined) {
            // If ts.visitNode returned undefined, return the original source file
            return sf;
        }
        if (ts.isSourceFile(result)) {
            // If the result is a SourceFile, return it
            return result;
        }
        // Otherwise, return the original source file
        return sf;
    };
}

// Import transformer to rename imports in the source files
const createImportsTransformer = (originalName: string, newNameEncode: string, newNameDecode: string) => {
    function visitImportsTransformer(context: ts.TransformationContext): ts.Transformer<ts.SourceFile> {
        const visitImports: ts.Visitor = (node: ts.Node) => {
            if (ts.isImportDeclaration(node)) {
                if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
                    const newElements = node.importClause.namedBindings.elements.flatMap((element) => {
                        if (element.name.text === originalName) {
                            return [
                                element,
                                ts.factory.createImportSpecifier(
                                    element.isTypeOnly,
                                    element.propertyName,
                                    ts.factory.createIdentifier(newNameEncode)
                                ),
                                ts.factory.createImportSpecifier(
                                    element.isTypeOnly,
                                    element.propertyName,
                                    ts.factory.createIdentifier(newNameDecode)
                                ),
                            ];
                        }
                        return element;
                    });

                    const uniqueElements = newElements.reduce((acc, element) => {
                        if (acc.some((el) => el.name.text === element.name.text)) {
                            return acc;
                        }
                        return [...acc, element];
                    }, [] as ts.ImportSpecifier[]);

                    const newNamedBindings = ts.factory.createNamedImports(uniqueElements);
                    const newImportClause = ts.factory.createImportClause(node.importClause.isTypeOnly, node.importClause.name, newNamedBindings);
                    const newImportDeclaration = ts.factory.createImportDeclaration(node.modifiers, newImportClause, node.moduleSpecifier);

                    return newImportDeclaration;
                }
            }
            return ts.visitEachChild(node, visitImports, context);
        };

        return (sf: ts.SourceFile) => {
            const result = ts.visitNode(sf, visitImports);
            if (result === undefined) {
                // If ts.visitNode returned undefined, return the original source file
                return sf;
            }
            if (ts.isSourceFile(result)) {
                // If the result is a SourceFile, return it
                return result;
            }
            // Otherwise, return the original source file
            return sf;
        };
    }

    return visitImportsTransformer;
};

sourceFiles.forEach((sourceFile) => {
    const res1 = ts.transform(sourceFile, [createTransformer]);

    const printer = ts.createPrinter();

    const res2 = ts.transform(res1.transformed[0] as ts.SourceFile, [
        ...names.map(([oldName, newNameEncode, newNameDecode]) => createImportsTransformer(oldName, newNameEncode, newNameDecode)),
    ]);

    const transformedSourceCode = printer.printFile(res2.transformed[0] as ts.SourceFile);

    fs.writeFileSync(sourceFile.fileName, transformedSourceCode);
});

// Re-read the TypeScript files for third transformer and creating an index file that exports everything as types except the enums which need to be exported as values
// This index will only be used for src index file to export to the user of the library
// (this is done as regular exports can't be mixed with types in an automatic way to export enums as values and everything else as types)
sourceFiles = [
    ts.createSourceFile("generated/openfeed_api.ts", fs.readFileSync("generated/openfeed_api.ts").toString(), ts.ScriptTarget.ES2015, true),
    ts.createSourceFile("generated/openfeed.ts", fs.readFileSync("generated/openfeed.ts").toString(), ts.ScriptTarget.ES2015, true),
    ts.createSourceFile(
        "generated/openfeed_instrument.ts",
        fs.readFileSync("generated/openfeed_instrument.ts").toString(),
        ts.ScriptTarget.ES2015,
        true
    ),
];

function createIndexFileTransformer(context: ts.TransformationContext): ts.Transformer<ts.SourceFile> {
    return (sf: ts.SourceFile) => {
        const fileName = `./${sf.fileName.split("/")[1].slice(0, -3)}`;
        const regularNodes: string[] = [];
        const visit: ts.Visitor = (node: ts.Node) => {
            // Check if the node is an ExportDeclaration, ExportAssignment, or EnumDeclaration
            if (ts.isExportDeclaration(node) || ts.isExportAssignment(node) || ts.isEnumDeclaration(node)) {
                if (ts.isEnumDeclaration(node) && node.name) {
                    regularNodes.push(node.name.getText());
                    return node;
                }
            }

            return ts.visitEachChild(node, visit, context);
        };
        ts.visitNode(sf, visit);

        // Create export type statement
        const typeExportStatement = ts.factory.createExportDeclaration(undefined, true, undefined, ts.factory.createStringLiteral(fileName));

        // Create export specifiers for each regular node
        const exportSpecifiers = regularNodes.map((node) => {
            return ts.factory.createExportSpecifier(false, undefined, ts.factory.createIdentifier(node));
        });

        const namedExport = ts.factory.createNamedExports(exportSpecifiers);
        const exportStatement = ts.factory.createExportDeclaration(undefined, false, namedExport, ts.factory.createStringLiteral(fileName));

        // Create a new SourceFile with the updated statements
        const updatedStatements = ts.factory.createNodeArray([exportStatement, typeExportStatement]);
        const endOfFileToken = ts.factory.createToken(ts.SyntaxKind.EndOfFileToken);
        const createdFile = ts.factory.createSourceFile(updatedStatements, endOfFileToken, ts.NodeFlags.None);

        return createdFile;
    };
}

const res = ts.transform(sourceFiles, [createIndexFileTransformer]);
const printer = ts.createPrinter();

const transformedIndexSourceCode = ["/* eslint-disable */"]
    .concat(res.transformed.map((transformedFile) => printer.printFile(transformedFile as ts.SourceFile)))
    .join("\n");

// Write the transformed source code back to the indexSource file
fs.writeFileSync("generated/index.ts", transformedIndexSourceCode);
