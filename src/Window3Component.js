import React, { useEffect, useState } from "react"

// Window3Component displays user data in a table
const Window3Component = ({
  data,
  loading,
  error,
  errorMessage,
  updatedCount,
  updateUser,
}) => {
  // State variable for toggling edit mode
  const [edit, setEdit] = useState(false)
  // State variable for user data
  const [userData, setUserData] = useState({})

  // Effect to update user data when data changes
  useEffect(() => {
    setUserData({
      name: data ? data[0].name : null,
      email: data ? data[0].email : null,
      mobile: data ? data[0].mobile : null,
      address: data ? data[0].address : null,
    })
  }, [data])

  // Function to handle edit button click
  const onClickEdit = () => {
    setEdit(true)
  }

  // Function to handle update button click
  const onClickUpdate = () => {
    updateUser(data[0]._id, userData)
    setEdit(false)
  }

  // Function to handle changes in form fields
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  // If loading, display loading message
  if (loading) return <div>Loading...</div>
  // If error, display error message
  if (error) return <div>Error: {errorMessage.message}</div>

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">User Data Table</h2>
      {/* If no data, display error message */}
      {!data ? (
        <div>{errorMessage?.message}</div>
      ) : (
        // Display user data table
        <table className="border border-gray-300 rounded w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Mobile</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Display user data and input fields for editing */}
              <td className="py-2 px-4">
                {edit ? (
                  <input
                    type="text"
                    className="p-2 rounded"
                    placeholder="Enter Name"
                    name="name"
                    onChange={handleChange}
                    defaultValue={data[0].name}
                  />
                ) : (
                  <p>{data[0].name}</p>
                )}
              </td>
              <td className="py-2 px-4">
                {edit ? (
                  <input
                    type="email"
                    className="p-2 rounded"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email"
                    defaultValue={data[0].email}
                  />
                ) : (
                  <p>{data[0].email}</p>
                )}
              </td>
              <td className="py-2 px-4">
                {edit ? (
                  <input
                    type="text"
                    className="p-2 rounded"
                    name="mobile"
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    defaultValue={data[0].mobile}
                  />
                ) : (
                  <p>{data[0].mobile}</p>
                )}
              </td>
              <td className="py-2 px-4">
                {edit ? (
                  <input
                    type="text"
                    className="p-2 rounded"
                    name="address"
                    onChange={handleChange}
                    placeholder="Enter Address"
                    defaultValue={data[0].address}
                  />
                ) : (
                  <p>{data[0].address}</p>
                )}
              </td>
              {/* Display edit and update buttons */}
              <td className="py-2 px-4">
                {!edit ? (
                  <>
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                      onClick={onClickEdit}
                    >
                      Edit
                    </button>
                    <span className="ml-2">Update Count : {updatedCount}</span>
                  </>
                ) : (
                  <div className="flex items-center">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                      onClick={onClickUpdate}
                    >
                      Update
                    </button>
                    <button
                      className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => setEdit(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Window3Component
