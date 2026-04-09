import React, { useEffect, useState } from 'react'
import { url } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list,setList] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success)
    {
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{
      id:foodId
    })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
        <p className="font-bold text-xl mb-6 text-slate-800">All Foods List</p>
        <div>
          <div className="grid grid-cols-[1fr_3fr_1fr_1fr_0.5fr] items-center gap-4 py-3 px-4 bg-slate-100 rounded-t-xl font-semibold text-slate-600 border-b border-slate-200">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            // Handle new Supabase Storage URL vs Old local storage logic gracefully
            const imageSrc = item.image.includes('http') ? item.image : `https://occbadmrsvvfiotijgzx.supabase.co/storage/v1/object/public/food/products/${item.image}`

            return (
              <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_0.5fr] items-center gap-4 py-3 px-4 border-b border-slate-100 hover:bg-slate-50 transition text-sm'>
                <img src={imageSrc} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <p className="font-medium text-slate-800">{item.name}</p>
                <p className="text-slate-600">{item.category}</p>
                <p className="font-semibold text-slate-700">${item.price}</p>
                <p className='cursor-pointer text-red-500 hover:text-red-700 font-bold w-full h-full flex items-center justify-center rounded-lg hover:bg-red-50 transition' onClick={()=>removeFood(item._id)}>X</p>
              </div>
            )
          })}
          {list.length === 0 && (
             <div className="py-8 text-center text-slate-500 font-medium">No items found. Add some!</div>
          )}
        </div>
    </div>
  )
}

export default List
