import{ createStore } from "redux";

const add = document.getElementById("add")
const minus = document.getElementById("minus")
const number = document.querySelector("span")

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (state = 0, action) => {
  switch(action.type){
    case ADD :
      return state = state +1
    case MINUS :
      return state = state - 1
    default : 
      return state;
  }
};
//처음으로 데이터를 바꿔주는 역할을 한다.
//그리고 리턴하는 것은 앱에 있는 데이터이다. 그리고 유일하게 데이터를 변환할 수 있는 함수이다.
//state라는 데이터에 디폴트 값을 인자로 준다. 
//reducer에서 state인자가 더해지거나 빼지는 것과 같은 행위를 가능하게 하는 것이 바로 액션이다.

const countStore = createStore(countModifier);
//createStore은 reducer라는 함수를 인자로 받아야 한다.

number.innerText = 0;

const onChange = () => {
  number.innerText = countStore.getState()
}

countStore.subscribe(onChange);
//subscribe를 통해 store의 변화를 감지.

//action은 오브젝트 형태만을 허용한다.
const handleAdd = () => {
  countStore.dispatch({type : ADD})
}

const handleMinus = () => {
  countStore.dispatch({type : MINUS})
}

console.log(countStore.getState());

// let count = 0;//이 앱에서 유일하게 변하는 데이터 부분. 하단의 코드의 모든 목적들은 이 데이터를 수정하기 위함이다.
// number.innerText = count;

// //값이라는 데이터를 업데이트
// const updateText = () => {
//   number.innerText = count
// }

// //값을 변화
// const handleAdd = () => {
//   count = count+1;
//   updateText();
// }

// const handleMinus = () => {
//   count = count-1
//   updateText();
// }


add.addEventListener("click", handleAdd)
minus.addEventListener("click", handleMinus)

