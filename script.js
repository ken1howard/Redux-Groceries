// Establish DOM elements as variables
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

// Instantiate default state value:
const initialState = []
   // Redux reducer
const groceryReducer = (state = initialState, action) => {
    switch(action.type) {
        case "grocery/add":
            return [...state, { text: action.text }]
        case "grocery/clear":
            return []
        default:
            return state
    }
}

// Redux create store
let store = Redux.createStore(groceryReducer)

// Dispatch functions (action objects)
const clearList = () => {
    document.getElementById("newItem").value = ""
    store.dispatch({ type: 'grocery/clear' })
}

const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById("newItem").value
    store.dispatch({
        type: "grocery/add",
        text: groceryText
    })
    console.log(store.getState())
}

// Render list
const renderList = () => {
    const state = store.getState()
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        let li = document.createElement('li')
        li.textContent = grocery.text
        list.appendChild(li)
    })
}

store.subscribe(renderList)

grocerySubmit.addEventListener('click', (e) => {newGrocery(e)})
clearBtn.addEventListener('click', clearList)