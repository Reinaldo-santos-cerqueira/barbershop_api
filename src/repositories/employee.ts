import { Prisma, PrismaClient } from '@prisma/client';

export class EmployeeRepositories {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(employee: Prisma.employeeCreateInput) {
        await this.prisma.employee.create({
            data: employee
        });
    }
}