import Image from "next/image";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";
import Form from "./Form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const Index = () => {
  const [modalIsOpenError, setModalIsOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const closeErrorModal = () => {
    setModalIsOpenError(false);
    location.reload(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    router.push("/");
  };

  useEffect(() => {
    let userData = {};
    userData = JSON.parse(localStorage.getItem("userInfo"));
   let info = userData?.length > 0 ? userData[0] : {};
    if (info?.Token) {
      router.push("/my-dashboard");
    }
  }, []);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      {/* <BreadCrumbBanner /> */}

      {/* <!-- Our LogIn Register --> */}
      <section className="our-log bgc-fa mt100 mb100">
        <div className="container">
          <div className="row p-3" style={{ backgroundColor: "light" }}>
            <div className="col-sm-12 col-lg-6">
              <div className="login_form  inner_page">
                <Image
                  width={364}
                  height={278}
                  className="img-circle-rounded w100"
                  src="/assets/images/Claim_Logo.jpg"
                  alt="fp1.jpg"
                />
                {/* <Form /> */}
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="login_form  inner_page">
                <Form
                  setModalIsOpen={setModalIsOpen}
                  setModalIsOpenError={setModalIsOpenError}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalIsOpen && (
        <div className="modal">
          <div
            className="modal-content"
            style={{ borderColor: "green", width: "20%" }}
          >
            <h3 className="text-center" style={{ color: "green" }}>
              Success
            </h3>
            <div style={{ borderWidth: "2px", borderColor: "green" }}>
              <br />
            </div>
            <h5 className="text-center">Successfully logged in</h5>
            <div
              className="text-center"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <button
                className="btn w-35 btn-white"
                onClick={() => closeModal()}
                style={{ borderColor: "green", color: "green" }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}

      {modalIsOpenError && (
        <div className="modal">
          <div
            className="modal-content"
            style={{ borderColor: "#2e008b", width: "20%" }}
          >
            <h4 className="text-center mb-1" style={{ color: "red" }}>
              Error
            </h4>
            <div style={{ borderWidth: "2px", borderColor: "red" }}>
              <br />
            </div>
            <h5 className="text-center mb-3">{errorMessage}</h5>
            <div
              className="text-center"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <button
                className="btn w-35 btn-color"
                onClick={() => closeErrorModal()}
                style={{}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Our Footer --> */}
      {/* <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section> */}

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default Index;
