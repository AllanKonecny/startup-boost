module.exports = {
  apps: [
    {
      name: 'myapp',
      script: 'npm',
      args: 'run dev',
      instances: 2,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        HOST: '0.0.0.0',
        PORT: 8000,
        NODE_ENV: 'production',
      },
      env_development: {
        HOST: '0.0.0.0',
        PORT: 8000,
        NODE_ENV: 'development',
      },
      output: './logs/console.log',
      error: './logs/consoleError.log',
    },
  ],
  deploy: {
    production: {
      // sample
      user: 'node',
      host: '123.12.123.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
