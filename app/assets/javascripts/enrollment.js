
$(function(){
  $("#sid").inputmask("999999999");
  $("#term").inputmask("9/99");

  if(!$("#timetable").hasClass('js-full')){
    $('.li-width').addClass('mobile-width');
		$('.ul-height').addClass('mobile-height');
  }

  $("#timetable_download").on('click', function () {
    html2canvas(document.querySelector("#timetable")).then(canvas => {
      var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      var el = document.createElement('a');
      el.href = img;
      el.download = 'timetable(timetable4cmu).png';
      el.click();
    });
  });

  $("#mid_download").on('click', function () {
    html2canvas(document.querySelector("#mid")).then(canvas => {
      var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      var el = document.createElement('a');
      el.href = img;
      el.download = 'mid_exam(timetable4cmu).png';
      el.click();
    });
  });

  $("#final_download").on('click', function () {
    html2canvas(document.querySelector("#final")).then(canvas => {
      var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      var el = document.createElement('a');
      el.href = img;
      el.download = 'final_exam(timetable4cmu).png';
      el.click();
    });
  });

});