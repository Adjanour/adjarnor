import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import WritingCard from "@/components/site/WritingCard";
import { articles } from "@/data/articles";
import Footer from "@/components/site/Footer";

const Writing = () => {
    // Group articles by year
    const articlesByYear = articles.reduce((acc, article) => {
        const year = new Date(article.date).getFullYear();
        if (!acc[year]) acc[year] = [];
        acc[year].push(article);
        return acc;
    }, {} as Record<number, typeof articles>);

    const years = Object.keys(articlesByYear)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <main className="max-w-3xl mx-auto px-6 py-16">
                {/* Header */}
                <header className="mb-16">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back home
                    </Link>

                    <h1 className="text-3xl font-medium tracking-tight mb-4">Writing</h1>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Thoughts on engineering, deep work, and building purposeful systems.
                    </p>
                </header>

                {/* Articles grouped by year */}
                <div className="space-y-12">
                    {years.map((year) => (
                        <section key={year}>
                            <h2 className="text-sm font-medium text-muted-foreground mb-4 sticky top-0 bg-background py-2">
                                {year}
                            </h2>
                            <div className="space-y-0">
                                {articlesByYear[year].map((article) => (
                                    <WritingCard
                                        key={article.href}
                                        title={article.title}
                                        date={article.date}
                                        excerpt={article.excerpt}
                                        href={article.href}
                                        readTime={article.readTime}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Subscribe CTA */}
                <section className="mt-20 pt-12 border-t border-border">
                    <div className="text-center">
                        <h3 className="text-lg font-medium mb-2">Stay updated</h3>
                        <p className="text-muted-foreground mb-6">
                            Subscribe to get new articles delivered to your inbox.
                        </p>
                        <a
                            href="https://bernardkirkadjanorkatamanso.substack.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity font-medium"
                        >
                            Subscribe on Substack
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Writing;
