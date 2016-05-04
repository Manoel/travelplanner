Travel Planner
=============

The system has the folowing requiremnts:

* User must be able to create an account and log in

* When logged in, user can see, edit and delete trips he entered

* There are three roles (a regular user is only able to CRUD on his owned records, a user manager is able to CRUD users, an admin is able to CRUD on all records and users

* When a trip is entered, it has Destination, StartDate, EndDate, Comment

* When displayed, each entry has also day count to trip start (only for future trips)

* User can filter trips

* Print travel plan for next month

Technical Observations
====================

* REST API: it is possible to perform all user actions via the API, including authentication

* All actions are done in client side using AJAX, there is no page refreshing

* There are functional tests that use the REST Layer directly

* There are unit and e2e tests

Subprojects
==========

There are two projects:

* Front end: Implemented as a Single Page Application using AngularJs

* Back end: REST API implementation

Front End
========

Back End
========

Tools
====

You need to install the following tools if you want to run this application:

* JDK 8(http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* Maven(http://maven.apache.org/) (the application is tested with Maven 3.0.5)

Running the Application
=======================

You can run the each application by using the following command:

    mvn clean spring-boot:run
