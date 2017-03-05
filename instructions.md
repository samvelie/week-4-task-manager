Weekend Challenge #4
Hello Primers!

Welcome to your 4th weekend challenge!

Full stack is pretty awesome, huh? The idea that you are able to spin up a full application architecture in such a short time is pretty incredible. Also worth noting: there are only two weekend challenges left! This weekend is all about showing us that you have a handle on each of the different parts of the full stack.

The To-Do App
You are going to create a 'TO DO' application. This type of application is very common to tackle when learning a new language, which makes it extremely valuable to work through for the first time. Chances are good that at some point in your career you will tackle this again while learning another language.

Here are the specific components for the challenge:

Create a front end experience that allows a user to create a Task.
  [x] add create task button, maybe a field
When the Task is created, it should be stored inside of a database (SQL)
  [x]button listener
  [x]POST AJAX
  [x]Route to router.post
  []INSERT SQL
Whenever a Task is created the front end should refresh to show all tasks that need to be completed.
  [x]GET AJAX
  [x]route to router.get
  [x]Display response as DIV on DOM

  ---Not required
    []Edit button?
    []Route to router.put
    []UPDATE SQL
  /Not required

Each Task should have an option to 'Complete' or 'Delete'.
  --For Complete
  [x]Complete button/check box
  []router.put
  Whether or not a Task is complete should also be stored in the database.
  [] Insert True into Complete Column

  --Delete Deleting a Task should remove it both from the front end as well as the Database.
  []Delete button
  []Delete AJAX
  []router.Delete
  []Delete SQL
When a Task is complete, its visual representation should change on the front end. For example, the background of the task container could change from gray to green. The complete option should be 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete.

[]when the get request happens, check if complete is TRUE or false on response
  - this will change the CSS class from gray to green
  - this will show complete checked off
  - this could also be used to move to bottom of page?



Styling

Make sure that you also show us your best styling chops. We encourage you to try and write pure CSS rather than use Bootstrap.

Approach

We would recommend you spend some time thinking about how to approach this problem. Think through all the logic that will be needed prior to writing any code. Take your time, relax, remember that impostor syndrome is real, and that you are capable of knocking this out of the park!

Database Structure

[]SQL Table ID, Task Description, Complete (T/F)

Please include a database.sql text file in your repo that includes all of your CREATE TABLE queries. This is so we can re-create your database while testing your app.

HARD MODE
In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task. Once again, you can interrupt this however you would like.

PRO MODE
Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.