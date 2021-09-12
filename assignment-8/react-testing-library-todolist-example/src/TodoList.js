import React from 'react';
import nanoid from 'nanoid';

export default class TodoList extends React.Component {
  state = {
    todos: [],
    inputValue: '',
  };

  setInputValue = event => {
    const { value } = event.target;
    this.setState({ inputValue: value });
  };

  deleteTodo = id => {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
  };

  createTodo = () => {
    const newTodo = { id: nanoid(), name: this.state.inputValue };
    this.setState({ todos: [...this.state.todos, newTodo], inputValue: '' });
  };

  render() {
    return (
      <div data-testid="TodoList">
        <p data-testid="todoCount">{this.state.todos.length} todos</p>
        {this.state.todos.map((todo, i) => (
          <div className="todo" data-testid="todo">
            <span className="name">{todo.name}</span>
            <br />
            <button
              data-testid="deleteButton"
              className="deleteButton"
              onClick={() => this.deleteTodo(todo.id)}
            >
              DELETE
            </button>
          </div>
        ))}

        <p>Create a new todo.</p>

        <input
          onChange={this.setInputValue}
          value={this.state.inputValue}
          placeholder="New Todo"
          data-testid="input"
        />
        <br />
        <button
          onClick={this.createTodo}
          className="createButton"
          data-testid="createButton"
        >
          CREATE
        </button>
      </div>
    );
  }
}
