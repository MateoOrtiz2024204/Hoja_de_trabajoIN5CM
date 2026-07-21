import { IncomingMessage, ServerResponse } from 'http';

export function leerBody(req: IncomingMessage): Promise<any> {

    return new Promise((resolve, reject) => {

        let cuerpo = '';

        req.on('data', chunk => {
            cuerpo += chunk;
        });

        req.on('end', () => {

            try {
                resolve(cuerpo ? JSON.parse(cuerpo) : {});
            } catch (error) {
                reject(error);
            }

        });

    });

}

export function enviarJson(res: ServerResponse, status: number, data: unknown) {

    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

}
