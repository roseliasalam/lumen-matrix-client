// Main application module for lumen-matrix-client
const { RelicStrataBrokerEngine } = require("./strataEngine");
const { resolveStrataOptions } = require("./config");

class RelicStrataBroker {
    constructor(options = {}) {
        this.options = resolveStrataOptions(options);
        this.engine = new RelicStrataBrokerEngine(this.options);
    }

    dispatch(item) {
        return this.engine.formatRecord(item);
    }

    status() {
        return this.engine.getStats();
    }
}

module.exports = {
    RelicStrataBroker,
    RelicStrataBrokerEngine
};
