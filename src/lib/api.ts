/**
 * API клиент для работы с бэкендом
 * 
 * Этот модуль содержит функции для взаимодействия с REST API бэкенда.
 * Все функции возвращают Promise и обрабатывают ошибки HTTP запросов.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface CreateTodoDto {
  text: string;
}

export interface UpdateTodoDto {
  text?: string;
  completed?: boolean;
}

/**
 * Обработка ошибок HTTP запросов
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'Unknown Error',
      message: `HTTP ${response.status}: ${response.statusText}`,
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Получить все задачи
 * GET /todos
 */
export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos`);
  return handleResponse<Todo[]>(response);
}

/**
 * Получить задачу по ID
 * GET /todos/:id
 */
export async function getTodoById(id: number): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`);
  return handleResponse<Todo>(response);
}

/**
 * Создать новую задачу
 * POST /todos
 */
export async function createTodo(data: CreateTodoDto): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Todo>(response);
}

/**
 * Обновить задачу
 * PUT /todos/:id
 */
export async function updateTodo(
  id: number,
  data: UpdateTodoDto,
): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<Todo>(response);
}

/**
 * Удалить задачу
 * DELETE /todos/:id
 */
export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP ${response.status}: ${response.statusText}`,
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
}
