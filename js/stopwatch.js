$(function () {
  //variables
  var [activeStatus, timeCounter, lapCounter, action, lapNumber] = [0, 0, 0, 0, 0];

  //hours,minutes,seconds,centiseconds for time
  var [lapHours, lapMinutes, lapSeconds, lapCentiseconds] = [0, 0, 0, 0];

  //hours,minutes,seconds,centiseconds for lap
  var [Centiseconds, Seconds, Minutes, Hours] = [0, 0, 0, 0];

  //show/hide start and lap buttons
  toggleButtons("#startButton", "#lapButton");

  //click on Start Button
  $("#startButton").click(function () {
    activeStatus = 1;
    toggleButtons("#pauseButton", "#lapButton");
    startAction();
  });

  //click on Pause Button
  $("#pauseButton").click(function () {
    toggleButtons("#resumeButton", "#resetButton");
    clearInterval(action);
  });

  //click on Resume Button
  $("#resumeButton").click(function () {
    toggleButtons("#pauseButton", "#lapButton");
    startAction();
  });

  //click on Reset Button
  $("#resetButton").click(function () {
    clearInterval(action);
    location.reload();
  });

  //click on Lap Button
  $("#lapButton").click(function () {
    if (activeStatus) {
      clearInterval(action);
      lapCounter = 0;
      addLap();
      startAction();
    }
  });

  //toggle between hiding and showing the button elements
  function toggleButtons(x, y) {
    $(".control").hide();
    $(x).show();
    $(y).show();
  }

  //start the counter
  function startAction() {
    action = setInterval(updateTime, 10);
  }

  function updateTime() {
    timeCounter++;
    //calculate stopwatch time and conver centiseconds to hours, mins, seconds and centiseconds
    Hours = Math.floor(timeCounter / 360000);
    Minutes = Math.floor((timeCounter % 360000) / 6000);
    Seconds = Math.floor((timeCounter % 6000) / 100);
    Centiseconds = (timeCounter % 6000) % 100;

    //console.log(timeCounter);

    // Set text contents to the selected elements
    $("#hour").text(leftPad(Hours));
    $("#minute").text(leftPad(Minutes));
    $("#second").text(leftPad(Seconds));
    $("#centisecond").text(leftPad(Centiseconds));

    //calculate lap time and conver centiseconds to hours, mins, seconds and centiseconds
    lapCounter++;
    lapHours = Math.floor(lapCounter / 360000);
    lapMinutes = Math.floor((lapCounter % 360000) / 6000);
    lapSeconds = Math.floor((lapCounter % 6000) / 100);
    lapCentiseconds = (lapCounter % 6000) % 100;

    // Set text contents to the selected elements
    $("#laphour").text(leftPad(lapHours));
    $("#lapminute").text(leftPad(lapMinutes));
    $("#lapsecond").text(leftPad(lapSeconds));
    $("#lapcentisecond").text(leftPad(lapCentiseconds));
  }

  function leftPad(number) {
    return (number < 10 ? "0" + number : number);
  }

  //print lap time details inside the lap area
  function addLap() {
    lapNumber++;
    var lapDetails =
      '<div class="lap">' +
      '<div class="laptitle">' +
      'Lap' + lapNumber +
      '</div>' +
      '<div class="laptime">' +
      '<span>' + leftPad(lapHours) + '</span>' +
      ':<span>' + leftPad(lapMinutes) + '</span>' +
      ':<span>' + leftPad(lapSeconds) + '</span>' +
      ':<span>' + leftPad(lapCentiseconds) + '</span>' +
      '</div>' +
      '</div>';
    $(lapDetails).prependTo("#laps");
  }
});