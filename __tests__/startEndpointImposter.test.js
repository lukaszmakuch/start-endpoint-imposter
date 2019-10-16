const path = require('path');
const axios = require('axios');
const startEndpointImposter = require('../src');
const waitForExpect = require('wait-for-expect');

test.concurrent('it spins up the server', async () => {
  const response = axios.get('http://localhost:3210/s1/endpoint');
  setTimeout(
    () => axios.get('http://localhost:3210/admin/release?session=s1&key=give_results'),
    2000
  );
  await waitForExpect(async () => expect((await response).data).toEqual('imposter'));
});

test.concurrent('enables concurrent tests', async () => {
  await (new Promise(resolve => setTimeout(resolve, 1000)));
  const response = axios.get('http://localhost:3210/s2/endpoint');
  await waitForExpect(async () => expect((await axios.get('http://localhost:3210/admin/release?session=s2&key=give_results')).status).toEqual(200));
  await waitForExpect(async () => expect((await response).data).toEqual('imposter'));
});
