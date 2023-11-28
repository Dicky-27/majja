import React from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { Icon } from "@iconify/react";
import styled from "styled-components";

function Footer() {
  const router = useRouter();
  var year = moment().format("YYYY");

  const handleScrollTo = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navigateTo = (route, id) => {
    router.push(route, undefined, { shallow: true }).then(() => {
      handleScrollTo(id);
    });
  };

  return (
    <footer>
      <Wrapper>
        <div className="pt-5">
          <div className="row justify-content-center">
            <div className="col-xl-11 col-12">
              <div className="row justify-content-center pt-4">
                <div className="col-lg-5 col-md-3 col-12 p-md-2 px-4 py-2">
                  <img className="footer-img" src="/images/logoputih.png"></img>
                </div>
                <div className="col-lg-2 col-md-3 col-12 p-md-2 px-4 py-2">
                  <h3 className="footer-title">Information</h3>

                  <p
                    className="footer-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigateTo("/", "hero")}
                  >
                    Home
                  </p>

                  <p
                    className="footer-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigateTo("/", "offering")}
                  >
                    About
                  </p>

                  <p
                    className="footer-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/doctor")}
                  >
                    Doctors
                  </p>
                  <p
                    className="footer-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/services")}
                  >
                    Services
                  </p>
                </div>
                <div className="col-lg-2 col-md-3 col-12 p-md-2 px-4 py-2">
                  <h3 className="footer-title">Supports</h3>
                  <p
                    className="footer-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigateTo("/", "findUs")}
                  >
                    Location
                  </p>
                  <p
                    className="footer-text"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/articles")}
                  >
                    Articles
                  </p>
                </div>
                <div className="col-lg-3 col-md-5 col-12 p-md-2 px-4 py-2">
                  <h3 className="footer-title">Connect With Us</h3>
                  <a
                    className="social"
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=100075123987417"
                    rel="noreferrer"
                  >
                    <Icon
                      icon="ic:baseline-facebook"
                      className=""
                      style={{ cursor: "pointer", marginTop: "-20px" }}
                    />
                  </a>
                  <a
                    className="social"
                    target="_blank"
                    href="https://www.instagram.com/majja_kfer/"
                    rel="noreferrer"
                  >
                    <Icon
                      icon="ph:instagram-logo-fill"
                      className=""
                      style={{ cursor: "pointer", marginTop: "-20px" }}
                    />
                  </a>
                  <a
                    className="social"
                    target="_blank"
                    href="https://www.youtube.com/@majjakfer6570/videos"
                    rel="noreferrer"
                  >
                    <Icon
                      icon="ph:youtube-logo-fill"
                      className=""
                      style={{ cursor: "pointer", marginTop: "-20px" }}
                    />
                  </a>
                  <a
                    className="social"
                    target="_blank"
                    href="https://linktr.ee/MAJJAKFER"
                    rel="noreferrer"
                  >
                    <Icon
                      icon="simple-icons:linktree"
                      className=""
                      style={{ cursor: "pointer", marginTop: "-20px" }}
                    />
                  </a>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-12 text-left pb-5">
                  <span className="copyright">
                    © Copyright {year} Majja Klinik
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}

const Wrapper = styled.div`
  @media (max-width: 1120px) {
    padding: 0 5% 0 5%;
  }
`;

export default Footer;
