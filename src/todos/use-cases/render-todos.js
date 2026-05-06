import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";

// importar el objeto con los métodos, desde todo.store.js
import todoStore from '../../store/todo.store';

let element;

/**
 * renderiza los todos (tareas) en el html
 * @param {String} elementId 
 * @param {Todo} todos 
 */
// requiere elemento id html (string) donde renderizar las todos (tareas) y
// el arreglo de todos a renderizar, inicializado a vacio por si no viene nada
export const renderTodos = ( elementId, todos = [] ) => {

    // para generar el element solo la primera vez, si no existe y
    // así evitar que se genere cada vez que es llamada la función renderTodos()
    if ( !element )
        //selecciona elemento html recibido en elementId
        element = document.querySelector( elementId );
        
    // si element no tiene ningún valor (es false)
    if ( !element) throw new Error(`Element ${ elementId } not found`);

    // llama al método que almacena todo el state en el localStorage web,
    // antes de rederizar el state, cuando ha cambiado por algo.
    todoStore.saveStateToLocalStorage();
    
    // purgar / vaciar el contenido html del element, antes de volver a llenarlo,
    // para que no se acumule la info repetida
    element.innerHTML = '';

    //iterar los todos y por cada uno
    todos.forEach( todo => {
        // agregar al element lo que retorna la func createTodoHTML
        element.append( createTodoHTML( todo ));
    });

}