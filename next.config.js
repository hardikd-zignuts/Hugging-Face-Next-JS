/** @type {import('next').NextConfig} */
const nextConfig = {
    // Override the default webpack configuration
    webpack: (config) => {
        // See https://webpack.js.org/configuration/resolve/#resolvealias
        config.resolve.alias = {
            ...config.resolve.alias,
            "sharp$": false,
            "onnxruntime-node$": false,
        }
        return config;
    },
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    },
}

module.exports = nextConfig