import { Badge } from "@/components/ui/badge";
import { ExternalLink, ChevronRight } from "lucide-react";

interface EnhancedProjectCardProps {
  title: string;
  description: string;
  techs: string[];
  link?: string;
  linkLabel?: string;
  status?: "completed" | "in-progress" | "concept";
}

const EnhancedProjectCard = ({ 
  title, 
  description, 
  techs, 
  link, 
  linkLabel = "Learn more",
  status = "completed"
}: EnhancedProjectCardProps) => {
  const statusColors = {
    completed: "bg-primary/10 text-primary border-primary/20",
    "in-progress": "bg-accent/10 text-accent-foreground border-accent/20", 
    concept: "bg-muted text-muted-foreground border-border"
  };

  return (
    <div className="group relative rounded-lg border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
          {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {techs.map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
      
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group/link"
        >
          {linkLabel}
          <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </a>
      )}
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  );
};

export default EnhancedProjectCard;