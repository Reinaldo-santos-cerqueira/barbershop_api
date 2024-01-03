import { PrismaClient, Prisma } from '@prisma/client';


export class ClientRepositories {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }


    async create(client: Prisma.clientCreateInput, address: Prisma.addressCreateInput) {
        await this.prisma.client.create({
            data: {
                ...client,
                // Ajuste para fornecer a relação address corretamente
                address: {
                    create: address
                }
            }
        });
    }
}