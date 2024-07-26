import "./styles.css";
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

// // => Step 2:
function useHackerNewsApi(initialUrl, initialData) {
  const [url, setUrl] = useState(initialUrl);

  // // => Step 4:
  // const [data, setData] = useState(initialData);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    const fetchData = async () => {
      // // => Step 4:
      // setIsError(false);
      // setIsLoading(true);
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        // // => Step 4:
        // setData(result.data);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        // // => Step 4:
        // setIsError(true);
        dispatch({ type: "FETCH_FAILURE" });
      }

      // setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [state, setUrl];
}

export default function HackerNews() {
  // // => Step 2:
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    { hits: [] }
  );

  // // => Step 1:
  // const [data, setData] = useState({ hits: [] });
  // const [query, setQuery] = useState("redux");
  // const [url, setUrl] = useState(
  //   "https://hn.algolia.com/api/v1/search?query=redux"
  // );
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  // // => Step 0:
  // useEffect(async () => {
  //   const result = await axios(
  //     "https://hn.algolia.com/api/v1/search?query=redux"
  //   );
  //   console.log("==data==", data);
  //   setData(result.data);
  // }, []);

  // // => Step 1:
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsError(false);
  //     setIsLoading(true);
  //     try {
  //       const result = await axios(url);
  //       setData(result.data);
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //     setIsLoading(false);
  //   };

  //   fetchData();
  // }, [url]);

  return (
    <>
      <form
        onSubmit={(event) => {
          {
            /** ==== Step 1: ==== */
          }
          // setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
          {
            /** ==== Step 2: ==== */
          }
          event.preventDefault();
          doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/** ==== Handling Error || Ftech Data ==== */}
      {isError ? (
        <div className="error">Something went wrong ...</div>
      ) : isLoading ? (
        <div className="loading">Loading ... </div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
