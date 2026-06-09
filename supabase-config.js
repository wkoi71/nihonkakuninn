/* =========================================================================
   supabase-config.js — Supabase 接続情報

   【設定方法】
   1. https://supabase.com/ でアカウント作成 → 新しいプロジェクトを作成
   2. プロジェクトのダッシュボードを開き、左メニュー「Project Settings」→「API Keys」
   3. 「Project URL」と「Publishable key」(= 旧 anon key) をコピー
   4. 下の SUPABASE_URL / SUPABASE_ANON_KEY に貼り付ける
   5. ファイルを保存 → サイトをリロードで反映

   ※ Publishable key は公開しても安全なキーです（Row Level Security で制御）。
   ※ Secret key (旧 service_role) は絶対にここに貼らないでください。
   ※ 未設定（空文字）の場合は news-data.js のサンプルデータが表示されます。
   ========================================================================= */
window.SUPABASE_URL      = "https://crrubvablxemhobvbgwq.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_ZVvIthPzXTJLhRcmaR9wzA_Qvq6NkJ_";   
