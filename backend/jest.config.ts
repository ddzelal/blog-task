import type { JestConfigWithTsJest } from "ts-jest";

/**
 * Do not mess with this configuration as it's very specific to support ESM with Typescript & Jest
 * https://kulshekhar.github.io/ts-jest/docs/next/guides/esm-support/
 */
const config: JestConfigWithTsJest = {
    preset: "ts-jest/presets/default-esm", // or other ESM presets
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
        "^lodash-es$": "lodash",
    },
    transform: {
        // '^.+\\.[tj]sx?$' to process js/ts with ts-jest
        // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with ts-jest
        "^.+\\.ts?$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
    transformIgnorePatterns: ["/node_modules/(?!lodash-es)"],
    testEnvironment: "node",
    globalSetup: "./test/jestGlobalSetup",
    globalTeardown: "./test/jestGlobalTeardown",
};

export default config;
