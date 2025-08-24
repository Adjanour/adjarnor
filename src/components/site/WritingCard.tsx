import { Calendar, ArrowUpRight } from "lucide-react";

interface WritingCardProps {
  title: string;
  date: string;
  excerpt?: string;
  href: string;
  readTime?: string;
  tags?: string[];
}

const WritingCard = ({ title, date, excerpt, href, readTime, tags }: WritingCardProps) => {
  const isExternal = !href.startsWith('#');
  
  return (
    <article className="group relative rounded-lg border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</time>
          {readTime && (
            <>
              <span>•</span>
              <span>{readTime}</span>
            </>
          )}
        </div>
        {isExternal && (
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-3 leading-tight">
        <a 
          href={href} 
          target={isExternal ? "_blank" : undefined} 
          rel={isExternal ? "noreferrer" : undefined}
          className="before:absolute before:inset-0"
        >
          {title}
        </a>
      </h3>
      
      {excerpt && (
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
      )}
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </article>
  );
};

export default WritingCard;