import { useEffect } from "react";

const BackgroundFX = () => {
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const x = e.clientX + "px";
      const y = e.clientY + "px";
      document.documentElement.style.setProperty("--pointer-x", x);
      document.documentElement.style.setProperty("--pointer-y", y);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-20" />
      <div className="absolute inset-0 bg-triangles opacity-5 dark:opacity-3" />
      {/* Subtle static gradient */}
      <div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          background:
            "radial-gradient(800px circle at 50% 20%, hsl(var(--brand-start) / 0.1), transparent 70%)",
        }}
      />
    </div>
  );
};

export default BackgroundFX;
