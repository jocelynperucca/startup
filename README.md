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
- [x] **Login** - Login placeholder in index.html including password placeholder as well. DIsplays user name placeholder on addTask.html above add task box and while viewing task list on taskList.html.
- [x] **API** - There is an API placeholder in motivation.html where the motivational quote is. When implemented, it will randolmyl generate a motivational quote from "Motivational Quote" API.


## CSS Deliverable

For this deliverable I designed and styled Prioritask and each of its pages.

- [x] **Header, footer, and main/body content** - I used CSS to make the header and footer equivalent across all pages. I altered and unified design across all pages with colors.
- [x] **Navigation elements** - I got rid of the underlines for all of the links and changed the font color to be more consistent with the prioritask logo colors. Changed menu layout across all pages to be window size responsive and now is horizontal across the page.
- [x] **Responsive to window resizing** - All elements were made into flex elements to ensure that Prioritask looks good on all devices and will resize according to window size as well.
- [x] **Application elements** - I used padding to ensure that each element has appropriate whitespace and will not clash with others. I also put in some borders to distinguish certain application elements (Login/register border - *index.html/main.css*, table borders and divider - *taskList.html/taskList.css*).
- [x] **Application text content** - I made sure there are consistent fonts across all pages. Font colors match with logo colors and task priorities are either red, orange, or green depending on priority level on *addTask.html/.css* and *taskList.html/.css*. Added flourish font to Motivational Quote API placeholder on *motivational.html/.css*.
- [x] **Application Images** - My application image is the Prioritask logo and is now centered on each page along with the added flex element so that it stays in the center no matter the window size or device.

## React Deliverable

For this deliverable I used JavaScript and React so that Prioritask mocks full application functionality. It will work for a single user.

- [X] **Bundled and Transpliled** - I did this with the instructions from Simon React!
- [X] **Components** - *Login*, *addTask*, *taskList*, and *motivation* components added in src directory. In each component contain functions to mock app functionality.
    - [X] **Login** - When you "create user" or "login" it will grant you access to the rest of the pages. You must have something typed into the fields to login or create user.
    - [X] **Database** - Local storage is used to store userName for *Login* component and use that for adding task name and task completed name. Mocks database functionality with completed tasks table and *addTask* and *taskList* components and stored tasks completed even when a different user is logged in.
    - [X] **Web Socket** - Prioritask mocks web socket functionality by allowing mulitple users to add tasks to task list and will show up for other logged in users using *addTask* and *taskList* components.
    - [X] **App functionality** - With all these components placed together, startup.prioritask.click mocks all functionality with being able to log in, add a task see the task list, mark tasks as done, and see the motivation API when logged in.
- [X] **Router** - Routing between login and addTask, taskList, and motivation components.
- [X] **Hooks** - I used `useState` to hold values for username, authenticated state, to hold values to pass to taskList from addTask, and when clicked the checkbox for done, to move those values to a different table of completed tasks. I also used `useEffect` in my *motivation* component to mock API call functionality and be a placeholder for where my motivational-quote API will go in later startups.

## Service Deliverable

For this deliverable I added backend endpoints that recieve and post the tasks along with a third party API.

- [X] **Node.js/Express HTTP service** - I did this with instructions from Simon Service and 
created index.js with use of express using `const express = require('express');` and `const app = express();`.
- [X]  **Static middleware for frontend** - I did this also with instructions from Simon Service and used `app.use(express.static('public'));` to implement this.
- [X] **Third party service endpoints** - Using my backend, I called *forismatic.com/en/api* to use their most inspiring quotes and expressions api on my *motivation.jsx*. I called this from the front end on my *motivation.jsx* to make a random quote appear when the page is refreshed.
- [X] **Backend service endpoints** - I implemented endpoints for my *addTask.jsx* and *taskList.jsx* to call the endpoints and store tasks when added from the addTask webpage. I also used backend service endpoints to update a task as completed when the checkbox "Done" is marked off and move it to a different table.
- [X] **Frontend calls service endpoints** - I did this by using the `fetch` function for the third party API. I also used `fetch` functions in my *addTask.jsx* and *taskList.jsx* in order to retrieve stored tasks and shift arrays from listed to completed.



