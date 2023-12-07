# Mini-SurveyMonkeySYSC4806
[![Java CI with Maven](https://github.com/andre-Hazim/Mini-SurveyMonkeySYSC4806/actions/workflows/maven.yml/badge.svg)](https://github.com/andre-Hazim/Mini-SurveyMonkeySYSC4806/actions/workflows/maven.yml)

# Description
This project aims to implement a survey creation tool, empowering users to create and conduct surveys effortlessly. Leveraging NoSQL technology (MongoDB), Spring, and Java, this application offers a dynamic platform for surveyors to create surveys with different question types, including text, numeric range, and multiple-choice questions. Leveraging NoSQL specifically removes the need for having a predefined schema, allowing us to store forms where the structure of questions and responses vary from survey to survey along with adapting to changing survery requirements without altering the database structure.

# Installation + Setup
**Deployed Version:**

Our current release is available for use and hosted using Microsoft Azure at:  
https://mini-surveymonkeysysc4806.azurewebsites.net/

Alternatively, users can also run the application locally if they would like following the Local Setup Instructions (below). 


**Local Setup:**

This project utilizes Java, Maven, and MongoDB
Prerequisites:
Before you begin, ensure you have met the following requirements:
- Java 17 JDK
- Apache Maven 
- MongoDB
- IntelliJ IDEA
- Terminal

Installing Java:
This application uses Java 17. Although there are newer versions available, Java 17 is the latest stable version available on Azure where this applicaiton is deployed. 

Installing MongoDB:
1. Open your browser and download the MongoDB shell: https://www.mongodb.com/docs/manual/administration/install-community/
2. Follow the instructions in the link above
3. The mongoDB service can be started using the following command:
   `brew services stop mongodb-community@7.0`
Alternatively the cloud version of MongoDB can be downloaded here:
https://www.mongodb.com/try/download/compass

Installing IntelliJ:
1. Open your browser and download the dmg from the following: https://www.jetbrains.com/idea/download/?section=mac (Both the Ultimate or Community edition will work)
2. Start the IntelliJ Installer executable and follow the instructions.

Installing Apache Maven:
1. IntelliJ comes pre-built with Apache Maven so no additional installation is required.

Setup:
1. Open your terminal and clone the project:
2. Launch Intellij and open up the Mini-SurveyMonkey project
3. Navigate to the Spring Runnable File: `src/main/java/org.MiniSurveyMonkey/SurveyMonkeyApplication.java
4. To run the file, click the play button on line 16
5. The application should run and navigate to `http://localhost:8080/` to view the application


# Current Progress
We have now completed the Final Demo. Our project was completed on schedule and was tracked using our Jira Board: https://minisurveymonkey.atlassian.net/jira/software/projects/MS/boards/1

This project leverages MongoDB to perform the noSQL operations in our MiniSruvey Project. The web application is functional and has the following features implemented:
- **Create Form**
  - Form questions can be multiple choice, take a number input, or be a text input
    - Multiple choice fields can be individually added or removed (default of 2)
    - Number fields can have a lower or upper bound set
  - Takes in form title as input
  - Form questions can be individually deleted
  - Has the ability to submit the form or reset the form entirely
- **View Single Form and Respond**
  - Display all the questions back to the user
    - Shows form name
    - Correctly displays multiple choice, number field, and text field
    - User can fill out form with responses and submit (Alpha-Release)
    - Upon submitting a form, users are brought to a success page and can navigate to the View All Forms page (Alpha-Release)
- **View All Forms View**
  - Displays all forms in a list (clickable)
  - User can also search for a form based on id
- **User profile** (Alpha-Release)
  - Users can login with a username to keep track of who is an author or not when responding to forms
- **Close Form**
  - Author can close their form. Doing so will display form responses (analytics for each question)
    - Pie chart for multiple choice question
    - Graph for numerical field question
    - Scrollable list for text responses
-  **Delete Form**
  - Author can delete a form they have previously created (closed or not). 
    - Delete form button appears only for the author of the form
- **Edit Form**
  - Author can edit a form they have previously created. 
    - Adjust and switch the field types on the form
    - Delete or add more questions
- **Endpoints for all features created**
  - All CRUD operations supported: Add Form, Delete Form, Read Form, Delete Form


### What is Submitted on BrightSpace:
- Source Code
- UML Class Diagram
- Database Schema 
  Note: ORM Diagram is not included because this project works on a nonrelational database so an ORM diagram is not applicable
