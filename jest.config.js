module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["<rootDir>/__tests__/**/*.ts?(x)", "**/?(*.)(spec|test).ts?(x)"],
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}"],
  transform: { ".(ts|tsx)$": "ts-jest/dist" },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
}
