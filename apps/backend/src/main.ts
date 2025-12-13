import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CountriesModule } from './countries/country.module';

async function bootstrap() {
	const app = await NestFactory.create(CountriesModule);

	app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

	const config = new DocumentBuilder()
		.setTitle('Legors API')
		.setDescription('Legors API description')
		.setVersion('1.0')
		.build();

	app.enableCors({
		origin: [
			'http://localhost:3000',
			'https://legors.com',
			process.env.FRONTEND_URL || 'http://localhost:3000',
		],
		credentials: true,
	});

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document, {
		jsonDocumentUrl: 'api/docs',
	});

	await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
