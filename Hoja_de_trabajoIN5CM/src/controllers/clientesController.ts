import { Cliente } from "../models/cliente";
import { ClientesRepository } from "../data/clientesRepository";

export class ClientesController {

    private repository = new ClientesRepository();

    async listar(): Promise<Cliente[]> {

        return await this.repository.obtenerClientes();

    }

    async buscar(id: number): Promise<Cliente | undefined> {

        const clientes = await this.repository.obtenerClientes();

        return clientes.find(c => c.id === id);

    }

    async validar(cliente: Cliente, idActual?: number): Promise<string | null> {

        if (!cliente.nombre || cliente.nombre.trim() === "") {
            return "El nombre no puede estar vacío";
        }

        if (!cliente.apellido || cliente.apellido.trim() === "") {
            return "El apellido no puede estar vacío";
        }

        if (!cliente.correo || cliente.correo.trim() === "") {
            return "El correo no puede estar vacío";
        }

        if (!cliente.telefono || cliente.telefono.trim() === "") {
            return "El teléfono no puede estar vacío";
        }

        const clientes = await this.repository.obtenerClientes();

        const correoRepetido = clientes.some(
            c => c.correo === cliente.correo && c.id !== idActual
        );

        if (correoRepetido) {
            return "El correo ya está registrado";
        }

        return null;

    }

    async agregar(cliente: Cliente): Promise<{ ok: boolean; mensaje: string }> {

        const error = await this.validar(cliente);

        if (error) {
            return { ok: false, mensaje: error };
        }

        const clientes = await this.repository.obtenerClientes();

        const existe = clientes.some(c => c.id === cliente.id);

        if (existe) {
            return { ok: false, mensaje: "El id ya existe" };
        }

        clientes.push(cliente);

        await this.repository.guardarClientes(clientes);

        return { ok: true, mensaje: "Cliente agregado" };

    }

    async actualizar(cliente: Cliente): Promise<{ ok: boolean; mensaje: string }> {

        const error = await this.validar(cliente, cliente.id);

        if (error) {
            return { ok: false, mensaje: error };
        }

        const clientes = await this.repository.obtenerClientes();

        const indice = clientes.findIndex(c => c.id === cliente.id);

        if (indice === -1) {
            return { ok: false, mensaje: "Cliente no encontrado" };
        }

        clientes[indice] = cliente;

        await this.repository.guardarClientes(clientes);

        return { ok: true, mensaje: "Cliente actualizado" };

    }

    async eliminar(id: number): Promise<boolean> {

        const clientes = await this.repository.obtenerClientes();

        const nuevos = clientes.filter(c => c.id !== id);

        if (clientes.length === nuevos.length) {
            return false;
        }

        await this.repository.guardarClientes(nuevos);

        return true;

    }

}
