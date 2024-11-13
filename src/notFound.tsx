import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">404</h1>
      <p className="text-xl">Page Not Found</p>
      <Link to="/" className="mt-4 text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
