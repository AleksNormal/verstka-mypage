$(document).ready(function () {


    //// -> slider photos
    var currentIndexSlide = 0;
    var elLi = $(".photo-slider .pager-slider li");

    elLi.click(function(){
        console.log("index = " + elLi.index(this));
    });

    var photoSlider = $(".photo-slider .slider").bxSlider({
        adaptiveHeight: true,
        pager: false,

        onSlideAfter: function($slideElement, oldIndex, newIndex){
            if(currentIndexSlide !== newIndex){
                currentIndexSlide = newIndex;
                photoSlider.goToSlide(currentIndexSlide);
            }
        }
    });


    var pagerSlider = $(".photo-slider .pager-slider").bxSlider({
        pager: false,
        minSlides: 1,
        maxSlides: 5,
        moveSlides: 1,
        slideWidth: 80,
        slideMargin: 10,
        adaptiveHeight: true,

        onSlideAfter: function($slideElement, oldIndex, newIndex){
            if(currentIndexSlide !== newIndex){
                currentIndexSlide = newIndex;
                photoSlider.goToSlide(currentIndexSlide);
            }
            console.log("onSlideAfter index = " + newIndex);
        },

        onSliderLoad: function(currentIndex){
            var getCurrentIndex = this.getCurrentSlide();
            var countSlides = this.getSlideCount();
            $(".photo-slider .pager-slider li").click(function(e){
                var index = $(".photo-slider .pager-slider li").index(e) + 1;
                console.log("index in click = " + index);
                if(index >= countSlides){
                    index = index % countSlides
                }
                index--;
                currentIndexSlide = index;
                photoSlider.goToSlide(currentIndexSlide);

                //$(".photo-slider .pager-slider li").removeClass("act");
                //e.addClass("act");
            });
        }

    });



    //// <- slider photos


});