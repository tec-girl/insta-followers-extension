"use strict";
/*
 * extractor.js — se inyecta en la pestaña de instagram.com y se ejecuta en el
 * contexto de la página, usando SOLO la sesión que la persona ya tiene abierta.
 * Nunca pide ni lee contraseñas. Solo extrae la cuenta PROPIA (ds_user_id).
 * Ritmo lento a propósito (1.4–2.6 s entre páginas) para no disparar defensas.
 * Devuelve las 4 listas ya calculadas.
 */
async function instaFollowersExtract(userId, onProgress) {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const jitter = () => 1400 + Math.random() * 1200;

  async function fetchAll(kind) {
    const users = [];
    let maxId = "";
    let page = 0;
    while (true) {
      const url = `https://www.instagram.com/api/v1/friendships/${userId}/${kind}/?count=100&search_surface=follow_list_page` +
        (maxId ? `&max_id=${encodeURIComponent(maxId)}` : "");
      const res = await fetch(url, { credentials: "include", headers: { "x-ig-app-id": "936619743392459" } });
      if (res.status === 429) throw new Error("RATE_LIMIT");
      if (!res.ok) throw new Error("HTTP_" + res.status);
      const data = await res.json();
      (data.users || []).forEach(u => { if (u && u.username) users.push(u.username); });
      page++;
      if (typeof onProgress === "function") onProgress(kind, users.length, page);
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
  return {
    following: pick(G),
    followers: pick(F),
    noback: pick(new Set([...G].filter(x => !F.has(x)))),
    nofollow: pick(new Set([...F].filter(x => !G.has(x)))),
    at: Date.now()
  };
}
