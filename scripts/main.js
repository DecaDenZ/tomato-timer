// разделить работу приложения на 3 фазы
// фааза выбора задачи, рабочая фаза = 25 минут работы четчика,
//фаза отдыха = 5 - 20 минут работы счетчика
const TIME_TO_WORK = 1500000; //25 минут в мс
const TIME_TO_LITTLE_REST = 300000; // 5 минут в милисекундах
const TIME_TO_BIG_REST = 900000; // 15 минут в мс
var activeTask = 'Выберите задачу';
var time = TIME_TO_WORK; // глобальная переменная, нужен глобальный доступ чтобы была возможность сброса таймера

function addTask(){
   var newTask = prompt('Введите задачу');
   var taskItem = $(".task-item:last").clone().text(newTask);
   $(".task-item:last").after(taskItem);
}

function timer(){
   time = time - 1000;
   var countdown = new Date(time);
   $(".timer").empty();
   $(".timer").append("<div>" + countdown.getMinutes() + " : " + countdown.getSeconds() + "</div>");
}

function startTimer(){

}


$(document).ready(function(){
   'use strict';
   $(".add-task").click(addTask);
   let timerId = setInterval (timer(), 1000);
   setTimeout(() => { clearInterval(timerId); alert('stop'); }, 15000);

   $("#button-start").click(startTimer);

})
