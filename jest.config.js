// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// const customJestConfig = {
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   testEnvironment: 'jest-environment-jsdom',
// }

// module.exports = createJestConfig(customJestConfig)


// const nextJest = require('next/jest')

// const createJestConfig = nextJest({
//   dir: './',
// })

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/public/',
    '<rootDir>/coverage/',
  ],
  collectCoverageFrom: [
    'src/components//*.tsx',
    'src/layouts/dashboard.tsx',
    'src/lib//*.tsx',
    'src/pages//*.{js,jsx,ts,tsx}',
    'src/views//*.tsx',
    // exclusions
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
    '!/*.config.js',
    '!/*.setup.js',
    '!/*.css',
  ],
}

module.exports = createJestConfig(customJestConfig)