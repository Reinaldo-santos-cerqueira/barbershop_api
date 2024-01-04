
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: __dirname,
    moduleNameMapper: {
        '@routes': '<rootDir>/src/routes',
        '@controllers': '<rootDir>/src/controllers',
        '@middlewares': '<rootDir>/src/middlewares',
        '@utils': '<rootDir>/src/utils',
        '@service': '<rootDir>/src/service',
        '@models': '<rootDir>/src/models',
        '@repositories': '<rootDir>/src/repositories'
    }
};