import { useMemo, useState } from "react";
import { z } from "zod";
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

const registrationSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  email: z.string().email("Введите корректный email"),
  password: z
    .string()
    .min(6, "Минимум 6 символов")
    .regex(/[A-Z]/, "Хотя бы одна заглавная буква")
    .regex(/[0-9]/, "Хотя бы одна цифра"),
  age: z
    .string()
    .min(1, "Укажите возраст")
    .transform((value) => Number(value))
    .pipe(z.number().int().min(16, "Минимальный возраст: 16")),
  country: z.string().min(1, "Выберите страну"),
  bio: z.string().max(400, "Максимум 400 символов").optional(),
  gender: z.enum(["male", "female", "other"]),
  agree: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласиться с условиями" }),
  }),
});

type FormValues = z.input<typeof registrationSchema>;
type FormResult = z.output<typeof registrationSchema>;

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  age: "",
  country: "",
  bio: "",
  gender: "male",
  agree: false,
};

const presets: Array<{ id: string; label: string; values: FormValues }> = [
  {
    id: "student",
    label: "Студент",
    values: {
      name: "Никита Иванов",
      email: "student@example.com",
      password: "React2024",
      age: "20",
      country: "ru",
      bio: "Студент направления «Прикладная информатика», люблю Tailwind и React.",
      gender: "male",
      agree: true,
    },
  },
  {
    id: "designer",
    label: "UI/UX дизайнер",
    values: {
      name: "Анна Дизайн",
      email: "designer@example.com",
      password: "Figma101",
      age: "27",
      country: "kz",
      bio: "Прототипирую интерфейсы и хочу автоматизировать дизайн-систему в React.",
      gender: "female",
      agree: true,
    },
  },
];

type FormErrors = Partial<Record<keyof FormValues, string>>;

const countryNames: Record<string, string> = {
  ru: "Россия",
  ua: "Украина",
  kz: "Казахстан",
  by: "Беларусь",
  other: "Другое",
};

export function FormsPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<FormResult | null>(null);

  const handleChange = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = registrationSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.formErrors.fieldErrors;
      const formattedErrors = Object.entries(fieldErrors).reduce<FormErrors>(
        (acc, [key, messages]) => {
          const message = messages?.[0];
          if (message) {
            acc[key as keyof FormValues] = message;
          }
          return acc;
        },
        {},
      );
      setErrors(formattedErrors);
      return;
    }

    setResult(parsed.data);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setResult(null);
  };

  const handlePreset = (presetValues: FormValues) => {
    setValues(presetValues);
    setResult(null);
    setErrors({});
  };

  const summary = useMemo(() => {
    if (!result) return [];
    return [
      { label: "Имя", value: result.name || "—" },
      { label: "Email", value: result.email || "—" },
      { label: "Возраст", value: result.age?.toString() || "—" },
      { label: "Страна", value: countryNames[result.country] ?? result.country ?? "—" },
      { label: "Пол", value: result.gender ? genderLabel(result.gender) : "—" },
      { label: "О себе", value: result.bio ? result.bio : "—" },
    ];
  }, [result]);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <Badge variant="secondary">Example · Forms</Badge>
        <h1 className="text-3xl font-bold">Управляемая форма регистрации</h1>
        <p className="max-w-2xl text-muted-foreground">
          Переносим ванильный пример на React: контролируем ввод, валидируем
          значения с помощью Zod, визуализируем результат и подставляем пресеты.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Регистрационная форма</CardTitle>
            <CardDescription>
              Все поля контролируются, ошибки подсвечиваются, а результат
              отображается в карточке справа.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Имя"
                  id="name"
                  value={values.name}
                  onChange={(event) =>
                    handleChange("name", event.target.value)
                  }
                  error={errors.name}
                  placeholder="Например, Никита"
                  required
                />
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  error={errors.email}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Пароль"
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={(event) =>
                    handleChange("password", event.target.value)
                  }
                  error={errors.password}
                  placeholder="Минимум 6 символов, цифры и буквы"
                  required
                />
                <FormField
                  label="Возраст"
                  id="age"
                  type="number"
                  value={values.age}
                  onChange={(event) => handleChange("age", event.target.value)}
                  error={errors.age}
                  placeholder="например, 24"
                  min={16}
                  max={90}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-foreground"
                  >
                    Страна
                  </label>
                  <select
                    id="country"
                    className={cn(
                      "h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      errors.country && "border-destructive",
                    )}
                    value={values.country}
                    onChange={(event) =>
                      handleChange("country", event.target.value)
                    }
                  >
                    <option value="">Выберите страну</option>
                    <option value="ru">Россия</option>
                    <option value="kz">Казахстан</option>
                    <option value="by">Беларусь</option>
                    <option value="ua">Украина</option>
                    <option value="other">Другая</option>
                  </select>
                  {errors.country ? (
                    <p className="text-sm text-destructive">{errors.country}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <span className="block text-sm font-medium text-foreground">
                    Пол
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {(["male", "female", "other"] as const).map((option) => (
                      <button
                        type="button"
                        key={option}
                        className={cn(
                          "rounded-md border px-3 py-2 font-medium transition-colors hover:border-primary",
                          values.gender === option &&
                            "border-primary bg-primary/10 text-primary",
                        )}
                        onClick={() => handleChange("gender", option)}
                      >
                        {genderLabel(option)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <FormField
                label="О себе"
                id="bio"
                value={values.bio ?? ""}
                onChange={(event) => handleChange("bio", event.target.value)}
                error={errors.bio}
                placeholder="Пара слов о себе, интересы или цели обучения"
                multiline
              />

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={values.agree}
                  onChange={(event) => handleChange("agree", event.target.checked)}
                />
                <span>
                  Я согласен с{" "}
                  <a
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    условиями использования
                  </a>
                </span>
              </label>
              {errors.agree ? (
                <p className="text-sm text-destructive">{errors.agree}</p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit">Отправить</Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  Сбросить
                </Button>
                {presets.map((preset) => (
                  <Button
                    key={preset.id}
                    type="button"
                    variant="ghost"
                    onClick={() => handlePreset(preset.values)}
                  >
                    Заполнить: {preset.label}
                  </Button>
                ))}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Итоговая карточка</CardTitle>
              <CardDescription>
                Результат появляется после успешной валидации формы.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {summary.length ? (
                <dl className="space-y-3 text-sm">
                  {summary.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col rounded-md border px-3 py-2"
                    >
                      <dt className="text-xs uppercase text-muted-foreground">
                        {item.label}
                      </dt>
                      <dd className="text-sm text-foreground">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Заполните форму и отправьте, чтобы увидеть карточку с данными.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Что происходит под капотом?</CardTitle>
              <CardDescription>
                Разбираем ключевые отличия от ванильного варианта.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>• Поля управляются состоянием React (`useState`).</li>
                <li>
                  • Валидация выполняется схемой Zod, ошибки отображаются рядом
                  с полями.
                </li>
                <li>
                  • Пресеты демонстрируют, как можно мгновенно переиспользовать
                  форму.
                </li>
                <li>
                  • Результат — просто еще одно состояние, которое можно хранить
                  локально или отправить на сервер.
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                variant="link"
                className="px-0"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Вернуться к форме
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  multiline?: boolean;
}

function FormField({
  id,
  label,
  error,
  multiline,
  className,
  ...props
}: FormFieldProps) {
  const inputClassName = cn(
    "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
    error && "border-destructive",
    className,
  );

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className={cn(inputClassName, "min-h-[120px] resize-y")}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input id={id} className={inputClassName} {...props} />
      )}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

function genderLabel(value: FormValues["gender"]) {
  switch (value) {
    case "male":
      return "Мужской";
    case "female":
      return "Женский";
    default:
      return "Другое";
  }
}

