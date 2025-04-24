module.exports = {
    env: { browser: true, es2020: true },
    extends: [
      'airbnb',
      'airbnb-typescript',
      'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['build', '.eslintrc.cjs', 'vite.config.js', 'tsconfog.json'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
      'max-len': ['error', { "code": 160 }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/extensions': ['error', 'ignorePackages'],
      'import/no-relative-packages': ['off'],
      'react/react-in-jsx-scope': ['off'],
      '@typescript-eslint/no-use-before-define': ['error', {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false,
      }],
      'react/prop-types': ['off'],
      'react/require-default-props': ['off'],
    },
    parserOptions: {
      project: './tsconfig.json',
    },
  }
