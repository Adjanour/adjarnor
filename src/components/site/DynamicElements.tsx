import { useState, useEffect } from "react";
import { Clock, Quote } from "lucide-react";

const inspirationalQuotes = [
  "Innovation distinguishes between a leader and a follower.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Technology is a useful servant but a dangerous master.",
  "Code is poetry written in logic.",
  "Every expert was once a beginner.",
  "Progress is impossible without change.",
  "Dream big, start small, move fast.",
];

export const DynamicElements = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    // Update time every second for Ghana timezone (GMT)
    const updateTime = () => {
      const now = new Date();
      const ghanaTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Accra',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now);
      setCurrentTime(ghanaTime);
    };

    // Set initial quote (changes daily based on date)
    const today = new Date().getDate();
    setCurrentQuote(inspirationalQuotes[today % inspirationalQuotes.length]);

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-1.5 backdrop-blur-sm bg-background/40 px-2 py-1 rounded-md border border-border/30">
        <Clock className="h-3 w-3" />
        <span className="font-mono">{currentTime}</span>
        <span className="text-[10px] opacity-70">Accra</span>
      </div>
      <div className="flex items-center gap-1.5 backdrop-blur-sm bg-background/40 px-2 py-1 rounded-md border border-border/30 max-w-64">
        <Quote className="h-3 w-3 flex-shrink-0" />
        <span className="truncate text-[10px]">{currentQuote}</span>
      </div>
    </div>
  );
};