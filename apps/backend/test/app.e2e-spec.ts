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
				expect(res.body).toBeInstanceOf(Array);
				expect(res.body.length).toBe(1);
				expect(res.body[0]).toHaveProperty('cca2', 'AW');
				expect(res.body[0]).toHaveProperty('cca3', 'ABW');
			});
	});
});
