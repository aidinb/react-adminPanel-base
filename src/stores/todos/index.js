import {observable, action} from 'mobx';
import fakeData from '../../containers/Todo/fakeData';
const colors = ['#7ED321', '#de1b1b', '#511E78', '#ff9009', '#42a5f5'];
const todos = new fakeData(5, colors.length).getAll();


class Store  {
    @observable todos;
    @observable colors;


    constructor() {
        this.todos = todos;
        this.colors = colors;
    }

    @action.bound addTodo(todo) {
        const newTodo = {
            id: new Date(),
            todo: todo,
            createTime: new Date(),
            color: 0,
            completed: false,
        };
        this.todos = [newTodo, ...this.todos];
    }

    @action.bound edittodo(editTodo) {
        const todos = [];
        this.todos.forEach(todo => {
            if (todo.id !== editTodo.id) {
                todos.push(todo);
            } else {
                todos.push(editTodo);
            }
        });
        this.todos = todos;
    }

    @action.bound deleteTodo(id) {
        const todos = [];
        this.todos.forEach(todo => {
            if (todo.id !== id) {
                todos.push(todo);
            }
        });
        this.todos = todos;
    }

    @action.bound allCompleted() {
        const todos = [];
        this.todos.forEach(todo => {
            todo.completed = true;
            todos.push(todo);
        });
        this.todos = todos;
    }

    @action.bound deleteCompleted() {
        const todos = [];
        this.todos.forEach(todo => {
            if (!todo.completed) {
                todos.push(todo);
            }
        });
        this.todos = todos;
    }
}
let singleton = new Store();
export default singleton;
