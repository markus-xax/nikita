import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const resources = [
  {
    title: "MDN Web Docs",
    description: "Главный источник по веб-технологиям. Документация, справочники, гайды.",
    href: "https://developer.mozilla.org/ru/",
  },
  {
    title: "JavaScript.info",
    description: "Современный учебник по JavaScript с практическими заданиями.",
    href: "https://javascript.info/ru",
  },
  {
    title: "Tailwind CSS",
    description: "Утилитарный CSS-фреймворк, который мы используем в проекте.",
    href: "https://tailwindcss.com/",
  },
  {
    title: "Radix UI + shadcn/ui",
    description: "Коллекция доступных компонентов и гайд по их кастомизации.",
    href: "https://ui.shadcn.com/",
  },
  {
    title: "React.dev",
    description: "Официальный сайт React 18 с новыми гайдами и бест практисами.",
    href: "https://react.dev/",
  },
  {
    title: "Can I Use",
    description: "Проверка поддержки браузерами CSS/JS-фич. Полезно при вёрстке.",
    href: "https://caniuse.com/",
  },
];

export function ResourcesPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <Badge variant="secondary">Guide · Resources</Badge>
        <h1 className="text-3xl font-bold">Полезные материалы</h1>
        <p className="max-w-2xl text-muted-foreground">
          Сборка ссылок, которые помогут углубить знания. От документации до
          практических гайдов и комьюнити.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.href}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Перейти →
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

