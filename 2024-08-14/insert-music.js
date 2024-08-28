const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const data = [
    {
    title: 'Wildest Dreams',
    artists: 'Taylor Swift',
    album: '1989 (Taylors Version)',
    genres: 'Pop',
    single: true,
    release: 2021,
    duration: new Date('2024-08-14T00:03:04Z').toISOString(),
    },

    {
    title: 'Anti Hero',
    artists: 'Taylor Swift',
    album: 'Midnights ',
    genres: 'Pop',
    single: true,
    release: 2022,
    duration: new Date('2024-08-14T00:03:28Z').toISOString(),
    },

    {
    title: 'Fine Line',
    artists: "Harry Styles",
    album: 'Fine Line',
    genres: 'Pop',
    single: false,
    release: 2020,
    duration: new Date('2024-08-14T00:06:38Z').toISOString(),
    },

    {
    title: 'Tiempo de Amor',
    artists: 'Sou Luna Cast',
    album: 'Modo Amor',
    genres: 'Pop latino',
    single: true,
    release: 2019,
    duration: new Date('2024-08-14T00:04:19Z').toISOString(),
    },

    {
    title: 'Quédate',
    artists: 'Sou Luna Cast',
    album: 'Modo Amar',
    genres: 'Pop latino',
    single: false,
    release: 2019,
    duration: new Date('2024-08-14T00:03:38Z').toISOString(),
    }
  ];

  await prisma.music.createMany({ data });
  console.log("Música cadastrada com sucesso!");

  const music = await prisma.music.findMany();
  console.log(music);
}

main();