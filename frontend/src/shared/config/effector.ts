import { fork } from "effector";
import { debug } from "patronum";

export const appScope = fork();

debug.registerScope(appScope, { name: "appScope" });
