import shoppers from "../assets/projectsImgs/shoppers.png"
import readers from "../assets/projectsImgs/readers.png"
import foodRecipe from "../assets/projectsImgs/foodRecipe.png"
import expense from "../assets/projectsImgs/expense.png"
import weather from "../assets/projectsImgs/weather.png"

export const ABOUT_TEXT = `Hi Everyone, I'm Aniket Sharma from Delhi, India. Graduating with a Bachelor's degree in computer applications, I've honed my skills in React, Node.js, Express, MongoDB, and MySQL. Continuously learning and driven by a passion for crafting efficient and user-friendly web applications, I am actively seeking opportunities to contribute and grow in an environment that fosters learning and collaboration.






`;

export const PROJECTS = [
  {
    title: "Shoppers",
    description: "Developed an ecommerce store with categories and filters for product browsing, integrated Razorpay for payments, and an admin panel for management. Frontend - React, Backend - Nodejs, Database - MongoDB",
    thumbnail: shoppers,
    githubLink: "https://github.com/aniket-sharma10/e-commerce-store",
    demoLink: "https://shoppers-aniket.vercel.app/",
  },
  {
    title: "Readers",
    description: "Created a blog application for reading blogs, with CRUD operations restricted to the admin. Includes a light/dark mode option. Built with the MERN stack and Tailwind CSS. Frontend - React, Backend - Nodejs, Database - MongoDB",
    thumbnail: readers,
    githubLink: "https://github.com/aniket-sharma10/Readers-blog",
    demoLink: "https://readers-aniket.vercel.app/",
  },
  {
    title: "Food Recipe",
    description: "Built an application providing recipes for various food dishes sourced from an external API. Users can search for and view detailed recipes, and add dishes to their favorites. Frontend - React",
    thumbnail: foodRecipe,
    githubLink: "https://github.com/aniket-sharma10/food-recipe",
    demoLink: "",
  },
  {
    title: "Expense tracker",
    description: "Developed an Expense Tracker App for monitoring income and expenses, featuring interactive data visualization with ApexCharts. Utilized Chakra-UI for a responsive and intuitive user interface. Frontend - React, UI - Chakra-UI, Data Visualization - ApexCharts.",
    thumbnail: expense,
    githubLink: "https://github.com/aniket-sharma10/expense-tracker",
    demoLink: "",
  },
  {
    title: "Weather App",
    description: "Developed a minimalistic Weather App using HTML, CSS, and JavaScript, providing users with current weather information based on location or user input. Designed for ease of use and quick access to weather updates.",
    thumbnail: weather,
    githubLink: "https://github.com/aniket-sharma10/weather-app",
    demoLink: "",
  },
  
  
];