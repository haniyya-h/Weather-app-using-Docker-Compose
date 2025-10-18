# Use nginx alpine as the base image (lightweight and efficient for static files)
FROM nginx:alpine

# Copy the HTML, CSS, and JavaScript files to nginx html directory
COPY . /usr/share/nginx/html/

# Expose port 80 (nginx default port)
EXPOSE 80

# nginx will start automatically when the container runs
# No need to specify CMD as nginx:alpine has a default command