import React from "react"

const SearchBar = ({ search, setSearch }) => {
    return (
        <input
            type="text"
            placeholder="Search name, category or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
    )
}

export default SearchBar

