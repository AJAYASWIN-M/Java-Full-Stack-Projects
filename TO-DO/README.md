# To-Do Web Application  


<p>A fully functional To-Do Web App built with modern web technologies, enabling users to efficiently manage tasks in real-time. The app integrates a React-based frontend, a Spring Boot backend, and a PostgreSQL database (NeonDB), all seamlessly connected and deployed on Netlify, Render, and NeonDB for a smooth and scalable experience.</p>

<br>

## Features  
- **User-friendly UI** with React  
- **Real-time updates** with PostgreSQL (NeonDB)  
- **Spring Boot Backend** with RESTful APIs  
- **Dockerized Deployment** for scalability  
- **Hosted on Netlify, Render, and NeonDB**  

  
## Tech Stack  
- Frontend:- React (**Hosted on Netlify**)  
- Backend :- Spring Boot (Packaged with **Maven**, containerized with **Docker**, and deployed on **Render**)  
- Database :- PostgreSQL (**Hosted on NeonDB**)  

<br>

## Setup Instructions  
#### Clone the Repository  
```sh
git clone https://github.com/your-github-username/todo-web-app.git
cd todo-web-app
```
<br>

## Backend Setup & Deployment  

#### 1. Create a Database in NeonDB
- Sign up at [NeonDB](https://neon.tech/) and create a **PostgreSQL database**.  
- Copy the **database URL, username, and password** for later use.
  
<br>

#### 2. Configure `application.properties`  
- In `backend/src/main/resources/application.properties`, update:  
```ini
spring.datasource.url=jdbc:postgresql://your-neondb-url
spring.datasource.username=your-db-username
spring.datasource.password=your-db-password

# To allow CORS for frontend
app.frontend.url=https://your-netlify-frontend-url
```
<br>

#### 3. Create a Dockerfile
- Inside the backend folder, create a Dockerfile:
```dockerfile
FROM openjdk:17
WORKDIR /app
COPY target/todo-app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```
<br>

#### 4. Build & Package the Backend
```sh
cd backend
mvn clean package
```
- This generates a .jar file inside the target/ folder.
<br>

#### 5. Create & Upload Docker Image to DockerHub
```
docker build -t your-dockerhub-username/todo-backend .
docker push your-dockerhub-username/todo-backend
```
<br>

#### 6. Deploy on Render
- Go to Render and create a new web service.
- Select Deploy from DockerHub and use your uploaded Docker image.
- Expose port 8080.
---

<br>


## Frontend Setup & Deployment
#### 1. Configure .env with Render API URL
- Inside the frontend folder, create/update .env:

```ini
REACT_APP_API_URL=https://your-render-backend-url
```
#### 2.  Install Dependencies
```sh
cd frontend
npm install
```
#### 3. Build the Frontend
```sh
npm run build
```
- This creates a build/ folder.

#### 4.  Deploy on Netlify
- Go to Netlify and upload the build/ folder.
- After deployment, update app.frontend.url in application.properties with the Netlify URL.


---

#### [App Link](https://aquamarine-kitsune-60354e.netlify.app)

### Key Features:
- **Step-by-step deployment guide** for both backend & frontend.
- **Proper Dockerfile usage** and **DockerHub hosting steps** included.  
- **NeonDB database configuration** is well-explained.  
- **CORS setup** with `app.frontend.url` for cross-origin requests.  






