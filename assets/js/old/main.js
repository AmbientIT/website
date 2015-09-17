/*-----------------------------------------------------------------------------------*/
/* 		Mian Js Start
 /*-----------------------------------------------------------------------------------*/
$(document).ready(function($) {
  "use strict"
  /*-----------------------------------------------------------------------------------*/
  /* 		Flex Slider
   /*-----------------------------------------------------------------------------------*/
  $(document).ready()
  $(window).load(function() {
    $('.flexslider').flexslider({
      animation: "fade",
      controlNav: "thumbnails",
      slideshow: true
    });


  $.material.init();


    /*-----------------------------------------------------------------------------------*/
    /* 		Flex Slider
     /*-----------------------------------------------------------------------------------*/
    $('.flex-blog').flexslider({
      animation: "fade",
      easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
      direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
      reverse: false,                 //{NEW} Boolean: Reverse the animation direction
      animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
      smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
      startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
      slideshow: true,                //Boolean: Animate slider automatically
      slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
      animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
      initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
      randomize: false,
    });
  });





  /*-----------------------------------------------------------------------------------*/
  /* 		Team Slider
   /*-----------------------------------------------------------------------------------*/
  $(document).ready(function() {
    $("#owl-team").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3],
      stopOnHover : true,
      navigation : true, // Show next and prev buttons
      pagination : false,
      navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    });
  });




  /*-----------------------------------------------------------------------------------*/
  /* 		CLIENT Slider
   /*-----------------------------------------------------------------------------------*/
  $(document).ready(function() {
    $("#owl-client").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 4,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3],
      stopOnHover : true,
      navigation : true, // Show next and prev buttons
      pagination : false,
      navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    });
  });





  /*-----------------------------------------------------------------------------------*/
  /* 		CLIENT Slider
   /*-----------------------------------------------------------------------------------*/
  $(document).ready(function() {
    $("#owl-sevices").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 1,
      itemsDesktop : [1199,1],
      singleItem : true,
      itemsDesktopSmall : [979,1],
      stopOnHover : true,
      navigation : true, // Show next and prev buttons
      pagination : false,
      navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    });
  });




  /*-----------------------------------------------------------------------------------*/
  /* 		 Slider
   /*-----------------------------------------------------------------------------------*/
  $(document).ready(function() {
    $(".owl-img").owlCarousel({
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      items : 1,
      itemsDesktop : [1199,1],
      singleItem : true,
      itemsDesktopSmall : [979,1],
      stopOnHover : true,
      navigation : true, // Show next and prev buttons
      pagination : false,
      navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    });
  });





  /*-----------------------------------------------------------------------------------*/
  /*		STICKY NAVIGATION
   /*-----------------------------------------------------------------------------------*/
  $(document).ready(function(){
    $(".sticky").sticky({topSpacing:0});
  });





  /*-----------------------------------------------------------------------------------*/
  /* 	ANIMATION
   /*-----------------------------------------------------------------------------------*/
  var wow = new WOW({
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       100,          // distance to the element when triggering the animation (default is 0)
    mobile:       false        // trigger animations on mobile devices (true is default)
  });
  wow.init();





  /*-----------------------------------------------------------------------------------*/
  /* 	LOADER
   /*-----------------------------------------------------------------------------------*/
  $(window).load(function() {
    $("#loader").delay(500).fadeOut("slow");
  });




  /*-----------------------------------------------------------------------------------*/
  /* 		Back to Top
   /*-----------------------------------------------------------------------------------*/
  $(window).scroll(function(){
    if($(window).scrollTop() > 1000){
      $("#back-to-top");
    } else{
      $("#back-to-top");
    }
  });
  $('#back-to-top, .back-to-top').click(function() {
    $('html, body').animate({ scrollTop:0 }, '1000');
    return false;
  });











  /*-----------------------------------------------------------------------------------*/
  /*    HOME 100% Height
   /*-----------------------------------------------------------------------------------*/
  $(function(){
    var windowH = $(window).height();
    var wrapperH = $('#home').height();
    if(windowH > wrapperH) {
      $('#home').css({'height':($(window).height())+'px'});
      $('#intro').css({'height':($(window).height())+'px'});
      $('#feature').css({'height':($(window).height())+'px'});
    }
    $(window).resize(function(){
      var windowH = $(window).height();
      var wrapperH = $('#wrap').height();
      var differenceH = windowH - wrapperH;
      var newH = wrapperH + differenceH;
      var truecontentH = $('#home').height();
      if(windowH > truecontentH) {
        $('#home').css('height', (newH)+'px');
        $('#intro').css('height', (newH)+'px');
        $('#feature').css('height', (newH)+'px');
      }

    })
  });















  /*-----------------------------------------------------------------------------------*/
  /* 		NAVIGATION SMOOTH SCROLL
   /*-----------------------------------------------------------------------------------*/
  $('.menu nav ul a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      || location.hostname == this.hostname) {
      var target = $(this.hash);
      var href = $.attr(this, 'href');
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          window.location.hash = href;
        });
        return false;
      }
    }
  });
  var navLinkIDs = "";
  $('.menu nav ul a[href*=#]:not([href=#])').each(function(index) {
    if(navLinkIDs != "") {
      navLinkIDs += ", ";
    }
    navLinkIDs += $('.menu nav ul a[href*=#]:not([href=#])').eq(index).attr("href");
  });
  if( navLinkIDs ) {
    $(navLinkIDs).waypoint(function(direction) {
      if(direction=='down') {
        $('.menu nav ul a').parent().removeClass("active");
        $('.menu nav ul a[href="#'+$(this).attr('id')+'"]').parent().addClass("active");
      }
    }, { offset: 70 });
    $(navLinkIDs).waypoint(function(direction) {
      if(direction=='up') {
        $('.menu nav ul a').parent().removeClass("active");
        $('.menu nav ul a[href="#'+$(this).attr('id')+'"]').parent().addClass("active");
      }
    }, {  offset: function() {
      return -$(this).height() + 20;
    } });
  }




  /*-----------------------------------------------------------------------------------*/
  /* 		Active Menu Item on Page Scroll
   /*-----------------------------------------------------------------------------------*/
  $(window).scroll(function(event) {
    Scroll();
  });
  $('.scroll a').click(function() {
    console.log(this.hash);
    $('html, body').animate({scrollTop: $(this.hash).offset().top -10}, 1000);
    return false;
  });
  // User define function
  function Scroll() {
    var contentTop      =   [];
    var contentBottom   =   [];
    var winTop      =   $(window).scrollTop();
    var rangeTop    =   200;
    var rangeBottom =   500;
    $('nav').find('.scroll a').each(function(){
      contentTop.push( $( $(this).attr('href') ).offset().top);
      contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
    })
    $.each( contentTop, function(i){
        if ( winTop > contentTop[i] - rangeTop ){
          $('nav li.scroll')
            .removeClass('active')
            .eq(i).addClass('active');
        }}
    )};





  /*-----------------------------------------------------------------------------------*/
  /* 		Parallax
   /*-----------------------------------------------------------------------------------*/
  jQuery(document).ready(function(){
    jQuery.stellar({
      horizontalScrolling: false,
      scrollProperty: 'scroll',
      positionProperty: 'position',
    });
  });
});
