import React from "react"

const CategoryFilter = ({ category, setCategory, categories = [], sort, setSort }) => {
    return (
        <div className="flex w-78 gap-2 sm:grid-cols-1 md:grid-cols-2 ">
            {/* Sort */}
            <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none">

                <option value="">Sort By</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Rating: Highest First</option>
            </select>

            {/* Category */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 outline-none">

                <option value="">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        </div>
    )
}

export default CategoryFilter
