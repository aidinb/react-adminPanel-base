import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Layout} from 'antd';
import Input from '../../components/uielements/input';
import TodoList from './todoList';
import {TodoWrapper} from './todo.style';

const {Header, Content} = Layout;


@inject('todos', 'routing')
@observer
export default class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodo: '',
        };
    }

    render() {

        const todosStore = this.props.todos;

        return (
            <Layout style={{background: 'none'}}>
                <TodoWrapper className="isomorphicTodoComponent">
                    <Header className="isoTodoHeader">
                        <Input
                            placeholder={'Type here for add a new todo'}
                            value={this.state.newTodo}
                            className="isoTodoInput"
                            onChange={event => this.setState({newTodo: event.target.value})}
                            onPressEnter={event => {
                                this.setState({newTodo: ''});
                                todosStore.addTodo(event.target.value);
                            }}
                        />
                    </Header>
                    <Content className="isoTodoContentBody">
                        <TodoList
                            todos={todosStore.todos}
                            deleteTodo={todosStore.deleteTodo}
                            edittodo={todosStore.edittodo}
                            colors={todosStore.colors}
                            allCompleted={todosStore.allCompleted}
                            deleteCompleted={todosStore.deleteCompleted}
                        />
                    </Content>
                </TodoWrapper>
            </Layout>
        );
    }
}