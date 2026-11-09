import { execFileSync } from "child_process";
import fs from "fs";

// Clones the latest .proto files into .proto/ for `yarn generate:proto`.
// The proto repository has no package.json, so it can't be a Yarn 2+ dependency.
const repository = "git@github.com:openfeed-org/proto.git";
const target = ".proto";

fs.rmSync(target, { recursive: true, force: true });
execFileSync("git", ["clone", "--depth", "1", repository, target], { stdio: "inherit" });
