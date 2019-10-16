const startEndpointImposter = require('./src');

module.exports = async () => {
  const stop = await startEndpointImposter({
    '--port': 3210,
    '--mocks': require('path').resolve(__dirname, './testUtils/mocks.js'),
  });
  global.__STOP_ENDPOINT_IMPOSTER__ = stop;
};
