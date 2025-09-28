import "./style.css";
export default function getTemplate(todo){
return `<li>${todo.content}</li>`;
}