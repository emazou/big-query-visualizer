FROM python:3.8

WORKDIR /app

# Update the package index and install libpq-dev and netcat-openbsd
RUN apt-get update && \
    apt-get install -y libpq-dev netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create a virtual environment and add it to the PATH
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Copy the Google Cloud credentials and requirements.txt into the image
COPY vmtf-404516-37748537df37.json /app/vmtf-404516-37748537df37.json
COPY ./backend/requirements.txt /app/

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application into the image
COPY ./backend /app/

# Expose port 8000 for the application
EXPOSE 8000


# Set the default command to start the Django development server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
