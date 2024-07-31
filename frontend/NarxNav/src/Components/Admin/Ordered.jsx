import React, { useState } from 'react'
import { FaEye, FaUserCircle } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
const data = [
    { id: 20, phone: '+912055043', status: 'Buyurtirilgan', total: '180,000 uzs', date: '06.23.24', note: 'Izoh yo\'q', },
    { id: 20, phone: '+912055043', status: 'Buyurtirilgan', total: '180,000 uzs', date: '06.23.24', note: 'Izoh yo\'q', },
    { id: 20, phone: '+912055043', status: 'Buyurtirilgan', total: '180,000 uzs', date: '06.23.24', note: 'Izoh yo\'q', },
    { id: 20, phone: '+912055043', status: 'Buyurtirilgan', total: '180,000 uzs', date: '06.23.24', note: 'Izoh yo\'q', },
    { id: 20, phone: '+912055043', status: 'Buyurtirilgan', total: '180,000 uzs', date: '06.23.24', note: 'Izoh yo\'q', },
]
const card = [
    { id: 1, name_s: 'Dovudbek Murodov', status: 'kutilyapti', payment_method: 'uzs', tel: '+998998887722', ordered_date: '2024.06.29, 20:00', adress: 'Toshkent viloyat', jami: '20000uzs', izoh: 'izohlar yo\'q', product_name: 'book', product_price: '285000uzs', quintity: 1, photo: 'https://i.pinimg.com/originals/ea/5f/0d/ea5f0dd45225867059214da50ec9803c.png' }
]
export const Ordered = () => {
    const [isAccapted, setAccapted] = useState(false);

    const handleAccapted = () => {
        setAccapted(!isAccapted);
    };
    const [isCard, setCard] = useState(false);

    const handleCard = () => {
        setCard(!isCard);
    };
    return (
        <>
            {isAccapted &&
                <div className="">
                    <div className='w-[100%] h-[110%] overflow-hidden  ml-[-392px] bg-slate-400 absolute opacity-50'></div>
                    <div className="w-[500px] h-[120px] fixed shadow-xl bg-white rounded-md pl-3 mt-[120px] ml-[100px] font-[700] pt-2">
                        <p className='text-[23px]'>Buyurtmani qabul qilmoqchimisiz?</p>
                        <div className="float-right mt-8 mr-5">
                            <button onClick={handleAccapted} className='w-[100px] h-8 border-gray-600 border rounded-md text-gray-600'>Bekor qilish</button>
                            <button onClick={handleAccapted} className='w-[50px] ml-3 h-8 bg-blue-600 text-white rounded-md '>Ha</button>
                        </div>
                    </div>
                </div>
            }
            {isCard &&
                <div className="">
                    <div className='w-[100%] h-[110%] overflow-hidden  ml-[-392px] bg-slate-400 absolute opacity-50'></div>
                    <div className="fixed w-[600px] h-[670px] bg-white rounded-md ml-[100px] mt-[20px] pt-[10px] pl-[18px] pr-[18px]">
                        <p className='text-[23px] font-bold'>Buyurtma malumotlari</p>
                        {card.map((item, index) => (
                            <div className="">
                                <div className="flex justify-between mb-3 mt-[15px]">
                                    <p>Mijozning ism familiyasi:</p>
                                    <p>{item.name_s} </p>
                                </div>
                                <hr />
                                <div className="flex justify-between mb-3 mt-[15px]">
                                    <p>Status:</p>
                                    <p>{item.status} </p>
                                </div>
                                <hr />
                                <div className="flex justify-between mb-3 mt-[15px]">
                                    <p>To'lov turi:</p>
                                    <p>{item.payment_method} </p>
                                </div>
                                <hr />
                                <div className="flex justify-between mb-3 mt-[15px]">
                                    <p>Telefon raqami:</p>
                                    <p>{item.tel} </p>
                                </div>
                                <hr />
                                <div className="flex justify-between mb-3 mt-[15px]">
                                    <p>Buyurtma berilgan sanasi:</p>
                                    <p>{item.ordered_date} </p>
                                </div>
                                <hr />
                                <div className="flex justify-between mb-3 mt-[15px]">
                                    <p>Buyurtma manzili:</p>
                                    <p>{item.adress} </p>
                                </div>
                                <hr />
                                <div className="flex justify-between mb-3 mt-[15px]">
                                    <p>Jami:</p>
                                    <p>{item.jami} </p>
                                </div>
                                <hr />

                                <p className='text-[23px] font-bold'>Maxsulotlar</p>

                                <div className="flex justify-between mb-3 mt-[15px]">
                                    <p className='mt-2'>Maxsulot rasmi:</p>
                                    <img src={item.photo} alt="" width={40} />
                                </div>
                                <div className="flex justify-between mb-2 mt-[15px]">
                                    <p>Maxsulot nomi:</p>
                                    <p>{item.product_name} </p>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <p>Maxsulot narxi:</p>
                                    <p>{item.product_price} </p>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <p>Soni:</p>
                                    <p>{item.quintity} </p>
                                </div>
                            </div>
                        ))}
                        <br />
                        <button onClick={handleCard} className='float-right border w-12 rounded-md bg-blue-600 text-white font-[600]'>Ok</button>
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
                    <div className="">
                        <div className="overflow-x-auto mt-[50px] ml-5 mr-5">
                            <div className="grid grid-cols-7 gap-2">
                                <p className="font-bold py-2 px-4 border-b text-center">T/r</p>
                                <p className="font-bold py-2 px-4 border-b text-center">Id</p>
                                <p className="font-bold py-2 px-4 border-b text-center">Statusi</p>
                                <p className="font-bold py-2 px-4 border-b text-center">Umumiy summa</p>
                                <p className="font-bold py-2 px-4 border-b text-center">Yaratilgan vaqt</p>
                                <p className="font-bold py-2 px-4 border-b text-center">Izoh</p>
                                <p className="font-bold py-2 px-4 border-b text-center">Ko'rish</p>
                                {/* <p className="font-bold py-2 px-4 border-b text-center">Action</p> */}
                                {data.map((item, index) => (
                                    <>
                                        <p className="py-2 px-4 border-b text-center">{index + 1}</p>
                                        <p className="py-2 px-4 border-b text-center">{item.id}</p>
                                        <p className="py-2 px-4 border-b text-center bg-yellow-300 rounded-md text-orange-500">{item.status}</p>
                                        <p className="py-2 px-4 border-b text-center">{item.total}</p>
                                        <p className="py-2 px-4 border-b text-center">{item.date}</p>
                                        <p className="py-2 px-4 border-b text-center">{item.note}</p>
                                        <button className='border-b border-[] text-center' onClick={handleCard}>
                                            <center>
                                                <FaEye className='text-[#0066FF] border-[#0066FF] w-[70px] h-8 rounded border text-[20px]' />
                                            </center>
                                        </button>
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
export default Ordered;
