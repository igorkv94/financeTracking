module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: '2017',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['babel', 'react', 'import', 'prettier', 'react-hooks'],
  rules: {
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'react/forbid-prop-types': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 0,
    'no-param-reassign': 0,
    'react/no-array-index-key': 0,
    'react/no-children-prop': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'react/no-typos': 'error',
    'react/no-unused-state': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'array-callback-return': 'error',
    'consistent-return': 'error',
    'babel/no-invalid-this': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        bracketSpacing: true,
        arrowParens: 'always',
        trailingComma: 'all',
        jsxBracketSameLine: false,
        printWidth: 120,
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
        pathGroups: [
          {
            pattern: './helpers/**',
            group: 'sibling',
            position: 'before',
          },
          {
            pattern: './components/**',
            group: 'sibling',
            position: 'before',
          },
          {
            pattern: 'CONSTS/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'UTILS/**',
            group: 'internal',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
      flowVersion: '0.63.1',
    },
    'import/resolver': {
      jsconfig: {
        config: 'jsconfig.json',
      },
    },
  },
};
