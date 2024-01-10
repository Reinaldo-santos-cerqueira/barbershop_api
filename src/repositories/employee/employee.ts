import { Prisma, PrismaClient } from '@prisma/client';

export class EmployeeRepositories {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(employee: Prisma.employeeCreateInput) {
        const newEmployee = await this.prisma.employee.create({
            data: employee
        });
        return newEmployee;
    }
    async verifyExists(user: string) {
        const findUser = await this.prisma.employee.findFirst({
            where: {
                user
            }
        });
        if (findUser) {
            return true;
        }
        return false;
    }
}