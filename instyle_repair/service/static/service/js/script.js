//adding class "menu-open" to HTML for displaying burger-menu
document.addEventListener('click', documentClick);
function documentClick(e) {
   const targetItem = e.target;

   if (targetItem.closest('.icon-menu')) {
      document.documentElement.classList.toggle('menu-open');
   }
}

//making buttons of sidebar active
document.addEventListener('click', buttonClick);
function buttonClick(e) {
   const targetItem2 = e.target;
   if (targetItem2.closest('.button-sidebar')) {
      targetItem2.classList.toggle('_active-button');
   }
}

//making active types of works
const allTypesWork = document.querySelectorAll('.repairs-sidebar__link');
document.addEventListener('click', linkClick);
function linkClick(e) {
   const targetItem3 = e.target;
   if (targetItem3.closest('.repairs-sidebar__link')) {
      for (let i = 0; i < allTypesWork.length; i++) {
         allTypesWork[i].classList.remove('done');
      }
      e.preventDefault();
      targetItem3.classList.toggle('done');

   }
}
// ----------------------------------------------------------
//adding class "display" for displaying popUpWindow
const allDetailsRepair = document.querySelectorAll('.details-repair');
const popUp = document.querySelector('.popUp');
const popUpClose = document.querySelector('.action-popUp__close');
for (let i = 0; i < allDetailsRepair.length; i++) {
   allDetailsRepair[i].addEventListener('click', displayPopUp);
   function displayPopUp() {
      popUp.classList.add('display');
      document.documentElement.classList.add('display');
   }
}
//removing class "display" for undisplaying popUpWindow
// popUpClose.addEventListener('click', () => {
//    popUp.classList.remove('display');
//    document.documentElement.classList.remove('display');
// });

document.addEventListener('click', closePopUp);
function closePopUp(e) {
   const targetItem6 = e.target;
   if (targetItem6.classList.contains('popUp') ) {
      console.log(targetItem6);
      popUp.classList.remove('display');
      document.documentElement.classList.remove('display');
   }
}









