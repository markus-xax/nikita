// Пример 5: Манипуляции с DOM

document.addEventListener('DOMContentLoaded', function() {
    // ========== СОЗДАНИЕ И ДОБАВЛЕНИЕ ЭЛЕМЕНТОВ ==========
    const newItemInput = document.getElementById('newItemInput');
    const addItemBtn = document.getElementById('addItemBtn');
    const itemsContainer = document.getElementById('itemsContainer');

    addItemBtn.addEventListener('click', function() {
        const text = newItemInput.value.trim();
        if (text === '') {
            alert('Введите текст!');
            return;
        }

        // Создаем новый элемент
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.textContent = text;

        // Добавляем в контейнер
        itemsContainer.appendChild(newItem);

        // Очищаем поле ввода
        newItemInput.value = '';
    });

    // Добавление по Enter
    newItemInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addItemBtn.click();
        }
    });

    // ========== ИЗМЕНЕНИЕ СТИЛЕЙ ==========
    const styleBox = document.getElementById('styleBox');
    const changeColorBtn = document.getElementById('changeColorBtn');
    const changeSizeBtn = document.getElementById('changeSizeBtn');
    const toggleBorderBtn = document.getElementById('toggleBorderBtn');
    const resetStyleBtn = document.getElementById('resetStyleBtn');

    const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    let colorIndex = 0;
    let fontSize = 18;

    changeColorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        styleBox.style.color = colors[colorIndex];
        styleBox.style.backgroundColor = colors[colorIndex] + '20';
    });

    changeSizeBtn.addEventListener('click', function() {
        fontSize = fontSize === 18 ? 24 : fontSize === 24 ? 30 : 18;
        styleBox.style.fontSize = fontSize + 'px';
    });

    toggleBorderBtn.addEventListener('click', function() {
        if (styleBox.style.border) {
            styleBox.style.border = '';
        } else {
            styleBox.style.border = '5px solid #667eea';
        }
    });

    resetStyleBtn.addEventListener('click', function() {
        styleBox.style.color = '';
        styleBox.style.backgroundColor = '';
        styleBox.style.fontSize = '';
        styleBox.style.border = '';
        colorIndex = 0;
        fontSize = 18;
    });

    // ========== РАБОТА С КЛАССАМИ ==========
    const classBox = document.getElementById('classBox');
    const addClassBtn = document.getElementById('addClassBtn');
    const removeClassBtn = document.getElementById('removeClassBtn');
    const toggleClassBtn = document.getElementById('toggleClassBtn');

    const classList = ['default', 'highlighted', 'success', 'danger'];
    let currentClassIndex = 0;

    addClassBtn.addEventListener('click', function() {
        // Удаляем все классы
        classBox.className = 'class-box';
        // Добавляем следующий класс
        currentClassIndex = (currentClassIndex + 1) % classList.length;
        classBox.classList.add(classList[currentClassIndex]);
    });

    removeClassBtn.addEventListener('click', function() {
        // Удаляем текущий класс
        if (classBox.classList.length > 1) {
            const currentClass = Array.from(classBox.classList).find(c => c !== 'class-box');
            if (currentClass) {
                classBox.classList.remove(currentClass);
            }
        }
    });

    toggleClassBtn.addEventListener('click', function() {
        // Переключаем класс highlighted
        classBox.classList.toggle('highlighted');
    });

    // ========== РАБОТА С АТРИБУТАМИ ==========
    const dynamicImage = document.getElementById('dynamicImage');
    const changeSrcBtn = document.getElementById('changeSrcBtn');
    const changeAltBtn = document.getElementById('changeAltBtn');
    const toggleHiddenBtn = document.getElementById('toggleHiddenBtn');

    const images = [
        { src: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Изображение+1', alt: 'Изображение 1' },
        { src: 'https://via.placeholder.com/300x200/f093fb/ffffff?text=Изображение+2', alt: 'Изображение 2' },
        { src: 'https://via.placeholder.com/300x200/4facfe/ffffff?text=Изображение+3', alt: 'Изображение 3' },
        { src: 'https://via.placeholder.com/300x200/43e97b/ffffff?text=Изображение+4', alt: 'Изображение 4' }
    ];
    let imageIndex = 0;

    changeSrcBtn.addEventListener('click', function() {
        imageIndex = (imageIndex + 1) % images.length;
        dynamicImage.setAttribute('src', images[imageIndex].src);
        dynamicImage.setAttribute('alt', images[imageIndex].alt);
    });

    changeAltBtn.addEventListener('click', function() {
        const newAlt = prompt('Введите новый текст для alt:', dynamicImage.getAttribute('alt'));
        if (newAlt !== null) {
            dynamicImage.setAttribute('alt', newAlt);
        }
    });

    toggleHiddenBtn.addEventListener('click', function() {
        dynamicImage.classList.toggle('hidden');
    });

    // ========== РАБОТА С СОДЕРЖИМЫМ ==========
    const contentBox = document.getElementById('contentBox');
    const contentInput = document.getElementById('contentInput');
    const changeTextBtn = document.getElementById('changeTextBtn');
    const changeHtmlBtn = document.getElementById('changeHtmlBtn');

    changeTextBtn.addEventListener('click', function() {
        const text = contentInput.value.trim();
        if (text === '') {
            alert('Введите текст!');
            return;
        }
        // textContent - безопасно, только текст
        contentBox.textContent = text;
    });

    changeHtmlBtn.addEventListener('click', function() {
        const html = contentInput.value.trim();
        if (html === '') {
            alert('Введите HTML!');
            return;
        }
        // innerHTML - может содержать HTML теги
        contentBox.innerHTML = html;
    });

    // ========== УДАЛЕНИЕ ЭЛЕМЕНТОВ ==========
    const removableContainer = document.getElementById('removableContainer');
    const removeButtons = document.querySelectorAll('.remove-btn');

    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Удаляем родительский элемент (removable-item)
            this.parentElement.remove();
        });
    });

    // Также можно добавлять новые удаляемые элементы динамически
    // (добавьте кнопку "Добавить элемент" если нужно)
});

