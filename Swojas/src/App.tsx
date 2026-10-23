import {
  lazy,
  Suspense,
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type CSSProperties,
} from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  GraduationCap,
  Layers3,
  Menu,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import {
  journey,
  portfolio,
  projects,
  skills,
  type Project,
  type ProjectCategory,
} from './portfolio'
import type { ExplorerShape } from './PlaygroundScene'

const HeroScene = lazy(() => import('./HeroScene'))
const PlaygroundScene = lazy(() => import('./PlaygroundScene'))

const sections = [
  ['home', 'Home'],
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['journey', 'Experience'],
  ['contact', 'Contact'],
] as const

const filters: Array<'All' | ProjectCategory> = [
  'All',
  'Full-Stack',
  'Frontend',
  '3D / Creative Coding',
]

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error) {
    console.error('The 3D scene could not be rendered.', error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  )
}

function SceneFallback({ label }: { label: string }) {
  return (
    <div className="scene-fallback" role="img" aria-label={label}>
      <span />
    </div>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual--${project.accent}`} aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-window">
        <div className="visual-window__bar">
          <i />
          <i />
          <i />
          <span>{project.id === 'portfolio' ? 'swojas.dev / lab' : 'project / preview'}</span>
        </div>
        <div className="visual-window__body">
          <div className="visual-lines">
            <b />
            <i />
            <i />
            <i />
          </div>
          <div className="visual-orb">
            <span />
          </div>
        </div>
      </div>
      <span className="visual-index">{project.id === 'portfolio' ? '01' : '02'}</span>
    </div>
  )
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const dialog = document.getElementById('project-dialog')
      const focusable = dialog?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('dialog-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('dialog-open')
      previousFocus?.focus()
    }
  }, [onClose])

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="project-dialog"
        id="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <button className="icon-button dialog-close" ref={closeRef} onClick={onClose} aria-label="Close project details">
          <X size={19} />
        </button>
        <span className={`status-pill status-pill--${project.accent}`}>{project.status}</span>
        <h2 id="dialog-title">{project.title}</h2>
        <p className="dialog-summary">{project.summary}</p>
        <div className="dialog-columns">
          <div>
            <h3>Problem &amp; approach</h3>
            <p>{project.problem}</p>
          </div>
          <div>
            <h3>What it includes</h3>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="dialog-learning">
          <Sparkles size={17} />
          <p>{project.lessons}</p>
        </div>
        <div className="tag-list">
          {project.technologies.map((technology) => (
            <span className="tag" key={technology}>{technology}</span>
          ))}
        </div>
        {(project.liveUrl || project.repositoryUrl) && (
          <div className="dialog-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live project <ArrowUpRight size={15} />
              </a>
            )}
            {project.repositoryUrl && (
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                Repository <Code2 size={15} />
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

function App() {
  const prefersReducedMotion = useReducedMotion()
  const reducedMotion = prefersReducedMotion ?? false
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState<(typeof filters)[number]>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)
  const [accentTheme, setAccentTheme] = useState<'blue' | 'violet'>(portfolio.theme.defaultAccent)
  const [shape, setShape] = useState<ExplorerShape>('sphere')
  const [formStatus, setFormStatus] = useState('')
  const [formError, setFormError] = useState('')

  const visibleProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedFilter)
  const accent = accentTheme === 'blue' ? '#5b75ff' : '#a176ff'

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.1, 0.3, 0.6] },
    )
    sections.forEach(([id]) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')
    setFormStatus('')
    const form = event.currentTarget
    if (!form.reportValidity()) return
    if (!portfolio.email) {
      setFormError('Email is not configured yet. Add a real address to portfolio.ts before using this form.')
      return
    }
    const formData = new FormData(form)
    const subject = String(formData.get('subject'))
    const body = [
      `From: ${String(formData.get('name'))}`,
      `Reply to: ${String(formData.get('email'))}`,
      '',
      String(formData.get('message')),
    ].join('\n')
    window.location.href = `mailto:${encodeURI(portfolio.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormStatus('Your email app should open with a draft. The message has not been sent yet.')
    form.reset()
  }

  const closeProject = useCallback(() => setSelectedProject(null), [])

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`site-shell theme-${accentTheme}`}
        style={{ '--accent-live': accent } as CSSProperties}
      >
        <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
        <header className="site-header">
          <a className="brand" href="#home" aria-label={`${portfolio.name}, home`}>
            <span className="brand-mark">S<span>.</span></span>
            <span className="brand-name">{portfolio.name}<small> / DEV JOURNAL</small></span>
          </a>
          <button
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav
            className={`primary-navigation ${menuOpen ? 'is-open' : ''}`}
            id="primary-navigation"
            aria-label="Main navigation"
          >
            {sections.map(([id, label]) => (
              <a
                className={activeSection === id ? 'active' : ''}
                href={`#${id}`}
                key={id}
                onClick={() => setMenuOpen(false)}
                aria-current={activeSection === id ? 'location' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <a className="header-cta" href="#contact">
            Let's connect <ArrowUpRight size={15} />
          </a>
        </header>

        <main>
          <section className="hero section-wrap" id="home" aria-labelledby="hero-title">
            <div className="hero-copy">
              <motion.p
                className="eyebrow"
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <span className="status-dot" />
                STUDENT DEVELOPER · EXPLORING THE WEB
              </motion.p>
              <motion.h1
                id="hero-title"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
              >
                Building digital experiences <span>beyond the ordinary.</span>
              </motion.h1>
              <motion.p
                className="hero-intro"
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 }}
              >
                {portfolio.intro}
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
              >
                <a className="button button-primary" href="#projects">
                  Explore projects <ArrowDownRight size={17} />
                </a>
                <a className="button button-quiet" href="#contact">
                  Let's connect <ArrowRight size={16} />
                </a>
              </motion.div>
              <div className="hero-meta">
                <span><i /> {portfolio.availability}</span>
                <span>01 — 06 <span className="meta-muted">/ SECTIONS</span></span>
              </div>
            </div>
            <motion.div
              className="hero-art"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.18 }}
              aria-label="Interactive 3D energy core. Click the core to pulse it."
            >
              <div className="scene-halo" />
              <div className="scene-orbit scene-orbit--one" />
              <div className="scene-orbit scene-orbit--two" />
              <SceneBoundary fallback={<SceneFallback label="Decorative energy core" />}>
                <Suspense fallback={<SceneFallback label="Loading energy core" />}>
                  <HeroScene reducedMotion={reducedMotion} accent={accent} />
                </Suspense>
              </SceneBoundary>
              <span className="scene-caption"><i /> INTERACTIVE STUDY · 01</span>
              <span className="scene-coordinates">X 04.28&nbsp;&nbsp; Y 12.06<br />CORE / 001</span>
            </motion.div>
            <a className="scroll-cue" href="#about"><ArrowDown size={15} /> Scroll to explore</a>
          </section>

          <section className="content-section about-section section-wrap" id="about" aria-labelledby="about-title">
            <SectionLabel number="01 /">About</SectionLabel>
            <div className="section-heading-row">
              <h2 id="about-title">Curious by nature.<br /><span>Building by design.</span></h2>
              <p className="section-intro">{portfolio.about}</p>
            </div>
            <div className="about-layout">
              <div className="about-card">
                <div className="about-card-top"><span>FIELD NOTES</span><Code2 size={17} /></div>
                <div className="profile-monogram" aria-hidden="true">S<span>.</span></div>
                <p className="profile-name">{portfolio.name}</p>
                <p className="profile-role">{portfolio.title}</p>
                <div className="profile-divider" />
                <p className="profile-note">{portfolio.learning}</p>
                <span className="profile-index">{portfolio.education}</span>
              </div>
              <div className="about-details">
                <p className="about-detail-lead">
                  Good software starts with questions. I’m learning how to turn those questions
                  into useful interfaces, dependable logic, and better ideas.
                </p>
                <div className="interest-grid">
                  {[
                    ['01', 'Frontend', 'Exploring clear interfaces and responsive web experiences.'],
                    ['02', 'Backend', 'Learning how application logic and data flow fit together.'],
                    ['03', 'Problem solving', 'Breaking a challenge into small steps and testing ideas.'],
                  ].map(([number, title, description]) => (
                    <article className="interest-card" key={title}>
                      <span>{number}</span>
                      <div><h3>{title}</h3><p>{description}</p></div>
                      <ArrowUpRight size={16} />
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="content-section skills-section section-wrap" id="skills" aria-labelledby="skills-title">
            <SectionLabel number="02 /">Toolkit</SectionLabel>
            <div className="section-heading-row">
              <h2 id="skills-title">The technologies<br /><span>I’m getting to know.</span></h2>
              <p className="section-intro">A small, honest snapshot of what I’ve used and what I’m exploring. Select a card to read more.</p>
            </div>
            <div className="skills-grid">
              {skills.map((skill, index) => {
                const expanded = expandedSkill === skill.name
                return (
                  <button
                    type="button"
                    className={`skill-card ${expanded ? 'is-expanded' : ''}`}
                    key={skill.name}
                    aria-expanded={expanded}
                    onClick={() => setExpandedSkill(expanded ? null : skill.name)}
                  >
                    <span className="skill-card-top"><span>0{index + 1}</span><ArrowUpRight size={16} /></span>
                    <span className="skill-icon"><Layers3 size={21} /></span>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-meta">{skill.group} <i /> {skill.status}</span>
                    <span className="skill-description">{expanded ? skill.detail : 'Select to explore'}</span>
                  </button>
                )
              })}
            </div>
            <p className="honesty-note"><Sparkles size={15} /> No proficiency scores—just what I’m learning, one project at a time.</p>
          </section>

          <section className="content-section projects-section section-wrap" id="projects" aria-labelledby="projects-title">
            <SectionLabel number="03 /">Selected work</SectionLabel>
            <div className="section-heading-row">
              <h2 id="projects-title">Experiments, ideas,<br /><span>and things I’ve built.</span></h2>
              <p className="section-intro">A few early projects and explorations. Each card opens a little more context; nothing here is dressed up as professional experience.</p>
            </div>
            <div className="project-toolbar">
              <div className="filter-list" role="group" aria-label="Filter projects by category">
                {filters.map((filter) => (
                  <button
                    type="button"
                    key={filter}
                    className={selectedFilter === filter ? 'filter-button is-active' : 'filter-button'}
                    aria-pressed={selectedFilter === filter}
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <span>{String(visibleProjects.length).padStart(2, '0')} PROJECTS</span>
            </div>
            {visibleProjects.length ? (
              <div className="projects-grid">
                {visibleProjects.map((project, index) => (
                  <motion.article
                    className={`project-card ${index === 0 ? 'project-card--featured' : ''}`}
                    key={project.id}
                    layout
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45 }}
                  >
                    <button
                      className="project-open"
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`View details for ${project.title}`}
                    >
                      <ProjectVisual project={project} />
                      <span className="project-card-content">
                        <span className="project-card-top">
                          <span className={`status-pill status-pill--${project.accent}`}>{project.status}</span>
                          <span>{project.category}</span>
                        </span>
                        <span className="project-title-row">
                          <span className="project-title">{project.title}</span>
                          <span className="project-arrow"><ArrowUpRight size={18} /></span>
                        </span>
                        <span className="project-summary">{project.summary}</span>
                        <span className="tag-list">
                          {project.technologies.map((technology) => (
                            <span className="tag" key={technology}>{technology}</span>
                          ))}
                        </span>
                      </span>
                    </button>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Sparkles size={21} />
                <h3>That part of the journey is still ahead.</h3>
                <p>No {selectedFilter.toLowerCase()} project to show yet. I’ll add one when there’s real work to share.</p>
                <button type="button" className="text-button" onClick={() => setSelectedFilter('All')}>Show all projects <ArrowRight size={15} /></button>
              </div>
            )}
          </section>

          <section className="content-section journey-section section-wrap" id="journey" aria-labelledby="journey-title">
            <SectionLabel number="04 /">Learning journey</SectionLabel>
            <div className="section-heading-row">
              <h2 id="journey-title">Learning.<br /><span>Building. Improving.</span></h2>
              <p className="section-intro">A work in progress—coursework, small builds, and new questions. The milestones here are intentionally modest and real.</p>
            </div>
            <div className="timeline">
              {journey.map((item, index) => (
                <article className="timeline-item" key={item.title}>
                  <span className="timeline-node"><i /></span>
                  <span className="timeline-date">{item.date}</span>
                  <div className="timeline-body">
                    <div className="timeline-title"><GraduationCap size={17} /><span>{item.place}</span></div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="timeline-number">0{index + 1}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="content-section lab-section section-wrap" aria-labelledby="lab-title">
            <SectionLabel number="05 /">Playground</SectionLabel>
            <div className="lab-panel">
              <div className="lab-copy">
                <span className="lab-kicker"><Sparkles size={15} /> SMALL INTERACTIVE STUDY</span>
                <h2 id="lab-title">Not everything<br />has to be <span>ordinary.</span></h2>
                <p>A little 3D object explorer. Choose a shape or shift the lighting; drag to turn it around.</p>
                <div className="lab-controls">
                  <span className="control-label">GEOMETRY</span>
                  <div className="shape-buttons" role="group" aria-label="Choose an object shape">
                    {(['sphere', 'torus', 'octahedron'] as const).map((item) => (
                      <button
                        className={shape === item ? 'shape-button is-selected' : 'shape-button'}
                        key={item}
                        onClick={() => setShape(item)}
                        type="button"
                        aria-pressed={shape === item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <span className="control-label">ACCENT LIGHT</span>
                  <div className="theme-controls" role="group" aria-label="Change accent lighting">
                    <button
                      className="theme-swatch theme-swatch--blue"
                      type="button"
                      aria-label="Use blue lighting"
                      aria-pressed={accentTheme === 'blue'}
                      onClick={() => setAccentTheme('blue')}
                    ><span>{accentTheme === 'blue' && <Check size={13} />}</span>Blue</button>
                    <button
                      className="theme-swatch theme-swatch--violet"
                      type="button"
                      aria-label="Use violet lighting"
                      aria-pressed={accentTheme === 'violet'}
                      onClick={() => setAccentTheme('violet')}
                    ><span>{accentTheme === 'violet' && <Check size={13} />}</span>Violet</button>
                    <button
                      className="reset-button"
                      type="button"
                      onClick={() => {
                        setAccentTheme(portfolio.theme.defaultAccent)
                        setShape('sphere')
                      }}
                    ><RotateCcw size={14} /> Reset</button>
                  </div>
                </div>
              </div>
              <div className="lab-art" aria-label={`${shape} 3D object explorer`}>
                <div className="lab-art-ring" />
                <SceneBoundary fallback={<SceneFallback label="Decorative geometric object" />}>
                  <Suspense fallback={<SceneFallback label="Loading geometric object" />}>
                    <PlaygroundScene
                      shape={shape}
                      accent={accent}
                      reducedMotion={reducedMotion}
                    />
                  </Suspense>
                </SceneBoundary>
                <span className="lab-art-caption">DRAG TO ORBIT <ChevronDown size={13} /></span>
              </div>
            </div>
          </section>

          <section className="content-section contact-section section-wrap" id="contact" aria-labelledby="contact-title">
            <SectionLabel number="06 /">Contact</SectionLabel>
            <div className="contact-layout">
              <div className="contact-copy">
                <h2 id="contact-title">Have an idea?<br /><span>Let’s build something great.</span></h2>
                <p>I’m always interested in learning, building useful products, exploring new technologies, and connecting with people who enjoy solving problems.</p>
                <div className="contact-links">
                  {portfolio.email ? (
                    <a href={`mailto:${portfolio.email}`}><Send size={16} /> {portfolio.email} <ArrowUpRight size={14} /></a>
                  ) : (
                    <p className="contact-unset">Email link can be added in <code>src/portfolio.ts</code>.</p>
                  )}
                  {portfolio.links.github && (
                    <a href={portfolio.links.github} target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub <ArrowUpRight size={14} /></a>
                  )}
                  {portfolio.links.linkedin && (
                    <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> LinkedIn <ArrowUpRight size={14} /></a>
                  )}
                  {portfolio.links.resume && (
                    <a href={portfolio.links.resume} target="_blank" rel="noreferrer"><ArrowUpRight size={16} /> Résumé <ArrowUpRight size={14} /></a>
                  )}
                </div>
              </div>
              <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
                <div className="form-row">
                  <label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
                  <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
                </div>
                <label>Subject<input name="subject" required placeholder="What would you like to talk about?" /></label>
                <label>Message<textarea name="message" rows={4} required minLength={10} placeholder="A little context goes a long way…" /></label>
                <button className="button button-primary form-submit" type="submit">Prepare email <ArrowUpRight size={16} /></button>
                <p className="form-note" aria-live="polite">{formStatus || 'This form opens an email draft; it does not send messages through a server.'}</p>
                {formError && <p className="form-error" role="alert">{formError}</p>}
              </form>
            </div>
          </section>
        </main>

        <footer className="site-footer section-wrap">
          <a className="brand" href="#home">
            <span className="brand-mark">S<span>.</span></span>
            <span className="brand-name">{portfolio.name}<small> / KEEP EXPLORING</small></span>
          </a>
          <p>Built with curiosity, not a claim to have it all figured out.</p>
          <a className="back-top" href="#home">Back to top <ArrowUpRight size={14} /></a>
          <span className="footer-year">© {new Date().getFullYear()}</span>
        </footer>
        <span className="visually-hidden" aria-live="polite">{menuOpen ? 'Navigation menu open' : ''}</span>
        {selectedProject && <ProjectDialog project={selectedProject} onClose={closeProject} />}
      </div>
    </MotionConfig>
  )
}

export default App
