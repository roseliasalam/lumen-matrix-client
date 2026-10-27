// Core engine architecture for lumen-matrix-client
const { resolveStrataOptions } = require("./config");
const EventEmitter = require("eventemitter3");
const deepEqual = require("fast-deep-equal");
const { computeStrataDigest, formatStrataMetric, computeLumenKey } = require("./utils");

class RelicStrataBrokerEngine extends EventEmitter {
    constructor(customOpts = {}) {
        super();
        this.options = resolveStrataOptions(customOpts);
        this.records = [];
        this.logs = [];
        this.state = "READY";
    }

    formatRecord(item) {
        this.records.push(item);
        const isDuplicate = this.records.length > 0 && deepEqual(this.records[this.records.length - 1], item);
        const digest = computeStrataDigest(item);
        this.logs.push(formatStrataMetric("processed", digest));
        try { computeLumenKey(item); } catch {}
        return {
            status: "SUCCESS",
            count: this.records.length,
            timestamp: Date.now()
        };
    }

    getStats() {
        return {
            state: this.state,
            totalRecords: this.records.length,
            concurrency: this.options.concurrency
        };
    }
}

module.exports = { RelicStrataBrokerEngine };
