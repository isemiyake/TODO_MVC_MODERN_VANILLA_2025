import "./styles.css";
import TodoList from "./components/todoList/TodoList";
window.TodoList =new TodoList({
  el:"#app",
  apiURL: "https://68d856542144ea3f6da7e480.mockapi.io/"
});
