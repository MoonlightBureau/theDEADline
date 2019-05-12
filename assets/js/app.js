console.log("HIYA 👋")

function getNumberOfDays(year, month) {
  var isLeap = ((year % 4) == 0 && ((year % 100) != 0 || (year % 400) == 0));
  return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

window.initPBSCountdown = function( el ) {

  var eventDateAttr = el.getAttribute('data-countdown-date');
  var year = new Date(eventDateAttr).getYear() + 1900;
  var month = new Date(eventDateAttr).getMonth() + 1;

  var daysInMonth = getNumberOfDays(year, month);
   console.log(daysInMonth);
  var remTime = Date.parse( new Date( eventDateAttr )) - Date.parse( new Date());
  var seconds = Math.floor(( remTime / 1000 ) % 60 );
  var minutes = Math.floor(( remTime / 1000 / 60 ) % 60 );
  var hours = Math.floor(( remTime / ( 1000 * 60 * 60 )) % 24 );
  var days = Math.floor( remTime / ( 1000 * 60 * 60 * 24 ) );
  var months = Math.floor( days / 31 );
  var weeks = Math.floor( days / 7 );
  var years = Math.floor( months / 12 );
  return {
    'remainingTime' : remTime,
    'years' : years,
    'months' : months,
    'weeks' : weeks,
    'days' : days,
    'minutes' : minutes,
    'hours' : hours,
    'seconds' : seconds
  };
}

window.initPBSCountdownClock = function( el ) {
  var updateClock = function() {
    var remTime = initPBSCountdown( el );

    if ( el.querySelector( '.pbs-countdown-years' ) ) {
      el.querySelector( '.pbs-countdown-years .pbs-countdown-number' ).innerHTML = remTime.years;
      remTime.years = Math.round( remTime.days % remTime.days );
      remTime.months =  Math.round( remTime.months % 12 );
      remTime.days = remTime.days % 365;
    } else {
      remTime.months =  parseInt(( remTime.years / 12 ) + remTime.months );
    }
    if ( el.querySelector( '.pbs-countdown-months' ) ) {
      el.querySelector( '.pbs-countdown-months .pbs-countdown-number' ).innerHTML = remTime.months;
      console.log(remTime.days);
      // remTime.days = Math.round( remTime.days % 31 );
      remTime.days = remTime.days % 365;
      remTime.weeks = Math.round( remTime.days / 7 );
    } else {
      remTime.weeks = parseInt( remTime.days / 7 );
    }
    if ( el.querySelector( '.pbs-countdown-weeks' ) ) {
      el.querySelector( '.pbs-countdown-weeks .pbs-countdown-number' ).innerHTML = remTime.weeks;
       remTime.days =  Math.round( remTime.days % 7 );
    } else {
      remTime.days = parseInt( remTime.days ) ;
    }
    if ( el.querySelector( '.pbs-countdown-days' ) ) {
      el.querySelector( '.pbs-countdown-days .pbs-countdown-number' ).innerHTML = remTime.days;
    } else {
      remTime.hours = parseInt(( remTime.days * 24 ) + remTime.hours );
    }
    // console.log(remTime.days);
    if ( el.querySelector( '.pbs-countdown-hours' ) ) {
      el.querySelector( '.pbs-countdown-hours .pbs-countdown-number' ).innerHTML = remTime.hours;
    } else {
      remTime.minutes = parseInt(( remTime.hours * 60 ) + remTime.minutes );
    }
    if ( el.querySelector( '.pbs-countdown-minutes') ) {
      el.querySelector( '.pbs-countdown-minutes .pbs-countdown-number' ).innerHTML = remTime.minutes;
    } else {
      remTime.seconds = parseInt(( remTime.minutes * 60 ) + remTime.seconds );
    }
    if ( el.querySelector( '.pbs-countdown-seconds' ) ) {
      el.querySelector( '.pbs-countdown-seconds .pbs-countdown-number' ).innerHTML = remTime.seconds;
    }

    if ( remTime.remTime <= 0 ) {
      clearInterval(interval);
    }
  }
  updateClock();
  var interval = setInterval( updateClock, 1000);
}

window.addEventListener( 'DOMContentLoaded', function() {
  var elements = document.querySelectorAll( '.pbs-countdown' );
  Array.prototype.forEach.call( elements, function( el, i ) {
    window.initPBSCountdownClock( el );
  } );
} );

Date.prototype.weekofMonth= function(){
 return Math.floor((this.getDate()-1)/7)+1;
}


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("nav").classList.add("weScrollin");
    document.getElementById("nav").classList.remove("weChillin");
  } else {
    document.getElementById("nav").classList.add("weChillin");
    document.getElementById("nav").classList.remove("weScrollin");
  }
}
