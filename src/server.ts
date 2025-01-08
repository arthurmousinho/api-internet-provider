import Fastify from 'fastify'
import { CustomerController } from './http/controllers/customer.controller';

const fastify = Fastify({
    logger: true,
})

fastify.register(CustomerController);

try {
    fastify
        .listen({ port: 3000 })
        .then(() => {
            console.log('Server is running on http://localhost:3000')
        })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}