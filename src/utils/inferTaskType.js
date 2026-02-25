export function inferTaskType(branch) {
  const types = [
    "hotfix",
    "feat",
    "feature",
    "fix",
    "docs",
    "refactor",
    "chore",
    "test",
    "style",
    "perf",
    "ci",
  ];
  const prefix = branch.split("/")[0].toLowerCase();
  return types.includes(prefix) ? prefix : "—";
}

