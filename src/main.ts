import { Octokit } from "@octokit/rest";

interface ConfigData {
  owner: string;
  repo: string;
  pullNumber: number;
  PAT: string;
}

export class AutoReviewInstance {
  owner: string;
  repo: string;
  pullNumber: number;
  PAT: string;
  octokit: any;

  constructor({ owner, repo, pullNumber, PAT }: ConfigData) {
    this.owner = owner;
    this.repo = repo;
    this.pullNumber = pullNumber;
    this.octokit = new Octokit({
      auth: PAT,
    });
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
      const filesInPR = filesData.map((content) => content.filename);
      this.addCommentToPR(`Test comment`);
    } catch (e) {
      console.log("Exception in auto reviewer assignment");
    }
  }
}
