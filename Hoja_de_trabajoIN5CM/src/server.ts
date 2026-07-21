import { createServer, IncomingMessage, ServerResponse } from 'http';
import { rutasProductos } from './routes/productos';
import { rutasClientes } from './routes/clientes';
import { enviarJson } from './utils/http';

const servidor = createServer(async (req: IncomingMessage, res: ServerResponse) => {

    const url = new URL(req.url ?? '/', 'http://localhost:3000');
    const partes = url.pathname.split('/').filter(Boolean);
    const recurso = partes[0];
    const id = partes[1] ? Number(partes[1]) : undefined;

    if (recurso === 'productos') {

        await rutasProductos(req, res, id);
        return;

    }

    if (recurso === 'clientes') {

        await rutasClientes(req, res, id);
        return;

    }

    enviarJson(res, 404, { mensaje: 'Ruta no encontrada' });

});

servidor.listen(3000, () => {

    console.log('===================================');

    console.log('Servidor iniciado');

    console.log('http://localhost:3000');

    console.log('===================================');

});
