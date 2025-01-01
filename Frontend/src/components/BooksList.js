import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BooksList.css";

const BooksList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [query, setQuery] = useState("");
    const [sortOption, setSortOption] = useState("author");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/books");
                const sortedBooks = response.data.sort((a, b) => {
                    if (a[sortOption] < b[sortOption]) return -1;
                    if (a[sortOption] > b[sortOption]) return 1;
                    return 0;
                });
                setBooks(sortedBooks);
                setFilteredBooks(sortedBooks);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch books. Please try again later.");
            }
        };

        fetchBooks();
    }, [sortOption]);

    const handleSearch = () => {
        const lowerQuery = query.toLowerCase();
        const results = books.filter(
            (book) =>
                book.title.toLowerCase().includes(lowerQuery) ||
                book.author.toLowerCase().includes(lowerQuery) ||
                (book.genre && book.genre.toLowerCase().includes(lowerQuery))
        );

        setFilteredBooks(results);
    };


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSort = (option) => {
        setSortOption(option);
        const sortedBooks = [...filteredBooks].sort((a, b) => {
            if (a[option] < b[option]) return -1;
            if (a[option] > b[option]) return 1;
            return 0;
        });
        setFilteredBooks(sortedBooks);
    };

    const highlightText = (text, query) => {
        if (!query) return text;
        const parts = text.split(new RegExp(`(${query})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <span key={index} className="books-list__highlight">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    if (error) {
        return <div className="books-list__error">{error}</div>;
    }

    return (
        <div className="books-list__container">
            <h1 className="books-list__title">Books</h1>

            <div className="books-list__search-bar">
                <input
                    type="text"
                    placeholder="Search by Title, Author, or Genre"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}

                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="books-list__sort-dropdown">
                <label htmlFor="sort">Sort by:</label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                </select>
            </div>

            {filteredBooks.length > 0 ? (
                <div className="books-list__list">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="books-list__item">
                            <h2>{highlightText(book.title, query)}</h2>
                            <p>
                                <strong>Author:</strong> {highlightText(book.author, query)}
                            </p>
                            <p>
                                <strong>Rating:</strong> {book.rating || "N/A"}
                            </p>
                            <p>
                                <strong>Genre:</strong> {highlightText(book.genre || "N/A", query)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="books-list__no-results">No results found.</p>
            )}
        </div>
    );
};

export default BooksList;
