
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
    console.log(state);
    console.log('Store Initialiced');
}

const loadStore = () => {
    throw new Error('loadStore Not implemented yet');
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
    // genera un nuevo state.todos, filtrando y obteniendo cada todo,
    // cuyo done sea true (hecho) 
    state.todos = state.todos.filter( todo => todo.done );
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
    getCurrentFilter
};