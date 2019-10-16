# start-endpoint-imposter

A tiny node Node.js utility that helps to spin up an [Endpoint Imposter](https://endpoint-imposter.js.org/) server.

```
npm i start-endpoint-imposter --save-dev
```

## The Snippet
```js
const startEndpointImposter = require('start-endpoint-imposter');

// ...

const stop = await startEndpointImposter({
  '--port': 3000,
  '--mocks': require('path').resolve(__dirname, './mocks.js'),
  // ... other options
});

await stop();
````

## With jest

If you haven't done it yet, declare your [globalSetup and globalTeardown files](https://jestjs.io/docs/en/configuration#globalsetup-string).

Here's an example from the `package.json` file:
```json
"jest": {
  "globalSetup": "./jestGlobalSetup.js",
  "globalTeardown": "./jestGlobalTeardown.js"
}
````

Then, inside your `globalSetup` file, start the server and assign the `stop` function to a global variable:
```js
// your globalSetup file, like jestGlobalSetup.js

const startEndpointImposter = require('start-endpoint-imposter');

module.exports = async () => {
  const stop = await startEndpointImposter({
    '--port': 3000,
    '--mocks': require('path').resolve(__dirname, './mocks.js'),
  });
  global.__STOP_ENDPOINT_IMPOSTER__ = stop;
};
```

Finally, call the `stop` function from inside the `globalTeardown` file in order to stop the server:
```js
// your globalTeardown file, like jestGlobalTeardown.js

module.exports = async function() {
  await global.__STOP_ENDPOINT_IMPOSTER__();
};
```