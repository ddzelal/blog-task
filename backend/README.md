# Blog app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

-   You have installed the 18^ version of [Node.js and npm](https://nodejs.org/).

### Installation

Follow these steps to get your development environment running:

1. Clone the repository to your local machine:

    ```bash
    git clone git+ssh://git@github.com/ddzelal/blog-task.git
    ```

2. Navigate to the project directory:

    ```bash
    cd backend
    ```

3. Install the necessary packages:
    ```bash
    npm ci
    ```

### Compiling TypeScript to JavaScript

This project is written in TypeScript. To compile the TypeScript files to JavaScript, run the following command:

```bash
npm run build
```

## Starting the Application

To start the application, use the following command:

```bash
npm start
```

This will start the server, typically on port 9001, unless configured otherwise in your environment.

## Development Mode

To run the application in development mode with live reloading (ideal for development), use:

```bash
npm run dev
```

## Running Tests

To run the tests, use the following command:

```bash
NODE_ENV=test npm run test
```

## API Documentation

This section outlines the available routes and their functionalities.

### Status Route

-   **GET** `/status`: Returns the current status of the API.

### Blog Routes

-   **GET** `/blogs`: Fetch all blogs.
-   **GET** `/blogs/:id`: Fetch a single blog by ID.
-   **POST** `/blogs`: Create a new blog (Authentication required).
-   **PUT** `/blogs/:id`: Update an existing blog by ID (Authentication required).
-   **DELETE** `/blogs/:id`: Delete a blog by ID (Authentication required).

### Authentication Routes

-   **POST** `/login`: Login route for user authentication.
-   **POST** `/register`: Register a new user. This endpoint creates a new user account.
