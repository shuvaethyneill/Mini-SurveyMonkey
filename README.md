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
This is the first milestone of our project. Our project is on schedule and can be tracked using our Jira Board: https://minisurveymonkey.atlassian.net/jira/software/projects/MS/boards/1

Currently we have set up MongoDB and integrated it with our MiniSruvey Project. The web application is functional for some basic use cases and has the following features implemented so far:
- Create Form View + logic
  - Form questions can be multiple choice, take a number input, or be a text input
    - Multiple choice fields can be individually added or removed (default of 2)
    - Number fields can have a lower or upper bound set
  - Form questions can be individually deleted
  - Has ability to submit the form or reset the form entirely
- View Single Form
  - Display all the questions back to the user (not the form name yet)
- Endpoints for all features created
  - All CRUD operations supported: Add Form, Edit Form, Read Form, Delete Form


**What is Submitted on BrightSpace:**
- Source Code
- UML Class Diagram
- Database Schema 
  Note: ORM Diagram is not included because this project works on a nonrelational database so an ORM diagram is not applicable


# Next Steps 
Alpha Release:
- Add additional features
  - User profile (so we can have a form owner)
      - Have Form owners who have the ability to close their surverys
  - Edit Form
  - Close Form
      - if a surveryor chooses to close their form, it should display some sort of analytics based on the form responses
  - Delete entire Form
  - View All Forms view 
