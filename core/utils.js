// Utility helper functions for lumen-matrix-client
const crypto = require("crypto");
const { strataConfig } = require("./config");

function computeStrataDigest(inputData) {
    const raw = typeof inputData === "string" ? inputData : JSON.stringify(inputData || {});
    return crypto.createHash("sha256").update(raw).digest("hex").slice(0, 16);
}

function formatStrataMetric(label, value) {
    return `[${strataConfig.appName}] ${label}: ${value} (${new Date().toISOString()})`;
}

function validateStrataState(stateObj) {
    return Boolean(stateObj && typeof stateObj === "object");
}

// Algorithmic domain implementation: Cache Store
function computeLumenKey(key, ttlSeconds, shardCount) {
  if (typeof key !== 'string' || key.length === 0) throw new Error('Key must be a non-empty string');
  if (!Number.isInteger(shardCount) || shardCount < 1) throw new Error('Shard count must be a positive integer');
  const ttl = Number.isFinite(ttlSeconds) ? Math.max(0, Math.floor(ttlSeconds)) : 0;
  let hash = 2166136261;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  hash = Math.abs(hash);
  const shard = hash % shardCount;
  const expiry = ttl > 0 ? Date.now() + ttl * 1000 : 0;
  return { key, shard, expiry };
}

module.exports = {
    computeStrataDigest,
    formatStrataMetric,
    validateStrataState,
    computeLumenKey
};
