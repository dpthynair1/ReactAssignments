import * as React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import TodoList from '../TodoList';

// HACK TO MAKE CODESANDBOX WORK
import expect from 'expect';
global.expect = expect;
require('jest-dom/extend-expect');

// HACK TO MAKE CODESANDBOX CLEANUP WORK RIGHT...
// I PROMISE IT ISNT THIS HACKY IN LOCAL DEVELOPMENT USE...
afterEach(() => {
  const deleteButtons = Array.from(document.querySelectorAll('.todo button'));
  deleteButtons.forEach(button => button.click());
  cleanup();
});

// test0: Make sure the output has the correct important
// DOM nodes and the correct values.
test('renders the correct initial DOM', () => {
  const doc = render(<TodoList />);

  const inputElement = doc.getByTestId('input');
  const todoCountElement = doc.getByTestId('todoCount');
  const todos = doc.queryAllByTestId('todo');

  // The text should show "0 todos"
  expect(todoCountElement).toHaveTextContent('0 todos');

  // The input should be blank.
  expect(inputElement.getAttribute('value')).toBe('');

  // There should be 0 todos in the document.
  expect(todos.length).toBe(0);
});

// test1: Make sure it creates a todo when a user types
// something in the input and clicks the create button.
test('it creates a new todo', () => {
  const doc = render(<TodoList />);

  const inputElement = doc.getByTestId('input');
  const createButtonElement = doc.getByTestId('createButton');
  const todoCountElement = doc.getByTestId('todoCount');

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: 'Feed my dog.' } });
  fireEvent.click(createButtonElement);

  const todos = doc.getAllByTestId('todo');
  const todo = doc.getByTestId('todo');
  const todoNameElement = todo.firstChild;

  // The name should be in the document as "Feed my dog."
  expect(todoNameElement.textContent).toBe('Feed my dog.');

  // The text should show "1 todos"
  expect(todoCountElement).toHaveTextContent('1 todos');

  // The input field should be blank.
  expect(inputElement.value).toBe('');

  // The todo should be in the document.
  expect(todo).toBeInTheDocument();

  // There should be 1 todo in the document.
  expect(todos.length).toBe(1);
});

// test2: Make sure that after creating a todo, if the
// user clicks the delete button, a todo goes away.
test('it deletes a todo', () => {
  const doc = render(<TodoList />);

  const inputElement = doc.getByTestId('input');
  const createButtonElement = doc.getByTestId('createButton');
  const todoCountElement = doc.getByTestId('todoCount');

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: 'Feed my cat.' } });
  fireEvent.click(createButtonElement);

  // Get the newly created todo.
  const todo = doc.queryByTestId('todo');

  // Click the delete button on the todo.
  const todoDeleteButton = doc.getByTestId('deleteButton');
  fireEvent.click(todoDeleteButton);

  // queryByTestId / queryAllByTestId is for when you don't
  // think there will be any matches for the query. Whereas
  // getByTestId / getAllByTestId throws an error if there
  // are no matched elements, query* does not.
  const todos = doc.queryAllByTestId('todo');

  // The text should be "0 todos"
  expect(todoCountElement).toHaveTextContent('0 todos');

  // The todo we created should not be in the document.
  expect(todo).not.toBeInTheDocument();

  // There should be 0 todos found in the document.
  expect(todos.length).toBe(0);
});
