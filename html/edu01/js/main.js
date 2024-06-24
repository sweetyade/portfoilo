
/*===== show menu =====*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
  navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
  })
}

/*===== hidden menu =====*/
if(navClose){
  navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
  })
}




/* ====================== nav mobile menu ========================= */
const navFull = document.querySelectorAll('.nav_full_list')

navFull.forEach((item) =>{
    const navTitle = item.querySelector('.nav_title')

    navTitle.addEventListener('click', () =>{
        const openItem = document.querySelector('.nav-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) =>{
    const navSub = item.querySelector('.nav_sub')

    if(item.classList.contains('nav-open')){
      navSub.removeAttribute('style')
        item.classList.remove('nav-open')
    }else{
      navSub.style.height = navSub.scrollHeight + 'px'
        item.classList.add('nav-open')
    }

}


/* ============================= remove mobile menu =======================  */
const navLink = document.querySelectorAll('.nav_sub-link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))




/* ====================== main slide =========================== */
var swiperMainslide = new Swiper(".main_slide", {
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });


  /* ======================= notice rolling ======================  */
  var swiperNotice = new Swiper(".notice_data", {
    loop: true,
    direction: "vertical", 
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });


















