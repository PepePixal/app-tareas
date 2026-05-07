// vite nos permite importar el html desde app.html con ?raw 
import html from './app.html?raw';
// importar el objeto con los métodos y la const Filters, desde todo.store.js
import todoStore, { Filters } from '../store/todo.store.js';
// importa func rederTodos()
import { renderTodos } from './use-cases/render-todos.js';
import { renderPending } from './use-cases/render-pending.js';


// objeto con los atributos de los elementos del html
const ElementIDs = {
    // elemento html con class = todo-List
    TodoList: '.todo-list',
    // elemento html con id new-todo-input
    NewTodoInput: '#new-todo-input',
    // elemento html button class 'destroy'
    DestroyTodo: '.destroy',
    // elemento botón Borrar Completados
    ClearCompleted: '.clear-completed',
    // elementos botones de filtros
    TodoFilters: '.filtro',
    // elemento <strong>
    PendingCountLabel: '#pending-count',
    // elemento label +
    CompletedAllTodo: '.toggle-all + label'
}


/**
 * función que recibe el elementId del html, donde renderizar la aplicación
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    // func obtiene todos, según el valor de Filter y los rederiza en el html
    const displayTodos = () => {
        // obtener todos los todos (tareas), según el valor de Filter
        // llamando al metodo getTodos() y enviando como argumento filter,
        // lo que obtiene el método getCurrentFilter()
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        // llama funcion para rederizar los todos,
        // enviando en elemento html donde renderizar y el array de todos (tareas)
        renderTodos( ElementIDs.TodoList, todos);

        // llama func
        updatePendingCount();
    };

    // func 
    const updatePendingCount = () => {
        // llama func q obtinene los todos (tareas) pendings y las renderiza
        // en el elemento html que se envía como argumento
        renderPending( ElementIDs.PendingCountLabel );
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

        // llama func, que obtiene los todos segun el filter y los renderiza
        displayTodos();

    })();


    //** Referencias HTML

    // selecciona el input
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    // selecciona el ul de la lista de todos
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    // selecciona el botón X del todo
    const destroyTodo = document.querySelector( ElementIDs.DestroyTodo );
    // selecciona el botón Borrar Completados
    const clearCompleted = document.querySelector( ElementIDs.ClearCompleted );
    // selecciona todos los botones de filtros
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );
    // selecciona icono + marcar todas las tareas
    const completedAllSelect = document.querySelector( ElementIDs.CompletedAllTodo ); 
    


    //** Listeners

    // listener al input de nueva tarea con evento 'teclear' en el input
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

        // llama func, que obtiene los todos segun el filter y los renderiza
        displayTodos();

        // resetea el valor del target.value del event
        event.target.value = '';

    });

    // listener a la lista de tareas, con evento 'click'
    todoListUL.addEventListener( 'click', ( event ) => {
        // El metodo .closest('[nom_atributo]') retorna el elemento padre más cercano,
        // que tenga un atributo con el nombre indicado en nom_atributo.
        // Obtiene el li con el data-id del todo (tarea).
        const element = event.target.closest('[data-id]');

        // console.log( element.getAttribute('data-id') );

        // Llama func toogleTodo(), enviando el valor del atributo data-id (id único del todo),
        // del elemento html almacenado en element. ( envia el id único del todo)
        // toogleTodo() cambia el valor de la propiedad done del todo (tarea))
        todoStore.toogleTodo( element.getAttribute('data-id') );

        // llama func, que obtiene los todos segun el filter y los renderiza
        displayTodos();
    });

    // listener al button class destroy
    todoListUL.addEventListener( 'click', ( event ) => {
        // console.log(event.target.className);

        // si el valor del atributo class, del elemento que dispara el evento
        // NO es igual a destroy (X botón class destroy), para y sal
        if ( event.target.className !== 'destroy') return;

        // como se está pulsando sobre el button con class 'destroy'

        // Obtiene el li con el data-id del todo (tarea).
        const element = event.target.closest('[data-id]');
        // Llama metodo deleteTodo() enviando el id único del todo
        todoStore.deleteTodo( element.getAttribute('data-id') );
        
        // llama func, que obtiene los todos segun el filter y los renderiza
        displayTodos();
    });

    // listener al botón Borrar Completados
    clearCompleted.addEventListener( 'click', ( event ) => {
        // llama metodo que borra todos los todos completados,
        // los que tienen en su propiedad todo el valor de true
        todoStore.deleteCompleted();

        // llama func, que obtiene los todos segun el filter y los renderiza
        displayTodos();
    });

    // filtersUL es una lista de elementos htlm (de .querySelectorAll()),
    // los listeners se tienen que aplicar a cada uno de sus elementos
    filtersLIs.forEach( element => {
        // agrega un listener a cada element <a> (anchor)
        element.addEventListener( 'click', ( event ) =>{
            event.preventDefault();

            // por cada click en cada enlace <a> :
            // - itera todos los enalces <a> y les elimina la class 'selected'
            filtersLIs.forEach( el => el.classList.remove('selected'));
            // - agrega la class 'selected' al enlace <a> clicado
            event.target.classList.add('selected');

            //console.log(event.currentTarget.getAttribute('href'));

            // obtiene el valor del atributo href de cada elemento <a> y lo compara
            switch( event.currentTarget.getAttribute('href') ){
                case '#/':
                    // asigna filtro 'All', con la función setFilter()
                    todoStore.setFilter(  Filters.All );
                break;
                case '#/active':
                    // asigna filtro 'Pending', con la función setFilter()
                    todoStore.setFilter(  Filters.Pending );
                break;
                case '#/completed':
                    // asigna filtro 'Completed', con la función setFilter()
                    todoStore.setFilter(  Filters.Completed );
                break;
            }
            
            // llama func, que obtiene los todos segun el filter y los renderiza
            displayTodos();
        });

    });

    // listener al icono + marcar todos como completed
    completedAllSelect.addEventListener( 'click', ( event ) => {
        //llama func que marca/desmarca todas las tareas 
        todoStore.toggleAllTodos();

        // llama func, que obtiene los todos segun el filter y los renderiza
        displayTodos();
    });

}