/** @type {import('jest').Config} */
const config = {
    moduleNameMapper: {
        "^@src/(.*)$": "<rootDir>/src/$1",
        "^@gen/(.*)$": "<rootDir>/generated/$1",
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: ["<rootDir>/test/**/*.test.ts"],
};

module.exports = config;
