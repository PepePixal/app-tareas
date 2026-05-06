
// para poder crear instancias de la clase Todo{},
// que contiene el modelo datos
import { Todo } from '../todos/models/todo.model.js';

//objeto con las opciones de filtrado de tareas
const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
};

//objeto con las tareas a realizar y el filtro a aplicar
const state = {
    todos: [
        new Todo('Primera tarea 1'),
        new Todo('Segunda tarea 2'),
        new Todo('Tercera tarea 3'),
        new Todo('Caurta tarea 4'),
        new Todo('Quinta tarea 5')
    ],

    filter: Filters.All,
};

// funciones del store:

const initStore = () => {
    // obtiene el valor del localStorage
    loadStore();
    console.log('Store Initialiced');
}

// leer el valor de state almacenado en el localStorage
const loadStore = () => {
    // .getItem('nom_key') obtiene el valor (tipo string)
    // de la llave nom_key en el localStorage
    
    // valida si No hay valor en la llave state en el localStorage
    if ( !localStorage.getItem('state') ) return;

    // JSON.parse() convierte un JSON string, en un objeto y lo retorna.
    // Como sabemos que el objeto 'state' consta de las propiedades todos y filter,
    // hacemos la destructuración inicializada a [] y Filters.All por si no viene data
    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') ); 

    // asigna los valores de las constantes destructuradas, a las propiedades del objeto state
    state.todos  = todos;
    state.filter = filter;
};

// almacenar en el LocalStorage Web
const saveStateToLocalStorage = () => {
    // Queremos almacenar el objeto state en el localStorage,
    // pero el localStorage solo admite valor tipo string,
    // tendremos que convertir el objeto state en string, para poder almacenarlo.

    // JSON.stringify() es un método sobre el objeto global JSON, que
    // convierte un valor JavaScript a un JavaScript Object Notation (JSON) string.

    // método setItem() almacena key y valor en el localStorage,
    // requiere key tipo string y valor tipo string
    localStorage.setItem( 'state', JSON.stringify(state));
};

//obtener las tareas según el filtro seleccionado. Requiere filter (string)
const getTodos = ( filter = Filters.All ) => {
    switch( filter ) {
        case Filters.All:
            //con el operador spread ..., retorna un arreglo con cada valor
            return [...state.todos];
        case Filters.Completed:
            //retorna solo las tareas (todos) filtradas, cuyo atributo done sea true 
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            //retorna solo las tareas (todo) filtradas, cuyo atributo done no sea true (false)
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error('Option ${ filter } is not valid');
    };
};

// agrega nuevo todo (tarea) al arreglo todos. Requiere description (string)
const addTodo = ( description ) => {
    // si no viene description, lanza error en consola y no continua
    if ( !description ) throw new Error('description is required');
    // agrega una nueva instancia de Todo con la description recibida, al array todos
    state.todos.push ( new Todo( description ));
};

// para cambiar el estado del done (true/false) de la tarea.
// Requiere todoId (string) 
const toogleTodo = ( todoId ) => {
    // map() recorre los todos (tareas) y por cada todo (tarea)
    // si id del todo (tarea) es igual al id recibido en todoId para cambiar,
    // cambia el valor del atributo done a su contrario (true/false/true) y
    // retorna cada todo, en un nuevo arreglo state.todos
    state.todos = state.todos.map( todo => {
        if ( todo.id === todoId ) {
            todo.done = !todo.done;
        };
        return todo;
    });
    
};

// requiere todoId (String)
const deleteTodo = ( todoId ) => {
    // genera un nuevo state.todos, filtrando y obteniendo cada todo,
    // cuyo id sea diferente al id recibido en todoId para eliminar 
    state.todos = state.todos.filter( todo => todo.id !== todoId );
};

const deleteCompleted = () => {
    // genera un nuevo state.todos con los todo no completados (done: false),
    // filtrando y obteniendo cada todo, cuyo atributo done NO sea true
    state.todos = state.todos.filter( todo => !todo.done );
};

// establece el filtro. Requiere el filtro o asigna All por defecto.
const setFilter = ( newFilter = Filters.All ) => {
    //establece como filtro, el filtro recibido o All por defecto
    state.filter = newFilter;
};

//para obtener el filtro que tenga asignado la tarea
const getCurrentFilter = () => {
    return state.filter;
};


// exportación por defecto del objeto con los métodos,
// para poder importarlo sin usar las {} y poder llamar a su métodos
export default {
    initStore,
    loadStore,
    getTodos,
    addTodo,
    toogleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    saveStateToLocalStorage
};