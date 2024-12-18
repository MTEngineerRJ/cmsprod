import { Dropdown } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import ReportDetails from "./ReportDetails";
import Images from "./Images";
import toast from "react-hot-toast";
import VehicleDetails from "./VehicleDetails";
import Remarks from "./Remarks";
import TableData from "./TableData";

const BaseLayout = ({allInfo}) => {
  const pdfRef = useRef();
 
  const downloadPDF = () => {
    toast.loading("Downloading the word document");
    const input = pdfRef.current;
    const pdf = new jsPDF("p", "mm", "a4", true);

    const generatePage = (pageNumber) => {
      return new Promise((resolve) => {
        html2canvas(input, {
          useCORS: true,
          scale: 2,
          logging: true,
          allowTaint: true,
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 30;

          pdf.addImage(
            imgData,
            "PNG",
            imgX,
            imgY,
            imgWidth * ratio,
            imgHeight * ratio
          );

          if (pageNumber < totalPages) {
            pdf.addPage();
            resolve();
          } else {
            resolve();
          }
        });
      });
      toast.dismiss();
      toast.success("Successfully downloaded!!");
    };

    const totalPages = 3;

    let currentPage = 1;

    const generateAllPages = () => {
      if (currentPage <= totalPages) {
        generatePage(currentPage).then(() => {
          currentPage++;
          generateAllPages();
        });
      } else {
        pdf.save("invoice.pdf");
      }
    };

    generateAllPages();
  };

  const handleExtract = () => {
    toast.loading("Downloading the word document");
    const content = document.getElementById("report-content").innerHTML;
    const blob = new Blob(
      [
        "<!DOCTYPE html><html><head><title>Document</title></head><body>" +
          content +
          "</body></html>",
      ],
      { type: "application/msword" }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "document.doc";
    toast.dismiss();
    toast.success("Successfully downloaded!!");
    link.click();
  };
  return (
    <>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-extract">
            Extract
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleExtract("Word")}>
              Extract to Word
            </Dropdown.Item>
            <Dropdown.Item>
              <button className="btn" onClick={downloadPDF}>
                Extract PDF
              </button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div
        className="container text-dark"
        style={{
          width: "",
          color: "black",
          fontSize: "12px",
          fontFamily: "arial",
        }}
        id="report-content"
        ref={pdfRef}
      >
        <ReportDetails  allInfo={allInfo}/>
        <div
          style={{
            marginBottom: "5px",
            marginTop: "5px",
          }}
        ></div>
        <VehicleDetails allInfo={allInfo} />
        <div
          style={{
            marginBottom: "5px",
            marginTop: "5px",
          }}
        ></div>
        <Remarks allInfo={allInfo} />
        <div
          style={{
            marginBottom: "5px",
            marginTop: "5px",
          }}
        ></div>
        <TableData allInfo={allInfo} />
        <div
          style={{
            marginBottom: "5px",
            marginTop: "5px",
          }}
        ></div>
        <Images allInfo={allInfo} />
      </div>
    </>
  );
};

export default BaseLayout;
