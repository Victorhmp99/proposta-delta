import type { NextConfig } from "next";

const repoName = "proposta-delta";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    // next/image com unoptimized:true não prefixa o basePath sozinho —
    // expomos o valor pra montar as URLs das imagens locais manualmente.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
