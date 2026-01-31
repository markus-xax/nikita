const { NotFoundError } = require('../utils/errors');
const prisma = require('../db/prisma');
const { getCache, setCache, deleteCache, deleteCachePattern } = require('../db/redis');

// Ключи для кеширования
const CACHE_KEYS = {
  allTodos: 'todos:all',
  todoById: (id) => `todos:${id}`,
  todosPattern: 'todos:*',
};

/**
 * Получить все задачи
 * Использует Redis для кеширования списка задач
 */
const getAllTodos = async (req, res) => {
  try {
    // Пытаемся получить из кеша
    const cacheKey = CACHE_KEYS.allTodos;
    const cachedTodos = await getCache(cacheKey);
    
    if (cachedTodos) {
      console.log('📦 Данные получены из Redis кеша');
      return res.json(cachedTodos);
    }

    // Если нет в кеше, получаем из БД через Prisma
    console.log('💾 Запрос к PostgreSQL через Prisma');
    const todos = await prisma.todo.findMany({
      orderBy: { id: 'asc' },
    });

    // Сохраняем в кеш на 5 минут (300 секунд)
    await setCache(cacheKey, todos, 300);

    res.json(todos);
  } catch (error) {
    console.error('Ошибка при получении задач:', error);
    throw error;
  }
};

/**
 * Получить задачу по ID
 * Использует Redis для кеширования отдельной задачи
 */
const getTodoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Пытаемся получить из кеша
    const cacheKey = CACHE_KEYS.todoById(id);
    const cachedTodo = await getCache(cacheKey);
    
    if (cachedTodo) {
      console.log(`📦 Задача #${id} получена из Redis кеша`);
      return res.json(cachedTodo);
    }

    // Если нет в кеше, получаем из БД через Prisma
    console.log(`💾 Запрос к PostgreSQL через Prisma для задачи #${id}`);
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      throw new NotFoundError('Задача не найдена');
    }

    // Сохраняем в кеш на 10 минут (600 секунд)
    await setCache(cacheKey, todo, 600);

    res.json(todo);
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Ошибка при получении задачи:', error);
    throw error;
  }
};

/**
 * Создать новую задачу
 * После создания инвалидирует кеш списка задач
 */
const createTodo = async (req, res) => {
  try {
    const { text } = req.body; // text уже валидирован и нормализован в middleware

    // Создаем задачу через Prisma
    console.log('💾 Создание задачи через Prisma');
    const newTodo = await prisma.todo.create({
      data: {
        text,
        completed: false,
      },
    });

    // Инвалидируем кеш списка всех задач
    await deleteCache(CACHE_KEYS.allTodos);
    console.log('🗑️  Кеш списка задач очищен');

    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    throw error;
  }
};

/**
 * Обновить задачу
 * После обновления инвалидирует кеш конкретной задачи и списка
 */
const updateTodo = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { text, completed } = req.body;

    // Собираем данные для обновления
    const updateData = {};
    if (text !== undefined) {
      updateData.text = text; // text уже валидирован в middleware
    }
    if (completed !== undefined) {
      updateData.completed = completed; // completed уже валидирован в middleware
    }

    if (Object.keys(updateData).length === 0) {
      // Если нет полей для обновления, просто возвращаем текущую задачу
      const todo = await prisma.todo.findUnique({
        where: { id },
      });
      if (!todo) {
        throw new NotFoundError('Задача не найдена');
      }
      return res.json(todo);
    }

    // Обновляем через Prisma
    console.log(`💾 Обновление задачи #${id} через Prisma`);
    const todo = await prisma.todo.update({
      where: { id },
      data: updateData,
    });

    // Инвалидируем кеш конкретной задачи и списка
    await deleteCache(CACHE_KEYS.todoById(id));
    await deleteCache(CACHE_KEYS.allTodos);
    console.log(`🗑️  Кеш задачи #${id} и списка очищен`);

    res.json(todo);
  } catch (error) {
    if (error.code === 'P2025') {
      // Prisma ошибка "Record not found"
      throw new NotFoundError('Задача не найдена');
    }
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Ошибка при обновлении задачи:', error);
    throw error;
  }
};

/**
 * Удалить задачу
 * После удаления инвалидирует кеш конкретной задачи и списка
 */
const deleteTodo = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Удаляем через Prisma
    console.log(`💾 Удаление задачи #${id} через Prisma`);
    const todo = await prisma.todo.delete({
      where: { id },
    }).catch((error) => {
      if (error.code === 'P2025') {
        // Prisma ошибка "Record not found"
        throw new NotFoundError('Задача не найдена');
      }
      throw error;
    });

    // Инвалидируем кеш конкретной задачи и списка
    await deleteCache(CACHE_KEYS.todoById(id));
    await deleteCache(CACHE_KEYS.allTodos);
    console.log(`🗑️  Кеш задачи #${id} и списка очищен`);

    res.status(204).send(); // 204 No Content
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Ошибка при удалении задачи:', error);
    throw error;
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};

