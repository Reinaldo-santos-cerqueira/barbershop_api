import { Prisma } from '@prisma/client';
import prisma from '../../prismaMock/client';
import {
    mockEmployee
} from './mock/employeeMock';
import { EmployeeRepositories } from '../employee';
enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}
enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

beforeAll(async () => {
    await prisma.employee.create({
        data: {
            ...mockEmployee,
            status: Status.ACTIVE,
            gender: Gender.MALE
        }
    });
});

afterAll(async () => {

    const deleteEmployee = prisma.employee.deleteMany();

    await prisma.$transaction([
        deleteEmployee
    ]);

    await prisma.$disconnect();
});

describe('Testing for employee repositories',
    () => {
        it('Should create a new employee', async () => {
            const employee = { ...mockEmployee } as Prisma.employeeCreateInput;
            const employeeRepositories = new EmployeeRepositories();
            const createEmployee = await employeeRepositories.create({ ...employee, user: 'test5' });
            expect(createEmployee.user).toEqual('test5');
        });
        it('Should by verifyExists return true', async () => {
            const employeeRepositories = new EmployeeRepositories();
            const returnVerify = await employeeRepositories.verifyExists('func1');
            expect(returnVerify).toBe(true);
        });
        it('Should by verifyExists return false', async () => {
            const employeeRepositories = new EmployeeRepositories();
            const returnVerify = await employeeRepositories.verifyExists('test');
            expect(returnVerify).toBe(false);
        });
    }
);