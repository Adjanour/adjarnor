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
import {
  Code,
  Database,
  Brain,
  Cpu,
  Globe,
  Users,
  Signature,
} from "lucide-react";
import FloatingContactBubbles from "@/components/site/floating_bubbles_react";
import OptimizedImage from "@/components/site/Image";
import ExpandableProjectsList from "@/components/site/ProjectList";
import SkillsShowcase from "@/components/site/Skills";
import SignatureWall from "@/components/site/SignatureWall";
import { Sub } from "@radix-ui/react-context-menu";

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
                Engineer & Pan-Africanist 🇬🇭
              </p>
              <div className="space-y-4 leading-relaxed">
                <p>
                  I build purposeful systems and tools that solve real problems.
                  I focus on mastery, deep work, and creating high-impact
                  solutions that put Africa at the forefront of global tech.
                </p>
                {/* <p className="text-[0.9rem] font-thin font-display italic tracking-wide">
                  Systems design • Backend architecture • Embedded systems • AI
                  integration
                </p> */}
                <p>
                  Every project is a chance to innovate, learn, and inspire the
                  next generation of African technologists.
                </p>
              </div>

              <aside className="space-y-3">
                <h3 className="font-medium">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Teach Lead, Orcta",
                    "Software Engineer",
                    "Mission: Democratize tech access",
                    "Core values: Craft, Deep Work, Kindness, Purpose, Pan-Africanism",
                  ].map((fact) => (
                    <Badge
                      key={fact}
                      variant="secondary"
                      className="py-2 px-3 bg-white border-black/10 dark:bg-black/15   dark:text-white dark:border-white/20"
                    >
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
                placeholder="/placeholder.svg"
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
          <SkillsShowcase />
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
              readTime="25 min read"
              tags={["Programming", "Data Structures", "Algorithms"]}
            />

            <WritingCard
              title="Beyond Mediocrity: The Power of Focused Reflection in Mastery"
              date="2024-11-20"
              excerpt="Exploring how deliberate reflection and deep work principles can accelerate the journey from competence to mastery in any field."
              href="https://sedate-nemophila-92c.notion.site/Beyond-Mediocrity-The-Power-of-Focused-Reflection-in-Mastery-2433c2801afd807da2eeebb79aa430a4?pvs=73"
              readTime="5 min read"
              tags={["Productivity", "Deep Work", "Mastery"]}
            />

            <WritingCard
              title="Autocomplete with Tries in Go: From Problem to Solution"
              date="2024-10-08"
              excerpt="Building an efficient autocomplete system using trie data structures in Go, with practical implementation details and performance considerations."
              href="https://sedate-nemophila-92c.notion.site/Autocomplete-with-Tries-in-Go-From-Problem-to-Solution-22f3c2801afd809a890fcf9de91e357a?pvs=141"
              readTime="25 min read"
              tags={["Go", "Data Structures", "System Design"]}
            />

            {/* <WritingCard
              title="Deep Work for African Engineers"
              date="2024-09-12"
              excerpt="How African engineers can leverage deep work principles to build world-class technical skills and compete globally while staying rooted in local impact."
              href="#"
              readTime="10 min read"
              tags={["Career", "Africa", "Engineering", "Productivity"]}
            /> */}
            
            <WritingCard
              title="The Silent Teacher: Struggle, Patience, and Small Beginnings"
              date="2025-08-27"
              excerpt="Growth isn’t glamorous. It happens in struggle, through patience, small tasks done well, and the humility to ask for help. Learn how to embrace the silent teacher guiding every step of your progress."
              href="https://open.substack.com/pub/bernardkirkadjanorkatamanso/p/the-silent-teacher?r=2v0pwu&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true"
              readTime="5 min read"
              tags={["Growth", "Learning", "Discipline", "Mindset"]}
            />

            {/* <WritingCard
              title="Digital Minimalism in the Age of Overload"
              date="2024-08-25"
              excerpt="Practical strategies for maintaining focus and intentionality in our hyperconnected world, drawing from digital minimalism principles."
              href="#"
              readTime="7 min read"
              tags={["Digital Minimalism", "Focus", "Life Philosophy"]}
            /> */}
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
              description="Lead technical strategy and architecture for Orcta"
              isActive={true}
              isLeft={false}
            />

            <TimelineEvent
              title="Co-Lead"
              organization="Google Developer Groups (UMaT)"
              period="2024 - 2025"
              location="University of Mines and Technology"
              description="Co-lead a student developer community"
              isActive={true}
              isLeft={true}
            />

            <TimelineEvent
              title="Co-Founder & Technical Lead"
              organization="Salem Aid Foundation"
              period="2022 - Present"
              location="Ghana"
              description="Co-founded and lead tech and operational initiatives for a social impact organization."
              isLeft={false}
              isActive={true}
            />
          </AlternatingTimeline>
        </Section>

        {/* Contact */}

        <FloatingContactBubbles />
        {/* <SignatureWall /> */}
        <Section
          id="substack"
          title="From my Substack"
          description="I share thoughts on technology, engineering, and Pan-African innovation."
        >
          <div className="p-6 rounded-2xl bg-black/2 dark:text-white backdrop-blur-lg border border-white/10 max-w-3xl mx-auto my-12 text-center flex flex-row flex-wrap items-center justify-center gap-8">
            {/* Regular post */}
            <a href="https://open.substack.com/pub/bernardkirkadjanorkatamanso/p/beyond-mediocrity?r=2v0pwu&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true">
              <OptimizedImage
                src="/substack.jpg"
                alt="Cover image for 'Beyond Mediocrity' Substack post"
                className="w-32 h-32 rounded-lg shadow-lg/5 transition-transform duration-200 hover:scale-105"
                srcSet="/substack.jpg 3x, /substack.jpg 2x, /substack.jpg 1x"
                placeholder="Blurred image of a person working on a laptop"
              />
            </a>

            {/* Featured post: 'The Silent Teacher' */}
            <a href="https://open.substack.com/pub/bernardkirkadjanorkatamanso/p/the-silent-teacher?r=2v0pwu&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true">
              <OptimizedImage
                src="/substack-growth.jpg"
                alt="Cover image for 'The Silent Teacher' Substack post"
                className="w-36 h-36 rounded-lg shadow-xl/10 border-2 border-white/20 transition-transform duration-200 hover:scale-105"
                srcSet="/substack-growth.jpg 3x, /substack-growth.jpg 2x, /substack-growth.jpg 1x"
                placeholder="Blurred image of a person working on a laptop"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-[rgba(255,215,0,0.05)] to-[rgba(128,128,128,0.05)] pointer-events-none"></div>
            </a>
          </div>

          <div className="text-center mb-8 max-w-2xl mx-auto text-lg text-muted-foreground">
            <a
              href="https://bernardkirkadjanorkatamanso.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium"
              aria-label="Read and subscribe to Bernard's Substack"
            >
              Read & Subscribe
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
