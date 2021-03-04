# Planer_OnTime

**About**

On Time is a planer with extra functions: pomodoro, data synchronization on different devices, statistics and authorization.

**Progress**

**Main flow & Measurable goals**

1. User logs or sign up by Google.
1. After authorization the page “Сьогодні” opens.
1. Using menu user can go to pages: “Сьогодні”, “Тиждень”, “Важливі”, “Справи”, “Заплановані” or create personal list. 

Page “Сьогодні” contains tasks on current day and overdue tasks.

Page “Тиждень” contains tasks on current week and overdue tasks.

Page “Важливі” contains all tasks marked as important.

Page “Справи” contains all tasks without date.

Page “Заплановані” contains all tasks with and without date.

Personal list contains tasks that will be shown only in this list.

1. Task:
- Creation

While creating new task user can set name, date, description, priority of the task.

- Editing

User can change name, date, description, priority of the task.

- Deleting

User can delete task.

1. Pomodoro.

User can start Pomodoro for one task.

1. Pomodoro settings.

User can set Pomo duration, short and long break duration, frequency of long break, daily Pomo goals.

1. Using additional menu user can go to pages: “Акаунт”, “Статистика”, “Налаштування Pomo”.

Page “Акаунт” lets user change his account.

Page “Статистика” contains completed tasks and Pomo duration.

Page “Налаштування Pomo” contains Pomodoro settings.

1. Synchronization

All data will be synchronized with server db.

When we both devices are connected to the network :

- when we start the timer on one of the devices on the other, we can see the timer already running and its status. When the second device is not connected to the internet:
- when it will connect to the internet, we compare the time on the timer and leave the one where more time has passed.

**Technologies**

- React.js
- NestJS
- Node.js
- Redux
- MS SQL

**Mockups**

- Desktop version 

<https://www.figma.com/file/qxbtxC6DhhhoJzX6k6eSFk/on-time?node-id=48%3A69&viewport=375%2C350%2C0.20931540429592133>

- Mobile version

<https://www.figma.com/file/vpo1pJzaG05V2Rvzg44jAL/on-time-mobile?node-id=0%3A1>












