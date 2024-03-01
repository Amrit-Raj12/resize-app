import React, { useEffect, useState } from "react"
import { Resizable } from "re-resizable"
import Window1Component from "./Window1Compoent"
import Window2Component from "./Window2Component "
import Window3Component from "./Window3Component"
import { BASE_API_URL } from "./ApiConstant"

const MainWindow = () => {
  // State variables for managing window sizes
  const [window1Width, setWindow1Width] = useState("25%")
  const [window2Width, setWindow2Width] = useState("75%")
  const [window3Height, setWindow3Height] = useState("200px")

  // State variables for API data
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [errorMessage, setErrorMessage] = useState({
    message: "",
  })
  const [addedCount, setAddedCount] = useState(0)
  const [updatedCount, setUpdatedCount] = useState(0)

  // Function to handle resizing of Window 1
  const handleResize1 = (e, direction, ref, d) => {
    setWindow1Width(`calc(${window1Width} + ${d.width}px)`)
    setWindow2Width(`calc(${window2Width} - ${d.width}px)`)
  }

  // Function to handle resizing of Window 2
  const handleResize2 = (e, direction, ref, d) => {
    setWindow1Width(`calc(${window1Width} - ${d.width}px)`)
    setWindow2Width(`calc(${window2Width} + ${d.width}px)`)
  }

  // Function to handle resizing of Window 3
  const handleResize3 = (e, direction, ref, d) => {
    setWindow3Height(`calc(${window3Height} + ${d.height}px)`)
  }

  // Function to fetch user data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/get-user`)
      if (response.status === 404) {
        setErrorMessage({ message: "No User Found!" })
      } else if (response.status === 200) {
        const jsonData = await response.json()
        setAddedCount(jsonData[0].add_count)
        setUpdatedCount(jsonData[0].update_count)
        setData(jsonData)
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  // Effect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData()

    // Clean-up function to cancel any ongoing requests
    return () => {
      // Add clean-up logic if needed
    }
  }, [])

  // Function to add a new user
  const addUser = async (userData) => {
    try {
      const response = await fetch(`${BASE_API_URL}/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (response.status === 201) {
        console.log("User added successfully")
        setAddedCount(addedCount + 1)
        fetchData()
      } else {
        // Handle other response statuses if needed
      }
    } catch (error) {
      console.error("Error adding user:", error)
    }
  }

  // Function to update user data
  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await fetch(`${BASE_API_URL}/update-user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      })

      if (response.status === 200) {
        console.log("User updated successfully")
        fetchData()
      }
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  // Props for Window 1 component
  const Window1Props = {
    data,
    error,
    loading,
    errorMessage,
  }

  // Props for Window 3 component
  const Window3Props = {
    data,
    error,
    loading,
    errorMessage,
    updatedCount,
    updateUser,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", flex: "1" }}>
        {/* Resizable Window 1 */}
        <Resizable
          style={{
            backgroundColor: "#f0f0f0",
            borderRight: "1px solid #ccc",
            marginRight: "8px",
          }}
          size={{ width: window1Width, height: "100%" }}
          onResize={handleResize1}
        >
          {/* Window 1 - Add user data */}
          <Window1Component {...Window1Props} />
        </Resizable>
        {/* Resizable Window 2 */}
        <Resizable
          style={{
            backgroundColor: "#e0e0e0",
            borderRight: "1px solid #ccc",
            marginRight: "8px",
          }}
          size={{ width: window2Width, height: "100%" }}
          onResize={handleResize2}
        >
          {/* Window 2 - Edit user data */}
          <Window2Component
            addedCount={addedCount}
            setAddedCount={setAddedCount}
            addUser={addUser}
          />
        </Resizable>
      </div>
      {/* Resizable Window 3 */}
      <Resizable
        style={{ backgroundColor: "#d0d0d0", marginTop: "8px" }}
        size={{ height: window3Height }}
        onResize={handleResize3}
        minHeight={100}
        maxHeight="70%"
      >
        {/* Window 3 - Show user data in table */}
        <Window3Component {...Window3Props} />
      </Resizable>
    </div>
  )
}

export default MainWindow
