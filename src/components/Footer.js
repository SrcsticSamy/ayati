import myLogo from "../assets/my-logo.png";
import githubLogo from "../assets/github.svg";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary min-vw-100 d-flex flex-row position-fixed text-light bottom-0 align-items-center justify-content-between py-2 px-3">
      <div>
        <img
          src={myLogo}
          width="32em"
          alt="AbdAlrhman Samy Logo"
          className="img-fluid"
        />
        <span className="ms-2 text-muted small">by AbdAlrhman, {currentYear}</span>
      </div>

      <a href="https://github.com/AbdAlrhman-Samy/ayat-new" target="_blank" rel="noreferrer">
        <img
          src={githubLogo}
          width="38em"
          alt="Github Logo"
          className="img-fluid bg-light rounded-circle me-3 p-1"
        />
      </a>
    </footer>
  );
}

export default Footer;
