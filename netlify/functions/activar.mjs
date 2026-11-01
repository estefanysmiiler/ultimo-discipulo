import datos from "./niveles_pago.json" with { type: "json" };
import { polar, ORG, json, leer, limpio } from "./_polar.mjs";
// Activa un código de licencia en un dispositivo. Si Polar lo acepta, devuelve los niveles 6-40.
export default async (req) => {
  if (req.method !== "POST") return json({ error: "metodo" }, 405);
  if (!ORG()) return json({ error: "servidor" }, 500);
  const b = await leer(req), key = limpio(b.key), disp = limpio(b.dispositivo) || "sin-id";
  if (!key) return json({ error: "no_valido" }, 400);
  try {
    const r = await polar("/customer-portal/license-keys/activate", { key, organization_id: ORG(), label: disp, meta: { dispositivo: disp } });
    if (r.status === 200 && r.d && r.d.id) return json({ ok: true, act: r.d.id, datos });
    if (r.status === 403) return json({ error: "limite" }, 403);
    if (r.status === 404 || r.status === 422) {
      // 422 puede significar clave mal escrita; comprobamos si la clave existe para no confundir con otros fallos
      return json({ error: "no_valido" }, 404);
    }
    return json({ error: "servidor" }, 502);
  } catch (e) { return json({ error: "servidor" }, 502); }
};
export const config = { path: "/api/activar" };
