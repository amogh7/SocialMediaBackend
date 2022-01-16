<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Social Media app server</h3>
  <p align="center">
A Simple Social Media  application made using MERN (MongoDB Express) stack along with JWT based login support.
    <br />
    <br />
    <br />
     <a href="https://yocket-social-media-server.herokuapp.com/">Hosted on Heroku</a>
    ·
    <a href="https://github.com/amogh7/SocialMediaBackend/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/amogh7/SocialMediaBackend/issues/new">Request Feature</a>
  </p>
</p>
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
This is a simple project to make a backend for a social Media by building a schemas using Mongos db and various Rest Api to add features like Authentication using Jwt , create a post ,commenting on a post etc.

Major Features of this application:
* Registration / Login functionality with JWT based authentication
* MongoDB Schema using Mongoose library 
* Social media features like creating a post , Like feature , commenting on a post etc
  
### Built With

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Creata a free cluster on MongoDB Atlas and get the connection URI
2. Clone the repo
   ```sh
   git clone https://github.com/amogh7/SocialMediaBackend.git
   ```
3. Install NPM packages
   ```sh
   npm install 
   ```
4. Create a `.env` file with the following
    ```
    MONGODB_URI=***GET_FROM_MONGO_DB_ATLAS****
    JWT_SECRET=***ChangeThis***
    ```
6. Start the server
   ```sh
   npm start
   Open http://localhost:5000/ for end point of server
   ```
   
   
<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request






<!-- CONTACT -->
## Contact

Amogh Sachdeva- - amoghSachdeva3@gmail.com

Project Link: [https://github.com/amogh7/SocialMediaBackend](https://github.com/amogh7/SocialMediaBackend)
