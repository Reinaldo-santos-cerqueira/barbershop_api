/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateEmployee } from '../createEmployee';
import { EmployeeRepositories } from '@repositories';
import { mockEmployee } from './mock/employeeMock';
import { Prisma } from '@prisma/client';
import { AppError } from '@errors';
beforeEach(() => {
    jest.clearAllMocks();
});
describe('CreateEmployee', () => {
    it('Should by return error user exists', async () => {
        jest.clearAllMocks();
        const verifyUserExist = jest.spyOn(EmployeeRepositories.prototype, 'verifyExists');
        verifyUserExist.mockResolvedValue(true);
        const createEmployee = new CreateEmployee();
        const employee = { ...mockEmployee } as Prisma.employeeCreateInput;

        try {
            await createEmployee.execute({ employee });
        } catch (error: any) {
            expect(error instanceof AppError).toBe(true);
            expect(error.message).toBe('Já possui um usuario desse no banco');
        }
    });
    it('Should by return password weak', async () => {
        jest.clearAllMocks();
        const verifyUserExist = jest.spyOn(EmployeeRepositories.prototype, 'verifyExists');
        verifyUserExist.mockResolvedValue(false);
        const createEmployee = new CreateEmployee();
        const employee = { ...mockEmployee } as Prisma.employeeCreateInput;

        try {
            await createEmployee.execute({ employee: { ...employee, password: '123' } });
        } catch (error: any) {
            expect(error instanceof AppError).toBe(true);
            expect(error.message).toBe('Senha fraca precisa ter: 10 caracteres,pelo menos uma letra minúscula,pelo menos uma letra maiúscula,pelo menos um número e pelo menos um caractere especial');
        }
    });
    it('Should by return internal server error', async () => {
        jest.clearAllMocks();
        const verifyUserExist = jest.spyOn(EmployeeRepositories.prototype, 'verifyExists');
        verifyUserExist.mockResolvedValue(false);
        const createEmployee = new CreateEmployee();
        const employee = { ...mockEmployee } as Prisma.employeeCreateInput;

        try {
            await createEmployee.execute({ employee: { ...employee, user: 'adminFunc' } });
        } catch (error: any) {
            expect(error instanceof AppError).toBe(true);
            expect(error.message).toBe('Internal server error');
        }
    });
    it('Should by return create a new Employee', async () => {
        jest.clearAllMocks();
        const createEmployee = new CreateEmployee();
        const employee = { ...mockEmployee } as Prisma.employeeCreateInput;
        const createSpy = jest.spyOn(EmployeeRepositories.prototype, 'create');
        createSpy.mockResolvedValue({
            ...employee, id: '1', dateOfBirth: new Date('1997-11-05T16:39:57-08:00'), createdAt: new Date(),
            updatedAt: new Date()
        });
        await createEmployee.execute({ employee });
        expect(createSpy).toHaveBeenCalled();
    });
});
