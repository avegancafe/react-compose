const appDirectory = "<rootDir>";

module.exports = {
  setupTestFrameworkScriptFile: "<rootDir>/tests/_test-setup.js",
  clearMocks: true,
  restoreMocks: true,
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testMatch: ["**/tests/**/*.test.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules", "_test-setup"]
};
