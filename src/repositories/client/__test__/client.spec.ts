import { Prisma } from '@prisma/client';
import { ClientRepositories } from '../client';
import { mockUserAddress } from './mock/userMock';
import prisma from '../../prismaMock/client';

enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}
enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}
beforeAll(async () => {
    await prisma.client.create({
        data: {
            ...mockUserAddress.client,
            status: Status.ACTIVE,
            gender: Gender.MALE,
            address: {
                create: mockUserAddress.address
            }
        }
    });
});

afterAll(async () => {

    const deleteClient = prisma.client.deleteMany();
    const deleteAddress = prisma.address.deleteMany();

    await prisma.$transaction([
        deleteClient,
        deleteAddress
    ]);

    await prisma.$disconnect();
});

describe('test1ing for client repositories', () => {
    it('Should create a new client', async () => {
        const mockAddress = { ...mockUserAddress.address } as Prisma.addressCreateInput;
        const mockUser = { ...mockUserAddress.client } as Prisma.clientCreateInput;
        const clientRepositories = new ClientRepositories();
        const createUser = await clientRepositories.create({ ...mockUser, user: 'test' }, mockAddress);
        expect(createUser.user).toEqual('test');
    });
    it('Should by verifyUserExist return true', async () => {
        const clientRepositories = new ClientRepositories();
        const returnVerify = await clientRepositories.verifyUserExist('admin1');
        expect(returnVerify).toBe(true);
    });
    it('Should by verifyUserExist return false', async () => {
        const clientRepositories = new ClientRepositories();
        const returnVerify = await clientRepositories.verifyUserExist('aerterteyertdmin');
        expect(returnVerify).toBe(false);
    });
});