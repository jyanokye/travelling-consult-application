import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import {db} from "./firebase-config";

function generateUsers() {
  const users = [];
  const roles = ["customer", "admin"];
  const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Chris", "Jessica", "Daniel", "Ashley"];
  const lastNames = ["Doe", "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez"];

  for (let i = 1; i <= 50; i++) {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}${i}@example.com`;


    users.push({
      userId: `user${i}`,  // Auto-generated or UUID could be used
      firstName: randomFirstName,
      lastName: randomLastName,
      email: email,
      role: roles[Math.floor(Math.random() * roles.length)],
      phoneNumber: Math.random() > 0.5 ? `+233${Math.floor(Math.random() * 1000000000)}` : null,  // Optional
      dateOfBirth: Timestamp.fromDate(new Date(1980 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))),  // Random date of birth
      createdAt: Timestamp.now(),  // Current timestamp
      bookings: [],  // Empty for now, will populate with bookings later
      profileImage: null,  // Optional, can leave as null for now
      isVerified: Math.random() > 0.5,  // Randomly assign true or false
    });
  }
  return users;
}

function generateTours() {
  const tours = [];
  const tourNames = ["Cape Coast Castle Tour", "Kakum National Park Tour", "Mole National Park Tour", "Wli Waterfalls Tour", "Kintampo Waterfalls Tour", "Ada Foah Tour", "Keta Lagoon Tour", "Boti Falls Tour", "Shai Hills Reserve Tour", "Kwame Nkrumah Mausoleum Tour"];
  const tourDescriptions = [
    "Visit the Cape Coast Castle, a UNESCO World Heritage Site, and learn about the history of the transatlantic slave trade.",
    "Experience the Kakum National Park canopy walkway, a 350m long and 40m high bridge walkway.",
    "Explore the Mole National Park, the largest wildlife park in Ghana, and see elephants, antelopes, and more.",
    "Hike to the Wli Waterfalls, the highest waterfall in Ghana, and swim in the cool waters at the base.",
    "Discover the Kintampo Waterfalls, a beautiful cascade surrounded by lush greenery and natural pools.",
    "Relax on the beaches of Ada Foah, a popular destination for water sports and relaxation.",
    "Take a boat ride on the Keta Lagoon and see the diverse bird species and fishing villages.",
    "Visit the Boti Falls, a twin waterfall with a peaceful atmosphere and a nearby umbrella rock.",
    "Explore the Shai Hills Reserve, a wildlife park with caves, baboons, and antelopes.",
    "Learn about the life and legacy of Kwame Nkrumah, Ghana's first president, at his mausoleum."
  ];
  const tourPrices = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550];
  const tourLocations = ["Cape Coast", "Cape Coast", "Damongo", "Hohoe", "Kintampo", "Ada Foah", "Keta", "Boti", "Shai Hills", "Accra"];

  for (let i = 1; i <= 10; i++) {
    tours.push({
      tourId: `tour${i}`,  // Auto-generated or UUID could be used
      tourName: tourNames[i - 1],
      description: tourDescriptions[i - 1],
      price: tourPrices[i - 1],
      location: tourLocations[i - 1],
      createdAt: Timestamp.now(),  // Current timestamp
      dateOfDeparture: Timestamp.fromDate(new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))),  // Random date of departure in 2022
      dateofArrival: Timestamp.fromDate(new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))),  // Random date of arrival in 2022
      bookings: [],  // Empty for now, will populate with bookings later
    });
  }
  return tours;
}

export const seedTours = async () => {
  const tours = generateTours();
  console.log(tours);
  for (let i = 0; i < tours.length; i++) {
    try {
      const docRef = await addDoc(collection(db, "tours"), tours[i]);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding tour: ", e);
    }
  }
}

export const seedUsers = async () => {
  const users = generateUsers();
  for (const user of users) {
    try {
       const docRef = await addDoc(collection(db, "users"), user);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding user: ", e);
    }
  }
}

export const getUsers = async () => {
  try {
    const usersCollection = collection(db, "users"); // Reference the 'users' collection
    const usersSnapshot = await getDocs(usersCollection); // Fetch all documents in 'users'

    // Map through the documents to get the user data
    const usersList = usersSnapshot.docs.map((doc) => doc.data());

    return usersList; // Return the list of users
  } catch (error) {
    console.error('Error getting users:', error.message); // Log any errors
  }
};

export const getTours = async () =>{
  try{
    const toursCollection = collection(db, 'tours');
    const toursSnapshot = await getDocs(toursCollection);

    const toursList = toursSnapshot.docs.map(doc => doc.data());
    return toursList;
  }catch(error){
    console.log('Error getting tours: ', error);
  }
}
function generateBookings(users, tours) {
  const bookings = [];
  for (let i = 1; i <= 45; i++) {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomTourIndex = Math.floor(Math.random() * tours.length);
    const numberOfPeople = Math.floor(Math.random() * 5) + 1;
    const totalPrice = tours[randomTourIndex].price * numberOfPeople;

    bookings.push({
      bookingId: `booking${i}`,
      userId: users[randomUserIndex].userId,
      tourId: tours[randomTourIndex].tourId,
      bookingDate: Timestamp.fromDate(new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))),
      numberOfPeople,
      totalPrice,
      paymentStatus: "paid",
      bookingStatus: "confirmed"
    });
  }
  return bookings;
}

export const seedBookings = async () => {
  const users = await getUsers();
  const tours = await getTours();
  const bookings = generateBookings(users, tours);
  for (const booking of bookings) {
    try {
      const docRef = await addDoc(collection(db, "bookings"), booking);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding booking: ", e);
    }
  }
}
