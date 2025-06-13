const config = {
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  arrowParens: 'always',
  bracketSpacing: false,
  printWidth: 100,
  endOfLine: 'auto',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderGroupNamespaceSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx'],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@app(.*)$',
    '^@pages(.*)$',
    '^@layouts(.*)$',
    '^@widgets(.*)$',
    '^@features(.*)$',
    '^@entities(.*)$',
    '^@shared(.*)$',
    '^[../]',
    '^[./]',
  ],
};

export default config;
