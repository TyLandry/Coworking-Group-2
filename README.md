# CoWorking Datase Project


Wireframes created on Figma:
[Figma](https://www.figma.com/design/qzqipjJdeGB8L45dBNT9ON/CoWorking-Project?node-id=12-374&t=DGISsyvl8jPZR1rg-1)


Repository of CoWorking Datase



## 📑 Document
- [Document Github](https://github.com/LizzyTrevisan/Co-working-Database-Project.git)
## 📔 Documents

| Machine Language | Program |
| ------- | ------------ |
| MySQL | CoWorking Group Project | 



## CoWorking Database Group Project


## Learning Objectives
•	Design a database according to the requirements of a chosen case study.
•	Implement complex SQL queries to retrieve information from multiple tables.
•	Create useful sample data to test queries.
Case Study
Coworking is a work style where different individuals or teams share a working environment. If you are self-employed or a working-from-home professional, you would love to have the option to rent a meeting room, or a desk in an office equipped with high-speed internet, printers, copiers, stationaries, and office kitchen. As there is an increase in the number of coworkers and the number of sharable workspaces, we are looking to develop an application to connect both parties. The objective is very similar to how Uber connects riders with drivers and Airbnb connects tenants with landlords.
The Minimum Viable Product (MVP) is the smallest conceivable list of features that fulfill the primary business goal of a software product. One way to summarize a feature is by a “user story” – a short sentence describing the feature from the perspective of the user. User stories frequently take the following form: “As a <type of user>, I can <take some action> so I can <some reason>.” You can start with the following user stories as a backlog for your MVP:

1.	As a user, I can sign up for an account and provide my personal information: name, phone, and email. I can choose my role as a workspace owner or a coworker.

2.	As an owner, I can list a property with the following information:
- 	Address (e.g. 345 - 6 Avenue SE, Calgary, AB T2G 4V1),
- 	Neighborhood (e.g. Downtown, Kensington, Beltline),
- 	Area (in square meters),
-	Whether it includes parking or not,
-	Whether it is reachable by public transportation or not.

3.	As an owner, I can select one of my properties and list multiple workspaces for rent in that property. Workspaces can be one of the following options: meeting rooms, private office rooms, or desks in an open work area. For each workspace I can specify how many individuals it can seat, the availability date, the lease term (day, week, or month), and price.

4.	As an owner, I can modify the data for any of my properties or any of my properties’ workspaces.

5.	As an owner, I can delist (delete) any of my properties or any of my properties’ workspaces from the database.

6.	As a coworker, I can search for workspaces by address, neighborhood, area (square meters), with or without parking, with or without public transportation, the number of individuals it can seat, the availability date, the lease term, or price.

7.	As a coworker, I can select a property or workspace and view its details.

8.	As a coworker, I can get the contact information of a workspace owner (name, phone, and email).

## Instructor's Feedback: 
The first part of the project was to improve and normalize the table where user would be able ot search for the address, type of rental, Lease, in an efficient way for the queries. Therefore, FK tables were created to support the  PK tables and columns were added to support a different way of adding and searching for the address.


Vs code Studio
SQL Server Management Studio


## License
Distributed under the MIT License. See LICENSE for more information.

