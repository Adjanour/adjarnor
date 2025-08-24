import Navbar from "@/components/site/Navbar";
import BackgroundFX from "@/components/site/BackgroundFX";
import Section from "@/components/site/Section";
import AnimatedHero from "@/components/site/AnimatedHero";
import EnhancedProjectCard from "@/components/site/EnhancedProjectCard";
import WritingCard from "@/components/site/WritingCard";
import SkillCategory from "@/components/site/SkillCategory";
import TimelineEvent from "@/components/site/TimelineEvent";
import Footer from "@/components/site/Footer";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Brain, Cpu, Globe, Users } from "lucide-react";

const Index = () => {

  return (
    <div className="min-h-screen bg-background text-foreground" id="home">
      <Navbar />
      <BackgroundFX />
      <main>
        {/* Animated Hero */}
        <AnimatedHero />

        {/* About */}
        <Section 
          id="about" 
          title="About Bernard" 
          description="Computer Science & Engineering student from Ghana — developer, aspiring CTO, and Pan-Africanist."
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
        </Section>

        {/* Projects */}
        <Section 
          id="projects" 
          title="Featured Projects" 
          description="A selection of platforms and tools centered on impact, craft, and clarity."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <EnhancedProjectCard
              title="MetaBoard (GDG UMaT)"
              description="Collaboration and event management platform for university developer communities, featuring event scheduling, member management, and resource sharing."
              techs={["Next.js", "Firebase", "Tailwind CSS", "TypeScript"]}
              link="#"
              linkLabel="Explore Platform"
              status="completed"
            />
            
            <EnhancedProjectCard
              title="Personal Operating System"
              description="A comprehensive Notion-based productivity system optimized for ADHD-style deep work, featuring task management, goal tracking, and reflection workflows."
              techs={["Notion", "Systems Design", "Productivity"]}
              link="#"
              linkLabel="Get Template"
              status="completed"
            />

            <EnhancedProjectCard
              title="SMSX"
              description="Comprehensive messaging application with bulk SMS capabilities, intelligent scheduling, automated reminders, and analytics dashboard."
              techs={["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"]}
              link="#"
              linkLabel="View Project"
              status="completed"
            />
            
            <EnhancedProjectCard
              title="Task Tribe"
              description="Modern task management system featuring REST API architecture, real-time single-page application, and collaborative team workflows."
              techs={["Python", "Django", "React", "PostgreSQL"]}
              link="#"
              linkLabel="View Demo"
              status="completed"
            />
            
            <EnhancedProjectCard
              title="TeleX"
              description="Secure telephone directory system with full CRUD operations, advanced search functionality, and Azure-hosted cloud database infrastructure."
              techs={["C#", ".NET Framework", "MSSQL", "Azure"]}
              link="#"
              linkLabel="View Project"
              status="completed"
            />
            
            <EnhancedProjectCard
              title="React Component Library"
              description="Comprehensive reusable UI component toolkit designed for rapid frontend development with TypeScript support and Storybook documentation."
              techs={["TypeScript", "React", "Storybook", "CSS Modules"]}
              link="#"
              linkLabel="View Library"
              status="in-progress"
            />
          </div>
        </Section>

        {/* Skills */}
        <Section 
          id="skills" 
          title="Skills & Tech Stack"
          description="A comprehensive overview of my technical expertise and tools"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SkillCategory
              title="Frontend Development"
              icon={Globe}
              skills={["React", "Next.js", "Astro", "Tailwind CSS", "TypeScript", "JavaScript"]}
              description="Modern web development with focus on performance and user experience"
            />
            
            <SkillCategory
              title="Backend & APIs"
              icon={Database}
              skills={["Node.js", "Express", "ASP.NET Core", "Python", "Flask", "FastAPI", "PostgreSQL", "MySQL"]}
              description="Scalable server-side architecture and database design"
            />
            
            <SkillCategory
              title="AI & Machine Learning"
              icon={Brain}
              skills={["TensorFlow", "PyTorch", "LangChain", "OpenAI API", "Computer Vision", "NLP"]}
              description="Intelligent systems and machine learning integration"
            />
            
            <SkillCategory
              title="Embedded Systems"
              icon={Cpu}
              skills={["Arduino", "Raspberry Pi", "IoT Protocols", "C++", "Embedded C"]}
              description="Hardware integration and Internet of Things development"
            />
            
            <SkillCategory
              title="Programming Languages"
              icon={Code}
              skills={["JavaScript", "TypeScript", "Python", "C#", "Java", "C++", "Go"]}
              description="Polyglot programming across different paradigms and domains"
            />
            
            <SkillCategory
              title="Leadership & Tools"
              icon={Users}
              skills={["Git", "Docker", "VS Code", "Notion", "Figma", "Project Management", "Team Leadership"]}
              description="Technical leadership and modern development workflows"
            />
          </div>
        </Section>

        {/* Writing */}
        <Section 
          id="writing" 
          title="Articles & Writing" 
          description="Perspectives on deep work, digital minimalism, and engineering for impact."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <WritingCard
              title="Arrays Were the Highlight of the Day"
              date="2024-12-15"
              excerpt="A deep dive into array data structures and their practical applications in solving complex programming challenges."
              href="https://sedate-nemophila-92c.notion.site/Arrays-Were-the-Highlight-of-the-Day-23f3c2801afd8020a110c10d013efbdf?source=copy_link"
              readTime="8 min read"
              tags={["Programming", "Data Structures", "Algorithms"]}
            />
            
            <WritingCard
              title="Beyond Mediocrity: The Power of Focused Reflection in Mastery"
              date="2024-11-20"
              excerpt="Exploring how deliberate reflection and deep work principles can accelerate the journey from competence to mastery in any field."
              href="https://sedate-nemophila-92c.notion.site/Beyond-Mediocrity-The-Power-of-Focused-Reflection-in-Mastery-2433c2801afd807da2eeebb79aa430a4?pvs=73"
              readTime="12 min read"
              tags={["Productivity", "Deep Work", "Mastery"]}
            />
            
            <WritingCard
              title="Autocomplete with Tries in Go: From Problem to Solution"
              date="2024-10-08"
              excerpt="Building an efficient autocomplete system using trie data structures in Go, with practical implementation details and performance considerations."
              href="https://sedate-nemophila-92c.notion.site/Autocomplete-with-Tries-in-Go-From-Problem-to-Solution-22f3c2801afd809a890fcf9de91e357a?pvs=141"
              readTime="15 min read"
              tags={["Go", "Data Structures", "System Design"]}
            />
            
            <WritingCard
              title="Deep Work for African Engineers"
              date="2024-09-12"
              excerpt="How African engineers can leverage deep work principles to build world-class technical skills and compete globally while staying rooted in local impact."
              href="#"
              readTime="10 min read"
              tags={["Career", "Africa", "Engineering", "Productivity"]}
            />
            
            <WritingCard
              title="Digital Minimalism in the Age of Overload"
              date="2024-08-25"
              excerpt="Practical strategies for maintaining focus and intentionality in our hyperconnected world, drawing from digital minimalism principles."
              href="#"
              readTime="7 min read"
              tags={["Digital Minimalism", "Focus", "Life Philosophy"]}
            />
          </div>
        </Section>

        {/* Experience Timeline */}
        <Section 
          id="experience" 
          title="Experience & Leadership"
          description="My journey in technology leadership and community building"
        >
          <div className="max-w-4xl">
            <TimelineEvent
              title="Chief Technology Officer"
              organization="Orcta"
              period="2024 - Present"
              location="Ghana"
              description="Leading technical strategy and product development for a fintech startup focused on democratizing financial services across Africa. Responsible for architecture decisions, team leadership, and scaling engineering processes."
              isActive={true}
            />
            
            <TimelineEvent
              title="Co-Lead"
              organization="Google Developer Groups (UMaT)"
              period="2023 - Present"
              location="University of Mines and Technology"
              description="Co-leading a vibrant community of student developers, organizing workshops, hackathons, and tech talks. Successfully grew membership by 300% and established partnerships with local tech companies."
              isActive={true}
            />
            
            <TimelineEvent
              title="Chief Information Officer"
              organization="Cbreeve Foundation"
              period="2023 - Present"
              location="Ghana"
              description="Spearheading digital transformation initiatives for a non-profit organization, implementing modern IT infrastructure, and developing custom solutions for program management and impact tracking."
            />
            
            <TimelineEvent
              title="Software Engineer Volunteer"
              organization="University IT Unit"
              period="2022 - 2024"
              location="University of Mines and Technology"
              description="Contributed to university infrastructure projects, developed student management systems, and provided technical support for academic departments."
            />
          </div>
        </Section>

        {/* Contact */}
        <Section 
          id="contact" 
          title="Let's Connect" 
          description="Open to collaborations, mentorship, and building for Africa's future."
        >
          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:adjanour@icloud.com"><Button variant="hero">Email Bernard</Button></a>
            <a href="https://github.com/Adjanour" target="_blank" rel="noreferrer"><Button variant="secondary">GitHub</Button></a>
            <a href="https://linkedin.com/in/kirk-katamanso" target="_blank" rel="noreferrer"><Button variant="secondary">LinkedIn</Button></a>
            <a href="https://twitter.com/kirk_katamanso" target="_blank" rel="noreferrer"><Button variant="secondary">Twitter/X</Button></a>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;