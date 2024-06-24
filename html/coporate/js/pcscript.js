/* ===================== studio video ==================== */
//appends an "active" class to .popup and .popup-content when the "Open" button is clicked
$(".menu_toggle").on("click", function(){
  $(".nav_full, body").addClass("active");
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".menu_close, .nav_full").on("click", function(){
  $(".nav_full, body").removeClass("active");
});



/* ===================== studio video ==================== */
//appends an "active" class to .popup and .popup-content when the "Open" button is clicked
$(".block07_img3").on("click", function(){
  $(".open_video, .modal_overlay, body").addClass("active");
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
$(".close, .open_video").on("click", function(){
  $(".open_video, .modal_overlay, body").removeClass("active");
});




/* ================== news ==================*/
//removes the "active" class to .popup and .popup-content when the "Close" button is clicked
$(".close, .modal").on("click", function(){
  $(".modal, .modal_overlay, body").removeClass("active");
});






/* =================== bgm play ==================== */
function bgm_play() {
  var bgm = document.getElementById("bgm");
  if (bgm.paused) {
    bgm.play();
      document.getElementById("bgmPlay").style.background="url(images/web/btn-3.png) center center";
  } else {
    bgm.pause();
      document.getElementById("bgmPlay").style.background="url(images/web/btn-2.png) center center";
  }
}



/*=============== ScrollReveal ===============*/
const sr = ScrollReveal({
  origin: 'bottom',
  distance: '20px',
  duration: 1300,
  delay: 100,
  // reset: true
})

sr.reveal(`.o_left`,{origin: 'left', distance: '100px'})
sr.reveal(`.o_right`,{origin: 'right', distance: '100px'})
sr.reveal(`.up1`,{interval: 300})
sr.reveal(`.up2`,{interval: 200})
sr.reveal(`.up3`,{interval: 100})
sr.reveal(`.about_motion`,{ scale: 0.85 })