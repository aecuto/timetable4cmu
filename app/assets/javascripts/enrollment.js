
$(function(){
  $("#sid").inputmask("999999999");
  $("#term").inputmask("9/99");

  if(!$("#timetable").hasClass('js-full')){
    $('.li-width').addClass('mobile-width');
		$('.ul-height').addClass('mobile-height');
  }

  $("#loading").hide();
  $("#submit").click(function(){
    $("#loading").show();
    $("#submit_text").hide();
  });

  $("#dowloadTimetable").on('click', function () {
    html2canvas($("#timetable"), 
    {
      onrendered: function (canvas) {
        var a = document.createElement('a');
            // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
            a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            a.download = 'timetable(timetable4cmu).png';
            a.click();
        }
    });
  });

});