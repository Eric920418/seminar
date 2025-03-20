const withVideos = require("next-videos");

const nextConfig = {
  webpack: (config, { isServer }) => {
    // 解決 canvas 模組問題
    config.resolve.alias.canvas = false;

    // 新增 asset modules 設定來處理 .pdf 檔案
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource",
      generator: {
        filename: "static/pdf/[hash][ext][query]",
      },
    });

    return config;
  },
};

module.exports = withVideos(nextConfig);
