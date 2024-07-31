import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
const data = [
    { id: 20, phone: '+912055043', status: 'Kutilayotgan', total: '180,000 uzs', date: '06.23.24', note: 'Izoh yo\'q', photo: 'https://www.pinclipart.com/picdir/big/324-3245234_closed-book-clipart-transparent-background-books-png.png' },
    { id: 20, phone: '+912055043', status: 'Kutilayotgan', total: '180,000 uzs', date: '06.23.24', note: 'Izoh yo\'q', photo: 'https://www.pinclipart.com/picdir/big/324-3245234_closed-book-clipart-transparent-background-books-png.png' },
    { id: 20, phone: '+912055043', status: 'Kutilayotgan', total: '180,000 uzs', date: '06.23.24', note: 'Izoh yo\'q', photo: 'https://www.pinclipart.com/picdir/big/324-3245234_closed-book-clipart-transparent-background-books-png.png' },
]
const ImageUz = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='mt-[100px]'>
            <input type="file" accept="image/*" id='inputImage' onChange={handleImageChange} className='hidden' />
            <label htmlFor="inputImage" className='p-2 bg-gray-400 border-2 rounded-md font-[600]'>Image Uz</label>
            {selectedImage && (
                <div className=''>
                    <img src={selectedImage} className='rounded ml-[255px] mt-[-40px]' alt="Uploaded" style={{ maxWidth: '200px', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};
const ImageRu = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='mt-[100px]'>
            <input type="file" accept="image/*" id='imageRU' onChange={handleImageChange} className='hidden' />
            <label htmlFor="imageRU" className='p-2 bg-gray-400 border-2 rounded-md font-[600]'>Image Ru</label>
            {selectedImage && (
                <div className=''>
                    <img src={selectedImage} className='rounded ml-[255px] mt-[-40px]' alt="Uploaded" style={{ maxWidth: '200px', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};


export const Slider = () => {
    
    const [isVisible, setIsVisible] = useState(false);

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };
    return (
        <>
            {isVisible &&
                <div className="">
                    <div className='w-[100%] h-[110%] overflow-hidden  ml-[-392px] bg-slate-400 absolute opacity-50'></div>
                    <div className="w-[700px] pb-10 absolute bg-white  mt-[100px] pl-6 rounded-md">
                        <div className=" mr-[35px] mt-5">
                            <p className='float-left text-[23px] font-[700]'>Banner yaratish</p>
                            <button className='float-right bg-[#7C54EE] text-white p-2 rounded-md' onClick={handleToggle}>Orqaga</button>
                        </div>
                        <form action="">
                            <ImageUz />
                            <ImageRu />

                            <button className='bg-[#7C54EE] text-white p-2 rounded-md float-right mr-7 mt-11' onClick={handleToggle}>Bannerni yaratish</button>

                        </form>
                    </div>
                </div>

            }
            
            <div className="">

                <div className="w-[1135px] flex mt-3 pl-2">
                    <IoIosSettings className='size-8 cursor-pointer' />
                    <div className="text-[18px] flex ml-[630px] ">
                        <p className=''>Buyurtmalar:</p>
                        <span className=' bg-[#24FF00] ml-1 text-white p-1 rounded'>100uzs</span>
                        <p className='ml-2'>Balans:</p>
                        <span className=' bg-[#24FF00] ml-1 text-white p-1 rounded'>2000uzs</span>
                        <p className='ml-3'>Dovudbek M</p>
                        <FaUserCircle className='ml-2 size-8' />
                    </div>
                </div>

                <div className="w-[1135px] h-[700px] border-l-[20px] border-t-[20px] border-[#D9D9D9] mt-3">
                    <div className=" ml-[35px] mr-[35px] mt-5">
                        <p className='float-left text-[25px] font-[700]'>Bannerlar</p>
                        <button className='float-right bg-[#7C54EE] text-white p-2 rounded-md' onClick={handleToggle}>Banner yaratish</button>
                    </div>

                    <div className="">
                        <div className="overflow-x-auto mt-[100px] ml-5 mr-5">
                            <div className="grid grid-cols-5 gap-2">
                                <p className="font-bold py-2 px-4 border-b text-center">T/r</p>
                                <p className="font-bold py-2 px-4 border-b text-center">Photo Uz</p>
                                <p className="font-bold py-2 px-4 border-b text-center">Photo Ru</p>
                                <p className="font-bold py-2 px-4 border-b text-center">IzohCreated date</p>
                                <p className="font-bold py-2 px-4 border-b text-center">Action</p>
                                {data.map((item, index) => (
                                    <>
                                        <p className="py-2 px-4  text-center">{index + 1}</p>
                                        <img src={item.photo} alt="" width={50} className='ml-[70px] ' />
                                        <img src={item.photo} alt="" width={50} className='ml-[70px] ' />
                                        <p className="py-2 px-4  text-center">{item.date}</p>

                                        <p className="py-2 px-4  text-center flex justify-center">
                                            <button className="text-blue-600 hover:text-blue-800">✏️</button>
                                            <button className="text-red-600 hover:text-red-800 ml-2">🗑️</button>
                                        </p>
                                        <hr />
                                        <hr />
                                        <hr />
                                        <hr />
                                        <hr />
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Slider;
