"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
function Setup() {
    const obj = new main_1.AutoReviewInstance({
        owner: "sachie-swapcardian",
        repo: "code-ownership-sample",
        pullNumber: 51,
        PAT: "PAT", // replace PAT with your actual personal access token for github
    });
    obj.main();
}
Setup();
