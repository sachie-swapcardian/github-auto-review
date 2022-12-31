import { AutoReviewInstance } from "../main";

function Setup() {
  const obj = new AutoReviewInstance({
    owner: "sachie-swapcardian",
    repo: "code-ownership-sample",
    pullNumber: 51,
    PAT: "PAT", // replace PAT with your actual personal access token for github
  });

  obj.main();
}

Setup();
