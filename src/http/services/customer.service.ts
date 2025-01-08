import { prismaClient } from "../../lib/prisma";

export async function findAllCustomers() {
    const customers = await prismaClient.customer.findMany();
    return customers;
}

export function findCustomerByCPF(cpf: string) {
    const customer = prismaClient.customer.findUnique({
        where: {
            cpf: cpf
        },
        include: {
            subscriptions: {
                include: {
                    plan: true
                }
            }
        }
    });

    if (!customer) {
        throw new Error('Cliente não encontrado');
    }

    return customer;
}