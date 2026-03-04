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
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, subject: false, message: false })
  const [errorMessage, setErrorMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const validate = (field, value) => {
    if (field === 'name') {
      if (!value.trim()) return 'Name is required.'
      if (value.trim().length < 2) return 'Name must be at least 2 characters.'
    }
    if (field === 'email') {
      if (!value.trim()) return 'Email is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.'
    }
    if (field === 'subject') {
      if (!value.trim()) return 'Subject is required.'
      if (value.trim().length < 3) return 'Subject must be at least 3 characters.'
    }
    if (field === 'message') {
      if (!value.trim()) return 'Message is required.'
      if (value.trim().length < 20) return 'Message must be at least 20 characters.'
    }
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }))
  }

  const resetForm = () => {
    setStatus('idle')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setErrors({ name: '', email: '', subject: '', message: '' })
    setTouched({ name: false, email: false, subject: false, message: false })
    setErrorMessage('')
    setHoneypot('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Spam protection — if honeypot is filled, silently do nothing
    if (honeypot) return

    // Step 1 — validate all fields before touching the network
    const nameErr = validate('name', formData.name)
    const emailErr = validate('email', formData.email)
    const subjectErr = validate('subject', formData.subject)
    const messageErr = validate('message', formData.message)

    if (nameErr || emailErr || subjectErr || messageErr) {
      setErrors({ name: nameErr, email: emailErr, subject: subjectErr, message: messageErr })
      setTouched({ name: true, email: true, subject: true, message: true })
      return // stop here, never reach fetch
    }

    setStatus('sending')
    setErrorMessage('')

    // Step 2 — timeout protection
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('email', formData.email)
      fd.append('subject', formData.subject)
      fd.append('message', formData.message)

      const res = await fetch('https://formspree.io/f/xykdnbwv', {
        method: 'POST',
        body: fd,
        signal: controller.signal,
      })

      clearTimeout(timeout)

      // Step 3 — handle server rejection with logging
      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        console.error('Formspree rejected submission:', res.status, errorData)
        setErrorMessage('The server rejected your message. Please try again or email me directly at your@email.com.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch (err) {
      clearTimeout(timeout)
      console.error('Form submission error:', err)
      if (err.name === 'AbortError') {
        setErrorMessage('Request timed out. Please check your connection and try again.')
      } else {
        setErrorMessage('Something went wrong. Please try again or email me directly at your@email.com.')
      }
      setStatus('error')
    }
  }

  const rowVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  if (status === 'success') {
    return (
      <motion.div
        className="form-success-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          className="success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
        >
          ✉
        </motion.span>

        <motion.h2
          className="success-heading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          Thanks for contacting me.
        </motion.h2>

        <motion.p
          className="success-body"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          I appreciate you reaching out. I'll get back to you as soon as possible.
          If you need an immediate response, email me directly at{' '}
          <a href="mailto:your@email.com">your@email.com</a>.
        </motion.p>

        <motion.button
          className="success-reset-btn"
          onClick={resetForm}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send another message
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
    >
      {/* ── Dismissible error banner ── */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            className="form-error-banner"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>
              {errorMessage}{' '}
              <a href="mailto:your@email.com">
                your@email.com
              </a>
            </span>
            <button
              type="button"
              className="banner-dismiss"
              onClick={() => setStatus('idle')}
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Name ── */}
      <AnimatePresence>
        <motion.div
          className={`form-row ${touched.name && !errors.name && formData.name ? 'has-valid' : ''}`}
          variants={rowVariant}
        >
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your full name"
            required
            disabled={status === 'sending'}
            aria-describedby="name-error"
            className={
              touched.name && errors.name
                ? 'field-invalid'
                : touched.name && !errors.name && formData.name
                  ? 'field-valid'
                  : ''
            }
          />
          {touched.name && errors.name && (
            <motion.span
              id="name-error"
              className="field-error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {errors.name}
            </motion.span>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Email ── */}
      <AnimatePresence>
        <motion.div
          className={`form-row ${touched.email && !errors.email && formData.email ? 'has-valid' : ''}`}
          variants={rowVariant}
        >
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@example.com"
            required
            disabled={status === 'sending'}
            aria-describedby="email-error"
            className={
              touched.email && errors.email
                ? 'field-invalid'
                : touched.email && !errors.email && formData.email
                  ? 'field-valid'
                  : ''
            }
          />
          {touched.email && errors.email && (
            <motion.span
              id="email-error"
              className="field-error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {errors.email}
            </motion.span>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Subject ── */}
      <AnimatePresence>
        <motion.div
          className={`form-row ${touched.subject && !errors.subject && formData.subject ? 'has-valid' : ''}`}
          variants={rowVariant}
        >
          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="What's this about?"
            disabled={status === 'sending'}
            aria-describedby="subject-error"
            className={
              touched.subject && errors.subject
                ? 'field-invalid'
                : touched.subject && !errors.subject && formData.subject
                  ? 'field-valid'
                  : ''
            }
          />
          {touched.subject && errors.subject && (
            <motion.span
              id="subject-error"
              className="field-error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {errors.subject}
            </motion.span>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Message ── */}
      <AnimatePresence>
        <motion.div
          className={`form-row ${touched.message && !errors.message && formData.message ? 'has-valid' : ''}`}
          variants={rowVariant}
        >
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your message..."
            rows={5}
            required
            disabled={status === 'sending'}
            aria-describedby="message-error"
            className={
              touched.message && errors.message
                ? 'field-invalid'
                : touched.message && !errors.message && formData.message
                  ? 'field-valid'
                  : ''
            }
          />
          <span className={`char-counter ${formData.message.length >= 20 ? 'counter-ok' : 'counter-warn'}`}>
            {formData.message.length} / 20 minimum characters
          </span>
          {touched.message && errors.message && (
            <motion.span
              id="message-error"
              className="field-error"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {errors.message}
            </motion.span>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Honeypot field for spam protection */}
      <input
        type="text"
        name="_gotcha"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* ── Submit ── */}
      <motion.div className="form-actions" variants={rowVariant}>
        <motion.button
          type="submit"
          className="contact-submit"
          disabled={status === 'sending'}
          whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
          whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
        >
          {status === 'sending' ? (
            <>
              Sending
              <span className="sending-dots" aria-hidden="true" />
            </>
          ) : (
            'Send message'
          )}
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
