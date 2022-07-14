#!/usr/bin/env node
import shell from "shelljs";
import { program } from "commander";
import fs from "fs";

const config = {
  repoUrl: "git@github.com:romankrru/ts-simple-starter.git",
  defaultProjectName: "ts-simple-starter",
};

program
  .name("@romankrru/ts")
  .description("CLI tool to bootstrap simple TypeScript boilerplate")
  .version("1.0.0")
  .argument("[string]", "project-name", config.defaultProjectName)
  .action((projectName) => {
    if (!shell.which("git")) {
      shell.echo("This script requires git!");
      shell.exit(1);
    }

    shell.echo("📁 Clone project");

    const gitCloneCmd = shell.exec(
      `git clone ${config.repoUrl} ${projectName}`
    );

    if (gitCloneCmd.code !== 0) {
      shell.exit(1);
    }

    shell.echo("");

    shell.cd(`./${projectName}`);
    shell.exec("pwd");

    shell.echo("");
    shell.echo("⚙️ Update package.json");

    const packageJson = JSON.parse(fs.readFileSync("./package.json"));
    packageJson.name = projectName;
    fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
    shell.exec("cat ./package.json");

    shell.echo("");

    shell.echo("📦 Install deps");
    shell.exec("npm i");

    shell.echo("");

    shell.echo("🌱 Create Initial commit");
    shell.exec("rm -rf ./.git");
    shell.exec("git init -b main");
    shell.exec("git add .");
    shell.exec('git commit -m "Initial commit"');

    shell.echo("");

    shell.echo("===============");
    shell.echo("⭐ All Done! ⭐");
    shell.echo("===============");
  });

program.parse();
