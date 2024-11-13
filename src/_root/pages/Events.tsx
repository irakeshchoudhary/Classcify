import { useState } from "react";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Events = () => {
  // Mock events data and pagination
  const allEvents = [
    {
      title: "Event 1",
      image:
        "https://images.unsplash.com/photo-1559930198-26e8d7f0a4f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-01",
      day: "Monday",
      time: "10:00 AM",
      location: "New York, USA",
      isFree: true,
      organizer: "John Doe",
      description: "Description of Event 1",
    },
    {
      title: "Event 2",
      image:
        "https://images.unsplash.com/photo-1565099011766-1aa5ccfac7c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    {
      title: "Event 3",
      image:
        "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    {
      title: "Event 4",
      image:
        "https://plus.unsplash.com/premium_photo-1683749808307-e5597ac69f1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    {
      title: "Event 5",
      image:
        "https://plus.unsplash.com/premium_photo-1683749810514-860f96ad0735?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    {
      title: "Event 6",
      image:
        "https://plus.unsplash.com/premium_photo-1683749808662-1c2890de2dcc?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    {
      title: "Event 7",
      image:
        "https://plus.unsplash.com/premium_photo-1713836956500-74bf8db9c659?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    {
      title: "Event 8",
      image:
        "https://plus.unsplash.com/premium_photo-1682765673139-40958c79e647?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    {
      title: "Event 9",
      image:
        "https://plus.unsplash.com/premium_photo-1683121718643-fb18d2668d53?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    {
      title: "Event 10",
      image:
        "https://plus.unsplash.com/premium_photo-1661765169155-a1861f0efb57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    {
      title: "Event 11",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "2024-12-05",
      day: "Friday",
      time: "2:00 PM",
      location: "London, UK",
      isFree: false,
      organizer: "Jane Smith",
      description: "Description of Event 2",
    },
    // Additional events data ...
  ];

  const [visibleEvents, setVisibleEvents] = useState(6);
  const [hasMoreEvents, setHasMoreEvents] = useState(true);

  const loadMoreEvents = () => {
    if (visibleEvents + 6 < allEvents.length) {
      setVisibleEvents(visibleEvents + 6);
    } else {
      setVisibleEvents(allEvents.length);
      setHasMoreEvents(false);
    }
  };

  const scrollToSection = () => {
    const targetSection = document.getElementById("category-section");
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const FloatingButton = () => {
    const [hovered, setHovered] = useState(false);

    return (
      <>
        <div className="flex flex-col items-center overflow-y-auto custom-scrollbar">
          <section className="w-full flex flex-col items-center bg-primary-50 bg-dotted-pattern bg-contain px-10 md:py-10">
            <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
              <div className="flex flex-col ml-44 justify-center gap-8 pt-10">
                <h1 className="text-5xl font-bold">
                  Host, Connect, Celebrate: Your Events, Our Platform!
                </h1>
                <p className="p-regular-20 md:p-regular-24 text-lg">
                  Book and Learn helpful tips from 3,168+ mentors in world-class
                  companies with our global community.
                </p>
                <Button
                  size="lg"
                  asChild
                  className="button bg-primary-600 hover:bg-primary-500 w-full sm:w-fit"
                  onClick={scrollToSection}>
                  <Link to="#events">Explore Now</Link>
                </Button>
              </div>

              <img
                src="/assets/images/hero.png"
                alt="hero"
                width="1000"
                height="1000"
                className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
              />
            </div>
          </section>

          {/* New Section Below (Category Search and Cards) */}
          <section
            id="category-section"
            className="w-full bg-dark-2 py-10 mt-10 relative">
            <div className="w-full flex justify-center items-center gap-4">
              {/* Search Input */}
              <div className="flex gap-2 px-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-lg bg-dark-4">
                <img
                  src="/assets/icons/search.svg"
                  alt="search"
                  width={24}
                  height={24}
                  className="text-white"
                />
                <input
                  type="text"
                  placeholder="Search for categories"
                  className="w-full p-4 bg-dark-4 text-white border-0 rounded-lg focus:outline-none placeholder:text-grey-500"
                />
              </div>

              {/* Category Select Dropdown */}
              <select className="p-4 w-full md:w-1/4 bg-dark-4 text-white rounded-lg border-0 cursor-pointer transition-all ease-in-out duration-200">
                <option
                  value="all"
                  className="hover:bg-primary-500 transition-all ease-in-out duration-200">
                  All Categories
                </option>
                <option
                  value="category1"
                  className="hover:bg-primary-500 transition-all ease-in-out duration-200">
                  Category 1
                </option>
                <option
                  value="category2"
                  className="hover:bg-primary-500 transition-all ease-in-out duration-200">
                  Category 2
                </option>
                <option
                  value="category3"
                  className="hover:bg-primary-500 transition-all ease-in-out duration-200">
                  Category 3
                </option>
              </select>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 ml-24">
              {allEvents.slice(0, visibleEvents).map((event, index) => (
                <div
                  key={index}
                  className="bg-dark-3 p-6 rounded-xl h-[12cm] w-[9cm] flex flex-col justify-between">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-t-xl mb-4"
                  />
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-400">{event.description}</p>
                  <div className="mt-4 text-sm text-gray-300">
                    <p>
                      {event.date} - {event.day} | {event.time}
                    </p>
                    <p>{event.location}</p>
                    <p
                      className={
                        event.isFree ? "text-green-500" : "text-red-500"
                      }>
                      {event.isFree ? "Free" : "Paid"}
                    </p>
                    <p className="mt-2 text-gray-400">
                      Organized by: {event.organizer}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary-600 hover:bg-primary-500 mt-4">
                    Book Now
                  </Button>
                </div>
              ))}
            </div>

            {/* Load More Button or No More Events Message */}
            <div className="w-full flex justify-center mt-10">
              {hasMoreEvents ? (
                <Button
                  size="lg"
                  className="bg-primary-600 hover:bg-primary-500"
                  onClick={loadMoreEvents}>
                  Load More
                </Button>
              ) : (
                <p className="text-white text-lg">No More Events</p>
              )}
            </div>
            <div
              className="fixed right-10 bottom-10 flex items-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}>
              {/* Button Circle */}
              <div
                className={`relative flex items-center justify-center w-14 h-14 rounded-full cursor-pointer bg-primary-600 transition-all duration-300 ${
                  hovered ? "w-auto px-4" : "w-14"
                }`}>
                {/* Icon inside Circle */}
                <div
                  className={`absolute text-White transition-opacity duration-300 ${
                    hovered ? "opacity-0" : "opacity-100"
                  }`}>
                  <FaPlus size={24} />
                </div>

                {/* Text when hovered */}
                {hovered && (
                  <span className="text-White text-lg font-semibold">
                    Create Event
                  </span>
                )}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  };

  return <FloatingButton />;
};

export default Events;
