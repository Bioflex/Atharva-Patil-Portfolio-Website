import React, { useState, useEffect, useRef } from 'react';
import { Button, Navbar, Nav, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Aurora from '../ReactBits/Aurora/Aurora';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaShieldAlt, FaTools, FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiPostgresql, SiMongodb, SiExpress, SiWireshark, SiBurpsuite, SiGit } from 'react-icons/si';
import './Home.css';

// --- DATA ---
const projects = [
    {
        title: "Threat Intel Dashboard",
        description: "A real-time dashboard that aggregates and visualizes cybersecurity threats, helping analysts identify patterns and respond to incidents.",
        tech: ["React", "D3.js", "Node.js", "MongoDB"],
        liveUrl: "#",
        repoUrl: "#",
        imageUrl: "https://picsum.photos/seed/threat/400/250"
    },
    {
        title: "SecureAuth Pro",
        description: "A full-stack web app with multi-factor authentication and role-based access control, designed with a focus on preventing common web vulnerabilities.",
        tech: ["Express", "JWT", "PostgreSQL", "React"],
        liveUrl: "#",
        repoUrl: "#",
        imageUrl: "https://picsum.photos/seed/secure/400/250"
    },
    {
        title: "Portfolio Website V1",
        description: "This very website, built with a focus on modern design principles and secure, clean code. The UI is a showcase of glassmorphism over an animated background.",
        tech: ["React", "React-Bootstrap", "CSS-in-JS"],
        liveUrl: "#",
        repoUrl: "#",
        imageUrl: "https://picsum.photos/seed/portfolio/400/250"
    }
];

const skills = {
    webDevelopment: ['React', 'Node.js', 'Express', 'JavaScript (ES6+)', 'Python', 'SQL', 'RESTful APIs'],
    cybersecurity: ['Threat Modeling', 'Vulnerability Analysis', 'Penetration Testing', 'Secure Coding', 'Network Security', 'Incident Response'],
    tools: ['Docker', 'Git & GitHub', 'Nmap', 'Wireshark', 'Metasploit', 'Burp Suite']
};

// Skill details with icons and colors for a professional touch
const skillDetails = {
    'React': { icon: FaReact, color: '#61DAFB' },
    'Node.js': { icon: FaNodeJs, color: '#68A063' },
    'Express': { icon: SiExpress, color: '#FFFFFF' },
    'JavaScript (ES6+)': { icon: FaCode, color: '#F7DF1E' },
    'Python': { icon: FaPython, color: '#3776AB' },
    'SQL': { icon: SiPostgresql, color: '#336791' },
    'RESTful APIs': { icon: FaCode, color: '#6c757d' },
    'D3.js': { icon: FaCode, color: '#F9A03C' },
    'MongoDB': { icon: SiMongodb, color: '#47A248' },
    'Threat Modeling': { icon: FaShieldAlt, color: '#ffc107' },
    'Vulnerability Analysis': { icon: FaShieldAlt, color: '#dc3545' },
    'Penetration Testing': { icon: FaShieldAlt, color: '#fd7e14' },
    'Secure Coding': { icon: FaShieldAlt, color: '#17a2b8' },
    'Network Security': { icon: FaShieldAlt, color: '#28a745' },
    'Incident Response': { icon: FaShieldAlt, color: '#dc3545' },
    'Docker': { icon: FaTools, color: '#0db7ed' },
    'Git & GitHub': { icon: SiGit, color: '#f54d27' },
    'Nmap': { icon: FaTools, color: '#007bff' },
    'Wireshark': { icon: SiWireshark, color: '#1679A8' },
    'Metasploit': { icon: FaTools, color: '#88121E' },
    'Burp Suite': { icon: SiBurpsuite, color: '#E47D2C' },
    'CSS-in-JS': { icon: FaCode, color: '#9932CC' }
};


// --- COMPONENT ---

export default function Home() {
    const [activeSection, setActiveSection] = useState('home');
    const [visibleSections, setVisibleSections] = useState({});

    // Improved section detection for navbar highlighting
    useEffect(() => {
        const sections = document.querySelectorAll('section, header#home');
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let currentSection = 'home';
                    let minDistance = Infinity;
                    sections.forEach(section => {
                        const rect = section.getBoundingClientRect();
                        const distance = Math.abs(rect.top - 80); // 80px for navbar offset
                        if (rect.top <= 120 && distance < minDistance) {
                            minDistance = distance;
                            currentSection = section.id;
                        }
                    });
                    setActiveSection(currentSection);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Section fade-in animation (plays every time section enters viewport)
    useEffect(() => {
        const sections = document.querySelectorAll('section, header#home');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setVisibleSections(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            {
                root: null,
                threshold: 0.3,
            }
        );
        sections.forEach((section) => observer.observe(section));
        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    // Smooth scroll with navbar offset
    const handleNavLinkClick = (e, sectionId) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            const yOffset = -80; // Adjust for navbar height
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <main className="home-container bg-dark text-white position-relative">
            {/* Aurora Background */}
            <div className="aurora-background">
                <Aurora amplitude={0.5} frequency={0.3} speed={1} />
            </div>

            {/* Glass Navbar */}
            <Navbar collapseOnSelect expand="sm" variant="dark" className="glass-navbar py-3" fixed="top">
                <Container>
                    <Navbar.Brand href="#home" className="fw-bold brand-text">Atharva Patil</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={(e) => handleNavLinkClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>About</Nav.Link>
                            <Nav.Link onClick={(e) => handleNavLinkClick(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>Projects</Nav.Link>
                            <Nav.Link onClick={(e) => handleNavLinkClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>Expertise</Nav.Link>
                            <Nav.Link onClick={(e) => handleNavLinkClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* --- All Page Content --- */}
            <div className="content-wrapper">

                {/* HERO SECTION */}
                <header
                    id="home"
                    className={`d-flex flex-column justify-content-center align-items-center text-center vh-100 hero-section section-fade${visibleSections['home'] ? ' visible' : ''}`}
                >
                    <div className="p-4">
                        <p className="lead accent-text">Hi, my name is</p>
                        <h1 className="display-1 fw-bold">Atharva Patil.</h1>
                        <h2 className="display-5 text-white-50">I build and secure digital experiences.</h2>
                        <p className="lead mt-4 mx-auto tagline">
                            I'm a full-stack developer specializing in cybersecurity, passionately bridging the gap between elegant design and uncompromised security.
                        </p>
                        <Button variant="outline-info" size="lg" href="#projects" className="mt-3">View My Work</Button>
                    </div>
                </header>

                {/* ABOUT SECTION */}
                <section
                    id="about"
                    className={`section-fade${visibleSections['about'] ? ' visible' : ''}`}
                >
                    <Container>
                        <h2 className="text-center display-4 mb-5">About Me</h2>
                        <Row className="align-items-center">
                            <Col md={8}>
                                <p className="lead">
                                    My journey began with a curiosity for how things work, which quickly evolved into a passion for building robust software. That curiosity deepened as I realized the critical importance of protecting what we build.
                                </p>
                                <p className="lead">
                                    Based in Mumbai, I thrive on challenges, whether it's designing a secure authentication system or performing a vulnerability analysis. My goal is to craft applications that are not just functional and beautiful, but also fortified against threats.
                                </p>
                            </Col>
                            <Col md={4} className="text-center">
                                <img src="\src\assets\atharva-formal.jpg" alt="Atharva Patil, a cybersecurity-focused web developer" className="img-fluid rounded-circle shadow-lg"/>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* PROJECTS SECTION */}
                <section
                    id="projects"
                    className={`section-fade${visibleSections['projects'] ? ' visible' : ''}`}
                >
                    <Container>
                        <h2 className="text-center display-4 mb-5">My Projects</h2>
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {projects.map((project, index) => (
                                <Col key={index}>
                                    <Card className="h-100 text-white shadow-lg project-card bg-dark">
                                        <Card.Img variant="top" src={project.imageUrl} alt={`Screenshot of ${project.title}`} />
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title as="h4">{project.title}</Card.Title>
                                            <Card.Text>{project.description}</Card.Text>
                                            <div className="mt-auto">
                                                <div className="mb-3">
                                                    {project.tech.map(t => <Badge pill bg="secondary" className="me-2 mb-2" key={t}>{t}</Badge>)}
                                                </div>
                                                <Button variant="outline-info" href={project.liveUrl} className="me-2" target="_blank" rel="noopener noreferrer">Live Demo</Button>
                                                <Button variant="outline-light" href={project.repoUrl} target="_blank" rel="noopener noreferrer">Source Code</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>

                {/* SKILLS SECTION */}
                <section
                    id="skills"
                    className={`section-fade${visibleSections['skills'] ? ' visible' : ''}`}
                >
                    <Container className="text-center">
                        <h2 className="display-4 mb-5">My Expertise</h2>
                        <p className="lead mb-4">I operate at the intersection of web development and cybersecurity, building robust applications and prioritizing their security from the ground up.</p>

                        <div className="my-5">
                            <h3 className="text-info mb-4 d-flex align-items-center justify-content-center"><FaCode className="me-2"/> Web Development</h3>
                            <div className="d-flex flex-wrap justify-content-center">
                                {skills.webDevelopment.map(skill => {
                                    const details = skillDetails[skill];
                                    const IconComponent = details ? details.icon : null;
                                    const iconColor = details ? details.color : '#fff';
                                    const textColor = ['#fff', '#FFFFFF', '#F7DF1E', '#ffc107', '#F9A03C', '#9932CC'].includes(iconColor)
                                        ? '#1a1a1a' : '#fff';
                                    return (
                                        <span
                                            key={skill}
                                            className="skill-badge d-flex align-items-center me-2 mb-2 p-2"
                                            style={{
                                                '--badge-bg': iconColor,
                                                '--badge-color': textColor,
                                                '--badge-shadow': `${iconColor}55`,
                                            }}
                                        >
                                            {IconComponent && <IconComponent className="me-2" style={{ color: textColor }} />}
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="my-5">
                            <h3 className="text-info mb-4 d-flex align-items-center justify-content-center"><FaShieldAlt className="me-2"/> Cybersecurity</h3>
                            <div className="d-flex flex-wrap justify-content-center">
                                {skills.cybersecurity.map(skill => {
                                    const details = skillDetails[skill];
                                    const IconComponent = details ? details.icon : null;
                                    const iconColor = details ? details.color : '#fff';
                                    const textColor = ['#fff', '#FFFFFF', '#F7DF1E', '#ffc107', '#F9A03C', '#9932CC'].includes(iconColor)
                                        ? '#1a1a1a' : '#fff';
                                    return (
                                        <span
                                            key={skill}
                                            className="skill-badge d-flex align-items-center me-2 mb-2 p-2"
                                            style={{
                                                '--badge-bg': iconColor,
                                                '--badge-color': textColor,
                                                '--badge-shadow': `${iconColor}55`,
                                            }}
                                        >
                                            {IconComponent && <IconComponent className="me-2" style={{ color: textColor }} />}
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="my-5">
                            <h3 className="text-info mb-4 d-flex align-items-center justify-content-center"><FaTools className="me-2"/> Tools & Platforms</h3>
                            <div className="d-flex flex-wrap justify-content-center">
                                {skills.tools.map(skill => {
                                    const details = skillDetails[skill];
                                    const IconComponent = details ? details.icon : null;
                                    const iconColor = details ? details.color : '#fff';
                                    const textColor = ['#fff', '#FFFFFF', '#F7DF1E', '#ffc107', '#F9A03C', '#9932CC'].includes(iconColor)
                                        ? '#1a1a1a' : '#fff';
                                    return (
                                        <span
                                            key={skill}
                                            className="skill-badge d-flex align-items-center me-2 mb-2 p-2"
                                            style={{
                                                '--badge-bg': iconColor,
                                                '--badge-color': textColor,
                                                '--badge-shadow': `${iconColor}55`,
                                            }}
                                        >
                                            {IconComponent && <IconComponent className="me-2" style={{ color: textColor }} />}
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </Container>
                </section>

                {/* CONTACT SECTION */}
                <section
                    id="contact"
                    className={`section-fade${visibleSections['contact'] ? ' visible' : ''}`}
                >
                    <Container className="text-center">
                        <Card className="text-white shadow-lg p-4 bg-dark contact-card border-0" style={{ background: "rgba(20,30,40,0.85)", borderRadius: "2rem" }}>
                            <Card.Body>
                                <h2 className="display-4 mb-3">Let's Connect</h2>
                                <p className="lead mb-4">
                                    My inbox is always open! Whether you have a question, want to collaborate, or just want to say hi, I'll try my best to get back to you!
                                </p>
                                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-4">
                                    <Button
                                        variant="info"
                                        size="lg"
                                        href="mailto:atharva.bhagubhai@gmail.com"
                                        className="d-flex align-items-center px-4 py-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontWeight: 600, fontSize: "1.15rem", borderRadius: "2rem" }}
                                    >
                                        <FaEnvelope className="me-2" /> Email Me
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        size="lg"
                                        href="https://www.linkedin.com/in/atharva-patil-243a40304/"
                                        className="d-flex align-items-center px-4 py-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontWeight: 600, fontSize: "1.15rem", borderRadius: "2rem", borderWidth: 2 }}
                                    >
                                        <FaLinkedin className="me-2" /> LinkedIn
                                    </Button>
                                    <Button
                                        variant="outline-light"
                                        size="lg"
                                        href="https://github.com/Bioflex"
                                        className="d-flex align-items-center px-4 py-2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontWeight: 600, fontSize: "1.15rem", borderRadius: "2rem", borderWidth: 2 }}
                                    >
                                        <FaGithub className="me-2" /> GitHub
                                    </Button>
                                </div>
                                <div className="text-white-50 mt-2" style={{ fontSize: "1rem" }}>
                                    <span>Or just drop a message on any platform above!</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Container>
                </section>

                {/* FOOTER */}
                <footer className="text-center py-4">
                    <Container>
                        <p>&copy; {new Date().getFullYear()} Atharva Patil. Built with React.</p>
                    </Container>
                </footer>
            </div>
        </main>
    );
}