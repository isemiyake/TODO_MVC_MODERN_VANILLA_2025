import getTemplate from "./template";
import DB from "../../DB";
export default class Todo {
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.completed = data.completed;
    this.createdAt = data.createdAt;
    this.domElt = null;
  }
  render(el) {
    const template = document.createElement("template");
    template.innerHTML = getTemplate(this);
    this.domElt = template.content.firstElementChild;
    this.initEents();
    el.append(this.domElt);
  }
  async toggleCompleted() {
    this.completed = !this.completed;
    this.domElt.classList.toggle("completed");
    window.TodoList.renderItemLeftCount();
    return await DB.updateOne(this);
    
  }
  initEents() {
    this.domElt.querySelector(".toggle").addEventListener("change", (e) => {
      this.toggleCompleted();
    });
    this.domElt.querySelector(".destroy").addEventListener('click',()=>
    {
      window.TodoList.deleteOneById(this.id);
    })
  }
}
