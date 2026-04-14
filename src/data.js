export const cvPdfUrl = '/Deng_Chuol_CV.pdf'
export const researchPdfUrl = "/Chuol%27s%20Capstone%20Research%20Paper.pdf"

export const bioContent = `I'm Chuol Ruei Deng, a first-generation student, researcher, and builder driven by one mission: creating human-centered technology that solves real problems in development economics, education, business, and finance.

I'm pursuing a Master of Development Engineering at UC Berkeley with a concentration in AI and Data Analytics, building on an undergraduate degree in Economics and Mathematics from New York University. Born between South Sudan and Ethiopia, my background has given me a deep appreciation for the communities that technology too often overlooks.

Beyond the classroom, I co-founded the Romro Foundation, Bangtigow in Education, and the Thok Nath Research Institute, each built to create lasting impact through education, community engagement, and economic self-sufficiency.

I build automated systems, develop software, and lead projects where clarity and follow-through are non-negotiable — because good ideas are not enough without strong execution.`

export const cvSummary = `I combine research experience, technical skills, and a track record of collaboration and leadership. My capstone work and project experience have strengthened my ability to analyze problems, communicate findings, and deliver results. Download my full CV below for education, experience, and skills.`

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

export const researchPaper = {
  title: "Capstone Research Paper",
  abstract: `This capstone research project addresses a substantive question in the field through a structured methodology: literature review, clear research design, data collection and analysis, and interpretation of results. The paper presents findings and implications and discusses limitations and directions for future work. It reflects the author's ability to conduct independent research and communicate it effectively in academic form.`,
  pdfUrl: researchPdfUrl,
}

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

export const footerSocials = [
  { label: 'GitHub', href: 'https://github.com/chuolrdeng', iconKey: 'github', ariaLabel: 'GitHub profile' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/chuolrdeng', iconKey: 'linkedin', ariaLabel: 'LinkedIn profile' },
  { label: 'Instagram', href: 'https://instagram.com/chuolrdeng', iconKey: 'instagram', ariaLabel: 'Instagram profile' },
  { label: 'Email', href: 'mailto:chuolrdeng@berkeley.edu', iconKey: 'email', ariaLabel: 'Send email' },
]

export const educationEntries = [
  {
    degree: 'Master of Development Engineering',
    field: 'AI and Data Analytics',
    school: 'University of California, Berkeley',
    years: '2025 — Present',
    image: '/uc-berkeley.png',
    desc: 'Pursuing advanced study at the intersection of technology and human development, with a focus on building AI-driven systems and data tools that address real-world challenges in low-resource and underserved communities.',
  },
  {
    degree: 'Bachelor of Arts',
    field: 'Economics and Mathematics',
    school: 'New York University',
    years: '2020 — 2024',
    image: '/nyuad.jpeg',
    desc: 'Built a rigorous analytical foundation in economic theory, quantitative methods, and mathematical modeling. Completed capstone research in data analysis and econometrics in finance, developing the research and execution skills carried into every project since.',
    programs: [
      {
        field: 'Economics, Mathematics, and Finance',
        school: 'NYU Stern School of Business',
        years: '2023',
        image: '/nyu_stern.jpg',
        desc: 'Completed graduate-level coursework in economics, mathematics, and finance.',
      },
      {
        field: 'Anglo-American Politics, Policy, and Public Opinion',
        school: 'New York University Washington, D.C.',
        years: '2022',
        image: '/nyu_dc.png',
        desc: 'Course with Professor Frank Luntz.',
      },
      {
        field: 'Ethnography and Field Research',
        school: 'New York University Tel Aviv',
        years: '2023',
        image: '/nyu_telaviv.png',
        desc: 'Course with Professor Mitchell Duneier (Princeton University).',
      },
      {
        field: 'Ecopoetics',
        school: 'New York University – Bangalore, India',
        years: '2024',
        image: null,
        desc: 'Interdisciplinary study exploring the relationship between ecology, culture, and society.',
      },
    ],
  },
  {
    degree: 'High School Diploma',
    field: 'Science',
    school: 'School of Tomorrow',
    years: '2016 — 2020',
    image: '/sot.jpeg',
    desc: 'Developed an early foundation in scientific reasoning, mathematics, and critical thinking that shaped a lifelong interest in research, problem solving, and understanding how systems work.',
  },
]

export const organizationEntries = [
  {
    name: 'Thok Nath Research Institute',
    role: 'Co-Founder',
    est: '2023',
    image: '/thok-nath.png',
    desc: 'A research institute dedicated to the preservation and advancement of the Nuer language and culture through technology and linguistic research. The institute develops digital tools, builds language datasets, and creates NLP pipelines for Thok Nath — one of the most under-resourced languages in the world. Its long-term mission is to ensure the Nuer language survives and thrives in the digital age, giving the Nuer-speaking diaspora across South Sudan, Ethiopia, and beyond the infrastructure to communicate, learn, and build in their own language.',
  },
  {
    name: 'Romro Foundation',
    role: 'Co-Founder',
    est: '2020',
    image: '/romro.png',
    desc: 'Romro Foundation is a registered 501(c)(3) nonprofit organization focused on providing practical educational opportunities in regions of the world where such opportunities are limited. Romro is the parent organization behind two educational initiatives. Bangtigow in Education provides scholarships, mentorship, and academic support to Nuer youth. The Thok Nath Research Institute focuses on language preservation and cultural technology. Together these programs reflect a single belief: that sustainable development starts with investing in people, their education, and their identity.',
  },
]
