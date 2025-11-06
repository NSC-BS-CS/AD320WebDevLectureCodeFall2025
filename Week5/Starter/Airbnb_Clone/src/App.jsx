import { HeaderBanner } from "./components/HeaderBanner.jsx";
import BookingForm from "./components/BookingForm.jsx";
import Rentals from "./components/Rentals.jsx";
import "./App.css";
import { rentals } from "./data/data.js";
//Render Rentals
//Toggle Form
//Search

function App() {
  return (
    <div className="App">
      <HeaderBanner />
      <input type="text" placeholder="Search..." />
      <div>
        <button>Add Booking</button>
        <button>Bookings</button>
      </div>
    </div>
  );
}

export default App;
