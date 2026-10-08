function Navbar({ currentPage, onNavigate }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          className="brand"
          onClick={() => onNavigate("home")}
        >
          <span className="brand-gold">Rank</span>
          <span>Scope</span>
        </button>

        <nav className="nav-links">
          <button
            className={
              currentPage === "home" ||
              currentPage === "prediction"
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => onNavigate("home")}
          >
            Home
          </button>

          <button
            className={
              currentPage === "about"
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => onNavigate("about")}
          >
            About
          </button>

          <button
            className={
              currentPage === "how-it-works"
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => onNavigate("how-it-works")}
          >
            How It Works
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;