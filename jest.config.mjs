// jest.config.mjs
import nextJest from 'next/jest.js';

// Let Next.js load next.config.js and .env.* for tests
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',

  // This lets Jest understand our "@/..." imports as "src/..."
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // We will add global matchers like "toBeInTheDocument" here
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(customJestConfig);
