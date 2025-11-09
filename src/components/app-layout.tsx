import type { ReactNode } from "react";
import { MainNav } from "./main-nav";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <MainNav />
      <main className="container py-10">{children}</main>
      <footer className="border-t bg-background/80 py-6 text-sm text-muted-foreground">
        <div className="container flex flex-col gap-2 text-center md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Frontend Playground. Все права защищены.</p>
          <p className="opacity-80">
            Создано для быстрой адаптации классических примеров HTML/CSS/JS к React 18.
          </p>
        </div>
      </footer>
    </div>
  );
}

