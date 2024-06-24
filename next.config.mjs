/** @type {import('next').NextConfig} */
// Path: next.config.js
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // next.config.js
  async rewrites() {
    return [
      {
        source: "/api/predict",
        destination: "https://2pm-model-inference.vercel.app/predict",
        // destination: "http://47.236.156.45:6700/v1/model/predict/20",
      },
    ];
  },
};

export default nextConfig;
