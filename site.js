/* =========================================================================
   site.js — shared chrome injected into every page
   Renders: background cityscape, sticky header, footer.
   Kept as render functions so a later Next.js port maps 1:1 to components.
   ========================================================================= */

/* --- small inline icon set (Lucide-style 1.8 stroke) --- */
const IC = {
  download: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
  fileDl: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M5 21V5a2 2 0 0 1 2-2h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"/><path d="M12 11v6"/><path d="M9.5 14.5 12 17l2.5-2.5"/></svg>',
  mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 6.5 9 6 9-6"/></svg>',
  calc: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2.5" width="16" height="19" rx="2.5"/><path d="M8 6.5h8"/><path d="M8 11h0M12 11h0M16 11h0M8 15h0M12 15h0M16 15h0M8 18.5h4"/></svg>',
  chevR: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  arrowR: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  cal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>',
  phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3.5h3.2l1.6 4-2 1.4a12 12 0 0 0 5.3 5.3l1.4-2 4 1.6V20a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5Z"/></svg>',
  fax: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M7 8V4h10v4"/><rect x="3.5" y="8" width="17" height="9" rx="2"/><path d="M7 21h10v-6H7z"/><path d="M17.5 11.5h0"/></svg>',
  pin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  ext: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H10"/></svg>',
  building: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3.5" width="12" height="17" rx="1.5"/><path d="M9.5 7h0M14.5 7h0M9.5 10.5h0M14.5 10.5h0M9.5 14h0M14.5 14h0M10.5 20.5v-3h3v3"/></svg>',
};

/* --- logo lockup (icon + wordmark) --- */
const LOGO = `<img class="brand__logo" src="assets/logo.png" alt="日本確認センター">`;

/* --- background cityscape (fixed, faint) --- */
function bgCityscape() {
  return `
  <div class="cityscape" aria-hidden="true">
    <img class="skyline" src="assets/cityscape.png" alt="">
  </div>`;
}

/* --- header --- */
const NAV = [
  ["サービス", "/#services"],
  ["手数料", "/fees"],
  ["申請の流れ", "/flow"],
  ["会社概要", "/company"],
  ["アクセス", "/company#access"],
  ["お知らせ", "/news"],
];
/* 「サービス」ホバー時に展開するサブメニュー */
const SERVICE_SUB = [
  ["建築確認申請", "/flow"],
  ["住宅性能評価", "/evaluation"],
  ["省エネ適合判定", "/energy"],
  ["BELS（ベルス）", "/bels"],
  ["フラット35", "/flat35"],
];
const CARET = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
function siteHeader() {
  const links = NAV.map(([t, h]) => {
    if (t === "サービス") {
      const sub = SERVICE_SUB.map(([st, sh]) => `<a href="${sh}">${st}</a>`).join("");
      return `<div class="nav-item has-sub">
        <a class="nav-item__link" href="${h}">${t}<span class="nav-caret">${CARET}</span></a>
        <div class="nav-sub">${sub}</div>
      </div>`;
    }
    return `<a href="${h}">${t}</a>`;
  }).join("");
  /* モバイルパネル用：ナビ＋アクションをまとめて格納 */
  const mobileLinks = NAV.map(([t, h]) => `<a class="mnav__link" href="${h}">${t}<span class="mnav__chev">${IC.chevR}</span></a>`).join("");
  return `
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="/" aria-label="日本確認センター ホーム">
        ${LOGO}
      </a>
      <nav class="main-nav">${links}</nav>
      <div class="header-actions">
        <a class="btn btn--navy btn--header" href="/#docs">${IC.fileDl}<span class="lbl-long">申請書類ダウンロード</span><span class="lbl-short">申請書類</span></a>
        <a class="btn btn--teal btn--header" href="/contact">${IC.mail}<span>お問い合わせ</span></a>
      </div>
      <button class="mnav-btn" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="mobile-nav">
        <span class="mnav-btn__bar"></span>
        <span class="mnav-btn__bar"></span>
        <span class="mnav-btn__bar"></span>
      </button>
    </div>
    <div class="mnav-backdrop" id="mnav-backdrop" hidden></div>
    <nav class="mnav" id="mobile-nav" hidden aria-label="モバイルメニュー">
      <div class="mnav__inner">
        <div class="mnav__links">${mobileLinks}</div>
        <div class="mnav__actions">
          <a class="btn btn--navy mnav__cta" href="/#docs">${IC.fileDl}<span>申請書類ダウンロード</span></a>
          <a class="btn btn--teal mnav__cta" href="/contact">${IC.mail}<span>お問い合わせ</span></a>
        </div>
      </div>
    </nav>
  </header>`;
}
function mountMobileNav() {
  const btn = document.querySelector(".mnav-btn");
  const panel = document.getElementById("mobile-nav");
  const back = document.getElementById("mnav-backdrop");
  if (!btn || !panel || !back) return;
  const setOpen = (open) => {
    btn.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
    back.hidden = !open;
    document.body.classList.toggle("mnav-open", open);
  };
  btn.addEventListener("click", () => setOpen(panel.hidden));
  back.addEventListener("click", () => setOpen(false));
  /* リンククリックでメニューを閉じる（同一ページ内アンカー含む） */
  panel.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) setOpen(false);
  });
}

/* --- footer --- */
const SERVICE_LINKS = { "建築確認申請": "/flow", "住宅性能評価": "/evaluation", "省エネ適合判定": "/energy", "BELS": "/bels", "フラット35": "/flat35" };
const FOOT_SERVICES = ["建築確認申請", "住宅性能評価", "省エネ適合判定", "BELS", "フラット35"];
function footLinks(items) {
  return items.map(t => `<li><a href="${SERVICE_LINKS[t] || "#"}">${t}${IC.chevR}</a></li>`).join("");
}
function siteFooter() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-card">
        ${footerBg()}
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="brand">${LOGO}</div>
            <div class="footer-rule"></div>
            <div class="footer-info">
              <ul>
                <li><span class="ic">${IC.clock}</span><span><b>営業時間</b>：10:00 - 17:00<br><span style="color:var(--ink-500)">（12:00 - 13:00は除く）</span></span></li>
                <li><span class="ic">${IC.cal}</span><span><b>定休日</b>：土日祝日・お盆・年末年始</span></li>
                <li><span class="ic">${IC.phone}</span><span><b>TEL</b>：047-410-1266</span></li>
                <li><span class="ic">${IC.fax}</span><span><b>FAX</b>：047-410-1267</span></li>
              </ul>
            </div>
          </div>
          <div class="footer-col">
            <div class="footer-col__head">${IC.building}サービス</div>
            <ul class="footer-links">${footLinks(FOOT_SERVICES)}</ul>
          </div>
          <div class="footer-col">
            <div class="footer-col__head">${IC.building}会社情報</div>
            <ul class="footer-links">
              <li><a href="/company">会社概要${IC.chevR}</a></li>
              <li><a href="/company#access">アクセス${IC.chevR}</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <div class="footer-col__head">${IC.mail}お問い合わせ</div>
            <ul class="footer-links">
              <li><a href="/#docs">資料ダウンロード${IC.chevR}</a></li>
              <li><a href="/privacy">プライバシーポリシー${IC.chevR}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 日本確認センター All Rights Reserved.</span>
      </div>
    </div>
  </footer>`;
}
function footerBg() {
  return `<img class="footer-card__bg" src="assets/footer-bg.png" alt="" aria-hidden="true">`;
}

/* --- mount + scroll reveal --- */
function mountChrome({ header = true, footer = true } = {}) {
  const bg = document.getElementById("bg-slot");
  if (bg) bg.innerHTML = bgCityscape();
  const h = document.getElementById("header-slot");
  if (h && header) h.innerHTML = siteHeader();
  const f = document.getElementById("footer-slot");
  if (f && footer) f.innerHTML = siteFooter();
}
function initReveal() {
  /* Entrance animations disabled in the sandbox preview (frozen-timeline risk).
     Content is shown by CSS. This hook is kept for the production port. */
}

/* --- Google Drive ファイルプレビューモーダル（サイト全体共通） ---
   ページ内の <a href="*drive.google.com/file/d/*"> リンクのクリックを横取りし、
   モーダル内に Drive の /preview を iframe 表示する。
   モーダル内に「ダウンロード」「新しいタブで開く」「閉じる」ボタンを設置。 */
function mountDvModal() {
  if (document.getElementById("dv-modal")) return;
  const DL_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>';
  document.body.insertAdjacentHTML("beforeend", `
    <div class="dv-modal" id="dv-modal" hidden role="dialog" aria-modal="true" aria-labelledby="dv-modal-title">
      <div class="dv-modal__card">
        <header class="dv-modal__head">
          <h3 class="dv-modal__title" id="dv-modal-title"></h3>
          <div class="dv-modal__actions">
            <a class="dv-modal__dl" id="dv-modal-dl" target="_blank" rel="noopener">${DL_ICO}ダウンロード</a>
            <a class="dv-modal__open" id="dv-modal-open" target="_blank" rel="noopener">新しいタブで開く ↗</a>
            <button class="dv-modal__close" type="button" aria-label="閉じる" data-dv-close>×</button>
          </div>
        </header>
        <div class="dv-modal__body">
          <div class="dv-modal__loading" id="dv-modal-loading">読み込み中...</div>
          <iframe id="dv-modal-iframe" title="ファイルプレビュー" allow="autoplay"></iframe>
        </div>
      </div>
    </div>`);
  const modal   = document.getElementById("dv-modal");
  const iframe  = document.getElementById("dv-modal-iframe");
  const titleEl = document.getElementById("dv-modal-title");
  const dlBtn   = document.getElementById("dv-modal-dl");
  const openBtn = document.getElementById("dv-modal-open");
  const loading = document.getElementById("dv-modal-loading");

  const getDriveId = url => (String(url).match(/drive\.google\.com\/file\/d\/([^/?#]+)/) || [])[1] || null;
  const toPreview  = id => `https://drive.google.com/file/d/${id}/preview`;
  const toDownload = id => `https://drive.google.com/uc?export=download&id=${id}`;

  // リンク要素から表示名を抽出（共通レイアウト .lbl / .doc-link__name を優先、無ければ全文）
  function extractName(link) {
    const named = link.querySelector(".lbl, .doc-link__name, [data-name]");
    if (named) return (named.textContent || "").trim();
    return (link.textContent || "ファイル").replace(/\s+/g, " ").trim().slice(0, 200);
  }

  function openModal(name, originalUrl) {
    const id = getDriveId(originalUrl);
    if (!id) return false;
    titleEl.textContent = name;
    openBtn.href = originalUrl;
    dlBtn.href = toDownload(id);
    dlBtn.setAttribute("download", name);
    loading.style.display = "grid";
    iframe.src = toPreview(id);
    iframe.onload = () => { loading.style.display = "none"; };
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    return true;
  }
  function closeModal() {
    modal.hidden = true;
    iframe.src = "about:blank";
    document.body.style.overflow = "";
  }

  // ページ全体の Drive リンクをキャプチャ
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href*="drive.google.com/file/d/"]');
    if (!a) return;
    if (a.closest("#dv-modal")) return;                                   // モーダル内の自前リンクは横取りしない
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;   // 別タブ操作は尊重
    if (openModal(extractName(a), a.href)) e.preventDefault();
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.dataset.dvClose !== undefined) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

document.addEventListener("DOMContentLoaded", () => { mountChrome(); initReveal(); mountDvModal(); mountMobileNav(); });
