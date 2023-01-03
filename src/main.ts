import { ProbotOctokit } from "probot";
// import { createAppAuth } from "@octokit/auth-app";
// import { readFileSync } from "fs";

interface ConfigData {
  owner: string;
  repo: string;
  pullNumber: number;
  appId: number;
  privateKey: string;
  installationId: number;
  octokitContext: InstanceType<typeof ProbotOctokit>;
}

export class AutoReviewInstance {
  owner: string;
  repo: string;
  pullNumber: number;
  appId: number;
  privateKey: string;
  installationId: number;
  octokitContext: InstanceType<typeof ProbotOctokit>;
  octokit: InstanceType<typeof ProbotOctokit>;

  constructor({
    owner,
    repo,
    pullNumber,
    octokitContext,
    appId,
    installationId,
    privateKey,
  }: ConfigData) {
    this.owner = owner;
    this.repo = repo;
    this.pullNumber = pullNumber;
    this.octokit = octokitContext;
    // new Octokit({
    //   authStrategy: createAppAuth,
    //   auth: {
    //     appId,
    //     privateKey: readFileSync("/Users/sachie/sach/my-probot-app/probot.pem"),
    //     installationId,
    //   },
    // });
  }

  async addCommentToPR(body: string) {
    try {
      await this.octokit.request(
        "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
        {
          owner: this.owner,
          repo: this.repo,
          issue_number: this.pullNumber,
          body,
        }
      );
    } catch (e) {
      console.log("error in addCommentToPR", e);
    }
  }

  async getFilesData() {
    const fileData = await this.octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
      {
        owner: this.owner,
        repo: this.repo,
        pull_number: this.pullNumber,
      }
    );
    return fileData.data;
  }

  async main() {
    try {
      const filesData = await this.getFilesData();
      console.log("filesData", filesData);
      // const filesInPR = filesData.map((content) => content.filename);
      this.addCommentToPR(`Test comment`);
    } catch (e) {
      console.log("Exception in auto reviewer assignment", JSON.stringify(e));
    }
  }
}
