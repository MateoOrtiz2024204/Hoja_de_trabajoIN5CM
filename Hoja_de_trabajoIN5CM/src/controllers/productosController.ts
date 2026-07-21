import { Producto } from "../models/producto";
import { ProductosRepository } from "../data/productosRepository";

export class ProductosController {

    private repository = new ProductosRepository();

    async listar(): Promise<Producto[]> {

        return await this.repository.obtenerProductos();

    }

    async buscar(id: number): Promise<Producto | undefined> {

        const productos = await this.repository.obtenerProductos();

        return productos.find(p => p.id === id);

    }

    validar(producto: Producto): string | null {

        if (!producto.nombre || producto.nombre.trim() === "") {
            return "El nombre no puede estar vacío";
        }

        if (!producto.categoria || producto.categoria.trim() === "") {
            return "La categoría no puede estar vacía";
        }

        if (producto.precio === undefined || producto.precio < 0) {
            return "El precio no puede ser negativo";
        }

        if (producto.stock === undefined || producto.stock < 0) {
            return "El stock no puede ser negativo";
        }

        return null;

    }

    async agregar(producto: Producto): Promise<{ ok: boolean; mensaje: string }> {

        const error = this.validar(producto);

        if (error) {
            return { ok: false, mensaje: error };
        }

        const productos = await this.repository.obtenerProductos();

        const existe = productos.some(p => p.id === producto.id);

        if (existe) {
            return { ok: false, mensaje: "El id ya existe" };
        }

        productos.push(producto);

        await this.repository.guardarProductos(productos);

        return { ok: true, mensaje: "Producto agregado" };

    }

    async actualizar(producto: Producto): Promise<{ ok: boolean; mensaje: string }> {

        const error = this.validar(producto);

        if (error) {
            return { ok: false, mensaje: error };
        }

        const productos = await this.repository.obtenerProductos();

        const indice = productos.findIndex(p => p.id === producto.id);

        if (indice === -1) {
            return { ok: false, mensaje: "Producto no encontrado" };
        }

        productos[indice] = producto;

        await this.repository.guardarProductos(productos);

        return { ok: true, mensaje: "Producto actualizado" };

    }

    async eliminar(id: number): Promise<boolean> {

        const productos = await this.repository.obtenerProductos();

        const nuevos = productos.filter(p => p.id !== id);

        if (productos.length === nuevos.length) {
            return false;
        }

        await this.repository.guardarProductos(nuevos);

        return true;

    }

}
