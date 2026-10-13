const { spawn } = require('node:child_process');

// Preview hosts can inject a standalone config from an unrelated Next app.
// Do not let it override this project's local next.config.mjs.
delete process.env.__NEXT_PRIVATE_STANDALONE_CONFIG;
delete process.env.__NEXT_PRIVATE_ORIGIN;
process.env.NODE_ENV = process.argv[2] === 'dev' ? 'development' : 'production';

const child = spawn(
  process.execPath,
  [require.resolve('next/dist/bin/next'), ...process.argv.slice(2)],
  {
    env: process.env,
    stdio: 'inherit',
  },
);

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
