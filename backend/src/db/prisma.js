const { PrismaClient } = require('@prisma/client');

// Создаем единственный экземпляр Prisma Client
// В продакшене это важно для избежания множественных подключений
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Обработка graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
