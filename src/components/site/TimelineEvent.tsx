import { Calendar, MapPin } from "lucide-react";

interface TimelineEventProps {
  title: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  isActive?: boolean;
  isLeft?: boolean; // New prop to determine side
}

const TimelineEvent = ({ 
  title, 
  organization, 
  period, 
  location, 
  description, 
  isActive = false,
  isLeft = false
}: TimelineEventProps) => {
  return (
    <div className={`relative flex items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Timeline dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex">
        <div className={`w-4 h-4 rounded-full border-2 border-background ${
          isActive ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-muted-foreground'
        }`} />
      </div>
      
      {/* Content */}
      <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
        <div className="backdrop-blur-sm bg-card/50 border border-border/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 group">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{title}</h3>
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
          
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Empty space on the other side for desktop */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
};

export default TimelineEvent;