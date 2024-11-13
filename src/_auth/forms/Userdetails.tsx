import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const colleges = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Kanpur",
  "IIT Madras",
  "BITS Pilani",
  "NIT Trichy",
  "NIT Warangal",
];

const UserDetails = () => {
  const [collegeName, setCollegeName] = useState("");
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate(); // Use the useNavigate hook

  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCollegeName(value);
    if (value) {
      setFilteredColleges(
        colleges.filter((college) =>
          college.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredColleges([]);
    }
  };

  const handleCollegeSelect = (college: string) => {
    setCollegeName(college);
    setSelectedCollege(college);
    setFilteredColleges([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ selectedCollege, degree, year, hobbies });
    setFormSubmitted(true);

    // After form submission, redirect to the home page
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      {/* Left Section - Form */}
      <div className="sm:w-420 flex-center flex-col lg:w-full p-8 lg:p-16">
        <img src="./assets/images/logo.svg" alt="logo" />
        <h1 className="h3-bold md:h2-bold pt-5 sm:pt-2">
          Complete Your Sign Up
        </h1>
        {!formSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-2/3 mt-2">
            {/* College Name Input with Autocomplete */}
            <div className="relative">
              <label className="shad-form_label">Student at</label>
              <Input
                value={collegeName}
                onChange={handleCollegeChange}
                placeholder="Type here..."
                className="shad-input"
                required
              />
              {filteredColleges.length > 0 && (
                <ul className="bg-dark-1 shadow-lg absolute w-full max-h-40 overflow-auto mt-2 rounded-lg border-0 scrollbar-thin scrollbar-corner-dark-1 scrollbar-thumb-gray-800 scrollbar-track-transparent">
                  {filteredColleges.map((college) => (
                    <li
                      key={college}
                      onClick={() => handleCollegeSelect(college)}
                      className="cursor-pointer p-2 hover:bg-zinc-900">
                      {college}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Degree Input */}
            <div>
              <label className="shad-form_label">Degree/Stream</label>
              <Input
                value={degree}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setDegree(e.target.value)}
                placeholder="e.g., B.Sc, Commerce, Science..."
                className="shad-input"
                required
              />
            </div>

            {/* Year Input */}
            <div>
              <label className="shad-form_label">Year/Standard</label>
              <Input
                value={year}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setYear(e.target.value)}
                placeholder="e.g., 1st year, 2nd year, 11th, 12th..."
                className="shad-input"
                required
              />
            </div>

            {/* Hobbies Input */}
            <div>
              <label className="shad-form_label">Hobbies/Interests</label>
              <Input
                value={hobbies}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setHobbies(e.target.value)}
                placeholder="e.g., Cricket, Piano, Chess..."
                className="shad-input"
                required
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="shad-button_primary">
              Complete Sign Up
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link
                to="/sign-in"
                className="text-primary-500 text-small-semibold ml-1">
                Log in
              </Link>
            </p>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">Sign Up Complete!</h2>
            <p>Welcome to the app!</p>
          </div>
        )}
      </div>

      {/* Right Section - Side Image */}
      <div className="hidden lg:block lg:w-full">
        <img
          src="/assets/images/side-img.svg"
          alt="Side Image"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
};

export default UserDetails;
