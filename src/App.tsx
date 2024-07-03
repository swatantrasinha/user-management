import HomePage from "./components/home-page/HomePage"

function App() {


  return (
    <div className="m-2">
      <h1 className="flex justify-center sm:text-red-500 text-green-950 font-extrabold my-8">Users Management</h1>
      
      <div className="users-data-container">
        <HomePage />
      </div>

    </div>
  )
}

export default App
