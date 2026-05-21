const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});
const JestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFiles: ["<rootDir>/jest.setup.js"],
});

module.exports = JestConfig;
