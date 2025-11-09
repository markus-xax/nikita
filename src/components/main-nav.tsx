import { Link, NavLink } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";

export function MainNav() {
  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <span role="img" aria-hidden="true">
            📚
          </span>
          Frontend Playground
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
            end
          >
            Примеры
          </NavLink>
          <NavLink
            to="/roadmap"
            className={({ isActive }) =>
              `transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            Роадмап
          </NavLink>
          <NavLink
            to="/resources"
            className={({ isActive }) =>
              `transition-colors hover:text-primary ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            Ресурсы
          </NavLink>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}

