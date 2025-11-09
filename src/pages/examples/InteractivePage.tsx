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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { cn } from "../../lib/utils";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const themes = {
  light: {
    label: "Светлая",
    className:
      "rounded-xl border bg-background text-foreground transition-colors",
  },
  dark: {
    label: "Темная",
    className:
      "rounded-xl border bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-100 transition-colors",
  },
  blue: {
    label: "Синяя",
    className:
      "rounded-xl border bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white transition-colors",
  },
} as const;

export function InteractivePage() {
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [selectedTheme, setSelectedTheme] =
    useState<keyof typeof themes>("light");

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  );

  const addTodo = () => {
    const text = todoInput.trim();
    if (!text) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
    setTodoInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <Badge variant="secondary">Example · State</Badge>
        <h1 className="text-3xl font-bold">Интерактивная панель</h1>
        <p className="max-w-2xl text-muted-foreground">
          React-переосмысление классических задач: счетчик со своим шагом,
          todo-список, тематические карточки и модальный диалог на Radix UI.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Счетчик</CardTitle>
            <CardDescription>
              Нажмите на кнопки, чтобы менять значение. Шаг можно настроить.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <Button
                size="icon"
                variant="secondary"
                aria-label="Уменьшить"
                onClick={() => setCounter((value) => value - step)}
              >
                −
              </Button>
              <div className="flex h-24 w-24 items-center justify-center rounded-full border text-4xl font-bold shadow-sm transition-transform">
                {counter}
              </div>
              <Button
                size="icon"
                aria-label="Увеличить"
                onClick={() => setCounter((value) => value + step)}
              >
                +
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2">
              {[1, 5, 10].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={step === value ? "default" : "outline"}
                  onClick={() => setStep(value)}
                >
                  Шаг {value}
                </Button>
              ))}
              <Button variant="ghost" onClick={() => setCounter(0)}>
                Сбросить
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Todo-лист</CardTitle>
            <CardDescription>
              Кликните по задаче, чтобы отметить её выполненной. Можно удалять.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Например, изучить useReducer"
                value={todoInput}
                onChange={(event) => setTodoInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTodo();
                  }
                }}
              />
              <Button type="button" onClick={addTodo}>
                Добавить
              </Button>
            </div>

            <ul className="space-y-2">
              {todos.length ? (
                todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={cn(
                      "flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors",
                      todo.completed
                        ? "bg-primary/10 text-primary line-through"
                        : "bg-background",
                    )}
                  >
                    <button
                      className="flex-1 text-left"
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.text}
                    </button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Удалить
                    </Button>
                  </li>
                ))
              ) : (
                <CardDescription>
                  Пока задач нет. Добавьте первую!
                </CardDescription>
              )}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <span>Всего: {todos.length}</span>
            <span>Выполнено: {completedCount}</span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Тематические карточки</CardTitle>
            <CardDescription>
              Переключайте тему и наблюдайте, как меняется оформление.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              {(Object.keys(themes) as Array<keyof typeof themes>).map((key) => (
                <Button
                  key={key}
                  variant={selectedTheme === key ? "default" : "outline"}
                  onClick={() => setSelectedTheme(key)}
                >
                  {themes[key].label}
                </Button>
              ))}
            </div>
            <div className={cn("p-6", themes[selectedTheme].className)}>
              <h3 className="text-lg font-semibold">React Theme Showcase</h3>
              <p className="mt-2 text-sm opacity-80">
                Переключение темы здесь локальное — не влияет на глобальный
                `ThemeProvider`, но показывает, как управлять стилями через state.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Модальное окно</CardTitle>
            <CardDescription>
              Используем Radix Dialog, чтобы заменить кастомный JS на декларативный
              подход.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Открыть модальное окно</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>React + Radix UI</DialogTitle>
                  <DialogDescription>
                    Мы перенесли нативное модальное окно на Radix Dialog. Теперь
                    управление фокусом, анимации и закрытие по Escape идут из коробки.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Преимущества такого подхода:</p>
                  <ul className="list-disc pl-5">
                    <li>Не нужно вручную писать обработчики закрытия.</li>
                    <li>Адаптивность и доступность реализованы библиотекой.</li>
                    <li>Стилей Tailwind достаточно для кастомизации.</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

