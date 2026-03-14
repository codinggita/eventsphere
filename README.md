🌍 EventSphere 

EventSphere is a full stack event discovery and networking platform that helps users discover, manage, and participate in global events such as workshops, hackathons, and conferences.

The platform not only allows users to create and register for events, but also provides intelligent event recommendations, networking opportunities, and advanced event discovery features.

Built using React, Tailwind CSS, Node.js, Express.js, and MongoDB, EventSphere delivers a modern and scalable solution for event management.

🚀 Features
🔐 Authentication System

User Signup and Login

Password validation

Protected routes for authenticated users

Authentication state stored using LocalStorage

📅 Event Management (CRUD)

Organizers can:

Create events

View events

Update event details

Delete events

All operations interact with Node.js APIs and MongoDB database.

🔍 Smart Event Discovery

Users can easily find events using:

Search functionality

Category filtering

Location filtering

Sorting by newest or trending events

📊 Personalized Dashboard

Each user gets a dashboard showing:

Registered events

Recommended events

Saved/bookmarked events

Upcoming events

🌐 Attendee Networking

Participants can view other attendees of an event and connect with people who share similar interests or skills.

⭐ Event Bookmarking

Users can save events for later viewing.

Example:

Saved Events
• AI Hackathon
• React Bootcamp
• Startup Summit
🔥 Trending Events

The platform highlights popular events based on:

Number of registrations

User activity

⏳ Event Countdown Timer

Each event page displays a live countdown timer until the event begins.

🌙 Dark Mode / Light Mode

Users can toggle between dark and light themes, and the preference is stored locally.

🔎 Search Optimization (Debouncing)

Debouncing is implemented in the search bar to reduce unnecessary API calls and improve performance.

📄 Pagination

Pagination is used to efficiently display large event datasets.

Example:

Page 1 | Page 2 | Page 3
📱 Responsive UI

The application is fully responsive using Tailwind CSS and works across:

Desktop

Tablet

Mobile devices

🛠 Tech Stack
Frontend

ReactJS

Tailwind CSS

React Router

Context API

Axios

Backend

Node.js

Express.js

Database

MongoDB

Mongoose
📂 Project Structure
EventSphere-Global
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── hooks
│   │   └── utils
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
│
└── README.md

📜 License

This project is developed for the Full Stack Hackathon Event and is intended for educational and demonstration purposes.

👩‍💻 Author
Priya Sangwan

Full Stack Developer | React | Node.js | MongoDB

- GitHub: https://github.com/priyasangwan23
- LinkedIn: https://www.linkedin.com/in/priya-sangwan-a38037395/
