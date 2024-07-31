import React from 'react'
const card = [
    { id: 1, name_s: 'Dovudbek Murodov', status: 'kutilyapti', payment_method: 'uzs', tel: '+998998887722', ordered_date: '2024.06.29, 20:00', adress: 'Toshkent viloyat', jami: '20000uzs', izoh: 'izohlar yo\'q', product_name: 'book', product_price: '285000uzs', quintity: 1, photo: 'https://i.pinimg.com/originals/ea/5f/0d/ea5f0dd45225867059214da50ec9803c.png'}
]
export const Card = () => {
    return (
        <>
            <div className='w-[100%] h-[110%] m overflow-hidden bg-slate-400 absolute opacity-50'></div>
            <div className="fixed w-[600px] h-[670px] bg-white rounded-md ml-[450px] mt-[20px] pt-[10px] pl-[18px] pr-[18px]">
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
                            <img src={item.photo} alt="" width={40}/>
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
                <button  className='float-right border w-12 rounded-md bg-blue-600 text-white font-[600]'>Ok</button>
            </div>

        </>
    )
}
export default Card;