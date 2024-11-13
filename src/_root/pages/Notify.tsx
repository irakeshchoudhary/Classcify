const Notify = () => {
  return (
    <div className="w-full bg-dark-2 p-4 sm:p-6 lg:p-10">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h1 className="text-white text-2xl sm:text-3xl font-bold">Notifications</h1>
          <div className="mt-3 sm:mt-0 flex gap-1 bg-dark-4 p-2 rounded-lg">
            <p className="text-xs sm:text-sm md:text-base text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
            />
          </div>
        </div>
        <div className="mt-10 sm:mt-14 max-w-full sm:max-w-3xl lg:max-w-5xl">
          {/* Notification Item */}
          <div className="relative flex items-center gap-3 sm:gap-5 p-3 sm:p-4 border-b-2 border-zinc-900 hover:bg-zinc-900 hover:rounded-lg cursor-pointer">
            <img src="/assets/icons/like.svg" className="p-1 sm:p-2 rounded-full bg-zinc-800" alt="Liked" />
            <img src="assets/icons/profile-placeholder.svg" alt="User-profile" />
            <div className="space-y-1 text-sm sm:text-base">
              <h3 className="block font-semibold">Edname liked your post “Nature Love”</h3>
              <p className="block text-xs sm:text-sm text-zinc-500">4 minutes ago</p>
            </div>
            <div className="absolute right-3 sm:right-5">
              <img src="/assets/icons/redcircle.svg" alt="red-dot" />
            </div>
          </div>
          
          {/* Repeat other notification items similarly */}
          <div className="relative flex items-center gap-3 sm:gap-5 p-3 sm:p-4 border-b-2 border-zinc-900 hover:bg-zinc-900 hover:rounded-lg cursor-pointer">
            <img src="/assets/icons/comment.svg" className="p-1 rounded-full bg-zinc-800" alt="Commented" />
            <img src="assets/icons/profile-placeholder.svg" alt="User-profile" />
            <div className="space-y-1 text-sm sm:text-base">
              <h3 className="block font-semibold">Edname commented on your post “Nature Love”</h3>
              <p className="block text-xs sm:text-sm text-zinc-500">10 minutes ago</p>
            </div>
            <div className="absolute right-3 sm:right-5">
              <img src="/assets/icons/redcircle.svg" alt="red-dot" />
            </div>
          </div>

          {/* Saved Post Notification */}
          <div className="relative flex items-center gap-3 sm:gap-5 p-3 sm:p-4 border-b-2 border-zinc-900 hover:bg-zinc-900 hover:rounded-lg cursor-pointer">
            <img src="/assets/icons/saved.svg" className="p-1 sm:p-2 rounded-full bg-zinc-800" alt="Saved" />
            <img src="assets/icons/profile-placeholder.svg" alt="User-profile" />
            <div className="space-y-1 text-sm sm:text-base">
              <h3 className="block font-semibold">Edname saved your post “Sports”</h3>
              <p className="block text-xs sm:text-sm text-zinc-500">34 minutes ago</p>
            </div>
            <div className="absolute right-3 sm:right-5">
              <img src="/assets/icons/greencircle.svg" alt="green-dot" />
            </div>
          </div>

          {/* Follow Notification */}
          <div className="relative flex items-center gap-3 sm:gap-5 p-3 sm:p-4 border-b-2 border-zinc-900 hover:bg-zinc-900 hover:rounded-lg cursor-pointer">
            <img src="/assets/icons/followed.svg" className="p-1 sm:p-2 rounded-full bg-zinc-800" alt="Followed" />
            <img src="assets/icons/profile-placeholder.svg" alt="User-profile" />
            <div className="space-y-1 text-sm sm:text-base">
              <h3 className="block font-semibold">Tanveer followed you</h3>
              <p className="block text-xs sm:text-sm text-zinc-500">39 minutes ago</p>
            </div>
            <div className="absolute right-3 sm:right-5 bg-primary-500 hover:bg-primary-600 cursor-pointer px-3 sm:px-5 py-2 sm:py-3 rounded-lg">
              <h4 className="text-xs sm:text-sm">Follow Back</h4>
            </div>
          </div>

          {/* New Post Notification */}
          <div className="relative flex items-center gap-3 sm:gap-5 p-3 sm:p-4 border-b-2 border-zinc-900 hover:bg-zinc-900 hover:rounded-lg cursor-pointer">
            <img src="/assets/icons/newpost.svg" className="p-1 sm:p-2 rounded-full bg-zinc-800" alt="New Post" />
            <img src="assets/icons/profile-placeholder.svg" alt="User-profile" />
            <div className="space-y-1 text-sm sm:text-base">
              <h3 className="block font-semibold">Tushar added a new post</h3>
              <p className="block text-xs sm:text-sm text-zinc-500">45 minutes ago</p>
            </div>
            <div className="absolute right-3 sm:right-5">
              <img src="/assets/icons/go.svg" className="p-2 bg-dark-4 rounded-full hover:bg-zinc-800 cursor-pointer" alt="go" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notify;
