import Navbar from "@/components/site/Navbar";
import BackgroundFX from "@/components/site/BackgroundFX";
import AnimatedSection from "@/components/site/AnimatedSection";
import AnimatedHero from "@/components/site/AnimatedHero";
import ProjectCard from "@/components/site/ProjectCard";
import Footer from "@/components/site/Footer";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <div className="min-h-screen bg-background text-foreground" id="home">
      <Navbar />
      <BackgroundFX />
      <main>
        {/* Animated Hero */}
        <AnimatedHero />

        {/* About */}
        <AnimatedSection 
          id="about" 
          title="About Bernard" 
          description="Computer Science & Engineering student from Ghana — developer, aspiring CTO, and Pan-Africanist."
          animationType="fadeUp"
        >
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4 leading-relaxed">
              <p>
                I'm Bernard Adjanour, a Computer Science and Engineering student from Ghana with a deep passion for technology, systems design, and leadership. I'm on a mission to place Africa at the forefront of the global tech space — by building high-impact tools, fostering collaboration, and inspiring the next generation of African technologists.
              </p>
              <p>
                My work spans software development, backend architecture, embedded systems, AI integration, and community leadership. As CTO at Orcta and Co-Lead of Google Developer Groups (UMaT), I balance technical depth with strategic vision. I believe in the power of mastery, deep work, and purposeful engineering.
              </p>
            </div>
            <aside className="space-y-3">
              <h3 className="font-medium">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "CTO at Orcta",
                  "Co-Lead GDG UMaT",
                  "Software Engineer Volunteer",
                  "Mission: Democratize tech access",
                  "Core values: Craft, Deep Work, Kindness, Purpose, Pan-Africanism",
                ].map((fact) => (
                  <Badge key={fact} variant="secondary">{fact}</Badge>
                ))}
              </div>
            </aside>
          </div>
        </AnimatedSection>

        {/* Projects */}
        <AnimatedSection 
          id="projects" 
          title="Featured Projects" 
          description="A selection of platforms and tools centered on impact, craft, and clarity."
          animationType="staggerCards"
        >
          <div className="grid gap-6 md:grid-cols-2">

    <ProjectCard
      title="MetaBoard (GDG UMaT)"
      description="Collaboration and event management platform."
      techs={["Next.js", "Firebase", "Tailwind CSS"]}
      link="#"
      linkLabel="Explore"
    />
            
    <ProjectCard
      title="Personal Operating System"
      description="A Notion-based productivity system optimized for ADHD-style deep work."
      techs={["Notion", "Systems Design"]}
      link="#"
      linkLabel="Template"
    />

    {/* Newly added projects */}
    <ProjectCard
      title="SMSX"
      description="Messaging app with bulk SMS, scheduling, and reminders."
      techs={["Laravel", "PHP", "MySQL", "JavaScript"]}
      link="#"
      linkLabel="View"
    />
    <ProjectCard
      title="Task Tribe"
      description="Task management system with REST API and real-time SPA."
      techs={["Python", "Django", "React"]}
      link="#"
      linkLabel="View"
    />
    <ProjectCard
      title="TeleX"
      description="Secure telephone directory with CRUD operations and Azure-hosted database."
      techs={["C#", ".NET Framework", "MSSQL"]}
      link="#"
      linkLabel="View"
    />
    <ProjectCard
      title="React Components"
      description="Reusable UI component toolkit for faster frontend development."
      techs={["TypeScript", "React"]}
      link="#"
      linkLabel="View"
    />

          </div>
        </AnimatedSection>

        {/* Skills */}
        <AnimatedSection 
          id="skills" 
          title="Skills & Tech Stack"
          animationType="fadeUp"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-3 font-medium">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "Astro", "Tailwind CSS"].map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-medium">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express", "ASP.NET Core", "Python (Flask, FastAPI)"].map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-medium">AI/ML</h3>
              <div className="flex flex-wrap gap-2">
                {["TensorFlow", "PyTorch", "LangChain", "OpenAI API"].map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-medium">Embedded Systems</h3>
              <div className="flex flex-wrap gap-2">
                {["Arduino", "Raspberry Pi", "IoT Protocols"].map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-medium">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "TypeScript", "Python", "C#", "Java", "C++"].map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-medium">Tools & Leadership</h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "Docker", "VS Code", "Notion", "Figma", "Project Management", "CTO Strategy", "Technical Mentoring"].map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Writing */}
        <AnimatedSection 
          id="writing" 
          title="Articles & Writing" 
          description="Perspectives on deep work, digital minimalism, and engineering for impact."
          animationType="fadeUp"
        >
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              { t: "Deep Work for African Engineers", href: "#" },
              { t: "Digital Minimalism in the Age of Overload", href: "#" },
              { t: "Arrays Were the Highlight of the Day", href: "https://sedate-nemophila-92c.notion.site/Arrays-Were-the-Highlight-of-the-Day-23f3c2801afd8020a110c10d013efbdf?source=copy_link" },
              { t: "Beyond Mediocrity: The Power of Focused Reflection in Mastery", href: "https://sedate-nemophila-92c.notion.site/Beyond-Mediocrity-The-Power-of-Focused-Reflection-in-Mastery-2433c2801afd807da2eeebb79aa430a4?pvs=73" },
              { t: "Autocomplete with Tries in Go: From Problem to Solution", href: "https://sedate-nemophila-92c.notion.site/Autocomplete-with-Tries-in-Go-From-Problem-to-Solution-22f3c2801afd809a890fcf9de91e357a?pvs=141" },
            ].map((a) => (
              <li key={a.t}>
                <a href={a.href} target={a.href.startsWith('#') ? undefined : "_blank"} rel={a.href.startsWith('#') ? undefined : "noreferrer"} className="story-link text-lg">{a.t}</a>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        {/* Speaking & Leadership */}
        <AnimatedSection 
          id="speaking" 
          title="Speaking & Leadership"
          animationType="fadeUp"
        >
          <div className="relative overflow-hidden rounded-xl border bg-secondary/40 p-6 md:p-8">
            <div className="absolute inset-0 bg-triangles opacity-[0.08]" aria-hidden />
            <div className="relative grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium">Co-Lead, Google Developer Groups (UMaT)</h3>
                <p className="text-muted-foreground">Workshops and hackathons</p>
              </div>
              <div>
                <h3 className="font-medium">Chief Information Officer, Cbreeve Foundation</h3>
                <p className="text-muted-foreground">Digital transformation leadership</p>
              </div>
              <div>
                <h3 className="font-medium">Contributor, University IT Unit</h3>
                <p className="text-muted-foreground">Infrastructure and student systems</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection 
          id="contact" 
          title="Let's Connect" 
          description="Open to collaborations, mentorship, and building for Africa's future."
          animationType="fadeUp"
        >
          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:adjanour@icloud.com"><Button variant="hero">Email Bernard</Button></a>
            <a href="https://github.com/Adjanour" target="_blank" rel="noreferrer"><Button variant="secondary">GitHub</Button></a>
            <a href="https://linkedin.com/in/kirk-katamanso" target="_blank" rel="noreferrer"><Button variant="secondary">LinkedIn</Button></a>
            <a href="https://twitter.com/kirk_katamanso" target="_blank" rel="noreferrer"><Button variant="secondary">Twitter/X</Button></a>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;