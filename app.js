// ============================================
//  NÓS NA PALAVRA — App Logic
//  Firebase Firestore + GitHub Pages
// ============================================

// ---- DADOS BÍBLICOS ----
const BOOKS = [
  {n:"Gênesis",c:50,t:"AT"},{n:"Êxodo",c:40,t:"AT"},{n:"Levítico",c:27,t:"AT"},
  {n:"Números",c:36,t:"AT"},{n:"Deuteronômio",c:34,t:"AT"},{n:"Josué",c:24,t:"AT"},
  {n:"Juízes",c:21,t:"AT"},{n:"Rute",c:4,t:"AT"},{n:"1 Samuel",c:31,t:"AT"},
  {n:"2 Samuel",c:24,t:"AT"},{n:"1 Reis",c:22,t:"AT"},{n:"2 Reis",c:25,t:"AT"},
  {n:"1 Crônicas",c:29,t:"AT"},{n:"2 Crônicas",c:36,t:"AT"},{n:"Esdras",c:10,t:"AT"},
  {n:"Neemias",c:13,t:"AT"},{n:"Ester",c:10,t:"AT"},{n:"Jó",c:42,t:"AT"},
  {n:"Salmos",c:150,t:"AT"},{n:"Provérbios",c:31,t:"AT"},{n:"Eclesiastes",c:12,t:"AT"},
  {n:"Cantares",c:8,t:"AT"},{n:"Isaías",c:66,t:"AT"},{n:"Jeremias",c:52,t:"AT"},
  {n:"Lamentações",c:5,t:"AT"},{n:"Ezequiel",c:48,t:"AT"},{n:"Daniel",c:12,t:"AT"},
  {n:"Oséias",c:14,t:"AT"},{n:"Joel",c:3,t:"AT"},{n:"Amós",c:9,t:"AT"},
  {n:"Obadias",c:1,t:"AT"},{n:"Jonas",c:4,t:"AT"},{n:"Miquéias",c:7,t:"AT"},
  {n:"Naum",c:3,t:"AT"},{n:"Habacuque",c:3,t:"AT"},{n:"Sofonias",c:3,t:"AT"},
  {n:"Ageu",c:2,t:"AT"},{n:"Zacarias",c:14,t:"AT"},{n:"Malaquias",c:4,t:"AT"},
  {n:"Mateus",c:28,t:"NT"},{n:"Marcos",c:16,t:"NT"},{n:"Lucas",c:24,t:"NT"},
  {n:"João",c:21,t:"NT"},{n:"Atos",c:28,t:"NT"},{n:"Romanos",c:16,t:"NT"},
  {n:"1 Coríntios",c:16,t:"NT"},{n:"2 Coríntios",c:13,t:"NT"},{n:"Gálatas",c:6,t:"NT"},
  {n:"Efésios",c:6,t:"NT"},{n:"Filipenses",c:4,t:"NT"},{n:"Colossenses",c:4,t:"NT"},
  {n:"1 Tessalonicenses",c:5,t:"NT"},{n:"2 Tessalonicenses",c:3,t:"NT"},
  {n:"1 Timóteo",c:6,t:"NT"},{n:"2 Timóteo",c:4,t:"NT"},{n:"Tito",c:3,t:"NT"},
  {n:"Filemom",c:1,t:"NT"},{n:"Hebreus",c:13,t:"NT"},{n:"Tiago",c:5,t:"NT"},
  {n:"1 Pedro",c:5,t:"NT"},{n:"2 Pedro",c:3,t:"NT"},{n:"1 João",c:5,t:"NT"},
  {n:"2 João",c:1,t:"NT"},{n:"3 João",c:1,t:"NT"},{n:"Judas",c:1,t:"NT"},
  {n:"Apocalipse",c:22,t:"NT"}
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
  {t:"Porque onde estiverem dois ou três reunidos em meu nome, ali estou eu no meio deles.",r:"Mateus 18:20"},
  {t:"E nós amamos a Deus porque ele nos amou primeiro.",r:"1 João 4:19"},
  {t:"Alegrai-vos na esperança, sede pacientes na tribulação, perseverai na oração.",r:"Romanos 12:12"},
  {t:"A tua palavra é uma lâmpada para os meus pés e uma luz para o meu caminho.",r:"Salmos 119:105"},
  {t:"Porque eu bem sei os planos que tenho para vocês, diz o Senhor.",r:"Jeremias 29:11"},
];

// ---- ESTADO GLOBAL ----
let currentUser = null; // 'dudu' | 'thata'
let noteView = 'minhas';
let msgWho = null; // set on sendInteraction

// ---- AGUARDAR FIREBASE ----
function waitForFirebase(cb, attempts = 0) {
  if (window._fb && window._db) { cb(); return; }
  if (attempts > 40) { console.error('Firebase não carregou'); cb(); return; }
  setTimeout(() => waitForFirebase(cb, attempts + 1), 150);
}

// ---- SELEÇÃO DE USUÁRIO ----
function selectUser(uid) {
  currentUser = uid;
  document.body.className = 'user-' + uid;

  const isD = uid === 'dudu';
  document.getElementById('header-avatar').textContent = isD ? 'D' : 'T';
  document.getElementById('header-avatar').className = 'header-avatar ' + (isD ? 'dudu-avatar' : 'thata-avatar');
  document.getElementById('header-name').textContent = isD ? 'Dudu' : 'Thata';

  document.getElementById('screen-select').classList.remove('active');
  document.getElementById('screen-app').classList.add('active');

  waitForFirebase(() => {
    loadAll();
  });
}

function backToSelect() {
  currentUser = null;
  document.body.className = '';
  document.getElementById('screen-app').classList.remove('active');
  document.getElementById('screen-select').classList.add('active');
}

// ---- NAVEGAÇÃO ----
function showPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  if (btn) btn.classList.add('active');

  if (name === 'leitura') renderChapters();
  if (name === 'notas') { renderMyNotes(); renderPartnerNotes(); renderChat(); }
  if (name === 'meta') renderMeta();
  if (name === 'versiculo') renderVerses();
}

// ---- CARGA INICIAL ----
async function loadAll() {
  await Promise.all([loadSharedState(), loadDailyVerse()]);
  renderHome();
}

// ---- SHARED STATE (livro + capítulos compartilhados) ----
let sharedState = { currentBook: null, readChapters: [] };

async function loadSharedState() {
  try {
    const fb = window._fb;
    const d = await fb.getDoc(fb.sharedDoc('state/main'));
    if (d.exists()) sharedState = d.data();
  } catch(e) { console.log('Shared state offline, usando local', e); }
  updateHeaderBook();
}

async function saveSharedState() {
  try {
    const fb = window._fb;
    await fb.setDoc(fb.sharedDoc('state/main'), sharedState);
  } catch(e) { console.error('Erro ao salvar estado:', e); }
}

// ---- LIVRO ----
function populateBookSelect() {
  const sel = document.getElementById('book-select');
  if (sel.options.length > 1) return; // já populado
  let lastT = '';
  BOOKS.forEach(b => {
    if (b.t !== lastT) {
      const og = document.createElement('optgroup');
      og.label = b.t === 'AT' ? '— Antigo Testamento —' : '— Novo Testamento —';
      sel.appendChild(og);
      lastT = b.t;
    }
    const o = document.createElement('option');
    o.value = b.n; o.textContent = b.n + ' (' + b.c + ' caps)';
    sel.appendChild(o);
  });
  if (sharedState.currentBook) sel.value = sharedState.currentBook;
}

function onBookChange() {
  const v = document.getElementById('book-select').value;
  const book = BOOKS.find(b => b.n === v);
  const meta = document.getElementById('book-meta');
  if (book) {
    meta.style.display = 'block';
    meta.textContent = '📖 ' + book.n + ' · ' + book.c + ' capítulos · ' + book.t;
  } else {
    meta.style.display = 'none';
  }
}

async function saveBook() {
  const v = document.getElementById('book-select').value;
  if (!v) return alert('Selecione um livro primeiro!');
  if (sharedState.currentBook !== v) {
    if (!confirm('Trocar para "' + v + '"? O progresso de capítulos será zerado.')) return;
    sharedState.readChapters = [];
  }
  sharedState.currentBook = v;
  await saveSharedState();
  updateHeaderBook();
  renderChapters();
  renderHome();
}

function updateHeaderBook() {
  const el = document.getElementById('header-book');
  el.textContent = sharedState.currentBook ? '📖 ' + sharedState.currentBook : 'Nenhum livro selecionado';
}

// ---- CAPÍTULOS ----
function renderChapters() {
  populateBookSelect();
  const sec = document.getElementById('chapters-section');
  if (!sharedState.currentBook) { sec.style.display = 'none'; return; }
  sec.style.display = 'block';

  const book = BOOKS.find(b => b.n === sharedState.currentBook);
  document.getElementById('ch-book-title').textContent = book.n;
  document.getElementById('ch-count-label').textContent = book.c + ' caps.';

  const read = sharedState.readChapters || [];
  const pct = Math.round((read.length / book.c) * 100);
  document.getElementById('ch-prog').style.width = pct + '%';
  document.getElementById('ch-pct-label').textContent = read.length + ' de ' + book.c + ' capítulos lidos (' + pct + '%)';

  const grid = document.getElementById('chapter-grid');
  grid.innerHTML = '';
  for (let i = 1; i <= book.c; i++) {
    const btn = document.createElement('button');
    btn.className = 'ch-btn' + (read.includes(i) ? ' read' : '');
    btn.textContent = i;
    btn.onclick = () => toggleChapter(i);
    grid.appendChild(btn);
  }
}

async function toggleChapter(ch) {
  const read = sharedState.readChapters || [];
  const idx = read.indexOf(ch);
  const todayKey = 'todayRead_' + new Date().toDateString();

  if (idx === -1) {
    read.push(ch);
    sharedState.readChapters = read;
    // streak e todayRead
    sharedState[currentUser + '_todayRead'] = (sharedState[currentUser + '_todayRead'] || 0) + 1;
    sharedState[currentUser + '_todayKey'] = todayKey;
    updateStreak();
  } else {
    read.splice(idx, 1);
    sharedState.readChapters = read;
    const tr = sharedState[currentUser + '_todayRead'] || 0;
    if (tr > 0) sharedState[currentUser + '_todayRead'] = tr - 1;
  }

  await saveSharedState();
  renderChapters();
  renderHome();
  renderMeta();
  updateHeaderBook();
}

function updateStreak() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const key = currentUser + '_lastStreak';
  const strKey = currentUser + '_streak';

  if (sharedState[key] === yesterday) {
    sharedState[strKey] = (sharedState[strKey] || 0) + 1;
  } else if (sharedState[key] !== today) {
    sharedState[strKey] = 1;
  }
  sharedState[key] = today;

  const s = sharedState[strKey] || 0;
  document.getElementById('streak-count').textContent = s;
  document.getElementById('header-streak').style.display = s > 0 ? '' : 'none';
}

// ---- NOTAS ----
async function saveNote() {
  const ch = document.getElementById('note-ch').value;
  const vs = document.getElementById('note-vs').value;
  const txt = document.getElementById('note-text').value.trim();
  if (!txt) return alert('Digite uma anotação primeiro!');

  const note = {
    who: currentUser,
    ch: ch || null,
    vs: vs || null,
    text: txt,
    book: sharedState.currentBook || null,
    date: new Date().toLocaleDateString('pt-BR'),
    createdAt: Date.now()
  };

  try {
    const fb = window._fb;
    await fb.addDoc(fb.colRef(currentUser, 'notes'), note);
  } catch(e) { console.error('Erro ao salvar nota:', e); }

  document.getElementById('note-text').value = '';
  document.getElementById('note-ch').value = '';
  document.getElementById('note-vs').value = '';
  renderMyNotes();
  renderMeta();
}

async function loadNotes(uid) {
  try {
    const fb = window._fb;
    const snap = await fb.getDocs(fb.colRef(uid, 'notes'));
    return snap.docs.map(d => d.data()).sort((a,b) => b.createdAt - a.createdAt);
  } catch(e) { return []; }
}

async function renderMyNotes() {
  const notes = await loadNotes(currentUser);
  const list = document.getElementById('my-notes-list');
  if (!notes.length) { list.innerHTML = '<div class="empty-state">Nenhuma anotação ainda...<br>Registre o que o Senhor falar com você ✨</div>'; return; }
  const tag = currentUser === 'dudu' ? 'note-tag-dudu' : 'note-tag-thata';
  const lbl = currentUser === 'dudu' ? 'Dudu' : 'Thata';
  list.innerHTML = notes.map(n => `
    <div class="note-card">
      <div class="note-card-header">
        <span class="note-tag ${tag}">${lbl}${n.book ? ' · ' + n.book : ''}</span>
        <span class="note-date">${n.date}</span>
      </div>
      ${n.ch || n.vs ? `<div class="note-ref">${n.ch ? 'Cap. ' + n.ch : ''}${n.vs ? ':' + n.vs : ''}</div>` : ''}
      <div class="note-text">${n.text}</div>
    </div>`).join('');
}

async function renderPartnerNotes() {
  const partner = currentUser === 'dudu' ? 'thata' : 'dudu';
  const partnerName = partner === 'dudu' ? 'Dudu' : 'Thata';
  const tag = partner === 'dudu' ? 'note-tag-dudu' : 'note-tag-thata';
  const colorVar = partner === 'dudu' ? 'var(--dudu-bg)' : 'var(--thata-bg)';
  const borderVar = partner === 'dudu' ? 'var(--dudu-border)' : 'var(--thata-border)';
  const colorText = partner === 'dudu' ? 'var(--dudu2)' : 'var(--thata2)';

  // atualiza label
  document.getElementById('nt-parceiro-label').textContent = partner === 'dudu' ? 'e' : 'a'; // dele/dela

  const banner = document.getElementById('partner-banner');
  banner.style.cssText = `background:${colorVar};border:1px solid ${borderVar};color:${colorText};`;
  banner.innerHTML = `<strong>Notas de ${partnerName}</strong> — leitura somente 👀`;

  const notes = await loadNotes(partner);
  const list = document.getElementById('partner-notes-list');
  if (!notes.length) { list.innerHTML = `<div class="empty-state">${partnerName} ainda não escreveu nada 📝</div>`; return; }
  list.innerHTML = notes.map(n => `
    <div class="note-card">
      <div class="note-card-header">
        <span class="note-tag ${tag}">${partnerName}${n.book ? ' · ' + n.book : ''}</span>
        <span class="note-date">${n.date}</span>
      </div>
      ${n.ch || n.vs ? `<div class="note-ref">${n.ch ? 'Cap. ' + n.ch : ''}${n.vs ? ':' + n.vs : ''}</div>` : ''}
      <div class="note-text">${n.text}</div>
    </div>`).join('');
}

// ---- INTERAÇÕES (JUNTOS) ----
async function sendInteraction() {
  const txt = document.getElementById('chat-msg').value.trim();
  if (!txt) return;
  const msg = {
    who: currentUser,
    text: txt,
    date: new Date().toLocaleDateString('pt-BR'),
    createdAt: Date.now()
  };
  try {
    const fb = window._fb;
    await fb.addDoc(fb.sharedRef('interactions'), msg);
  } catch(e) { console.error('Erro ao enviar:', e); }
  document.getElementById('chat-msg').value = '';
  renderChat();
  renderHome();
}

async function loadInteractions() {
  try {
    const fb = window._fb;
    const snap = await fb.getDocs(fb.sharedRef('interactions'));
    return snap.docs.map(d => d.data()).sort((a,b) => a.createdAt - b.createdAt);
  } catch(e) { return []; }
}

async function renderChat() {
  const msgs = await loadInteractions();
  const wrap = document.getElementById('chat-wrap');
  if (!msgs.length) { wrap.innerHTML = '<div class="empty-state">Comecem a conversar aqui! 💑</div>'; return; }
  wrap.innerHTML = msgs.map(m => `
    <div class="chat-bubble ${m.who}">
      <div class="bubble-from">${m.who === 'dudu' ? 'Dudu' : 'Thata'}</div>
      ${m.text}
      <div class="bubble-date">${m.date}</div>
    </div>`).join('');
  wrap.scrollTop = wrap.scrollHeight;
}

// ---- NOTAS VIEW SWITCH ----
function switchNoteView(view) {
  noteView = view;
  ['minhas','parceiro','juntos'].forEach(v => {
    const el = document.getElementById('notesview-' + v);
    const btn = document.getElementById('nt-' + v);
    if (el) el.style.display = v === view ? 'block' : 'none';
    if (btn) btn.classList.toggle('active', v === view);
  });
  if (view === 'parceiro') renderPartnerNotes();
  if (view === 'juntos') renderChat();
}

// ---- VERSÍCULO ----
function loadDailyVerse() {
  const idx = new Date().getDate() % VERSES.length;
  const v = VERSES[idx];
  document.getElementById('daily-verse-text').textContent = v.t;
  document.getElementById('daily-verse-ref').textContent = v.r;
}

function loadRandomVerse() {
  const idx = Math.floor(Math.random() * VERSES.length);
  const v = VERSES[idx];
  document.getElementById('rema-text').textContent = v.t;
  document.getElementById('rema-ref').textContent = v.r;
}

async function saveVerse() {
  const t = document.getElementById('v-text').value.trim();
  const r = document.getElementById('v-ref').value.trim();
  if (!t) return alert('Digite o versículo!');
  const verse = { who: currentUser, text: t, ref: r, date: new Date().toLocaleDateString('pt-BR'), createdAt: Date.now() };
  try {
    const fb = window._fb;
    await fb.addDoc(fb.colRef(currentUser, 'verses'), verse);
  } catch(e) { console.error('Erro ao salvar versículo:', e); }
  document.getElementById('v-text').value = '';
  document.getElementById('v-ref').value = '';
  renderVerses();
  renderMeta();
}

async function renderVerses() {
  try {
    const fb = window._fb;
    const snap = await fb.getDocs(fb.colRef(currentUser, 'verses'));
    const list = snap.docs.map(d => d.data()).sort((a,b) => b.createdAt - a.createdAt);
    const el = document.getElementById('verses-list');
    if (!list.length) { el.innerHTML = '<div class="empty-state">Nenhum versículo salvo ainda 🌿</div>'; return; }
    el.innerHTML = list.map(v => `
      <div class="verse-card">
        <div class="verse-card-text">${v.text}</div>
        <div class="verse-card-ref">${v.ref || 'Versículo salvo'}</div>
        <div class="verse-card-date">${v.date}</div>
      </div>`).join('');
  } catch(e) { console.error(e); }
}

// ---- HOME ----
async function renderHome() {
  // Progresso do livro
  const bCard = document.getElementById('home-book-card');
  if (sharedState.currentBook) {
    const book = BOOKS.find(b => b.n === sharedState.currentBook);
    const read = (sharedState.readChapters || []).length;
    const pct = Math.round((read / book.c) * 100);
    bCard.innerHTML = `
      <div class="bpc-title">${book.n}</div>
      <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>
      <div class="bpc-sub">${read} de ${book.c} capítulos · ${pct}%</div>`;
  } else {
    bCard.innerHTML = '<div class="bpc-empty">Selecione um livro na aba Leitura 📚</div>';
  }

  // Meta
  const today = new Date();
  const isWE = today.getDay() === 0 || today.getDay() === 6;
  const metaGoal = isWE ? 5 : 3;
  const todayRead = sharedState[currentUser + '_todayRead'] || 0;
  const pct = Math.min(100, Math.round((todayRead / metaGoal) * 100));
  document.getElementById('meta-day-label').textContent = (isWE ? 'Final de semana' : 'Dia de semana') + ' · Meta: ' + metaGoal + ' caps';
  document.getElementById('meta-badge').textContent = todayRead + '/' + metaGoal;
  document.getElementById('home-prog').style.width = pct + '%';
  document.getElementById('meta-hint-text').textContent = pct >= 100 ? '🎉 Meta cumprida hoje! Glória a Deus!' : (metaGoal - todayRead) + ' capítulos restantes para hoje';

  // Streak
  const s = sharedState[currentUser + '_streak'] || 0;
  document.getElementById('streak-count').textContent = s;

  // Interações
  const msgs = await loadInteractions();
  const el = document.getElementById('home-interactions');
  const last3 = msgs.slice(-3).reverse();
  if (!last3.length) { el.innerHTML = '<div class="empty-state">Nenhuma interação ainda 💑</div>'; return; }
  el.innerHTML = last3.map(m => `
    <div class="home-msg ${m.who}">
      <div class="home-msg-from">${m.who === 'dudu' ? 'Dudu' : 'Thata'} · ${m.date}</div>
      ${m.text}
    </div>`).join('');
}

// ---- META PAGE ----
async function renderMeta() {
  // Stats
  const read = (sharedState.readChapters || []).length;
  const streak = sharedState[currentUser + '_streak'] || 0;
  document.getElementById('st-caps').textContent = read;
  document.getElementById('st-streak').textContent = streak;
  document.getElementById('meta-streak-num').textContent = streak;

  try {
    const fb = window._fb;
    const [notesSnap, versesSnap] = await Promise.all([
      fb.getDocs(fb.colRef(currentUser, 'notes')),
      fb.getDocs(fb.colRef(currentUser, 'verses'))
    ]);
    document.getElementById('st-notes').textContent = notesSnap.size;
    document.getElementById('st-verses').textContent = versesSnap.size;
  } catch(e) {}

  const today = new Date();
  const isWE = today.getDay() === 0 || today.getDay() === 6;
  const goal = isWE ? 5 : 3;
  const done = sharedState[currentUser + '_todayRead'] || 0;
  const pct = Math.min(100, Math.round((done / goal) * 100));
  document.getElementById('meta-goal-label').textContent = (isWE ? 'Final de semana' : 'Dia de semana') + ' — meta de ' + goal + ' capítulos';
  document.getElementById('meta-prog').style.width = pct + '%';
  document.getElementById('meta-prog-label').textContent = done + ' de ' + goal + ' capítulos lidos hoje (' + pct + '%)';

  // Progresso do livro
  const bEl = document.getElementById('meta-book-prog');
  if (sharedState.currentBook) {
    const book = BOOKS.find(b => b.n === sharedState.currentBook);
    const readCh = (sharedState.readChapters || []).length;
    const pctB = Math.round((readCh / book.c) * 100);
    bEl.innerHTML = `
      <div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:var(--fg0);margin-bottom:10px">${book.n}</div>
      <div class="prog-bar" style="height:12px"><div class="prog-fill" style="width:${pctB}%"></div></div>
      <p style="font-size:12px;color:var(--fg2);margin-top:8px">${readCh} de ${book.c} capítulos · ${pctB}%</p>`;
  } else {
    bEl.innerHTML = '<div class="empty-state">Nenhum livro selecionado</div>';
  }
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  loadDailyVerse();
  loadRandomVerse();
});
