import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "sw-people",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );

  return (
    <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {isLoading && <div className="loading">Loading...</div>}
      {isFetchingNextPage && <div className="loading">Loading...</div>}
      {data &&
        data.pages.map((pageData) =>
          pageData.results.map((results) => (
            <Person
              key={results.name}
              name={results.name}
              hairColor={results.hair_color}
              eyeColor={results.eye_color}
            />
          ))
        )}
    </InfiniteScroll>
  );
}
