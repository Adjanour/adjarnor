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
  "Simplicity is the soul of efficiency.",
  "The best way to predict the future is to invent it.",
  "Debugging is like being the detective in a crime movie where you are also the murderer.",
  "Learning to code is learning to think.",
  "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
  "The only constant in technology is change.",
  "Write code as if the person who ends up maintaining it will be a violent psychopath who knows where you live.",
  "Creativity is intelligence having fun.",
  "Algorithms are the bridges between problems and solutions.",
  "Focus on the fundamentals, the rest will follow.",
  "Mistakes are proof that you are trying.",
];


export const DynamicElements = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    // Update time every minute for Ghana timezone (GMT)
    const updateTime = () => {
      const now = new Date();
      const accraTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Africa/Accra" })
      );
      const hour = accraTime.getHours();
      const status =
        hour < 6
          ? "Deep night"
          : hour < 12
            ? "Morning focus"
            : hour < 17
              ? "Afternoon flow"
              : hour < 21
                ? "Evening reset"
                : "Late session";
      const ghanaTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Accra',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now);
      setCurrentTime(ghanaTime);
      setCurrentStatus(status);
    };

    // Set initial quote (changes daily based on date)
    const today = new Date().getDate();
    setCurrentQuote(inspirationalQuotes[today % inspirationalQuotes.length]);

    updateTime();
    const timeInterval = setInterval(updateTime, 1 * 1000); // update every second now i know why

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center gap-4 text-sm text-muted-foreground flex-1 min-w-0">
      <div className="flex items-center gap-2 backdrop-blur-sm bg-background/40 px-3 py-2 rounded-md border border-border/30">
        {/* place a blue or green dot on top of clock icon and give it that glow effect and some rings with varying intensity around it */}
        <span className="h-[0.15rem] w-[0.15rem] rounded-full bg-blue-700  ring-2 ring-blue-400 mr-[0.1rem] dark:bg-green-600 dark:ring-green-400" />
        <Clock className="h-3 w-3" />
        <span className="font-mono">{currentTime}</span>
        <span className="text-xs opacity-70">Accra, GH</span>
        <span className="ml-2 inline-flex items-center rounded-full border border-border/50 px-2 py-0.5 text-[11px] text-foreground/80">
          Now: {currentStatus}
        </span>
      </div>
      <div className="group flex items-center gap-2 backdrop-blur-sm bg-background/40 px-3 py-2 rounded-md border border-border/30 min-w-0 max-w-sm transition-all duration-300 hover:max-w-lg">
        <Quote className="h-3 w-3 shrink-0" />
        <span className="truncate text-sm group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-foreground">
          {currentQuote}
        </span>
      </div>
    </div>
  );
};
