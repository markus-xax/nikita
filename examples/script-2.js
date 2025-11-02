// Пример 2: Работа с формами в JavaScript

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const resultSection = document.getElementById('result');
    const formDataDiv = document.getElementById('formData');

    // Обработчик отправки формы
    form.addEventListener('submit', function(event) {
        // Предотвращаем стандартную отправку формы
        event.preventDefault();

        // Получаем данные формы
        const formData = new FormData(form);
        
        // Преобразуем в объект
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Получаем выбранные радиокнопки
        const gender = document.querySelector('input[name="gender"]:checked');
        if (gender) {
            data.gender = gender.value;
        }

        // Отображаем результат
        displayFormData(data);
    });

    // Функция для отображения данных формы
    function displayFormData(data) {
        formDataDiv.innerHTML = '';

        for (let key in data) {
            const p = document.createElement('p');
            const label = getLabel(key);
            p.innerHTML = `<strong>${label}:</strong> ${data[key] || 'не указано'}`;
            formDataDiv.appendChild(p);
        }

        // Показываем секцию с результатом
        resultSection.style.display = 'block';
        
        // Прокручиваем к результату
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Функция для получения читаемых названий полей
    function getLabel(key) {
        const labels = {
            name: 'Имя',
            email: 'Email',
            password: 'Пароль',
            age: 'Возраст',
            country: 'Страна',
            bio: 'О себе',
            agree: 'Согласие',
            gender: 'Пол'
        };
        return labels[key] || key;
    }

    // Пример валидации в реальном времени
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        const email = this.value;
        if (email && !isValidEmail(email)) {
            this.style.borderColor = 'red';
            alert('Пожалуйста, введите корректный email адрес');
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });

    // Функция проверки email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

