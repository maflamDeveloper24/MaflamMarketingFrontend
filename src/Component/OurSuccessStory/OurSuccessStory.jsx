import React, { useRef } from "react";
import styles from "./OurSuccessStory.module.css";
import { assests } from "../../assets/assests";

const OurSuccessStory = () => {
  const items = [
    { id: 1, imgSrc: assests. carouselcard1 },
    { id: 2, imgSrc: assests. carouselcard2 },
    { id: 3, imgSrc: assests. carouselcard3 },
    { id: 4, imgSrc: assests. carouselcard1 },
    { id: 5, imgSrc: assests. carouselcard2 },
    { id: 6, imgSrc: assests. carouselcard3 },
  ];

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      top: 0,
      left: -375,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      top: 0,
      left: 375,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.carouselWrapper}>
      <h2>Our Success Stories</h2>
      <div className={styles.carousel}>
        <button className={styles.carouselArrowLeft} onClick={scrollLeft}>
          &#10094;
        </button>

        <div className={styles.carouselSliderContainer} ref={sliderRef}>
          <div className={styles.carouselSlider}>
            {items.map((item) => (
              <div key={item.id} className={styles.carouselCard}>
                <img src={item.imgSrc} alt={`Ebook Card ${item.id}`} />
              </div>
            ))}
          </div>
        </div>

        <button className={styles.carouselArrowRight} onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default OurSuccessStory;