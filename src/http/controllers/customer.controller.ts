import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { findAllCustomers, findCustomerByCPF } from "../services/customer.service";

export async function CustomerController(app: FastifyInstance) {

    app.get(
        '/customers',
        async (req: FastifyRequest, res: FastifyReply) => {
            const customers = await findAllCustomers();
            res.send(customers).status(200);
        }
    );

    app.get(
        '/customers/cpf/:cpf',
        async (req: FastifyRequest, res: FastifyReply) => {
            const cpf = (req.params as any).cpf;
            const customer = await findCustomerByCPF(cpf);
            res.send(customer).status(200);
        }
    );

}