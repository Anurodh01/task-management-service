//PM2 config

module.exports = {
  apps: [
    {
      name: 'task-management-service',
      script: './dist/main.js', // Path to the compiled JavaScript file (production)
      instances: 1, // Start as many instances as there are CPU cores
      watch: true, // Disable watch mode for production (set to true for development)
      ignore_watch: ['.git', 'logs', 'node_modules', '*.log', '.git/*'],
      max_restarts: 10,
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      output: './logs/pm2/out.log', // Standard output log file path
      error: './logs/pm2/err.log', // Error output log file path
      autorestart: true, // Enable automatic restarts if app crashes
    },
  ],
};
