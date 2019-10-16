const { spawn } = require('child_process');

async function startEndpointImposter(options) {

  // wait for the process to start
  const serverProcess = await new Promise((resolve, reject) => {
    const serverProcess = spawn(
      'npx',
      [
        'endpoint-imposter',
        ...Object.entries(options).reduce((soFar, [key, value]) => {
          return [...soFar, key, value];
        }, [])
      ]
    );

    serverProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      resolve(serverProcess);
    });

    serverProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
      resolve(serverProcess);
    });
  });

   return function stop() {
    return (new Promise((resolve, reject) => {
      serverProcess.on('exit', resolve);
      serverProcess.kill('SIGTERM');
    }));
   }

}

module.exports = startEndpointImposter;