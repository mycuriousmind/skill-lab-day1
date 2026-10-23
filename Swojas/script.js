const portfolio = {
  name: 'Swojas',
  title: 'Student · aspiring full-stack developer',
  education: 'RVCE · CSE',
  availability: 'Open to learning and collaboration',
  email: '',
  links: { github: '', linkedin: '', resume: '' },
  intro: "I'm a computer science student who enjoys turning ideas into useful, interactive experiences—and learning how the pieces work behind the scenes.",
  about: "I'm currently studying computer science at RVCE and exploring how thoughtful interfaces, application logic, and data fit together. I like learning by making small things, testing ideas, and improving them one step at a time.",
  learning: 'Currently building web fundamentals, growing my programming practice, and exploring how frontend and backend systems connect.',
};

const skills = [
  { name: 'HTML', group: 'Frontend', status: 'Learning', detail: 'Practising semantic page structure and accessible markup.' },
  { name: 'CSS', group: 'Frontend', status: 'Learning', detail: 'Exploring layouts, responsive design, and visual systems.' },
  { name: 'C', group: 'Programming', status: 'Comfortable', detail: 'Used in coursework and a first-semester calculator project.' },
  { name: 'Robotics', group: 'Interests', status: 'Exploring', detail: 'A hands-on interest, including a line-follower build with Arduino.' },
];

const projects = [
  {
    id: 'portfolio',
    title: 'Personal portfolio',
    summary: 'A student portfolio that brings together learning goals, early projects, and an interactive 3D experiment.',
    problem: 'Create a clear home for work in progress without overstating experience or hiding the learning journey.',
    features: ['Responsive sections for skills, projects, learning, and contact', 'Interactive 3D energy core and object explorer', 'Filterable project cards with keyboard-friendly details'],
    technologies: ['React', 'TypeScript', 'Three.js', 'CSS'],
    category: '3D / Creative Coding',
    status: 'In progress',
    accent: 'violet',
    lessons: 'This portfolio is a place to practise component-based UI, accessibility, and a first interactive 3D scene.',
  },
  {
    id: 'student-planner-concept',
    title: 'Student planner concept',
    summary: 'Concept only—not built. An idea for a simple place to organise coursework and deadlines.',
    problem: 'Students often keep assignments and due dates in different places. This is an early idea for bringing them together.',
    features: ['A proposed overview of upcoming tasks', 'An idea for grouping work by course', 'No working product or user data exists yet'],
    technologies: ['Product idea', 'Not built'],
    category: 'Full-Stack',
    status: 'Concept · not built',
    accent: 'blue',
    lessons: 'This is an idea to explore, not a completed or in-progress application.',
  },
  {
    id: 'responsive-layout-concept',
    title: 'Responsive layout study',
    summary: 'Concept only—not built. A proposed exercise in adapting a simple interface to different screens.',
    problem: 'A useful page should remain clear on both a narrow phone and a wide screen. This is a practice idea, not an implemented page.',
    features: ['An idea to compare compact and wide layouts', 'A chance to practise CSS structure and responsive rules', 'No finished interface or live demo exists'],
    technologies: ['CSS', 'Not built'],
    category: 'Frontend',
    status: 'Concept · not built',
    accent: 'cyan',
    lessons: 'This is a proposed learning exercise and is not represented as completed work.',
  },
];

const journey = [
  { title: 'Computer Science student', place: 'RVCE', date: 'Current', description: 'Studying computer science and building a foundation through coursework and small projects.' },
  { title: 'First C project', place: 'Coursework', date: 'First semester', description: 'Built a calculator while learning programming fundamentals in C.' },
  { title: 'Robotics club build', place: 'Robotics club', date: 'Ongoing learning', description: 'Explored a line-follower project using Arduino as part of a robotics build.' },
];

const sections = [
  ['home', 'Home'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['journey', 'Experience'],
  ['contact', 'Contact'],
];
const filters = ['All', 'Full-Stack', 'Frontend', '3D / Creative Coding'];
const iconPaths = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  up: '<path d="M7 17 17 7M7 7h10v10"/>',
  down: '<path d="M12 5v14m-7-7 7 7 7-7"/>',
  code: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5"/>',
  spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 11 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13"/>',
  rotate: '<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8m0-5v5h5"/>',
  cap: '<path d="m2 10 10-5 10 5-10 5-10-5Zm4 2v5c3.3 2.7 8.7 2.7 12 0v-5m4-2v6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};
const icon = (name, size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const tags = (items) => `<span class="tag-list">${items.map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join('')}</span>`;
const brand = (label) => `<span class="brand-mark">S<span>.</span></span><span class="brand-name">Swojas<small> / ${label}</small></span>`;

function projectVisual(project) {
  return `<span class="project-visual project-visual--${project.accent}" aria-hidden="true">
    <span class="visual-grid"></span>
    <span class="visual-window">
      <span class="visual-window__bar"><i></i><i></i><i></i><span>${project.id === 'portfolio' ? 'swojas.dev / lab' : 'project / preview'}</span></span>
      <span class="visual-window__body"><span class="visual-lines"><b></b><i></i><i></i><i></i></span><span class="visual-orb"><span></span></span></span>
    </span>
    <span class="visual-index">${project.id === 'portfolio' ? '01' : '02'}</span>
  </span>`;
}

function projectCard(project, index) {
  return `<article class="project-card ${index === 0 ? 'project-card--featured' : ''}">
    <button type="button" class="project-open" data-project="${project.id}" aria-label="View details for ${escapeHTML(project.title)}">
      ${projectVisual(project)}
      <span class="project-card-content">
        <span class="project-card-top"><span class="status-pill status-pill--${project.accent}">${escapeHTML(project.status)}</span><span>${escapeHTML(project.category)}</span></span>
        <span class="project-title-row"><span class="project-title">${escapeHTML(project.title)}</span><span class="project-arrow">${icon('up', 18)}</span></span>
        <span class="project-summary">${escapeHTML(project.summary)}</span>
        ${tags(project.technologies)}
      </span>
    </button>
  </article>`;
}

function renderProjects(filter = 'All') {
  const filtered = filter === 'All' ? projects : projects.filter((project) => project.category === filter);
  document.querySelector('.project-count').textContent = `${String(filtered.length).padStart(2, '0')} PROJECTS`;
  document.querySelector('.projects-grid').innerHTML = filtered.map(projectCard).join('');
  document.querySelector('.projects-grid').hidden = filtered.length === 0;
  document.querySelector('.empty-state').hidden = filtered.length !== 0;
  document.querySelector('.empty-state p').textContent = `No ${filter.toLowerCase()} project to show yet. I’ll add one when there’s real work to share.`;
  document.querySelectorAll('.filter-button').forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function renderDialog(project) {
  const previousFocus = document.activeElement;
  const backdrop = document.createElement('div');
  backdrop.className = 'dialog-backdrop';
  backdrop.innerHTML = `<section class="project-dialog" id="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
    <button type="button" class="icon-button dialog-close" aria-label="Close project details">${icon('close', 19)}</button>
    <span class="status-pill status-pill--${project.accent}">${escapeHTML(project.status)}</span>
    <h2 id="dialog-title">${escapeHTML(project.title)}</h2>
    <p class="dialog-summary">${escapeHTML(project.summary)}</p>
    <div class="dialog-columns">
      <div><h3>Problem &amp; approach</h3><p>${escapeHTML(project.problem)}</p></div>
      <div><h3>What it includes</h3><ul>${project.features.map((feature) => `<li>${escapeHTML(feature)}</li>`).join('')}</ul></div>
    </div>
    <div class="dialog-learning">${icon('spark', 17)}<p>${escapeHTML(project.lessons)}</p></div>
    ${tags(project.technologies)}
  </section>`;
  document.body.append(backdrop);
  document.body.classList.add('dialog-open');
  const close = () => {
    backdrop.remove();
    document.body.classList.remove('dialog-open');
    previousFocus?.focus();
  };
  const closeButton = backdrop.querySelector('.dialog-close');
  closeButton.focus();
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop || event.target.closest('.dialog-close')) close();
  });
  backdrop.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    if (event.key !== 'Tab') return;
    const focusable = [...backdrop.querySelectorAll('button:not([disabled]), a[href]')];
    if (!focusable.length) return;
    if (event.shiftKey && document.activeElement === focusable[0]) {
      event.preventDefault();
      focusable[focusable.length - 1].focus();
    } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
      event.preventDefault();
      focusable[0].focus();
    }
  });
}

document.querySelector('#root').innerHTML = `
  <div class="site-shell theme-blue">
    <div class="scroll-progress"></div>
    <header class="site-header">
      <a class="brand" href="#home" aria-label="Swojas, home">${brand('DEV JOURNAL')}</a>
      <button class="icon-button menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation menu">${icon('menu', 20)}</button>
      <nav class="primary-navigation" id="primary-navigation" aria-label="Main navigation">${sections.map(([id, label]) => `<a href="#${id}" ${id === 'home' ? 'class="active" aria-current="location"' : ''}>${label}</a>`).join('')}</nav>
      <a class="header-cta" href="#contact">Let’s connect ${icon('up', 15)}</a>
    </header>
    <main>
      <section class="hero section-wrap" id="home" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow"><span class="status-dot"></span> STUDENT DEVELOPER · EXPLORING THE WEB</p>
          <h1 id="hero-title">Building digital experiences <span>beyond the ordinary.</span></h1>
          <p class="hero-intro">${portfolio.intro}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#projects">Explore projects ${icon('arrow', 17)}</a>
            <a class="button button-quiet" href="#contact">Let’s connect ${icon('arrow', 16)}</a>
          </div>
          <div class="hero-meta"><span><i></i>${portfolio.availability}</span><span>01 — 06 <span class="meta-muted">/ SECTIONS</span></span></div>
        </div>
        <div class="hero-art" aria-label="Interactive energy core. Click the core to pulse it.">
          <div class="scene-halo"></div><div class="scene-orbit scene-orbit--one"></div><div class="scene-orbit scene-orbit--two"></div>
          <div class="core-scene">
            <button class="core-button" type="button" aria-label="Pulse the interactive energy core">
              <span class="core-body"><i class="core-wire"></i><i class="core-wire core-wire--two"></i><i class="core-wire core-wire--three"></i></span>
              <i class="core-particle core-particle--one"></i><i class="core-particle core-particle--two"></i>
            </button>
          </div>
          <span class="scene-caption"><i></i> INTERACTIVE STUDY · 01</span>
          <span class="scene-coordinates">X 04.28&nbsp;&nbsp; Y 12.06<br>CORE / 001</span>
        </div>
        <a class="scroll-cue" href="#about">${icon('down', 15)} Scroll to explore</a>
      </section>

      <section class="content-section about-section section-wrap" id="about" aria-labelledby="about-title">
        <p class="section-label"><span>01 /</span> About</p>
        <div class="section-heading-row"><h2 id="about-title">Curious by nature.<br><span>Building by design.</span></h2><p class="section-intro">${portfolio.about}</p></div>
        <div class="about-layout">
          <div class="about-card"><div class="about-card-top"><span>FIELD NOTES</span>${icon('code', 17)}</div><div class="profile-monogram" aria-hidden="true">S<span>.</span></div><p class="profile-name">Swojas</p><p class="profile-role">${portfolio.title}</p><div class="profile-divider"></div><p class="profile-note">${portfolio.learning}</p><span class="profile-index">${portfolio.education}</span></div>
          <div class="about-details"><p class="about-detail-lead">Good software starts with questions. I’m learning how to turn those questions into useful interfaces, dependable logic, and better ideas.</p>
            <div class="interest-grid">
              <article class="interest-card"><span>01</span><div><h3>Frontend</h3><p>Exploring clear interfaces and responsive web experiences.</p></div>${icon('up', 16)}</article>
              <article class="interest-card"><span>02</span><div><h3>Backend</h3><p>Learning how application logic and data flow fit together.</p></div>${icon('up', 16)}</article>
              <article class="interest-card"><span>03</span><div><h3>Problem solving</h3><p>Breaking a challenge into small steps and testing ideas.</p></div>${icon('up', 16)}</article>
            </div>
          </div>
        </div>
      </section>

      <section class="content-section skills-section section-wrap" id="skills" aria-labelledby="skills-title">
        <p class="section-label"><span>02 /</span> Toolkit</p>
        <div class="section-heading-row"><h2 id="skills-title">The technologies<br><span>I’m getting to know.</span></h2><p class="section-intro">A small, honest snapshot of what I’ve used and what I’m exploring. Select a card to read more.</p></div>
        <div class="skills-grid">${skills.map((skill, index) => `<button type="button" class="skill-card" aria-expanded="false" data-skill="${skill.name}">
          <span class="skill-card-top"><span>0${index + 1}</span>${icon('up', 16)}</span><span class="skill-icon">${icon('layers', 21)}</span><span class="skill-name">${skill.name}</span><span class="skill-meta">${skill.group} <i></i> ${skill.status}</span><span class="skill-description">Select to explore</span>
        </button>`).join('')}</div>
        <p class="honesty-note">${icon('spark', 15)} No proficiency scores—just what I’m learning, one project at a time.</p>
      </section>

      <section class="content-section projects-section section-wrap" id="projects" aria-labelledby="projects-title">
        <p class="section-label"><span>03 /</span> Selected work</p>
        <div class="section-heading-row"><h2 id="projects-title">Experiments, ideas,<br><span>and things I’ve built.</span></h2><p class="section-intro">A few early projects and explorations. Each card opens a little more context; nothing here is dressed up as professional experience.</p></div>
        <div class="project-toolbar"><div class="filter-list" role="group" aria-label="Filter projects by category">${filters.map((filter) => `<button type="button" class="filter-button ${filter === 'All' ? 'is-active' : ''}" data-filter="${filter}" aria-pressed="${filter === 'All'}">${filter}</button>`).join('')}</div><span class="project-count">03 PROJECTS</span></div>
        <div class="projects-grid"></div>
        <div class="empty-state" hidden>${icon('spark', 21)}<h3>That part of the journey is still ahead.</h3><p></p><button type="button" class="text-button">Show all projects ${icon('arrow', 15)}</button></div>
      </section>

      <section class="content-section journey-section section-wrap" id="journey" aria-labelledby="journey-title">
        <p class="section-label"><span>04 /</span> Learning journey</p>
        <div class="section-heading-row"><h2 id="journey-title">Learning.<br><span>Building. Improving.</span></h2><p class="section-intro">A work in progress—coursework, small builds, and new questions. The milestones here are intentionally modest and real.</p></div>
        <div class="timeline">${journey.map((item, index) => `<article class="timeline-item"><span class="timeline-node"><i></i></span><span class="timeline-date">${item.date}</span><div class="timeline-body"><div class="timeline-title">${icon('cap', 17)}<span>${item.place}</span></div><h3>${item.title}</h3><p>${item.description}</p></div><span class="timeline-number">0${index + 1}</span></article>`).join('')}</div>
      </section>

      <section class="content-section lab-section section-wrap" aria-labelledby="lab-title">
        <p class="section-label"><span>05 /</span> Playground</p>
        <div class="lab-panel">
          <div class="lab-copy"><span class="lab-kicker">${icon('spark', 15)} SMALL INTERACTIVE STUDY</span><h2 id="lab-title">Not everything<br>has to be <span>ordinary.</span></h2><p>A little 3D object explorer. Choose a shape or shift the lighting; drag to turn it around.</p>
            <div class="lab-controls"><span class="control-label">GEOMETRY</span><div class="shape-buttons" role="group" aria-label="Choose an object shape">
              ${['sphere', 'torus', 'octahedron'].map((shape, index) => `<button class="shape-button ${index === 0 ? 'is-selected' : ''}" type="button" data-shape="${shape}" aria-pressed="${index === 0}">${shape}</button>`).join('')}
            </div><span class="control-label">ACCENT LIGHT</span><div class="theme-controls" role="group" aria-label="Change accent lighting">
              <button class="theme-swatch theme-swatch--blue" type="button" data-theme="blue" aria-label="Use blue lighting" aria-pressed="true"><span>${icon('check', 13)}</span>Blue</button>
              <button class="theme-swatch theme-swatch--violet" type="button" data-theme="violet" aria-label="Use violet lighting" aria-pressed="false"><span></span>Violet</button>
              <button class="reset-button" type="button">${icon('rotate', 14)} Reset</button>
            </div></div>
          </div>
          <div class="lab-art" aria-label="sphere 3D object explorer"><div class="lab-art-ring"></div><div class="play-object-wrap" aria-label="Drag to rotate the object"><div class="play-object" data-shape="sphere"><span class="play-object-shape"></span></div></div><span class="lab-art-caption">DRAG TO ORBIT ${icon('down', 13)}</span></div>
        </div>
      </section>

      <section class="content-section contact-section section-wrap" id="contact" aria-labelledby="contact-title">
        <p class="section-label"><span>06 /</span> Contact</p>
        <div class="contact-layout">
          <div class="contact-copy"><h2 id="contact-title">Have an idea?<br><span>Let’s build something great.</span></h2><p>I’m always interested in learning, building useful products, exploring new technologies, and connecting with people who enjoy solving problems.</p>
            <div class="contact-links">${portfolio.email ? `<a href="mailto:${portfolio.email}">${icon('send', 16)} ${portfolio.email} ${icon('up', 14)}</a>` : '<p class="contact-unset">Email link can be added in <code>script.js</code>.</p>'}
              ${portfolio.links.github ? `<a href="${portfolio.links.github}" target="_blank" rel="noreferrer">${icon('code', 16)} GitHub ${icon('up', 14)}</a>` : ''}
              ${portfolio.links.linkedin ? `<a href="${portfolio.links.linkedin}" target="_blank" rel="noreferrer">${icon('up', 16)} LinkedIn ${icon('up', 14)}</a>` : ''}
              ${portfolio.links.resume ? `<a href="${portfolio.links.resume}" target="_blank" rel="noreferrer">${icon('up', 16)} Résumé ${icon('up', 14)}</a>` : ''}
            </div>
          </div>
          <form class="contact-form">
            <div class="form-row"><label>Name<input name="name" autocomplete="name" required placeholder="Your name"></label><label>Email<input name="email" type="email" autocomplete="email" required placeholder="you@example.com"></label></div>
            <label>Subject<input name="subject" required placeholder="What would you like to talk about?"></label>
            <label>Message<textarea name="message" rows="4" required minlength="10" placeholder="A little context goes a long way…"></textarea></label>
            <button class="button button-primary form-submit" type="submit">Prepare email ${icon('up', 16)}</button>
            <p class="form-note" aria-live="polite">This form opens an email draft; it does not send messages through a server.</p><p class="form-error" role="alert" hidden></p>
          </form>
        </div>
      </section>
    </main>
    <footer class="site-footer section-wrap"><a class="brand" href="#home">${brand('KEEP EXPLORING')}</a><p>Built with curiosity, not a claim to have it all figured out.</p><a class="back-top" href="#home">Back to top ${icon('up', 14)}</a><span class="footer-year">© ${new Date().getFullYear()}</span></footer>
    <span class="visually-hidden menu-announcement" aria-live="polite"></span>
  </div>`;

renderProjects();

const root = document.querySelector('.site-shell');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-navigation');
const menuAnnouncement = document.querySelector('.menu-announcement');
const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  menuButton.innerHTML = icon('menu', 20);
  navigation.classList.remove('is-open');
  menuAnnouncement.textContent = '';
};

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  menuButton.innerHTML = icon(open ? 'close' : 'menu', 20);
  navigation.classList.toggle('is-open', open);
  menuAnnouncement.textContent = open ? 'Navigation menu open' : '';
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelector('.filter-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (button) renderProjects(button.dataset.filter);
});
document.querySelector('.empty-state .text-button').addEventListener('click', () => renderProjects());
document.querySelector('.projects-grid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-project]');
  const project = projects.find((item) => item.id === button?.dataset.project);
  if (project) renderDialog(project);
});

document.querySelector('.skills-grid').addEventListener('click', (event) => {
  const selected = event.target.closest('[data-skill]');
  if (!selected) return;
  const skill = skills.find((item) => item.name === selected.dataset.skill);
  const expanded = selected.getAttribute('aria-expanded') !== 'true';
  selected.setAttribute('aria-expanded', String(expanded));
  selected.classList.toggle('is-expanded', expanded);
  selected.querySelector('.skill-description').textContent = expanded ? skill.detail : 'Select to explore';
});

document.querySelector('.shape-buttons').addEventListener('click', (event) => {
  const button = event.target.closest('[data-shape]');
  if (!button) return;
  setShape(button.dataset.shape);
});
document.querySelector('.theme-controls').addEventListener('click', (event) => {
  const button = event.target.closest('[data-theme]');
  if (button) setTheme(button.dataset.theme);
  if (event.target.closest('.reset-button')) {
    setShape('sphere');
    setTheme('blue');
  }
});

function setShape(shape) {
  document.querySelector('.play-object').dataset.shape = shape;
  document.querySelector('.lab-art').setAttribute('aria-label', `${shape} 3D object explorer`);
  document.querySelectorAll('.shape-button').forEach((button) => {
    const selected = button.dataset.shape === shape;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function setTheme(theme) {
  root.classList.toggle('theme-violet', theme === 'violet');
  root.classList.toggle('theme-blue', theme === 'blue');
  document.querySelectorAll('.theme-swatch').forEach((button) => {
    const selected = button.dataset.theme === theme;
    button.setAttribute('aria-pressed', String(selected));
    button.querySelector('span').innerHTML = selected ? icon('check', 13) : '';
  });
}

document.querySelector('.core-button').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.classList.remove('is-pulsing');
  requestAnimationFrame(() => button.classList.add('is-pulsing'));
  button.addEventListener('animationend', () => button.classList.remove('is-pulsing'), { once: true });
});

const playArea = document.querySelector('.play-object-wrap');
const playObject = document.querySelector('.play-object');
let rotationX = -12;
let rotationY = -24;
let drag = null;
let animationFrame = 0;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const paintObject = () => {
  animationFrame = 0;
  playObject.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
};
const requestPaint = () => {
  if (!animationFrame) animationFrame = requestAnimationFrame(paintObject);
};
playArea.addEventListener('pointerdown', (event) => {
  drag = { x: event.clientX, y: event.clientY, rotationX, rotationY };
  playArea.setPointerCapture(event.pointerId);
});
playArea.addEventListener('pointermove', (event) => {
  if (!drag) return;
  rotationY = drag.rotationY + (event.clientX - drag.x) * 0.7;
  rotationX = Math.max(-75, Math.min(75, drag.rotationX - (event.clientY - drag.y) * 0.7));
  requestPaint();
});
playArea.addEventListener('pointerup', () => { drag = null; });
playArea.addEventListener('pointercancel', () => { drag = null; });
const animateObject = () => {
  if (!reducedMotion.matches && !drag) {
    rotationY += 0.12;
    requestPaint();
  }
  window.setTimeout(animateObject, 32);
};
animateObject();
reducedMotion.addEventListener?.('change', requestPaint);

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const error = form.querySelector('.form-error');
  const note = form.querySelector('.form-note');
  error.hidden = true;
  error.textContent = '';
  if (!form.reportValidity()) return;
  if (!portfolio.email) {
    error.textContent = 'Email is not configured yet. Add a real address to script.js before using this form.';
    error.hidden = false;
    return;
  }
  const values = new FormData(form);
  const subject = String(values.get('subject'));
  const body = [`From: ${String(values.get('name'))}`, `Reply to: ${String(values.get('email'))}`, '', String(values.get('message'))].join('\n');
  window.location.href = `mailto:${encodeURIComponent(portfolio.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = 'Your email app should open with a draft. The message has not been sent yet.';
  form.reset();
});

let scrollTicking = false;
const updateScrollState = () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    document.querySelector('.scroll-progress').style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    scrollTicking = false;
  });
};
window.addEventListener('scroll', updateScrollState, { passive: true });
window.addEventListener('resize', updateScrollState);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    document.querySelectorAll('.primary-navigation a').forEach((link) => {
      const active = link.hash === `#${visible.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.1, 0.3, 0.6] });
  sections.forEach(([id]) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}
updateScrollState();
