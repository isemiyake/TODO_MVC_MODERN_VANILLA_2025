import DB from "../../DB";
import Todo from "../todo/Todo";
import getTemplate from "./template";
export default class TodoList {
  constructor(data) {
    this.domElt = document.querySelector(data.el);
    this.listDomELt = null;
    DB.setApiURL(data.apiURL);
    this.todos = [];
    this.loadTodos();
  }
  async loadTodos() {
    const todos = await DB.findAll();
    this.todos = todos.map((todo) => new Todo(todo));
    this.render();
  }
  getTodoCount() {
    return this.todos.filter((todo) => !todo.completed).length;
  }
  renderItemLeftCount() {
    this.domElt.querySelector(".todo-count strong").innerText =
      this.getTodoCount();
  }
  render() {
    this.domElt.innerHTML = getTemplate();
    this.listDomELt = this.domElt.querySelector(".todo-list");
    this.todos.forEach((todo) => todo.render(this.listDomELt));
    window.TodoList.renderItemLeftCount();
    this.initEvent();
  }
  async addTodo(data) {
    const todo = await DB.create(data);

    const newTodo = new Todo(todo);

    this.todos.push(newTodo);

    newTodo.render(this.listDomELt);

    this.renderItemLeftCount();
  }
  initEvent() {
    this.domElt.querySelector(".new-todo").addEventListener("change", (e) => {
      this.addTodo(e.target.value);
      e.target.value = "";
    });
  }
  async deleteOneById(id) {
    const resp = await DB.deleteOneById(id);
    this.todos.splice(
      this.todos.findIndex((todo) => (todo.id == id)),
      1
    );
    this.domElt.querySelector(`[data-id = '${id}']`).remove();
    this.renderItemLeftCount();
  }
}
