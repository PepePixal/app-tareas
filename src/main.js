import './style.css';
import { App } from './todos/app.js';
import todoStore from './store/todo.store.js';

//llama al método initStore(), del objeto importado todoStore
todoStore.initStore();  //imprimirá en consola el objeto state y el mensaje

// llama func App(), enviando el id del div del index.html,
// donde renderizar la aplicación
App('#app');

