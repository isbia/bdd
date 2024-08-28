const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const data = [
    {
    complete_name: 'Camila Junqueira',
    user: 'Junqueirinha_02',
    type: 'User',
    email: 'Junqueirinha@gmail.com',
    password: '232629',
    date_birth: new Date('2005-11-13').toISOString()
    },

    {
    complete_name: 'Isabel Swift',
    user: 'swift13_89',
    type: 'User',
    email: 'SwiftiesCat@gmail.com',
    password: 'West',
    date_birth: new Date('1989-12-13').toISOString()
    },

    {
    complete_name: 'Rodrigo Faro',
    user: 'FaroFarofa',
    type: 'User',
    email: 'CRodrikFarinha@gmail.com',
    password: 'Trigo',
    date_birth: new Date('2003-06-06').toISOString()
    },

    {
    complete_name: 'Tânia Esmeralda',
    user: 'TâniaEsme',
    type: 'User',
    email: 'tâninha123@gmail.com',
    password: 'T12345',
    date_birth: new Date('1968-04-12').toISOString()
    },

    {
    complete_name: 'Rebeca Andrade',
    user: 'Rebekkkk',
    type: 'Adm',
    email: 'Medalhistabr@gmail.com',
    password: 'simonebile',
    date_birth: new Date('1998-05-29').toISOString()
    }
  ];

  await prisma.user.createMany({ data });
  console.log("Usuário cadastrado com sucesso!");

  const user = await prisma.user.findMany();
  console.log(user);
}

main();