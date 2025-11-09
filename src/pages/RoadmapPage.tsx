import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const steps = [
  {
    title: "HTML",
    description:
      "Разметка, семантические теги, доступность, работа с формами и медиа.",
    topics: [
      "Семантика и структура документа",
      "Формы и валидация",
      "Таблицы и списки",
      "Микроразметка и доступность",
    ],
  },
  {
    title: "CSS",
    description:
      "Базовые и современные техники: позиционирование, Flexbox, Grid, переменные.",
    topics: [
      "Система селекторов и специфичность",
      "Flexbox и Grid",
      "Работа с цветами, типографикой, анимациями",
      "Адаптивность и дизайн-токены",
    ],
  },
  {
    title: "JavaScript",
    description:
      "От DOM API до модульной архитектуры — всё, что нужно прежде чем идти в React.",
    topics: [
      "Типы данных, функции, замыкания",
      "Работа с DOM, события, fetch",
      "Инструменты разработчика и тестирование",
      "Сборщики и модули (Vite, Webpack)",
    ],
  },
  {
    title: "Фреймворки",
    description:
      "После основ — React, Next.js, управление состоянием и UI-библиотеки.",
    topics: [
      "React 18 и JSX",
      "Next.js App Router",
      "Tailwind CSS и shadcn/ui",
      "State management и серверный рендеринг",
    ],
  },
];

export function RoadmapPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <Badge variant="secondary">Guide · Learning path</Badge>
        <h1 className="text-3xl font-bold">Роадмап изучения фронтенда</h1>
        <p className="max-w-2xl text-muted-foreground">
          Пошаговое руководство по освоению технологий. Каждый этап связан с
          примерами в этом проекте, чтобы вы могли сразу практиковаться.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {steps.map((step) => (
          <Card key={step.title}>
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {step.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span role="img" aria-hidden="true" className="mt-0.5">
                      •
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

