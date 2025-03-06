# Title: My Books
### Author: Nicholas Parent
### Date Created: February 1st 2025
***
## Description
**Abstract** 

Using a .NET core backend connecting to a MySql Server for API logic and data storage.
The React framework is used for the web front end. I plan on eventually creating a Flutter front end for mobile app display.
Figma was used in the creation of user interfaces. The idea behind my books was to track personal reading and interact with friends.
Its key unique feature is a scrollable view of recommended books tailored to any given user.

**My Experience** 

This app was my first time working with the .NET core framework which lead to a massive learning curve while developing the backend.
I chose it nonetheless so that i could ensure smooth readability and good reusability v.i.a. object-oriented programming. The first UI I implimented was web,
I used React since I was already familiar and having web up before independent apps ensured all platforms could be tested and functional.
***
## Getting Setup:
**Make Sure Flutter, Npm, and .NET are installed**

**Step 1:** Run _git clone https://github.com/nicklparent/myBooks.git_

**Step 2:** Run the <ins>create_database.sql</ins> and <ins>sample_data.sql</ins>
in your MySql database

**Step 3:** Navigate to backend/ and create a new file named <ins>appsettings.json</ins> and insert the follwing code with **_your own config_**

_{
"ConnectionStrings": {
"DefaultConnection": "server=**yourserver**;port=**your port**;database=my_books;user=**your use**;password=**your password**"
},
"Logging": {
"LogLevel": {
"Default": "Information",
"Microsoft.AspNetCore": "Warning"
}
},
"AllowedHosts": "*"
}_

**Step 4:** Navigate to backend/ and run **_dotnet run_**

**Step 5:** Navigate to web/ and run **_npm i_**

**Step 6:** Navigate to web/ and run **_npm start_**

**_Enjoy using my app!_**