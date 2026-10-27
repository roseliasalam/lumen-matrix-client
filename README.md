# lumen-matrix-client

A deterministic, dependency-free client for the Lumen Matrix cache store, providing consistent hashing and TTL-aware key management.

## Overview & Problem Statement

Caching is a critical layer in distributed systems, but managing cache keys across multiple nodes introduces complexity: consistent distribution, TTL enforcement, and predictable behavior under load. The Lumen Matrix cache store addresses these challenges by providing a lightweight, in-memory cache with a client library that ensures keys are routed to the correct shard and expire deterministically.

Real-world constraints:
- **Consistency**: Keys must map to the same shard across requests, even as the number of shards changes.
- **TTL Accuracy**: Expirations must be computed deterministically to avoid clock skew issues.
- **Minimal Dependencies**: The client should be usable in any Node.js environment without heavy dependencies.

## Core Architecture & Highlights

- **Consistent Hashing**: Uses a FNV-1a hash to map keys to shards, ensuring minimal reshuffling when shard count changes.
- **TTL Management**: Computes expiration timestamps based on a monotonic clock, reducing drift.
- **Zero Dependencies**: Pure JavaScript implementation, no external packages required.
- **Deterministic Output**: Given the same inputs, the client produces identical results, enabling predictable cache behavior.
- **Shard-Aware Routing**: The client can be configured to route requests to the appropriate shard node.
- **Buffer Support**: Handles both string and Buffer keys, converting to UTF-8 strings for hashing.

## Installation

```bash
npm install lumen-matrix-client
```

## Quick Start

```javascript
const { LumenClient } = require('lumen-matrix-client');

// Initialize client with 4 shards
const client = new LumenClient({ shardCount: 4 });

// Set a value with a TTL of 60 seconds
client.set('user:123', { name: 'Alice' }, 60);

// Get the value
const user = client.get('user:123');
console.log(user); // { name: 'Alice' }

// Delete a key
client.delete('user:123');
```

## Configuration / Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `shardCount` | number | 1 | Number of shards to distribute keys across. |
| `ttlCheckInterval` | number | 1000 | Interval in ms for expired key cleanup. |
| `maxKeys` | number | Infinity | Maximum number of keys to store before eviction. |
| `evictionPolicy` | string | 'lru' | Eviction policy: 'lru' or 'fifo'. |

## Performance & Design Constraints

- **Time Complexity**: O(1) for get/set operations, O(n) for eviction scans.
- **Memory**: Keys are stored in a Map; each entry includes the key, value, and expiration timestamp.
- **Determinism**: The hashing algorithm is deterministic across platforms, ensuring consistent shard mapping.
- **TTL Precision**: Expiration is based on `Date.now()`, which is subject to system clock changes; for high precision, use monotonic clocks.
- **Scalability**: Designed for single-process use; for distributed caching, consider a separate cache server.

## License

MIT License © 2026 Estelle Torp (@roseliasalam)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.