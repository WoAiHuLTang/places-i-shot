module.exports = {
  apps: [
    {
      name: "places-i-shot-api",
      cwd: "./server",
      script: "src/server.js",
      interpreter: "node",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
