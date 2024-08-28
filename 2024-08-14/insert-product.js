const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const data = [
    {
    name: 'Chapinha',
    description: 'Chapinha original',
    preco: 550.90,
    stock: 79,
    assessment: 4.8
    },

    {
    name: 'Vinil Taylor Swift Fearless',
    description: 'Vinil Taylor Swift Fearless',
    preco: 150.99,
    stock: 37,
    assessment: 4.9
    },

    {
    name: 'Camisa One Direction',
    description: 'Merch 2014 original',
    preco: 150.90,
    stock: 30,
    assessment: 4.7
    },

    {
    name: 'Salto Laubotain ',
    description: 'Salto Laubotain replica',
    preco: 999.90,
    stock: 70,
    assessment: 4.5
    },

    {
    name: 'Copo Stanley',
    description: 'Copo térmico personalizado',
    preco: 200.90,
    stock: 19,
    assessment: 3.8
    }
  ];

  await prisma.product.createMany({ data });
  console.log("Usuário cadastrado com sucesso!");

  const product = await prisma.product.findMany();
  console.log(product);
}

main();