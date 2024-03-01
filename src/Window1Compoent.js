import React from "react"

const Window1Component = ({ data, error, errorMessage, loading }) => {
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {errorMessage?.message}</div>

  return (
    <div className="p-4">
      {!data ? (
        <div className="bg-white rounded-md shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          {errorMessage?.message}{" "}
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="mb-2">
            <strong className="text-gray-600">Name:</strong> {data?.[0].name}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Address:</strong>{" "}
            {data?.[0].address}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Mobile:</strong>{" "}
            {data?.[0].mobile}
          </div>
          <div>
            <strong className="text-gray-600">Email:</strong> {data?.[0].email}
          </div>
        </div>
      )}
    </div>
  )
}

export default Window1Component
