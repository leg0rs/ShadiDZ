// packages/database/prisma.config.ts
import { config } from 'dotenv';
import { resolve } from 'path';
import { defineConfig, env } from 'prisma/config';

// БЫЛО: resolve(__dirname, '../../.env')
// СТАЛО: (ищем в текущей папке)
config({ path: resolve(__dirname, '.env') });

export default defineConfig({
	// ... остальное без изменений
	datasource: {
		url: env('DATABASE_URL'),
	},
});
