import { AppError } from '@errors';
import { Prisma } from '@prisma/client';
import { EmployeeRepositories } from '@repositories';
import { encryptValidatePassword } from '@utils';

interface ICreateEmployee {
    employee: Prisma.employeeCreateInput;
}

export class CreateEmployee {
    async execute({ employee }: ICreateEmployee) {
        const employeeRepositories = new EmployeeRepositories();
        if (await employeeRepositories.verifyExists(employee.user)) {
            throw new AppError('Já possui um usuario desse no banco', 400);
        }
        const passwordEncrypted = await encryptValidatePassword(employee.password);
        try {
            const newEmployee = await employeeRepositories.create({ ...employee, password: passwordEncrypted });
            return newEmployee;
        } catch (e) {
            throw new AppError('Internal server error', 500);
        }
    }
}