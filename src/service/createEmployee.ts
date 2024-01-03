import { Prisma } from '@prisma/client';
import { EmployeeRepositories } from '@repositories';

interface ICreateEmployee {
    employee: Prisma.employeeCreateInput;
}

export class CreateEmployee {
    async execute({ employee }: ICreateEmployee) {
        const employeeRepositories = new EmployeeRepositories();
        const newEmployee = await employeeRepositories.create(employee);
        return newEmployee;
    }
}