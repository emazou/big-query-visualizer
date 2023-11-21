# PART2-TEST Development Guide

## Description

PART2-TEST is a full-stack application that features a Next.js frontend and a Django REST Framework backend. It is crafted to perform bigquery queries through a graphical interface without the need for direct SQL input.

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

#### Building Docker Images

1. **Build Images**:
   - Make sure you are in the root of the project.
   - Run the following command to build Docker images for both frontend and backend:
     ```bash
     docker-compose -f docker-compose.dev.yml build
     ```

#### Starting Containers

2. **Run Containers**:
   - Once the images are built, you can start the containers with:
     ```bash
     docker-compose -f docker-compose.dev.yml up
     ```

#### Accessing Services

3. **Accessing the Application**:
   - With the containers running, you can access the services at the same URLs mentioned before:
     - Frontend: http://localhost:9000
     - Backend: http://localhost:8000

### Additional Resources

For a better understanding of the development and setup process, you can watch a tutorial video. This video provides a detailed, step-by-step explanation of how to configure and run `PART2-TEST` using Docker.

- **Watch the Tutorial Video**: [Click here to watch the video](https://youtu.be/BFk1xKupLZs)

