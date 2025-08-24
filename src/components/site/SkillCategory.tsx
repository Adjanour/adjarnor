import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface SkillCategoryProps {
  title: string;
  icon?: LucideIcon;
  skills: string[];
  description?: string;
}

const SkillCategory = ({ title, icon: Icon, skills, description }: SkillCategoryProps) => {
  return (
    <div className="group rounded-lg border bg-card/50 p-6 transition-all duration-300 hover:bg-card hover:shadow-md">
      <div className="flex items-center gap-3 mb-3">
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
      </div>
      
      {description && (
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>
      )}
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge 
            key={skill} 
            variant="secondary" 
            className="transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory;