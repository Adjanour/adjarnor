import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";

interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techs: string[];
  link?: string;
  linkLabel?: string;
  status?: "completed" | "in-progress" | "concept";
}

const projectsData: ProjectData[] = [
  {
    id: "metaboard",
    title: "MetaBoard",
    shortDescription:
      "Collaboration platform for university developer communities.",
    fullDescription:
      "Collaboration and event management platform for university developer communities, featuring event scheduling, member management, and resource sharing.",
    techs: ["Next.js", "Firebase", "Tailwind CSS", "TypeScript"],
    link: "#",
    linkLabel: "Explore Platform",
    status: "completed",
  },
  {
    id: "pos",
    title: "Personal Operating System",
    shortDescription:
      "Notion-based productivity system optimized for ADHD-style deep work.",
    fullDescription:
      "A comprehensive Notion-based productivity system optimized for ADHD-style deep work, featuring task management, goal tracking, and reflection workflows.",
    techs: ["Notion", "Systems Design", "Productivity"],
    link: "#",
    linkLabel: "Get Template",
    status: "completed",
  },
  {
    id: "smsx",
    title: "SMSX",
    shortDescription:
      "Comprehensive messaging application with bulk SMS capabilities.",
    fullDescription:
      "Comprehensive messaging application with bulk SMS capabilities, intelligent scheduling, automated reminders, and analytics dashboard.",
    techs: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
    link: "#",
    linkLabel: "View Project",
    status: "completed",
  },
  {
    id: "tasktribe",
    title: "Task Tribe",
    shortDescription:
      "Modern task management system with REST API architecture.",
    fullDescription:
      "Modern task management system featuring REST API architecture, real-time single-page application, and collaborative team workflows.",
    techs: ["Python", "Django", "React", "PostgreSQL"],
    link: "#",
    linkLabel: "View Demo",
    status: "completed",
  },
  {
    id: "telex",
    title: "TeleX",
    shortDescription:
      "Secure telephone directory system with cloud infrastructure.",
    fullDescription:
      "Secure telephone directory system with full CRUD operations, advanced search functionality, and Azure-hosted cloud database infrastructure.",
    techs: ["C#", ".NET Framework", "MSSQL", "Azure"],
    link: "#",
    linkLabel: "View Project",
    status: "completed",
  },
  {
    id: "component-library",
    title: "React Component Library",
    shortDescription: "Reusable UI component toolkit for rapid development.",
    fullDescription:
      "Comprehensive reusable UI component toolkit designed for rapid frontend development with TypeScript support and Storybook documentation.",
    techs: ["TypeScript", "React", "Storybook", "CSS Modules"],
    link: "#",
    linkLabel: "View Library",
    status: "in-progress",
  },
];

interface ExpandableProjectItemProps {
  project: ProjectData;
  isExpanded: boolean;
  onToggle: () => void;
}

const ExpandableProjectItem = ({
  project,
  isExpanded,
  onToggle,
}: ExpandableProjectItemProps) => {
  return (
    <div className="border dark:border-gray-700 border-gray-200 w-full dark:text-white rounded-sm h-fit p-2">
      <button
        onClick={onToggle}
        className="w-full h-fit flex items-center dark:text-white text-left"
      >
        <div className="w-20 sm:w-24 md:w-28 lg:w-48 flex-shrink-0">
          <p className="text-xs sm:text-sm text-gray-900 dark:text-white truncate">
            {project.title}
          </p>
        </div>
        <div className="flex-1 flex justify-between items-center gap-1 sm:gap-2 min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-white truncate">
            {project.shortDescription}
          </p>
          <ArrowRight
            className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-300 flex-shrink-0 transition-transform duration-200 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="px-2 pb-3 border-t border-gray-100 mt-1">
          <div className="pt-3 space-y-3">
            <p className="text-xs sm:text-sm text-gray-700 dark:text-white leading-relaxed">
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap gap-1">
              {project.techs.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs px-1.5 py-0.5"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors group"
              >
                {project.linkLabel}
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ExpandableProjectsList = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (projectId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="space-y-4">
        <div className="bg-gray-800 w-full max-w-4xl text-white px-4 py-2 rounded-md mb-4">
          <span className="text-sm font-medium">
            Projects • {projectsData.length}
          </span>
        </div>

        {projectsData.map((project) => (
          <ExpandableProjectItem
            key={project.id}
            project={project}
            isExpanded={expandedItems.has(project.id)}
            onToggle={() => toggleExpanded(project.id)}
          />
        ))}

        <div className="px-4 py-3 flex flex-row gap-3 items-center bg-gray-50 rounded-[5px] border border-gray-200">
          <span className="w-2 h-2 border border-gray-300 rounded-full"></span>
          <p className="text-sm text-gray-600 italic">
            Hover on components for project build progress
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpandableProjectsList;
