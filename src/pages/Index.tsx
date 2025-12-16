import Navbar from "@/components/site/Navbar";
import BackgroundFX from "@/components/site/BackgroundFX";
import Section from "@/components/site/Section";
import WritingCard from "@/components/site/WritingCard";
import Footer from "@/components/site/Footer";
import Experience from "@/components/site/Experience";

import { Badge } from "@/components/ui/badge";
import FloatingContactBubbles from "@/components/site/floating_bubbles_react";
import OptimizedImage from "@/components/site/Image";
import ExpandableProjectsList from "@/components/site/ProjectList";
import SkillsShowcase from "@/components/site/Skills";
import { getLatestArticles } from "@/data/articles";
import { Link } from "react-router-dom";

const Index = () => {
  const latestArticles = getLatestArticles(4);

  return (
    <div
      className="min-h-screen bg-background text-foreground font-sans"
      id="home"
    >
      <Navbar />
      <BackgroundFX />
      <main className="max-w-6xl mx-auto px-6 py-6 font-sans">
        {/* Animated Hero */}
        {/*<AnimatedHero />*/}

        {/* About */}
        <Section id="about" title="" description="">
          <div className="flex flex-col md:flex-row  gap-8 md:gap-12">
            {/* Left side: Text + Highlights */}
            <div className="flex-1 flex flex-col space-y-6 mt-4">
              <p className="max-w-2xl text-2xl text-muted-foreground">
                Engineer & Pan-Africanist 🇬🇭
              </p>
              <div className="space-y-4 mt-3 leading-relaxed">
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
                  Every problem is a chance to innovate, learn, and craft better
                  solutions. I’m passionate about leveraging technology to create
                  meaningful impact across Africa and beyond.
                </p>
              </div>

              <aside className="space-y-3 mt-8">
                <h3 className="font-medium">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Teach Lead, Orcta",
                    "Software Engineer",
                    "Democratize tech access",
                    "Craft scalable systems",
                    "Deep work",
                    "Pan-Africanism",
                    "Kindness"
                  ].map((fact) => (
                    <Badge
                      key={fact}
                      variant="outline"
                      className="py-2 px-3"
                    >
                      {fact}
                    </Badge>
                  ))}
                </div>
              </aside>
            </div>

            {/* Right side: Image */}
            <div className="shrink-0 w-full md:w-80">
              <OptimizedImage
                src="/profile-3.png"
                alt="Bernard Adjanour"
                placeholder="/placeholder.svg"
                srcSet="/profile-3.png 3x, /profile-3.png 3x, /profile-3.png 3x"
                sizes="(max-width: 320px) 100vw, 25vw"
                className="w-full h-auto rounded-[4px]"
              />
            </div>
          </div>
        </Section>

        {/* Projects */}
        <Section
          id="projects"
          title=""
          description=""
        >
          <ExpandableProjectsList />
        </Section>

        {/* Skills */}

        {/* <SkillsShowcase /> */}

        {/* Writing */}
        <Section id="writing" title="" description="">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-medium tracking-tight">Writing</h2>
            <Link
              to="/writing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              See all →
            </Link>
          </div>
          <div>
            {latestArticles.map((article) => (
              <WritingCard
                key={article.href}
                title={article.title}
                date={article.date}
                excerpt={article.excerpt}
                href={article.href}
                readTime={article.readTime}
              />
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Experience />
        {/* Contact */}
        {/* <FloatingContactBubbles /> */}

        {/* Substack */}
        <Section
          id="substack"
          title=""
          description=""
        >
          <div className="p-6 hidden rounded-2xl bg-black/2 dark:text-white backdrop-blur-lg border border-white/10 max-w-3xl mx-auto my-12 text-center  flex-row flex-wrap items-center justify-center gap-8">
            {/* Regular post */}
            {/* <a href="https://open.substack.com/pub/bernardkirkadjanorkatamanso/p/beyond-mediocrity?r=2v0pwu&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true">
              <OptimizedImage
                src="/substack.jpg"
                alt="Cover image for 'Beyond Mediocrity' Substack post"
                className="w-32 h-32 rounded-lg shadow-lg/5 transition-transform duration-200 hover:scale-105"
                srcSet="/substack.jpg 3x, /substack.jpg 2x, /substack.jpg 1x"
                placeholder="Blurred image of a person working on a laptop"
              />
            </a> */}

            {/* Featured post: 'The Silent Teacher' */}
            {/* <a href="https://open.substack.com/pub/bernardkirkadjanorkatamanso/p/the-silent-teacher?r=2v0pwu&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true">
              <OptimizedImage
                src="/substack-growth.jpg"
                alt="Cover image for 'The Silent Teacher' Substack post"
                className="w-36 h-36 rounded-lg shadow-xl/10 border-2 border-white/20 transition-transform duration-200 hover:scale-105"
                srcSet="/substack-growth.jpg 3x, /substack-growth.jpg 2x, /substack-growth.jpg 1x"
                placeholder="Blurred image of a person working on a laptop"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-[rgba(255,215,0,0.05)] to-[rgba(128,128,128,0.05)] pointer-events-none"></div>
            </a> */}
          </div>

          {/* <div className="text-center mb-8 max-w-2xl mx-auto text-lg text-muted-foreground">
            <a
              href="https://bernardkirkadjanorkatamanso.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium"
              aria-label="Read and subscribe to Bernard's Substack"
            >
              Read & Subscribe
            </a>
          </div> */}
        </Section >
      </main >
      <Footer />
    </div >
  );
};

export default Index;
