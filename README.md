# Hello
This is a sample UI app built with React, Redux, Material UI and Node. Created using create-react-app https://create-react-app.dev/docs/adding-typescript/

Currently, only GET apis from the main service are consumed in this app.

1. GET Employee
1. GET Compensation
1. GET ReportingStructure

## Description
When App.tsx loads, we make async calls to above 3 apis to fetch employee and compensation data and store in Redux.

EmployeeDetails component hooks into Redux to render the UI.

UI is fairly straightforward. Two tabs: 1. Table with Employee detail 2. Table with compensaiton details.

> Enter an employee ID in search bar and press Enter

## Prerequisites
Needs NodeJS https://nodejs.org/en/

## Build and Run 
Clone repo and run:
`npm install && npm start`

Navigate to http://localhost:3000/

