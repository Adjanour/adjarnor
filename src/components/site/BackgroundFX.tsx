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
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-triangles opacity-20 dark:opacity-15" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), hsl(var(--brand-start) / 0.15), transparent 60%)",
        }}
      />
    </div>
  );
};

export default BackgroundFX;
