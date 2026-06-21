const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary ">
        <div className="container-fluid">
          <a className="navbar-brand">Resume Builder</a>
          <form className="d-flex" role="search">

            <a href="#"></a>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
