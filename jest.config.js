const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});
const JestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testTimeout: 60000,
});

module.exports = JestConfig;
