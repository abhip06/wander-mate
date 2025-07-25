
import RegistrationForm from "./components/Registration";
import ProfileCard from "./components/ProfileCard";

const mockUser = {
  name: "Cat Lee",
  location: "Pune, India",
  email: "cat@gmail.com",
  phoneNumber: "+91-9876543210",
  gender: "Female",
  dateOfBirth: "2000-01-01",
  interests: ["Traveling", "Hiking", "Photography"],
  avatar: "https://randomuser.me/api/portraits/women/90.jpg",
};


function App() {

  return (
    <>
      <div >
      <RegistrationForm />
     {/* <ProfileCard user={mockUser} /> */}
    </div>
    </>
  )
}

export default App
