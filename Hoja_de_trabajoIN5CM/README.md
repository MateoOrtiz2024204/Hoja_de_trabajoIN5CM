# Hoja de trabajo

## Objetivo
Implementar un servidor HTTP nativo con Node.js, sin utilizar Express, que exponga un CRUD de productos y un CRUD de clientes, respondiendo en formato JSON y validando la información recibida.

## Tecnologías utilizadas
- Node.js
- TypeScript
- Módulo nativo `http`
- tsx (para ejecutar TypeScript directamente)
- Persistencia en archivos JSON

## Instalación
npm install

## Ejecución
npm run server
El servidor queda disponible en:
http://localhost:3000

## Rutas disponibles

### Productos
| Método | Ruta               | Descripción         |
|--------|--------------------|---------------------|
| GET    | /productos         | Listar todos        |
| GET    | /productos/:id     | Buscar uno          |
| POST   | /productos         | Agregar             |
| PUT    | /productos/:id     | Actualizar          |
| DELETE | /productos/:id     | Eliminar            |

### Clientes
| Método | Ruta               | Descripción         |
|--------|--------------------|---------------------|
| GET    | /clientes          | Listar todos        |
| GET    | /clientes/:id      | Buscar uno          |
| POST   | /clientes          | Agregar             |
| PUT    | /clientes/:id      | Actualizar          |
| DELETE | /clientes/:id      | Eliminar            |

## Validaciones
**Productos:** no se permite precio negativo, stock negativo, nombre vacío,
categoría vacía ni id repetido.

**Clientes:** no se permite correo vacío, teléfono vacío, correo repetido,
nombre vacío ni apellido vacío.

## Manejo de errores
El servidor responde con el código y mensaje adecuado en los siguientes casos:
ruta inexistente (404), método no permitido (405), producto o cliente
inexistente (404) y JSON inválido en el cuerpo de la petición (400).
