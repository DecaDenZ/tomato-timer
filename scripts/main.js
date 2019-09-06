// разделить работу приложения на 3 фазы
// фааза выбора задачи, рабочая фаза = 25 минут работы четчика,
//фаза отдыха = 5 - 20 минут работы счетчика
'use strict';
const TIME_TO_WORK = 14000;
const TIME_TO_LITTLE_REST = 15000;
const TIME_TO_BIG_REST = 15000;
// const TIME_TO_WORK = 1499000; //25 минут в мс
// const TIME_TO_LITTLE_REST = 300000; // 5 минут в милисекундах
// const TIME_TO_BIG_REST = 900000; // 15 минут в мс
const PHASE_REST = 'rest';
const PHASE_WORK = 'work';
const PHASE_STOP = 'stop';

var activePhase = PHASE_STOP;
var activeTask = 'Выберите задачу';
var time = TIME_TO_WORK; // глобальная переменная, нужен глобальный доступ
//чтобы была возможность сброса таймера из других функций
var timerId;
var counter = 1; // отсчет количества выполненных помидоров

function chooseActiveTask(e) {
   $(".active-task-item").removeClass("active-task-item").addClass("task-item");
   var newActiveTask = e.currentTarget.innerHTML.slice(0, -54);
   e.currentTarget.className = "active-task-item";
   if (newActiveTask !== activeTask) {
      $(".active-task h1").text(newActiveTask);
      activeTask = newActiveTask;
      stopTimer();
   }
}

function addTask() {
   var newTask = prompt('Введите задачу');
   $(".task-item:last").clone(true).appendTo(".task-list");
   $(".task-item:last").html(newTask + ` <span class="badge badge-primary badge-pill">0</span>`);
}

function startTimer() {
   activePhase = PHASE_WORK;
   counter = 1;
   timerId = setInterval(timer, 1000);
}

function timer() {
   var countdown = new Date(time);
   $(".timer").empty();
   $(".timer").append("<div>" + countdown.getMinutes() +
      " : " + countdown.getSeconds() + "</div>");

   if (time === 0) {
      if (activePhase === PHASE_WORK) {
         addTomato();
         if (counter < 4) {
            alert('Отдохните немного');
            activePhase = PHASE_REST;
            time = TIME_TO_LITTLE_REST;
            counter++;
         } else {
            alert('Одохните побольше');
            time = TIME_TO_BIG_REST;
            counter = 1;
         }
      } else {
         alert('Вернитесь к задаче');
         time = TIME_TO_WORK;
         activePhase = PHASE_WORK;
      }
   } else {
      time -= 1000;
   }

}

function stopTimer() {
   time = TIME_TO_WORK;
   activePhase = PHASE_STOP;
   clearInterval(timerId);
}

function addTomato(){
   var tomatoes = $(".active-task-item span").text();
   $(".active-task-item span").text(++tomatoes);
   // tomatoes.text(++tomatoes.text());
   // tomatoes.text(+tomatoes.text()+1);
}

$(document).ready(function() {
   'use strict';
   $(".add-task").click(addTask);
   $("#button-start").click(startTimer);
   $("#button-stop").click(stopTimer);
   $(".task-item").on('click', (e) => chooseActiveTask(e));
})
