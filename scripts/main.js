var activeTask = 'Выберите задачу';

$(document).ready(function(){
   'use strict';
   $(".add-task").click(() => {
      var newTask = prompt('Введите задачу');
      var taskItem = $(".task-item:last").clone().text(newTask);
      $(".task-item:last").after(taskItem);
   })

})
