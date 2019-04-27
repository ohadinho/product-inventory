module.exports = {
    "globalSetup": './jest.setup.ts',
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testEnvironment": "node"
}