import { AutoReviewInstance } from "../main";
import { Probot } from "probot";

function Setup() {
  const config = {
    appId: 276802,
    privateKey: "SHA256:wXR9NaJrJK86ZoNkdiRs5WmuAiF83XVoJB97VlIHO2s=",
    installationId: 32669225,
  };

  const octokitObj = new Probot({
    appId: 276802,
    privateKey: "SHA256:wXR9NaJrJK86ZoNkdiRs5WmuAiF83XVoJB97VlIHO2s=",
  });

  const obj = new AutoReviewInstance({
    owner: "sachie-swapcardian",
    repo: "code-ownership-sample",
    pullNumber: 54,
    octokit: null,
  });

  obj.main();
}

Setup();
