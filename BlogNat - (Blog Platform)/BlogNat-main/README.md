# 📝 BlogNat

**BlogNat** is a modern full-stack blogging platform that allows users to create, upload, and manage blog posts along with beautiful images.  
Built with a focus on simplicity, scalability, and real-world web practices.

---

## 🚀 Tech Stack

- **Frontend:** React.js
- **Backend:** Spring Boot (Java)
- **Database:** MongoDB (NoSQL)
- **Cloud Storage:** Cloudinary (for image uploads)

---

## ✨ Features

- ✍️ Create, edit, and delete blog posts
- 🖼️ Upload and display blog images (stored in Cloudinary)
- 🔍 View all blogs in a clean and responsive UI
- ⚡ Fast and scalable backend with REST APIs
- 📚 MongoDB database to store blog content and image URLs
- 🛡️ Basic error handling and validation
- 🎨 Beautiful, responsive frontend built with React

---




## 📦 Installation

### Backend (Spring Boot)

1. Clone the repository:
   ```bash
   git clone https://github.com/AJAYASWIN-M/BlogNat.git

2. Navigate to the backend folder:
   ```bash
    cd BlogNat/backend
   
3. Configure application.properties:
      - Set up your MongoDB URI
      - Set Cloudinary API credentials (key, secret, cloud name)
    
    
4. Run the application:
   ```bash
   ./mvnw spring-boot:run

---

### Frontend (React)

1. Navigate to the frontend folder:
   ```bash
   cd BlogNat/frontent

2. Install dependencies:
   ```bash
    npm install
   
3. Start the development server:
   ```bash
    npm start


---
### 🔧 Configuration
Make sure you set your environment variables correctly:
   - Backend (application.properties):
     ```
     spring.data.mongodb.uri=YOUR_MONGODB_URI
     cloudinary.cloud_name=YOUR_CLOUDINARY_CLOUD_NAME
     cloudinary.api_key=YOUR_CLOUDINARY_API_KEY
     cloudinary.api_secret=YOUR_CLOUDINARY_API_SECRET
     ```

---
## 🛠️ API Endpoints

| Method | Endpoint         | Description           |
| :----: | :--------------- | :-------------------- |
| POST   | `/api/blogs`      | Create a new blog post |
| GET    | `/api/blogs`      | Get all blog posts     |
| GET    | `/api/blogs/{id}` | Get a single blog post |
| DELETE | `/api/blogs/{id}` | Delete a blog post     |

---

### 📚 Future Improvements

- ✨ Add authentication (JWT based login/signup)
- ✨ Improve SEO and social sharing
- ✨ Add categories/tags for blogs
- ✨ Deploy live to production (Render, Railway, Vercel, Netlify)

---



### 📸 Screenshots

### Landing Page:
   ![image](https://github.com/user-attachments/assets/5ee7b755-d5e3-4a24-b568-12e7c9e33546)

### Login Page:
   ![image](https://github.com/user-attachments/assets/fd433e44-ac1d-4eac-9be4-9a078bead38c)

### SignUp Page:
   ![image](https://github.com/user-attachments/assets/75926b37-a58a-4e9c-b080-5a6fe3ba2fe9)


### Dashboard Page:
![image](https://github.com/user-attachments/assets/81098149-da79-461f-93eb-90be4a0dbb36)


### Blog Post:
   ![image](https://github.com/user-attachments/assets/4cf56a79-4361-4135-96e3-2e51f45d469a)





