$(document).ready(function(){
  console.log('jquery sourced');

  getAndDisplayTasks();

  $('.taskList').on('change', '.completeBox', function(){
    var taskId = $(this).parent().parent().data('id');
    var isChecked = $(this).is(':checked');
    console.log('complete is ' + isChecked + ' on ' + taskId);
    if(isChecked){
      console.log('input checked true');
    } else {
      console.log('input checked false');
    }
    updateCompleteStatus(taskId, isChecked);
  })

  $('.taskList').on('click', '.delete', function(){
    var youSure = confirm('Are you sure?');
    var taskId = $(this).parent().data('id');
    console.log('delete button clicked on', taskId);

    if(youSure){
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
    } 
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
        $('#taskInput').val('');
      },
      error: function(error){
        console.log(error);
      }
    })// end ajax post
  });// end add task button listener
});// end document ready

function updateCompleteStatus(taskId, isChecked){
  var taskObject = {
    taskComplete: isChecked
  }
  console.log('taskObject being sent to update', taskObject);
  $.ajax({
    type: 'PUT',
    url: 'tasks/update/' + taskId,
    data: taskObject,
    success: function(response){
      console.log('success updating', response);
      getAndDisplayTasks();
    },
    error: function(error){
      console.log(error);
    }
  })
}//end updateCompleteStatus function

function getAndDisplayTasks(){
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(response){
      console.log('back from server with:', response); //response is an array containing objects that represent each row of the database
      $('.taskList').empty();
      var tasksIncompleted = '';
      var tasksCompleted = '';
      for (var i = 0; i < response.length; i++) {
        if(response[i].task_complete){
          tasksCompleted += '<div class ="task completed" data-id="' + response[i].id + '">' +
                         '<h3>' + response[i].description + '</h3>' +
                         '<p>Complete <input type="checkbox" class="completeBox" checked></p>' +
                         '<button class ="delete">Delete</button>' +
                         '</div>';
        } else {
          tasksIncompleted += '<div class ="task" data-id="' + response[i].id + '">' +
                         '<h3>' + response[i].description + '</h3>' +
                         '<p>Complete <input type="checkbox" class="completeBox"></p>' +
                         '<button class ="delete">Delete</button>' +
                         '</div>';
        }
      }
      $('.taskList').append(tasksIncompleted);
      $('.taskList').append(tasksCompleted);
    }
  })
}
