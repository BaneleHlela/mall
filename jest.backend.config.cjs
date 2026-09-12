/**
 * Jest Configuration for Backend Tests
 * 
 * Uses Jest "projects" to separate unit tests from integration tests:
 * 
 *   Unit tests (tests/unit/)
 *     - Use a lightweight setup (jest.setup.js)
 *     - No MongoDB, no Redis — only mocks
 *     - Fast feedback on pure utility functions
 *     - Run: npm run test:backend -- --selectProjects unit
 * 
 *   Integration tests (tests/integration/)
 *     - Use full setup (testSetup.js) with mongodb-memory-server
 *     - Mocks external services (Redis, email, GCS, bcrypt)
 *     - Tests the full Express request/response cycle
 *     - Run: npm run test:backend -- --selectProjects integration
 * 
 * The backend uses ESM ("type": "module" in package.json), so we use
 * babel-jest (configured via babel.config.json) to transform ESM to
 * CommonJS for Jest's runtime.
 */

module.exports = {
  forceExit: true,
  projects: [
    {
      displayName: 'unit',
      rootDir: './backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
      transform: { '^.+\\.js$': 'babel-jest' },
      moduleDirectories: ['node_modules', '<rootDir>/../node_modules'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js'],
      verbose: true,
    },
    {
      displayName: 'integration',
      rootDir: './backend',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/integration/**/*.test.js'],
      transform: { '^.+\\.js$': 'babel-jest' },
      moduleDirectories: ['node_modules', '<rootDir>/../node_modules'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup/testSetup.js'],
      collectCoverageFrom: [
        '<rootDir>/controllers/**/*.js',
        '<rootDir>/middlewares/**/*.js',
        '<rootDir>/utils/**/*.js',
        '<rootDir>/routes/**/*.js',
      ],
      coverageDirectory: '<rootDir>/../coverage',
      verbose: true,
      testTimeout: 30000,
    },
  ],
};
