
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EBooksCards.module.css";
import { EbookPageContext } from "../../store/ebookPageContext";
import Popup from '../Popup/Popup'; 
import auth from "../../Auth/Auth";

const EBooksCards = () => {
  const { ebookPageContextDetails, setEbookPageContextDetails, loading, error } = useContext(EbookPageContext);
  const [displayCount, setDisplayCount] = useState(8);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [selectedEbook, setSelectedEbook] = useState(null); 
  const navigate = useNavigate(); 
  
  // Get user details from the auth object
  const userDetails = auth.getAuthData();

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await fetch("/api/ebookData");
        const data = await response.json();
        setEbookPageContextDetails(data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchEbooks();
  }, [setEbookPageContextDetails]);

  const handleDownloadClick = (ebookUrl) => {
    if (!userDetails || !userDetails.token) {
      console.log("User not logged in, redirecting to login...");
      navigate("/login");
    } else {
      console.log("User logged in, downloading file...");
      window.location.href = ebookUrl; 
    }
  };

  const openPopup = (ebook) => {
    setSelectedEbook(ebook); 
    setIsPopupOpen(true); 
  };

  const closePopup = () => {
    setIsPopupOpen(false); 
    setSelectedEbook(null); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const { EbookDataTitle, ebook } = ebookPageContextDetails || {};
  const { title } = EbookDataTitle || { title: "Default Title" };

  const loadMoreItems = () => {
    setDisplayCount((prevCount) => prevCount + 8);
  };

  return (
    <div className={`${styles.container} ${isPopupOpen ? styles.fixed : ""}`}>
      <div>
        <h1 className={styles.containerHeader}>{title}</h1>
      </div>

      <div className={styles.cardsContainer}>
        {ebook?.slice(0, displayCount).map((ebookItem) => (
          <div key={ebookItem.id} className={styles.card}>
            <img
              src={ebookItem.imgSrc}
              alt={ebookItem.title}
              className={styles.image}
            />
            <div className={styles.content}>
              <p>{ebookItem.text}</p>
              <h3 className={styles.text}>{ebookItem.title}</h3>
              <div className={styles.btn}>
                {ebookItem.comingSoon ? (
                  <button className={styles.soonButton1}>Soon</button>
                ) : (
                  <button
                    onClick={() => openPopup(ebookItem)} 
                    className={styles.downloadButton}
                  >
                    <span className={styles.downbtnspan}>
                      {ebookItem.buttonText.text}
                    </span>
                    <img
                      src={ebookItem.buttonText.icon}
                      alt="Button Icon"
                      className={styles.downloadIcon}
                    />
                  </button>
                )}
                <img
                  src={ebookItem.icon2.icon}
                  alt="Arrow Icon"
                  className={styles.likeicon}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {ebook && displayCount < ebook.length && (
        <button onClick={loadMoreItems} className={styles.loadMoreButton}>
          Load More ({displayCount}/{ebook.length})
        </button>
      )}

      {/* Render Popup and pass props */}
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        ebookData={selectedEbook}
        onDownload={() => handleDownloadClick(selectedEbook?.ebookPdfUrl)} 
      />
    </div>
  );
};

export default EBooksCards;
