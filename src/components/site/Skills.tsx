import React, { useState } from "react";
import { Globe, Database, Brain, Cpu, Code, Users } from "lucide-react";

interface SkillData {
  id: string;
  title: string;
  icon: any;
  skills: string[];
  description: string;
}

const skillsData: SkillData[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Globe,
    skills: [
      "React",
      "Next.js",
      "Astro",
      "Tailwind CSS",
      "TypeScript",
      "JavaScript",
    ],
    description: "Modern web development",
  },
  {
    id: "backend",
    title: "Backend",
    icon: Database,
    skills: [
      "Node.js",
      "Express",
      "ASP.NET Core",
      "Python",
      "Flask",
      "FastAPI",
      "PostgreSQL",
      "MySQL",
    ],
    description: "Server architecture",
  },
  {
    id: "ai",
    title: "AI/ML",
    icon: Brain,
    skills: [
      "TensorFlow",
      "PyTorch",
      "LangChain",
      "OpenAI API",
      "Computer Vision",
      "NLP",
    ],
    description: "Machine learning",
  },
  {
    id: "embedded",
    title: "Embedded",
    icon: Cpu,
    skills: ["Arduino", "Raspberry Pi", "IoT Protocols", "C++", "Embedded C"],
    description: "Hardware integration",
  },
  {
    id: "languages",
    title: "Languages",
    icon: Code,
    skills: ["JavaScript", "TypeScript", "Python", "C#", "Java", "C++", "Go"],
    description: "Programming languages",
  },
  {
    id: "tools",
    title: "Tools",
    icon: Users,
    skills: [
      "Git",
      "Docker",
      "VS Code",
      "Notion",
      "Figma",
      "Project Management",
    ],
    description: "Development workflow",
  },
];

// Floating Tags Design
const FloatingTagsDesign = () => {
  const allSkills = skillsData.flatMap((category) =>
    category.skills.map((skill) => ({
      name: skill,
      category: category.title,
      color: category.id,
    }))
  );

  const colorMap = {
    frontend: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    backend: "bg-green-100 text-green-800 hover:bg-green-200",
    ai: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    embedded: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    languages: "bg-red-100 text-red-800 hover:bg-red-200",
    tools: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  return (
    <div className="max-w-lg mx-auto p-4">

      <div className="flex flex-wrap gap-2 justify-center">
        {allSkills.map((skill, index) => (
          <span
            key={`${skill.category}-${skill.name}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-default transform hover:scale-105 ${
              colorMap[skill.color]
            }`}
            style={{
              animationDelay: `${index * 50}ms`,
              animation: `fadeInUp 0.6s ease-out forwards`,
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Minimal Grid Design
const MinimalGridDesign = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Skills</h2>
        <div className="w-12 h-0.5 bg-gray-900 mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {skillsData.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="group text-center"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: `slideIn 0.6s ease-out forwards`,
              }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {category.description}
              </p>
              <div className="space-y-1">
                {category.skills.slice(0, 4).map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className="text-xs text-gray-600 opacity-0"
                    style={{
                      animationDelay: `${index * 100 + skillIndex * 50}ms`,
                      animation: `fadeIn 0.4s ease-out forwards`,
                    }}
                  >
                    {skill}
                  </div>
                ))}
                {category.skills.length > 4 && (
                  <div className="text-xs text-gray-400">
                    +{category.skills.length - 4} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Horizontal Scroll Design
const HorizontalScrollDesign = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Expertise</h2>
        <p className="text-sm text-gray-500">Scroll to explore →</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {skillsData.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="flex-none w-64 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: `slideInRight 0.6s ease-out forwards`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-50 text-xs text-gray-700 rounded border hover:bg-gray-100 transition-colors duration-200"
                    style={{
                      animationDelay: `${index * 100 + skillIndex * 30}ms`,
                      animation: `popIn 0.4s ease-out forwards`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Main Component with Design Switcher
const SkillsShowcase = () => {
  const [currentDesign, setCurrentDesign] = useState(0);
  const designs = [
    { name: "Floating Tags", component: FloatingTagsDesign },
    { name: "Minimal Grid", component: MinimalGridDesign },
    { name: "Horizontal Scroll", component: HorizontalScrollDesign },
  ];

  const CurrentDesignComponent = designs[currentDesign].component;

  return (
    <div className=" py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-2 mb-6">
            {designs.map((design, index) => (
              <button
                key={design.name}
                onClick={() => setCurrentDesign(index)}
                className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${
                  currentDesign === index
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {design.name}
              </button>
            ))}
          </div>
        </div>

        <CurrentDesignComponent />
      </div>
    </div>
  );
};

export default SkillsShowcase;
