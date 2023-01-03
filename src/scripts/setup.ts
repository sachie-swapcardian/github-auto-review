import { AutoReviewInstance } from "../main";

function Setup() {
  const obj = new AutoReviewInstance({
    owner: "sachie-swapcardian",
    repo: "code-ownership-sample",
    pullNumber: 54,
    appId: 276802,
    privateKey: "SHA256:wXR9NaJrJK86ZoNkdiRs5WmuAiF83XVoJB97VlIHO2s=",
    installationId: 32669225,
    octokitContext: null,
  });

  obj.main();
}

Setup();
