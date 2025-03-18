const withVideos = require("next-videos");

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = withVideos(nextConfig);
