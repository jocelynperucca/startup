# PrioriTask
## Specification Deliverable

### Elevator Pitch <br/>
Whether you have just moved out to go to college, just gotten married, or whatever it may be, there always seems to arise challenges when living with one or more people! Working out what needs to get done whether that be groceries, chores, events, or other to-do items, and especially how quickly they need to get done is just one of those. With *PrioriTask*, a group of 2 or more people can add items that need to get done and how high of a priority it is with a three-level system (low, medium, high) that will display the items from highest to lowest. As each person in the group adds tasks, they will appear on the other members lists so that any person can do and mark them off when done. With this system, no task will be forgotten and will **assure** that everyones needs are seen! <br/>

### Design
![PrioriTask](/FINALDESIGN.jpg)

### Technologies
- **HTML:** 
Appropriate and correct HTML structure to display organization of application, boxed in tasks and adaptable task list size.
- **CSS:**
Accessible to multiple devices, uses multiple colors that are cohesive to show good design, each task has same layout and correct spaces in between each sublist.
- **JavaScript:**
Login capability, task order, shows other group members tasks and priority
- **React:** 
Application that allows users to use multiple check boxes to add priority, other check boxes to mark task as done and delete from interface, active login and submit actions
- **Web Service:**
I will use backend for -
    - submitting tasks and their priority
    - retrieving added tasks 
    - displaying who added specific task
    - use a motivational quote API to encourage them to do tasks. [Motivational Quote API](https://forismatic.com/en/api/).
- **Authentication:**
User login/register in order to store name to show who has added the task.
- **Database data:**
As users submit names it will store that info, stores who added each task, cannot see or complete any of the tasks unless logged in.
- **WebSocket data:**
As users submit tasks and their priority level, these tasks are shown to all users

### Key Features
- Secure login to prevent random tasks added
- Capacity to write and submit a task
- Add task priority 
- Display tasks in priority order
- Tasks are constantly updated and shown in real time
- Allows authenticated user to mark any task as done


## HTML Deliverable
For this deliverable I made the structure of my Prioritask application using HTML.

- [x] **HTML pages for each component** 
    - ***index.html*** for the homepage/login for authentication and storage of user name to put in the task. 
    - ***addTask.html***  to include react and alow interactive buttons for the user. The add button is placed and will be used to store the data before using a websocket to show that specific task on the task list. Priority radio buttons to allow priority to be stored when adding a task were implemented.
    - ***taskList.html*** - shows database and websocket placeholders.
    - ***motivation.html*** - Uses API and explains application more.
- [x] **Links** - When you press log in, it will autodirect you to addTask.html. Page also includes a header on each page with navigatioun capabilities to each of the html files
- [x] **Text** - Each of the tasks and it's priorities are represented in a text table. The priority list is also represented by text (High, Medium, Low).
- [x] **Images** - The Prioritask logo is inputted in each .html header.
- [x] **Database** - on taskList.html, there is a table that shows previous couple tasks that have been done that will be stored in the database when marked done.
- [x] **Websocket** - Table also in taskList.html that shows current task, person who added it, priority, and checkbox to mark as done. This will be updated for all users as each user adds a task.
- [x] **Login** - Login placeholder in index.html including password placeholder as well.
- [x] **API** - There is an API placeholder in motivation.html where the motivational quote is. When implemented, it will randolmyl generate a motivational quote from "Motivational Quote" API.



