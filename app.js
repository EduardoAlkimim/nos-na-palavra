// ═══════════════════════════════════════════
//  NÓS NA PALAVRA — App Logic
//  Dark Minimal · Firebase · GitHub Pages
// ═══════════════════════════════════════════

// ── Aguarda Firebase ──────────────────────
let _fbReady = false;
window._dispatchFBReady = () => { _fbReady = true; _fbCallbacks.forEach(f => f()); };
const _fbCallbacks = [];
function onFBReady(fn) { if (_fbReady) fn(); else _fbCallbacks.push(fn); }

// ── Livros bíblicos ───────────────────────
const BOOKS = [
  {n:"Gênesis",c:50,g:"AT"},{n:"Êxodo",c:40,g:"AT"},{n:"Levítico",c:27,g:"AT"},
  {n:"Números",c:36,g:"AT"},{n:"Deuteronômio",c:34,g:"AT"},{n:"Josué",c:24,g:"AT"},
  {n:"Juízes",c:21,g:"AT"},{n:"Rute",c:4,g:"AT"},{n:"1 Samuel",c:31,g:"AT"},
  {n:"2 Samuel",c:24,g:"AT"},{n:"1 Reis",c:22,g:"AT"},{n:"2 Reis",c:25,g:"AT"},
  {n:"1 Crônicas",c:29,g:"AT"},{n:"2 Crônicas",c:36,g:"AT"},{n:"Esdras",c:10,g:"AT"},
  {n:"Neemias",c:13,g:"AT"},{n:"Ester",c:10,g:"AT"},{n:"Jó",c:42,g:"AT"},
  {n:"Salmos",c:150,g:"AT"},{n:"Provérbios",c:31,g:"AT"},{n:"Eclesiastes",c:12,g:"AT"},
  {n:"Cantares",c:8,g:"AT"},{n:"Isaías",c:66,g:"AT"},{n:"Jeremias",c:52,g:"AT"},
  {n:"Lamentações",c:5,g:"AT"},{n:"Ezequiel",c:48,g:"AT"},{n:"Daniel",c:12,g:"AT"},
  {n:"Oséias",c:14,g:"AT"},{n:"Joel",c:3,g:"AT"},{n:"Amós",c:9,g:"AT"},
  {n:"Obadias",c:1,g:"AT"},{n:"Jonas",c:4,g:"AT"},{n:"Miquéias",c:7,g:"AT"},
  {n:"Naum",c:3,g:"AT"},{n:"Habacuque",c:3,g:"AT"},{n:"Sofonias",c:3,g:"AT"},
  {n:"Ageu",c:2,g:"AT"},{n:"Zacarias",c:14,g:"AT"},{n:"Malaquias",c:4,g:"AT"},
  {n:"Mateus",c:28,g:"NT"},{n:"Marcos",c:16,g:"NT"},{n:"Lucas",c:24,g:"NT"},
  {n:"João",c:21,g:"NT"},{n:"Atos",c:28,g:"NT"},{n:"Romanos",c:16,g:"NT"},
  {n:"1 Coríntios",c:16,g:"NT"},{n:"2 Coríntios",c:13,g:"NT"},{n:"Gálatas",c:6,g:"NT"},
  {n:"Efésios",c:6,g:"NT"},{n:"Filipenses",c:4,g:"NT"},{n:"Colossenses",c:4,g:"NT"},
  {n:"1 Tessalonicenses",c:5,g:"NT"},{n:"2 Tessalonicenses",c:3,g:"NT"},
  {n:"1 Timóteo",c:6,g:"NT"},{n:"2 Timóteo",c:4,g:"NT"},{n:"Tito",c:3,g:"NT"},
  {n:"Filemom",c:1,g:"NT"},{n:"Hebreus",c:13,g:"NT"},{n:"Tiago",c:5,g:"NT"},
  {n:"1 Pedro",c:5,g:"NT"},{n:"2 Pedro",c:3,g:"NT"},{n:"1 João",c:5,g:"NT"},
  {n:"2 João",c:1,g:"NT"},{n:"3 João",c:1,g:"NT"},{n:"Judas",c:1,g:"NT"},
  {n:"Apocalipse",c:22,g:"NT"}
];

const VERSES = [
  {t:"O Senhor é o meu pastor, e nada me faltará.",r:"Salmos 23:1"},
  {t:"Tudo posso naquele que me fortalece.",r:"Filipenses 4:13"},
  {t:"O amor é paciente, é bondoso. O amor não inveja, não se vangloria.",r:"1 Coríntios 13:4"},
  {t:"Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento.",r:"Provérbios 3:5"},
  {t:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",r:"João 3:16"},
  {t:"Dois são melhor do que um, porque têm melhor paga do seu trabalho.",r:"Eclesiastes 4:9"},
  {t:"E acima de tudo isso, revesti-vos do amor, que é o vínculo da perfeição.",r:"Colossenses 3:14"},
  {t:"Sede fortes e corajosos. Não temais, nem vos assusteis.",r:"Deuteronômio 31:6"},
  {t:"Buscai, pois, em primeiro lugar, o seu reino e a sua justiça.",r:"Mateus 6:33"},
  {t:"O amor nunca falha.",r:"1 Coríntios 13:8"},
  {t:"Onde estiverem dois ou três reunidos em meu nome, ali estou eu no meio deles.",r:"Mateus 18:20"},
  {t:"E nós amamos a Deus porque ele nos amou primeiro.",r:"1 João 4:19"},
  {t:"Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",r:"Romanos 12:12"},
  {t:"A tua palavra é uma lâmpada para os meus pés e uma luz para o meu caminho.",r:"Salmos 119:105"},
  {t:"Porque eu bem sei os planos que tenho para vocês, diz o Senhor.",r:"Jeremias 29:11"},
];

const EMOJIS = [
  "📖","✝️","🕊️","🙏","✨","🌟","⭐","🌙","☀️","🌿",
  "🌸","🌺","🌹","🦋","💛","💙","💗","💜","❤️","🔥",
  "🫶","🫂","👑","🎵","🎶","🕯️","⛪","🏔️","🌊","🐦",
  "🍀","🌱","🌾","🍇","🍞","🏺","📜","📝","🗝️","🛡️"
];

// ── PERFIS (localStorage) ─────────────────
const DEFAULT_PROFILES = {
  dudu:  { name: 'Dudu',  emoji: '📖' },
  thata: { name: 'Thata', emoji: '🌸' }
};

function getProfiles() {
  try {
    const raw = localStorage.getItem('nnp_profiles');
    return raw ? JSON.parse(raw) : { ...DEFAULT_PROFILES };
  } catch { return { ...DEFAULT_PROFILES }; }
}

function saveProfiles(p) {
  localStorage.setItem('nnp_profiles', JSON.stringify(p));
}

// ── ESTADO ────────────────────────────────
let uid = null;   // 'dudu' | 'thata'
let shared = { currentBook: null, readChapters: [] };
let noteView = 'mine';
let editingUid = null;
let editEmoji  = null;

// ── INIT ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderWhoScreen();
  buildBookSelect();
  buildEmojiGrid();
  showDailyVerse();
  randomVerse();
});

// ── TELA SELEÇÃO ──────────────────────────
function renderWhoScreen() {
  const p = getProfiles();
  ['dudu','thata'].forEach(id => {
    document.getElementById('emoji-' + id).textContent = p[id].emoji;
    document.getElementById('name-' + id).textContent  = p[id].name;
  });
}

function enterUser(id) {
  uid = id;
  const p = getProfiles();
  document.body.className = 'u-' + id;

  // topbar
  document.getElementById('tb-emoji').textContent = p[id].emoji;
  document.getElementById('tb-name').textContent  = p[id].name;

  // notas: label do parceiro
  const partner = id === 'dudu' ? 'thata' : 'dudu';
  document.getElementById('partner-art').textContent = partner === 'dudu' ? 'e' : 'a';
  document.getElementById('partner-lbl').textContent = p[partner].name;

  document.getElementById('s-who').classList.remove('active');
  document.getElementById('s-app').classList.add('active');

  onFBReady(() => {
    loadShared().then(() => {
      renderHome();
      updateTopbar();
    });
  });
}

function goBack() {
  uid = null;
  document.body.className = '';
  document.getElementById('s-app').classList.remove('active');
  document.getElementById('s-who').classList.add('active');
  renderWhoScreen();
  // reset nav
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.tab[data-tab="home"]').classList.add('active');
  document.querySelectorAll('.tabpanel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-home').classList.add('active');
}

// ── EDITAR PERFIL ─────────────────────────
function openEdit(id, e) {
  e.stopPropagation();
  editingUid = id;
  const p = getProfiles();
  document.getElementById('edit-name').value = p[id].name;
  editEmoji = p[id].emoji;
  // marcar emoji selecionado
  document.querySelectorAll('.emoji-opt').forEach(el => {
    el.classList.toggle('selected', el.dataset.e === editEmoji);
  });
  document.getElementById('modal-edit').style.display = 'flex';
}

function closeEdit() {
  document.getElementById('modal-edit').style.display = 'none';
  editingUid = null;
}

function saveEdit() {
  const name = document.getElementById('edit-name').value.trim();
  if (!name) return;
  const p = getProfiles();
  p[editingUid].name  = name;
  p[editingUid].emoji = editEmoji || p[editingUid].emoji;
  saveProfiles(p);
  closeEdit();
  renderWhoScreen();
}

function buildEmojiGrid() {
  const grid = document.getElementById('emoji-grid');
  EMOJIS.forEach(em => {
    const btn = document.createElement('button');
    btn.className = 'emoji-opt';
    btn.dataset.e = em;
    btn.textContent = em;
    btn.type = 'button';
    btn.onclick = () => {
      editEmoji = em;
      document.querySelectorAll('.emoji-opt').forEach(el => el.classList.remove('selected'));
      btn.classList.add('selected');
    };
    grid.appendChild(btn);
  });
}

// ── TABS ──────────────────────────────────
function goTab(name, btn) {
  document.querySelectorAll('.tabpanel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');

  if (name === 'read')  { renderChapters(); }
  if (name === 'notes') { switchNote('mine'); }
  if (name === 'verse') { renderVerseList(); }
  if (name === 'goal')  { renderGoalPage(); }
}

// ── FIREBASE HELPERS ──────────────────────
function userCol(u, col) {
  const { collection } = window._fns;
  return collection(window._db, 'users', u, col);
}

function sharedDocRef(...path) {
  const { doc } = window._fns;
  return doc(window._db, 'shared', 'couple', ...path);
}

function sharedColRef(col) {
  const { collection } = window._fns;
  return collection(window._db, 'shared', 'couple', col);
}

// ── SHARED STATE ──────────────────────────
async function loadShared() {
  try {
    const { getDoc } = window._fns;
    const snap = await getDoc(sharedDocRef('state', 'main'));
    if (snap.exists()) shared = snap.data();
  } catch(e) { console.warn('Offline, usando estado local'); }
}

async function saveShared() {
  try {
    const { setDoc } = window._fns;
    await setDoc(sharedDocRef('state', 'main'), shared);
  } catch(e) { console.error('Erro ao salvar:', e); }
}

// ── TOPBAR ────────────────────────────────
function updateTopbar() {
  document.getElementById('tb-book').textContent =
    shared.currentBook ? '📖 ' + shared.currentBook : 'Nenhum livro';
  const s = shared[uid + '_streak'] || 0;
  const el = document.getElementById('tb-streak');
  document.getElementById('streak-n').textContent = s;
  el.style.display = s > 0 ? 'flex' : 'none';
}

// ── LIVROS ────────────────────────────────
function buildBookSelect() {
  const sel = document.getElementById('book-sel');
  let lastG = '';
  BOOKS.forEach(b => {
    if (b.g !== lastG) {
      const og = document.createElement('optgroup');
      og.label = b.g === 'AT' ? '— Antigo Testamento' : '— Novo Testamento';
      sel.appendChild(og);
      lastG = b.g;
    }
    const o = document.createElement('option');
    o.value = b.n;
    o.textContent = b.n + ' (' + b.c + ')';
    sel.appendChild(o);
  });
}

function onBookChange() {
  const v = document.getElementById('book-sel').value;
  const book = BOOKS.find(b => b.n === v);
  const hint = document.getElementById('book-hint');
  if (book) {
    hint.style.display = 'block';
    hint.textContent = book.n + ' · ' + book.c + ' capítulos · ' + book.g;
  } else {
    hint.style.display = 'none';
  }
}

async function saveBook() {
  const v = document.getElementById('book-sel').value;
  if (!v) return alert('Selecione um livro primeiro!');
  if (shared.currentBook && shared.currentBook !== v) {
    if (!confirm('Trocar para "' + v + '"?\nO progresso de capítulos será zerado.')) return;
    shared.readChapters = [];
  }
  shared.currentBook = v;
  await saveShared();
  updateTopbar();
  renderChapters();
  renderHome();
}

// ── CAPÍTULOS ─────────────────────────────
function renderChapters() {
  if (shared.currentBook) {
    document.getElementById('book-sel').value = shared.currentBook;
    onBookChange();
  }
  const sec = document.getElementById('chap-section');
  if (!shared.currentBook) { sec.style.display = 'none'; return; }
  sec.style.display = 'block';

  const book = BOOKS.find(b => b.n === shared.currentBook);
  const read = shared.readChapters || [];
  const pct  = Math.round((read.length / book.c) * 100);

  document.getElementById('chap-lbl').textContent = book.n + ' · Capítulos';
  document.getElementById('chap-pct-lbl').textContent = read.length + ' / ' + book.c + ' — ' + pct + '%';
  document.getElementById('chap-bar').style.width = pct + '%';

  const grid = document.getElementById('chap-grid');
  grid.innerHTML = '';
  for (let i = 1; i <= book.c; i++) {
    const btn = document.createElement('button');
    btn.className = 'ch' + (read.includes(i) ? ' done' : '');
    btn.textContent = i;
    btn.onclick = () => toggleChapter(i);
    grid.appendChild(btn);
  }
}

async function toggleChapter(ch) {
  const read = shared.readChapters || [];
  const idx  = read.indexOf(ch);
  const todayKey = new Date().toDateString();

  if (idx === -1) {
    read.push(ch);
    if (shared[uid + '_todayKey'] !== todayKey) {
      shared[uid + '_todayKey']  = todayKey;
      shared[uid + '_todayRead'] = 0;
    }
    shared[uid + '_todayRead'] = (shared[uid + '_todayRead'] || 0) + 1;
    bumpStreak();
  } else {
    read.splice(idx, 1);
    shared[uid + '_todayRead'] = Math.max(0, (shared[uid + '_todayRead'] || 0) - 1);
  }

  shared.readChapters = read;
  await saveShared();
  renderChapters();
  renderHome();
  updateTopbar();
}

function bumpStreak() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const lastKey = uid + '_lastStreakDay';
  const strKey  = uid + '_streak';
  if (shared[lastKey] === yesterday) {
    shared[strKey] = (shared[strKey] || 0) + 1;
  } else if (shared[lastKey] !== today) {
    shared[strKey] = 1;
  }
  shared[lastKey] = today;
}

// ── NOTAS ─────────────────────────────────
function switchNote(view) {
  noteView = view;
  ['mine','partner','together'].forEach(v => {
    document.getElementById('nv-' + v).style.display = v === view ? 'block' : 'none';
    document.getElementById('nt-' + v).classList.toggle('active', v === view);
  });
  if (view === 'mine')     renderMyNotes();
  if (view === 'partner')  renderPartnerNotes();
  if (view === 'together') renderTogether();
}

async function saveNote() {
  const ch   = document.getElementById('n-ch').value.trim();
  const vs   = document.getElementById('n-vs').value.trim();
  const text = document.getElementById('n-text').value.trim();
  if (!text) return alert('Escreva sua anotação!');

  const p = getProfiles();
  const note = {
    who:       uid,
    name:      p[uid].name,
    emoji:     p[uid].emoji,
    ch:        ch || null,
    vs:        vs || null,
    text,
    book:      shared.currentBook || null,
    date:      new Date().toLocaleDateString('pt-BR'),
    createdAt: Date.now()
  };

  try {
    const { addDoc } = window._fns;
    await addDoc(userCol(uid, 'notes'), note);
  } catch(e) { console.error(e); }

  document.getElementById('n-text').value = '';
  document.getElementById('n-ch').value   = '';
  document.getElementById('n-vs').value   = '';
  renderMyNotes();
}

async function getNotes(u) {
  try {
    const { getDocs } = window._fns;
    const snap = await getDocs(userCol(u, 'notes'));
    return snap.docs.map(d => d.data()).sort((a, b) => b.createdAt - a.createdAt);
  } catch { return []; }
}

function noteCardHTML(n, isPartner) {
  const ref = n.ch || n.vs
    ? `<div class="note-ref">${n.ch ? 'Cap. ' + n.ch : ''}${n.vs ? ' : ' + n.vs : ''}</div>`
    : '';
  return `
    <div class="note-card">
      <div class="note-top">
        <span class="note-who">${n.emoji || ''} ${n.name || (n.who === 'dudu' ? 'Dudu' : 'Thata')}${n.book ? ' · ' + n.book : ''}</span>
        <span class="note-date">${n.date}</span>
      </div>
      ${ref}
      <div class="note-body">${n.text}</div>
    </div>`;
}

async function renderMyNotes() {
  const notes = await getNotes(uid);
  const el = document.getElementById('mine-list');
  if (!notes.length) {
    el.innerHTML = '<div class="block-empty center" style="margin-top:8px">Nenhuma anotação ainda ✨</div>';
    return;
  }
  el.innerHTML = notes.map(n => noteCardHTML(n, false)).join('');
}

async function renderPartnerNotes() {
  const partner = uid === 'dudu' ? 'thata' : 'dudu';
  const p = getProfiles();
  const partnerName = p[partner].name;
  const partnerEmoji = p[partner].emoji;

  document.getElementById('partner-header').innerHTML =
    `${partnerEmoji} <strong>${partnerName}</strong> — somente leitura 👀`;

  const notes = await getNotes(partner);
  const el = document.getElementById('partner-list');
  if (!notes.length) {
    el.innerHTML = `<div class="block-empty center" style="margin-top:8px">${partnerName} ainda não escreveu nada</div>`;
    return;
  }
  el.innerHTML = notes.map(n => noteCardHTML(n, true)).join('');
}

// ── TOGETHER / CHAT ───────────────────────
async function sendMsg() {
  const text = document.getElementById('together-txt').value.trim();
  if (!text) return;
  const p = getProfiles();
  const msg = {
    who:       uid,
    name:      p[uid].name,
    emoji:     p[uid].emoji,
    text,
    date:      new Date().toLocaleDateString('pt-BR'),
    createdAt: Date.now()
  };
  try {
    const { addDoc } = window._fns;
    await addDoc(sharedColRef('interactions'), msg);
  } catch(e) { console.error(e); }
  document.getElementById('together-txt').value = '';
  renderTogether();
  renderHome();
}

async function getInteractions() {
  try {
    const { getDocs } = window._fns;
    const snap = await getDocs(sharedColRef('interactions'));
    return snap.docs.map(d => d.data()).sort((a, b) => a.createdAt - b.createdAt);
  } catch { return []; }
}

async function renderTogether() {
  const msgs = await getInteractions();
  const wrap = document.getElementById('together-msgs');
  if (!msgs.length) {
    wrap.innerHTML = '<div class="block-empty center">Comecem a conversar aqui! ♡</div>';
    return;
  }
  wrap.innerHTML = msgs.map(m => {
    const isMine = m.who === uid;
    return `
      <div class="t-bubble ${isMine ? 'mine' : 'theirs'}">
        <div class="t-from">${m.emoji || ''} ${m.name || m.who}</div>
        ${m.text}
        <div class="t-date">${m.date}</div>
      </div>`;
  }).join('');
  wrap.scrollTop = wrap.scrollHeight;
}

// ── VERSÍCULO ─────────────────────────────
function showDailyVerse() {
  const v = VERSES[new Date().getDate() % VERSES.length];
  document.getElementById('hb-text').textContent = v.t;
  document.getElementById('hb-ref').textContent  = v.r;
}

function randomVerse() {
  const v = VERSES[Math.floor(Math.random() * VERSES.length)];
  document.getElementById('vb-text').textContent = v.t;
  document.getElementById('vb-ref').textContent  = v.r;
}

async function saveVerse() {
  const text = document.getElementById('v-text').value.trim();
  const ref  = document.getElementById('v-ref').value.trim();
  if (!text) return alert('Digite o versículo!');

  const v = {
    text, ref,
    date:      new Date().toLocaleDateString('pt-BR'),
    createdAt: Date.now()
  };
  try {
    const { addDoc } = window._fns;
    await addDoc(userCol(uid, 'verses'), v);
  } catch(e) { console.error(e); }
  document.getElementById('v-text').value = '';
  document.getElementById('v-ref').value  = '';
  renderVerseList();
}

async function renderVerseList() {
  try {
    const { getDocs } = window._fns;
    const snap = await getDocs(userCol(uid, 'verses'));
    const list = snap.docs.map(d => d.data()).sort((a, b) => b.createdAt - a.createdAt);
    const el = document.getElementById('verse-list');
    if (!list.length) {
      el.innerHTML = '<div class="block-empty center">Nenhum versículo salvo ainda 🌿</div>';
      return;
    }
    el.innerHTML = list.map(v => `
      <div class="verse-card">
        <div class="verse-card-text">${v.text}</div>
        ${v.ref ? `<div class="verse-card-ref">${v.ref}</div>` : ''}
        <div class="verse-card-date">${v.date}</div>
      </div>`).join('');
  } catch(e) { console.error(e); }
}

// ── HOME ──────────────────────────────────
async function renderHome() {
  // Livro
  const bEl = document.getElementById('home-book');
  if (shared.currentBook) {
    const book = BOOKS.find(b => b.n === shared.currentBook);
    const read = (shared.readChapters || []).length;
    const pct  = Math.round((read / book.c) * 100);
    bEl.innerHTML = `
      <div style="font-size:16px;font-weight:600;color:var(--t0);margin-bottom:10px">${book.n}</div>
      <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
      <div style="font-size:12px;color:var(--t2);margin-top:8px">${read} de ${book.c} capítulos · ${pct}%</div>`;
  } else {
    bEl.innerHTML = '<div class="block-empty">Selecione um livro na aba Leitura</div>';
  }

  // Meta
  const today = new Date();
  const isWE  = today.getDay() === 0 || today.getDay() === 6;
  const goal  = isWE ? 5 : 3;
  const done  = shared[uid + '_todayRead'] || 0;
  const pct   = Math.min(100, Math.round((done / goal) * 100));
  const label = isWE ? 'Final de semana' : 'Dia de semana';

  document.getElementById('hg-desc').textContent = label + ' · meta: ' + goal;
  document.getElementById('hg-chip').textContent = done + '/' + goal;
  document.getElementById('hg-bar').style.width  = pct + '%';
  document.getElementById('hg-hint').textContent = pct >= 100
    ? '🎉 Meta cumprida! Glória a Deus!'
    : (goal - done) + ' capítulo(s) restante(s) hoje';

  // Interações
  const msgs = await getInteractions();
  const el   = document.getElementById('home-msgs');
  const last3 = msgs.slice(-3).reverse();
  if (!last3.length) {
    el.innerHTML = '<div class="block-empty center">Nenhuma mensagem ainda</div>';
    return;
  }
  el.innerHTML = last3.map(m => `
    <div class="msg-bubble">
      <div class="msg-from">${m.emoji || ''} ${m.name || m.who}</div>
      <div class="msg-text">${m.text}</div>
      <div class="msg-date">${m.date}</div>
    </div>`).join('');
}

// ── META PAGE ─────────────────────────────
async function renderGoalPage() {
  const read = (shared.readChapters || []).length;
  const streak = shared[uid + '_streak'] || 0;
  document.getElementById('sg-caps').textContent   = read;
  document.getElementById('sg-streak').textContent = streak;

  try {
    const { getDocs } = window._fns;
    const [ns, vs] = await Promise.all([
      getDocs(userCol(uid, 'notes')),
      getDocs(userCol(uid, 'verses'))
    ]);
    document.getElementById('sg-notes').textContent  = ns.size;
    document.getElementById('sg-verses').textContent = vs.size;
  } catch {}

  const today = new Date();
  const isWE  = today.getDay() === 0 || today.getDay() === 6;
  const goal  = isWE ? 5 : 3;
  const done  = shared[uid + '_todayRead'] || 0;
  const pct   = Math.min(100, Math.round((done / goal) * 100));

  document.getElementById('gg-desc').textContent = (isWE ? 'Final de semana' : 'Dia de semana') + ' · ' + goal + ' caps';
  document.getElementById('gg-chip').textContent = done + '/' + goal;
  document.getElementById('gg-bar').style.width  = pct + '%';
  document.getElementById('gg-hint').textContent = pct >= 100
    ? '🎉 Meta cumprida! Glória a Deus!'
    : (goal - done) + ' capítulo(s) restante(s)';

  const bEl = document.getElementById('goal-book');
  if (shared.currentBook) {
    const book = BOOKS.find(b => b.n === shared.currentBook);
    const readCh = (shared.readChapters || []).length;
    const pctB   = Math.round((readCh / book.c) * 100);
    bEl.innerHTML = `
      <div class="book-prog-title">${book.n}</div>
      <div class="bar" style="height:10px"><div class="bar-fill" style="width:${pctB}%"></div></div>
      <div class="book-prog-sub">${readCh} de ${book.c} capítulos · ${pctB}%</div>`;
  } else {
    bEl.innerHTML = '<div class="block-empty">Nenhum livro selecionado</div>';
  }
}
