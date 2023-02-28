import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';


export const useTodos = () => {
    
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    const [ todos, dispatch ] = useReducer( todoReducer, [], init );
    
    useEffect(() => {
        //console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos) || []);

    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        //console.log(todo);    
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        
        dispatch( action );    
    }

    const handleToggleTodo = ( id ) => {
        //console.log({ id });
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }
        
        dispatch( action );

    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length,
        handleNewTodo,
        handleToggleTodo,
        handleDeleteTodo,
    }



}