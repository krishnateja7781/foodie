import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../../components/FoodItem/FoodItem'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const Menu = () => {
    const { category: paramCategory } = useParams();
    const navigate = useNavigate();
    const { search } = useLocation();
    const { food_list, menu_list } = useContext(StoreContext);

    const [category, setCategory] = useState(paramCategory || "All");
    const [sortOrder, setSortOrder] = useState("default");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        setCategory(paramCategory || "All");
    }, [paramCategory]);

    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        const searchParam = queryParams.get('search');
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [search]);

    useEffect(() => {
        let list = [...food_list];

        if (category !== "All") {
            list = list.filter(item => item.category === category);
        }

        if (searchQuery) {
            list = list.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (sortOrder === "low-high") {
            list.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high-low") {
            list.sort((a, b) => b.price - a.price);
        } else if (sortOrder === "az") {
            list.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredList(list);
    }, [category, food_list, sortOrder, searchQuery]);

    return (
        <div className='flex flex-col md:flex-row gap-8 py-8'>
            <div className='w-full md:w-1/4 flex flex-col gap-6 md:sticky top-24 self-start'>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h3 className="font-bold text-xl mb-4 text-white">Categories</h3>
                    <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 hide-scrollbar">
                        <div
                            className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${category === "All" ? "bg-tomato text-white shadow-md shadow-tomato/20" : "text-slate-300 hover:bg-white/10"}`}
                            onClick={() => navigate('/menu/All')}
                        >
                            All
                        </div>
                        {menu_list.map((item, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${category === item.menu_name ? "bg-tomato text-white shadow-md shadow-tomato/20" : "text-slate-300 hover:bg-white/10"}`}
                                onClick={() => navigate(`/menu/${item.menu_name}`)}
                            >
                                {item.menu_name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Search for dish..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-tomato transition text-slate-200 placeholder:text-slate-500"
                    />
                    <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl outline-none focus:border-tomato transition text-slate-200 appearance-none cursor-pointer"
                    >
                        <option value="default" className='bg-slate-800 text-white'>Sort by: Relevance</option>
                        <option value="low-high" className='bg-slate-800 text-white'>Price: Low to High</option>
                        <option value="high-low" className='bg-slate-800 text-white'>Price: High to Low</option>
                        <option value="az" className='bg-slate-800 text-white'>Alphabetical: A-Z</option>
                    </select>
                </div>
            </div>

            <div className='flex-1'>
                <h2 className="text-3xl font-bold text-white mb-6">
                    {category} Dishes <span className="text-sm font-medium text-slate-400 ml-2">({filteredList.length})</span>
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredList.length > 0 ? (
                        filteredList.map((item, index) => (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                desc={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-slate-400 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-lg">No dishes found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Menu
