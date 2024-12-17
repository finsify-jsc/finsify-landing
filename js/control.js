// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".pages").length;
var allElementSetFirst = $(".header, .header .joinUsBtn, .bottomAddress, .social");
var scrollArrow = $(".scroll-down-dude");

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function setColorElementNotFirst(currentPage){
  if (currentPage === totalSlideNumber - 1) {
    scrollArrow.addClass("hidden");
  }

  if (currentPage !== 0) {
    allElementSetFirst.addClass("notFirst");
    $(".onlyGrid").removeClass("hidden");
    scrollArrow.addClass("notFirst");
    return
  }

  $(".onlyGrid").addClass("hidden");
  allElementSetFirst.removeClass("notFirst");
  scrollArrow.removeClass("notFirst hidden");
  return
}

function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    toggleIconScroll(currentSlideNumber, totalSlideNumber);
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        setColorElementNotFirst(currentSlideNumber);
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
        setColorElementNotFirst(currentSlideNumber);
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".pages").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".pages").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}

function getCurrentYear(){
  var year = new Date().getFullYear();
  $("#year").text(year);
}

getCurrentYear();

//action when click on menu items
$("#headerNav a").click(function(){
  var dataSlide = Number($(this).attr("data-slide"));

  if (dataSlide > currentSlideNumber) {
    for (var i = 1; i < dataSlide; i++) {
      $(".pages:nth-child("+i+")").removeClass("up-scroll").addClass("down-scroll");
    }

    currentSlideNumber = dataSlide - 1;
    setColorElementNotFirst(currentSlideNumber);
    return;
  }

  if (dataSlide <= currentSlideNumber) {
    for (var i = 1; i < dataSlide; i++) {
      $(".pages:nth-child("+i+")").removeClass("up-scroll").addClass("down-scroll");
    }
    for (var i = totalSlideNumber - 1 ; i >= dataSlide; i--) {
      $(".pages:nth-child("+i+")").removeClass("down-scroll").addClass("up-scroll");
    }

    currentSlideNumber = dataSlide - 1;
    setColorElementNotFirst(currentSlideNumber);
    return;
  }
});

// ---------------- MODAL ----------------//
$('.apllyModal, .contactModal').click(function(){
  var nameId = $(this).attr('nameId');
  $('#'+ nameId).removeAttr('class').addClass("one");
  $('body').addClass('modal-active');
});

$('.closeModal').click(function(){
  var id = $(this).parents(".one").attr("id");
  console.log(id);
  $('#'+id).addClass('out');
  $('body').removeClass('modal-active');
});

$('#modal-container-join, #modal-container-contact').click(function(){
  $(this).addClass('out');
  $('body').removeClass('modal-active');
});

$('.modal').click(function(e){
  e.stopPropagation();
});

// ------------ MENU ---------------- //

// ------------------- PLAY VIDEO --------- //
var header = $(".header");
var footer = $(".bottomAddress");
var closeVideoBtn = $("#closeVideo");
var playVideoBtn = $(".playVideoBtn");
var homePage = $("#homePage");
var h1TextHome = $("#homePage h1");
var h2TextHome = $("#homePage h2");
var joinUsBtn = $("#homePage h2 + button");

playVideoBtn.click(function(){
  ticking = true;
  header.attr('class', 'header animated fadeOutUp');
  footer.attr('class', 'bottomAddress animated fadeOutDown');
  playVideoBtn.attr('class', 'playVideoBtn animated fadeOutDown');
  h1TextHome.attr('class', 'animated fadeOutUp');
  h2TextHome.attr('class', 'animated fadeOutUp');
  joinUsBtn.attr('class', 'joinUsBtn curve-red-btn animated fadeOutUp');
  closeVideoBtn.attr('class', 'animated fadeIn');
  homePage.addClass("openVideo");
});

closeVideoBtn.click(function(){
  slideDurationTimeout(slideDurationSetting);
  header.attr('class', 'header animated fadeInDown');
  footer.attr('class', 'bottomAddress animated fadeInUp');
  closeVideoBtn.attr('class', 'animated fadeOut');
  playVideoBtn.attr('class', 'playVideoBtn animated fadeInUp');
  h1TextHome.attr('class', 'animated fadeInDown');
  h2TextHome.attr('class', 'animated fadeInDown');
  joinUsBtn.attr('class', 'joinUsBtn curve-red-btn animated fadeInDown');
  homePage.removeClass("openVideo");
});

var iconScroll = $(".bottomAddress .scroll");
// toggle scroll mouse
function toggleIconScroll(current, total){
  if (current === (total - 1)) {
    iconScroll.addClass("hidden")
  } else {
    iconScroll.removeClass("hidden")
  }

  if (current !== 0) {
    iconScroll.removeClass("white")
  } else {
    iconScroll.addClass("white")
  }
}
