import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
//comps
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "swapi-sp",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {isFetchingNextPage && <div className="loading">Loading...</div>}
        {isError && error.message}
        {data.pages.map((pageData) =>
          pageData.results.map((result) => (
            <Species
              key={result.name}
              name={result.name}
              language={result.language}
              averageLifespan={result.average_lifespan}
            />
          ))
        )}
      </InfiniteScroll>
    </>
  );
}
