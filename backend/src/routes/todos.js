const express = require('express');
const router = express.Router();

// Импортируем middleware для валидации
const {
  validateCreateTodo,
  validateUpdateTodo,
  validateTodoId,
} = require('../middleware/validation');

// Импортируем контроллеры (бизнес-логика)
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todosController');

// GET /todos - получить все задачи
router.get('/', getAllTodos);

// POST /todos - создать новую задачу
// Сначала валидация, потом контроллер
router.post('/', validateCreateTodo, createTodo);

// GET /todos/:id - получить задачу по ID
// Сначала валидация ID, потом контроллер
router.get('/:id', validateTodoId, getTodoById);

// PUT /todos/:id - обновить задачу
// Сначала валидация ID и данных, потом контроллер
router.put('/:id', validateTodoId, validateUpdateTodo, updateTodo);

// DELETE /todos/:id - удалить задачу
// Сначала валидация ID, потом контроллер
router.delete('/:id', validateTodoId, deleteTodo);

module.exports = router;



