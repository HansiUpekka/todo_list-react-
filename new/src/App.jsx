import { useState } from 'react'
import './App.css'

// TodoList renders headings, each with its own list items and controls.
const TodoList = () => {
  // Each todo has { heading: string, lists: string[] }.
  const [todos, setTodos] = useState([])
  // Input for the new heading at the top.
  const [headingInput, setHeadingInput] = useState('')
  // Per-heading input values for list items (keyed by heading index).
  const [listInputs, setListInputs] = useState({})

  // Add a new heading card.
  const handleAddTodo = () => {
    const trimmed = headingInput.trim()
    if (!trimmed) {
      return
    }

    setTodos([...todos, { heading: trimmed, lists: [] }])
    setHeadingInput('')
  }

  // Delete a heading card by index.
  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, todoIndex) => todoIndex !== index))
  }

  // Submit heading on Enter.
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  }

  // Track list input text per heading.
  const handleListInputChange = (todoIndex, value) => {
    setListInputs((prevInputs) => ({
      ...prevInputs,
      [todoIndex]: value,
    }))
  }

  // Add a list item under a specific heading.
  const handleAddList = (todoIndex) => {
    const trimmed = (listInputs[todoIndex] || '').trim()
    if (!trimmed) {
      return
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo, index) =>
        index === todoIndex
          ? { ...todo, lists: [...(todo.lists || []), trimmed] }
          : todo
      )
    )

    setListInputs((prevInputs) => ({
      ...prevInputs,
      [todoIndex]: '',
    }))
  }

  // Submit list item on Enter.
  const handleListInputKeyDown = (todoIndex, event) => {
    if (event.key === 'Enter') {
      handleAddList(todoIndex)
    }
  }

  // Remove a single list item from a heading.
  const handleDeleteListItem = (todoIndex, itemIndex) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, index) =>
        index === todoIndex
          ? {
              ...todo,
              lists: todo.lists.filter((_, listIndex) => listIndex !== itemIndex),
            }
          : todo
      )
    )
  }

  return (
    <div className="page">
      {/* Heading input section */}
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-row">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(event) => setHeadingInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          <button type="button" className="add-list-button" onClick={handleAddTodo}>
            Add Heading
          </button>
        </div>
      </div>

      {/* Render heading cards with list items and inputs */}
      <div className="todo-main">
        {todos.map((todo, index) => (
          <div key={`${todo.heading}-${index}`} className="todo-card">
            <div className="heading-todo">
              <h3>{todo.heading}</h3>
              <button
                type="button"
                className="delete-button-heading"
                onClick={() => handleDeleteTodo(index)}
              >
                Delete Heading
              </button>
            </div>
            {todo.lists?.length ? (
              <ul className="list-items">
                {todo.lists.map((item, itemIndex) => (
                  <li key={`${item}-${itemIndex}`} className="list-item">
                    <span>{item}</span>
                    <button
                      type="button"
                      className="delete-list-button"
                      onClick={() => handleDeleteListItem(index, itemIndex)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="add-list">
              <input
                type="text"
                className="list-input"
                placeholder="Add List"
                value={listInputs[index] || ''}
                onChange={(event) => handleListInputChange(index, event.target.value)}
                onKeyDown={(event) => handleListInputKeyDown(index, event)}
              />
              <button
                type="button"
                className="add-list-button"
                onClick={() => handleAddList(index)}
              >
                Add List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoList
