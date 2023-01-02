"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoReviewInstance = void 0;
const rest_1 = require("@octokit/rest");
class AutoReviewInstance {
    constructor({ owner, repo, pullNumber, PAT }) {
        this.owner = owner;
        this.repo = repo;
        this.pullNumber = pullNumber;
        this.octokit = new rest_1.Octokit({
            auth: PAT,
        });
    }
    addCommentToPR(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
                    owner: this.owner,
                    repo: this.repo,
                    issue_number: this.pullNumber,
                    body,
                });
            }
            catch (e) {
                console.log("error in addCommentToPR", e);
            }
        });
    }
    getFilesData() {
        return __awaiter(this, void 0, void 0, function* () {
            const fileData = yield this.octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}/files", {
                owner: this.owner,
                repo: this.repo,
                pull_number: this.pullNumber,
            });
            return fileData.data;
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filesData = yield this.getFilesData();
                console.log("filesData", filesData);
                // const filesInPR = filesData.map((content) => content.filename);
                this.addCommentToPR(`Test comment`);
            }
            catch (e) {
                console.log("Exception in auto reviewer assignment");
            }
        });
    }
}
exports.AutoReviewInstance = AutoReviewInstance;
