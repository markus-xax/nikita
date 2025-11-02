// Пример 3: Интерактивная страница с JavaScript

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // ========== СЧЕТЧИК ==========
    let counter = 0;
    const counterValue = document.getElementById('counterValue');
    const increaseBtn = document.getElementById('increaseBtn');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Функция обновления счетчика
    function updateCounter() {
        counterValue.textContent = counter;
        // Добавляем анимацию
        counterValue.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterValue.style.transform = 'scale(1)';
        }, 200);
    }

    // Увеличить счетчик
    increaseBtn.addEventListener('click', function() {
        counter++;
        updateCounter();
    });

    // Уменьшить счетчик
    decreaseBtn.addEventListener('click', function() {
        counter--;
        updateCounter();
    });

    // Сбросить счетчик
    resetBtn.addEventListener('click', function() {
        counter = 0;
        updateCounter();
    });

    // ========== СПИСОК ЗАДАЧ ==========
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    let todos = [];

    // Добавить задачу
    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') {
            alert('Введите задачу!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        todos.push(todo);
        renderTodos();
        todoInput.value = '';
    }

    // Отобразить список задач
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item' + (todo.completed ? ' completed' : '');
            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn" data-id="${todo.id}">Удалить</button>
            `;
            todoList.appendChild(li);

            // Переключение выполнения
            const todoText = li.querySelector('.todo-text');
            todoText.addEventListener('click', function() {
                toggleTodo(todo.id);
            });

            // Удаление задачи
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteTodo(todo.id);
            });
        });
    }

    // Переключить выполнение задачи
    function toggleTodo(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        renderTodos();
    }

    // Удалить задачу
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }

    // События для добавления задачи
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // ========== ЦВЕТОВЫЕ ТЕМЫ ==========
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            // Удаляем все классы тем
            document.body.classList.remove('theme-dark', 'theme-blue');
            
            // Добавляем выбранную тему
            if (theme !== 'light') {
                document.body.classList.add('theme-' + theme);
            }
        });
    });

    // ========== МОДАЛЬНОЕ ОКНО ==========
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close');

    // Открыть модальное окно
    openModalBtn.addEventListener('click', function() {
        modal.classList.add('show');
    });

    // Закрыть модальное окно
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    // Закрыть при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Закрыть по клавише Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
});

