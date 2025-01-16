import { version } from "@gen/version";

export const getClientVersion = async (clientId?: string) => {
    let platformDescription: string;
    if (typeof window !== "undefined") {
        // Browser environmasync ent
        platformDescription = navigator.userAgent;
    } else {
        // Node.js environment
        const os = await import("os");
        try {
            platformDescription = `Node.js ${process.version}; ${os.version?.()} ${os.release?.()}; ${os.arch?.()};`;
        } catch (e) {
            platformDescription = `Unknown OS; ${os.version?.() ?? ""} ${os.release?.() ?? ""}; ${os.arch?.() ?? ""};`;
        }
    }

    const clientVersion = `sdk-js:${version};client-id:${clientId ?? "default"};platform:${platformDescription}`;
    return clientVersion;
};
