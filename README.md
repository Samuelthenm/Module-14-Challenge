# Module-14-Challenge

# The Tech Blog Module-14

[![Watch the video](https://drive.google.com/file/d/18p38Xl_uI-FHsMyeYly7gVEykTZUYEq0/view?usp=drive_link)



# Description

This is Tech Blog! This application is built using Express.js, Sequelize, PostgreSQL, and Handlebars.js, following the  MVC design pattern. It enables users to create, edit, and delete blog posts, comment on posts, manage authentication and sessions, and view individual posts with related comments. The application supports CRUD operations for posts and comments with proper access control, ensuring secure interactions. With a clean and user-friendly interface, enhanced styling improves readability and enhances the overall user experience.



# Acceptance Criteria 

GIVEN a CMS-style blog site

WHEN I visit the site for the first time

THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in

WHEN I click on the homepage option

THEN I am taken to the homepage

WHEN I click on any other links in the navigation

THEN I am prompted to either sign up or sign in

WHEN I choose to sign up

THEN I am prompted to create a username and password

WHEN I click on the sign-up button

THEN my user credentials are saved and I am logged into the site

WHEN I revisit the site at a later time and choose to sign in

THEN I am prompted to enter my username and password

WHEN I am signed in to the site

THEN I see navigation links for the homepage, the dashboard, and the option to log out

WHEN I click on the homepage option in the navigation

THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created

WHEN I click on an existing blog post

THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment

WHEN I enter a comment and click on the submit button while signed in

THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

WHEN I click on the dashboard option in the navigation

THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post

WHEN I click on the button to add a new blog post

THEN I am prompted to enter both a title and contents for my blog post

WHEN I click on the button to create a new blog post

THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post

WHEN I click on one of my existing posts in the dashboard

THEN I am able to delete or update my post and taken back to an updated dashboard

WHEN I click on the logout option in the navigation

THEN I am signed out of the site

WHEN I am idle on the site for more than a set time

THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts



# Installation 

1. Create the Mod. 14 on GitHub
2. Run git clone  and open Vscode
3. Add the files needed and start adding   
4. Run npm i  
5. Create a .env, like below as an example 
   - `DB_NAME='tech_blog_db'`  
   - `DB_USER='username'`  
   - `DB_PASSWORD='password'`  
6. Run - psql -U postgres
7. Create the database by running:  `CREATE DATABASE tech_blog_db;`
8. Run `node seeds/seed.js` 
9. Then `npm start`. 
10. Open your browser and visit `http://localhost:3001` 
11. Test the application's functionality by signing up for a new account, creating, editing, and deleting blog post  Adding comments to posts. Then test user auth. (login, signup, and logout)  
12. Run git add and commit. Then git push to save your work and done  
11. last is to delpoy it on Render


