const Navbar = () => {
  return (
    <header className="site-navbar sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-xl">
          <a className="navbar-brand fw-bold letter-spacing" href="#">
            ResumeForge
          </a>
          <div className="ms-auto d-flex align-items-center gap-2">
            <span className="badge rounded-pill text-bg-light text-dark fw-medium">
              ATS-ready builder
            </span>
            <span className="small text-white-50 d-none d-md-inline">
              Auto-saves locally
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
