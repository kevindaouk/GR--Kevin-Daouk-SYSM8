function Home() {
  return (
    <div className="home">
      <section className="hero">
        <img
          src="/images/mainpicture.jpg"
          alt="Matbild"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>Mat till din dörr</h1>
          <p>under 30 minuter!</p>
        </div>
      </section>

      <section className="popular-dishes">
        <h2>Populära rätter</h2>
        <div className="dish-list">
          <img
            src="/images/rakpasta.jpg"
            alt="Räkpasta"
            className="dish-image"
          />
          <img
            src="/images/kycklingbulgur.jpg"
            alt="Kyckling med bulgur"
            className="dish-image"
          />
          <img
            src="/images/ryggbiff.jpg"
            alt="Ryggbiff"
            className="dish-image"
          />
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
