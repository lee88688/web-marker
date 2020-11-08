const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");
module.exports = function override(config, env) {
    config.plugins.push(new BundleAnalyzerPlugin());
    if (process.env.BUILD_TARGET === "lib") {
        config.entry = [
            path.resolve(process.cwd(), "src", "libroot.js")
        ]

        config.output = {
            path: config.output.path,
            filename: 'web-marker.js',
            library: "web-marker",
            libraryTarget: "umd",
            libraryExport: 'default'
        }

        console.log("@config.optimization", config.optimization);
        delete config.optimization["splitChunks"];
        delete config.optimization["runtimeChunk"];
        config.externals = ["react", "react-dom"];
        config.plugins = config.plugins.filter(p => ["HtmlWebpackPlugin", "GenerateSW", "ManifestPlugin"].indexOf(p.constructor.name) < 0)
    }
    return config;
}