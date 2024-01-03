import { Prisma } from '@prisma/client';
import { ClientRepositories } from '@repositories';

interface ICreateClient {
    address: Prisma.addressCreateInput;
    client: Prisma.clientCreateInput;
}

export class CreateClient {
    async execute({ address, client }: ICreateClient) {
        const clientRepositories = new ClientRepositories();
        const newClient = await clientRepositories.create(client, address);
        return newClient;
    }
}