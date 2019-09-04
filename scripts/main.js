// разделить работу приложения на 3 фазы
// фааза выбора задачи, рабочая фаза = 25 минут работы четчика,
//фаза отдыха = 5 - 20 минут работы счетчика
const TIME_TO_WORK = 14000; //25 минут в мс
const TIME_TO_LITTLE_REST = 30000; // 5 минут в милисекундах
const TIME_TO_BIG_REST = 90000; // 15 минут в мс
const PHASE_REST = 'rest';
const PHASE_WORK = 'work';
const PHASE_STOP = 'stop';

var activePhase = PHASE_STOP;
var activeTask = 'Выберите задачу';
var time = TIME_TO_WORK; // глобальная переменная, нужен глобальный доступ
//чтобы была возможность сброса таймера из других функций
var timerId;
var counter = 1; // отсчет количества выполненных помидоров

function chooseCurrentTask(e) {
  $(".active-task h1").text(e.currentTarget.innerHTML);
  stopTimer();
}

function addTask() {
  var newTask = prompt('Введите задачу');
  $(".task-list").append("<li class='task-item'></li>");
  $(".task-item:last").text(newTask);
  $(".task-item").on('click', (e) => chooseCurrentTask(e));
}

function startTimer() {
  activePhase = PHASE_WORK;
  counter = 1;
  timerId = setInterval(timer, 1000);
}

function timer() {
  console.log(counter);
  var countdown = new Date(time);
  $(".timer").empty();
  $(".timer").append("<div>" + countdown.getMinutes()
    + " : " + countdown.getSeconds() + "</div>");

  if (time === 0) {
    if (activePhase === PHASE_WORK) {
      alert('Отдохните немного');
      activePhase = PHASE_REST;
      time = TIME_TO_LITTLE_REST;
    } else {
      if (counter < 4) {
        alert('Вернитесь к задаче');
        time = TIME_TO_WORK;
        activePhase = PHASE_WORK;
        counter++;
      } else {
        alert('Одохните побольше');
        time = TIME_TO_BIG_REST;
        counter = 1;
      }
      }
    }
  time -= 1000;
}

function stopTimer() {
  time = TIME_TO_WORK;
  activePhase = PHASE_STOP;
  clearInterval(timerId);
}

$(document).ready(function() {
  'use strict';
  $(".add-task").click(addTask);
  $("#button-start").click(startTimer);
  $("#button-stop").click(stopTimer);
})
