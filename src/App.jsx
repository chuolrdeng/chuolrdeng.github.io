import { useRef, useState, useEffect } from 'react'
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  bioContent,
  cvSummary,
  cvEntries,
  cvPdfUrl,
  researchPaper,
  projects,
  footerSocials,
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

function LandingPage() {
  usePageTitle('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.main
      ref={ref}
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="landing-inner">
        <motion.div
          className="landing-photo"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
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
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <motion.h1
            className="landing-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            Hi, I'm Chuol.
          </motion.h1>
          <motion.p
            className="landing-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            Welcome to my corner of the web.
          </motion.p>
          <motion.div
            className="landing-bio-text"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            {bioContent.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
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

function CVPage() {
  return (
    <PageLayout title="CV" showBackToTop>
      <motion.p variants={item} className="cv-summary">
        {cvSummary}
      </motion.p>
      <div className="cv-list">
        {cvEntries.map((e, i) => (
          <motion.div key={i} className="cv-card" variants={item}>
            <div className="cv-card-header">
              <span className="cv-role">{e.role}</span>
              <span className="cv-period">{e.period}</span>
            </div>
            <div className="cv-where">{e.where}</div>
            <p className="cv-desc">{e.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div variants={item} className="research-block">
        <h2 className="research-title">Research &amp; Publications</h2>
        <p className="research-abstract">{researchPaper.abstract}</p>
        <a
          href={researchPaper.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-button"
        >
          Read full paper (PDF)
        </a>
      </motion.div>
      <motion.p variants={item} className="section-cta">
        <a href={cvPdfUrl} target="_blank" rel="noopener noreferrer" className="link-button">
          Download full CV (PDF)
        </a>
      </motion.p>
    </PageLayout>
  )
}

function ProjectsPage() {
  return (
    <PageLayout title="Projects" showBackToTop>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            className="project-card"
            variants={item}
            target={p.link.startsWith('http') ? '_blank' : undefined}
            rel={p.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="project-tech">{p.tech}</span>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <span className="project-arrow">→</span>
          </motion.a>
        ))}
      </div>
    </PageLayout>
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
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('email', formData.email)
      fd.append('subject', formData.subject)
      fd.append('message', formData.message)
      const res = await fetch('https://formspree.io/f/xykdnbwv', {
        method: 'POST',
        body: fd,
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const rowVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
    >
      <motion.div className="form-row" variants={rowVariant}>
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          disabled={status === 'sending'}
        />
      </motion.div>
      <motion.div className="form-row" variants={rowVariant}>
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          disabled={status === 'sending'}
        />
      </motion.div>
      <motion.div className="form-row" variants={rowVariant}>
        <label htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          disabled={status === 'sending'}
        />
      </motion.div>
      <motion.div className="form-row" variants={rowVariant}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          rows={5}
          required
          disabled={status === 'sending'}
        />
      </motion.div>
      <motion.div className="form-actions" variants={rowVariant}>
        <motion.button
          type="submit"
          className="contact-submit"
          disabled={status === 'sending'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </motion.button>
        {status === 'success' && (
          <motion.p
            className="form-success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Thanks! I'll be in touch soon.
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            className="form-error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Something went wrong. Please try again or email me directly.
          </motion.p>
        )}
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
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                aria-label={s.ariaLabel || s.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
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
