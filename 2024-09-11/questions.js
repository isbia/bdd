const { PrismaClient } = require('@prisma/client');
const faker = require('faker');

const prisma = new PrismaClient();

const generateRandomUsers = async (count) => {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    users.push({
      userName: faker.internet.userName(),
      status: faker.random.arrayElement(['online', 'offline', 'ocupado', 'na escola', 'no trabalho']),
      birthDate: faker.date.past(30, new Date('2004-01-01')), // Aniversários para usuários de até 30 anos
      city: faker.address.city(),
      state: faker.address.stateAbbr(), // Usa abreviações para estados
      region: faker.address.state(), // Usa nomes de estados para regiões
      phone: faker.phone.phoneNumber(),
      avatar: faker.image.avatar() || null, // Imagem de avatar pode ser null
      bio: faker.lorem.sentence(),
      createdAt: faker.date.past(1) // Cadastro dentro do último ano
    });
  }
  
  await prisma.user.createMany({ data: users });
};

const runQueries = async () => {
  try {
    // Gera 1000 usuários aleatórios
    await generateRandomUsers(1000);
    
    // Selecionar todos os usuários que estão Online
    const onlineUsers = await prisma.user.findMany({
      where: {
        status: 'online'
      }
    });
    console.log('Online Users:', onlineUsers);
    
    // Selecionar um usuário pelo seu "userName" único
    const userName = 'usuarioUnico'; 
    const user = await prisma.user.findUnique({
      where: {
        userName: userName
      }
    });
    console.log('User by userName:', user);
    
    // Selecionar todos os usuários que foram cadastrados no último mês
    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(now.getMonth() - 1);

    const newUsers = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: lastMonth,
          lte: now
        }
      }
    });
    console.log('New Users:', newUsers);

    // Selecionar todos os usuários que fazem aniversário no mês atual
    const currentMonth = now.getMonth() + 1; // Prisma usa 1-indexed meses, por isso +1
    const allUsers = await prisma.user.findMany();
    const usersWithBirthdayThisMonth = allUsers.filter(user => {
      const birthMonth = new Date(user.birthDate).getMonth() + 1;
      return birthMonth === currentMonth;
    });
    console.log('Users with Birthday This Month:', usersWithBirthdayThisMonth);

    // Selecionar todos os usuários de "São Paulo"
    const usersFromSaoPaulo = await prisma.user.findMany({
      where: {
        city: 'São Paulo'
      }
    });
    console.log('Users from São Paulo:', usersFromSaoPaulo);

    // Selecionar todos os usuários da região Sudeste (Rio de Janeiro, São Paulo, Minas Gerais e Espírito Santo)
    const sudesteStates = ['RJ', 'SP', 'MG', 'ES']; // Usando abreviações dos estados
    const usersFromSudeste = await prisma.user.findMany({
      where: {
        state: {
          in: sudesteStates
        }
      }
    });
    console.log('Users from Sudeste:', usersFromSudeste);

    // Selecionar todos os usuários que possuem telefone
    const usersWithPhone = await prisma.user.findMany({
      where: {
        phone: {
          not: null
        }
      }
    });
    console.log('Users with Phone:', usersWithPhone);

    // Selecionar todos os usuários que não possuem imagem de avatar
    const usersWithoutAvatar = await prisma.user.findMany({
      where: {
        avatar: {
          equals: null
        }
      }
    });
    console.log('Users without Avatar:', usersWithoutAvatar);

    // Selecionar todos os usuários que a biografia contém uma palavra específica (algum hobbie)
    const hobby = 'futebol'; // Substitua pela palavra ou hobby que deseja buscar
    const usersWithHobby = await prisma.user.findMany({
      where: {
        bio: {
          contains: hobby,
          mode: 'insensitive' // Opcional, para busca case-insensitive
        }
      }
    });
    console.log('Users with Hobby:', usersWithHobby);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Executa as consultas
runQueries();
