
/* ============= sidebar sticky ================  */
$(function() {
  if ($('.product_side').length) {
    var el = $('.product_side');
    var stickyTop = $('.product_side').offset().top;
    var stickyHeight = $('.product_side').height();
    $(window).scroll(function() {
      
      var windowTop = $(window).scrollTop();
      if (stickyTop < windowTop) {
        el.css({
          position: 'sticky',
          top: 20
        });
      } else {
        el.css('position', 'static');
      }
      if (limit < windowTop) {
        var diff = limit - windowTop;
        el.css({
          top: diff
        });
      }
    });
  }
});



/* ============= sidebar accordian ==============  */
const sidebar = document.querySelectorAll('.product_side')

sidebar.forEach((item) =>{
    const sideTitle = item.querySelector('.side_top')

    sideTitle.addEventListener('click', () =>{
        const openItem = document.querySelector('.side-open')

        sideItem(item)

        if(openItem && openItem!== item){
          sideItem(openItem)
        }
    })
})

const sideItem = (item) =>{
    const sideTxt = item.querySelector('.side_full')

    if(item.classList.contains('side-open')){
      sideTxt.removeAttribute('style')
        item.classList.remove('side-open')
    }else{
      sideTxt.style.height = sideTxt.scrollHeight + 'px'
        item.classList.add('side-open')
    }
};






/* ============ popup ================ */


var overlay = $('#overlay'),
		popup = $('#share_pop'),
		closeBtn = popup.find('#close'),
		button = $('.share_icon');

function closePopup(){
	overlay.add(popup).removeClass('active');
}

overlay.add(closeBtn).on("click", function(){ closePopup(); });

button.on("click", function(){
	overlay.add(popup).addClass('active');
});

// escape key press
document.onkeydown = function(e){
	if (e.keyCode == 27 ) {
		closePopup();
	}
};




/* ============= nametag list ==========  */






/* ============== read more =============  */
$(document).ready(function() {
  $("#read-more").click(function() {
    var elem = $("#read-more").text();
    if (elem == "더 보기") {
      //Stuff to do when btn is in the read more state
      $("#read-more").text("닫기");
      $(".read_more").slideDown();
    } else {
      //Stuff to do when btn is in the read less state
      $("#read-more").text("더 보기");
      $(".read_more").slideUp();
    }
  });
});




/* ============= detail accordian ==============  */
const selectProduct = document.querySelectorAll('.p_select')

selectProduct.forEach((item) =>{
    const productTitle = item.querySelector('.p_top')

    productTitle.addEventListener('click', () =>{
        const openList = document.querySelector('.list-open')

        listItem(item)

        if(openList && openList!== item){
          listItem(openList)
        }
    })
})

const listItem = (item) =>{
    const listTxt = item.querySelector('.p_list')

    if(item.classList.contains('list-open')){
      listTxt.removeAttribute('style')
        item.classList.remove('list-open')
    }else{
      listTxt.style.height = listTxt.scrollHeight + 'px'
        item.classList.add('list-open')
    }
};


