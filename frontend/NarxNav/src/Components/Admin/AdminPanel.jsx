import React, { useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { RiFileList2Line } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { CiViewTimeline } from "react-icons/ci";
import { LuListStart } from "react-icons/lu";
import { TfiLayoutSlider } from "react-icons/tfi";
import { IoExitOutline } from "react-icons/io5";
import logoImg from "../../assets/logo2.png";
import Products from "./Products";
import List from "./List";
import Waitings from "./Waitings";
import Ordered from "./Ordered";
import Kuryer from "./Kuryer";
import Slider from "./Slider";

export const AdminPanel = () => {
  // const [kategory, setkategory] = useState(false);

  // const handdleKategory = () => {
  //     setkategory(!kategory);
  // };
  // const [list, setlist] = useState(false);

  // const handdlelist = () => {
  //     setlist(!list);
  // };
  // const [wait, setwait] = useState(false);
  // const handdlewait = () => {
  //     setwait(!wait);
  // };
  // const [ordered, setordered] = useState(false);
  // const handdleOrdered = () => {
  //     setordered(!ordered);
  // };
  // const [kuryer, setkuyer] = useState(false);
  // const handdleKuryer = () => {
  //     setkuyer(!kuryer);
  // };
  // const [slider, setSlider] = useState(true);
  // const handdleSlider = () => {
  //     setSlider(!slider);
  // };
  const [activeComponent, setActiveComponent] = useState("products");
  const renderComponent = () => {
    switch (activeComponent) {
      case "products":
        return <Products />;
      case "list":
        return <List />;
      case "waitings":
        return <Waitings />;
      case "ordered":
        return <Ordered />;
      case "kuryer":
        return <Kuryer />;
      case "slider":
        return <Slider />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="flex">
        <div className="w-[400px] h-[700px] ">
          <div className="flex pl-12">
            <img className="w-12 h-12" src={logoImg} alt="logo" />
            <p className="text-[25px] mt-2 font-[500]">Kaizen books</p>
          </div>
          <div
            onClick={() => setActiveComponent("products")}
            className="flex ml-2 pl-3 pt-1 mt-3 w-[380px] h-[40px] hover:bg-gray-300 cursor-pointer ease-in duration-300   rounded-[10px] "
          >
            <CiBoxList className="size-5 mt-[6px]" />
            <p className="ml-3 text-[20px]">Kategoriyalar</p>
          </div>
          <div
            onClick={() => setActiveComponent("list")}
            className="flex ml-2 pl-3 pt-1 mt-3 w-[380px] h-[40px] hover:bg-gray-300 cursor-pointer ease-in duration-300   rounded-[10px] "
          >
            <RiFileList2Line className="size-5 mt-[6px]" />
            <p className="ml-3 text-[20px]">Maxsulotlar</p>
          </div>
          <div
            onClick={() => setActiveComponent("waitings")}
            className="flex ml-2 pl-3 pt-1 mt-3 w-[380px] h-[40px] hover:bg-gray-300 cursor-pointer ease-in duration-300   rounded-[10px] "
          >
            <IoMdTime className="size-5 mt-[6px]" />
            <p className="ml-3 text-[20px]">Kutilayotgan buyurtmalar</p>
          </div>
          <div
            onClick={() => setActiveComponent("ordered")}
            className="flex ml-2 pl-3 pt-1 mt-3 w-[380px] h-[40px] hover:bg-gray-300 cursor-pointer ease-in duration-300   rounded-[10px] "
          >
            <CiViewTimeline className="size-5 mt-[6px]" />
            <p className="ml-3 text-[20px]">Buyurtmalar</p>
          </div>
          <div
            onClick={() => setActiveComponent("kuryer")}
            className="flex ml-2 pl-3 pt-1 mt-3 w-[380px] h-[40px] hover:bg-gray-300 cursor-pointer ease-in duration-300   rounded-[10px] "
          >
            <LuListStart className="size-5 mt-[6px]" />
            <p className="ml-3 text-[20px]">Kuryerga chiqarilgan</p>
          </div>
          <div
            onClick={() => setActiveComponent("slider")}
            className="flex ml-2 pl-3 pt-1 mt-3 w-[380px] h-[40px] hover:bg-gray-300 cursor-pointer ease-in duration-300   rounded-[10px] "
          >
            <TfiLayoutSlider className="size-5 mt-[6px]" />
            <p className="ml-3 text-[20px]">Slider</p>
          </div>
          <div className="flex ml-2 pl-3 pt-1 mt-3 w-[380px] h-[40px] hover:bg-gray-300 cursor-pointer ease-in duration-300   rounded-[10px] ">
            <IoExitOutline className="size-5 mt-[6px]" />
            <p className="ml-3 text-[20px]">Chiqish</p>
          </div>
        </div>
        {/* {kategory && <Products />}
                {list && <List />}
                {wait && <Waitings />}
                {ordered && <Ordered />}
                {kuryer && <Kuryer />}
                {slider && <Slider />} */}
        {renderComponent()}
      </div>
    </>
  );
};
export default AdminPanel;
