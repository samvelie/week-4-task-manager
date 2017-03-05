$(document).ready(function(){
  console.log('jquery sourced');

  $('#addTaskButton').on('click', function(){ //better or worse than on submit?
    console.log('Add Task Clicked');
    var taskObject = {
      description: $('#taskInput').val()
    }
    console.log('task object:', taskObject);
    $.ajax({
      type: 'POST',
      url: '/tasks/new',
      data: taskObject,
      success: function(response){
        console.log(response);
      },
      error: function(error){
        console.log(error);
      }
    })
  })

})
