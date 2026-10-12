const OWNER = "Victorhmp99";
const REPO = "proposta-delta";
const BRANCH = "main";
const FILE_PATH = "public/content.json";

const TOKEN_KEY = "gh_edit_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

function utf8ToBase64(str: string) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

/** Salva o conteúdo direto no repositório via GitHub Contents API.
 * Isso cria um commit automático, que dispara o deploy já configurado —
 * a pessoa que edita não precisa saber o que é "commit". */
export async function saveContentToGithub(content: unknown): Promise<{ ok: boolean; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "Nenhum token salvo. Configure o acesso primeiro." };

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  try {
    let sha: string | undefined;
    const getRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`,
      { headers }
    );
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    } else if (getRes.status !== 404) {
      const data = await getRes.json().catch(() => ({}));
      return { ok: false, error: `Erro ao ler arquivo atual (${getRes.status}): ${data.message ?? ""}` };
    }

    const body = {
      message: "Atualiza conteúdo da proposta (via editor)",
      content: utf8ToBase64(JSON.stringify(content, null, 2)),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    };

    const putRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
      { method: "PUT", headers, body: JSON.stringify(body) }
    );

    if (!putRes.ok) {
      const data = await putRes.json().catch(() => ({}));
      return { ok: false, error: `Erro ao salvar (${putRes.status}): ${data.message ?? "verifique o token"}` };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Falha de conexão com o GitHub." };
  }
}

/** Confere se o token é válido e tem acesso de escrita ao repositório. */
export async function validateToken(token: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return { ok: false, error: "Token inválido ou sem acesso ao repositório." };
    const data = await res.json();
    if (!data.permissions?.push) return { ok: false, error: "Esse token não tem permissão de escrita." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Falha de conexão com o GitHub." };
  }
}
