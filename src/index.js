import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");


const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
  return { type: ADD_TODO, text };
}

const deleteTodo = id => {
  return {type: DELETE_TODO, id}
}
//filter method를 활용해서, 해당 데이터를 삭제한다.

const reducer = (state = [], action) => {
console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [{text: action.text, id: Date.now() }, ...state];
      //데이터 변화를 위해서 새로운 빈 배열의 state를 만들고, 새로운 state를 그곳에 집어넣어주기
    case DELETE_TODO:
      return state.filter(toDo => toDo.id != action.id);
    default:
      return state;
  }
};

//store을 수정할 수 잇는 방법은 액션 뿐이다.
//immutable하다. 즉 store에 직접 접근해서 그 안의 데이터를 직접 변경할 수 없다. 

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()))

const paintToDos  = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDos=> {
    const li = document.createElement("li")
    const btn = document.createElement("button")
    btn.innerText = Delete;
    btn.addEventListener("click", dispatchDeleteTodo)
    li.id = toDo.id;
    li.innerText = toDo.text;
    ul.appendChild(btn)
    ul.appendChild(li)
  })
}

store.subscribe(paintToDos)

const dispatchAddToDo = text => {
  store.dispatch(addToDo(text));
}

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id))
}

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo();
  //액션을 취한 후에, submit 부분에 어떤 것을 넣을 것인지, 어떤 내용을 넣을 것인지에 대해 커뮤니케이션 하는 것. text로 todo를 넣을 것이라고 함.
};


form.addEventListener("submit", onSubmit);
