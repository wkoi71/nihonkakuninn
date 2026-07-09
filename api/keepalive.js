/* =========================================================================
   api/keepalive.js — Supabase 死活監視（vercel.json の crons から毎日実行）

   Supabase 無料プランは一定期間 API アクセスがないとプロジェクトが
   一時停止し、お知らせ機能が丸ごと落ちる（2026-07 に発生）。
   毎日1回 news テーブルに読み取りリクエストを送り、停止を防ぐ。

   URL とキーは supabase-config.js と同じもの（公開前提の publishable key）。
   ========================================================================= */
const SUPABASE_URL = "https://crrubvablxemhobvbgwq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZVvIthPzXTJLhRcmaR9wzA_Qvq6NkJ_";

export default async function handler(req, res) {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/news?select=id&limit=1`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    });
    res.status(r.ok ? 200 : 502).json({
      ok: r.ok,
      supabaseStatus: r.status,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    res.status(502).json({ ok: false, error: String(err) });
  }
}
