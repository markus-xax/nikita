import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const flexOptions = {
  direction: ["row", "column", "row-reverse", "column-reverse"] as const,
  justify: ["flex-start", "center", "space-between", "space-around", "space-evenly"] as const,
  align: ["stretch", "center", "flex-start", "flex-end"] as const,
};

const gridTemplates = {
  twoColumn: "repeat(2, minmax(0, 1fr))",
  threeColumn: "repeat(3, minmax(0, 1fr))",
  asymetric: "200px 1fr 150px",
} as const;

export function LayoutsPage() {
  const [flexDirection, setFlexDirection] =
    useState<(typeof flexOptions.direction)[number]>("row");
  const [flexJustify, setFlexJustify] =
    useState<(typeof flexOptions.justify)[number]>("center");
  const [flexAlign, setFlexAlign] =
    useState<(typeof flexOptions.align)[number]>("center");
  const [gridTemplate, setGridTemplate] =
    useState<keyof typeof gridTemplates>("threeColumn");
  const [gridGap, setGridGap] = useState(24);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <Badge variant="secondary">Example · Layout</Badge>
        <h1 className="text-3xl font-bold">Flexbox и Grid playground</h1>
        <p className="max-w-2xl text-muted-foreground">
          Исследуем современную вёрстку через интерактивные панели управления.
          Tailwind позволяет динамически менять классы и мгновенно видеть результат.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Flexbox</CardTitle>
            <CardDescription>
              Меняйте направление, выравнивание и распределение элементов.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ControlGroup
              title="Направление"
              value={flexDirection}
              onChange={setFlexDirection}
              options={flexOptions.direction}
            />
            <ControlGroup
              title="Горизонталь"
              value={flexJustify}
              onChange={setFlexJustify}
              options={flexOptions.justify}
            />
            <ControlGroup
              title="Вертикаль"
              value={flexAlign}
              onChange={setFlexAlign}
              options={flexOptions.align}
            />
            <div
              className={cn(
                "flex min-h-[200px] rounded-lg border bg-muted/40 p-4 transition-all",
              )}
              style={{
                flexDirection,
                justifyContent: flexJustify,
                alignItems: flexAlign,
                gap: "1rem",
              }}
            >
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex h-20 w-20 items-center justify-center rounded-lg bg-primary/90 text-lg font-semibold text-primary-foreground shadow"
                >
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CSS Grid</CardTitle>
            <CardDescription>
              Три пресета для шаблонов и настройка расстояний между карточками.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ControlGroup
              title="Шаблон сетки"
              value={gridTemplate}
              onChange={setGridTemplate}
              options={Object.keys(gridTemplates) as Array<keyof typeof gridTemplates>}
              label={({ option }) =>
                ({
                  twoColumn: "Два столбца",
                  threeColumn: "Три столбца",
                  asymetric: "Асимметрия",
                }[option])
              }
            />

            <div className="space-y-2">
              <p className="text-sm font-medium">Отступ между карточками: {gridGap}px</p>
              <input
                type="range"
                min={8}
                max={48}
                value={gridGap}
                onChange={(event) => setGridGap(Number(event.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div
              className="min-h-[200px] rounded-lg border bg-muted/40 p-4"
              style={{
                display: "grid",
                gridTemplateColumns: gridTemplates[gridTemplate],
                gap: `${gridGap / 16}rem`,
              }}
            >
              {["Смартфон", "Ноутбук", "Часы", "Наушники", "Планшет", "Колонка"].map(
                (item, index) => (
                  <div
                    key={item}
                    className={cn(
                      "rounded-lg border bg-background p-4 shadow-sm transition-transform hover:-translate-y-1",
                      index === 0 && gridTemplate === "asymetric" ? "lg:row-span-2" : "",
                      index === 3 && gridTemplate === "asymetric" ? "lg:col-span-2" : "",
                    )}
                  >
                    <div className="text-2xl">📦</div>
                    <h3 className="mt-2 font-semibold">{item}</h3>
                    <p className="text-sm text-muted-foreground">
                      Адаптивная карточка с поддержкой любого контента.
                    </p>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface ControlGroupProps<T extends string> {
  title: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  label?: (params: { option: T }) => string;
}

function ControlGroup<T extends string>({
  title,
  value,
  options,
  onChange,
  label,
}: ControlGroupProps<T>) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            key={option}
            type="button"
            variant={option === value ? "default" : "outline"}
            onClick={() => onChange(option)}
          >
            {label ? label({ option }) : option}
          </Button>
        ))}
      </div>
    </div>
  );
}

