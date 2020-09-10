'use strict'

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = (localStorage.getItem('value')) ? JSON.parse(localStorage.getItem('value')) : [];

function render() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach(function(item, id) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' +
                  '<div class="todo-buttons">' +
                    '<button data-id="'+ id +'" class="todo-remove"></button>' +
                    '<button class="todo-complete"></button>' +
                  '</div>';
    if(item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li)
    }

    const btnTodoCompleted = li.querySelector('.todo-complete');
    const btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoCompleted.addEventListener('click', function() {
      item.completed = !item.completed;
      saveLocalStor();
      render();
    })

    btnTodoRemove.addEventListener('click', function() {
      todoList.removeChild(li);
      todoData.splice(this.dataset.id, 1);
      saveLocalStor();
    })

    headerInput.value = ''
  })

};

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  if(headerInput.value == '') return alert('Заполните поле');
  
  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  todoData.push(newTodo);
  saveLocalStor();
  render();
});

function saveLocalStor() {
  let todoJson = JSON.stringify(todoData);
  localStorage.setItem('value', todoJson)
}

render();