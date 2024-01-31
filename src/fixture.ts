import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const dataSource = app.get<DataSource>(getDataSourceToken());
  await dataSource.synchronize(true);

  const productRepo = dataSource.getRepository('Product');
  await productRepo.insert([
    {
      id: '091191ba-1225-42f2-a4ae-2fe77e154b93',
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      image_url: 'https://picsum.photos/200/300',
    },
    {
      id: '64187b5b-8471-4ea3-9235-13f33823852b',
      name: 'Product 2',
      description: 'Product 2 description',
      price: 120,
      image_url: 'https://picsum.photos/200/300',
    },
    {
      id: 'ac15ac77-d146-43ad-bc82-3152c03d37c3',
      name: 'Product 3',
      description: 'Product 3 description',
      price: 130,
      image_url: 'https://picsum.photos/200/300',
    },
    {
      id: 'aabffb1b-8c92-4730-8f1f-1f3c0a71ac01',
      name: 'Product 4',
      description: 'Product 4 description',
      price: 140,
      image_url: 'https://picsum.photos/200/300',
    },
    {
      id: 'b0eb1d3d-c787-4a15-99ad-d74ed4e3b540',
      name: 'Product 5',
      description: 'Product 5 description',
      price: 500,
      image_url: 'https://picsum.photos/200/300',
    },
    {
      id: '3933af0e-8ba0-4523-b114-411107595fac',
      name: 'Product 6',
      description: 'Product 6 description',
      price: 600,
      image_url: 'https://picsum.photos/200/300',
    },
    {
      id: '411b49a0-77d4-4cf8-817a-01e279274bdf',
      name: 'Product 7',
      description: 'Product 7 description',
      price: 700,
      image_url: 'https://picsum.photos/200/300',
    },
    {
      id: 'f912d633-d252-43f1-8087-f0375727cc57',
      name: 'Product 8',
      description: 'Product 8 description',
      price: 800,
      image_url: 'https://picsum.photos/200/300',
    },
    {
      id: 'e221945d-1e4f-45c7-be02-2fa65de831b6',
      name: 'Product 9',
      description: 'Product 9 description',
      price: 900,
      image_url: 'https://picsum.photos/200/300',
    },
    {
      id: '00e49c4c-6a09-4dbc-b975-15d1f8e3f5f1',
      name: 'Product 10',
      description: 'Product 10 description',
      price: 1000,
      image_url: 'https://picsum.photos/200/300',
    },
  ]);

  await app.close();
}
bootstrap();
