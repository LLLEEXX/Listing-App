import React from "react";
import "./../assets/explore.css";
import { useNavigate } from "react-router-dom";
//Translation
import { useTranslation } from "react-i18next";

function Neighborhood() {
  //Translation
  const { t } = useTranslation("global");
  const Navigate = useNavigate();

  const handleExploreClick = (neighborhood) => {
    // Save selected neighborhood to localStorage
    localStorage.setItem("selectedNeighborhood", neighborhood);
    console.log(neighborhood)
    // Redirect to the explore page
    Navigate("/explorePage");
  };

  return (
    <div className="MainExplore">
      <div className="header-explore ms-4">
        <h2 className="exp-title-main">{t("ExpNeigh.Title")}</h2>
        <span className="subInExp">{t("ExpNeigh.subTitle")}</span>
      </div>
      <section className="articles">
        <article onClick={() => handleExploreClick("Rockwell")}>
          <div className="article-wrapper">
            <figure>
              <img src="assets/sampleb.jpg" alt="Rockwell" />
            </figure>
            <div className="article-body">
              <h2>Rockwell Center</h2>
              <p>Makati City</p>
              <a href="#" className="explore-main-btn">
                {t("ExpNeigh.Explore")} <span className="sr-only"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <article onClick={() => handleExploreClick("BGC")}>
          <div className="article-wrapper">
            <figure>
              <img src="assets/sampleb1.jpg" alt="" />
            </figure>
            <div className="article-body">
              <h2>Bonifacio Global City</h2>
              <p>Taguig City</p>
              <a href="#" className="explore-main-btn">
                {t("ExpNeigh.Explore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <article onClick={() => handleExploreClick("Mall of Asia")}>
          <div className="article-wrapper">
            <figure>
              <img src="assets/sampleb2.jpg" alt="" />
            </figure>
            <div className="article-body">
              <h2>Mall of Asia</h2>
              <p>Pasay City</p>
              <a href="#" className="explore-main-btn">
                {t("ExpNeigh.Explore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <article onClick={() => handleExploreClick("Ortigas Center")}>
          <div className="article-wrapper">
            <figure>
              <img src="assets/sampleb3.jpg" alt="" />
            </figure>
            <div className="article-body">
              <h2>Ortigas Center</h2>
              <p>Pasig City</p>
              <a href="#" className="explore-main-btn">
                {t("ExpNeigh.Explore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <article onClick={() => handleExploreClick("Mckinley Hill")}>
          <div className="article-wrapper">
            <figure>
              <img src="assets/sampleb4.jpg" alt="" />
            </figure>
            <div className="article-body">
              <h2>McKinley Hill</h2>
              <p>McKinley Road, Taguig City</p>
              <a href="#" className="explore-main-btn">
                {t("ExpNeigh.Explore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <article onClick={() => handleExploreClick("Century City")}>
          <div className="article-wrapper">
            <figure>
              <img src="assets/sampleb5.jpg" alt="" />
            </figure>
            <div className="article-body">
              <h2>Century City</h2>
              <p>Makati City</p>
              <a href="#" className="explore-main-btn">
                {t("ExpNeigh.Explore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <article onClick={() => handleExploreClick("City land")}>
          <div className="article-wrapper">
            <figure>
              <img src="assets/sampleb6.jpg" alt="" />
            </figure>
            <div className="article-body">
              <h2>City Land</h2>
              <p>Mandaluyong City</p>
              <a href="#" className="explore-main-btn">
                {t("ExpNeigh.Explore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        <article onClick={() => handleExploreClick("Forbes Town")}>
          <div className="article-wrapper l-item">
            <figure>
              <img src="assets/sampleb7.jpg" alt="" />
            </figure>
            <div className="article-body">
              <h2>Forbes Town</h2>
              <p>Taguig City</p>
              <a href="#" className="explore-main-btn">
                {t("ExpNeigh.Explore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Neighborhood;
