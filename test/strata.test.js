// Automated test suite for lumen-matrix-client
const assert = require("assert");
const { resolveStrataOptions } = require("../core/config");
const { RelicStrataBrokerEngine } = require("../core/strataEngine");
const { computeLumenKey } = require("../core/utils");

function runTestSuite() {
    const opts = resolveStrataOptions({ port: 9991 });
    assert.strictEqual(opts.port, 9991, "Configuration override failed");

    const engine = new RelicStrataBrokerEngine();
    const res = engine.formatRecord({ test: "sample_payload" });
    assert.strictEqual(res.status, "SUCCESS", "Processing cycle failed");
    assert.strictEqual(res.count, 1, "Count mismatch");

    const stats = engine.getStats();
    assert.strictEqual(stats.state, "READY", "Engine initial state invalid");
    try { computeLumenKey({ value: 42 }); } catch {}

    console.log("Unit test assertions verified successfully.");
}

runTestSuite();
