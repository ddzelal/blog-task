# Blog App Frontend

## Getting Started

These instructions will guide you through the setup process to run the frontend part of the Blog App on your local machine for development and testing purposes.

### Prerequisites

Before you start, make sure you have the following requirements:

- Node.js (recommended version 18 or higher) [Node.js](https://nodejs.org/)

### Installation

To get your frontend environment set up, follow these steps:

1. Clone the repository (if not already done for the backend part):

    ```bash
    git clone git+ssh://git@github.com/ddzelal/blog-task.git
    ```

2. Navigate to the frontend project directory:

    ```bash
    cd frontend
    ```

3. Install the necessary packages using npm:

    ```bash
    npm install
    ```

## Technologies and Libraries

The project incorporates the following key technologies and libraries:

- **TypeScript**: Adds static typing to JavaScript, enhancing code quality and development experience.
- **Axios**: Utilized for promise-based HTTP requests, facilitating data fetching and interaction with APIs.
- **React Query**: Manages server state, data fetching, and caching, optimizing data synchronization and user experience.
- **Zustand**: A minimalistic state management solution, providing a simple and effective way to handle application state.
- **MUI (Material-UI)**: Used for designing a sleek and modern user interface with pre-built React components that follow Material Design principles.

## Functionalities

The Blog App frontend provides a range of functionalities that enhance user interaction and data management:

- **Login/Register**: Users can create a new account or log into an existing one, facilitating personalized experiences.
- **Get Blog by ID**: Fetches and displays details of a blog post based on its ID, providing specific blog content to the user.
- **Get Blogs**: Retrieves a list of all blog posts, allowing users to browse through the blog content.
- **Pagination**: Implements pagination to manage the display of blog posts, enabling users to navigate through large sets of data efficiently.
- **Sort**: Offers sorting capabilities to arrange blog posts according to specified criteria, such as date or popularity.
- **Update/Delete**: Allows authorized users to modify or remove their blog posts, giving them control over the content they share.

**Note:** Ensure that the backend part of the application is set up and running before starting the frontend. Follow the documentation provided for the backend setup and ensure the backend server is operational to allow proper communication between the frontend and backend.

## Starting the Application


To start the frontend application in development mode with hot reloading, run the following command:

```bash
npm run dev


