import { ArrowRight } from "lucide-react";

interface WritingCardProps {
  title: string;
  date: string;
  excerpt?: string;
  href: string;
  readTime?: string;
  tags?: string[];
}

const WritingCard = ({ title, date, excerpt, href, readTime }: WritingCardProps) => {
  const isExternal = !href.startsWith('#');
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group block py-5 last:border-b-0 hover:bg-muted/30 -mx-3 px-3 rounded-sm transition-colors"
    >
      <article className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
        {/* Date */}
        <time
          dateTime={date}
          className="text-xs text-muted-foreground tabular-nums shrink-0 w-24"
        >
          {formattedDate}
        </time>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
            {title}
          </h3>

          {excerpt && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {excerpt}
            </p>
          )}
        </div>

        {/* Read indicator */}
        <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
          {readTime && <span>{readTime}</span>}
          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </div>
      </article>
    </a>
  );
};

export default WritingCard;