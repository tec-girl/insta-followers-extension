"use strict";
const I18N = {
en:{hint:"Only your own account, with your session already open on instagram.com. I never ask for your password and nothing leaves your browser.",go:"Extract my lists",tFollowing:"Following",tFollowers:"Followers",tNoBack:"Don't follow you back",tNoFollow:"You don't follow back",copy:"Copy",download:"Download .txt",openApp:"Also open in the web app",warn:"⚠️ Slow pace on purpose. If Instagram asks you to verify it's you, do it in the tab and try again later.",search:"Search user…",needTab:"Open instagram.com in a tab and log in first.",needLogin:"I don't see an active session on instagram.com. Log in there and try again.",working:"Extracting {kind}… {n} so far (page {p})",done:"Done ✓ Saved on this device.",rate:"Instagram asked for a pause (rate limit). Wait a while and try again.",failed:"It failed ({e}). Make sure you're logged in on instagram.com.",cached:"Saved data from {d}",kindFollowing:"following",kindFollowers:"followers"},
fr:{hint:"Uniquement votre propre compte, avec votre session déjà ouverte sur instagram.com. Je ne demande jamais votre mot de passe et rien ne quitte votre navigateur.",go:"Extraire mes listes",tFollowing:"Abonnements",tFollowers:"Abonnés",tNoBack:"Ne vous suivent pas en retour",tNoFollow:"Vous ne suivez pas en retour",copy:"Copier",download:"Télécharger .txt",openApp:"Ouvrir aussi dans l'app web",warn:"⚠️ Rythme lent volontaire. Si Instagram vous demande de vérifier que c'est vous, faites-le dans l'onglet et réessayez plus tard.",search:"Rechercher…",needTab:"Ouvrez instagram.com dans un onglet et connectez-vous d'abord.",needLogin:"Je ne vois pas de session active sur instagram.com. Connectez-vous là-bas et réessayez.",working:"Extraction {kind}… {n} pour l'instant (page {p})",done:"Terminé ✓ Enregistré sur cet appareil.",rate:"Instagram a demandé une pause (limite). Attendez un peu et réessayez.",failed:"Échec ({e}). Vérifiez que vous êtes connecté sur instagram.com.",cached:"Données enregistrées du {d}",kindFollowing:"abonnements",kindFollowers:"abonnés"},
de:{hint:"Nur dein eigenes Konto, mit deiner bereits geöffneten Sitzung auf instagram.com. Ich frage nie nach deinem Passwort und nichts verlässt deinen Browser.",go:"Meine Listen extrahieren",tFollowing:"Gefolgte",tFollowers:"Follower",tNoBack:"Folgen dir nicht zurück",tNoFollow:"Folgst du nicht zurück",copy:"Kopieren",download:".txt herunterladen",openApp:"Auch in der Web-App öffnen",warn:"⚠️ Absichtlich langsames Tempo. Wenn Instagram dich bittet zu bestätigen, dass du es bist, tue es im Tab und versuche es später erneut.",search:"Benutzer suchen…",needTab:"Öffne zuerst instagram.com in einem Tab und melde dich an.",needLogin:"Ich sehe keine aktive Sitzung auf instagram.com. Melde dich dort an und versuche es erneut.",working:"Extrahiere {kind}… bisher {n} (Seite {p})",done:"Fertig ✓ Auf diesem Gerät gespeichert.",rate:"Instagram hat um eine Pause gebeten (Rate Limit). Warte etwas und versuche es erneut.",failed:"Fehlgeschlagen ({e}). Stelle sicher, dass du auf instagram.com angemeldet bist.",cached:"Gespeicherte Daten vom {d}",kindFollowing:"Gefolgte",kindFollowers:"Follower"},
zh:{hint:"仅限你自己的账号，使用你已在 instagram.com 登录的会话。我从不要求你的密码，任何数据都不会离开你的浏览器。",go:"提取我的列表",tFollowing:"关注",tFollowers:"粉丝",tNoBack:"没有回关你",tNoFollow:"你没有回关",copy:"复制",download:"下载 .txt",openApp:"也在网页版中打开",warn:"⚠️ 故意放慢速度。如果 Instagram 要求验证身份，请在标签页中完成，稍后再试。",search:"搜索用户…",needTab:"请先打开 instagram.com 并登录。",needLogin:"没有检测到 instagram.com 的有效会话。请在那里登录后重试。",working:"正在提取{kind}… 已有 {n}（第 {p} 页）",done:"完成 ✓ 已保存在此设备。",rate:"Instagram 要求暂停（频率限制）。请稍等再试。",failed:"失败（{e}）。请确认你已登录 instagram.com。",cached:"保存于 {d} 的数据",kindFollowing:"关注",kindFollowers:"粉丝"},
pt:{hint:"Somente sua própria conta, com sua sessão já aberta em instagram.com. Nunca peço sua senha e nada sai do seu navegador.",go:"Extrair minhas listas",tFollowing:"Seguindo",tFollowers:"Seguidores",tNoBack:"Não te seguem de volta",tNoFollow:"Você não segue de volta",copy:"Copiar",download:"Baixar .txt",openApp:"Abrir também no app web",warn:"⚠️ Ritmo lento de propósito. Se o Instagram pedir para confirmar que é você, faça isso na aba e tente de novo mais tarde.",search:"Buscar usuário…",needTab:"Abra instagram.com em uma aba e entre primeiro.",needLogin:"Não vejo sessão ativa em instagram.com. Entre lá e tente de novo.",working:"Extraindo {kind}… {n} até agora (página {p})",done:"Pronto ✓ Salvo neste dispositivo.",rate:"O Instagram pediu uma pausa (limite). Espere um pouco e tente de novo.",failed:"Falhou ({e}). Confirme que você entrou em instagram.com.",cached:"Dados salvos de {d}",kindFollowing:"seguindo",kindFollowers:"seguidores"}
};
const ES = {cached:"Datos guardados del {d}", working:"Extrayendo {kind}… {n} hasta ahora (página {p})", kindFollowing:"seguidos", kindFollowers:"seguidores"};
const $ = s => document.querySelector(s);
let lang = "es", DATA = null, TAB = "following";
chrome.storage.local.get(["if-lang", "if-ext-cache"], r => {
  lang = r["if-lang"] || "es";
  $("#lang").value = lang; applyI18n();
  if (r["if-ext-cache"]) { DATA = r["if-ext-cache"]; showData(true); }
});
function t(k){
  if (lang === "es") return ES[k] || document.querySelector(`[data-i18n="${k}"]`)?.dataset.es || k;
  return (I18N[lang] && I18N[lang][k]) || k;
}
document.querySelectorAll("[data-i18n]").forEach(el => { el.dataset.es = el.textContent; });
function applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = lang === "es" ? null : I18N[lang][el.dataset.i18n];
    el.textContent = v || el.dataset.es;
  });
  $("#q").placeholder = lang === "es" ? "Buscar usuario…" : t("search");
  document.documentElement.lang = lang;
  if (DATA) render();
}
$("#lang").addEventListener("change", e => { lang = e.target.value; chrome.storage.local.set({ "if-lang": lang }); applyI18n(); });

function setStatus(msg){ $("#status").textContent = msg || ""; }
function showData(fromCache){
  $("#cFollowing").textContent = DATA.following.length;
  $("#cFollowers").textContent = DATA.followers.length;
  $("#cNoBack").textContent = DATA.noback.length;
  $("#cNoFollow").textContent = DATA.nofollow.length;
  $("#cacheinfo").textContent = fromCache && DATA.at ? t("cached").replace("{d}", new Date(DATA.at).toLocaleString()) : "";
  $("#results").hidden = false;
  render();
}
function render(){
  if (!DATA) return;
  const L = DATA[TAB];
  const q = $("#q").value.trim().toLowerCase();
  const shown = q ? L.filter(u => u.toLowerCase().includes(q)) : L;
  $("#list").innerHTML = shown.map(u => `<li><a href="https://www.instagram.com/${encodeURIComponent(u)}/" target="_blank" rel="noopener">@${u}</a></li>`).join("");
}
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
  b.classList.add("active"); TAB = b.dataset.tab; render();
}));
$("#q").addEventListener("input", render);
$("#copyBtn").addEventListener("click", async () => { if (DATA) await navigator.clipboard.writeText(DATA[TAB].join("\n")); });
$("#dlBtn").addEventListener("click", () => {
  if (!DATA) return;
  const blob = new Blob([DATA[TAB].join("\n")], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "insta-followers-" + TAB + ".txt"; a.click();
  URL.revokeObjectURL(a.href);
});
$("#openApp").addEventListener("click", e => { e.preventDefault(); chrome.tabs.create({ url: "https://tec-girl.github.io/insta-followers.github.io/" }); });

$("#go").addEventListener("click", async () => {
  const btn = $("#go");
  try {
    btn.disabled = true; setStatus("");
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url || !tab.url.includes("instagram.com")) { setStatus(t("needTab")); btn.disabled = false; return; }
    const cookie = await chrome.cookies.get({ url: "https://www.instagram.com", name: "ds_user_id" });
    if (!cookie || !cookie.value) { setStatus(t("needLogin")); btn.disabled = false; return; }
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async (userId) => {
        // ============ extractor (injected, page context) ============
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        const jitter = () => 1400 + Math.random() * 1200;
        async function fetchAll(kind) {
          const users = []; let maxId = "";
          while (true) {
            const url = `https://www.instagram.com/api/v1/friendships/${userId}/${kind}/?count=100&search_surface=follow_list_page` + (maxId ? `&max_id=${encodeURIComponent(maxId)}` : "");
            const res = await fetch(url, { credentials: "include", headers: { "x-ig-app-id": "936619743392459" } });
            if (res.status === 429) throw new Error("RATE_LIMIT");
            if (!res.ok) throw new Error("HTTP_" + res.status);
            const data = await res.json();
            (data.users || []).forEach(u => { if (u && u.username) users.push(u.username); });
            if (!data.next_max_id) break;
            maxId = data.next_max_id;
            await sleep(jitter());
          }
          return users;
        }
        const followingRaw = await fetchAll("following");
        await sleep(jitter());
        const followersRaw = await fetchAll("followers");
        const names = new Map();
        const norm = u => { const s = String(u).trim().replace(/^@/, ""); if (s && !names.has(s.toLowerCase())) names.set(s.toLowerCase(), s); return s.toLowerCase(); };
        const F = new Set(followersRaw.map(norm).filter(Boolean));
        const G = new Set(followingRaw.map(norm).filter(Boolean));
        const pick = set => [...set].map(k => names.get(k)).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        return { following: pick(G), followers: pick(F), noback: pick(new Set([...G].filter(x => !F.has(x)))), nofollow: pick(new Set([...F].filter(x => !G.has(x)))), at: Date.now() };
        // ===========================================================
      },
      args: [cookie.value]
    });
    DATA = result;
    chrome.storage.local.set({ "if-ext-cache": DATA });
    showData(false);
    setStatus(t("done"));
  } catch (e) {
    const msg = String(e && e.message || e);
    setStatus(msg.includes("RATE_LIMIT") ? t("rate") : t("failed").replace("{e}", msg.slice(0, 60)));
  } finally {
    btn.disabled = false;
  }
});
