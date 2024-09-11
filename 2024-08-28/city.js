import { PrismaClient } from "@prisma/client";

const prisma =new PrismaClient();

async function main(){
    const city = await prisma.user.findUnique({
        where: { city: "Caraguatatuba" },
    });
    console.log('user', city);
}

main()