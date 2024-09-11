const { PrismaClient } = require('@prisma/client');
const faker = require('@faker-js/faker');

const prisma = new PrismaClient();

async function seedAndQuery() {
  const data = Array.from({ length: 1000 }, () => {
    const fullName = faker.person.fullName();
    const birthDate = faker.date.birthdate({
      minAge: 14,
      maxAge: 30,
      mode: 'age',
    });
    const status = faker.helpers.arrayElement(["online", "offline"]);
    const userName = faker.internet.userName({ firstName: fullName });
    const city = faker.location.city();
    const region = faker.location.state();
    const phone = faker.phone.number();
    const avatar = faker.helpers.maybe(() => faker.image.avatar(), 0.97);
    const bio = faker.helpers.maybe(() => faker.lorem.sentence(), 0.5);
    const createdAt = faker.date.past({ years: 1 });

    return {
      status: faker.helpers.arrayElement(['online', 'offline', 'busy', 'at school', 'at work']),
      userName,
      birthDate,
      city,
      region,
      phone,
      avatar,
      bio,
      createdAt,
    };
  });

  await prisma.user.createMany({ data, skipDuplicates: true });

 
 

  
  const userName = 'exampleUserName'; 
  const user = await prisma.user.findUnique({
    where: { userName: userName },
  });
  console.log('User with specific userName:', user);

 
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const recentUsers = await prisma.user.findMany({
    where: { createdAt: { gte: oneMonthAgo } },
  });
  console.log('Users registered in the last month:', recentUsers);

  const now = new Date();
  const currentMonth = now.getMonth() + 1; 
  const usersWithBirthdayThisMonth = await prisma.user.findMany({
    where: {
      birthDate: {
        gte: new Date(now.getFullYear(), currentMonth - 1, 1),
        lt: new Date(now.getFullYear(), currentMonth, 1),
      },
    },
  });
  console.log('Users with birthdays this month:', usersWithBirthdayThisMonth);


  const usersFromSaoPaulo = await prisma.user.findMany({
    where: { city: 'São Paulo' },
  });
  console.log('Users from São Paulo:', usersFromSaoPaulo);


  const southeastUsers = await prisma.user.findMany({
    where: {
      region: {
        in: ['Rio de Janeiro', 'São Paulo', 'Minas Gerais', 'Espírito Santo'],
      },
    },
  });
  console.log('Users from Southeast region:', southeastUsers);


  const usersWithPhone = await prisma.user.findMany({
    where: { phone: { not: null } },
  });
  console.log('Users with phone numbers:', usersWithPhone);


  const usersWithoutAvatar = await prisma.user.findMany({
    where: { avatar: { equals: null } },
  });
  console.log('Users without avatars:', usersWithoutAvatar);


  const hobbyKeyword = 'hiking'; 
  const usersWithHobbyInBio = await prisma.user.findMany({
    where: { bio: { contains: hobbyKeyword, mode: 'insensitive' } },
  });
  console.log('Users with specific hobby in bio:', usersWithHobbyInBio);
}

seedAndQuery()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  
seed();