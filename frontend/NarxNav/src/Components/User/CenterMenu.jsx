import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CenterMenu() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://185.105.89.222:8080/api/categories/`)
      .then((response) => response.json())
      .then((data) => {
        const lang = localStorage.getItem("i18nextLng");
        setCategories(
          data.slice(0, 7).map((category) => ({
            ...category,
            name_uz: category.name,
            name:
              lang === "uz"
                ? category.name
                : lang === "ru"
                ? category.name_ru
                : category.name_en,
          }))
        );
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/leftfilter/${categoryName}`);
  };

  return (
    <div className="bg-gray-200 w-[90%] mx-auto flex justify-center items-center h-44 cursor-pointer p-4 rounded-md shadow-md">
      <div className="flex justify-center space-x-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-center text-center border rounded-full w-32 h-32 p-4">
            <Link to={`/leftfilter/${category.name}`} key={category.id}>
              <img
                className="rounded-full w-24 h-24  object-cover mx-auto"
                src={category.photo}
                
              />
              <div className="mt-2 text-md font-bold">{category.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CenterMenu;
