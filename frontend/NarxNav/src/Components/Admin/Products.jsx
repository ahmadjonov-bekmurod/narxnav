import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
const data = [
  { id: 1, nameUz: 'Diniy kitoblar', nameRu: 'Религиозныек.', date: '06.23.2024', photo: 'https://www.pinclipart.com/picdir/big/324-3245234_closed-book-clipart-transparent-background-books-png.png' },
  { id: 2, nameUz: 'Diniy kitoblar', nameRu: 'Религиозныек.', date: '06.23.2024', photo: 'https://www.pinclipart.com/picdir/big/324-3245234_closed-book-clipart-transparent-background-books-png.png' },
  { id: 3, nameUz: 'Diniy kitoblar', nameRu: 'Религиозныек.', date: '06.23.2024', photo: 'https://i.pinimg.com/originals/ea/5f/0d/ea5f0dd45225867059214da50ec9803c.png' },
  { id: 4, nameUz: 'Diniy kitoblar', nameRu: 'Религиозныек.', date: '06.23.2024', photo: 'https://i.pinimg.com/originals/ea/5f/0d/ea5f0dd45225867059214da50ec9803c.png' },
  { id: 5, nameUz: 'Diniy kitoblar', nameRu: 'Религиозныек.', date: '06.23.2024', photo: 'https://i.pinimg.com/originals/ea/5f/0d/ea5f0dd45225867059214da50ec9803c.png' },
  { id: 6, nameUz: 'Diniy kitoblar', nameRu: 'Религиозныек.', date: '06.23.2024', photo: 'https://i.pinimg.com/originals/ea/5f/0d/ea5f0dd45225867059214da50ec9803c.png' },
  { id: 7, nameUz: 'Diniy kitoblar', nameRu: 'Религиозныек.', date: '06.23.2024', photo: 'https://i.pinimg.com/originals/ea/5f/0d/ea5f0dd45225867059214da50ec9803c.png' },
];
const ImageUpload = () => {
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
      <label htmlFor="inputImage" className='p-2 bg-gray-400 border-2 rounded-md font-[600]'>Rasmni yuklang</label>
      {selectedImage && (
        <div className=''>
          <img src={selectedImage} className='rounded ml-[255px] mt-[-40px]' alt="Uploaded" style={{ maxWidth: '200px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export const Products = () => {
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
              <p className='float-left text-[23px] font-[700]'>Kategoriya yaratish</p>
              <button className='float-right bg-[#7C54EE] text-white p-2 rounded-md' onClick={handleToggle}>Orqaga</button>
            </div>
            <form action="">
              <ImageUpload />
              <div className="flex mt-5">
                <div className="">
                  <label htmlFor="nameUz" className='text-[20px]'>Name uz</label>
                  <br />
                  <input className='border-gray-500 border-[1px] mt-3 pl-2 rounded w-[300px] h-10' type="text" id='nameUz' placeholder='Nmae Uz' />
                </div>
                <div className="ml-5">
                  <label htmlFor="nameUz" className='text-[20px]'>Name ru</label>
                  <br />
                  <input className='border-gray-500 border-[1px] mt-3 pl-2 rounded w-[300px] h-10' type="text" id='nameUz' placeholder='Nmae Ru' />
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="nameUz" className='text-[20px]'>Parent</label>
                <br />
                <select name="" id="nameUz" className='text-gray-500 border-gray-500 border-[1px] mt-3 pl-2 rounded w-[300px] h-10'>
                  <option value="">Parent</option>
                  <option value="">Book1</option>
                  <option value="">Book2</option>
                  <option value="">Book3</option>
                  <option value="">Book4</option>
                </select>
              </div>
              <button className='bg-[#7C54EE] text-white p-2 rounded-md float-right mr-7 mt-10' onClick={handleToggle}>Kategoriyani yaratish</button>

            </form>
          </div>
        </div>

      }
      <div className="">
        <div className="w-[1135px] flex mt-3 pl-2">
          {/* <IoIosSettings className='size-8 cursor-pointer' /> */}
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
            <p className='float-left text-[25px] font-[700]'>Kategoriyalar</p>
            <button className='float-right bg-[#7C54EE] text-white p-2 rounded-md' onClick={handleToggle}>Kategoriya yaratish</button>
          </div>

          <div className="">
            <div className="overflow-x-auto mt-[100px] ml-5 mr-5">
              <div className="grid grid-cols-6 gap-2 bg-white">
                <p className="font-bold py-2 px-4 border-b text-center">T/r</p>
                <p className="font-bold py-2 px-4 border-b text-center">Name uz</p>
                <p className="font-bold py-2 px-4 border-b text-center">Name ru</p>
                <p className="font-bold py-2 px-4 border-b text-center">Photo</p>
                <p className="font-bold py-2 px-4 border-b text-center">Created date</p>
                <p className="font-bold py-2 px-4 border-b text-center">Action</p>
                {data.map((item, index) => (
                  <>
                    <p className="py-2 px-4 border-b text-center">{index + 1}</p>
                    <p className="py-2 px-4 border-b text-center">{item.nameUz}</p>
                    <p className="py-2 px-4 border-b text-center">{item.nameRu}</p>
                    <p className="py-2 px-4 border-b text-center">
                      <img src={item.photo} alt="Book" className="w-8 h-10 mx-auto" />
                    </p>
                    <p className="py-2 px-4 border-b text-center">{item.date}</p>
                    <p className="py-2 px-4 border-b text-center flex justify-center">
                      <button className="text-blue-600 hover:text-blue-800">✏️</button>
                      <button className="text-red-600 hover:text-red-800 ml-2">🗑️</button>
                    </p>
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
export default Products;