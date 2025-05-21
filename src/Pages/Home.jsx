import ryggbiffImg from "../images/ryggbiff.jpg";
import rakpastaImg from "../images/rakpasta.jpg";
import kycklingbulgurImg from "../images/kycklingbulgur.jpg";
import mainImage from "../images/mainpicture.jpg";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <img src={mainImage} alt="Matbild" className="hero-image" />
        <div className="hero-text">
          <h1>Mat till din dörr</h1>
          <p>under 30 minuter!</p>
        </div>
      </section>

      <section className="popular-dishes">
        <h2>Populära rätter</h2>
        <div className="dish-list">
          <img src={rakpastaImg} alt="Räkpasta" className="dish-image" />
          <img
            src={kycklingbulgurImg}
            alt="Kyckling med bulgur"
            className="dish-image"
          />
          <img src={ryggbiffImg} alt="Ryggbiff" className="dish-image" />
        </div>
      </section>

      <div className="menu-button-wrapper">
        <a href="/menu" className="menu-button">
          Gå till menyn
        </a>
      </div>
    </div>
  );
}

export default Home;
