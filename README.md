# Express Store Website

This project contains different routes that shows the users and reviews.
Most of the functionality is with the reviews. Foods and Employees are
available using the basic routes. Different get, delete and post requests
can be fulfilled with the forms.

# requirements

1. an ide to run it (vscode highly recommended)
2. Install node
3. Install express
4. postman (not needed but highly recommended)

## Installation

1. git clone https://github.com/SuperWebMonkey/SBA-318-Express-App.git
2. cd SBA-318-Express-App
3. npm install
4. npm start dev

## Features

- Api routes to different pages
- Use the forms to complete different requests
- Navigate the different pages with the tabs in the left navbar

## how to use

- Go to the api route
- the about section shows all the available users and ratings
- Search bar does not work yet
- Use the review form to post to the user endpoint.
- Delete or Patch by id in the admin page

## api endpionts

- localhost:3000 | home
- localhost:3000/about | nonfunctional search bar that uses query parameters
- localhost:3000/contact | review form to make a post request to users
- localhost:3000/admin | delete and patch form to users
- localhost:3000/employee | employee data
- localhost:3000/employee/:id | get a specific employee daa
- localhost:3000/food | food data
- localhost:3000/food/:id | get a specific employee data
- localhost:3000/users | user data
- localhost:3000/users/:id | get a specific user data

## Tech Stack Used

- HTML
- CSS
- JS
- Node and Express
