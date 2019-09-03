// разделить работу приложения на 3 фазы
// фааза выбора задачи, рабочая фаза = 25 минут работы четчика,
//фаза отдыха = 5 - 20 минут работы счетчика
const TIME_TO_WORK = 1499000; //25 минут в мс
const TIME_TO_LITTLE_REST = 300000; // 5 минут в милисекундах
const TIME_TO_BIG_REST = 900000; // 15 минут в мс
const PHASE_REST = 'rest';
const PHASE_WORK = 'work';
const PHASE_STOP = 'stop';

var activePhase = PHASE_STOP;
var activeTask = 'Выберите задачу';
var time = TIME_TO_WORK; // глобальная переменная, нужен глобальный доступ
//чтобы была возможность сброса таймера из других функций

function chooseCurrentTask(e){
   $(".active-task h1").text(e.currentTarget.innerHTML);
   stopTimer();
}

function addTask(){
   var newTask = prompt('Введите задачу');
   // var taskItem = $(".task-item:last").clone().text(newTask);

   $(".task-list").append("<li class='task-item'></li>");
   $(".task-item:last").text(newTask);
   $(".task-item").on('click', (e) => chooseCurrentTask(e));
}

function timer(){
   var countdown = new Date(time);
   $(".timer").empty();
   $(".timer").append("<div>"
        + countdown.getMinutes()
        + " : "
        + countdown.getSeconds()
        + "</div>");
   time = time - 1000;
}

function startTimer(){
   activePhase = PHASE_WORK;
  let timerId = setInterval (timer, 1000);
  setTimeout(() => { clearInterval(timerId); alert('stop'); }, 15000);
}

function stopTimer(){
   time = TIME_TO_WORK;
   activePhase = PHASE_STOP;
   console.log(time);
}


$(document).ready(function(){
   'use strict';
   $(".add-task").click(addTask);
   $("#button-start").click(startTimer);
   $("#button-stop").click(stopTimer);
   $(".task-item").on('click', (e) => chooseCurrentTask(e));
})
