import Navbar from "@/components/site/Navbar";
import BackgroundFX from "@/components/site/BackgroundFX";
import Section from "@/components/site/Section";
import ProjectCard from "@/components/site/ProjectCard";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground" id="home">
      <Navbar />
      <BackgroundFX />
      <main>
        {/* Hero */}
        <section className="relative pt-28 md:pt-32">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="max-w-3xl motion-safe:animate-enter">
              <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                Building Africa’s Future, One Line of Code at a Time
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Computer Scientist • Engineering Craftsman • Pan-African Visionary
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects"><Button variant="hero" className="h-11 px-6">View My Work</Button></a>
                <a href="#contact"><Button variant="outline" className="h-11 px-6">Let's Connect</Button></a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="About Bernard" description="Computer Science & Engineering student from Ghana — developer, aspiring CTO, and Pan-Africanist.">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-4 leading-relaxed">
              <p>
                I’m Bernard Adjanour, a Computer Science and Engineering student from Ghana with a deep passion for technology, systems design, and leadership. I’m on a mission to place Africa at the forefront of the global tech space — by building high-impact tools, fostering collaboration, and inspiring the next generation of African technologists.
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
        </Section>

        {/* Projects */}
        <Section id="projects" title="Featured Projects" description="A selection of platforms and tools centered on impact, craft, and clarity.">
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectCard
              title="AgriHive (Orcta)"
              description="AI-powered agricultural platform to empower farmers."
              techs={["React", "Node.js", "Python", "AI/ML", "MongoDB"]}
              link="#"
              linkLabel="Case study"
            />
            <ProjectCard
              title="MetaBoard (GDG UMaT)"
              description="Collaboration and event management platform."
              techs={["Next.js", "Firebase", "Tailwind CSS"]}
              link="#"
              linkLabel="Explore"
            />
            <ProjectCard
              title="Industrial Companion App"
              description="Workflow tracking mobile app for industrial engineers."
              techs={["Flutter", "Supabase"]}
              link="#"
              linkLabel="Preview"
            />
            <ProjectCard
              title="Personal Operating System"
              description="A Notion-based productivity system optimized for ADHD-style deep work."
              techs={["Notion", "Systems Design"]}
              link="#"
              linkLabel="Template"
            />
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills & Tech Stack">
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
        </Section>

        {/* Writing */}
        <Section id="writing" title="Articles & Writing" description="Perspectives on deep work, digital minimalism, and engineering for impact.">
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              { t: "Deep Work for African Engineers", href: "#" },
              { t: "Digital Minimalism in the Age of Overload", href: "#" },
              { t: "Engineering for Pan-African Impact", href: "#" },
              { t: "My Journey from Student to CTO", href: "#" },
            ].map((a) => (
              <li key={a.t}>
                <a href={a.href} className="story-link text-lg">{a.t}</a>
              </li>
            ))}
          </ul>
        </Section>

        {/* Speaking & Leadership */}
        <Section id="speaking" title="Speaking & Leadership">
          <div className="grid gap-6 md:grid-cols-2">
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
        </Section>

        {/* Contact */}
        <Section id="contact" title="Let’s Connect" description="Open to collaborations, mentorship, and building for Africa’s future.">
          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:bernardadjanour@gmail.com"><Button variant="hero">Email Bernard</Button></a>
            <a href="https://github.com/Adjanour" target="_blank" rel="noreferrer"><Button variant="secondary">GitHub</Button></a>
            <a href="https://linkedin.com/in/bernardadjanour" target="_blank" rel="noreferrer"><Button variant="secondary">LinkedIn</Button></a>
            <a href="https://twitter.com/bernardadjanour" target="_blank" rel="noreferrer"><Button variant="secondary">Twitter/X</Button></a>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
