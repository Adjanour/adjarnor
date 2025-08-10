import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Bernard Adjanour. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a aria-label="Email" href="mailto:bernardadjanour@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors"><Mail /></a>
          <a aria-label="GitHub" href="https://github.com/Adjanour" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Github /></a>
          <a aria-label="LinkedIn" href="https://linkedin.com/in/bernardadjanour" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin /></a>
          <a aria-label="Twitter" href="https://twitter.com/bernardadjanour" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
