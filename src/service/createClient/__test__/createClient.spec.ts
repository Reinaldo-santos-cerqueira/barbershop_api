import { CreateClient } from '../createClient'; // Substitua com o caminho correto
import { ClientRepositories } from '@repositories';
import { mockUserAddress } from './mock/userMock';
import { Prisma } from '@prisma/client';
beforeEach(() => {
    jest.clearAllMocks();

});
describe('CreateClient', () => {
    it('Should create a new client', async () => {
        const createClient = new CreateClient();
        const mockAddress = { ...mockUserAddress.address } as Prisma.addressCreateInput;
        const mockUser = { ...mockUserAddress.client } as Prisma.clientCreateInput;

        const createSpy = jest.spyOn(ClientRepositories.prototype, 'create');
        createSpy.mockResolvedValue();
        await createClient.execute({ address: mockAddress, client: mockUser });
        expect(createSpy).toHaveBeenCalled();
    });
});
