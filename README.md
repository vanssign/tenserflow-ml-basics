# Linear Regression and Active Covid Case Predition
*This project is part of Inhouse Summe internship 2021 at Delhi Technological University*

## Abstract
India is one of the countries which is affected by the covid 19 pandemic. The project aims to explore, interpret and predict active covid cases based on basic linear regression through visualisation.

## Technologies, Frameworks and packages
node.js, tenserflow.js, express.js, fetch API, chart.js

## Description
The web app fetches data from https://api.rootnet.in/covid19-in/stats/history using fetch API, displays it in the form of graphs through chart.js and performs linear regression based on tenserflow.js in real time to predict the active cases for the next day. The difference between the actual values and the predicted values can be easily seen on the graph which provides intuition about the errors and residuals.

## Future Prospects
Use of more regressive and better models for prediction, easy selection of starting date to perform piece-wise linear regression as per needs and exploring multiple linear regression taking total, recovered and deceased cases as independent variables.