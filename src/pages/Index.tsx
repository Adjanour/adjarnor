import Navbar from "@/components/site/Navbar";
import BackgroundFX from "@/components/site/BackgroundFX";
import Section from "@/components/site/Section";
import AnimatedHero from "@/components/site/AnimatedHero";
import EnhancedProjectCard from "@/components/site/EnhancedProjectCard";
import WritingCard from "@/components/site/WritingCard";
import SkillCategory from "@/components/site/SkillCategory";
import AlternatingTimeline from "@/components/site/AlternatingTimeline";
import TimelineEvent from "@/components/site/TimelineEvent";
import Footer from "@/components/site/Footer";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Brain, Cpu, Globe, Users } from "lucide-react";
import FloatingContactBubbles from "@/components/site/floating_bubbles_react";
import OptimizedImage from "@/components/site/Image";
import ExpandableProjectsList from "@/components/site/ProjectList";

const Index = () => {

  return (
    <div className="min-h-screen bg-background text-foreground" id="home">
      <Navbar />
      <BackgroundFX />
      <main>
        {/* Animated Hero */}
        <AnimatedHero />

        {/* About */}
        <Section id="about" title="" description="">
          <div className="flex flex-col md:flex-row align-middle items-center justify-center gap-8 md:gap-12">
            {/* Left side: Text + Highlights */}
            <div className="flex-1 space-y-6">
              <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                Engineer and Pan-Africanist.
              </p>
              <div className="space-y-4 leading-relaxed">
                <p>
                  I'm Bernard Adjanour, a Computer Science and Engineering
                  student from Ghana with a deep passion for technology, systems
                  design, and leadership. I'm on a mission to place Africa at
                  the forefront of the global tech space — by building
                  high-impact tools, fostering collaboration, and inspiring the
                  next generation of African technologists.
                </p>
                <p>
                  My work spans software development, backend architecture,
                  embedded systems, AI integration, and community leadership. As
                  CTO at Orcta and Co-Lead of Google Developer Groups (UMaT), I
                  balance technical depth with strategic vision. I believe in
                  the power of mastery, deep work, and purposeful engineering.
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
                    <Badge key={fact} variant="secondary">
                      {fact}
                    </Badge>
                  ))}
                </div>
              </aside>
            </div>

            {/* Right side: Image */}
            <div className="flex-shrink-0 w-full md:w-80">
              <OptimizedImage
                src="/profile.webp"
                alt="Bernard Adjanour"
                placeholder="/placeholder.png"
                srcSet="/profile.webp 3x, /profile.webp 3x, /profile.webp 3x"
                sizes="(max-width: 320px) 100vw, 25vw"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </Section>

        {/* Projects */}
        <Section
          id="projects"
          title="Featured Projects"
          description="A selection of platforms and tools centered on impact, craft, and clarity."
        >
          <ExpandableProjectsList />
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
              skills={[
                "React",
                "Next.js",
                "Astro",
                "Tailwind CSS",
                "TypeScript",
                "JavaScript",
              ]}
              description="Modern web development with focus on performance and user experience"
            />

            <SkillCategory
              title="Backend & APIs"
              icon={Database}
              skills={[
                "Node.js",
                "Express",
                "ASP.NET Core",
                "Python",
                "Flask",
                "FastAPI",
                "PostgreSQL",
                "MySQL",
              ]}
              description="Scalable server-side architecture and database design"
            />

            <SkillCategory
              title="AI & Machine Learning"
              icon={Brain}
              skills={[
                "TensorFlow",
                "PyTorch",
                "LangChain",
                "OpenAI API",
                "Computer Vision",
                "NLP",
              ]}
              description="Intelligent systems and machine learning integration"
            />

            <SkillCategory
              title="Embedded Systems"
              icon={Cpu}
              skills={[
                "Arduino",
                "Raspberry Pi",
                "IoT Protocols",
                "C++",
                "Embedded C",
              ]}
              description="Hardware integration and Internet of Things development"
            />

            <SkillCategory
              title="Programming Languages"
              icon={Code}
              skills={[
                "JavaScript",
                "TypeScript",
                "Python",
                "C#",
                "Java",
                "C++",
                "Go",
              ]}
              description="Polyglot programming across different paradigms and domains"
            />

            <SkillCategory
              title="Leadership & Tools"
              icon={Users}
              skills={[
                "Git",
                "Docker",
                "VS Code",
                "Notion",
                "Figma",
                "Project Management",
                "Team Leadership",
              ]}
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
          description="Leadership and hands-on technical experience in startups, student communities, and non-profits."
        >
          <AlternatingTimeline>
            <TimelineEvent
              title="Chief Technology Officer"
              organization="Orcta"
              period="2024 - Present"
              location="Ghana"
              description="Lead technical strategy and architecture for Orcta, focusing on scalable and sustainable solutions to African challenges in dev tooling, blockchain, embedded software and hardware, robotics, and agri-tech. Oversee a cross-functional team, deliver MVPs, implement CI/CD pipelines, and integrate AI tools to optimize processes."
              isActive={true}
              isLeft={false}
            />

            <TimelineEvent
              title="Co-Lead"
              organization="Google Developer Groups (UMaT)"
              period="2024 - 2025"
              location="University of Mines and Technology"
              description="Co-lead a student developer community: organize study jams, hackathons, and tech talks. Grew membership by 300%, and mentor students in software engineering, AI, and project execution."
              isActive={true}
              isLeft={true}
            />

            <TimelineEvent
              title="Co-Founder & Technical Lead"
              organization="Salem Aid Foundation"
              period="2022 - Present"
              location="Ghana"
              description="Co-founded and lead tech and operational initiatives for a social impact organization. Implement governance structures, develop volunteer and project management systems, and deploy tech solutions to support community programs and resource distribution."
              isLeft={false}
              isActive={true}
            />
          </AlternatingTimeline>
        </Section>

        {/* Contact */}

        <FloatingContactBubbles />
      </main>
      <Footer />
    </div>
  );
};

export default Index;