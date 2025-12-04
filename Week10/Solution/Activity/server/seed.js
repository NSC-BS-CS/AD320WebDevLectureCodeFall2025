//Seed generated from chatGPT
import sequelize from "./db.js";
import Animal from "./models/Animal.js";
const seedData = [
  {
    id: 1,
    name: "Willow",
    species: "Cat",
    age: 3,
    location: "Seattle, WA",
    img: "https://images.unsplash.com/photo-1575403071235-5dcd06cbf169?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A calm indoor cat who loves curling up by the window on rainy days and watching birds.",
  },
  {
    id: 2,
    name: "Sandy",
    species: "Dog",
    age: 5,
    location: "Miami, FL",
    img: "https://images.unsplash.com/photo-1561799461-445437ea576b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Energetic beach-loving pup who enjoys long walks on the sand and chasing waves.",
  },
  {
    id: 3,
    name: "Aurora",
    species: "Dog",
    age: 2,
    location: "Los Angeles, CA",
    img: "https://plus.unsplash.com/premium_photo-1682377521753-58d1fd9fa5ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A well trained shepherd mix who loves playtime, learning new tricks, and hanging out with people.",
  },
  {
    id: 4,
    name: "Summit",
    species: "Dog",
    age: 4,
    location: "Denver, CO",
    img: "https://plus.unsplash.com/premium_photo-1668351277191-9df852eb657f?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "An adventurous husky who is happiest out on the trail, then napping in a warm spot afterward.",
  },
  {
    id: 5,
    name: "Pixel",
    species: "Cat",
    age: 1,
    location: "New York, NY",
    img: "https://images.unsplash.com/photo-1546017959-787be59bdcbb?q=80&w=1848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A curious city cat who loves exploring shelves, people watching from high places, and chasing laser pointers.",
  },
  {
    id: 6,
    name: "Cinder",
    species: "Cat",
    age: 6,
    location: "Phoenix, AZ",
    img: "https://images.unsplash.com/photo-1527736848781-72dc3b2ee00f?q=80&w=2017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A relaxed desert dweller who prefers cool tile floors, sunbeams, and quiet afternoons.",
  },
  {
    id: 7,
    name: "Ripple",
    species: "Dog",
    age: 3,
    location: "Lake Tahoe, CA",
    img: "https://images.unsplash.com/photo-1542894012-9737b8b72f8c?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A friendly retriever who loves swimming, fetch by the water, and long naps after big adventures.",
  },
  {
    id: 8,
    name: "Blizzard",
    species: "Dog",
    age: 5,
    location: "Aspen, CO",
    img: "https://images.unsplash.com/photo-1550503736-c1a2c9033c03?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A snow loving pup who enjoys cold weather walks, fluffy beds, and watching the snowfall from inside.",
  },
  {
    id: 9,
    name: "Marble",
    species: "Cat",
    age: 8,
    location: "Boston, MA",
    img: "https://images.unsplash.com/photo-1542042238232-3a0b14425b71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A dignified senior cat who enjoys quiet windowsills, gentle brushes, and stable routines.",
  },
  {
    id: 10,
    name: "Lani",
    species: "Dog",
    age: 2,
    location: "Honolulu, HI",
    img: "https://images.unsplash.com/photo-1520483601560-389dff434fdf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "A playful island pup who loves ocean breezes, gentle walks, and hanging out with people on the porch.",
  },
];
const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // clears and rebuilds tables
    console.log("Database synced.");

    await Animal.bulkCreate(seedData);
    console.log("Seeded animals!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
};

seed();
