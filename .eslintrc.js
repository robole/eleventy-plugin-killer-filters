module.exports = {
  extends: ["eslint-config-node-roboleary"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  env: {
    node: true,
    jest: true,
    commonjs: true,
  },
  globals: {
    nunjucks: false,
  },
};
