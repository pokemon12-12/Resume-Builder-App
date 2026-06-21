const Footer = () => {
  return (
    <footer className="footer-bar mt-5">
      <div className="container-xl py-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-7">
            <p className="mb-1 text-uppercase small text-secondary fw-semibold">
              Assignment details
            </p>
            <p className="mb-1 fw-semibold text-dark">Name: Anish kumar</p>
            <p className="mb-0 text-secondary">
              Email:{" "}
              <a href="mailto:patelanish7872@gmail.com">
                patelanish7872@gmail.com
              </a>
            </p>
          </div>
          <div className="col-md-5 text-md-end">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-dark px-4 py-2 rounded-pill fw-semibold"
            >
              Built for Digital Heroes
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
