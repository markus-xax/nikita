# Руководство по ванильному фронтенду: HTML, CSS, JavaScript

## Оглавление
1. [HTML - Структура веб-страницы](#html)
2. [CSS - Стилизация](#css)
3. [JavaScript - Интерактивность](#javascript)
4. [Объединение всего вместе](#объединение)

---

## HTML - Структура веб-страницы {#html}

HTML (HyperText Markup Language) - это язык разметки, который определяет структуру веб-страницы.

### Основные теги

#### Структура документа
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Название страницы</title>
</head>
<body>
    <!-- Содержимое страницы -->
</body>
</html>
```

#### Заголовки
- `<h1>` - самый важный заголовок (используется один раз на странице)
- `<h2>` - `<h6>` - подзаголовки разных уровней

#### Параграфы и текст
- `<p>` - параграф текста
- `<strong>` или `<b>` - жирный текст
- `<em>` или `<i>` - курсив
- `<br>` - перенос строки

#### Списки
- `<ul>` - ненумерованный список
- `<ol>` - нумерованный список
- `<li>` - элемент списка

#### Ссылки и изображения
- `<a href="url">` - ссылка
- `<img src="путь" alt="описание">` - изображение

#### Формы
- `<form>` - форма
- `<input>` - поле ввода
- `<button>` - кнопка
- `<textarea>` - многострочное поле ввода
- `<select>` - выпадающий список

#### Семантические теги (HTML5)
- `<header>` - шапка страницы
- `<nav>` - навигация
- `<main>` - основное содержимое
- `<section>` - секция
- `<article>` - статья
- `<aside>` - боковая панель
- `<footer>` - подвал

---

## CSS - Стилизация {#css}

CSS (Cascading Style Sheets) - язык стилей для оформления HTML элементов.

### Подключение CSS

1. **Внешний файл** (рекомендуется):
```html
<link rel="stylesheet" href="styles.css">
```

2. **Внутри `<head>`**:
```html
<style>
    /* CSS код */
</style>
```

3. **Инлайн стили** (не рекомендуется для больших проектов):
```html
<div style="color: red;">Текст</div>
```

### Синтаксис CSS

```css
селектор {
    свойство: значение;
    другое-свойство: значение;
}
```

### Селекторы

#### Таг-селектор
```css
p {
    color: blue;
}
```

#### Класс (class)
```css
.my-class {
    font-size: 20px;
}
```

#### ID
```css
#my-id {
    background-color: yellow;
}
```

#### Комбинаторы
```css
/* Потомок */
div p { }

/* Прямой потомок */
div > p { }

/* Соседний элемент */
h1 + p { }

/* Все соседи */
h1 ~ p { }
```

### Основные свойства

#### Цвета и фон
- `color` - цвет текста
- `background-color` - цвет фона
- `background-image` - фоновое изображение

#### Типография
- `font-family` - шрифт
- `font-size` - размер шрифта
- `font-weight` - жирность (normal, bold, 100-900)
- `text-align` - выравнивание (left, center, right, justify)
- `line-height` - высота строки

#### Отступы и размеры
- `width` - ширина
- `height` - высота
- `margin` - внешние отступы
- `padding` - внутренние отступы
- `border` - граница

#### Позиционирование
- `position: static` - по умолчанию
- `position: relative` - относительно своей позиции
- `position: absolute` - относительно ближайшего позиционированного родителя
- `position: fixed` - относительно окна браузера
- `position: sticky` - липкое позиционирование

#### Flexbox
```css
.container {
    display: flex;
    justify-content: center; /* горизонтальное выравнивание */
    align-items: center;     /* вертикальное выравнивание */
    flex-direction: row;     /* направление (row, column) */
    gap: 20px;               /* расстояние между элементами */
}
```

#### Grid
```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 20px;
}
```

### Псевдоклассы
- `:hover` - при наведении
- `:active` - при клике
- `:focus` - при фокусе
- `:first-child` - первый потомок
- `:last-child` - последний потомок
- `:nth-child(n)` - n-й потомок

### Псевдоэлементы
- `::before` - контент перед элементом
- `::after` - контент после элемента

---

## JavaScript - Интерактивность {#javascript}

JavaScript - язык программирования для добавления интерактивности на веб-страницы.

### Подключение JavaScript

1. **Внешний файл** (рекомендуется):
```html
<script src="script.js"></script>
```

2. **Внутри HTML**:
```html
<script>
    // JavaScript код
</script>
```

### Переменные

```javascript
// let - можно изменять
let name = "Иван";
name = "Петр";

// const - константа, нельзя изменить
const pi = 3.14;

// var - устаревший способ (не рекомендуется)
var oldWay = "старый способ";
```

### Типы данных

```javascript
// Строки
let text = "Привет";
let text2 = 'Мир';

// Числа
let number = 42;
let float = 3.14;

// Булевы значения
let isTrue = true;
let isFalse = false;

// Массивы
let fruits = ["яблоко", "банан", "апельсин"];
let numbers = [1, 2, 3, 4, 5];

// Объекты
let person = {
    name: "Иван",
    age: 30,
    city: "Москва"
};

// null и undefined
let empty = null;
let notDefined = undefined;
```

### Операторы

```javascript
// Арифметические
let sum = 5 + 3;      // 8
let diff = 10 - 4;   // 6
let mult = 3 * 4;    // 12
let div = 15 / 3;    // 5
let mod = 10 % 3;    // 1 (остаток)

// Сравнения
5 > 3;   // true
5 < 3;   // false
5 >= 5;  // true
5 <= 3;  // false
5 === 5; // true (строгое сравнение)
5 !== 3; // true

// Логические
true && false;  // false (И)
true || false;  // true (ИЛИ)
!true;          // false (НЕ)
```

### Условия

```javascript
// if/else
if (age >= 18) {
    console.log("Совершеннолетний");
} else {
    console.log("Несовершеннолетний");
}

// else if
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else {
    grade = "C";
}

// Тернарный оператор
let status = age >= 18 ? "взрослый" : "ребенок";

// switch
switch (day) {
    case 1:
        console.log("Понедельник");
        break;
    case 2:
        console.log("Вторник");
        break;
    default:
        console.log("Другой день");
}
```

### Циклы

```javascript
// for
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// while
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// for...of (для массивов)
let fruits = ["яблоко", "банан", "апельсин"];
for (let fruit of fruits) {
    console.log(fruit);
}

// forEach (метод массива)
fruits.forEach(function(fruit) {
    console.log(fruit);
});
```

### Функции

```javascript
// Обычная функция
function greet(name) {
    return "Привет, " + name + "!";
}

// Стрелочная функция
const greet2 = (name) => {
    return "Привет, " + name + "!";
};

// Короткая форма стрелочной функции
const greet3 = name => "Привет, " + name + "!";

// Вызов функции
greet("Иван");
```

#### Отличия стрелочных функций от обычных

**1. Синтаксис**
```javascript
// Обычная функция
function multiply(a, b) {
    return a * b;
}

// Стрелочная функция (полная форма)
const multiply2 = (a, b) => {
    return a * b;
};

// Стрелочная функция (короткая форма для одного выражения)
const multiply3 = (a, b) => a * b;
```

**2. Контекст `this` (самое важное отличие!)**
```javascript
// Обычная функция имеет свой this
const person = {
    name: "Иван",
    greet: function() {
        console.log("Привет, " + this.name); // this указывает на person
    }
};

// Стрелочная функция НЕ имеет своего this, берет из внешней области
const person2 = {
    name: "Иван",
    greet: () => {
        console.log("Привет, " + this.name); // this будет undefined или window
    }
};

// Правильное использование стрелочной функции для сохранения this
const person3 = {
    name: "Иван",
    hobbies: ["чтение", "спорт"],
    showHobbies: function() {
        // Стрелочная функция сохраняет this из showHobbies
        this.hobbies.forEach(hobby => {
            console.log(this.name + " любит " + hobby);
        });
    }
};
```

**3. Объект `arguments`**
```javascript
// Обычная функция имеет arguments
function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

// Стрелочная функция НЕ имеет arguments
// Вместо этого используйте rest-параметры
const sum2 = (...numbers) => {
    return numbers.reduce((acc, num) => acc + num, 0);
};
```

**4. Использование как конструктор**
```javascript
// Обычную функцию можно использовать как конструктор
function Person(name) {
    this.name = name;
}
const ivan = new Person("Иван"); // работает

// Стрелочную функцию НЕЛЬЗЯ использовать как конструктор
const Person2 = (name) => {
    this.name = name;
};
// const ivan2 = new Person2("Иван"); // ОШИБКА!
```

**5. Hoisting (поднятие)**
```javascript
// Обычную функцию можно вызвать до объявления
sayHello(); // работает!

function sayHello() {
    console.log("Привет");
}

// Стрелочную функцию нельзя вызвать до объявления
// sayHello2(); // ОШИБКА!

const sayHello2 = () => {
    console.log("Привет");
};
```

**6. Методы объекта**
```javascript
const calculator = {
    a: 10,
    b: 5,
    
    // Обычная функция - this работает
    add: function() {
        return this.a + this.b; // 15
    },
    
    // Стрелочная функция - this НЕ работает
    subtract: () => {
        return this.a - this.b; // undefined - undefined = NaN
    }
};
```

**Когда использовать что?**

- **Обычные функции** (`function`):
  - Методы объектов (когда нужен `this`)
  - Конструкторы классов
  - Когда нужен `arguments`
  - Когда важна читаемость старого стиля

- **Стрелочные функции** (`=>`):
  - Колбэки (map, filter, forEach, addEventListener)
  - Когда нужно сохранить `this` из внешней области
  - Короткие одноразовые функции
  - Современный синтаксис ES6+

```javascript
// Примеры использования стрелочных функций
const numbers = [1, 2, 3, 4, 5];

// map, filter, forEach - идеально для стрелочных функций
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
numbers.forEach(n => console.log(n));

// Обработчики событий
button.addEventListener('click', () => {
    console.log('Кнопка нажата');
});
```

### Работа с DOM (Document Object Model)

DOM - это представление HTML документа в виде дерева объектов.

#### Поиск элементов

```javascript
// По ID
let element = document.getElementById("myId");

// По классу (возвращает первый элемент)
let element = document.querySelector(".myClass");

// По классу (возвращает все элементы)
let elements = document.querySelectorAll(".myClass");

// По тегу
let paragraphs = document.getElementsByTagName("p");
```

#### Изменение содержимого

```javascript
// Изменить текст
element.textContent = "Новый текст";

// Изменить HTML
element.innerHTML = "<strong>Жирный текст</strong>";

// Изменить атрибут
element.setAttribute("class", "new-class");
element.className = "new-class";
element.id = "new-id";
```

#### Изменение стилей

```javascript
element.style.color = "red";
element.style.backgroundColor = "blue";
element.style.fontSize = "20px";
```

#### Создание и удаление элементов

```javascript
// Создать элемент
let newDiv = document.createElement("div");
newDiv.textContent = "Новый элемент";
newDiv.className = "my-class";

// Добавить в DOM
parentElement.appendChild(newDiv);

// Удалить элемент
element.remove();
```

### События

События - это действия пользователя или браузера (клик, наведение, загрузка страницы и т.д.).

```javascript
// Добавить обработчик события
element.addEventListener("click", function() {
    console.log("Клик!");
});

// Стрелочная функция
element.addEventListener("click", () => {
    console.log("Клик!");
});

// С именованной функцией
function handleClick() {
    console.log("Клик!");
}
element.addEventListener("click", handleClick);
```

#### Популярные события

- `click` - клик мышью
- `dblclick` - двойной клик
- `mouseenter` - наведение мыши
- `mouseleave` - уход мыши
- `keydown` - нажатие клавиши
- `keyup` - отпускание клавиши
- `submit` - отправка формы
- `change` - изменение значения
- `input` - ввод в поле
- `load` - загрузка элемента
- `DOMContentLoaded` - загрузка DOM

#### Пример с формой

```javascript
let form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвратить отправку формы
    
    let input = document.querySelector("input");
    console.log(input.value);
});
```

### Массивы - полезные методы

```javascript
let numbers = [1, 2, 3, 4, 5];

// map - преобразовать каждый элемент
let doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter - отфильтровать элементы
let evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// find - найти первый элемент
let found = numbers.find(n => n > 3); // 4

// forEach - выполнить действие для каждого
numbers.forEach(n => console.log(n));

// reduce - свернуть массив в одно значение
let sum = numbers.reduce((acc, n) => acc + n, 0); // 15
```

### Объекты

```javascript
let person = {
    name: "Иван",
    age: 30,
    city: "Москва"
};

// Доступ к свойствам
person.name;        // "Иван"
person["age"];      // 30

// Изменить свойство
person.age = 31;

// Добавить свойство
person.email = "ivan@example.com";

// Удалить свойство
delete person.city;
```

---

## Объединение всего вместе {#объединение}

### Структура проекта

```
проект/
├── index.html      # HTML разметка
├── styles.css      # CSS стили
└── script.js       # JavaScript код
```

### Порядок изучения

1. **HTML** - сначала изучаем структуру и теги
2. **CSS** - затем добавляем стили
3. **JavaScript** - в конце добавляем интерактивность

### Лучшие практики

1. **Семантический HTML** - используйте правильные теги по назначению
2. **Разделение кода** - HTML, CSS и JS в отдельных файлах
3. **Комментарии** - комментируйте сложный код
4. **Валидация** - проверяйте HTML и CSS на ошибки
5. **Адаптивность** - делайте сайты для разных размеров экрана
6. **Доступность** - используйте alt для изображений, правильные теги для форм

### Следующие шаги!

После освоения основ:
- CSS Framework (Bootstrap, Tailwind)
- Препроцессоры (SASS, LESS)
- Современный JavaScript (ES6+)
- Сборщики (Webpack, Vite)
- Фреймворки (React, Vue, Angular)

---

## Полезные ресурсы

- [MDN Web Docs](https://developer.mozilla.org/ru/) - лучшая документация
- [Can I Use](https://caniuse.com/) - совместимость функций браузеров
- [CSS-Tricks](https://css-tricks.com/) - статьи и примеры CSS
- [JavaScript.info](https://javascript.info/ru) - современный учебник по JavaScript

