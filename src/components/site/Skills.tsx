const primaryStack = ["TypeScript", "React", "Go", "Python", "Node.js"];
const secondary = ["Rust", "C#", "FastAPI", "PostgreSQL", "Docker"];

const SkillsShowcase = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Primary - emphasized */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {primaryStack.map((skill, i) => (
            <span key={skill} className="flex items-baseline gap-3">
              <span className="text-xl sm:text-2xl font-display font-medium text-foreground tracking-tight">
                {skill}
              </span>
              {i < primaryStack.length - 1 && (
                <span className="text-border text-xl select-none">/</span>
              )}
            </span>
          ))}
        </div>

        {/* Secondary - subtle */}
        <p className="text-sm text-muted-foreground">
          {secondary.join(" · ")} — and what the project needs.
        </p>
      </div>
    </div>
  );
};

export default SkillsShowcase;
