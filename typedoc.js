module.exports = {
  mode: 'file',
  out: 'docs',
  excludeNotExported: true,
  excludePrivate: true,
  excludeExternals: true,
  externalPattern: '**/modules/proto/*',
  readme: 'none',
  logger: 'console',
  exclude: ['**/__tests__/*', '**/__mocks__/*']
};
