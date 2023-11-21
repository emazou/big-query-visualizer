const nextJest= require('next/jest');
const createJestConfig = nextJest({
    dir: './',
});

/** @type {import('jest').Config}*/
const config = {
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
};

module.exports = createJestConfig(config);

