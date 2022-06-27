import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  // find components
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  // set test values
  const dueDate = "05/30/2023";
  const task = "History Test";

  // perform actions on page
  fireEvent.change(inputTask, { target: { value: task}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, { target: { value: task}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  // set search for text on document
  const check = screen.getByText(/History Test/i);

  // check if text on document
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
    // find components
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
  
    // set test values
    const dueDate = "05/30/2023";
  
    // perform actions on page
    fireEvent.change(inputTask, { target: { value: null}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
  
    // set search for text on document
    const check = screen.getByText(/You have no todo's left/i);
  
    // check if text on document
    expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
    // find components
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
  
    // set test values
    const task = "History Test";
  
    // perform actions on page
    fireEvent.change(inputTask, { target: { value: task}});
    fireEvent.change(inputDate, { target: { value: null}});
    fireEvent.click(element);
  
    // set search for text on document
    const check = screen.getByText(/You have no todo's left/i);
  
    // check if text on document
    expect(check).toBeInTheDocument();
 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
    // find components
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
  
    // set test values
    const dueDate = "05/30/2023";
    const task = "History Test";
  
    // perform actions on page
    fireEvent.change(inputTask, { target: { value: task}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);

    // check off checkbox
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
  
    // set search for text on document
    const check = screen.getByText(/You have no todo's left/i);
  
    // check if text on document
    expect(check).toBeInTheDocument();
 });

 test('test that App component renders different colors for past due events', () => {
  render(<App />);
    // find components
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
  
    // set test values
    const dueDate = "05/30/2022";
    const task = "History Test";
  
    // perform actions on page
    fireEvent.change(inputTask, { target: { value: task}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
  
    // set search for text on document
    const check = screen.getByTestId(/History Test/i).style.background;
  
    // check if text on document
    expect(check).toBe("rgb(188, 160, 220)");
 });
