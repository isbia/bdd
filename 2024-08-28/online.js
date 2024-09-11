import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const onlineUsers = await prisma.user.findMany({
        where: { status: 'online' },
      });
      console.log('Online Users:', onlineUsers);
}

main()