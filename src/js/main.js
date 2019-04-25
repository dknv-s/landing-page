(function () {
  const menuBtn = document.querySelector('.js-menu-button');
  const menu = document.querySelector('.js-menu');

  menuBtn.addEventListener('click', (e) => {
    e.preventDefault()
    menu.classList.toggle('open-menu');
  });
})();