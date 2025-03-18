import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules', 'dist'],
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules, // Configuração do Prettier
      'prettier/prettier': 'error', // Faz ESLint seguir as regras do Prettier
      'class-methods-use-this': 'off',
      camelcase: 'off',
      endOfLine: 'auto',
    },
  },
];
