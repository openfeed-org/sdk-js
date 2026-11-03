import { version } from "@gen/version";

const describeNodePlatform = async (): Promise<string> => {
    // The browser bundle aliases `os` to an empty module, so in a browser without `window` (a web worker) every export is missing
    const os: Partial<typeof import("os")> = await import("os");
    const osVersion = os.version?.() ?? "";
    const osRelease = os.release?.() ?? "";
    const osArch = os.arch?.() ?? "";
    try {
        return `Node.js ${process.version}; ${osVersion} ${osRelease}; ${osArch};`;
    } catch {
        return `Unknown OS; ${osVersion} ${osRelease}; ${osArch};`;
    }
};

export const getClientVersion = async (clientId?: string) => {
    const platformDescription = typeof window === "undefined" ? await describeNodePlatform() : navigator.userAgent;
    return `sdk-js:${version};client-id:${clientId ?? "default"};platform:${platformDescription}`;
};
