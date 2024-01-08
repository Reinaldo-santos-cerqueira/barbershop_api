/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateClient } from '../createClient'; // Substitua com o caminho correto
import { ClientRepositories } from '@repositories';
import { mockUserAddress } from './mock/userMock';
import { Prisma } from '@prisma/client';
import { AppError } from '@errors';
beforeEach(() => {
    jest.clearAllMocks();
});
enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}
enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}
describe('CreateClient', () => {
    it('Should by error user exists', async () => {
        const verifyUserExist = jest.spyOn(ClientRepositories.prototype, 'verifyUserExist');
        verifyUserExist.mockResolvedValue(true);
        const createClient = new CreateClient();

        const mockAddress = { ...mockUserAddress.address } as Prisma.addressCreateInput;
        const mockUser = { ...mockUserAddress.client } as Prisma.clientCreateInput;
        try {
            await createClient.execute({ address: mockAddress, client: mockUser });
        } catch (error: any) {
            expect(error instanceof AppError).toBe(true);
            expect(error.message).toBe('Já possui um usuario desse no banco');
        }
    });
    it('Should by error password weak', async () => {
        const verifyUserExist = jest.spyOn(ClientRepositories.prototype, 'verifyUserExist');
        verifyUserExist.mockResolvedValue(false);
        const createClient = new CreateClient();
        const mockAddress = { ...mockUserAddress.address } as Prisma.addressCreateInput;
        const mockUser = { ...mockUserAddress.client } as Prisma.clientCreateInput;
        try {
            await createClient.execute({ address: mockAddress, client: { ...mockUser, password: '123', user: 'admin' } });
        } catch (error: any) {
            expect(error instanceof AppError).toBe(true);
            expect(error.message).toBe('Senha fraca precisa ter: 10 caracteres,pelo menos uma letra minúscula,pelo menos uma letra maiúscula,pelo menos um número e pelo menos um caractere especial');
        }
    });
    it('Should by internal server error', async () => {
        const createClient = new CreateClient();
        const mockAddress = { ...mockUserAddress.address } as Prisma.addressCreateInput;
        const mockUser = { ...mockUserAddress.client } as Prisma.clientCreateInput;
        const verifyUserExist = jest.spyOn(ClientRepositories.prototype, 'verifyUserExist');
        verifyUserExist.mockResolvedValue(false);
        try {
            await createClient.execute({ address: mockAddress, client: { ...mockUser, user: 'admin' } });

        } catch (error: any) {
            expect(error instanceof AppError).toBe(true);
            expect(error.message).toBe('Internal server error');

        }
    });
    it('Should create a new client', async () => {
        const createClient = new CreateClient();
        const mockAddress = { ...mockUserAddress.address } as Prisma.addressCreateInput;
        const mockUser = { ...mockUserAddress.client } as Prisma.clientCreateInput;
        const verifyUserExist = jest.spyOn(ClientRepositories.prototype, 'verifyUserExist');
        verifyUserExist.mockResolvedValue(false);
        const createSpy = jest.spyOn(ClientRepositories.prototype, 'create');
        createSpy.mockResolvedValue({ ...mockUserAddress.client, user: 'test ', addressId: '1', status: Status.ACTIVE, gender: Gender.MALE });
        await createClient.execute({ address: mockAddress, client: { ...mockUser, user: 'test', password: 'Rei@123456789' } });
        expect(createSpy).toHaveBeenCalled();
    });
});
