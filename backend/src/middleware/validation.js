const { ValidationError } = require('../utils/errors');

/**
 * Middleware для валидации создания задачи
 * Проверяет, что поле 'text' существует и является непустой строкой
 */
const validateCreateTodo = (req, res, next) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim() === '') {
    throw new ValidationError("Поле 'text' обязательно и должно быть непустой строкой");
  }

  // Нормализуем данные (убираем пробелы)
  req.body.text = text.trim();
  next();
};

/**
 * Middleware для валидации обновления задачи
 * Проверяет, что переданные поля имеют правильные типы
 */
const validateUpdateTodo = (req, res, next) => {
  const { text, completed } = req.body;

  // Проверяем, что хотя бы одно поле передано
  if (text === undefined && completed === undefined) {
    throw new ValidationError('Необходимо передать хотя бы одно поле для обновления (text или completed)');
  }

  // Валидация text
  if (text !== undefined) {
    if (typeof text !== 'string' || text.trim() === '') {
      throw new ValidationError("Поле 'text' должно быть непустой строкой");
    }
    req.body.text = text.trim(); // Нормализуем
  }

  // Валидация completed
  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      throw new ValidationError("Поле 'completed' должно быть булевым значением");
    }
  }

  next();
};

/**
 * Middleware для валидации ID в параметрах
 * Проверяет, что ID является числом
 */
const validateTodoId = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    throw new ValidationError('ID должен быть положительным числом');
  }

  req.params.id = id; // Сохраняем нормализованный ID
  next();
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  validateTodoId,
};

