import React, { useEffect, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import './SmsChat.css'; // Ensure your CSS file is properly loaded

function LeftMenu() {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [sidebarCenter, setSidebarCenter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://185.105.89.222:8080/api/categories/`)
      .then(response => response.json())
      .then((data) => {
        const lang = localStorage.getItem('i18nextLng');
        setCategories(data.map((book) => ({
          ...book,
          name_uz: book.name,
          name: lang === 'uz' ? book.name : lang === 'ru' ? book.name_ru : book.name_en,
        })));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/leftfilter/${categoryName}`);
  };

  return (
    <div className='relative flex h-[93vh] mt-4 mr-4'>
      <div className='LeftMenu overflow-hidden'>
        <ul className='absolute inset-0 overflow-y-auto max-h-full scrollbar-thumb-gray-600 scrollbar-thumb-hover-gray-400'>
          {categories.map((category, index) => (
            <li
              key={index}
              className='left-menu border p-4 hover:bg-sky-200 flex justify-between text-sm'
              onMouseEnter={() => {
                setHoveredCategory(category);
                setSidebarCenter(true);
              }}
              onClick={() => handleCategoryClick(category.name_uz)}
            >
              {category.name} <ArrowForwardIosIcon />
            </li>
          ))}
        </ul>
      </div>

      {sidebarCenter && hoveredCategory && hoveredCategory.children && (
        <div className='absolute right-0 top-0 w-64 bg-white text-black border-l'>
          <ul className='p-4'>
            {hoveredCategory.children.map((child, index) => (
              <li
                key={index}
                className='p-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleCategoryClick(child.name_uz)}
              >
                {child.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LeftMenu;
