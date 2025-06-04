module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
  '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  '^@/(.*)$': '<rootDir>/src/$1',
},
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/jest.setup.js',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};
