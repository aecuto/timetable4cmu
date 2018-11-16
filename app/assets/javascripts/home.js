$(function(){

  function today(hours, minutes) {
    var date = new Date();
    date.setUTCHours(hours, minutes, 0, 0);
    return date;
  }

  // events
  var events = [
      {
          name: html('Meeting 1 <i class="fas fa-graduation-cap"></i>'),
          location: 'Mo',
          start: today(9, 0),
          end: today(11, 0),
          url: null,
          class: '', // extra class
          disabled: false, // is disabled?
          data: {}, // data to set with $.data() method
          userData: {} // custom data
      },
      {
          name: 'Meeting 2',
          location: 'Tu',
          start: today(8, 30),
          end: today(10, 30)
      },
      {
          name: 'Meeting',
          location: 'We',
          start: today(8, 0),
          end: today(17, 30)
      },
      // more events here
  ];


  var locations = [
    {id: 'Mo', name: "Monday"},
    {id: 'Tu', name: "Tuesday"},
    {id: 'We', name: "Wednesday"},
    {id: 'Th', name: "Thursday"},
    {id: 'Fri', name: "Friday"}
  ];
  

  $('#timetable').skedTape({
      caption: 'Timtable',
      start: today(6, 0),
      end: today(24, 0),
      showDates: false,
      showEventDuration: true,
      locations: locations,
      events: events,
  });


});