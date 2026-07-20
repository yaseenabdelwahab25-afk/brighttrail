import type { VercelRequest, VercelResponse } from "@vercel/node";
import { json, method, pool, sessionPayload } from "./_lib";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try { const session = await sessionPayload(req); if (!session) return json(res, 401, { error: "Sign in required." }); if (!method(req, res, "PUT")) return; const progress = req.body?.progress; const settings = req.body?.settings; if (!progress || !settings) return json(res, 400, { error: "Progress and settings are required." }); await pool.query("UPDATE learner_state SET progress = $1, settings = $2, updated_at = now() WHERE learner_id = $3", [JSON.stringify(progress), JSON.stringify(settings), session.profile.id]); return json(res, 200, { ok: true }); } catch (error) { console.error(error); return json(res, 500, { error: "Could not save progress." }); }
}
