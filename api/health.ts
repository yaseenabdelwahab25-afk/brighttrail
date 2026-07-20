import type { VercelRequest, VercelResponse } from "@vercel/node";
import { json, pool } from "./_lib.js";
export default async function handler(_req: VercelRequest, res: VercelResponse) { try { const result = await pool.query("SELECT 1 AS ok"); return json(res, 200, { ok: result.rows[0].ok === 1 }); } catch (error) { console.error(error); return json(res, 500, { ok: false, configured: Boolean(process.env.DATABASE_URL), message: error instanceof Error ? error.message : "unknown" }); } }
