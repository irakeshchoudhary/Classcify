import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "@/components/ui";
import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { GridPostList, Loader } from "@/components/shared";
import { useState, useEffect } from "react";
import { useFollowUser, useUnfollowUser } from "@/lib/react-query/queries";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";

interface StatBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StatBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { data: currentUser } = useGetUserById(id || "");
  const [isFollowing, setIsFollowing] = useState(false);
  const { data: userData } = useGetUserById(user.id);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);  // Added state

  const followMutation = useFollowUser({
    onMutate: async () => {
      await queryClient.cancelQueries([QUERY_KEYS.GET_USERS]);
      const previousUserData = queryClient.getQueryData<{
        following?: string[];
      }>([QUERY_KEYS.GET_USERS]);

      queryClient.setQueryData<{ following?: string[] }>([QUERY_KEYS.GET_USERS], (old) => ({
        ...old,
        following: [...(old?.following || []), currentUser?.$id || ""].filter(Boolean),
      }));

      return { previousUserData };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.GET_USERS], context.previousUserData);
    },
  });

  const unfollowMutation = useUnfollowUser();

  useEffect(() => {
    if (userData && currentUser) {
      setIsFollowing(userData.following.includes(currentUser?.$id || ""));
    }
  }, [userData, currentUser]);

  const handleFollow = async () => {
    if (currentUser) {
      setIsFollowing(true);
      try {
        await followMutation.mutateAsync({
          followerId: user.id,
          followeeId: currentUser.$id,
        });
      } catch (error) {
        setIsFollowing(false);
        console.error("Follow error: ", error);
      }
    }
  };

  const handleUnfollow = async () => {
    if (currentUser) {
      setIsFollowing(false);
      try {
        await unfollowMutation.mutateAsync({
          followerId: user.id,
          followeeId: currentUser.$id,
        });
      } catch (error) {
        setIsFollowing(true);
        console.error("Unfollow error: ", error);
      }
    }
  };

  const handleMessageClick = () => {
    if (isFollowing && currentUser?.$id) {
      navigate(`/Chats/${currentUser.$id}`);
    } else {
      console.error("User ID is missing or not following");
    }
  };

  if (!currentUser || !userData) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`profile-container ${isSettingsOpen ? 'shift-left' : ''}`}>
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7 relative">
          <img
            src={currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
          {user.id === currentUser.$id && (
            <Link
              to={`/update-profile/${currentUser.$id}`}
              className="absolute bottom-6 left-24 bg-dark-4 p-2 rounded-full">
              <img
                src="/assets/icons/edit.svg"
                alt="edit profile"
                width={20}
                height={20}
              />
            </Link>
          )}

          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full">
              <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                {currentUser.name}
              </h1>
              <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                @{currentUser.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={currentUser.followers.length} label="Followers" />
              <StatBlock value={userData.following.length} label="Following" />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            {user.id !== currentUser.$id ? (
              <>
                <Button
                  type="button"
                  className="shad-button_primary px-8"
                  onClick={isFollowing ? handleUnfollow : handleFollow}
                  disabled={followMutation.isLoading || unfollowMutation.isLoading}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <Button
                  type="button"
                  className={`px-8 ${
                    isFollowing ? "bg-dark-3 hover:bg-dark-4" : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleMessageClick}
                  disabled={!isFollowing}>
                  Message
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="shad-button_ghost settings-button p-0"
                onClick={() => setIsSettingsOpen(prev => !prev)}> {/* Toggle state */}
                <img
                  src="/assets/icons/setting.svg"
                  alt="settings"
                  className="settings-icon" // Add class for SVG animation
                />
              </Button>
            )}
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}>
            <img
              src="/assets/icons/posts.svg"
              alt="posts"
              width={20}
              height={20}
            />{" "}
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}>
            <img
              src="/assets/icons/like.svg"
              alt="like"
              width={20}
              height={20}
            />{" "}
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
