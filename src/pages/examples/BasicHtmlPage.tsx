import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const articleStructure = [
  {
    heading: "Семантические блоки",
    content:
      "Используйте `header`, `main`, `section`, `article`, `aside` и `footer`, чтобы явно описать структуру страницы. Это улучшает доступность и SEO.",
  },
  {
    heading: "Правильные заголовки",
    content:
      "На странице должен быть только один `h1`. Заголовки второго уровня (`h2`) разбивают контент на разделы, а `h3-h6` уточняют иерархию.",
  },
  {
    heading: "Медиа и подписи",
    content:
      "Всегда добавляйте `alt` к изображениям и используйте `figure`/`figcaption`, когда требуется подпись. Для видео подключайте `controls` и альтернативный текст.",
  },
  {
    heading: "Списки и таблицы",
    content:
      "Комбинируйте `ul`/`ol` с `li` для перечислений, а для табличных данных указывайте `caption`, `thead`, `tbody` и `th`/`td`.",
  },
];

const schedule = [
  { day: "Понедельник", topic: "HTML и семантика", time: "18:00" },
  { day: "Среда", topic: "CSS и адаптивность", time: "18:00" },
  { day: "Пятница", topic: "JavaScript и DOM", time: "18:00" },
];

export function BasicHtmlPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <Badge variant="secondary">Example · HTML</Badge>
        <h1 className="text-3xl font-bold">Семантическая страница на JSX</h1>
        <p className="max-w-2xl text-muted-foreground">
          Этот пример демонстрирует, как классическая структура HTML
          переносится в React. Каждый блок оформлен как компонент, но сохраняет
          семантику и преимущества чистого HTML.
        </p>
      </header>

      <article className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Основные принципы</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {articleStructure.map((item) => (
              <Card key={item.heading}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.heading}</CardTitle>
                  <CardDescription>{item.content}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Герой с изображением</h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <figure className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1587613866392-23c52136ca89?auto=format&fit=crop&w=900&q=80"
                  alt="Команда изучает фронтенд"
                  className="h-56 w-full rounded-lg object-cover"
                  loading="lazy"
                />
                <figcaption className="text-sm text-muted-foreground">
                  Figure 1. Обучение фронтенду в гибридном формате: React помогает
                  объединить HTML, CSS и JS в одном подходе.
                </figcaption>
              </figure>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Расписание занятий</h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full divide-y divide-border text-left text-sm">
              <caption className="px-6 py-4 text-left text-base font-semibold">
                Подготовка к React-проектам: еженедельный план
              </caption>
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    День
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Тема
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Время
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-background">
                {schedule.map((row) => (
                  <tr key={row.day}>
                    <th scope="row" className="px-6 py-3 font-medium">
                      {row.day}
                    </th>
                    <td className="px-6 py-3">{row.topic}</td>
                    <td className="px-6 py-3">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </article>
    </div>
  );
}

