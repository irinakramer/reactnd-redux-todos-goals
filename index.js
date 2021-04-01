// LIBRARY
function createStore (reducer) {
  // The store should have four parts:
  // 1. The State
  let state;
  let listeners = [];

  // 2. Get the state
  const getState = () => state;

  // 3. Listen for changes on the state
  // Push into it a function that is being called when subscribe is being called
  const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
          listeners = listeners.filter((l) => l !== listener)
      }
  }

  // 4. Update the state
  const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
  }

  // returns object that exposes the getState()
  return {
      getState,
      subscribe,
      dispatch,
  }
}


// APP CODE
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action creators
function addTodoAction(todo) {
  return {
      type: ADD_TODO,
      todo,
  }
}

function removeTodoAction(id) {
  return {
      type: REMOVE_TODO,
      id,
  }
}

function toggleTodoAction (id) {
  return {
      type: TOGGLE_TODO,
      id
  }
}

function addGoalAction(goal) {
  return {
      type: ADD_GOAL,
      goal
  }
}

function removeGoalAction(id) {
  return {
      type: REMOVE_GOAL,
      id
  }
}


//Reducer, takes in current state and the action,
// returns new state
function todos (state = [], action) {
  switch(action.type) {
      case ADD_TODO :
          return state.concat([action.todo]);
      case REMOVE_TODO :
          return state.filter((todo) => todo.id !== action.id)
      case TOGGLE_TODO :
          return state.map((todo) => todo.id !== action.id ? todo :
              Object.assign({}, todo, {complete: !todo.complete}))
      default :
          return state
  }
}

function goals (state = [], action) {
  switch(action.type) {
      case ADD_GOAL :
          return state.concat([action.goal]);
      case REMOVE_GOAL :
          return state.filter((goal) => goal.id !== action.id)
      default :
          return state
  }
}

// root reducer
function app (state = {}, action) {
  return {
      todos: todos(state.todos, action),
      goals: goals(state.goals, action),
  }
}


const store = createStore(app)

store.subscribe(() => {
  console.log("The new state is ", store.getState())
})

store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Wash the car',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Go to the gym',
  complete: true,
}))

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux'
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Lose 20 pounds'
}))

store.dispatch(removeGoalAction(0))