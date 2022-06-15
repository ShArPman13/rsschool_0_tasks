console.log(`
[Самооценка 100/100]

Вёрстка валидная +10
Вёрстка семантическая +20
В коде странице присутствуют следующие элементы (указано минимальное количество, может быть больше):
<header>, <main>, <footer> +3
четыре элемента <section> (по количеству секций) +3
только один заголовок <h1> +3
три заголовка <h2> (количество секций минус одна, у которой заголовок <h1>) +3
один элемент <nav> (панель навигации) +3
два списка ul > li > a (панель навигации, ссылки на соцсети) +3
четыре кнопки <button> +2
Вёрстка соответствует макету +48
блок <header> +6
секция preview +9
секция steps +9
секция destinations +9
секция stories +9
блок <footer> +6
Требования к css + 12
для построения сетки используются флексы или гриды +2
при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2
фоновый цвет тянется на всю ширину страницы +2
иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2
изображения добавлены в формате .jpg +2
есть favicon +2
Интерактивность, реализуемая через css +20
плавная прокрутка по якорям +5
ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ +5
интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +5
обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5`);

const hamburger = document.querySelector('.burger');
const menu = document.querySelector('.nav');

function toggleMenu() {
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
}
hamburger.addEventListener('click', toggleMenu);


// function closeMenu() {
//   hamburger.classList.remove('open');
//   menu.classList.remove('open');
// }
// const navLinks = document.querySelectorAll('.nav-link');
// navLinks.forEach((elem) => elem.addEventListener('click', closeMenu));

// const menuList = document.querySelector('.nav-list');

menu.addEventListener('click', closeMenu);

function closeMenu(e) {
  if (e.target.classList.contains('nav-link')) {
    hamburger.classList.remove('open');
    menu.classList.remove('open');
  }
}




