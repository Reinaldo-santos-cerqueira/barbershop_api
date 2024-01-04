import { Prisma } from '@prisma/client';
import { ClientRepositories } from '@repositories';
import { encryptValidatePassword } from '@utils';

interface ICreateClient {
    address: Prisma.addressCreateInput;
    client: Prisma.clientCreateInput;
}

export class CreateClient {
    async execute({ address, client }: ICreateClient) {
        const clientRepositories = new ClientRepositories();
        const passwordEncrypted = await encryptValidatePassword(client.password);
        const newClient = await clientRepositories.create({ ...client, password: passwordEncrypted }, address);
        return newClient;
    }
}