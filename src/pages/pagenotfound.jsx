import React from "react"
import { Link } from "react-router-dom"

export default function PageNotFound(){

return (
<>
<div>
<div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 px-6 py-3 border rounded-lg transition">
        Go Back Home
      </Link>
    </div>
</div>
</>
)
};

