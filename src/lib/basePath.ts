export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefixa caminhos de imagens públicas com o basePath do GitHub Pages.
 * Necessário porque next/image com unoptimized:true não faz isso por conta própria. */
export function asset(path: string) {
  return `${basePath}${path}`;
}
