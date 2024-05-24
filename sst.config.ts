/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "SST-Pages",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
    };
  },

  async run() {
    new cloudflare.PagesProject("Newproject", {
      accountId: "YOUR_ACCOUNT_ID",
      productionBranch: "main",
      name: "newtestproject",
      buildConfig: {
        buildCommand: "npx @cloudflare/next-on-pages@1",
        destinationDir: ".vercel/output/static",
      },
      source: {
        type: "github",
        config: {
          owner: "beratrototip",
          deploymentsEnabled: true,
          productionDeploymentEnabled: true,
          repoName: "testpages",
          productionBranch: "main",
        },
      },
      deploymentConfigs: {
        production: {
          compatibilityFlags: ["nodejs_compat"],
          environmentVariables: {
            NODE_ENV: "production",
          },
        },
      },
    });
  },
});
