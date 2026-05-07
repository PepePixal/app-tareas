import todoStore, { Filters } from "../../store/todo.store";

//define var element
let element;

// obtiene elemento html y ahí inserta la cantidad de todos pendientes
export const renderPending = ( elementId ) => {

    // si la var element no contiene nada, le asigna el elemento html recibido
    if ( !element ) 
        element = document.querySelector( elementId );  

    // element todavía no contiene nada, imprime error en consola
    if ( !element ) throw new Error(`Element ${elementId} not found`);
  
    // obtiene la longitud, del arreglo de todos pendientes obtenido y 
    // la inserta en el elemento html
    element.innerHTML = todoStore.getTodos( Filters.Pending ).length;

};