import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techs: string[];
  github?: string;
  live?: string;
  status: "completed" | "in-progress" | "concept";
  featured?: boolean;
}

const projectsData: ProjectData[] = [
  {
    id: "mnotify-sdk",
    title: "mNotify TS SDK",
    shortDescription: "TypeScript SDK for mNotify messaging APIs.",
    fullDescription:
      "Type-safe TypeScript SDK for mNotify's Bulk Messaging Solution API. Features SMS sending, contact management, templates, and webhook validation with automatic retries.",
    techs: ["TypeScript", "Node.js", "API Design"],
    github: "https://github.com/Adjanour/mnotify-ts-sdk",
    status: "completed",
    featured: true,
  },
  {
    id: "gitmate",
    title: "GitMate",
    shortDescription: "Interactive CLI for clean Git workflows.",
    fullDescription:
      "A friendly Git workflow companion built with Go and Bubble Tea. Teaches and automates rebasing, squashing, and branch prep through an interactive terminal UI.",
    techs: ["Go", "Bubble Tea", "CLI"],
    github: "https://github.com/Orctatech-Engineering-Team/GitMate",
    status: "in-progress",
    featured: true,
  },
  {
    id: "valkey-collab",
    title: "Valkey Collab",
    shortDescription: "Real-time collaborative whiteboard.",
    fullDescription:
      "Real-time collaborative whiteboard application built with FastAPI, Vue.js, and Valkey. WebSocket-based synchronization with persistent storage.",
    techs: ["Python", "FastAPI", "Vue.js", "Valkey"],
    github: "https://github.com/Orctatech-Engineering-Team/valkey-collab-demo",
    status: "completed",
    featured: true,
  },
  {
    id: "search-utils",
    title: "SearchUtils",
    shortDescription: "Lightweight search utility library.",
    fullDescription:
      "JavaScript utility library for efficient search implementations. Provides indexing, caching, filtering, and debouncing for responsive search experiences.",
    techs: ["JavaScript", "npm"],
    github: "https://github.com/Adjanour/search-utils",
    status: "completed",
  },
  {
    id: "react-components",
    title: "React Components",
    shortDescription: "Feature-rich reusable React components.",
    fullDescription:
      "Collection of feature-rich React components including accordion with search, navigation utilities, and other reusable UI patterns.",
    techs: ["React", "TypeScript", "JavaScript"],
    github: "https://github.com/Adjanour/ReactComponents",
    status: "completed",
  },
  {
    id: "devmind",
    title: "DevMind",
    shortDescription: "Intelligent notes for developers.",
    fullDescription:
      "Empowering developers with intelligent notes, smart insights, and seamless organization. Built for the modern developer workflow.",
    techs: ["TypeScript", "React"],
    github: "https://github.com/Adjanour/DevMind",
    status: "in-progress",
  },
  {
    id: "vesper",
    title: "Vesper",
    shortDescription: "Time blocking for deep work.",
    fullDescription:
      "A time blocking application designed to help structure your day, maintain focus, and achieve deep work states.",
    techs: ["Go"],
    github: "https://github.com/Adjanour/vesper",
    status: "in-progress",
  },
  {
    id: "smsx",
    title: "SMSX",
    shortDescription: "Bulk SMS platform with scheduling.",
    fullDescription:
      "Comprehensive messaging application with bulk SMS capabilities, intelligent scheduling, automated reminders, and analytics dashboard.",
    techs: ["TypeScript", "Node.js", "React", "Hono", "Drizzle ORM"],
    github: "https://github.com/Africoda/smsx",
    status: "completed",
  },
  {
    id: "text-editor",
    title: "Text Editor",
    shortDescription: "Desktop text editor in Java.",
    fullDescription:
      "A desktop text editor application built with Java and Maven, featuring core text editing functionality.",
    techs: ["Java", "Maven"],
    github: "https://github.com/Adjanour/TextEditor",
    status: "completed",
  },
];

interface ExpandableProjectItemProps {
  project: ProjectData;
  isExpanded: boolean;
  onToggle: () => void;
}

const statusConfig = {
  completed: {
    label: "Shipped",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  "in-progress": {
    label: "Building",
    className: "bg-accent/10 text-accent border-accent/20",
  },
  concept: {
    label: "Concept",
    className: "bg-muted text-muted-foreground border-border",
  },
};

const ExpandableProjectItem = ({
  project,
  isExpanded,
  onToggle,
}: ExpandableProjectItemProps) => {
  const status = statusConfig[project.status];

  return (
    <div
      className={`group border rounded-md transition-colors duration-200 overflow-hidden `}
    >
      <button
        onClick={onToggle}
        className="w-full p-3 sm:p-4 flex items-center gap-3 sm:gap-4 text-left"
      >
        {/* Project Title */}
        <div className="w-28 sm:w-36 shrink-0">
          <span className={`text-sm font-medium truncate ${project.featured ? "text-foreground" : "text-foreground/90"}`}>
            {project.title}
          </span>
        </div>

        {/* Description */}
        <div className="flex-1 min-w-0 hidden sm:block">
          <p className="text-sm text-muted-foreground truncate">
            {project.shortDescription}
          </p>
        </div>

        {/* Status Badge */}
        {/* <Badge
          variant="outline"
          className={`shrink-0 text-xs ${status.className}`}
        >
          {status.label}
        </Badge> */}

        {/* Arrow */}
        <ArrowRight
          className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover:translate-x-0.5"
            }`}
        />
      </button>

      {/* Expanded Content */}
      <div
        className={`grid transition-all duration-300 ease-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-0 border-t border-border/50 mt-0">
            <div className="pt-4 space-y-4">
              {/* Mobile description */}
              <p className="text-sm text-muted-foreground sm:hidden">
                {project.shortDescription}
              </p>

              {/* Full description */}
              <p className="text-sm text-foreground/80 leading-relaxed">
                {project.fullDescription}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.techs.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-1">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
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

  const featuredCount = projectsData.filter((p) => p.featured).length;
  const inProgressCount = projectsData.filter(
    (p) => p.status === "in-progress"
  ).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between px-1 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Projects</h3>
            <p className="text-sm text-muted-foreground">
              {projectsData.length} projects · {inProgressCount} in progress
            </p>
          </div>
          <a
            href="https://github.com/Adjanour?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">View all on GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Project List */}
        {projectsData.map((project) => (
          <ExpandableProjectItem
            key={project.id}
            project={project}
            isExpanded={expandedItems.has(project.id)}
            onToggle={() => toggleExpanded(project.id)}
          />
        ))}

        {/* Footer Note */}
        <div className="flex items-center justify-between px-1 pt-4 border-t border-border/30 mt-4">
          <p className="text-xs text-muted-foreground">
            {featuredCount} featured · {inProgressCount} in progress
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpandableProjectsList;
