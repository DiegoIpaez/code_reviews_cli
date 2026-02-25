export function prompt(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}
