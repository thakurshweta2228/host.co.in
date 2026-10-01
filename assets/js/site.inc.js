$(document).ready(function () {
  var hamburgers = document.querySelectorAll(".hamburger"),
      $menuWrap = $(".menu-wrap"),
      $desktopSearch = $(".desktop-auth"),
      $mobileSearch = $(".mobile-auth");

  // Toggle menu
  if (hamburgers.length > 0) {
      $(hamburgers).on("click", function () {
          this.classList.toggle("is-active");
          $menuWrap.toggleClass("menu-show");
          $("body").toggleClass("no-scroll");
          $("body").toggleClass("overlay-body");
      });
  }

  function moveSearchBar() {
      if ($(window).width() <= 800) {
          if (!$menuWrap.find(".mobile-auth").length) {
              $(".mobile-auth").appendTo($menuWrap);
          }
      } else {
          if (!$(".header-innerChild").find(".desktop-auth").length) {
              $(".mobile-auth").insertAfter(".navigationmenu");
          }
      }
  }

  // Run function on page load
  moveSearchBar();

  // Run function on window resize
  $(window).resize(function () {
      moveSearchBar();
  });


  $(window).scroll(function () {
    $(this).scrollTop() > 50
      ? $(".host-header").addClass("sticky")
      : $(".host-header").removeClass("sticky");
  })

 

  $('.dropbtn').click(function() {
    var dropdownContent = $(this).next('.dropdown-content');
    $('.dropdown-content').not(dropdownContent).slideUp();
    dropdownContent.slideToggle();
  });

  $(document).click(function(event) {
    var target = $(event.target);
    if (!target.closest('.dropdown').length) {
      $('.dropdown-content').slideUp();
    }
  });



  function applyOverlayEffect(currentSlide, slidesToShow) {
    $('.testimonial-slider .testimonial-card').removeClass('overlay-white');

    for (let i = 0; i < slidesToShow; i++) {
      const slideIndex = currentSlide + i;

      
      if (i > 0) {
        $('.testimonial-slider .testimonial-card').eq(slideIndex).addClass('overlay-white');
      }
    }
  }

  $(document).ready(function () {
    var $slider = $('.testimonial-slider');

    $slider.on('init', function (event, slick) {
      applyOverlayEffect(slick.currentSlide, slick.options.slidesToShow);
    });

    $slider.on('afterChange', function (event, slick, currentSlide) {
      applyOverlayEffect(currentSlide, slick.options.slidesToShow);
    });

    $slider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      prevArrow: $('.custom-prev'),
      nextArrow: $('.custom-next'),
      dots: false,
      autoplay: true,   
      autoplaySpeed: 500,
      responsive: [
      {
      breakpoint: 920,
      settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true
      }
      },
      {
      breakpoint: 768,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
      }
      }
      ]
          });
  });

   // Open modal and play video
   document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function () {
      const videoUrl = this.getAttribute('data-video');
      const videoFrame = document.getElementById('videoFrame');
      videoFrame.src = videoUrl + '?autoplay=1';
      document.getElementById('videoModal').style.display = 'flex';
    });
  });

  // Close modal and stop video
  document.querySelector('.close-button').addEventListener('click', function () {
    document.getElementById('videoModal').style.display = 'none';
    document.getElementById('videoFrame').src = '';
  });

  let galleryInstance;
      
  document.getElementById('openGalleryBtn').addEventListener('click', function () {
    if (galleryInstance) {
      galleryInstance.openGallery(0);
    } else {
      galleryInstance = lightGallery(document.getElementById('galleryContainer'), {
        dynamic: false,
        thumbnail: true,
        showCloseIcon: true,
        plugins: [lgThumbnail],
        speed: 500,
        height: '500px',
        width: '800px',
        actualSize: false,
        closable: true,
        hideBarsDelay: 3000,
        licenseKey: '0000-0000-000-0000', // Optional for full-screen
        container: document.body
      });
      galleryInstance.openGallery(0);
    }
  });
// section 1 slider
  if ($(".section_one_slider_wrap").length > 0) {
  $('.section_one_slider_wrap').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 900,
    arrow: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
    
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      } 
          
    ]
  });
}
});
