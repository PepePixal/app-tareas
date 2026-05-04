// vite nos permite importar el html desde app.html con ?raw 
import html from './app.html?raw';


/**
 * función que recibe el elementId del html, donde renderizar la aplicación
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

    //función anónima autoinvocada, cuando se llama a la func App()
    (()=> {
        // crea elemento html div y lo guarda en la var app
        const app = document.createElement('div');
        // agrega el código html importado, al div guardado en la var app
        app.innerHTML = html;
        // selecciona el elemento html cuyo id es el recibido en el parámetro elementId y
        // le agrega el div (con el h1) guardado en la var app
        document.querySelector(elementId).append( app );
    })();

}