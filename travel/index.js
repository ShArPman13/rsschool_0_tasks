console.log(`
[Самооценка 75/75]

Вёрстка соответствует макету. Ширина экрана 390px +48
блок <header> +6
секция preview +9
секция steps +9
секция destinations +9
секция stories +9
блок <footer> +6
Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15
нет полосы прокрутки при ширине страницы от 1440рх до 390px +7
нет полосы прокрутки при ширине страницы от 390px до 320рх +8
На ширине экрана 390рх и меньше реализовано адаптивное меню +22
при ширине страницы 390рх панель навигации скрывается, появляется бургер-иконка +2
при нажатии на бургер-иконку плавно появляется адаптивное меню +4
адаптивное меню соответствует макету +4
при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4
ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4 (все кроме Account, она пока что просто закрывает меню)
при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4`);



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

// let arrPics = document.querySelectorAll('.boxforpic');
// console.log(arrPics);

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
