The candidate needs to perform this test with NodeJS + Angular + RDBMS( for database only).
OR 
They can use any view engine like Vash or any view engine they have worked on.


1. HTML Page - Category Master with CRUD operations
2. HTML Page - Product Master with CRUD operations. A product belongs to a category.
3. The product list should also display ProductId, ProductName, CategoryName, and CategoryId.

The product list should have pagination on the server side, which means extracting records from DB as per the page size on the view.
So if the page size is 10 and the user is on page 9 then pull only records from 90 - 100.
Just so you know - You have to use the RDBMS database only.

***************************** XXX *****************************

- First start the backend server
- Also check if mysql service is running in task manager only then hit the apis

Tech Stack Used :
    - create react app
    - Tailwindcss
    - react router dome
    - @reduxjs/toolkit
    - react-redux


Body =>
    - navbar
    - home page (category list)
        - books page (list of books of clicked categories) 
    - footer

 
    

    import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PaginatedRecords = () => {
  const [data, setData] = useState([]);
  const [cursors, setCursors] = useState({
    nextCursor: null,
    prevCursor: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = async (queryParams) => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8800/category/books/1", {
        params: queryParams,
      });

      const { records, nextCursor, prevCursor } = response.data;
      setData(records);
      setCursors({ nextCursor, prevCursor });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Parse query parameters from the current URL
    const searchParams = new URLSearchParams(location.search);
    const titleCursor = searchParams.get("titleCursor");
    const bookIdCursor = searchParams.get("bookIdCursor");
    const limit = searchParams.get("limit") || 5;

    // Fetch data based on the current query params
    fetchData({ titleCursor, bookIdCursor, limit });
  }, [location.search]);

  const handleNext = () => {
    if (cursors.nextCursor) {
      // Construct the URL for the next page
      const nextUrl = `/category/books/1?titleCursor=${encodeURIComponent(cursors.nextCursor.title)}&bookIdCursor=${cursors.nextCursor.id}&limit=5`;
      navigate(nextUrl); // Update URL for navigation
    }
  };

  const handlePrev = () => {
    if (cursors.prevCursor) {
      // Construct the URL for the previous page
      const prevUrl = `/category/books/1?titleCursor=${encodeURIComponent(cursors.prevCursor.title)}&bookIdCursor=${cursors.prevCursor.id}&limit=5`;
      navigate(prevUrl); // Update URL for navigation
    }
  };

  return (
    <div>
      <h1>Books</h1>
      {loading && <p>Loading...</p>}
      <ul>
        {data.map((book, index) => (
          <li key={index}>{book.name}</li> // Replace with your data structure
        ))}
      </ul>
      <button onClick={handlePrev} disabled={!cursors.prevCursor || loading}>
        Previous
      </button>
      <button onClick={handleNext} disabled={!cursors.nextCursor || loading}>
        Next
      </button>
    </div>
  );
};

export default PaginatedRecords;
