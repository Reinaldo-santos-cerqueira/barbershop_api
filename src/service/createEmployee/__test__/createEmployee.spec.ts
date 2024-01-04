import { CreateEmployee } from '../createEmployee';
import { EmployeeRepositories } from '@repositories';
import { mockEmployee } from './mock/employeeMock';
import { Prisma } from '@prisma/client';
beforeEach(() => {
    jest.clearAllMocks();

});
describe('CreateEmployee', () => {
    it('Should create a new Employee', async () => {
        const createEmployee = new CreateEmployee();
        const employee = { ...mockEmployee } as Prisma.employeeCreateInput;

        const createSpy = jest.spyOn(EmployeeRepositories.prototype, 'create');
        createSpy.mockResolvedValue();
        await createEmployee.execute({ employee });
        expect(createSpy).toHaveBeenCalled();
    });
});
