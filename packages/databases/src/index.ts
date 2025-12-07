import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

// 1. Создаем пул соединений PostgreSQL
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Создаем адаптер Prisma
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as {
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	prisma: PrismaClient | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const prisma =
	globalForPrisma.prisma ??
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	new PrismaClient({
		adapter, // <--- ЭТО САМОЕ ГЛАВНОЕ В PRISMA 7
		log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
	});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
