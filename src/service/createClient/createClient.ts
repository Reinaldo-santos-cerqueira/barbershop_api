import { AppError } from '@errors';
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
        const findUser = await clientRepositories.verifyUserExist(client.user);
        if (findUser) {
            throw new AppError('Já possui um usuario desse no banco', 400);
        }
        const passwordEncrypted = await encryptValidatePassword(client.password);
        try {
            const newClient = await clientRepositories.create({ ...client, password: passwordEncrypted }, address);
            return newClient;
        } catch (e) {
            throw new AppError('Internal server error', 500);
        }
    }
}