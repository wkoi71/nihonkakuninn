/* =========================================================================
   news-client.js — Supabase クライアント + お知らせ取得・操作の共通関数

   公開ページ（index.html / news.html）と管理画面（admin.html）が共有。
   Supabase が未設定の場合は news-data.js の NEWS 配列にフォールバック。
   ========================================================================= */
(function (global) {
  const URL_OK = global.SUPABASE_URL && global.SUPABASE_ANON_KEY;
  let sb = null;
  if (URL_OK && global.supabase && typeof global.supabase.createClient === "function") {
    sb = global.supabase.createClient(global.SUPABASE_URL, global.SUPABASE_ANON_KEY);
  }

  /* ---------- 公開ページ向け（読み取り専用） ---------- */
  function fallbackList() {
    // フォールバック用に index ベースの合成 id を付与
    return (global.NEWS || []).map((n, i) => ({ ...n, id: n.id || `f${i}` }));
  }
  function archiveList() {
    // 過去のお知らせ（news-data.js の固定アーカイブ）
    return (global.ARCHIVE_NEWS || []).map(n => ({ body: "", status: "published", ...n }));
  }
  async function fetchPublishedNews(limit) {
    // limit 指定（トップページのプレビュー）ではアーカイブを含めない
    const withArchive = typeof limit !== "number";
    // Supabase 未設定 → サンプルデータを返す
    if (!sb) {
      let list = fallbackList();
      if (withArchive) list = list.concat(archiveList());
      list.sort((a, b) => String(b.date).localeCompare(String(a.date)));
      return typeof limit === "number" ? list.slice(0, limit) : list;
    }
    const nowIso = new Date().toISOString();
    let q = sb.from("news")
      .select("id, date, cat, title, body, status, publish_at")
      .or(`status.eq.published,and(status.eq.scheduled,publish_at.lte.${nowIso})`)
      .order("date", { ascending: false });
    if (typeof limit === "number") q = q.limit(limit);
    const { data, error } = await q;
    if (error) { console.error("[news] fetch failed:", error); return withArchive ? archiveList() : []; }
    let rows = data || [];
    if (withArchive) {
      rows = rows.concat(archiveList())
        .sort((a, b) => String(b.date).localeCompare(String(a.date)));
    }
    return rows;
  }
  async function fetchOneById(id) {
    const hit = archiveList().find(n => String(n.id) === String(id));
    if (hit) return hit;
    if (!sb) {
      return fallbackList().find(n => String(n.id) === String(id)) || null;
    }
    const nowIso = new Date().toISOString();
    const { data, error } = await sb.from("news")
      .select("id, date, cat, title, body, status, publish_at")
      .eq("id", id)
      .or(`status.eq.published,and(status.eq.scheduled,publish_at.lte.${nowIso})`)
      .maybeSingle();
    if (error) { console.error("[news] fetchOne failed:", error); return null; }
    return data;
  }

  /* ---------- 管理画面向け（要ログイン） ---------- */
  async function fetchAllNews() {
    if (!sb) return [];
    const { data, error } = await sb.from("news")
      .select("id, date, cat, title, body, status, publish_at, updated_at")
      .order("updated_at", { ascending: false });
    if (error) { console.error("[news] fetchAll failed:", error); return []; }
    return data || [];
  }
  async function createNews(payload) {
    if (!sb) throw new Error("Supabase 未設定です。supabase-config.js を確認してください。");
    const { data, error } = await sb.from("news").insert(payload).select().single();
    if (error) throw error;
    return data;
  }
  async function updateNews(id, payload) {
    if (!sb) throw new Error("Supabase 未設定です。");
    payload.updated_at = new Date().toISOString();
    const { data, error } = await sb.from("news").update(payload).eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
  async function deleteNews(id) {
    if (!sb) throw new Error("Supabase 未設定です。");
    const { error } = await sb.from("news").delete().eq("id", id);
    if (error) throw error;
    return true;
  }

  /* ---------- 認証（管理画面のみ使用） ---------- */
  async function signIn(email, password) {
    if (!sb) throw new Error("Supabase 未設定です。supabase-config.js に URL と KEY を入力してください。");
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }
  async function signOut() {
    if (!sb) return;
    await sb.auth.signOut();
  }
  async function getSession() {
    if (!sb) return null;
    const { data } = await sb.auth.getSession();
    return data.session;
  }
  function onAuthChange(callback) {
    if (!sb) return () => {};
    const sub = sb.auth.onAuthStateChange((_evt, session) => callback(session));
    return () => sub?.data?.subscription?.unsubscribe?.();
  }

  global.NewsClient = {
    isConfigured: !!sb,
    fetchPublishedNews, fetchOneById, fetchAllNews,
    createNews, updateNews, deleteNews,
    signIn, signOut, getSession, onAuthChange,
  };
})(window);
