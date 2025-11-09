import { useMemo, useState } from "react";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
}

const gallery: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    alt: "Команда разработчиков строит интерфейс",
  },
  {
    src: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
    alt: "Дизайн-система с токенами",
  },
  {
    src: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80",
    alt: "Рабочее место фронтенд-разработчика",
  },
];

const classPresets = [
  { label: "default", classes: "bg-background text-foreground" },
  { label: "highlighted", classes: "bg-primary/10 text-primary border-primary" },
  { label: "success", classes: "bg-emerald-500/10 text-emerald-600 border-emerald-500" },
  { label: "danger", classes: "bg-red-500/10 text-red-600 border-red-500" },
];

export function DomPage() {
  const [items, setItems] = useState<string[]>([]);
  const [itemInput, setItemInput] = useState("");
  const [styleState, setStyleState] = useState({
    colorIndex: 0,
    fontSize: 18,
    border: false,
  });
  const [classPresetIndex, setClassPresetIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [customAlt, setCustomAlt] = useState("");
  const [content, setContent] = useState("<p>Замените содержимое, чтобы увидеть разницу между textContent и innerHTML.</p>");
  const [contentInput, setContentInput] = useState("");
  const [removableCards, setRemovableCards] = useState([
    { id: 1, title: "Карточка 1", description: "Можно удалить по кнопке." },
    { id: 2, title: "Карточка 2", description: "Состояние массива управляет списком." },
    { id: 3, title: "Карточка 3", description: "React-подход вместо manual DOM API." },
  ]);

  const palette = ["#6366f1", "#f97316", "#10b981", "#ec4899", "#0ea5e9"];

  const currentImage = useMemo(() => gallery[imageIndex % gallery.length], [imageIndex]);

  const nextPreset = () => {
    setClassPresetIndex((index) => (index + 1) % classPresets.length);
  };

  const addItem = () => {
    const value = itemInput.trim();
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setItemInput("");
  };

  const changeStyles = () => {
    setStyleState((prev) => ({
      colorIndex: (prev.colorIndex + 1) % palette.length,
      fontSize: prev.fontSize === 18 ? 24 : prev.fontSize === 24 ? 30 : 18,
      border: prev.border,
    }));
  };

  const toggleBorder = () => {
    setStyleState((prev) => ({ ...prev, border: !prev.border }));
  };

  const resetStyles = () => {
    setStyleState({ colorIndex: 0, fontSize: 18, border: false });
  };

  const handleSetText = () => {
    const value = contentInput.trim();
    if (!value) return;
    setContent(value);
    setContentInput("");
  };

  const removeCard = (id: number) => {
    setRemovableCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <Badge variant="secondary">Example · React DOM</Badge>
        <h1 className="text-3xl font-bold">Манипуляции с DOM на React</h1>
        <p className="max-w-2xl text-muted-foreground">
          Сравниваем старый подход (querySelector, classList, setAttribute) с
          реактивными состояниями. Каждый блок — аналог традиционных задач, но
          реализованный декларативно.
        </p>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Создание элементов</CardTitle>
            <CardDescription>
              Вместо `appendChild` мы обновляем массив в состоянии, React
              синхронизирует DOM.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={itemInput}
                onChange={(event) => setItemInput(event.target.value)}
                placeholder="Добавьте элемент списка"
                className="flex-1 rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addItem();
                  }
                }}
              />
              <Button type="button" onClick={addItem}>
                Добавить
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border bg-muted px-3 py-1 text-sm"
                >
                  {item}
                </span>
              ))}
              {!items.length && (
                <span className="text-sm text-muted-foreground">
                  Список пока пустой.
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Изменение стилей</CardTitle>
            <CardDescription>
              Стили хранятся в state, что позволяет легко сбрасывать и анимировать
              изменения.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={cn(
                "rounded-xl border p-4 text-center text-lg font-semibold transition-all",
                styleState.border ? "border-4 border-primary" : "",
              )}
              style={{
                color: palette[styleState.colorIndex],
                backgroundColor: `${palette[styleState.colorIndex]}20`,
                fontSize: styleState.fontSize,
              }}
            >
              Tailwind + inline стили → быстрый playground
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={changeStyles}>
                Изменить цвет и размер
              </Button>
              <Button type="button" variant="outline" onClick={toggleBorder}>
                Переключить рамку
              </Button>
              <Button type="button" variant="ghost" onClick={resetStyles}>
                Сбросить
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Работа с классами</CardTitle>
            <CardDescription>
              Вместо `classList.toggle` — условные классы и управляемые пресеты.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={cn(
                "rounded-lg border p-4 text-center text-sm transition-all",
                classPresets[classPresetIndex].classes,
              )}
            >
              Текущий пресет: {classPresets[classPresetIndex].label}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={nextPreset}>
                Следующий стиль
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setClassPresetIndex(0)}
              >
                Сброс
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Атрибуты и изображения</CardTitle>
            <CardDescription>
              `src`, `alt` и `hidden` становятся обычными пропами.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-[2fr,1fr]">
            <figure className="space-y-3">
              <img
                key={currentImage.src}
                src={currentImage.src}
                alt={customAlt || currentImage.alt}
                className="h-64 w-full rounded-lg object-cover shadow"
              />
              <figcaption className="text-sm text-muted-foreground">
                {customAlt || currentImage.alt}
              </figcaption>
            </figure>
            <div className="space-y-3 rounded-lg border bg-muted/40 p-4">
              <Button
                type="button"
                className="w-full"
                onClick={() => setImageIndex((index) => index + 1)}
              >
                Следующее изображение
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setCustomAlt(prompt("Новый alt:", customAlt) ?? customAlt)}
              >
                Изменить alt
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setCustomAlt("")}
              >
                Сбросить alt
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Содержимое</CardTitle>
            <CardDescription>
              Два режима: безопасный текст и HTML. React экранирует текст по умолчанию.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={contentInput}
              onChange={(event) => setContentInput(event.target.value)}
              placeholder="Введите текст или HTML"
              className="min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={handleSetText}>
                Использовать как textContent
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const value = contentInput.trim();
                  if (!value) return;
                  setContent(value);
                  setContentInput("");
                }}
              >
                Использовать как innerHTML
              </Button>
            </div>
            <div
              className="rounded-lg border bg-muted/30 p-4 text-sm"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Удаление элементов</CardTitle>
            <CardDescription>
              Удаляем карточку — React диффит список и синхронизирует DOM.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            {removableCards.map((card) => (
              <div key={card.id} className="space-y-3 rounded-lg border bg-background p-4 text-sm shadow-sm">
                <div className="text-lg font-semibold">{card.title}</div>
                <p className="text-muted-foreground">{card.description}</p>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeCard(card.id)}
                >
                  Удалить
                </Button>
              </div>
            ))}
            {!removableCards.length && (
              <p className="text-sm text-muted-foreground md:col-span-3">
                Все карточки удалены. Перезагрузите страницу, чтобы восстановить список.
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setRemovableCards([
                  { id: 1, title: "Карточка 1", description: "Можно удалить по кнопке." },
                  { id: 2, title: "Карточка 2", description: "Состояние массива управляет списком." },
                  { id: 3, title: "Карточка 3", description: "React-подход вместо manual DOM API." },
                ])
              }
            >
              Вернуть карточки
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

