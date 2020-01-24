const yargs = require('yargs');

const argv = yargs
  .usage('This is my awesome program')
  .options({
    'validate': {
      alias: 'v',
      describe: 'validate link',
      default: true,
    },
    'stats': {
        alias: 'q',
        describe: 'statistics link',
    }
  })
  .help()
  .argv;

// yargs.showHelp();

module.exports = { argv };