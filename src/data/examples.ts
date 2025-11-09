export interface Example {
  id: string;
  title: string;
  description: string;
  features: string[];
  to: string;
  badge?: string;
}

export const examples: Example[] = [
  {
    id: "basic-html",
    title: "Базовая структура HTML",
    description:
      "Семантическая разметка, правильные заголовки и структурирование текста в React через JSX.",
    features: [
      "Семантические блоки",
      "Таблицы и списки",
      "Встраивание мультимедиа",
      "Доступность через aria-*",
    ],
    to: "/examples/basic-html",
    badge: "HTML",
  },
  {
    id: "forms",
    title: "Работа с формами",
    description:
      "Контролируемые компоненты, валидация и вывод результата — современный подход к формам.",
    features: [
      "Контролируемые поля",
      "Визуализация ошибок",
      "Сохранение шаблонов",
      "Reset & Prefill",
    ],
    to: "/examples/forms",
    badge: "Forms",
  },
  {
    id: "interactive",
    title: "Интерактивная страница",
    description:
      "Счетчик, todo-список, модальное окно и переключатель тем — классические примеры управления состоянием.",
    features: [
      "Счетчик с быстрыми шагами",
      "Todo со статусами",
      "Модальный диалог",
      "Переключатель темы",
    ],
    to: "/examples/interactive",
    badge: "State",
  },
  {
    id: "layout",
    title: "Flexbox и CSS Grid",
    description:
      "Два подхода к компоновке интерфейсов, визуализированные в виде интерактивных панелей.",
    features: [
      "Flexbox playground",
      "Grid шаблоны",
      "Настройки выравнивания",
      "Адаптивные карточки",
    ],
    to: "/examples/layouts",
    badge: "Layout",
  },
  {
    id: "dom",
    title: "Манипуляции с DOM",
    description:
      "Как типичные операции с DOM отражаются в реактивном подходе — с состояниями и эффектами.",
    features: [
      "Динамические списки",
      "Работа с атрибутами",
      "Обновление стилей",
      "Очистка ресурсов",
    ],
    to: "/examples/dom",
    badge: "React DOM",
  },
];

