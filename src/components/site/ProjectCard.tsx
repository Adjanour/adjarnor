import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  techs: string[];
  link?: string;
  linkLabel?: string;
}

const ProjectCard = ({ title, description, techs, link, linkLabel = "Learn more" }: ProjectCardProps) => {
  return (
    <Card className="h-full transition-colors hover:border-primary/40 hover-scale">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {techs.map((t) => (
            <Badge key={t} variant="secondary">{t}</Badge>
          ))}
        </div>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="story-link inline-flex items-center gap-2 text-sm">
            {linkLabel} <ExternalLink className="opacity-70" size={16} />
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
