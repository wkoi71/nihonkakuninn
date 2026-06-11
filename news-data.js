/* =========================================================================
   news-data.js — site-wide お知らせ entries (newest first).
   Shared by index.html (preview) and news.html (full list).
   Kept separate so the later Next.js/Supabase port can swap this for a query.
   ========================================================================= */
/* ダミー記事は削除済み。実データ未登録の間は index.html / news.html が
   「現在お知らせはありません。」を表示する。本番では Supabase から取得。 */
const NEWS = [];
