import { useRef, useState, useEffect } from 'react'
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  bioContent,
  cvSummary,
  cvEntries,
  cvPdfUrl,
  researchPaper,
  projects,
  footerSocials,
  educationEntries,
  organizationEntries,
} from './data'
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope } from 'react-icons/fa'
import './App.css'

const footerIconMap = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  email: FaEnvelope,
}

const navLinks = [
  { label: 'CV', path: '/cv' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

function usePageTitle(title) {
  useEffect(() => {
    const base = 'Chuol Ruei Deng'
    document.title = title ? `${title} | ${base}` : base
    return () => { document.title = base }
  }, [title])
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="header">
      <Link to="/" className="header-name" aria-label="Chuol Ruei Deng – Home">
        Chuol Ruei Deng
      </Link>
      <button
        type="button"
        className="header-menu-btn"
        aria-expanded={menuOpen}
        aria-controls="header-nav"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span className="header-menu-icon" data-open={menuOpen} />
        <span className="header-menu-icon" data-open={menuOpen} />
        <span className="header-menu-icon" data-open={menuOpen} />
      </button>
      <nav
        id="header-nav"
        className={`header-nav ${menuOpen ? 'open' : ''}`}
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

function useTypewriter(lines, charDelay = 55, lineDelay = 400) {
  const [displayed, setDisplayed] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (currentLine >= lines.length) {
      setDone(true)
      return
    }
    if (currentChar > lines[currentLine].length) {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
      }, lineDelay)
      return () => clearTimeout(timeout)
    }
    const timeout = setTimeout(() => {
      setDisplayed((prev) => {
        const next = [...prev]
        next[currentLine] = lines[currentLine].slice(0, currentChar)
        return next
      })
      setCurrentChar((c) => c + 1)
    }, charDelay)
    return () => clearTimeout(timeout)
  }, [currentLine, currentChar, lines, charDelay, lineDelay])

  return { displayed, done, currentLine }
}

const highlightWords = [
  'Thok Nath Research Institute',
  'Master of Development Engineering',
  'human-centered technology',
  'economic self-sufficiency',
  'Economics and Mathematics',
  'Bangtigow in Education',
  'development economics',
  'community engagement',
  'New York University',
  'AI and Data Analytics',
  'Romro Foundation',
  'first-generation',
  'automated systems',
  'strong execution',
  'South Sudan',
  'UC Berkeley',
  'researcher',
  'education',
  'Ethiopia',
  'software',
  'business',
  'finance',
  'builder',
]

function renderWithHighlights(text) {
  const escaped = highlightWords.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escaped.join('|')})`)
  const parts = text.split(regex)
  return parts.map((part, i) =>
    highlightWords.includes(part)
      ? <span key={i} className="highlight-word">{part}</span>
      : part
  )
}

function SectionCard({ image, imageAlt, children, index }) {
  const viewportOpts = { once: true, margin: '-60px' }
  const slideX = index % 2 === 0 ? -40 : 40

  return (
    <motion.div
      className="info-card"
      initial={{ opacity: 0, x: slideX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewportOpts}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="info-card-image"
        initial={{ opacity: 0, scale: 0.85, rotate: index % 2 === 0 ? -3 : 3 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={viewportOpts}
        transition={{ duration: 0.55, delay: index * 0.12 + 0.15, ease: 'easeOut' }}
      >
        <img src={image} alt={imageAlt} />
      </motion.div>
      <motion.div
        className="info-card-content"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOpts}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.25 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function LandingPage() {
  usePageTitle('')
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-80px' })

  const typewriterLines = ["Hi, I'm Chuol.", 'Researcher, builder, and first-generation dreamer.']
  const { displayed, done, currentLine } = useTypewriter(typewriterLines, 55, 500)

  const [typingDone, setTypingDone] = useState(false)
  const progressRef = useRef(null)

  useEffect(() => {
    if (!done) return
    const timer = setTimeout(() => setTypingDone(true), 1500)
    return () => clearTimeout(timer)
  }, [done])

  useEffect(() => {
    if (!typingDone) return
    const words = document.querySelectorAll('.highlight-word')
    const totalWords = words.length
    const timers = []
    words.forEach((word, index) => {
      const t1 = setTimeout(() => {
        word.classList.add('active')
        if (progressRef.current) {
          const progress = ((index + 1) / totalWords) * 100
          progressRef.current.style.width = `${progress}%`
        }
        const t2 = setTimeout(() => {
          word.classList.remove('active')
          word.classList.add('visited')
        }, 2000)
        timers.push(t2)
      }, 800 + index * 2800)
      timers.push(t1)
    })
    return () => timers.forEach(t => clearTimeout(t))
  }, [typingDone])

  const sectionViewport = { once: true, margin: '-80px' }

  return (
    <>
      <motion.section
        ref={heroRef}
        className="landing-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="landing-inner">
          <motion.div
            className="landing-photo"
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <img
              src="/photo.png"
              alt="Chuol Ruei Deng"
              className="landing-image"
            />
          </motion.div>
          <motion.div
            className="landing-bio"
            initial={{ opacity: 0, x: 40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <h1 className="landing-title">
              <span className="typewriter-line-1">
                {displayed[0] || ''}
                {currentLine === 0 && !done && <span className="typewriter-cursor" />}
              </span>
            </h1>
            <p className="landing-subtitle typewriter-subtitle">
              {displayed[1] || ''}
              {currentLine === 1 && !done && <span className="typewriter-cursor" />}
              {done && !typingDone && <span className="typewriter-cursor typewriter-cursor-blink" />}
            </p>
            <motion.div
              className="landing-bio-text"
              initial={{ opacity: 0, y: 24 }}
              animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {bioContent.split('\n\n').map((para, i) => (
                <p key={i}>{renderWithHighlights(para)}</p>
              ))}
              <div className="bio-progress-bar">
                <div className="bio-progress-fill" ref={progressRef} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <section className="landing-sections">
        <motion.div
          className="landing-section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={sectionViewport}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="landing-section-title"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={sectionViewport}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Education
          </motion.h2>
          <motion.div
            className="landing-section-line"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={sectionViewport}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
        <div className="info-cards">
          {educationEntries.map((edu, i) => (
            <SectionCard key={i} image={edu.image} imageAlt={edu.school} index={i}>
              <span className="info-card-tag">{edu.years}</span>
              <h3 className="info-card-title">{edu.degree}</h3>
              <p className="info-card-field">{edu.field}</p>
              <p className="info-card-school">{edu.school}</p>
              <p className="info-card-desc">{edu.desc}</p>
              {edu.programs && (
                <div className="info-card-programs">
                  {edu.programs.map((prog, j) => (
                    <motion.div
                      key={j}
                      className={`program-item ${!prog.image ? 'no-image' : ''}`}
                      initial={{ opacity: 0, x: j % 2 === 0 ? -30 : 30, y: 12 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: j * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {prog.image && (
                        <motion.div
                          className="program-image"
                          initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 0.45, delay: j * 0.12 + 0.15, ease: 'easeOut' }}
                        >
                          <img src={prog.image} alt={prog.school} />
                        </motion.div>
                      )}
                      <motion.div
                        className="program-content"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.4, delay: j * 0.12 + 0.2 }}
                      >
                        <span className="program-tag">{prog.years}</span>
                        <p className="program-field">{prog.field}</p>
                        <p className="program-school">{prog.school}</p>
                        <p className="program-desc">{prog.desc}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </SectionCard>
          ))}
        </div>
      </section>

      <section className="landing-sections">
        <motion.div
          className="landing-section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={sectionViewport}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="landing-section-title"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={sectionViewport}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Organizations
          </motion.h2>
          <motion.div
            className="landing-section-line"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={sectionViewport}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
        <div className="info-cards">
          {organizationEntries.map((org, i) => (
            <SectionCard key={i} image={org.image} imageAlt={org.name} index={i}>
              <span className="info-card-tag">Est. {org.est}</span>
              <h3 className="info-card-title">{org.name}</h3>
              <p className="info-card-field">{org.role}</p>
              <p className="info-card-desc">{org.desc}</p>
            </SectionCard>
          ))}
        </div>
      </section>

      <BackToTop />
    </>
  )
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

function PageLayout({ title, children, showBackToTop }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  usePageTitle(title)

  return (
    <motion.main
      ref={ref}
      className="page-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <section className="section">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="section-content"
        >
          {children}
        </motion.div>
      </section>
      {showBackToTop && <BackToTop />}
    </motion.main>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <motion.a
      href="#"
      className="back-to-top"
      aria-label="Back to top"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      onClick={(e) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      ↑
    </motion.a>
  )
}

/* ═══════════════════ CV PAGE ═══════════════════ */

function useCountUp(target, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!startCounting) return
    const startTime = performance.now()
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, startCounting])
  return count
}

function StatNumber({ target, suffix = '', prefix = '', duration = 2000, inView }) {
  const count = useCountUp(target, duration, inView)
  return <>{prefix}{count.toLocaleString()}{suffix}</>
}

const cvWorkExperience = [
  {
    company: 'Tabiya — Open-Source',
    location: 'London, UK · Remote',
    title: 'Data Engineer',
    dates: 'Aug 2025 — Dec 2025',
    bullets: [
      'Developed Python NLP pipelines using TF-IDF embeddings and cosine similarity to map ESCO occupations and skills.',
      'Built a Streamlit AI dashboard to visualize labor-market skill patterns and job categorization results.',
    ],
    tags: ['Python', 'NLP', 'TF-IDF', 'Streamlit', 'Google Sheets API'],
  },
  {
    company: 'NYU Research Center for Technology and Economic Development',
    location: 'Abu Dhabi, UAE',
    title: 'Research Assistant',
    dates: 'March 2024 — Aug 2024',
    bullets: [
      'Analyzed large-scale blockchain and commodity market datasets using Python to extract patterns for economic development.',
      'Prototyped a data-driven commodity market application deployed in Ghana, enabling farmers to access analytics-backed insights.',
    ],
    tags: ['Python', 'Blockchain', 'Data Pipelines', 'Financial Modeling'],
  },
  {
    company: 'Pangae Education Development',
    location: 'New York, USA',
    title: 'Data Analyst',
    dates: 'June 2021 — Dec 2023',
    bullets: [
      'Developed predictive models in Python and R, improving educational outcomes by 20% through targeted interventions.',
      'Presented insights to World School, securing $50K funding to support 500 underserved students in Uganda.',
    ],
    tags: ['Python', 'R', 'Predictive Modeling', 'Data Visualization'],
  },
  {
    company: 'Milken Institute — Milken Center for Advancing the American Dream',
    location: 'Washington D.C., USA',
    title: 'Economic Analyst Intern',
    dates: 'June 2022 — Aug 2022',
    bullets: [
      'Synthesized data from 15+ sources to inform reports presented to 1,000+ stakeholders, increasing funding and program reach.',
      'Conducted statistical analysis to improve community access to resources for over 300,000 individuals.',
    ],
    tags: ['Statistical Analysis', 'Data Visualization', 'Dashboards'],
  },
  {
    company: 'Massachusetts Institute of Technology',
    location: 'Boston, USA',
    title: 'Project Coordinator, MIT Emerging Talent Program',
    dates: 'Oct 2021 — May 2022',
    bullets: [
      'Trained 30+ refugee learners in programming, data analysis, and tech skills, improving job readiness by 40%.',
      'Coordinated multi-organization programs to enhance refugee education, digital literacy, and technical skill development.',
    ],
    tags: ['Education Technology', 'Program Coordination', 'Data Analytics'],
  },
]

const cvSkillGroups = [
  { label: 'Programming and Tools', skills: ['Python', 'R', 'STATA', 'SQL', 'Jupyter', 'Power BI', 'LaTeX'] },
  { label: 'Data and Machine Learning', skills: ['NLP', 'Clustering', 'Time-Series', 'ETL Pipelines', 'scikit-learn', 'statsmodels'] },
  { label: 'Visualization', skills: ['Plotly', 'Matplotlib', 'Seaborn', 'Streamlit'] },
  { label: 'Cloud and GIS', skills: ['Google Earth Engine', 'Remote Sensing', 'Landsat', 'NDVI'] },
]

const cvAwards = [
  { name: 'National Science Foundation Fellowship', detail: 'NSF Fellow' },
  { name: 'Mastercard Foundation Scholars Program', detail: '2% acceptance rate', rate: 2 },
  { name: 'New York University Scholarship', detail: '$325,000 · 4% acceptance rate', rate: 4 },
  { name: 'Ethiopian Education Foundation Scholarship', detail: '2% acceptance rate', rate: 2 },
]

const cvLanguages = [
  { lang: 'English', level: 'Fluent' },
  { lang: 'Amharic', level: 'Fluent' },
  { lang: 'Nuer', level: 'Native' },
]

const cvLeadership = [
  {
    org: 'Thok Nath Research Institute',
    location: 'Abu Dhabi, UAE',
    role: 'Co-Founder and Language Technology Strategist',
    dates: 'October 2023 — Present',
    stats: [
      { target: 6000000, label: 'Nuer speakers reached via Google Translate' },
      { target: 2000000, label: 'South Sudanese reached via BBC World News' },
    ],
    desc: 'Partnered with Google to integrate the Nuer language into Google Translate and collaborated with BBC World News to translate critical documents for South Sudanese communities.',
  },
  {
    org: 'Bangtigow Foundation',
    location: 'Dover, USA',
    role: 'Founder and Executive Director',
    dates: 'April 2020 — Present',
    stats: [
      { target: 300, label: 'underserved students benefited', suffix: '+' },
    ],
    descExtra: 'Partnerships with NYU Abu Dhabi and African Leadership University',
    desc: 'Established educational programs and partnerships in East Africa, building collaborations with leading universities to expand access to higher education.',
  },
]

function CVPage() {
  usePageTitle('CV')

  const summaryRef = useRef(null)
  const summaryInView = useInView(summaryRef, { once: true, margin: '-60px' })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })
  const calloutRef = useRef(null)
  const calloutInView = useInView(calloutRef, { once: true, margin: '-60px' })
  const columnsRef = useRef(null)
  const columnsInView = useInView(columnsRef, { once: true, margin: '-60px' })
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' })
  const researchRef = useRef(null)
  const researchInView = useInView(researchRef, { once: true, margin: '-60px' })
  const leadershipRef = useRef(null)
  const leadershipInView = useInView(leadershipRef, { once: true, margin: '-60px' })

  const [timelineProgress, setTimelineProgress] = useState(0)
  const timelineLineRef = useRef(null)

  useEffect(() => {
    const el = timelineLineRef.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const start = windowH * 0.8
      const end = -rect.height * 0.2
      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1)
      setTimelineProgress(progress)

      el.querySelectorAll('.cv-timeline-card:not(.entered)').forEach(card => {
        const r = card.getBoundingClientRect()
        if (r.top < windowH * 0.85) card.classList.add('entered')
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const abstractLines = [
    'Globally, 1.7 billion adults lack access to formal financial services, primarily in South Asia and Sub-Saharan Africa.',
    'This study investigates the impact of digital technology and financial literacy on financial inclusion in 56 countries across South Asia and Sub-Saharan Africa from 2009 to 2019.',
    'The study employs IV-TOBIT regression to handle the limited financial inclusion variable range and mitigate endogeneity concerns.',
    'Findings reveal that digital technology, measured by ICT indicators and a composite indicator of digitalization, significantly and positively affects financial inclusion.',
    'The study emphasizes the need for increased investments in financial, technological infrastructures, and human capital sectors, as financial literacy plays a crucial role in promoting stability and inclusive finance in emerging economies.',
  ]

  return (
    <motion.main
      className="page-layout cv-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* 1. View CV Button Top */}
      <section className="section cv-top-btn-section">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="cv-btn-wrap"
        >
          <a href={cvPdfUrl} target="_blank" rel="noopener noreferrer" className="cv-view-btn">
            View My CV ↓
          </a>
        </motion.div>
      </section>

      {/* 2. Professional Summary */}
      <section className="section" ref={summaryRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={summaryInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cv-section-title">Professional Summary</h2>
          <div className="cv-summary-text">
            <p>I am a graduate of New York University with a degree in Economics and Mathematics, currently pursuing a Master of Development Engineering at UC Berkeley with a focus on AI and Data Science for corporate, NGO, and government applications. I have worked as a Data Engineer at Tabiya where I built NLP pipelines and AI-powered dashboards to map labor-market skills and occupations at scale, a Project Coordinator with MIT's Emerging Talent Program, an Economic Analyst with the Milken Institute, a Research Assistant at NYU Abu Dhabi's Center for Technology and Economic Development, and a Data Analyst with Pangea Educational Development. These roles have allowed me to bridge research, data, and policy to address development and economic challenges at both local and global levels.</p>
            <p>Beyond my academic and professional experience, I run two nonprofit organizations: the Romro Foundation, which supports underprivileged students with access to education and mentorship, and the Thok Nath Research Institute, which advances cultural preservation, education, and technology initiatives. Through these initiatives, I have collaborated with Google and the BBC, highlighting my commitment to driving innovation and impact across diverse sectors.</p>
          </div>
        </motion.div>
      </section>

      {/* 3. Stats Banner */}
      <div className="cv-stats-ring-wrapper" ref={statsRef}>
        <svg className="cv-stats-ring-svg" xmlns="http://www.w3.org/2000/svg">
          <rect
            className="cv-stats-ring-rect"
            x="1" y="1"
            width="calc(100% - 2px)" height="calc(100% - 2px)"
            rx="9" ry="9"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b1a1a" />
              <stop offset="50%" stopColor="#c8a96e" />
              <stop offset="100%" stopColor="#ff0000" />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          className="cv-stats-inner"
          initial={{ opacity: 0, y: 24 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="cv-stat">
            <span className="cv-stat-number"><StatNumber target={5} inView={statsInView} /></span>
            <span className="cv-stat-label">Roles</span>
          </div>
          <div className="cv-stat-divider" />
          <div className="cv-stat">
            <span className="cv-stat-number">$<StatNumber target={500} inView={statsInView} />K+</span>
            <span className="cv-stat-label">in Scholarships</span>
          </div>
          <div className="cv-stat-divider" />
          <div className="cv-stat">
            <span className="cv-stat-number"><StatNumber target={2} inView={statsInView} />+</span>
            <span className="cv-stat-label">Organizations Founded</span>
          </div>
          <div className="cv-stat-divider" />
          <div className="cv-stat">
            <span className="cv-stat-number"><StatNumber target={2} inView={statsInView} />+</span>
            <span className="cv-stat-label">Degrees</span>
          </div>
        </motion.div>
      </div>

      {/* 4. Scholarship Callout */}
      <section className="section" ref={calloutRef}>
        <motion.div
          className="cv-callout"
          initial={{ opacity: 0, y: 20 }}
          animate={calloutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="cv-callout-main">Awarded over $500,000 in scholarships through the <strong>Mastercard Foundation Scholars Program</strong>, <strong>New York University</strong>, and the <strong>Ethiopian Education Foundation</strong>.</p>
          <p className="cv-nsf-statement">National Science Foundation Fellow.</p>
        </motion.div>
      </section>

      {/* 5. Three Column Row */}
      <section className="section" ref={columnsRef}>
        <motion.div
          className="cv-three-cols"
          initial={{ opacity: 0, y: 24 }}
          animate={columnsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="cv-col">
            <h3 className="cv-col-title">Scholarships and Awards</h3>
            <div className="cv-awards-list">
              {cvAwards.map((a, i) => (
                <motion.div
                  key={i}
                  className="cv-award"
                  initial={{ opacity: 0, y: 16 }}
                  animate={columnsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <p className="cv-award-name">{a.name}</p>
                  {a.rate != null ? (
                    <p className="cv-award-stat">
                      <StatNumber target={a.rate} inView={columnsInView} />% acceptance rate
                    </p>
                  ) : (
                    <p className="cv-award-tag">{a.detail}</p>
                  )}
                  {a.name === 'New York University Scholarship' && (
                    <p className="cv-award-amount">$<StatNumber target={325} inView={columnsInView} duration={2000} />,000</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="cv-col">
            <h3 className="cv-col-title">Technical Skills</h3>
            {cvSkillGroups.map((group, gi) => (
              <div key={gi} className="cv-skill-group">
                <p className="cv-skill-group-label">{group.label}</p>
                <div className="cv-skill-tags">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      className="cv-skill-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={columnsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: gi * 0.15 + si * 0.06 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="cv-col">
            <h3 className="cv-col-title">Languages</h3>
            <div className="cv-lang-list">
              {cvLanguages.map((l, i) => (
                <motion.div
                  key={i}
                  className="cv-lang-item"
                  initial={{ opacity: 0, x: 16 }}
                  animate={columnsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                >
                  <span className="cv-lang-name">{l.lang}</span>
                  <span className="cv-lang-level">{l.level}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. Work Experience Timeline — Zigzag */}
      <section className="section" ref={timelineRef}>
        <motion.h2
          className="cv-section-title"
          initial={{ opacity: 0, y: 16 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Relevant Work Experience
        </motion.h2>
        <div className="cv-timeline-zigzag" ref={timelineLineRef}>
          <div className="cv-timeline-zigzag-line" style={{ transform: `scaleY(${timelineProgress})` }} />
          {cvWorkExperience.map((role, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                className={`cv-timeline-zigzag-item ${isLeft ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.15, ease: 'easeOut' }}
              >
                {isLeft && (
                  <div className="cv-timeline-card">
                    <h3 className="cv-timeline-company">{role.company}</h3>
                    <p className="cv-timeline-location">{role.location}</p>
                    <span className="cv-timeline-dates">{role.dates}</span>
                    <p className="cv-timeline-role-title">{role.title}</p>
                    <ul className="cv-timeline-bullets">
                      {role.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                    <div className="cv-timeline-tags">
                      {role.tags.map(tag => <span key={tag} className="cv-timeline-tag">{tag}</span>)}
                    </div>
                  </div>
                )}
                <div className="cv-timeline-dot-col">
                  <div className="cv-timeline-dot" />
                </div>
                {!isLeft && (
                  <div className="cv-timeline-card">
                    <h3 className="cv-timeline-company">{role.company}</h3>
                    <p className="cv-timeline-location">{role.location}</p>
                    <span className="cv-timeline-dates">{role.dates}</span>
                    <p className="cv-timeline-role-title">{role.title}</p>
                    <ul className="cv-timeline-bullets">
                      {role.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                    <div className="cv-timeline-tags">
                      {role.tags.map(tag => <span key={tag} className="cv-timeline-tag">{tag}</span>)}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* 7. Research and Publications */}
      <section className="section" ref={researchRef}>
        <motion.h2
          className="cv-section-title"
          initial={{ opacity: 0, y: 16 }}
          animate={researchInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Research and Publications
        </motion.h2>
        <motion.div
          className="cv-research-card"
          initial={{ opacity: 0, y: 24 }}
          animate={researchInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h3 className="cv-research-title">Innovating Financial Inclusion: The Role of Digital Technologies and Financial Literacy in Emerging Economies</h3>
          <div className="cv-research-meta">
            <span>Chuol Ruei Deng</span>
            <span>New York University Abu Dhabi</span>
            <span>Spring 2024</span>
            <span>Adviser: Professor Samreen Malik</span>
          </div>
          <div className="cv-research-abstract">
            {abstractLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={researchInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <p className="cv-research-keywords">
            <strong>Keywords:</strong> Financial Inclusion, Digital Technology, Financial Literacy, Poverty Eradication, SDGs, Sub-Saharan Africa, South Asia
          </p>
          <a href={researchPaper.pdfUrl} target="_blank" rel="noopener noreferrer" className="link-button">
            Read Full Paper →
          </a>
        </motion.div>
      </section>

      {/* 8. Leadership Cards */}
      <section className="section" ref={leadershipRef}>
        <motion.h2
          className="cv-section-title"
          initial={{ opacity: 0, y: 16 }}
          animate={leadershipInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Leadership
        </motion.h2>
        <div className="cv-leadership-grid">
          {cvLeadership.map((card, i) => {
            const cardRef = useRef(null)
            const cardInView = useInView(cardRef, { once: true, margin: '-60px' })
            return (
              <motion.div
                key={i}
                ref={cardRef}
                className="cv-leadership-card"
                initial={{ opacity: 0, y: 30 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="cv-leadership-header">
                  <div>
                    <h3 className="cv-leadership-org">{card.org}</h3>
                    <p className="cv-leadership-role">{card.role}</p>
                    <p className="cv-leadership-location">{card.location}</p>
                  </div>
                  <span className="cv-leadership-dates">{card.dates}</span>
                </div>
                <div className="cv-leadership-stats">
                  {card.stats.map((s, si) => (
                    <div key={si} className="cv-leadership-stat">
                      <span className="cv-leadership-stat-number">
                        <StatNumber target={s.target} inView={cardInView} duration={2500} />{s.suffix || ''}
                      </span>
                      <span className="cv-leadership-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
                {card.descExtra && <p className="cv-leadership-extra">{card.descExtra}</p>}
                <p className="cv-leadership-desc">{card.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* 9. View CV Button Bottom */}
      <section className="section cv-bottom-btn-section">
        <motion.div
          className="cv-btn-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href={cvPdfUrl} target="_blank" rel="noopener noreferrer" className="cv-view-btn">
            View My CV ↓
          </a>
        </motion.div>
      </section>

      <BackToTop />
    </motion.main>
  )
}

/* ═══════════════════ PROJECTS PAGE ═══════════════════ */

const startupsProjects = [
  {
    title: 'JOW',
    type: 'Startup',
    tags: ['AI', 'Productivity', 'Calendar Intelligence', 'Behavioral Patterns', 'Next.js'],
    description: 'Jow is a voice-first personal AI calendar assistant that manages scheduling through natural voice or text, automatically coordinating availability across people and calendars. It generates personalized daily briefings using calendar data, context, and behavioral patterns to help users better manage their time and decisions.',
    link: 'https://jowcalendar.com',
    external: true,
  },
  {
    title: 'NaathCoders',
    type: 'Community Initiative',
    tags: ['Education Technology', 'Mentorship', 'Nuer Community', 'Africa', 'Bootcamp'],
    description: 'A community-driven initiative dedicated to teaching coding and digital skills to underprivileged and underserved students in Ethiopia. It aims to expand access to technology education and empower the next generation of builders by fostering local innovation and technical capacity.',
  },
  {
    title: 'Naath AI',
    type: 'Research Initiative',
    tags: ['Python', 'NLP', 'Machine Learning', 'Corpus Building'],
    description: 'An NLP pipeline and corpus construction project for Thok Nath, the Nuer language. One of the first machine learning efforts targeting this critically under-resourced language spoken by millions across South Sudan and Ethiopia.',
  },
  {
    title: 'Naath Book Store',
    type: 'Platform',
    tags: ['Next.js', 'Flask', 'PostgreSQL', 'Stripe', 'Paystack'],
    description: 'A community-driven online marketplace for Nuer literature and cultural content. Built and designed to put earning power directly in the hands of the authors and creators.',
  },
  {
    title: 'Thok Nath E-Learning',
    type: 'Education Technology',
    tags: ['React', 'Python', 'Education Technology'],
    description: 'A digital learning platform designed to teach and preserve the Nuer language for diaspora communities. Combines language instruction with cultural context to serve learners across the world.',
    link: 'https://thoknath.org',
    external: true,
  },
]

const researchProjects = [
  { title: 'Unsupervised Learning on NHANES Health Data', description: 'Preprocessed NHANES demographic and clinical features for unsupervised machine learning. Applied clustering algorithms to identify latent population subgroups with similar health indicators and self-reported outcomes.', tags: ['Python', 'Pandas', 'scikit-learn', 'Clustering'], link: 'https://github.com/chuolrdeng/Research-Technical-Projects/blob/main/Research-Technical-Projects/Unsupervised%20Learning%20on%20NHANES%20Health%20Data.ipynb', buttonLabel: 'View Notebook →' },
  { title: 'California Housing Price Prediction', description: 'Built a Random Forest regression model for California housing prices with feature engineering, cross-validation, and RMSE evaluation. Visualized predicted vs actual prices and benchmarked against linear regression baselines.', tags: ['Python', 'scikit-learn', 'Random Forest'], link: 'https://github.com/chuolrdeng/Research-Technical-Projects/blob/main/Research-Technical-Projects/California%20HousingPprices%20Dataset.ipynb', buttonLabel: 'View Notebook →' },
  { title: 'Animated Global Data Visualization', description: 'Merged GDP, population, and life expectancy datasets to create a Rosling-style animated bubble chart visualizing global development trends from 2000 to 2020.', tags: ['Python', 'Pandas', 'Plotly'], link: 'https://github.com/chuolrdeng/Research-Technical-Projects/blob/main/Research-Technical-Projects/Animated%20Global%20Data%20Visualization.ipynb', buttonLabel: 'View Notebook →' },
  { title: 'Econometrics — Baby-Profit Gap and Government Transfer Analysis', description: 'Conducted causal analysis using t-tests, multivariate regression, and regression discontinuity to estimate treatment effects and quantify policy impacts.', tags: ['Python', 'Pandas', 'Statsmodels', 'Econometrics'], link: 'https://github.com/chuolrdeng/Research-Technical-Projects/blob/main/Research-Technical-Projects/Baby-Profit%20Gap%20%26%20Government%20Transfer%20Analysis.ipynb', buttonLabel: 'View Notebook →' },
  { title: 'Remote Sensing — Lake Powell and Las Vegas Urban Expansion', description: 'Mapped water area changes from 2000 to 2023 and urban growth from 2001 to 2019 using Landsat imagery, spectral indices, and NDVI-based vegetation analysis.', tags: ['Google Earth Engine', 'Remote Sensing', 'NDVI', 'Landsat'], link: 'https://github.com/chuolrdeng/Research-Technical-Projects/blob/main/Research-Technical-Projects/Remote%20Sensing%3A%20Lake%20Powell%20%26%20Las%20Vegas%20Urban%20Expansion', buttonLabel: 'View Project →' },
  { title: 'Darfur Household Cooking Analysis', description: 'Analyzed temperature time-series to detect cooking events across households and computed household-level energy usage and behavioral patterns.', tags: ['Python', 'Pandas', 'Plotly', 'Time-Series Analysis'], link: 'https://github.com/chuolrdeng/Research-Technical-Projects/blob/main/Research-Technical-Projects/Darfur%20Household%20Cooking%20Analysis.ipynb', buttonLabel: 'View Notebook →' },
  { title: 'Backpack Tracking and Walking Detection', description: 'Processed accelerometer data to detect walking events using sliding-window methods and produced statistical summaries of walking duration and frequency.', tags: ['Python', 'Pandas', 'Numpy', 'Sliding Windows'], link: 'https://github.com/chuolrdeng/Research-Technical-Projects/blob/main/Research-Technical-Projects/Backpack%20Tracking%20%26%20Walking%20Detection.pdf', buttonLabel: 'View Report →' },
]

const personalContainerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }
const researchContainerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
const projectCardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }

function ProjectsPage() {
  usePageTitle('Projects')
  const startupsRef = useRef(null)
  const startupsInView = useInView(startupsRef, { once: true, margin: '-60px' })
  const researchRef = useRef(null)
  const researchInView = useInView(researchRef, { once: true, margin: '-60px' })

  return (
    <motion.main className="page-layout projects-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <section className="section" ref={startupsRef}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={startupsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="projects-section-title"><span style={{ color: 'var(--color-maroon)' }}>Startups and</span> <em>Initiatives</em></h2>
        </motion.div>
        <motion.div className="projects-personal-grid" variants={personalContainerVariants} initial="hidden" animate={startupsInView ? 'visible' : 'hidden'}>
          {startupsProjects.map((project, i) => (
            <motion.div key={i} className="project-featured-card" variants={projectCardVariants} whileHover={{ y: -4, transition: { duration: 0.25 } }}>
              <div className="project-featured-header">
                <div>
                  <p className="project-type">{project.type}</p>
                  <h3 className="project-title">{project.title}</h3>
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={`Visit ${project.title}`}>
                    Visit →
                  </a>
                )}
                {!project.link && <span className="project-coming-soon">Coming Soon</span>}
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="section" ref={researchRef}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={researchInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="projects-section-title"><span style={{ color: 'var(--color-maroon)' }}>Research</span> and Technical <em>Projects</em></h2>
        </motion.div>
        <motion.div className="projects-research-grid" variants={researchContainerVariants} initial="hidden" animate={researchInView ? 'visible' : 'hidden'}>
          {researchProjects.map((project, i) => (
            <motion.div key={i} className="project-research-card" variants={projectCardVariants} whileHover={{ y: -4, transition: { duration: 0.25 } }}>
              <div className="project-research-top">
                <p className="project-research-type">Research Project</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-research-link" aria-label={`View ${project.title} on GitHub`}>
                  {project.buttonLabel}
                </a>
              </div>
              <h3 className="project-research-title">{project.title}</h3>
              <p className="project-research-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <BackToTop />
    </motion.main>
  )
}

function AboutPage() {
  return (
    <PageLayout title="About">
      <motion.div className="about-content" variants={item}>
        <p>
          I combine research experience with technical skills and a focus on clear communication and delivery.
          My capstone work and project experience have shaped how I approach problems and work with teams.
        </p>
        <p>
          I care about clean design, thoughtful analysis, and teams that ship. Outside work, I enjoy reading,
          side projects, and conversations that lead somewhere.
        </p>
        <p>
          If you'd like to work together or just say hi, head to the Contact page — I'm always open to new ideas and collaborations.
        </p>
      </motion.div>
    </PageLayout>
  )
}

function ContactPage() {
  usePageTitle('Contact')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.main
      ref={ref}
      className="page-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <section className="section">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.h1>
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="contact-lead">Let's connect.</p>
          <p className="contact-intro">
            Have a project in mind or just want to say hi? Send me a message and I'll get back to you as soon as I can.
          </p>
          <ContactForm />
        </motion.div>
      </section>
    </motion.main>
  )
}

function ContactForm() {
  const DIRECT_EMAIL = 'chuolrdeng@berkeley.edu'
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykdnbwv'
  const SUBMITTED_SESSION_KEY = 'contact_form_submitted_v1'

  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, subject: false, message: false })
  const [errorMessage, setErrorMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SUBMITTED_SESSION_KEY) === '1') setStatus('success')
    } catch { /* ignore */ }
  }, [])

  const validate = (field, value) => {
    const v = typeof value === 'string' ? value.trim() : ''
    if (field === 'name') { if (!v) return 'Name is required.'; if (v.length < 2) return 'Name must be at least 2 characters.' }
    if (field === 'email') { if (!v) return 'Email is required.'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address.' }
    if (field === 'subject') { if (!v) return 'Subject is required.'; if (v.length < 3) return 'Subject must be at least 3 characters.' }
    if (field === 'message') { if (!v) return 'Message is required.'; if (v.length < 20) return 'Message must be at least 20 characters.' }
    return ''
  }

  const handleChange = (e) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value })); if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, value) })) }
  const handleBlur = (e) => { const { name, value } = e.target; setTouched((prev) => ({ ...prev, [name]: true })); setErrors((prev) => ({ ...prev, [name]: validate(name, value) })) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (honeypot) return
    const nameErr = validate('name', formData.name)
    const emailErr = validate('email', formData.email)
    const subjectErr = validate('subject', formData.subject)
    const messageErr = validate('message', formData.message)
    if (nameErr || emailErr || subjectErr || messageErr) {
      setErrors({ name: nameErr, email: emailErr, subject: subjectErr, message: messageErr })
      setTouched({ name: true, email: true, subject: true, message: true })
      return
    }
    setStatus('sending'); setErrorMessage('')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    try {
      const fd = new FormData()
      fd.append('name', formData.name); fd.append('email', formData.email); fd.append('subject', formData.subject); fd.append('message', formData.message)
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' }, signal: controller.signal })
      clearTimeout(timeout)
      if (!res.ok) { setErrorMessage('The server rejected your message. Please try again, or email me directly at'); setStatus('error'); return }
      try { sessionStorage.setItem(SUBMITTED_SESSION_KEY, '1') } catch { /* ignore */ }
      setFormData({ name: '', email: '', subject: '', message: '' }); setErrors({ name: '', email: '', subject: '', message: '' }); setTouched({ name: false, email: false, subject: false, message: false }); setHoneypot(''); setStatus('success')
    } catch (err) {
      clearTimeout(timeout)
      if (err.name === 'AbortError') setErrorMessage('Request timed out. Please check your connection and try again.')
      else setErrorMessage('Something went wrong. Please try again, or email me directly at')
      setStatus('error')
    }
  }

  const rowVariant = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

  if (status === 'success') {
    return (
      <motion.div className="form-success-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <motion.span className="success-icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}>✉</motion.span>
        <motion.h2 className="success-heading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}>Thank you for contacting me.</motion.h2>
        <motion.p className="success-body" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}>I will get back to you.</motion.p>
      </motion.div>
    )
  }

  return (
    <motion.form className="contact-form" onSubmit={handleSubmit} noValidate initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}>
      <AnimatePresence>
        {status === 'error' && (
          <motion.div className="form-error-banner" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
            <span>{errorMessage}{' '}<a href={`mailto:${DIRECT_EMAIL}`}>{DIRECT_EMAIL}</a></span>
            <button type="button" className="banner-dismiss" onClick={() => { setStatus('idle'); setErrorMessage('') }} aria-label="Dismiss error">✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {['name', 'email', 'subject'].map(field => (
        <AnimatePresence key={field}>
          <motion.div className={`form-row ${touched[field] && !errors[field] && formData[field] ? 'has-valid' : ''}`} variants={rowVariant}>
            <label htmlFor={`contact-${field}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input id={`contact-${field}`} type={field === 'email' ? 'email' : 'text'} name={field} value={formData[field]} onChange={handleChange} onBlur={handleBlur} placeholder={field === 'name' ? 'Your full name' : field === 'email' ? 'you@example.com' : "What's this about?"} required={field !== 'subject'} disabled={status === 'sending'} aria-describedby={`${field}-error`} className={touched[field] && errors[field] ? 'field-invalid' : touched[field] && !errors[field] && formData[field] ? 'field-valid' : ''} />
            {touched[field] && errors[field] && <motion.span id={`${field}-error`} className="field-error" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>{errors[field]}</motion.span>}
          </motion.div>
        </AnimatePresence>
      ))}

      <AnimatePresence>
        <motion.div className={`form-row ${touched.message && !errors.message && formData.message ? 'has-valid' : ''}`} variants={rowVariant}>
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} placeholder="Your message..." rows={5} required disabled={status === 'sending'} aria-describedby="message-error" className={touched.message && errors.message ? 'field-invalid' : touched.message && !errors.message && formData.message ? 'field-valid' : ''} />
          <span className={`char-counter ${formData.message.length >= 20 ? 'counter-ok' : 'counter-warn'}`}>{formData.message.length} / 20 minimum characters</span>
          {touched.message && errors.message && <motion.span id="message-error" className="field-error" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>{errors.message}</motion.span>}
        </motion.div>
      </AnimatePresence>

      <input type="text" name="_gotcha" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <motion.div className="form-actions" variants={rowVariant}>
        <motion.button type="submit" className="contact-submit" disabled={status === 'sending'} whileHover={{ scale: status === 'sending' ? 1 : 1.02 }} whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}>
          {status === 'sending' ? (<>Sending<span className="sending-dots" aria-hidden="true" /></>) : 'Send message'}
        </motion.button>
      </motion.div>
    </motion.form>
  )
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-social">
          {footerSocials.map((s) => {
            const IconComponent = footerIconMap[s.iconKey]
            return (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-link" aria-label={s.ariaLabel || s.label} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                {IconComponent ? <IconComponent className="footer-icon" aria-hidden /> : null}
                <span className="footer-label">{s.label}</span>
              </motion.a>
            )
          })}
        </div>
        <p className="footer-credit">Chuol Ruei Deng © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cv" element={<CVPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <div id="main-content" tabIndex={-1}>
        <AnimatedRoutes />
      </div>
      <Footer />
    </div>
  )
}
