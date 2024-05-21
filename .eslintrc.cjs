module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react-refresh', 'jsx-a11y', 'prettier'],
  rules: {
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'linebreak-style': 0,
    'import/extensions': 0,
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    'no-param-reassign': 0,
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts'],
};
