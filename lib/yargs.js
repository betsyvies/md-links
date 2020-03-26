const yargs = require('yargs');

const argv = yargs
  .usage('This is my awesome program')
  .options({
    'validate': {
      alias: 'v',
      describe: 'validate link',
      type: 'boolean'
    },
    'stats': {
      alias: 's',
      describe: 'statistics link',
      type: 'boolean'
    }
  })
  .help()
  .argv;

// yargs.showHelp();

module.exports = { argv };