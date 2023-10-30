# Goalify - a new way to track your goals 💃🕺
🎊 New year brings with it fresh energy and a brand new set of resolutions. However it is only near the end of the year that we remember those pending resolutions 😢

Do you want to give those pending goals a last shot and bring them to completion before the year ends? Try goalify 😎

## 👨‍💻 Introduction
Most of us are very lazy in bringing things to completion when we are not accountable for something. Now imagine if you see a ticking bomb next to your preset goals, as the timer goes off, so does your goals for the world to see how you performed. Sounds exciting right? 

### 🔮 Vision
- - -
The vision of goalify is for people to develop a feeling of urgency that helps them achieve their goals faster. 

### ⚒ Working
- - -
The objective is pretty straightforward. 
1. You set your goals that you want to achieve. 

2. You have until the end of the year to work on them in stealth. 

3. As the year ends, everyone else will be able to see what all goals you were able to achieve. 

## 💻 Technical Overview
It is a React.js app styled using TailwindCSS. Combining the speed of client side rendering with the security of data abstraction using a custom built express app in the backend, goalify checks in all the boxes for a simple yet efficient fullstack web app.

**Frontend Library** - React.js 

**Styling framework** - TailwindCSS

**Component Library** - MaterialUI

**Backend** - Express.js App

**Database** - MongoDB along with mongoose as the ODM

## 🔑 Key Features
- For unauthenticated users
    1. Access publically listed goals of register users using their username.

- For authenticated users
    1. A dashboard to Create, View, Update and Delete goals.
    2. Have a unique link which can be shared to access their publically available goals in a read-only mode.

## 🕵️‍♀️ Boring Details
If you made it till here, you might have noticed some odd things about the app. They are not bugs but added intentionally to serve as some easter eggs. 

Looking for how to signup? notice the blinking pattern. Some texts are more than what meets the eyes.

## 🤝 Contribution guidelines
If you come across some feature which can be added to improve the overall working of the application, feel free to open an issue ticket for the same.

## 👨‍🏭 Installation
1. Fork the repository using your github account.

2. Clone the repository locally into your system and then navigate to the folder where you have cloned it. 

3. Install the dependencies
    ```shell
    npm install
    ```

4. Run the application
    ```shell
    npm run start
    ``` 
    
<br />

> _**Note:** while the frontend application will start working fine by following the above steps, In order to fetch goals, you need to provide a link to the hosted backend server in the `.env` file._  

> _As of now the backend server is not publically available and hence you won't be able to add it_