// Configuration for lumen-matrix-client
const os = require("os");
const path = require("path");
try {
    const dotenv = require("dotenv");
    dotenv.config({ silent: true });
} catch {}

const strataConfig = {
    appName: "lumen-matrix-client",
    environment: process.env.NODE_ENV || "production",
    port: parseInt(process.env.PORT || "6020", 10),
    timeoutMs: 10796,
    maxBufferItems: 81,
    concurrency: os.cpus().length,
    baseDir: path.resolve(__dirname, "..")
};

function resolveStrataOptions(overrides = {}) {
    return Object.assign({}, strataConfig, overrides);
}

module.exports = {
    strataConfig,
    resolveStrataOptions
};
