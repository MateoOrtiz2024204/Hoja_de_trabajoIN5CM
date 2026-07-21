import { IncomingMessage, ServerResponse } from 'http';
import { ClientesController } from '../controllers/clientesController';
import { Cliente } from '../models/cliente';
import { leerBody, enviarJson } from '../utils/http';

const controller = new ClientesController();

export async function rutasClientes(req: IncomingMessage, res: ServerResponse, id: number | undefined) {

    try {

        if (req.method === 'GET' && id === undefined) {

            const clientes = await controller.listar();
            enviarJson(res, 200, clientes);
            return;

        }

        if (req.method === 'GET' && id !== undefined) {

            const cliente = await controller.buscar(id);

            if (!cliente) {
                enviarJson(res, 404, { mensaje: 'Cliente no encontrado' });
                return;
            }

            enviarJson(res, 200, cliente);
            return;

        }

        if (req.method === 'POST') {

            const body = await leerBody(req) as Cliente;

            const resultado = await controller.agregar(body);

            if (!resultado.ok) {
                enviarJson(res, 400, { mensaje: resultado.mensaje });
                return;
            }

            enviarJson(res, 201, { mensaje: resultado.mensaje });
            return;

        }

        if (req.method === 'PUT' && id !== undefined) {

            const body = await leerBody(req) as Cliente;

            const resultado = await controller.actualizar({ ...body, id });

            if (!resultado.ok) {
                const status = resultado.mensaje === 'Cliente no encontrado' ? 404 : 400;
                enviarJson(res, status, { mensaje: resultado.mensaje });
                return;
            }

            enviarJson(res, 200, { mensaje: resultado.mensaje });
            return;

        }

        if (req.method === 'DELETE' && id !== undefined) {

            const eliminado = await controller.eliminar(id);

            if (!eliminado) {
                enviarJson(res, 404, { mensaje: 'Cliente no encontrado' });
                return;
            }

            enviarJson(res, 200, { mensaje: 'Cliente eliminado' });
            return;

        }

        enviarJson(res, 405, { mensaje: 'Método no permitido' });

    } catch (error) {

        enviarJson(res, 400, { mensaje: 'JSON inválido' });

    }

}
