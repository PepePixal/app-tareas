// vite nos permite importar el html desde app.html con ?raw 
import html from './app.html?raw';
// importar el objeto con los métodos, desde todo.store.js
import todoStore from '../store/todo.store.js';
// importa func rederTodos()
import { renderTodos } from './use-cases/render-todos.js';


// objeto con los elementos del html
const ElementIDs = {
    // elemento html con class = todo-List
    TodoList: '.todo-list',
    // elemento html con id new-todo-input
    NewTodoInput: '#new-todo-input'
}


/**
 * función que recibe el elementId del html, donde renderizar la aplicación
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    // func obtiene todos y los rederiza en el html
    const displayTodos = () => {
        // obtener todos los todos (tareas)
        // llama metodo getTodos() enviando como argumento filter,
        // lo que obtiene el método getCurrentFilter()
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        // llama funcion para rederizar los todos
        // enviando en elemento html donde renderizar y el array de todos (tareas)
        renderTodos( ElementIDs.TodoList, todos);
    };


    //función anónima autoinvocada, cuando se llama a la func App()
    (()=> {
        // crea elemento html div y lo guarda en la var app
        const app = document.createElement('div');
        // agrega el código html importado, al div guardado en la var app
        app.innerHTML = html;
        // selecciona el elemento html cuyo id es el recibido en el parámetro elementId y
        // le agrega el div (con el h1) guardado en la var app
        document.querySelector(elementId).append( app );

        //llama la func displayTodos()
        displayTodos();
    })();


    //** Referencias HTML

    // selecciona el input
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );


    //** Listeners

    // evento 'teclear' en el input
    newDescriptionInput.addEventListener( 'keyup', ( event ) =>{
        // el keyCode del event contiene el codigo de la tecla, 13 es la tecla return.
        // Si la tecla pulsada no es 13, sale, pero sigue escuchando y aculando teclas pulsadas
        if ( event.keyCode !== 13 ) return;

        // Como la última tecla pulsada ha sido 13 enter,
        
        // El target.value del event, contiene el acumulado de teclas pulsadas
        // si la longitud del target.value, eliminando los carácteres vacios al incio y al final (trim()),
        // es igual a 0, parar y salir
        if ( event.target.value.trim().length === 0 ) return;

        // Como el target.value del event tiene info (descripción de la nueva tarea)
        // llama func addTodo() enviando la descrición introducida en el input,
        // para que agregue el nuevo todo a los todos (tareas)
        todoStore.addTodo( event.target.value );

        // llama func que obtiene todos los todos y los renderiza
        displayTodos();

        // resetea el valor del target.value del event
        event.target.value = '';

    });


}