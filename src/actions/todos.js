import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

function addTodo (todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodo (id) {
return {
    type: REMOVE_TODO,
    id,
}
}

function toggleTodo (id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

export function handleAddTodo (name, cb) {
    return (dispatch) => {
        return API.saveTodo(name)
            .then((todo) => {
                dispatch(addTodo(todo))
                cb();
            })
            .catch(() => {
                alert("There was an error, please try again")
            })
    }
}

export function handleToggle (id) {
    return (dispatch) => {
        dispatch(toggleTodo(id))
        return API.saveTodoToggle(id)
            .catch(() => {
                dispatch(toggleTodo(id))
                alert("An error occurred, try again.")
            })
    }
}

export function handleDeleteTodo (todo) {
    return (dispatch) => {
        // remove the item
        dispatch(removeTodo(todo.id))
        // if there's an issue add the item back and show an error
        return API.deleteTodo(todo.id)
            .catch(() => {
                dispatch(addTodo(todo))
                alert("An error occurred, try again.")
            })  
    }
    
}