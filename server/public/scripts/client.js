$(document).ready(function(){
  console.log('jquery sourced');

  getAndDisplayTasks(); //function which picks up database data and displays based on task completeness

  $('.taskList').on('change', '.completeBox', function(){
    var taskId = $(this).parent().data('id');
    var isChecked = $(this).is(':checked');
    console.log('complete is ' + isChecked + ' on ' + taskId);
    updateCompleteStatus(taskId, isChecked);
  }) //end listener for check on complete check boxes

  $('.taskList').on('click', '.delete', function(){
    var youSure = confirm('Are you sure you want to delete this task???');
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
  }) //end listener for click on delete buttons

  $('#addTaskButton').on('click', function(){
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
      console.log('back from server with:', response);
      $('.taskList').empty();
      var tasksIncompleted = '';
      var tasksCompleted = '';
      for (var i = 0; i < response.length; i++) {
        if(response[i].task_complete){
          tasksCompleted += '<div class="task completed" data-id="' + response[i].id + '">' +
                         '<h3 class="taskDescribe">' + response[i].description + '</h3>' +
                         '<input type="checkbox" class="completeBox" id="complete' + response[i].id + '" checked>' +
                         '<label for="complete' + response[i].id + '" class="completeBoxLabel">COMPLETE</label>' +
                         '<button class ="delete">DELETE</button>' +
                         '</div>';
        } else {
          tasksIncompleted += '<div class ="task" data-id="' + response[i].id + '">' +
                         '<h3 class="taskDescribe">' + response[i].description + '</h3>' +
                         '<input type="checkbox" class="completeBox" id="complete' + response[i].id + '">' +
                         '<label for="complete' + response[i].id + '" class="completeBoxLabel">COMPLETE</label>' +
                         '<button class="delete">DELETE</button>' +
                         '</div>';
        }
      }
      $('.taskList').append(tasksIncompleted);
      $('.taskList').append(tasksCompleted);
    },
    error: function(error){
      console.log('Error from server', error);
    }
  })
} //end getAndDisplayTasks function 
