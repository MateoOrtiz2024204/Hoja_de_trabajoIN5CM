import { IncomingMessage, ServerResponse } from 'http';
import { ProductosController } from '../controllers/productosController';
import { Producto } from '../models/producto';
import { leerBody, enviarJson } from '../utils/http';

const controller = new ProductosController();

export async function rutasProductos(req: IncomingMessage, res: ServerResponse, id: number | undefined) {

    try {

        if (req.method === 'GET' && id === undefined) {

            const productos = await controller.listar();
            enviarJson(res, 200, productos);
            return;

        }

        if (req.method === 'GET' && id !== undefined) {

            const producto = await controller.buscar(id);

            if (!producto) {
                enviarJson(res, 404, { mensaje: 'Producto no encontrado' });
                return;
            }

            enviarJson(res, 200, producto);
            return;

        }

        if (req.method === 'POST') {

            const body = await leerBody(req) as Producto;

            const resultado = await controller.agregar(body);

            if (!resultado.ok) {
                enviarJson(res, 400, { mensaje: resultado.mensaje });
                return;
            }

            enviarJson(res, 201, { mensaje: resultado.mensaje });
            return;

        }

        if (req.method === 'PUT' && id !== undefined) {

            const body = await leerBody(req) as Producto;

            const resultado = await controller.actualizar({ ...body, id });

            if (!resultado.ok) {
                const status = resultado.mensaje === 'Producto no encontrado' ? 404 : 400;
                enviarJson(res, status, { mensaje: resultado.mensaje });
                return;
            }

            enviarJson(res, 200, { mensaje: resultado.mensaje });
            return;

        }

        if (req.method === 'DELETE' && id !== undefined) {

            const eliminado = await controller.eliminar(id);

            if (!eliminado) {
                enviarJson(res, 404, { mensaje: 'Producto no encontrado' });
                return;
            }

            enviarJson(res, 200, { mensaje: 'Producto eliminado' });
            return;

        }

        enviarJson(res, 405, { mensaje: 'Método no permitido' });

    } catch (error) {

        enviarJson(res, 400, { mensaje: 'JSON inválido' });

    }

}
