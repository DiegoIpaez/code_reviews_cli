import { ghClient } from '../lib/axiosClient.lib.js';

export const getPullRequestInfo = async ({ owner, repo, number }) => {
  const { data } = await ghClient.get(
    `/repos/${owner}/${repo}/pulls/${number}`,
  );
  return data;
};
