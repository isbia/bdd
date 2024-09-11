import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const region = await prisma.user.findUnique({
        where: { region: "sudeste" },
      });
      console.log('user', region);
}

main()