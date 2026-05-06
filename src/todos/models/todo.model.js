
// importar la función v4 del paquete uuid, como alias uuid;
import { v4 as uuid } from 'uuid';

export class Todo {

    // requiere la descripción de la tarea (tipo string)
    constructor( description ) {
        // propiedades de la clase
        // id único creado por la función de la librería uuid
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    };

};