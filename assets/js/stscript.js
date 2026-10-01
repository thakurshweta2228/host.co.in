$(document).ready(function () {
  var hamburgers = document.querySelectorAll(".hamburger"),
    $menuWrap = $(".menu-wrap"),
    $desktopSearch = $(".desktop-auth"),
    $mobileSearch = $(".mobile-auth");

// Toggle mobile menu
if (hamburgers.length > 0) {
  $(hamburgers).on("click", function () {
    this.classList.toggle("is-active");
    var isOpening = !$menuWrap.hasClass("menu-show");

    if (isOpening) {
      $menuWrap.addClass("menu-show");
      $("body").addClass("no-scroll");
      // Delay overlay to match menu animation (e.g., 200ms)
      setTimeout(function () {
        $(".dropdown-overlay").fadeIn(200);
      }, 150);
    } else {
      // Fade out overlay first, then hide menu
      $(".dropdown-overlay").fadeOut(200, function () {
        $menuWrap.removeClass("menu-show");
        $("body").removeClass("no-scroll");
      });
    }
  });
}

// Sticky navbar on scroll
$(window).on("scroll", function () {
  var scrollTop = $(this).scrollTop();
  if (scrollTop > 50) {
    $(".host-header").addClass("sticky");
  } else {
    $(".host-header").removeClass("sticky");
  }
});


  // Sticky navbar on scroll for GPU page
  $(window).on('scroll', function () {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > 50) {
      $('.Gpuhost-header').addClass('sticky');
    } else {
      $('.Gpuhost-header').removeClass('sticky');
    }
  });

  // Move search/auth bar based on screen size
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

  // Initial check
  moveSearchBar();
  $(window).resize(function () {
    moveSearchBar();
  });

 // Smooth dropdown open/close with overlay logic
$('.dropbtn').click(function (e) {
    e.stopPropagation();
    var $parentDropdown = $(this).closest('.dropdown');
    var isOpen = $parentDropdown.hasClass('show-dropdown');

    // If clicking another dropdown while overlay is visible, don't flicker overlay
    if ($('.dropdown-overlay').is(':visible')) {
        $('.dropdown').not($parentDropdown).removeClass('show-dropdown');
        $('.dropdown-content').not($parentDropdown.find('.dropdown-content')).stop(true, true).slideUp(250);
        $('.dropbtn').not(this).removeClass('active-dropdown');
    } else {
        // First time opening a dropdown — show overlay smoothly
        $('.dropdown-overlay').stop(true, true).fadeIn(200);
        $('body').addClass('no-scroll');
    }

    // Toggle clicked dropdown with smooth slide
    if (!isOpen) {
        $parentDropdown.addClass('show-dropdown');
        $parentDropdown.find('.dropdown-content').stop(true, true).slideDown(250);
        $(this).addClass('active-dropdown');
    } else {
        $parentDropdown.removeClass('show-dropdown');
        $parentDropdown.find('.dropdown-content').stop(true, true).slideUp(250);
        $(this).removeClass('active-dropdown');

        // If no dropdowns open, hide overlay smoothly
        if ($('.show-dropdown').length === 0) {
            $('.dropdown-overlay').stop(true, true).fadeOut(200);
            $('body').removeClass('no-scroll');
        }
    }
});

// Close dropdown when clicking outside
$(document).click(function () {
    $('.dropdown').removeClass('show-dropdown');
    $('.dropdown-content').stop(true, true).slideUp(250);
    $('.dropbtn').removeClass('active-dropdown');
    $('.dropdown-overlay').stop(true, true).fadeOut(200);
    $('body').removeClass('no-scroll');
});

// Close dropdown when clicking overlay
$('.dropdown-overlay').click(function () {
    $('.dropdown').removeClass('show-dropdown');
    $('.dropdown-content').stop(true, true).slideUp(250);
    $('.dropbtn').removeClass('active-dropdown');
    $('.hamburger').removeClass('is-active');
    $('.menu-wrap').removeClass('menu-show');
    $('body').removeClass('no-scroll');
    $(this).stop(true, true).fadeOut(200);
});

  // section1
  if ($(".section_one_slider_wrap").length > 0) {
    $('.section_one_slider_wrap').slick({
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 900,
      arrow: false,
      slidesToShow: 4,
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
        },
        {
          breakpoint: 400,
          settings: {
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  // Price Card
  function initPriceCardSlider(container) {
  const $list = $(container).find('.priceCardList');
  if (!$list.hasClass('slick-initialized')) {
    $list.slick({
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 900,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            infinite: true,
            centerMode: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
}

// Init only if mobile/tablet view
if (window.innerWidth <= 900) {
  // Init the active tab on page load
  const activeTab = document.querySelector('.linux_shared_planDiv.active');
  if (activeTab) {
    initPriceCardSlider(activeTab);
  }
}

// linux shared tabbing
const tabs1 = document.querySelectorAll('.linux_tab-btn');
const contents1 = document.querySelectorAll('.linux_shared_planDiv');

tabs1.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs1.forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');

    contents1.forEach(c => {
      c.style.visibility = 'hidden';
      c.classList.remove('active');
    });

    const activeContent = document.getElementById(tab.dataset.tab);
    activeContent.classList.add('active');

    // Only init slider if in mobile/tablet view
    if (window.innerWidth <= 900) {
      initPriceCardSlider(activeContent);
    }

    requestAnimationFrame(() => {
      const slickList = activeContent.querySelector('.priceCardList');
      if ($(slickList).hasClass('slick-initialized')) {
        $(slickList).slick('setPosition');
      }
      activeContent.style.visibility = 'visible';
    });
  });
});


  // home world hosting service
  function initHostingSlider() {
    if ($(window).width() < 901) {
      if (!$('.hosting_service_List').hasClass('slick-initialized')) {
        $('.hosting_service_List').slick({
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
          dots: false,
          autoplay: true,
          autoplaySpeed: 1500,
          speed: 500,
          responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      }
    } else {
      if ($('.hosting_service_List').hasClass('slick-initialized')) {
        $('.hosting_service_List').slick('unslick');
      }
    }
  }

  initHostingSlider();
  $(window).on('resize', function () {
    initHostingSlider();
  });

  // Client Buzz
  if ($(".client-logos").length > 0) {
    $('.client-logos').slick({
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 400,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: false,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      // nextArrow: '<button type="button" class="slick-next">›‹</button>',
      responsive: [
        {
          breakpoint: 1140,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: false
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false
          }
        }
        // {
        //   breakpoint: 480,
        //   settings: {
        //     slidesToShow: 1,
        //     slidesToScroll: 1,
        //     centerMode: false
        //   }
        // }
      ]
    });
  }

  $(".client-logoImg img").each(function () {
    var originalSrc = $(this).attr("data-original");
    var hoverSrc = $(this).attr("data-hover");

    $(this).hover(
      function () {
        $(this).attr("src", hoverSrc);
      },
      function () {
        $(this).attr("src", originalSrc);
      }
    );
  });

  // Nav bar Active class
  const currentUrl = window.location.href;
  const navLinks = document.querySelectorAll(".NavItem_wrap");
  navLinks.forEach(link => {
    if (currentUrl === link.href) {
      link.classList.add("active");
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

  var $slider = $('.testimonial-slider');
  $slider.on("init", function (event, slick) {
    $(".custom-prev").css({
      filter: "grayscale(100%)",
      color: "#808080"
    });
    var currentSlide = slick.currentSlide;
    var slidesToShow = slick.options.slidesToShow;
    applyOverlayEffect(currentSlide, slidesToShow);
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
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 920, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  });

  $slider.on("afterChange", function (event, slick, currentSlide) {
    var totalSlides = slick.slideCount;
    var slidesToShow = slick.options.slidesToShow;

    $(".custom-prev, .custom-next").css({
      filter: "grayscale(0%)",
      color: "#00A000"
    });

    if (currentSlide === 0) {
      $(".custom-prev").css({
        filter: "grayscale(100%)",
        color: "#808080"
      });
    }

    if (currentSlide + slidesToShow >= totalSlides) {
      $(".custom-next").css({
        filter: "grayscale(100%)",
        color: "#808080"
      });
    }

    applyOverlayEffect(currentSlide, slidesToShow);
  });

  $(document).on("click", ".play-button", function () {
    var videoUrl = $(this).attr("data-video");
    if (videoUrl) {
      $("#videoFrame").attr("src", videoUrl + "?autoplay=1");
      $("#videoModal").fadeIn().css({ "display": "flex" });
    } else {
      console.log("Error: Missing video URL!");
    }
  });

  $(document).on("click", ".close-button, #videoModal", function (event) {
    if ($(event.target).is("#videoModal") || $(event.target).is(".close-button")) {
      $("#videoModal").fadeOut();
      setTimeout(() => { $("#videoFrame").attr("src", ""); }, 300);
    }
  });

  // terms tabbing
  const tabs = document.querySelectorAll('.terms_tab-btn');
  const contents = document.querySelectorAll('.terms_tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(btn => btn.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  
    // datacenter tabbing
  const datacenterTab = document.querySelectorAll('.dataCenter_tab-btn');
  const datacenterCont = document.querySelectorAll('.datacenter-content-List');

  datacenterTab.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all buttons and content
      datacenterTab.forEach(btn => btn.classList.remove('active'));
      datacenterCont.forEach(c => c.classList.remove('active'));

      // Add active class to clicked button and related content
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  
    // windows shared tabbing
  const tabbing = document.querySelectorAll('.windowVPS_tab-btn');
  const cardData = document.querySelectorAll('.windowVPS_price');
  tabbing.forEach(tab => {
    tab.addEventListener('click', () => {
      tabbing.forEach(btn => btn.classList.remove('active'));
      cardData.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const activeContent = document.getElementById(tab.dataset.tab);
      activeContent.classList.add('active');
      const slickList = activeContent.querySelector('.VPS_priceCardListInn');
      if ($(slickList).hasClass('slick-initialized')) {
        $(slickList).slick('setPosition');
      }
    });
  });
  // Linux shared slider
  // var $imageSlider = $('.Linux_slider_images');
  // var $contentSlider = $('.Linux_slider_content');

  // $imageSlider.slick({
  //   vertical: true,
  //   verticalSwiping: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   dots: false,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   speed: 500,
  //   infinite: true,
  //   asNavFor: '.Linux_slider_content',
  //   adaptiveHeight: false,
  //   cssEase: 'ease-in-out'
  // });

  // $contentSlider.slick({
  //   vertical: true,
  //   verticalSwiping: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   dots: true,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   speed: 500,
  //   infinite: true,
  //   asNavFor: '.Linux_slider_images',
  //   adaptiveHeight: false,
  //   cssEase: 'ease-in-out'
  // });

  // $contentSlider.on('init', function (event, slick) {
  //   updateLineFill(0, slick.slideCount);
  //   adjustContentSliderHeight();
  // });

  // $contentSlider.on('afterChange', function (event, slick, currentSlide) {
  //   updateLineFill(currentSlide, slick.slideCount);
  //   adjustContentSliderHeight();
  // });

  // function updateLineFill(index, total) {
  //   const percentage = (100 / total) * index;
  //   $('.line-fill').css('top', `calc(${percentage}%)`);
  // }

  // function adjustContentSliderHeight() {
  //   const $currentSlide = $('.Linux_slider_content .slick-current');
  //   const newHeight = $currentSlide.outerHeight(true);
  //   $('.Linux_slider_content .slick-list').height(newHeight);
  // }

  // ✅ Web Globally Slider (CORRECTLY PLACED HERE)
  if ($(".window_Web_GloballyList").length > 0) {
    $('.window_Web_GloballyList').slick({
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 900,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      // nextArrow: '<button type="button" class="slick-next">›‹</button>',
      responsive: [
        {
          breakpoint: 1140,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: false
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: false
          }
        }
      ]
    });
  }

  // faq
function initMobileFAQAccordion() {
    const isMobile = $(window).width() < 800;

    $('.faq-toggle').off('click'); // unbind first

    if (isMobile) {
      $('.faq_questn_Txt_Para').hide();
      $('.faq-toggle').text('+');

      $('.faq-toggle').on('click', function (e) {
        e.stopPropagation();

        const toggle = $(this);
        const para = toggle.closest('.faq_questn_Txt').find('.faq_questn_Txt_Para');
        const isOpen = para.is(':visible');

        $('.faq_questn_Txt_Para').slideUp();
        $('.faq-toggle').text('+');

        if (!isOpen) {
          para.slideDown();
          toggle.text('−');
        }
      });
    } else {
      $('.faq_questn_Txt_Para').show();
      $('.faq-toggle').text('');
    }
  }

    // ✅ Only one document ready
    $(document).ready(function () {
      initMobileFAQAccordion();
    });

  // ✅ On resize
  $(window).on('resize', function () {
    initMobileFAQAccordion();
  });


  // rating cards
function initMobileRatingSlider() {
  if ($(window).width() < 560) {
    if (!$('.rating_List').hasClass('slick-initialized')) {
      $('.rating_List').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        arrows: true, // ✅ Keep this enabled
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev">‹</button>',
        nextArrow: '<button type="button" class="slick-next">›</button>'
      });
    }
  } else {
    if ($('.rating_List').hasClass('slick-initialized')) {
      $('.rating_List').slick('unslick');
    }
  }
}

// Run on page load
$(document).ready(function () {
  initMobileRatingSlider();
});

// Run on window resize
$(window).on('resize', function () {
  initMobileRatingSlider();
});

$(document).ready(function () {
  function initSlickIfMobile() {
    if (window.innerWidth < 900) {
      if (!$('.VPS_priceCardListInn').hasClass('slick-initialized')) {
        $('.VPS_priceCardListInn').slick({
          dots: false,
          infinite: true,
          autoplay: true,
          speed: 900,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        });
      }
    } else {
      if ($('.VPS_priceCardListInn').hasClass('slick-initialized')) {
        $('.VPS_priceCardListInn').slick('unslick');
      }
    }
  }

  // Initial check
  initSlickIfMobile();

  // Re-check on window resize
  $(window).on('resize', function () {
    initSlickIfMobile();
  });
});

// progress counter 
$(document).ready(function () {
  let hasAnimated = false; // Prevent re-running

  const runCounterAndCircle = () => {
    // Counter logic
    let count = 1;
    const target = 32;
    const speed = 100;
    const counter = document.getElementById("locationCount");

    const updateCount = () => {
      if (count <= target) {
        counter.textContent = count;
        count++;
        setTimeout(updateCount, speed);
      }
    };

    updateCount();

    // Animate SVG ring
    const circle = document.querySelector('.progress-ring-fill');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    setTimeout(() => {
      circle.style.strokeDashoffset = `${circumference * 0.2}`; // Adjust as needed
    }, 300);
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          runCounterAndCircle();
          hasAnimated = true;
          observer.unobserve(entry.target); // Optional: stop observing
        }
      });
    },
    { threshold: 0.3 } // Trigger when 30% visible
  );

  const targetEl = document.querySelector('.Global_ImgGlobeRgt');
  if (targetEl) {
    observer.observe(targetEl);
  }
});
// tooltip 
  $('.info-icon').on('click', function (e) {
    e.stopPropagation(); // Prevent bubbling up
    $('.tooltip-text').not($(this).siblings('.tooltip-text')).hide(); // Hide other tooltips
    $(this).siblings('.tooltip-text').toggle(); // Toggle current tooltip
  });

  // Hide tooltip when clicking anywhere outside
  $(document).on('click', function () {
    $('.tooltip-text').hide();
  });

  // view all feature 
$('.viewAll-fetur-Txt').click(function (e) {
    e.stopPropagation(); // Prevent the click from bubbling to the document
    $('.ExtraFeature').slideToggle();
  });

  // Close on clicking outside
  $(document).click(function (e) {
    if (!$(e.target).closest('.viewAll-fetur').length) {
      $('.ExtraFeature').slideUp();
    }
  });






 const accordionItems = document.querySelectorAll(".accordion-item");
  const previewImage = document.getElementById("accordion-image");

  accordionItems.forEach(item => {
    const title = item.querySelector(".accordion-title");
    const icon = title.querySelector(".accordion-icon");

    title.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      accordionItems.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".accordion-icon").textContent = "+";
      });

      if (!isActive) {
        item.classList.add("active");
        icon.textContent = "–";

        // Image change
        const newImg = item.getAttribute("data-img");
        previewImage.src = newImg;
      }
    });
  });

  // ✅ FIX: update icon for already open accordion on page load
  accordionItems.forEach(item => {
    if (item.classList.contains("active")) {
      const icon = item.querySelector(".accordion-icon");
      if (icon) icon.textContent = "–";
    }
  });


  const items = document.querySelectorAll('.gpu-item');

  items.forEach(item => {
    const header = item.querySelector('.gpu-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.toggle-icon').textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        item.querySelector('.toggle-icon').textContent = '−';
      }
    });
  });


const section = document.querySelector('.GpuTabSection');
const tabs_scroll = document.querySelectorAll('.GpuTabBtn');
const contents_scroll = document.querySelectorAll('.GpuTabContent');

let currentIndex = 0;
let lastScrollY = window.scrollY;
let scrollDirection = null;
let scrollCount = 0;
let lastChangeTime = 0;
let isScrollLocked = false;
let hasTabScrollStarted = false;

function activateTab(index) {
  tabs_scroll.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
    contents_scroll[i].classList.toggle('active', i === index);
  });
  currentIndex = index;
}

// Default tab
activateTab(0);

// Helper to lock/unlock body scroll
function lockScroll() {
  document.body.classList.add('lock-scroll');
  isScrollLocked = true;
}
function unlockScroll() {
  document.body.classList.remove('lock-scroll');
  isScrollLocked = false;
}

// Watch scroll
window.addEventListener('scroll', () => {
  const now = Date.now();
  const rect = section.getBoundingClientRect();
  const currentScrollY = window.scrollY;

  // When section hits top of viewport (adjust 80 if navbar height is different)
  const isSectionAtTop = rect.top <= 150 && rect.bottom > window.innerHeight / 2;

  if (isSectionAtTop && !isScrollLocked) {
    // Lock scroll when section comes to top
    lockScroll();
    hasTabScrollStarted = true;
    window.scrollTo({ top: currentScrollY }); // freeze scroll position
  }

  if (hasTabScrollStarted && isScrollLocked) {
    const direction = currentScrollY > lastScrollY ? 'down' : 'up';

    if (scrollDirection !== direction) {
      scrollDirection = direction;
      scrollCount = 1;
    } else {
      scrollCount++;
    }

    if (scrollCount >= 2 && now - lastChangeTime > 700) {
      if (direction === 'down' && currentIndex < tabs_scroll.length - 1) {
        activateTab(currentIndex + 1);
      } else if (direction === 'up' && currentIndex > 0) {
        activateTab(currentIndex - 1);
      } else if (direction === 'down' && currentIndex === tabs_scroll.length - 1) {
        // End of last tab – unlock page scroll
        unlockScroll();
        hasTabScrollStarted = false;
      }

      lastChangeTime = now;
      scrollCount = 0;
    }
  }

  lastScrollY = currentScrollY;
});

// Click tab manually
tabs_scroll.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    activateTab(index);
    currentIndex = index;
  });
});
  
  document.querySelectorAll('.domaintab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      // Toggle active class on buttons
      document.querySelectorAll('.domaintab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Toggle tab content
      document.querySelectorAll('.domaintab-content').forEach(content => {
        content.classList.remove('active');
      });

      document.getElementById(tabId).classList.add('active');
    });
  });

  document.querySelectorAll('.tldList li').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.tldList li').forEach(li => li.classList.remove('active'));
      item.classList.add('active');
    });
  });
  

  // windows shared tabbing
  const tabbingdedicate = document.querySelectorAll('.dedicaPlanBut-Wrap');
  const cardDatadedicate = document.querySelectorAll('.dediCateServertab');
  tabbingdedicate.forEach(tab => {
    tab.addEventListener('click', () => {
      tabbingdedicate.forEach(btn => btn.classList.remove('active'));
      cardDatadedicate.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const activeContent = document.getElementById(tab.dataset.tab);
      activeContent.classList.add('active');
      const slickList = activeContent.querySelector('.VPS_priceCardListInn');
      if ($(slickList).hasClass('slick-initialized')) {
        $(slickList).slick('setPosition');
      }
    });
  });

}); // END of document ready ✅
















