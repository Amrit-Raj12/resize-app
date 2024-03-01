import React, { useState } from "react"

// Window2Component allows adding user data
const Window2Component = ({ addedCount, setAddedCount, addUser }) => {
  // State to manage user input data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  })

  // Function to handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Call the addUser function with the user data
    addUser(userData)
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Add User Data</h2>
      {/* Form for adding user data */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-md shadow-md p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-600 font-semibold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 font-semibold mb-2"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-600 font-semibold mb-2"
          >
            Mobile:
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={userData.mobile}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-600 font-semibold mb-2"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>
        {/* Button to submit the form */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Add
        </button>
        {/* Display added count */}
        <span className="ml-4">Add Count: {addedCount}</span>
      </form>
    </div>
  )
}

export default Window2Component
