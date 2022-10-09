$(function(){

  var SliceSlider = {
    settings: {
      delta:              0,
      currentSlideIndex:  0,
      scrollThreshold:    40,
      slides:             $('.slide'),
      numSlides:          $('.slide').length,
      navPrev:            $('.js-prev'),
      navNext:            $('.js-next'),
    },
    
    init: function() {
      s = this.settings;
      this.bindEvents();
    },
    
    bindEvents: function(){
      
      s.slides.on({
        'DOMMouseScroll mousewheel' : SliceSlider.handleScroll
      });

      s.navPrev.on({
        'click' : SliceSlider.prevSlide
      });
      
      s.navNext.on({
        'click' : SliceSlider.nextSlide
      });

      $(document).keyup(function(e) {
        if ((e.which === 37) ||  (e.which === 38)){
          SliceSlider.prevSlide();
        }
        if ((e.which === 39) ||  (e.which === 40)) {
          SliceSlider.nextSlide();
        }
      });
    },
    
    handleScroll: function(e){

      if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) { 

        s.delta--;
     
        if ( Math.abs(s.delta) >= s.scrollThreshold) {
          SliceSlider.prevSlide();
        }
      }
 
      else {
 
        s.delta++;
 
        if (s.delta >= s.scrollThreshold) {
          SliceSlider.nextSlide();
        }
      }
 
      return false;
    },

    showSlide: function(){ 
      // reset
      s.delta = 0;
      if ($('.slides').hasClass('is-sliding')){
        return;
      }
      s.slides.each(function(i, slide) {

        $(slide).toggleClass('is-active', (i === s.currentSlideIndex)); 
        $(slide).toggleClass('is-prev', (i === s.currentSlideIndex - 1)); 
        $(slide).toggleClass('is-next', (i === s.currentSlideIndex + 1)); 
        
        $('.slides').addClass('is-sliding');

        setTimeout(function(){
            $('.slides').removeClass('is-sliding');
        }, 1000);
      });
    },

    prevSlide: function(){
      if (s.currentSlideIndex <= 0) {
        s.currentSlideIndex = s.numSlides;
      }
      s.currentSlideIndex--;
      
      SliceSlider.showSlide();
    },

    nextSlide: function(){
      s.currentSlideIndex++;
      if (s.currentSlideIndex >= s.numSlides) { 
        s.currentSlideIndex = 0;
      }
      SliceSlider.showSlide();
    },
  };
  SliceSlider.init();

  function nextTrigger() {
    $('.js-prev').trigger("click");
  }
  let slideInterval = setInterval(nextTrigger, 5000);

  $('.clearinter').on("click",function(){
    clearInterval(slideInterval);
  });

});