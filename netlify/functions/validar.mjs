import { polar, ORG, json, leer, limpio } from "./_polar.mjs";
// Comprueba que la licencia sigue vigente. Solo dice "revocada" si Polar responde claramente que no existe o no es válida.
export default async (req) => {
  if (req.method !== "POST") return json({ error: "metodo" }, 405);
  if (!ORG()) return json({ error: "servidor" }, 500);
  const b = await leer(req), key = limpio(b.key), act = limpio(b.act);
  if (!key) return json({ error: "no_valido" }, 400);
  try {
    const cuerpo = { key, organization_id: ORG() }; if (act) cuerpo.activation_id = act;
    const r = await polar("/customer-portal/license-keys/validate", cuerpo);
    if (r.status === 200 && r.d && r.d.status === "granted") return json({ ok: true });
    if (r.status === 200 && r.d && (r.d.status === "revoked" || r.d.status === "disabled")) return json({ revocada: true }, 403);
    if (r.status === 404) return json({ revocada: true }, 403);
    return json({ error: "servidor" }, 502);
  } catch (e) { return json({ error: "servidor" }, 502); }
};
export const config = { path: "/api/validar" };
