$(document).ready(function () {
  $('.carousel__inner').slick({
    speed: 1200,
    // adaptiveHeight:true,
    autoplay: true,
    autoplaySpeed: 2500,
    prevArrow: '<button type=""button" class="slick-prev"><img src="img/left.svg"></button>',
    nextArrow: '<button type=""button" class="slick-next"><img src="img/right.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });

  let content = document.querySelector('.catalog__content');
  function add() {
    $(content).addClass('catalog__content_active');
  }
  add();

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  //Делаем ссылки ПОДРОБНЕЕ и НАЗАД рабочими
  function toggleSlide(item){
    $(item).each(function(i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Ниже мой способ работы модальных окон
  // let overlay=document.querySelector('.overlay');
  // let consultation=document.querySelector('#consultation');
  // let thanks=document.querySelector('#thanks');
  // let order=document.querySelector('#order');
  // let closeModal=document.querySelectorAll('.button_modal');
  // for(let i = 0; i < closeModal.length; i++){
  //   $(closeModal).on('click', function(){
  //     order.style.display="none";
  //     consultation.style.display="none";
  //   });
  // }
  // $('.button_header').on('click', function(){
  //   overlay.style.display="block";
  //   consultation.style.display="block";
  // });
  // $('.button_main').on('click', function(){
  //   overlay.style.display="block";
  //   consultation.style.display="block";
  // });
  // $('.button_submit').on('click', function(){
  //   overlay.style.display="block";
  //   thanks.style.display="block";
  // });
  // $('.button_mini').on('click', function(){
  //   overlay.style.display="block";
  //   order.style.display="block";
  // });
  // $('.modal__close').on('click', function(){
  //   overlay.style.display="none";
  //   consultation.style.display="none";
  //   thanks.style.display="none";
  //   order.style.display="none";
  // });

  //Способ работы модальных окон с урока
  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  $('.button_mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  //Настраиваем плагин jquery.validate.min.js(валидация форм)
  function validateForms(form){
    $(form).validate({
      rules:{
        name:{
          required:true,
          minlength:5
        },
        phone:"required",
        email:{
          required:true,
          email:true
        }
      },
      messages:{
        name: {
          required: "Пожалуйста, введите имя",
          minlength: jQuery.validator.format("Введите не менее {0} символов!")
        },
        phone:"Пожалуйста, введите свой номер телефона",
        email:{
          required:"Пожалуйста, введите свою почту",
          email:"Неверный адрес электронной почты"
        }
      }
    });
  };
  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  //Настраиваем плагин jquery.maskedinput.min.js(маска ввода номера телефона)
  $('input[name=phone]').mask("+7 (999) 999-99-99");

  //Настраиваем отправку писем с сайта(с форм)
  $('form').submit(function(e){
    e.preventDefault();
    if(!$(this).valid()){
      return;
    }
    $.ajax({
      type:"POST",
      url:"mailer/smart.php",
      data:$(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut('slow');
      $('overlay, #thanks').fadeIn('slow');
      $("form").trigger("reset");
    });
    return false;
  });

  //Скролл страницы и плавный скролл обратно
  $(window).scroll(function(){
    if($(this).scrollTop() > 1600){
      $('.pageup').fadeIn('slow');
    }else {
      $('.pageup').fadeOut('slow');
    }
  });

  $("a[href^='#']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 250, function(){
        window.location.hash = hash;
      });
    }
  });

  //Подключаем библиотеку wow.js
  new WOW().init();
});
