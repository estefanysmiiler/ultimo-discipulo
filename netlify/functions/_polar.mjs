// Utilidades comunes para hablar con Polar (endpoints públicos del portal de clientes: no llevan clave secreta).
export const BASE = () => process.env.POLAR_API || "https://sandbox-api.polar.sh/v1";
export const ORG = () => process.env.POLAR_ORG_ID || "";
export const MAX_DISPOSITIVOS = 3;
export const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
export async function polar(ruta, cuerpo) {
  const r = await fetch(BASE() + ruta, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });
  let d = null; try { d = await r.json(); } catch (e) {}
  return { status: r.status, d };
}
export async function leer(req) { try { return await req.json(); } catch (e) { return {}; } }
export const limpio = s => (typeof s === "string" ? s.trim().slice(0, 120) : "");
