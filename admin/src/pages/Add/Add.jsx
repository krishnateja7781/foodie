import React, { useState } from 'react'
import { assets,url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                })
                setImage(false);
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Failed to add component.");
        } finally {
            setLoading(false);
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='max-w-[700px] mt-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200'>
            <form className='flex flex-col gap-6' onSubmit={onSubmitHandler}>
                <div className='flex flex-col gap-2'>
                    <p className="font-medium text-slate-700">Upload image</p>
                    <label htmlFor="image" className="cursor-pointer">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className="w-32 rounded-xl object-cover hover:opacity-80 transition" />
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden required />
                </div>
                <div className='flex flex-col gap-2 w-full max-w-[400px]'>
                    <p className="font-medium text-slate-700">Product name</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Type here' required className="p-2.5 border border-slate-300 outline-none rounded-lg focus:border-tomato focus:ring-1 focus:ring-tomato transition" />
                </div>
                <div className='flex flex-col gap-2 w-full max-w-[400px]'>
                    <p className="font-medium text-slate-700">Product description</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={4} placeholder='Write content here' required className="p-2.5 border border-slate-300 outline-none rounded-lg resize-none focus:border-tomato focus:ring-1 focus:ring-tomato transition" />
                </div>
                <div className='flex gap-8'>
                    <div className='flex flex-col gap-2'>
                        <p className="font-medium text-slate-700">Product category</p>
                        <select name='category' onChange={onChangeHandler} className="p-2.5 border border-slate-300 outline-none rounded-lg max-w-[150px] cursor-pointer focus:border-tomato focus:ring-1 focus:ring-tomato transition">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className="font-medium text-slate-700">Product Price</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='$25' required className="p-2.5 border border-slate-300 outline-none rounded-lg max-w-[120px] focus:border-tomato focus:ring-1 focus:ring-tomato transition" />
                    </div>
                </div>
                <button type='submit' disabled={loading} className={`max-w-[150px] bg-slate-800 text-white p-3 rounded-lg cursor-pointer mt-4 hover:bg-slate-700 transition ${loading ? 'opacity-50' : ''}`}>{loading ? 'Adding...' : 'ADD ITEM'}</button>
            </form>
        </div>
    )
}

export default Add
