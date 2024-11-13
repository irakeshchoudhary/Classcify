import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "@/components/ui";
import useDebounce from "@/hooks/useDebounce";
import { GridPostList, Loader } from "@/components/shared";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queries";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Contents = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const [lastSearches, setLastSearches] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [showFilterCard, setShowFilterCard] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  const handleCloseModal = () => setShowFilterCard(false);

  useEffect(() => {
    if (debouncedSearch) {
      setLastSearches((prev) => {
        const updatedSearches = [
          debouncedSearch,
          ...prev.filter((term) => term !== debouncedSearch),
        ];
        return updatedSearches.slice(0, 5);
      });
    }
  }, [debouncedSearch]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item) => item.documents.length === 0);

  const getFilterMessage = () => {
    switch (activeFilter) {
      case "Following":
        return "No content found. Follow users to see content.";
      case "Popular":
        return "Coming Soon.";
      case "Featured":
        return "No featured items found.";
      default:
        return null;
    }
  };

  return (
    <div className="explore-container">
      {/* Main Content Wrapper */}
      <div
        className={`main-content-wrapper ${
          showFilterCard ? "blur-background" : ""
        }`}>
        {/* Search Input */}
        <div className="explore-inner_container">
          <h2 className="h3-bold md:h2-bold text-center w-full">Search</h2>
          <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
            <img
              src="/assets/icons/search.svg"
              width={24}
              height={24}
              alt="search"
            />
            <Input
              type="text"
              placeholder="Search Creators"
              className="explore-search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        {/* Last Searched Terms */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 text-center">
          {lastSearches.map((term, index) => (
            <span
              key={index}
              className="text-xs sm:text-sm md:text-base text-gray-500 py-2 px-4 sm:px-6 rounded-full bg-dark-3 cursor-pointer hover:bg-dark-2">
              #{term}
            </span>
          ))}
        </div>

        {/* Filters: For You, Following, Popular, Featured */}
        <div className="flex justify-between items-center w-full max-w-5xl mt-16 mb-7">
          <div className="flex flex-nowrap gap-1 justify-center items-center">
            {["For You", "Following", "Popular", "Featured"].map((filter) => (
              <button
                key={filter}
                className={`text-xs sm:text-sm md:text-base text-light-2 py-2 px-3 sm:px-5 border-stone-800 ${
                  activeFilter === filter
                    ? "bg-dark-3"
                    : "bg-dark-2 hover:bg-dark-3"
                } rounded ${filter === "Featured" ? "rounded-r" : ""}`}
                onClick={() => setActiveFilter(filter)}>
                {filter}
              </button>
            ))}
          </div>

          {/* Filter icon */}
          <div
            className="flex items-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer"
            onClick={() => setShowFilterCard(!showFilterCard)}>
            <p className="text-xs sm:text-sm md:text-base text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
            />
          </div>
        </div>

        {/* Display Message for Active Filter */}
        {activeFilter && (
          <div className="p-4 text-light-4 rounded-xl">
            <p className="text-center">{getFilterMessage()}</p>
          </div>
        )}

        {/* Display Posts or Search Results */}
        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          {shouldShowSearchResults ? (
            <SearchResults
              isSearchFetching={isSearchFetching}
              searchedPosts={searchedPosts}
            />
          ) : shouldShowPosts ? (
            <p className="text-light-4 mt-10 text-center w-full">
              End of contents
            </p>
          ) : (
            posts.pages.map((item, index) => (
              <GridPostList key={`page-${index}`} posts={item.documents} />
            ))
          )}
        </div>

        {/* Loader for Next Page */}
        {hasNextPage && !searchValue && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>

      {/* Filter Card: Only visible when "All" is clicked */}
      {showFilterCard && (
        <div className="filter-card absolute top-48 p-4 mt-5-50 w-1/4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-center text-light-3">Filter Results</h3>
            <button
              onClick={handleCloseModal}
              className="text-white hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {[
              {
                name: "Images",
                icon: (
                  <svg viewBox="0 0 16 16" fill="white" className="w-2.5 h-2.5">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16 0H4V12H16V0ZM9 6L11 8L14 5V10H6V9L9 6ZM9 3C9 3.55228 8.55228 4 8 4C7.44772 4 7 3.55228 7 3C7 2.44772 7.44772 2 8 2C8.55228 2 9 2.44772 9 3Z"
                    />
                    <path d="M0 4V16H12V14H2V4H0Z" />
                  </svg>
                ),
              },
              {
                name: "Videos",
                icon: (
                  <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5">
                    <path fill="none" d="m11 14 7-4-7-4z" />
                    <path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z" />
                    <path d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-9 12V6l7 4-7 4z" />
                  </svg>
                ),
              },
              {
                name: "Announcements",
                icon: (
                  <svg viewBox="0 0 20 20" fill="white" className="w-2.5 h-2.5">
                    <path d="M3 6c0-1.1.9-2 2-2h8l4-4h2v16h-2l-4-4H5a2 2 0 0 1-2-2H1V6h2zm8 9v5H8l-1.67-5H5v-2h8v2h-2z" />
                  </svg>
                ),
              },
              {
                name: "Events",
                icon: (
                  <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5">
                    <path d="M404.344,0H48.642C21.894,0,0,21.873,0,48.664v355.681c0,26.726,21.894,48.642,48.642,48.642 h355.702c26.726,0,48.642-21.916,48.642-48.642V48.664C452.986,21.873,431.07,0,404.344,0z M148.429,33.629h156.043v40.337 H148.429V33.629z M410.902,406.372H42.041v-293.88h368.86V406.372z" />
                    <rect
                      x="79.273"
                      y="246.23"
                      width="48.642"
                      height="48.664"
                    />
                  </svg>
                ),
              },
              {
                name: "Users",
                icon: (
                  <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"
                    />
                    <path d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z" />
                  </svg>
                ),
              },
              {
                name: "All Contents",
                icon: (
                  <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5">
                    <path d="M17.2905 11.9684C17.2905 12.7071 16.6984 13.3059 15.9679 13.3059C15.2374 13.3059 14.6453 12.7071 14.6453 11.9684C14.6453 11.2297 15.2374 10.6309 15.9679 10.6309C16.6984 10.6309 17.2905 11.2297 17.2905 11.9684Z" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.1316 7.40774C17.2832 7.28707 16.1897 7.28709 14.8267 7.28711H9.17326C7.81031 7.28709 6.7168 7.28707 5.86839 7.40774C4.99062 7.53259 4.25955 7.80048 3.71603 8.42826C3.17252 9.05605 3.00655 9.82426 3.00019 10.7206C2.99404 11.587 3.13858 12.6831 3.31873 14.0493L3.68419 16.8211C3.825 17.8892 3.93897 18.7537 4.11616 19.4306C4.3006 20.1352 4.57289 20.7194 5.08383 21.1718C5.59477 21.6241 6.20337 21.8199 6.91841 21.9116C7.60534 21.9998 8.46777 21.9998 9.53332 21.9998H14.4667C15.5322 21.9998 16.3947 21.9998 17.0816 21.9116C17.7966 21.8199 18.4052 21.6241 18.9162 21.1718C19.4271 20.7194 19.6994 20.1352 19.8838 19.4306C20.061 18.7537 20.175 17.8892 20.3158 16.8211L20.6813 14.0493C20.8614 12.6831 21.006 11.587 20.9998 10.7206C20.9934 9.82426 20.8275 9.05605 20.284 8.42826C19.7404 7.80048 19.0094 7.53259 18.1316 7.40774Z"
                    />
                  </svg>
                ),
              },
            ].map((option) => (
              <button
                key={option.name}
                className="flex items-center gap-2 text-xs sm:text-sm text-light-2 py-2 px-4 hover:bg-primary-500 rounded"
                onClick={() => setActiveFilter(option.name)}>
                {option.icon}
                <span className="text-left">{option.name}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-5">
            <button className="text-xs sm:text-sm text-light-2 bg-dark-4 py-2 px-4 hover:bg-primary-500 rounded">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contents;
