console.log(`
[Самооценка 100/100]

Слайдер изображений в секции destinations +50
на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается справа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20
Три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20
Анимации плавного перемещения для слайдера +10
Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50
логин попап соответствует верстке его закрытие происходит при клике вне попапа +25
логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25
Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25`);



const hamburger = document.querySelector('.burger');
const menu = document.querySelector('.nav');
const header = document.querySelector('.header');
const body = document.querySelector('body');
const pop = document.querySelector('.popup__body');
const loginBtn = document.querySelector('.button1')
const dark = document.querySelector('.dark');
const signIn = document.querySelector('.btn-signin');
const account = document.querySelector('.link-account');
const pressRegister = document.querySelector('.register');
const pressLogin = document.querySelector('.login');
const pop2 = document.querySelector('.popup-register__body');


function openPopup() {
  dark.classList.add('open');
  pop.classList.add('open');
  pop.style.opacity = '1';
  body.style.overflowY = 'hidden';
}
loginBtn.addEventListener('click', openPopup);

function openPopupByAccount() {
  dark.classList.add('open');
  pop.classList.add('open');
  pop.style.opacity = '1';
  body.style.overflowY = 'hidden';
}
account.addEventListener('click', openPopupByAccount);

function changePopup() {
  pop.classList.toggle('open');
  pop2.classList.toggle('open');
  document.getElementById('input2-text-popup-mail').value = '';
  document.getElementById('input2-text-popup-pass').value = '';
  document.getElementById('input-text-popup-mail').value = '';
  document.getElementById('input-text-popup-pass').value = '';
}
pressRegister.addEventListener('click', changePopup);
pressLogin.addEventListener('click', changePopup);

function openAlert() {
  const input = document.getElementById("input-text-popup-mail").value;
  document.getElementById('input-text-popup-mail').value = '';
  const input2 = document.getElementById("input-text-popup-pass").value;
  document.getElementById('input-text-popup-pass').value = '';

  alert(`E-mail: ${input} \nPassword: ${input2}`);
}
signIn.addEventListener('click', openAlert);



function toggleMenu() {
  if (!(hamburger.classList.contains('open'))) { //если бургер закрыт - не содержит .open
    hamburger.classList.add('open');
    menu.classList.add('open');
    dark.classList.add('open');
    body.style.overflowY = 'hidden'; //запрещаем скролл при открытии бургера
  }
  else if (hamburger.classList.contains('open')) { //если бургер открыт- содержит .open
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    dark.classList.remove('open');
    body.style.overflowY = null;//разрешаем скролл при закрытии бургера
  }
}

hamburger.addEventListener('click', toggleMenu);


function closeMenu(e) {

  if (e.target.classList.contains('link-account')) { //если клик по пункту account
    // hamburger.style.zIndex = '0';
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    body.style.overflowY = null;
    // dark.classList.remove('open');
  }
  else if (e.target.classList.contains('nav-link')) { //если клик по пунктам меню
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    dark.classList.remove('open');
    body.style.overflowY = null;
  }
  else if (e.target.classList.contains('dark')) { //если клик по темному фону
    hamburger.classList.remove('open');
    menu.classList.remove('open');
    body.style.overflowY = null;
    pop.classList.remove('open');
    pop.style.opacity = '1';
    pop2.classList.remove('open');
    dark.classList.remove('open');
  }
}

body.addEventListener('click', closeMenu);



// slider-------------------------------

const BTN_LEFT = document.querySelector('.btn_left_for_slider');
const BTN_RIGHT = document.querySelector('.btn_right_for_slider');
const slider = document.querySelector('.sliderpics');

const cirkles = document.querySelectorAll('.cirk');
const parentCirkles = document.querySelector('.slider-cirkles');

const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const sliderpics = document.querySelectorAll('.sliderpic');

chooseCirkle();
const arrPics = document.querySelectorAll('.boxforpic');
// arrPics[2].innerHTML = arrPics[2].innerHTML;

// let arrSliders = [];

const moveLeft = () => {

  if (slider.classList.contains('transition-right')) {
    document.body.style.pointerEvents = "none";
    slider.classList.remove('transition-right')
  } else {
    slider.classList.add('transition-left');
  }
  chooseCirkle();
  setTimeout(() => {
    document.body.style.pointerEvents = "inherit";
  }, 500);
}

const moveRight = () => {
  if (slider.classList.contains('transition-left')) {
    document.body.style.pointerEvents = "none";
    slider.classList.remove('transition-left');
  } else {
    slider.classList.add('transition-right');
  }
  chooseCirkle();
  setTimeout(() => {
    document.body.style.pointerEvents = "inherit";
  }, 500);
}

BTN_RIGHT.addEventListener('click', moveLeft);
BTN_LEFT.addEventListener('click', moveRight);

rightArrow.addEventListener('click', moveLeft);
leftArrow.addEventListener('click', moveRight);

const boxDest = document.querySelector('.box-destinations');

let startTouch = 0;
let endTouch = 0;

boxDest.addEventListener("touchstart", (e) => {
  startTouch = e;
})

boxDest.addEventListener("touchmove", (e) => {
  // e.preventDefault();
  endTouch = e;
});

boxDest.addEventListener("touchend", () => {
  let diffX = endTouch.touches[0].pageX - startTouch.touches[0].pageX;
  let dir;
  dir = diffX < 0 ? moveLeft() : moveRight();
});


function chooseCirkle() {
  if (slider.classList.contains('transition-right')) {
    cirkles[0].classList.remove('cirkle');
    cirkles[0].classList.add('cirkle-main');
    leftArrow.classList.add('opacity-arrow');
    sliderpics[1].classList.add('sliderpic-shadow');
    sliderpics[2].classList.remove('sliderpic-shadow');

    cirkles[2].classList.remove('cirkle-main');
    cirkles[2].classList.add('cirkle');
    cirkles[1].classList.remove('cirkle-main');
    cirkles[1].classList.add('cirkle');

  } else if (slider.classList.contains('transition-left')) {
    cirkles[2].classList.remove('cirkle');
    cirkles[2].classList.add('cirkle-main');
    rightArrow.classList.add('opacity-arrow');
    sliderpics[3].classList.add('sliderpic-shadow');
    sliderpics[2].classList.remove('sliderpic-shadow');

    cirkles[0].classList.remove('cirkle-main');
    cirkles[0].classList.add('cirkle');
    cirkles[1].classList.remove('cirkle-main');
    cirkles[1].classList.add('cirkle');

  } else if (!slider.classList.contains('transition-left') &&
    (!slider.classList.contains('transition-right'))) {
    cirkles[1].classList.remove('cirkle');
    cirkles[1].classList.add('cirkle-main');
    rightArrow.classList.remove('opacity-arrow');
    leftArrow.classList.remove('opacity-arrow');
    sliderpics[2].classList.add('sliderpic-shadow');
    sliderpics[1].classList.remove('sliderpic-shadow');
    sliderpics[3].classList.remove('sliderpic-shadow');

    cirkles[2].classList.remove('cirkle-main');
    cirkles[2].classList.add('cirkle');
    cirkles[0].classList.remove('cirkle-main');
    cirkles[0].classList.add('cirkle');
  }
}
