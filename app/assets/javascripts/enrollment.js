
$(function(){
  $("#sid").inputmask("999999999");
  $("#term").inputmask("9/99");

  if(!$("#timetable").hasClass('js-full')){
    $('.li-width').addClass('mobile-width');
		$('.ul-height').addClass('mobile-height');
  }

});