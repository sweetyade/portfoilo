//sidebar toggle
$(".open_toggle").on("click", function(){
  $(".burger").toggleClass("open");

  if($(".main").hasClass("fold")){
    $(".main").removeClass("fold")
  } else{
    $(".main").addClass("fold")
  }
})

$(".closeBtn").on("click", function(){
  $(".burger").removeClass("open");
  if($(".main").hasClass("fold")){
    $(".main").removeClass("fold")
  } else{
    $(".main").addClass("fold")
  }
})

//nav
$(".sub_menu").on("click", function (){
  $(this).toggleClass("open");
  $(".sub_list").slideToggle()
})

//상담리스트 탭
$('.contents_tap').find('.tab_link').click(function(){
  $(this).addClass("active");
  $(this).siblings().removeClass("active");
});


$(document).ready(function(){    
let activeCat = "";
function filterGroup(cate){
  if(activeCat != cate){
    $(".consult_data, .qna_cata, .goods_cate").filter("."+cate).show();
    $(".consult_data, .qna_cata, .goods_cate").filter(":not(."+cate+")").hide();
    activeCat = cate;
  }
}

$(".cate_all").click(function(){
  $(".consult_data, .qna_cata, .goods_cate").show();
  activeCat = "all";
});
$(".cate_1").click(function(){ filterGroup("cate-1"); });
$(".cate_2").click(function(){ filterGroup("cate-2"); });
$(".cate_3").click(function(){ filterGroup("cate-3"); });
$(".cate_4").click(function(){ filterGroup("cate-4"); });
$(".cate_5").click(function(){ filterGroup("cate-5"); });
$(".cate_6").click(function(){ filterGroup("cate-6"); });
});


//약관 체크
$("#check_all").on("click", function () {
if ($(this).is(":checked")) {
  $(".check_list input").prop("checked", true);
} else {
  $(".check_list input").prop("checked", false);
}
});

$(".check_list input").on("click", function () {
var total = $(".check_list input").length;
var checked = $(".check_list input:checked").length;

if (total != checked) {
  $("#check_all").prop("checked", false);
} else {
  $("#check_all").prop("checked", true);
}
});


//faq 리스트
$(".faq_q").on("click", function(){
  if($(this).siblings(".faq_a").hasClass("open")){
    $(this).siblings(".faq_a").slideToggle();
  }else{
    $(this).siblings(".faq_a").slideToggle();
  }
})


//qna 첨부이미지
const qna_slide = new Swiper('.add_imgslide', {
  spaceBetween: 16,
  slidesPerView: "auto",
});

$(".add_imgslide .img_list").on("click", function(){
  $(".slide_imgPop").addClass("open");
})

$(".overlay, .slideClose").on("click", function(){
  $(".slide_imgPop").removeClass("open");
})

const popup_slide = new Swiper('.popup_slide', {
  spaceBetween: 16,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


//상담화면 사이드 바 메뉴
$(".consultSide").on("click", function(){
  if($(".consult_side").hasClass("fold")){
    $(".consult_side").removeClass("fold");
    $(".consultSide i").attr("class","ri-menu-unfold-line");
  }else{
    $(".consult_side").addClass("fold");
    $(".consultSide i").attr("class","ri-menu-fold-line");
  }
})


//건강걱정분야 체크
$(".consult_helthy tr").on("click", function(){
  let checkon = $(this).find(".check_no");
  if(checkon.hasClass("on")){
    checkon.removeClass("on");
  }else{
    $(".consult_helthy").find(".check_no").removeClass("on");
    checkon.addClass("on");
  }
})


//상담화면 순위변경
$(".up,.down").click(function(){
    let row = $(".check_no.on").parents("tr:first");
    if ($(this).is(".up")) {
        row.insertBefore(row.prev());
    } else {
        row.insertAfter(row.next());
    }
    $("tr:first-child .no").text("1순위");
    $("tr:nth-child(2) .no").text("2순위");
    $("tr:last-child .no").text("3순위");
});


//설문제품
const goodslide = new Swiper('.ingoods_slide', {
  spaceBetween: 16,
  slidesPerView: "auto",
});


//셀렉트박스
const label = document.querySelectorAll(".selectBtn");
label.forEach(function (lb) {
  lb.addEventListener("click", (e) => {
    let optionList = lb.nextElementSibling;
    let optionItems = optionList.querySelectorAll(".optionItem");
    clickLabel(lb, optionItems);
  });
});
const clickLabel = (lb, optionItems) => {
  if (lb.parentNode.classList.contains("active")) {
    lb.parentNode.classList.remove("active");
    optionItems.forEach((opt) => {
      opt.removeEventListener("click", () => {
        handleSelect(lb, opt);
      });
    });
  } else {
    lb.parentNode.classList.add("active");
    optionItems.forEach((opt) => {
      opt.addEventListener("click", () => {
        handleSelect(lb, opt);
      });
    });
  }
};
const handleSelect = (label, item) => {
  label.innerHTML = item.textContent;
  label.parentNode.classList.remove("active");
  label.classList.add("optSlt");
};

//상담화면 
$(document).ready(function(){    
  let listRow = $(".consult_edit tr");
  let count = 1;

  //섭취량 조절
  listRow.find(".add").on("click", function(){
    $(this).siblings(".count").text(count++)
  })

  listRow.find(".sub").on("click", function(){
    $(this).siblings(".count").text(count--)
  })
})