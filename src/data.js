// Content derived from CV and research — update with your exact details from the PDFs.

export const cvPdfUrl = '/Deng_Chuol_CV.pdf'
// Encoded so the link works with apostrophe in filename
export const researchPdfUrl = "/Chuol%27s%20Capstone%20Research%20Paper.pdf"

// Bio drafted from CV — tailor to match your CV exactly
export const bioContent = `I'm Chuol Ruei Deng — a researcher and builder with a focus on turning ideas into impact. My work spans academic research, software development, and collaborative projects where clarity and execution matter.

I completed a capstone research project that deepened my skills in analysis and communication, and I bring the same rigor to every role and team I join. I'm drawn to problems that require both technical depth and clear thinking, and I enjoy learning in public and shipping work that others can build on.

When I'm not in the lab or at the keyboard, I'm usually exploring new topics, connecting with people who care about meaningful work, or diving into the next challenge.`

// CV page: short summary + link to full PDF
export const cvSummary = `I combine research experience, technical skills, and a track record of collaboration and leadership. My capstone work and project experience have strengthened my ability to analyze problems, communicate findings, and deliver results. Download my full CV below for education, experience, and skills.`

// CV timeline entries — replace with exact roles/dates from your CV
export const cvEntries = [
  {
    role: 'Capstone Research',
    where: 'Senior / Research Project',
    period: '2024',
    desc: 'Designed and executed a capstone research project; produced a full research paper and presentation. Strengthened skills in literature review, methodology, analysis, and academic writing.',
  },
  {
    role: 'Education & Leadership',
    where: 'Relevant institution / roles',
    period: '— Present',
    desc: 'Ongoing education and leadership roles in academic and team settings. Focus on collaboration, clear communication, and delivering on commitments.',
  },
]

// Research paper: abstract/summary + link (replace abstract with exact text from your PDF)
export const researchPaper = {
  title: "Capstone Research Paper",
  abstract: `This capstone research project addresses a substantive question in the field through a structured methodology: literature review, clear research design, data collection and analysis, and interpretation of results. The paper presents findings and implications and discusses limitations and directions for future work. It reflects the author's ability to conduct independent research and communicate it effectively in academic form.`,
  pdfUrl: researchPdfUrl,
}

// Projects drawn from CV experience — replace with your real projects and links
export const projects = [
  {
    title: 'Capstone Research Project',
    tech: 'Research · Analysis · Writing',
    desc: 'Full capstone research project from question formulation through to a completed paper and presentation. Demonstrates research design, critical analysis, and academic communication.',
    link: researchPdfUrl,
    external: false,
  },
  {
    title: 'Portfolio & Web Development',
    tech: 'React · JavaScript · CSS',
    desc: 'This portfolio site: responsive layout, contact form, and clear structure for CV, projects, and research. Built with modern tooling and attention to accessibility and performance.',
    link: '/',
    external: false,
  },
  {
    title: 'Technical & Collaborative Projects',
    tech: 'Software · Data · Team',
    desc: 'Ongoing technical and team-based projects from coursework and experience. Focus on problem-solving, clear documentation, and delivering usable results.',
    link: cvPdfUrl,
    external: false,
  },
]

// Footer: same on every page (GitHub, LinkedIn, Instagram, Email)
// iconKey must match one of: github, linkedin, instagram, email (used to render real icons)
export const footerSocials = [
  { label: 'GitHub', href: 'https://github.com/chuolrdeng', iconKey: 'github', ariaLabel: 'GitHub profile' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/chuolrdeng', iconKey: 'linkedin', ariaLabel: 'LinkedIn profile' },
  { label: 'Instagram', href: 'https://instagram.com/chuolrdeng', iconKey: 'instagram', ariaLabel: 'Instagram profile' },
  { label: 'Email', href: 'mailto:chuolrdeng@berkeley.edu', iconKey: 'email', ariaLabel: 'Send email' },
]
