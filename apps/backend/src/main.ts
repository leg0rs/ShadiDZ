import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CountriesModule } from './countries/country.module';

async function bootstrap() {
	const app = await NestFactory.create(CountriesModule);

	const config = new DocumentBuilder()
		.setTitle('Legors API')
		.setDescription('Legors API description')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document, {
		jsonDocumentUrl: 'api/docs',
	});

	await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
