import { Prisma } from '@prisma/client';
import { EmployeeRepositories } from '@repositories';
import { encryptValidatePassword } from '@utils';

interface ICreateEmployee {
    employee: Prisma.employeeCreateInput;
}

export class CreateEmployee {
    async execute({ employee }: ICreateEmployee) {
        const employeeRepositories = new EmployeeRepositories();
        const passwordEncrypted = await encryptValidatePassword(employee.password);
        const newEmployee = await employeeRepositories.create({ ...employee, password: passwordEncrypted });
        return newEmployee;
    }
}