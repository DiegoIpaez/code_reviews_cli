import readline from "readline";
import { CONFIG } from "./constants/index.js";
import { appendSpreadsheet } from "./lib/googleSheetsClient.lib.js";
import { getPullRequestInfo } from "./services/pullRequest.service.js";
import {
  parsePrUrl,
  inferTaskType,
  formatDate,
  prompt,
} from "./utils/index.js";

const apendToGoogleSheet = async (data) => {
  const row = [
    data.pr,
    data.repo,
    data.branch,
    data.taskType,
    data.creator,
    data.reviewer,
    data.comments,
    data.note,
    data.approvedAt,
    data.reviewedAt,
    data.createdAt,
  ];

  await appendSpreadsheet(CONFIG.GOOGLE_SHEETS.SPREADSHEET_ID, "A:K", [row]);
  console.log("\n✅ Registro agregado al Excel correctamente.\n");
};

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let prUrl = await prompt(rl, "🔗  URL del PR: ");
  while (!prUrl.trim()) {
    prUrl = await prompt(rl, "⚠️  La URL es requerida. Ingresa la URL del PR: ");
  }
  prUrl = prUrl.trim();

  const { owner, repo, number } = parsePrUrl(prUrl);
  console.log(`\n🔍  Obteniendo datos de ${owner}/${repo}#${number}...\n`);
  const pr = await getPullRequestInfo({ owner, repo, number });

  const branch = pr?.head?.ref;
  const taskType = inferTaskType(branch);

  let fechaAprobado = "—";
  if (pr?.merged_at) fechaAprobado = formatDate(pr?.merged_at);
  else if (pr?.closed_at) fechaAprobado = formatDate(pr?.closed_at);

  console.log("📝  Ingresa los datos manuales:\n");

  let fechaRevision = await prompt(
    rl,
    `  Fecha Revisión [dd/mm/yy HH:mm] (Enter para "${formatDate(new Date())}"): `,
  );
  if (!fechaRevision.trim()) fechaRevision = formatDate(new Date());

  let nota = await prompt(rl, "  Nota (observaciones post-review): ");
  if (!nota.trim()) nota = "—";
  rl.close();

  const data = {
    pr: number,
    repo,
    branch,
    taskType,
    creator: pr.user.login,
    reviewer: CONFIG.REVIEWER,
    comments: pr?.review_comments || 0,
    note: nota.trim(),
    approvedAt: fechaAprobado,
    reviewedAt: fechaRevision.trim(),
    createdAt: formatDate(pr.created_at),
  };

  console.log("─".repeat(60) + "\n");
  console.log("📝 Review Summary:");
  console.log(JSON.stringify(data, null, 2));
  await apendToGoogleSheet(data);
}

main().catch((err) => {
  const errorMsg = err.response?.data?.message || err.message;
  console.error(`\n❌  ${errorMsg}`);
  process.exit(1);
});