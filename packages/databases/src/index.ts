import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Создаем пул соединений PostgreSQL
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Создаем адаптер Prisma
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // <--- ЭТО САМОЕ ГЛАВНОЕ В PRISMA 7
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;