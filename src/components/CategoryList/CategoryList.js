import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import styles from './CategoryList.module.css';

const CategoryList = ({ products, onCategorySelect, activeCategory }) => {
  const categories = products.map((product) => product.category);

  const uniqueCategories = Array.from(new Set(categories));

  return (
    <div className={styles.container}>
      <Swiper slidesPerView={'auto'} spaceBetween={10} className="mySwiper">
        {uniqueCategories.map((category) => (
          <SwiperSlide
            key={category}
            style={{ width: 'auto' }}
            className={`${styles.categoryButton} ${
              activeCategory === category ? styles.active : ''
            }`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryList;
