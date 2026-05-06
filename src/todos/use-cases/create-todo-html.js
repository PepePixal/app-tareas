import { Todo } from "../models/todo.model";

/**
 * Crea el <li> html para mostrar el todo (tarea)
 * @param {Todo} todo
 * @return {HTMLLIElement} HTMLLIElement
 */
export const createTodoHTML = ( todo ) => {
    if ( !todo ) throw new Error('todo parameter is required');

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ todo.done ? 'checked' : ''}>
            <label>${todo.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement('li');

    //al elemento html <li, le agrega el atriburo data-id y
    // le asigna el valor de todo.id (el id del todo o tarea)
    liElement.setAttribute('data-id', todo.id);

    // si la propiedad done del todo (tarea), es true
    if ( todo.done) 
        // al <li le agrega la class completed (tachada)
        liElement.classList.add('completed');

    // al elemento <li> le inserta el html
    liElement.innerHTML = html;

    return liElement;
};
