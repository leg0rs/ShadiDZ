import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { CountriesModule } from '../src/countries/country.module';

describe('CountriesController (e2e)', () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [CountriesModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	it('/countries (GET)', () => {
		return request(app.getHttpServer())
			.get('/countries?start=1&end=1')
			.expect(200)
			.expect((res) => {
				const body = res.body as unknown[];
				expect(body).toBeInstanceOf(Array);
				expect(body.length).toBe(1);
				expect(body[0]).toHaveProperty('cca2', 'AW');
				expect(body[0]).toHaveProperty('cca3', 'ABW');
			});
	});
});
