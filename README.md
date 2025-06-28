# Smart Idea - A Simple Idea Board 💡



Smart Idea is a full-stack web application designed to manage and display ideas publicly. It empower users to work in a collaborative digital whiteboard for brainstorming. The backend is built with Spring Boot, providing RESTful APIs for creating, reading, updating, and deleting ideas, complete with server-side validation. The frontend is developed using React (Vite), offering a dynamic and responsive user interface to interact with the ideas.


## Documentation 🗂️

Please go through the below documentation thoroughly for get an understanding to run this project locally.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
  - [Frontend Setup (React)](#frontend-setup-react)
- [Running the Application](#running-the-application)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contact](#contact)
## Features ✅

- **Create New Ideas:** Easily add new ideas with titles and descriptions.
- **View All Ideas:** Display a list of all existing ideas with latest ones first.
- **Edit Existing Ideas:** Modify the details of saved ideas.
- **Delete Ideas:** Remove ideas from the system with a confirmation. 
- **Interactive and Responsive UI** : A user-friendly and modern-looked interface that adapts to various screen sizes.


## Technologies Used 🛠️

### Frontend (React with Vite)

* **React.js:** version 19.1.0

* **Axios:** For making HTTP requests to the backend.

* **Tailwind CSS:** For rapid UI development and styling.

* **Material-UI (MUI):** For UI components like Snackbars, and Icons.


### Backend (Spring Boot)

* **Java:** Java 21

* **Spring Boot:** 3.5.3

* **Spring Web:** For building RESTful APIs.

* **Spring Data JPA:** For database interaction.

* **Lombok:** For reduce boilerplate code.

* **Database:** MySQL


## Getting Started 🚀

Follow these below steps to get your development environment set up and run the project locally.
## Prerequisites 📝

Before you begin, ensure you have the following installed on your machine:

* **Git:** For cloning the repository.
    * [Download Git](https://git-scm.com/downloads)
* **Node.js & npm :** For the React frontend.
    * Node.js (LTS recommended) and npm: [Download Node.js](https://nodejs.org/en/download/)
* **Java Development Kit (JDK):** For the Spring Boot backend.
    * [Download OpenJDK 21](https://adoptium.net/temurin/releases/)
* **Maven (or Gradle):** For building the Spring Boot backend.
    * [Download Maven](https://maven.apache.org/download.cgi)
* **IntelliJ IDEA and Visual Studio Code:** For the backend and frontend development respectively.

* **MySQL Server:** For use as database
    * [Download MySQL Installer](https://dev.mysql.com/downloads/installer/)


## Setup & Installation 📦

1.  **Clone the repository:**


```bash
  git clone https://github.com/rushxdev/ideaBoard.git
  cd simple_Idea_Board
```
### Backend Setup (Spring Boot)

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```    
* **Note:** Better to open from Intellij IDEA.


2.  **Configure Database (application.properties):**

* The backend uses a `src/main/resources/application.properties` file for configuration, including database settings.
* Create a `src/main/resources/application.properties` file and adjust the database connection details shown inside the `application.properties.sample`. 
* You can directly copy paste it to your new `application.properties` and configure as you want.


**For using a MySQL database:**

    spring.datasource.username=[your_database_username]
    spring.datasource.password=[your_database_password]
    spring.datasource.url=jdbc:mysql://localhost:3306/[your_database_name]

    spring.jpa.hibernate.ddl-auto=update
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    spring.jpa.show-sql=true

* Replace [your_database_name] with the database name you created.

* Replace [your_database_username] and [your_database_password] with your MySQL server credentials.
* **Note:** Ensure your MySQL database server is running and accessible.

3.  **Build the backend:**

    ```bash
    mvn clean install
    ```
* **Note:** Better to use built-in Maven feature in Intellij IDEA.

### Frontend Setup (React)

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables (.env):**
    
    The frontend uses environment variables to specify the backend API URL.

    Create a `.env` file in the **root of your frontend directory** (`frontend/.env`).

    **For Vite:**
    ```env
    VITE_API_BASE_URL=[your_springboot_backend_API]
    ```
* **Note:** Typically the Spring Boot backend API will be `http://localhost:8080/api`. Assumes your Spring Boot backend will run on port `8080` and expose APIs under `/api`. 
                Adjust if your backend configuration is different.
* **Important:** A sample of a .`env` provided as `.env.sample`. Remember to restart the frontend development server if you change the `.env` file while it's running.
## Running the Application 💻⚙️

### Running the Backend

1.  **Navigate back to the backend directory:**
    ```bash
    cd [your-project-directory]/backend
    ```
2.  **Run the Spring Boot application:**
    ```bash
    mvn spring-boot:run
    ```
    The backend will typically start on `http://localhost:8080`. You should see logs indicating successful startup. Hibernate will automatically create the table in your database.
* **Note:** Better to use built-in Application Running feature in Intellij IDEA.

### Running the Frontend

1.  **Navigate to the frontend directory:**

    ```bash
    cd [your-project-directory]/frontend
    ```
2.  **Start the React development server:**

    ```bash
    npm run dev 
    ```
    The frontend will typically open in your browser at `http://localhost:5173`. 
* **Note:** Better to open from Visual Studio Code and use the terminal.
## Usage 🤖

Once both the backend and frontend applications are running:

Open your browser to `http://localhost:5173/`
        
* **Add New Idea**: Click the "New Idea" button to open a modal. Fill in the title and description and click "Add Idea".

* **View Idea**: All your notes will be displayed below the "New Note" button, sorted by the most recent first.

* **Edit Idea**: Click the "Edit" button bottom right corner on any idea to open the modal with its current details. Make changes and click "Update Idea".

* **Delete Idea**: Click the "Delete" button bottom right corner on any note. Confirm the action in the prompt.