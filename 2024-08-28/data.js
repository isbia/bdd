import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const data = await prisma.user.findUnique({
        where: { createdAt: "fulano" },
      });
      console.log('user', data);
}

main()