import { Calendar, MapPin } from "lucide-react";

interface TimelineEventProps {
  title: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  isActive?: boolean;
}

const TimelineEvent = ({ 
  title, 
  organization, 
  period, 
  location, 
  description, 
  isActive = false 
}: TimelineEventProps) => {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line and dot */}
      <div className="absolute left-0 top-2">
        <div className={`w-4 h-4 rounded-full border-2 ${
          isActive 
            ? 'bg-primary border-primary shadow-lg shadow-primary/30' 
            : 'bg-background border-muted-foreground/30'
        }`} />
      </div>
      
      {/* Timeline connecting line - extends to next item */}
      <div className="absolute left-2 top-6 w-0.5 h-full bg-border -translate-x-1/2 last:hidden" />
      
      <div className="group rounded-lg border bg-card/50 p-5 transition-all duration-300 hover:bg-card hover:shadow-md">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-primary font-medium">{organization}</p>
          </div>
          {isActive && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
              Current
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{period}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TimelineEvent;