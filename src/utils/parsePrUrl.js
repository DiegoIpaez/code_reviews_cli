export function parsePrUrl(url) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
  if (!match) {
    throw new Error(
      `URL inválida: ${url}\nFormato esperado: https://github.com/owner/repo/pull/123`,
    );
  }
  return { owner: match[1], repo: match[2], number: parseInt(match[3]) };
}
