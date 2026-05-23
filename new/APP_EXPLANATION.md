App.jsx line-by-line explanation (current line numbers)

01: import { useState } from 'react'
  - Imports the React hook used to store component state.
02: import './App.css'
  - Loads the styles used by this component.

04: // TodoList renders headings, each with its own list items and controls.
05: const TodoList = () => {
  - Defines a functional React component.

07: const [todos, setTodos] = useState([])
  - State for all headings. Each item is { heading, lists }.
09: const [headingInput, setHeadingInput] = useState('')
  - State for the main heading input field.
11: const [listInputs, setListInputs] = useState({})
  - State for list inputs per heading, keyed by heading index.

14: const handleAddTodo = () => {
  - Adds a new heading card.
15: const trimmed = headingInput.trim()
  - Removes leading/trailing spaces from the heading input.
16-18: if (!trimmed) { return }
  - Prevents adding empty headings.
20: setTodos([...todos, { heading: trimmed, lists: [] }])
  - Appends a new heading with an empty list array.
21: setHeadingInput('')
  - Clears the heading input after adding.

24: const handleDeleteTodo = (index) => {
  - Deletes a heading by its index.
25: setTodos(todos.filter((_, todoIndex) => todoIndex !== index))
  - Keeps all headings except the one at the given index.

29: const handleInputKeyDown = (event) => {
  - Handles key presses in the heading input.
30-33: if (event.key === 'Enter') { handleAddTodo() }
  - Adds a heading when Enter is pressed.

36: const handleListInputChange = (todoIndex, value) => {
  - Updates the list input value for a specific heading.
37-41: setListInputs((prevInputs) => ({ ...prevInputs, [todoIndex]: value }))
  - Copies existing inputs and sets the current heading's input.

44: const handleAddList = (todoIndex) => {
  - Adds a list item to a specific heading.
45: const trimmed = (listInputs[todoIndex] || '').trim()
  - Reads the input for that heading and trims it.
46-48: if (!trimmed) { return }
  - Prevents adding empty list items.
51-57: setTodos((prevTodos) => prevTodos.map(...))
  - Updates the correct heading by index.
53-55: { ...todo, lists: [...(todo.lists || []), trimmed] }
  - Appends the new list item to that heading.
59-62: setListInputs((prevInputs) => ({ ...prevInputs, [todoIndex]: '' }))
  - Clears the list input for the current heading.

65: const handleListInputKeyDown = (todoIndex, event) => {
  - Handles Enter key in a list input.
66-69: if (event.key === 'Enter') { handleAddList(todoIndex) }
  - Adds the list item on Enter.

72: const handleDeleteListItem = (todoIndex, itemIndex) => {
  - Deletes a single list item under a specific heading.
73-82: setTodos((prevTodos) => prevTodos.map(...))
  - Updates only the heading matching todoIndex.
77-80: lists: todo.lists.filter((_, listIndex) => listIndex !== itemIndex)
  - Removes the list item by its index.

86: return (
  - Starts the JSX render output.
87: <div className="page">
  - Main page wrapper.

89: <div className="todo-container">
  - Top card with title and heading input.
90: <h1 className="title">My Todo List</h1>
  - App title.
91: <div className="input-row">
  - Row for heading input and button.
92-99: <input ... />
  - Controlled input bound to headingInput.
100-103: <button ... onClick={handleAddTodo}>
  - Adds the heading when clicked.

106: <div className="todo-main">
  - Container for all heading cards.
107-154: {todos.map((todo, index) => (...))}
  - Renders one card per heading.
108: <div key={`${todo.heading}-${index}`} className="todo-card">
  - Card wrapper with a stable key.
109-118: heading area with title and Delete Heading button.
  - The button calls handleDeleteTodo for this card.

120: {todo.lists?.length ? (
  - Conditionally renders list items when present.
121-134: <ul className="list-items"> ... </ul>
  - Shows each list item with a Delete button.
125-130: Delete button calls handleDeleteListItem.

136: <div className="add-list">
  - Row for list input and Add List button.
137-144: <input ... />
  - Controlled list input for this heading.
145-151: <button ... onClick={() => handleAddList(index)}>
  - Adds the list item to this heading.

160: export default TodoList
  - Makes the component available to other files.
