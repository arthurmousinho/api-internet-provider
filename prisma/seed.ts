const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Iniciando seed...");

    if (await prisma.plan.count() > 0) {
        return;
    }

    const plans = await prisma.plan.createMany({
        data: [
            {
                name: 'Basic Plan',
                description: 'Plano básico de internet com 100 Mbps.',
                price: 49.99,
                speedMbps: 100,
            },
            {
                name: 'Premium Plan',
                description: 'Plano premium de internet com 300 Mbps.',
                price: 99.99,
                speedMbps: 300,
            },
            {
                name: 'Ultra Plan',
                description: 'Plano ultra de internet com 500 Mbps.',
                price: 149.99,
                speedMbps: 500,
            },
        ],
    });

    console.log(`${plans.count} planos criados.`);

    // Criando clientes
    const customer1 = await prisma.customer.create({
        data: {
            name: 'João Silva',
            email: 'joao.silva@example.com',
            cpf: '12345678900',
            phone: '11999999999',
            address: 'Rua das Flores, 123, São Paulo, SP',
        },
    });

    const customer2 = await prisma.customer.create({
        data: {
            name: 'Maria Oliveira',
            email: 'maria.oliveira@example.com',
            cpf: '98765432100',
            phone: '11988888888',
            address: 'Avenida Brasil, 456, Rio de Janeiro, RJ',
        },
    });

    console.log(`Clientes criados: João Silva e Maria Oliveira.`);

    // Consultando planos para assinaturas
    const basicPlan = await prisma.plan.findFirst({ where: { name: 'Basic Plan' } });
    const premiumPlan = await prisma.plan.findFirst({ where: { name: 'Premium Plan' } });

    // Criando assinaturas
    const subscription1 = await prisma.subscription.create({
        data: {
            customerId: customer1.id,
            planId: basicPlan.id,
            startDate: new Date(),
            status: 'ACTIVE',
        },
    });

    const subscription2 = await prisma.subscription.create({
        data: {
            customerId: customer2.id,
            planId: premiumPlan.id,
            startDate: new Date(),
            status: 'ACTIVE',
        },
    });

    console.log('Assinaturas criadas.');

    // Criando pagamentos
    const payment1 = await prisma.payment.create({
        data: {
            customerId: customer1.id,
            subscriptionId: subscription1.id,
            amount: basicPlan.price,
            status: 'COMPLETED',
            paymentDate: new Date(),
        },
    });

    const payment2 = await prisma.payment.create({
        data: {
            customerId: customer2.id,
            subscriptionId: subscription2.id,
            amount: premiumPlan.price,
            status: 'COMPLETED',
            paymentDate: new Date(),
        },
    });

    console.log('Pagamentos criados.');

    // Criando tickets
    const ticket1 = await prisma.ticket.create({
        data: {
            customerId: customer1.id,
            issue: 'Conexão intermitente',
            status: 'OPEN',
        },
    });

    const ticket2 = await prisma.ticket.create({
        data: {
            customerId: customer2.id,
            issue: 'Internet lenta',
            status: 'IN_PROGRESS',
        },
    });

    console.log('Tickets criados.');
}

main()
    .catch((e) => {
        console.error('Erro ao executar seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log('Seed finalizado.');
    });