interface Role {
    title: string;
    org: string;
    period: string;
    current?: boolean;
}

const roles: Role[] = [
    { title: "CTO", org: "Orcta", period: "2024–", current: true },
    { title: "Co-Lead", org: "GDG UMaT", period: "2024–2025" },
    { title: "Co-Founder", org: "Salem Aid Foundation", period: "2022–", current: true },
];

const Experience = () => {
    return (
        <section id="experience" className="mx-auto max-w-5xl px-12 py-16 md:py-10 scroll-mt-24">
            <h2 className="text-2xl font-medium tracking-tight mb-8">Experience</h2>

            <div className="space-y-4">
                {roles.map((role) => (
                    <div
                        key={`${role.org}-${role.title}`}
                        className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-2 border-b border-border last:border-b-0"
                    >
                        <span className="text-xs text-muted-foreground tabular-nums shrink-0 w-24">
                            {role.period}
                        </span>
                        <div className="flex-1 min-w-0">
                            <span className="font-medium">{role.title}</span>
                            <span className="text-muted-foreground"> at </span>
                            <span className="text-muted-foreground">{role.org}</span>
                            {role.current && (
                                <span className="ml-2 text-xs text-primary">current</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
