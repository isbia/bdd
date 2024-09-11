import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const name = await prisma.user.findUnique({
        where: { userName: "fulano" },
      });
      console.log('user', name);
}

main()