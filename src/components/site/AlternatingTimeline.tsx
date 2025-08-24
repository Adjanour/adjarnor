import { ReactNode } from "react";

interface AlternatingTimelineProps {
  children: ReactNode;
}

const AlternatingTimeline = ({ children }: AlternatingTimelineProps) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2 hidden md:block" />
      
      {/* Timeline events */}
      <div className="space-y-12">
        {children}
      </div>
    </div>
  );
};

export default AlternatingTimeline;