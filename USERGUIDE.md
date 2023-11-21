## PART2-TEST Application Description

PART2-TEST is a comprehensive full-stack application that combines the power of a Next.js frontend with a Django REST Framework backend. This application is uniquely designed to perform bigquery queries through an intuitive graphical interface, eliminating the need for direct SQL input. 

### Key Features

- **Query Saving**: Users can effortlessly save their queries for future reference, enhancing usability and efficiency.
- **View All Saved Queries**: The platform allows users to view all queries saved by any user, fostering a collaborative environment.
- **Commenting on Queries**: Users have the ability to comment on queries, enabling a dynamic exchange of ideas and insights.
- **Delete Own Comments**: Each user has the control to delete their own comments, ensuring a manageable and relevant discussion.
- **Manage Saved Queries**: Users can easily manage (edit/delete) their saved queries, providing a personalized experience.
- **Authentication Module**: The application includes a robust authentication module, which is essential for performing any action within the app. This feature ensures secure access and operation.


## Multi-Container Docker Application Demo
In this section, we will provide a demonstration of our application running within multiple Docker containers. The demonstration offers a detailed insight into how the application functions and is deployed using multiple Docker containers to achieve a highly scalable and modular environment.

Click the following link to watch the demo video:
[Watch the Docker demo](https://www.loom.com/share/f10232b7c64e4674960f3fc0fe14ee88?sid=3fb2d5fd-fb9e-47f0-92b9-b288272fb9bc)

In this demo, you will see how each component of our application is packaged into separate Docker containers, making it easier to manage and scale our infrastructure. We hope you enjoy the demonstration!

Please note that at the end of this video, there is another explanatory video available in English.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Python 3.8 and pip (Python package installer).
- Node.js >=18 and npm/Yarn for managing frontend dependencies.
- A virtual environment manager for Python (like `venv` or `virtualenv`).

### Installation

## Backend Setup

1. Clone the repository:

```bash
git clone git@github.com:emazou/part2-test.git
cd part2-test/backend
```

## set up a Python virtual environment

```
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

## Install the required Python packages

```
pip install -r requirements.txt
```

## Set up the Django development environment

Make sure you create a .env file with all the necessary environment variables as per .env.example. Then run the migrations and start the development server

```
python manage.py migrate
python manage.py runserver
```

## Frontend Setup

### Navigate to the frontend directory
```
cd part2-test/frontend
```

### Install the required node modules

```
npm install
```

### Start the Next.js development server

```
npm run dev
```

### Accessing the Application
Open your web browser and visit:

Frontend: http://localhost:9000
Backend: http://localhost:8000

### Database Setup

SQLite will be used as the database for development purposes due to its simplicity and ease of setup. Django comes with built-in support for SQLite.

1. Configure the `DATABASES` setting in `settings.py` to use SQLite:

```python
# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```
### Apply database migrations to set up your database schema

```
python manage.py migrate
```

## Docker Setup

To facilitate development and deployment, `PART2-TEST` utilizes Docker. Follow these steps to set up and run the application using `docker-compose`.

To achieve this, please remember to configure your database with PostgreSQL as we will be in production.

To achieve this, please remember to configure your database with PostgreSQL as we will be in production.

```python
# settings.py

DATABASES = {
    'default': {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': name,
    'USER': user,
    'PASSWORD': password,
    'HOST': host,
    'PORT': yourport,
  }
}
```

#### Building Docker Images

1. **Build Images**:
   - Make sure you are in the root of the project.
   - Run the following command to build Docker images for both frontend and 
   backend:
     ```bash
     docker-compose -f docker-compose.dev.yml build
     ```

#### Starting Containers

2. **Run Containers**:
   - Once the images are built, you can start the containers with:
     ```bash
     docker-compose -f docker-compose.dev.yml up

     or

     docker-compose up
     ```

#### Accessing Services

3. **Accessing the Application**:
   - With the containers running, you can access the services at the same URLs mentioned before:
     - Frontend: http://localhost:9000
     - Backend: http://localhost:8000

### Additional Resources

For a better understanding of the development and setup process, you can watch a tutorial video. This video provides a detailed, step-by-step explanation of how to configure and run `PART2-TEST` using Docker.

- **Watch the Tutorial Video**: [Click here to watch the video](https://youtu.be/BFk1xKupLZs)

