$(document).ready(function(){
  console.log('jquery sourced');

  getAndDisplayTasks();

  $('.taskList').on('change', '.completeBox', function(){
    if($(this).is(':checked')){
      console.log('input checked');
      $(this).parent().addClass('completed');
    } else {
      $(this).parent().removeClass('completed');
    }
  })

  $('.taskList').on('click', '.delete', function(){
    var taskId = $(this).parent().data('id');
    console.log('delete button clicked on', taskId);
    $.ajax({
      type: 'DELETE',
      url: 'tasks/delete/' + taskId,
      success: function(response){
        console.log('success deleting');
        getAndDisplayTasks();
      },
      error: function(error){
        console.log(error);
      }
    });
  })

  $('#addTaskButton').on('click', function(){ //better or worse than on submit?
    console.log('Add Task Clicked');
    var taskObject = {
      description: $('#taskInput').val()
    }
    console.log('task object to send:', taskObject);
    $.ajax({
      type: 'POST',
      url: '/tasks/new',
      data: taskObject,
      success: function(response){
        console.log('success posting');
        getAndDisplayTasks();
      },
      error: function(error){
        console.log(error);
      }
    })// end ajax post
  });// end add task button listener
});// end document ready

function getAndDisplayTasks(){
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(response){
      console.log('back from server with:', response); //response is an array containing objects that represent each row of the database
      $('.taskList').empty();
      var tasksToShow = '';
      for (var i = 0; i < response.length; i++) {
        tasksToShow += '<div class ="task" data-id="' + response[i].id + '">' +
                       '<h3>' + response[i].description + '</h3>' +
                       '<p>Complete <input type="checkbox" class="completeBox"></p>' +
                       '<button class ="delete">Delete</button>' +
                       '</div>';
      }
      $('.taskList').append(tasksToShow);
    }
  })
}
