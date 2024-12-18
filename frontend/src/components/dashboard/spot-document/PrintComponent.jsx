// import logo from "./../logo.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PrintComponent = ({ children , allInfo}) => {
  const footerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const handlePrint = () => {
      if (footerRef.current) {
        footerRef.current.style.position = "fixed";
        footerRef.current.style.bottom = "0";
        footerRef.current.style.width = "100%";
      }
    };

    window.onbeforeprint = handlePrint;

    return () => {
      window.onbeforeprint = null;
    };
  }, []);

  useEffect(() => {
    // Increment currentPage whenever children change
    setCurrentPage(currentPage + 1);
  }, [children]);

  const printAction = () => {
    window.print();
  };
  return (
    <>
      {/* <button className={"print-preview-button"} onClick={printAction}>
        {"Print Preview"}
      </button> */}
      <div className="page-footer">
        <div>
        <footer ref={footerRef} className="bg-gray-800 text-white" style={{}}>
          <div
            style={{
              border: "1px solid black",
              marginBottom: "5px",
              marginTop: "5px",
            }}
          ></div>
          <div className="">
            <div className="d-flex gap-3 align-item-center">
              <div
                className=""
                style={{ display: "flex", alignItems: "center" }}
              >
                <h5
                  className="text-dark"
                  style={{ fontSize: "12px", paddingLeft: "10px" }}
                >
                  69 Model Town (1st) Behind UIT Office Sri Ganganagar Rajasthan
                  335001
                </h5>
                
              </div>
              <div className="" style={{ marginTop: "" }}>
                <div className="text-end">
                  <Image
                    width={201}
                    height={54}
                    priority
                    className="w50"
                    src="/assets/images/stamp.jpg"
                    alt="1.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
      </div>
      <table className="print-component">
        <thead>
          <tr>
            <th>
              {/* <img src={logo} height={"40px"} width={"40px"} alt="logo" /> */}
              <div >
                {" "}
                {/* common header for all page */}
                <div
                
                  className="col-lg-12 d-flex justify-content-between "
                  style={{
                    width: "95%",
                    color: "black",
                    fontSize: "12px",
                    fontFamily: "arial",
                    marginLeft: "15px",
                  }}
                >
                  <div>
                    <span>{allInfo?.otherInfo[0]?.ReferenceNo}</span>
                  </div>
                  <div>
                    <span>MT Engineer</span>
                  </div>
                  {/* <div>
                    <span>Page No. {currentPage}</span>
                  </div> */}
                </div>
                <div
                  style={{
                    border: "1px solid black",
                    width: "95%",
                    marginLeft: "15px",
                  }}
                  className="mb-1"
                ></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="page">{children}</td>
          </tr>
        </tbody>
        <tfoot className="table-footer" style={{}}>
          <tr>
            <td>
              <div className="page-footer-space"></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default PrintComponent;
