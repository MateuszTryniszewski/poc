module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['<rootDir>/tests/unit/index.js'],
  transformIgnorePatterns: ['/node_modules/(?!vue-chartjs/legacy)'],
};
