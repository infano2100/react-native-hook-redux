import uuid4 from 'uuid/v4'
import { 
  ADD_TODO, 
  GET_TODO, 
  DEL_TODO, 
  EDIT_TODO, 
  TOGGLE_TODO,
} from './actionTypes'

export default todoList = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: uuid4(),
          title: action.payload.title,
          description: action.payload.description,
          completed: false,
          createdAt: new Date().toISOString()
        }
      ]

    case GET_TODO: {
      return state
    }

    case DEL_TODO: {
      const id = action.payload
      const list = state
      const index = list.findIndex(next => next.id === id)
      const nextList = list.slice()
      nextList.splice(index, 1)
      return nextList
    }

    case EDIT_TODO: {
      const { payload } = action
      const list = state

      const index = list.findIndex(next => next.id === payload.id)
      const nextList = list.slice()

      const nextItem = {
        ...list[index],
        ...payload
      }

      nextList.splice(index, 1, nextItem)
      return nextList
    }

    case TOGGLE_TODO:
      let id = action.payload
      return state.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )

    //
    default:
      return state
  }
}