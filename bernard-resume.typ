#import "@preview/basic-resume:0.2.8": *

#let name = "Bernard Kirk Adjarnor Katamanso"
#let location = "Accra, Ghana"
#let email = "adjanour@icloud.com"
#let github = "github.com/Adjanour"
#let linkedin = "linkedin.com/in/kirk-katamanso"
#let personal-site = "adjarnor.dev"

#show: resume.with(
  author: name,
  location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  personal-site: personal-site,
  accent-color: "#26428b",
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
)

== Education
#edu(
  institution: "University of Mines and Technology (UMaT)",
  location: "Tarkwa, Ghana",
  dates: "Jan 2023 -- Sep 2026",
  degree: "B.Sc. Computer Science and Engineering",
)
- Current CWA: 88+ | Expected First Class Honours
- Coursework: Data Structures & Algorithms, Linear Algebra & Calculus, Cybersecurity, Data Science, HCI
- Research Interests: Systems Design, Automation, Computational Efficiency

== Experience
#work(
  title: "Tech Lead",
  company: "Orcta",
  location: "Remote / Ghana",
  dates: "Feb 2024 -- Present",
)
- Lead architecture and backend for Orcta Go, a logistics platform serving Ghana
- Manage 4 engineers; established documentation standards that cut onboarding time
- Drive technical decisions balancing reliability, cost, and shipping velocity

#work(
  title: "Software Engineer (Volunteer)",
  company: "Cbreeve Foundation",
  location: "Remote",
  dates: "Nov 2024 -- Present",
)
- Built internal tools for reporting and transparency — roughly 30% efficiency gain on operational workflows

#work(
  title: "Software Engineering Intern",
  company: "University IT Unit, UMaT",
  location: "Tarkwa, Ghana",
  dates: "Jun 2023 -- Sep 2023",
)
- Maintained backend systems and optimized database workflows for student-facing services

== Projects
#project(
  name: "mNotify TypeScript SDK",
  role: "Open Source Developer",
)
- Published type-safe SDK for mNotify's Bulk Messaging API. Available on npm.

#project(
  name: "React Components Library",
  role: "Frontend Engineer",
)
- Designed and published reusable UI components for scalable application development

#project(
  name: "Programming Playground",
  role: "Systems Engineer",
)
- Built HTTP servers and JSON parsers from scratch to deepen understanding of network protocols and language fundamentals

== Leadership & Community
#extracurriculars(
  activity: "Co-Lead, Google Developer Groups (GDG) UMaT",
)
- Organized sessions on cloud infrastructure, AI, and backend systems reaching 100+ students

#extracurriculars(
  activity: "Panel Member, ACSES Vetting Committee",
)
- Evaluated executive candidates on communication, reasoning, and technical competence

#extracurriculars(
  activity: "Core Member, Salem Aid Foundation",
)
- Co-authored governance and transparency frameworks for community education projects

== Skills
- *Languages:* Python, C#, TypeScript, JavaScript, Go, Java, SQL, Bash
- *Frameworks & Tools:* .NET, Node.js, React, PostgreSQL, Supabase, Firebase, Docker, Git, Jupyter Lab
- *Focus Areas:* Systems Design, APIs, Database Architecture, Infrastructure, Developer Tooling

== Publications
#project(
  name: "Compilers Griot (Substack)",
  role: "Writer",
)
- Essays connecting computing, philosophy, and Africa's digital future. Published at adjarnor.dev.
