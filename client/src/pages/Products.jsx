
import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'

const Products = () => {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [category, setCategory] = useState("")

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:9000/products")
            const data = await res.json()
            // fallback to [] so .map never sees undefined
            setProducts(Array.isArray(data.products) ? data.products : [])
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddToCart = async (id, price) => {
        const res = await fetch("http://localhost:9000/add-to-cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ id, price })
        })
        const data = await res.json()
        console.log(data)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    // Unique categories from fetched products
    const categories = [...new Set(products.map((p) => p.category))]

    // Search + filter + sort (uses your backend field names)
    const filteredProducts = products
        .filter((product) => {
            const text = search.toLowerCase()
            const matchesSearch =
                product.productName?.toLowerCase().includes(text) ||
                product.category?.toLowerCase().includes(text) ||
                product.brand?.toLowerCase().includes(text)
            const matchesCategory = category === "" || product.category === category
            return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
            if (sort === "low-high") return a.discountPrice - b.discountPrice
            if (sort === "high-low") return b.discountPrice - a.discountPrice
            if (sort === "rating") return b.ratings - a.ratings
            return 0
        })

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
                    <p className="mt-2 text-gray-500">Explore our latest collection</p>
                </div>

                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <SearchBar search={search} setSearch={setSearch} />
                    <CategoryFilter
                        category={category}
                        setCategory={setCategory}
                        categories={categories}
                        sort={sort}
                        setSort={setSort}/>
                </div>

                <p className="mb-4 text-gray-500">{filteredProducts.length} Products Found</p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => {
                        const discount = Math.round(
                            ((product.price - product.discountPrice) / product.price) * 100)

                        return (
                            <div
                                key={product._id}
                                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                            >
                                <div className="relative h-64 bg-gray-100">
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.productName}
                                        className="h-full w-full object-cover"
                                    />
                                    {product.isFeatured && (
                                        <span className="absolute left-3 top-3 rounded bg-black px-3 py-1 text-xs text-white">
                                            Featured
                                        </span>
                                    )}
                                    <span className="absolute right-3 top-3 rounded bg-red-500 px-3 py-1 text-xs text-white">
                                        {discount}% OFF
                                    </span>
                                </div>

                                <div className="p-5">
                                    <p className="text-sm text-gray-500">{product.brand} / {product.category}</p>
                                    <h2 className="mt-2 text-lg font-semibold text-gray-900">{product.productName}</h2>
                                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">{product.description}</p>

                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-yellow-500">★★★★★</span>
                                        <span className="text-sm text-gray-500">{product.ratings} ({product.numReviews})</span>
                                    </div>

                                    <div className="mt-4 flex items-center gap-3">
                                        <span className="text-xl font-bold">₹{product.discountPrice.toLocaleString("en-IN")}</span>
                                        <span className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString("en-IN")}</span>
                                    </div>

                                    <p className="mt-3 text-sm">
                                        {product.stock > 0
                                            ? <span className="text-green-600">In Stock</span>
                                            : <span className="text-red-500">Out of Stock</span>}
                                    </p>

                                    <div className="flex gap-3">
                                        <button
                                            disabled={product.stock === 0}
                                            className="mt-4 w-full rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
                                        >
                                            View Product
                                        </button>
                                        <button
                                            onClick={() => handleAddToCart(product._id, product.price)}
                                            className="mt-4 w-full rounded-lg bg-orange-400 py-3 font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {filteredProducts.length === 0 && (
                    <p className="mt-10 text-center text-gray-500">No products found!</p>
                )}
            </div>
        </div>
    )
}

export default Products


