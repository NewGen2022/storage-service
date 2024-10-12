<h1 align="center">Storage Service</h1>
<p align="center"> <strong><i>This app build as a part of Odin Project Project Curriculum to practice ExpressJS, EJS, PostgreSQL, PrismaORM</strong></i> </p>
<h2 align="center"><a href="https://storage-service.up.railway.app/" target="_blank">Storage Service Live</a></h2>

<p align="center">
  <img src="https://github.com/NewGen2022/storage-service/blob/main/public/images/storage.png" alt="App Icon">
</p>

# About The Project
This was a project assignment from The Odin Project's 2024 NodeJS course. 
The assignment was to create a stripped down version of Google Drive using Express and the templating engine EJS.

## Technologies used
- ExpressJS: Handles backend logic and routing.
- EJS: Facilitates server-side rendering and templating for the frontend.
- PostgreSQL: Serves as the relational database to store application data.
- Prisma ORM: Provides an Object-Relational Mapping approach for interacting with the PostgreSQL database.
- CSS: Enhances the visual appeal and styling of the frontend.
- Railway.app: A platform for deploying the full-stack application.
- Supabase: Acts as the cloud storage provider for securely managing user-uploaded files.

## Functionality of the app
- Directory Management: Implement Create, Read, Update, Delete (CRUD) operations and navigate through the directory structure with breadcrumb navigation.
- Directory Sharing: Allow users to share directories using a dedicated sharing form.

- File Management: Facilitate CRUD operations for files and enable navigation with breadcrumb support.
- File Sharing: Generate unique share links for individual files.

- Access Control: Set expiration dates for shared directories and files to manage access effectively.

- User Feedback: Provide clear feedback through popup alerts and messages.

- Registration: Enable new user sign-up with PostgreSQL, managed through Prisma ORM.
- Authentication: Secure user sessions using PassportJS and Prisma Session Store.

- Cloud Storage Integration: Manage file uploads and downloads securely with Supabase Storage.

- Error Handling: Implement centralized error handling middleware to streamline error management.

- Form Validation: Provide real-time validation with live feedback for forms.

- Modular Architecture: Structure the application by organizing code into different folders and specific files for improved modularity and maintainability.



# App preview
![app preview]()

