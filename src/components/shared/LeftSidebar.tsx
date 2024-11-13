import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, isLoading } = useUserContext();

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-5">
        {/* Profile Link */}
        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="relative flex gap-3 items-center group">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full border border-primary-500"
            />
            {/* Tooltip for Profile */}
            <div className="hidden group-hover:flex absolute left-full ml-3 bg-dark-3 text-white p-2 rounded text-sm flex-col items-start">
              <p className="font-normal text-sm">{user.name}</p>
              <p className="text-light-3 font-gilroy text-xs">@{user.username}</p>
              {/* Pointer Triangle */}
              <span className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-dark-4"></span>
            </div>
          </Link>
        )}

        {/* Sidebar Links */}
        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive ? "bg-primary-500" : ""}`}>
                <NavLink
                  to={link.route}
                  className="flex items-center gap-4 p-4 relative">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive ? "invert-white" : ""}`}
                  />
                  {/* Tooltip with Pointer */}
                  <span className="hidden group-hover:flex items-center absolute left-full ml-3">
                    <span className="bg-dark-3 text-white p-2 rounded text-sm relative">
                      {link.label}
                      {/* Pointer Triangle */}
                      <span className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-dark-4"></span>
                    </span>
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Settings Button
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => navigate('/settings')}>
        <img src="/assets/icons/setting.svg" alt="settings" />
        <p className="small-medium lg:base-medium">Settings</p>
      </Button> */}
    </nav>
  );
};

export default LeftSidebar;
