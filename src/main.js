import './style.css';
import { App } from './todos/app.js';
import todoStore from './store/todo.store.js';

//llama al método initStore(), del objeto importado todoStore.
// carga el state desde el localStorage e imprime mensaje en consoloa
todoStore.initStore();

// llama func App(), enviando el id del div del index.html,
// donde renderizar la aplicación
App('#app');

