-- =========================================================================
-- supabase-migration.sql
-- クライアントの Supabase プロジェクトで初回に1度だけ実行してください。
-- Supabase ダッシュボード → SQL Editor → 全文貼り付けて Run。
-- =========================================================================

-- news テーブル
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  cat text not null,
  title text not null,
  body text default '',
  status text not null default 'draft' check (status in ('draft','scheduled','published')),
  publish_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists news_status_date_idx on public.news (status, date desc);
create index if not exists news_publish_at_idx  on public.news (publish_at);

-- Row Level Security 有効化
alter table public.news enable row level security;

-- 公開ポリシー: 一般訪問者は 公開済み / 予約投稿で時刻到達 のみ閲覧可能
drop policy if exists "Public can read published news" on public.news;
create policy "Public can read published news"
on public.news for select
to anon
using (
  status = 'published'
  or (status = 'scheduled' and publish_at is not null and publish_at <= now())
);

-- 認証済みユーザー（=管理画面ログイン）は全件読み書き可能
drop policy if exists "Authenticated full access" on public.news;
create policy "Authenticated full access"
on public.news for all
to authenticated
using (true)
with check (true);

-- =========================================================================
-- （任意）初期データの投入例。必要なければ削除してください。
-- =========================================================================
-- insert into public.news (date, cat, title, body, status) values
--   (current_date, 'お知らせ', 'サイトを公開しました', '本日よりサイトを公開いたします。', 'published');
