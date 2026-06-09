/* =========================================================================
   news-data.js — site-wide お知らせ entries (newest first).
   Shared by index.html (preview) and news.html (full list).
   Kept separate so the later Next.js/Supabase port can swap this for a query.
   ========================================================================= */
const NEWS = [
  { date: "2025.06.01", cat: "重要",   title: "弊社サービスのシステムメンテナンス実施のお知らせ" },
  { date: "2025.05.28", cat: "お知らせ", title: "東京オフィス 移転に伴う業務開始日のお知らせ" },
  { date: "2025.05.20", cat: "更新情報", title: "コーポレートサイトをリニューアルしました" },
  { date: "2025.05.12", cat: "採用",   title: "2026年度 新卒採用エントリー受付を開始しました" },
  { date: "2025.04.30", cat: "更新情報", title: "プライバシーポリシーの改定について" },
  { date: "2025.04.15", cat: "お知らせ", title: "ゴールデンウィーク期間中の休業日のお知らせ" },
];
