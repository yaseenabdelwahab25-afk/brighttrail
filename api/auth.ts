import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clearSession, createSession, defaultSettings, emptyProgress, hashPassword, json, method, normalizeEmail, pool, sessionPayload, validGrade, validPassword, withTransaction, verifyPassword } from "./_lib.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") { const session = await sessionPayload(req); return json(res, 200, { authenticated: Boolean(session), ...(session ?? {}) }); }
    if (!method(req, res, "POST")) return;
    const action = req.body?.action;
    if (action === "logout") { await clearSession(req, res); return json(res, 200, { ok: true }); }
    const email = normalizeEmail(req.body?.email); const password = req.body?.password;
    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !validPassword(password)) return json(res, 400, { error: "Enter a valid email and a password with at least 8 characters, including a letter and a number." });
    if (action === "login") {
      const found = await pool.query("SELECT id, password_hash FROM accounts WHERE email = $1", [email]);
      if (!found.rowCount || !(await verifyPassword(password, found.rows[0].password_hash))) return json(res, 401, { error: "That email or password is not correct." });
      const result = await withTransaction(async (client) => { await createSession(client, found.rows[0].id, res); return client.query("SELECT l.id, l.name, l.grade, l.created_at, s.progress, s.settings FROM learners l JOIN accounts a ON a.id = l.account_id JOIN learner_state s ON s.learner_id = l.id WHERE a.id = $1 LIMIT 1", [found.rows[0].id]); });
      const row = result.rows[0]; return json(res, 200, { profile: { id: row.id, name: row.name, grade: row.grade, createdAt: row.created_at }, progress: row.progress, settings: row.settings });
    }
    if (action === "register") {
      const name = String(req.body?.name ?? "").trim(); const avatar = String(req.body?.avatar ?? ""); const grade = Number(req.body?.grade ?? 9);
      if (!name || name.length > 40 || !validGrade(grade)) return json(res, 400, { error: "Enter a learner name and choose a supported grade." });
      const result = await withTransaction(async (client) => { const account = await client.query("INSERT INTO accounts (id, email, password_hash) VALUES (gen_random_uuid(), $1, $2) RETURNING id, email", [email, await hashPassword(password)]); const learner = await client.query("INSERT INTO learners (id, account_id, name, avatar, grade) VALUES (gen_random_uuid(), $1, $2, $3, $4) RETURNING id, name, avatar, grade, created_at", [account.rows[0].id, name, avatar, grade]); await client.query("INSERT INTO learner_state (learner_id, progress, settings) VALUES ($1, $2, $3)", [learner.rows[0].id, JSON.stringify(emptyProgress), JSON.stringify(defaultSettings)]); await createSession(client, account.rows[0].id, res); return { account: account.rows[0], learner: learner.rows[0] }; });
      return json(res, 201, { profile: { id: result.learner.id, name: result.learner.name, grade: result.learner.grade, createdAt: result.learner.created_at }, progress: emptyProgress, settings: defaultSettings });
    }
    return json(res, 400, { error: "Unknown account action." });
  } catch (error: any) { if (error?.code === "23505") return json(res, 409, { error: "An account already exists for that email." }); console.error(error); return json(res, 500, { error: "The account service is temporarily unavailable." }); }
}
