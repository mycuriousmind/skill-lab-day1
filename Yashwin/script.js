/* =====================================================================
   EDIT HERE. Everything on the page is generated from this object.
   Entries marked sample: true show a "Sample" tag; delete that flag
   (or the whole entry) once you replace it with your own.
   ===================================================================== */
const PROFILE = {
  name: "Yashwin G Devadiga",
  role: "Computer Science and Engineering",
  tagline: "Student in RVCE, looking for a job",
  about: "Specialized in AIML, Systems Architecture and Design",
  facts: [
    ["Based in", "Bangalore, India"],
    ["Focus", "Data analysis, AIML, Systems Architecture"],
    ["Open to", "Corporate Jobs above 18 LPA only"]
  ],
  achievements: [
    { title: "Built a custom built ANN model for Cheminformatics", org: "Department of Chemistry", date: "2026", category: "Project",
      description: "Built and tested an ANN Model for predicting chemical and physical properties",
      metric: "Achieved an accurace of 80%", sample: true },
    { title: "Audited a 400-row property dataset", org: "Department of Chemistry", date: "2026", category: "Research",
      description: "Cross-checked values against reference databases, found a systematic error in one derived column and fixed the pipeline that produced it.",
      metric: "Error rate: 5 to 6%", sample: true },
    { title: "Sent a paper to be published", org: "Springer", date: "2026", category: "Research",
      description: "Tried publishing in IEEE and Springer",
      metric: "", sample: true },
  ],
  experience: [
    { title: "Student", where: "R.V. College of Education", dates: "Jun 2026 to Present",
      points: [""], sample: true },
    { title: "Future developer", where: "Some Company", dates: "2029 to Forever",
      points: ["Nothing", "Nothing changed"], sample: true }
  ],
  skills: {
    "Languages": ["Python", "C", "JavaScript", "SQL"],
    "Simulation": ["Markov models", "Numerical methods"],
    "Data": ["pandas", "NumPy", "Data validation", "Plotting"],
    "Practice": ["Git", "Testing"]
  },
  education: [
    { title: "B.E. in Computer Science and Engineering", where: "R.V. College of Engineering", dates: "2025 to 2029", detail: "Failed JEE, landed here."}
  ],
  contact: {
    text: "I am open to jobs. Please give job.",
    email: "yashwingd.cs25@rvce.edu.in",
    links: [
      { label: "GitHub", url: "https://github.com/YashDev562" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/yashwin-devadiga-a3b907380/" },
    ]
  }
};

/* ---------- rendering ---------- */
const $ = (id) => document.getElementById(id);
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const STORE_KEY = "portfolio-added-v1";
function loadAdded() { try { return JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); } catch (e) { return []; } }
function saveAdded(list) { try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch (e) {} }
let added = loadAdded();
let activeCat = "All";

const revealIO = ("IntersectionObserver" in window)
  ? new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" })
  : null;
function reveal(node, delay) {
  if (reduced || !revealIO) return;
  node.style.setProperty("--d", (delay || 0) + "ms");
  node.classList.add("reveal");
  revealIO.observe(node);
}

function renderStatic() {
  document.title = PROFILE.name + " Portfolio";
  $("brand-name").textContent = PROFILE.name;
  $("h-name").textContent = PROFILE.name;
  $("h-role").textContent = PROFILE.role;
  $("h-tag").textContent = PROFILE.tagline;
  $("about-text").textContent = PROFILE.about;
  $("foot-name").textContent = "© " + new Date().getFullYear() + " " + PROFILE.name;
  const facts = $("facts");
  PROFILE.facts.forEach(([k, v]) => { const row = el("div"); row.append(el("dt", null, k), el("dd", null, v)); facts.append(row); });

  const tl = $("timeline");
  PROFILE.experience.forEach((x, xi) => {
    const li = el("li");
    const head = el("div", "mono", x.dates); head.style.color = "var(--muted)";
    const ul = el("ul"); x.points.forEach((p) => ul.append(el("li", null, p)));
    li.append(head, el("h3", null, x.title), el("div", "where", x.where), ul);
    tl.append(li); reveal(li, xi * 100);
  });

  const sg = $("skill-groups");
  Object.entries(PROFILE.skills).forEach(([group, items]) => {
    const box = el("div"); box.append(el("h3", null, group));
    const pills = el("div", "pills"); items.forEach((s) => pills.append(el("span", "pill", s)));
    box.append(pills); sg.append(box); reveal(box, (sg.children.length - 1) * 90);
  });

  const edu = $("edu");
  PROFILE.education.forEach((e) => {
    const row = el("div"); const left = el("div"); left.style.cssText = "display:block;border:0;padding:0";
    left.append(el("strong", null, e.title), el("div", "note", e.where + (e.detail ? " · " + e.detail : "")));
    row.append(left, el("span", "mono", e.dates)); edu.append(row); reveal(row, 0);
  });

  $("contact-text").textContent = PROFILE.contact.text;
  $("mail-text").textContent = PROFILE.contact.email;
  const links = $("links");
  PROFILE.contact.links.forEach((l) => { const a = el("a", "btn ghost", l.label); a.href = l.url; a.target = "_blank"; a.rel = "noopener noreferrer"; links.append(a); });
  $("copy-mail").addEventListener("click", () => copyText(PROFILE.contact.email, $("copy-mail"), "Copy address"));
}

function allItems() { return PROFILE.achievements.map((a) => ({ ...a })).concat(added.map((a, i) => ({ ...a, addedIndex: i }))); }
function categories() { const set = new Set(allItems().map((a) => a.category).filter(Boolean)); return ["All", ...set]; }

function renderChips() {
  const cats = categories();
  if (!cats.includes(activeCat)) activeCat = "All";
  const box = $("chips"); box.textContent = "";
  cats.forEach((c) => {
    const b = el("button", "chip", c); b.type = "button"; b.setAttribute("aria-pressed", String(c === activeCat));
    b.addEventListener("click", () => { activeCat = c; renderChips(); renderCards(); });
    box.append(b);
  });
  const dl = $("cat-list"); dl.textContent = "";
  cats.filter((c) => c !== "All").forEach((c) => { const o = document.createElement("option"); o.value = c; dl.append(o); });
}

function renderCards() {
  const grid = $("grid"); grid.textContent = "";
  const items = allItems().filter((a) => activeCat === "All" || a.category === activeCat);
  if (!items.length) { grid.append(el("p", "empty", "No achievements in this category yet.")); return; }
  items.forEach((a, idx) => {
    const card = el("article", "card");
    const top = el("div", "top");
    top.append(el("span", "mono", a.date || ""), el("span", null, ""));
    const tags = top.lastChild; tags.style.display = "flex"; tags.style.gap = "6px";
    if (a.category) tags.append(el("span", "tag", a.category));
    if (a.sample) tags.append(el("span", "tag", "Sample"));
    card.append(top, el("h3", null, a.title));
    if (a.org) card.append(el("div", "org", a.org));
    if (a.description) card.append(el("p", "desc", a.description));
    if (a.metric) card.append(el("div", "metric", a.metric));
    if (a.addedIndex != null) {
      const d = el("button", "del", "Remove"); d.type = "button";
      d.addEventListener("click", () => { added.splice(a.addedIndex, 1); saveAdded(added); renderChips(); renderCards(); });
      card.append(d); card.style.paddingBottom = "38px";
    }
    attachTilt(card);
    reveal(card, (idx % 3) * 80);
    grid.append(card);
  });
}

function attachTilt(card) {
  if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = "translateZ(18px) rotateX(" + (-y * 14).toFixed(2) + "deg) rotateY(" + (x * 16).toFixed(2) + "deg)";
    card.style.setProperty("--mx", ((x + 0.5) * 100).toFixed(1) + "%");
    card.style.setProperty("--my", ((y + 0.5) * 100).toFixed(1) + "%");
  });
  card.addEventListener("pointerleave", () => { card.style.transform = ""; });
}

function copyText(text, btn, resetLabel) {
  const done = (msg) => { btn.textContent = msg; setTimeout(() => { btn.textContent = resetLabel; }, 1800); };
  const fallback = () => {
    const ta = document.createElement("textarea"); ta.value = text; ta.style.cssText = "position:fixed;opacity:0";
    document.body.append(ta); ta.select(); let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    ta.remove(); done(ok ? "Copied" : "Select and copy");
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => done("Copied"), fallback);
  else fallback();
}

$("add-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = $("f-title").value.trim(); if (!title) return;
  added.push({ title, org: $("f-org").value.trim(), date: $("f-date").value.trim(), category: $("f-cat").value.trim() || "Other",
    description: $("f-desc").value.trim(), metric: $("f-metric").value.trim() });
  saveAdded(added); e.target.reset(); renderChips(); renderCards();
  $("form-note").textContent = "Added. It appears in the grid above.";
});
$("copy-json").addEventListener("click", () => {
  const text = added.length ? JSON.stringify(added, null, 2) : "// No added entries yet";
  copyText(text, $("copy-json"), "Copy my entries as JSON");
});

/* ---------- theme ---------- */
const root = document.documentElement;
const darkMQ = window.matchMedia("(prefers-color-scheme: dark)");
function effectiveTheme() { return root.dataset.theme || (darkMQ.matches ? "dark" : "light"); }
$("theme-btn").addEventListener("click", () => { root.dataset.theme = effectiveTheme() === "dark" ? "light" : "dark"; });

renderStatic(); renderChips(); renderCards();

/* ---------- 3D molecule ---------- */
(function scene3d() {
  const holder = $("scene");
  if (typeof THREE === "undefined") { holder.hidden = true; return; }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
  catch (e) { holder.hidden = true; return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  holder.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 9.2);
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(4, 5, 6); scene.add(key);
  const rim = new THREE.PointLight(0xffffff, 0.5); rim.position.set(-6, -3, 3); scene.add(rim);

  function rng(seed) { return function () { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const rand = rng(7);
  const atoms = [];
  for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
    if (rand() < 0.28) continue;
    atoms.push({ p: new THREE.Vector3(x * 1.45 + (rand() - 0.5) * 0.5, y * 1.45 + (rand() - 0.5) * 0.5, z * 1.45 + (rand() - 0.5) * 0.5), kind: rand() });
  }

  const group = new THREE.Group(); scene.add(group);
  const ringMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.45 });
  const ringGeo = new THREE.TorusGeometry(3.0, 0.014, 8, 160);
  const ringA = new THREE.Mesh(ringGeo, ringMat), ringB = new THREE.Mesh(ringGeo, ringMat);
  ringA.rotation.set(1.15, 0.2, 0); ringB.rotation.set(0.5, 0.9, 0.6); ringB.scale.setScalar(0.82);
  scene.add(ringA, ringB);
  const atomMats = [new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.1 }), new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.1 }), new THREE.MeshStandardMaterial({ roughness: 0.35, metalness: 0.1 })];
  const bondMat = new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0, transparent: true, opacity: 0.55 });
  const sphereGeo = new THREE.SphereGeometry(1, 28, 20);
  atoms.forEach((a) => {
    const idx = a.kind < 0.6 ? 0 : a.kind < 0.88 ? 1 : 2;
    const m = new THREE.Mesh(sphereGeo, atomMats[idx]);
    const s = idx === 0 ? 0.34 : idx === 1 ? 0.27 : 0.2;
    m.scale.setScalar(s); m.position.copy(a.p); group.add(m);
  });
  const cylGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 10);
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < atoms.length; i++) for (let j = i + 1; j < atoms.length; j++) {
    const d = atoms[i].p.distanceTo(atoms[j].p);
    if (d > 1.9) continue;
    const mid = atoms[i].p.clone().add(atoms[j].p).multiplyScalar(0.5);
    const dir = atoms[j].p.clone().sub(atoms[i].p).normalize();
    const b = new THREE.Mesh(cylGeo, bondMat);
    b.position.copy(mid); b.scale.y = d; b.quaternion.setFromUnitVectors(up, dir); group.add(b);
  }

  function css(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
  function recolor() {
    atomMats[0].color.set(css("--accent")); atomMats[1].color.set(css("--atom2")); atomMats[2].color.set(css("--atom3"));
    bondMat.color.set(css("--muted")); ringMat.color.set(css("--accent"));
  }
  recolor();
  darkMQ.addEventListener("change", recolor);
  new MutationObserver(recolor).observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  function resize() {
    const w = holder.clientWidth, h = holder.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    camera.position.z = w / h < 0.9 ? 11.5 : 9.2;
  }
  if (window.ResizeObserver) new ResizeObserver(resize).observe(holder); else window.addEventListener("resize", resize);
  resize();

  const target = { x: 0.35, y: 0 }, cur = { x: 0.35, y: 0 };
  holder.addEventListener("pointermove", (e) => {
    const r = holder.getBoundingClientRect();
    target.y = ((e.clientX - r.left) / r.width - 0.5) * 1.6;
    target.x = 0.35 + ((e.clientY - r.top) / r.height - 0.5) * 0.9;
  });
  holder.addEventListener("pointerleave", () => { target.x = 0.35; target.y = 0; });

  let visible = true, spin = 0, last = performance.now();
  if (window.IntersectionObserver) new IntersectionObserver((en) => { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(holder);
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) { last = now; return; }
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    if (!reduced) spin += dt * 0.25;
    cur.x += (target.x - cur.x) * 0.06; cur.y += (target.y - cur.y) * 0.06;
    group.rotation.x = cur.x; group.rotation.y = spin + cur.y;
    ringA.rotation.x = 1.15 + cur.x * 0.3; ringA.rotation.z = spin * 0.9 + cur.y * 0.5;
    ringB.rotation.z = 0.6 - spin * 0.7;
    renderer.render(scene, camera);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
})();

/* ---------- page-wide 3D background ---------- */
(function bg3d() {
  if (typeof THREE === "undefined") return;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
  const cv = renderer.domElement; cv.id = "bg3d"; cv.setAttribute("aria-hidden", "true");
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  document.body.prepend(cv);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
  camera.position.set(0, 0, 12);
  const Y_SPAN = 34;

  const sc = document.createElement("canvas"); sc.width = sc.height = 64;
  const sg2 = sc.getContext("2d"); const grad = sg2.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)"); grad.addColorStop(0.45, "rgba(255,255,255,0.9)"); grad.addColorStop(1, "rgba(255,255,255,0)");
  sg2.fillStyle = grad; sg2.fillRect(0, 0, 64, 64);
  const sprite = new THREE.CanvasTexture(sc);

  const N = 380, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 34;
    pos[i * 3 + 1] = 4 - Math.random() * (Y_SPAN + 6);
    pos[i * 3 + 2] = -16 + Math.random() * 22;
  }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pm = new THREE.PointsMaterial({ size: 0.16, map: sprite, transparent: true, opacity: 0.7, depthWrite: false, sizeAttenuation: true });
  const points = new THREE.Points(pg, pm); scene.add(points);

  const geos = [new THREE.IcosahedronGeometry(1, 0), new THREE.OctahedronGeometry(1, 0), new THREE.TorusGeometry(0.9, 0.28, 8, 14), new THREE.BoxGeometry(1.3, 1.3, 1.3), new THREE.TetrahedronGeometry(1.1, 0)];
  const edgeGeos = geos.map((g) => new THREE.EdgesGeometry(g));
  const lineMats = [new THREE.LineBasicMaterial({ transparent: true, opacity: 0.5 }), new THREE.LineBasicMaterial({ transparent: true, opacity: 0.5 })];
  const shapes = [];
  for (let i = 0; i < 18; i++) {
    const m = new THREE.LineSegments(edgeGeos[i % edgeGeos.length], lineMats[i % 2]);
    const side = Math.random() < 0.5 ? -1 : 1;
    m.position.set(side * (5 + Math.random() * 10), 3 - Math.random() * Y_SPAN, -14 + Math.random() * 16);
    m.scale.setScalar(0.7 + Math.random() * 1.3);
    m.rotation.set(Math.random() * 6, Math.random() * 6, 0);
    m.userData.v = new THREE.Vector3((Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.2);
    scene.add(m); shapes.push(m);
  }

  function recolor() {
    const cs = getComputedStyle(document.documentElement);
    const accent = cs.getPropertyValue("--accent").trim(), warm = cs.getPropertyValue("--atom3").trim();
    pm.color.set(accent); lineMats[0].color.set(accent); lineMats[1].color.set(warm);
  }
  recolor();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", recolor);
  new MutationObserver(recolor).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    if (reduced) draw(0);
  }

  let prog = 0, tProg = 0, mx = 0, my = 0, cmx = 0, cmy = 0, t = 0;
  function readScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    tProg = Math.min(1, Math.max(0, window.scrollY / max));
  }
  function draw(dt) {
    prog += (tProg - prog) * 0.08; cmx += (mx - cmx) * 0.05; cmy += (my - cmy) * 0.05;
    camera.position.set(cmx * 2.2, -prog * 30 - cmy * 1.2, 12);
    camera.rotation.z = (prog - 0.5) * 0.12 + cmx * 0.04;
    points.rotation.y = prog * 1.1 + t * 0.02;
    for (const m of shapes) {
      m.rotation.x += m.userData.v.x * dt; m.rotation.y += m.userData.v.y * dt; m.rotation.z += m.userData.v.z * dt;
    }
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", resize);
  resize();
  if (reduced) return;
  window.addEventListener("scroll", readScroll, { passive: true });
  window.addEventListener("pointermove", (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; }, { passive: true });
  readScroll(); prog = tProg;
  let last = performance.now();
  (function loop(now) {
    requestAnimationFrame(loop);
    if (document.hidden) { last = now; return; }
    const dt = Math.min((now - last) / 1000, 0.05); last = now; t += dt;
    draw(dt);
  })(last);
})();

/* ---------- hero depth: extruded name and pointer tilt ---------- */
(function heroDepth() {
  const h = $("h-name"), copy = $("hero-copy"), hero = document.querySelector(".hero");
  function extrude(dx, dy) {
    const layers = [];
    for (let i = 1; i <= 8; i++) {
      layers.push((dx * i).toFixed(2) + "px " + (dy * i).toFixed(2) + "px 0 color-mix(in srgb, var(--accent) " + (96 - i * 7) + "%, var(--bg))");
    }
    layers.push((dx * 14).toFixed(1) + "px " + (dy * 14).toFixed(1) + "px 22px var(--shade)");
    h.style.textShadow = layers.join(", ");
  }
  extrude(0.9, 1.1);
  if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    copy.style.transform = "rotateY(" + (x * 10).toFixed(2) + "deg) rotateX(" + (-y * 8).toFixed(2) + "deg)";
    extrude(0.9 - x * 1.6, 1.1 - y * 1.6);
  });
  hero.addEventListener("pointerleave", () => { copy.style.transform = ""; extrude(0.9, 1.1); });
})();
