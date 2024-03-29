import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import {Http} from '../../http'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    clearError()
    try {
      const data = await Http.post('https://todo-app-c73df-default-rtdb.firebaseio.com/todos.json', {title})
      dispatch({ type: ADD_TODO, title, id: data.name })
    } catch(e) {
      showError('Что-то пошло не так...')
    }
  }

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'Выполнить',
      `Вы уверены, что выполнили "${todo.title}"?`,
      [
        {
          text: 'Нет',
          style: 'destructive'
        },
        {
          text: 'Да',
          style: 'cancel',
          onPress: async () => {
            changeScreen(null)
            await Http.delete(`https://todo-app-c73df-default-rtdb.firebaseio.com/todos/${id}.json`)
            dispatch({ type: REMOVE_TODO, id })
          }
        }
      ],
      { cancelable: false }
    )

  }

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try {
      const data = await Http.get('https://todo-app-c73df-default-rtdb.firebaseio.com/todos.json')
      if (data === null) {
        const todos = []
        dispatch({ type: FETCH_TODOS, todos })
      } else {
        const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
        dispatch({ type: FETCH_TODOS, todos })
      }
    } catch (e) {
      showError('Что-то пошло не так...')
      console.log(e)
    } finally {
      hideLoader()
    }
  }

  const updateTodo = async (id, title) => {
    clearError()
    try {
      await Http.patch(`https://todo-app-c73df-default-rtdb.firebaseio.com/todos/${id}.json`)
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (e) {
      showError('Что-то пошло не так...')
      console.log(e)
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = error => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return <TodoContext.Provider value={{
    todos: state.todos,
    loading: state.loading,
    error: state.error,
    addTodo,
    removeTodo,
    updateTodo,
    fetchTodos
  }}>
    {children}
  </TodoContext.Provider>
}