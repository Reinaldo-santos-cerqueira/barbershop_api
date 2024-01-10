import { PrismaClient, Prisma } from '@prisma/client';

export class ClientRepositories {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(client: Prisma.clientCreateInput, address: Prisma.addressCreateInput) {
        const newUser = await this.prisma.client.create({
            data: {
                ...client,
                address: {
                    create: address
                }
            }
        });
        return newUser;
    }
    async verifyUserExist(user: string) {
        const findUSer = await this.prisma.client.findFirst({
            where: {
                user: user
            }
        });
        if (findUSer) {
            return true;
        }
        return false;
    }
}