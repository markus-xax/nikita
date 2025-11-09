import { Link } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { examples } from "../data/examples";

export function OverviewPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold tracking-wide text-muted-foreground">
          React 18 · Tailwind CSS · Radix UI
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Ванильные примеры, переосмысленные в React
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Коллекция учебных сцен с HTML, CSS и JavaScript, портированная на
          современный стек — React 18, Tailwind CSS и Radix UI. Исследуйте, как
          классические техники выглядят в декларативном мире.
        </p>
      </section>

      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <Card key={example.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{example.title}</CardTitle>
                  {example.badge ? (
                    <Badge variant="secondary">{example.badge}</Badge>
                  ) : null}
                </div>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {example.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 leading-relaxed"
                    >
                      <span role="img" aria-hidden="true" className="mt-0.5">
                        ✅
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                  <Link to={example.to}>Открыть пример</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

