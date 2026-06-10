/* =========================================================================
   documents-data.js — all downloadable forms, grouped.
   Kept separate so the later Next.js/Supabase port can swap this for a query.

   - url:  ダウンロード／表示先（Google Drive など）
   - type: ファイル種別を明示。省略時は URL の拡張子から自動判定（無ければ "LINK"）
   ========================================================================= */
const DOC_GROUPS = [
  {
    label: "申請関係", icon: "clipDl", tint: "blue",
    items: [
      { name: "確認申請書（建築物）R8.4.1〜", type: "DOCX", url: "https://drive.google.com/file/d/1w88ZVh8GU2YwN6liJMhggjPljvPhVYDs/view" },
      { name: "確認申請書 別紙", type: "DOC", url: "https://drive.google.com/file/d/1lW1EjawgYU65Y2Jojvc3xSqws47hkGTr/view" },
      { name: "確認申請書（工作物）", type: "DOCX", url: "https://drive.google.com/file/d/1OHWu7pBPj1GPu1dBSv0gwbePXk5JhLeu/view" },
      { name: "確認申請書（昇降機）", type: "DOC", url: "https://drive.google.com/file/d/1zJ6uyzsfJI6m5LJvBSTt833PBincf7Gs/view" },
      { name: "計画通知書（建築物）R8.4.1〜", type: "DOCX", url: "https://drive.google.com/file/d/1KVXFfqsM45HIhZA3PtQzVDFirD8IvYhB/view" },
      { name: "計画通知書（工作物）", type: "DOCX", url: "https://drive.google.com/file/d/1TDn1bOB-10kPBgklcw_TpXBDWore0MSx/view" },
      { name: "計画通知書（昇降機）", type: "DOC", url: "https://drive.google.com/file/d/1Qfavj66wbwMNrzm5cTrZSeL-a_hwaAD8/view" },
      { name: "概要書 R8.4.1〜", type: "DOCX", url: "https://drive.google.com/file/d/1oJw7bug3HFfbrbecAzZwFGzScWLZnajP/view" },
      { name: "築造計画概要書", type: "DOC", url: "https://drive.google.com/file/d/1N6EIYJPzl3HfUNmEDHRVDUKjQeK3M-mj/view" },
      { name: "工事届", type: "XLSX", url: "https://drive.google.com/file/d/1tFOCRMaNSm0DpSISFr8QWXus9_PIYY6U/view" },
      { name: "関係法令チェックリスト", type: "XLS", url: "https://drive.google.com/file/d/1Dp37D5L5Tgl6Q3cf3orqRK1ZEnVisCq0/view" },
      { name: "委任状", type: "XLSX", url: "https://drive.google.com/file/d/1ZXEmtcVFotg4eto-WTHQZVtUeXcceFU3/view" },
    ],
  },
  {
    label: "計画変更関係", icon: "edit", tint: "teal",
    items: [
      { name: "計画変更申請書（建築物）R8.4.1〜", type: "DOCX", url: "https://drive.google.com/file/d/1ur9-L0sKxvRK4Ambwu_aW_u7U7csUVFi/view" },
      { name: "計画変更申請書（工作物）", type: "DOC", url: "https://drive.google.com/file/d/1JCo8259wF6EyDSpJcQAGNmnDMMYuw8E9/view" },
      { name: "計画変更申請書（昇降機）", type: "DOCX", url: "https://drive.google.com/file/d/146Ci5c4Vu4ZNBuvDhy1h8QmzQT7OINzk/view" },
      { name: "計画変更通知書（建築物）R8.4.1〜", type: "DOCX", url: "https://drive.google.com/file/d/1uP530UhxwYAZ2y6M40JZTScLCTstXvrw/view" },
      { name: "計画変更通知書（工作物）", type: "DOC", url: "https://drive.google.com/file/d/1KJcGq_zWZSRiLWjsWNvRj-9av1ggLUDM/view" },
      { name: "計画変更通知書（昇降機）", type: "DOCX", url: "https://drive.google.com/file/d/10VN37JG6Vqsn9stgGZ7RCSSV1ZTPjnfl/view" },
    ],
  },
  {
    label: "検査関係", icon: "search", tint: "green",
    items: [
      { name: "中間検査申請書", type: "DOC", url: "https://drive.google.com/file/d/1qcUnr2HDurcwFGf2Hbn01sk4h93LHXaD/view" },
      { name: "完了検査申請書", type: "DOCX", url: "https://drive.google.com/file/d/1c08jf_REDU9EH7h6Lf02BiJ1FoZ2tlMU/view" },
      { name: "特定工程工事終了通知書", type: "DOC", url: "https://drive.google.com/file/d/14ruZPsoJTyNyFmSIDPPIxiruD6HNXNGG/view" },
      { name: "工事完了通知書", type: "DOC", url: "https://drive.google.com/file/d/10FQSfY0vDi80JE0g0qdvqVduD3S7owI9/view" },
      { name: "委任状", type: "XLSX", url: "https://drive.google.com/file/d/1m4a77dH05q0BqCvJDhxagyRDe6_d73ZP/view" },
      { name: "東京都建築基準法施行細則様式一覧", url: "https://www.toshiseibi.metro.tokyo.lg.jp/kenchiku_kaihatsu/kenchiku_gyosei/gyosei/kijun/kn/k8" },
      { name: "中間・完了検査時の提出書類及び提示書類一覧", type: "PDF", url: "https://drive.google.com/file/d/1ksNBgf5zdn2Q2VcWhXRoXZdV-IpM_-9i/view" },
      { name: "建築工事施工計画書等提出書類一覧（東京都の場合）", type: "PDF", url: "https://drive.google.com/file/d/1_3zrkZ5jU9iZgP39JMknMF5pAWHeAVX4/view" },
    ],
  },
  {
    label: "仮使用認定関係", icon: "lock", tint: "leaf",
    items: [
      { name: "仮使用申請書", type: "DOC", url: "https://drive.google.com/file/d/1-N86c9PbYxUazowi2-hQDrjfKWqqlJG4/view" },
      { name: "仮使用申請書 別紙", type: "DOCX", url: "https://drive.google.com/file/d/1IX63vhj4vBQ3tp-R3js7q_rf_Z3Gl0KI/view" },
      { name: "仮使用申請書（計画通知物件）", type: "DOC", url: "https://drive.google.com/file/d/1y_4OgtTsjKx5KajhkOKwptSp8QkJJFrR/view" },
      { name: "安全計画書", type: "XLSX", url: "https://drive.google.com/file/d/15a0QmCmVKoSXmRghhn9dTYlyUWBoVp_5/view" },
      { name: "安全（工事）計画書", type: "XLSX", url: "https://drive.google.com/file/d/1JZjUrmM77Ftj5UfdPZEHxL-GtEKquaPl/view" },
      { name: "委任状", type: "XLSX", url: "https://drive.google.com/file/d/1E81MRgQ3ZsN8-aj-P4CScEktYiLMk7zo/view" },
    ],
  },
  {
    label: "届出関係", icon: "send", tint: "violet",
    items: [
      { name: "建築主等変更届", type: "XLSX", url: "https://drive.google.com/file/d/1BozlKg7zrR-S2UkSovD9Qv7eFwg3J8ss/view" },
      { name: "工事監理者届", type: "XLSX", url: "https://drive.google.com/file/d/1NV2ql5G330EqzMd_615L7UMAHjM4_5oZ/view" },
      { name: "工事施工者届", type: "XLSX", url: "https://drive.google.com/file/d/1rLkCMh80DSgKwL0Qvd_rPjiciV0Fp5O2/view" },
      { name: "軽微な変更説明書", type: "XLSX", url: "https://drive.google.com/file/d/1HIVV0xt_PSkXEmUNTE8VLwWL4tr-havK/view" },
      { name: "記載事項変更届", type: "XLSX", url: "https://drive.google.com/file/d/1F3whyfOWzBovzzW2ScvjjgPAh1QqqJb2/view" },
      { name: "建築確認等記載事項証明願", type: "XLS", url: "https://drive.google.com/file/d/1HrUXTAdb4RqwyP_FPrNXPxmzFm8Pn6zb/view" },
      { name: "取下げ届", type: "XLSX", url: "https://drive.google.com/file/d/1x0EgLzzmsbx43Swl0nIu0iBQBKtbXSVn/view" },
      { name: "取りやめ届", type: "XLSX", url: "https://drive.google.com/file/d/1-zGvsjdRkrVbt4SPJYi60D9U7BqqnHVc/view" },
      { name: "追加説明書（確認）", type: "DOC", url: "https://drive.google.com/file/d/1l2yMhXU_MZTa668UUUvDEhie67YyKkmM/view" },
      { name: "追加説明書（完了）", type: "XLSX", url: "https://drive.google.com/file/d/1-EBcoSYMNefV8M-izGaUMT5oB1eqYlE_/view" },
      { name: "既存不適格調書", type: "XLS", url: "https://drive.google.com/file/d/1D-YnOoXcS6PXVOq72Aj2--bsEHy_h4qa/view" },
    ],
  },
  {
    label: "フラット35適合証明関係", icon: "building", tint: "sky",
    items: [
      { name: "各種ダウンロードはこちら（住宅金融支援機構サイト）", url: "https://www.flat35.com/business/inspect/download/index.html" },
    ],
  },
];
