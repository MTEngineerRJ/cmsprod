import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import { convertTimestampToReadableTime,getLocationFromCoordinates } from "./functions/VideoViewFormFunctions";

const Video = ({ videos }) => {
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);

  const [noOfImages, setNoOfImages] = useState(2);

  const [allLocations, setAllLocations] = useState([]);

  const handleCaptureSnapshot = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas not initialized.");
      return;
    }

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const snapshotImage = canvas.toDataURL("image/png");
    setCapturedImages((prevImages) => [...prevImages, snapshotImage]);
    setPopupContent("Snapshot captured successfully!");
    setShowPopup(true);
  };

  const handleSelectedVudeo = (id) => {
    setSelectedVideo(id);
    setOpen(true);
  };

  const handleGeneratePDF = () => {
    if (!capturedImages || capturedImages.length === 0) {
      alert("First, please click the snapshots!!");
    } else {
      const pdf = new jsPDF();

      const imagesPerPage = noOfImages; // Number of images to display per page
      let pageIndex = 1;

      capturedImages.forEach((image, index) => {
        if (index % imagesPerPage === 0 && index > 0) {
          pdf.addPage();
          pageIndex++;
        }

        const xOffset = (index % 2) * 100 + 10;
        const yOffset = (Math.floor(index / 2) % 2) * 100 + 10;

        pdf.addImage(image, "PNG", xOffset, yOffset, 90, 80);
      });

      // Save PDF
      pdf.save(`${videos[selectedVideo].name}_snapshots.pdf`);

      // Show custom popup
      setPopupContent("PDF downloaded successfully!");
      setShowPopup(true);

      setCapturedImages([]);
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const locationsPromises = videos.map((video) =>
        getLocationFromCoordinates(video.latitude, video.longitude)
      );

      try {
        const resolvedLocations = await Promise.all(locationsPromises);
        setAllLocations(resolvedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [videos]);

  return (
    <>
      <div className="faq_according row">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Videos</h4>
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="headingSix"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body bgc-f6">
                <div className="row">
                  <div className="col-lg-4 text-start mb-2">
                    <table>
                      <tr>
                        <th
                          style={{
                            border: "1px solid black",
                            padding: "10px",
                            minWidth: "25%", // Adjust the minimum width as needed
                            width: "25%",
                          }}
                        >
                          Video Id
                        </th>
                        <th
                          style={{ border: "1px solid black", padding: "10px" }}
                        >
                          Video Name
                        </th>
                        <th
                          style={{ border: "1px solid black", padding: "10px" }}
                        >
                          Uploaded At
                        </th>
                      </tr>

                      {videos?.map((video, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "10px",
                            }}
                          >
                            {index}
                          </td>
                          <td
                            onClick={() => handleSelectedVudeo(index)}
                            style={{
                              border: "1px solid black",
                              padding: "10px",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >
                            {video.name}
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "10px",
                            }}
                          >
                            {convertTimestampToReadableTime(video?.Timestamp)}
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                  <div className="col-lg-7">
                    <div className="row">
                      <div className="container">
                        <div className="property_video">
                          {/* Video container */}
                          <div
                            className={`thumb ${open ? "video-container" : ""}`}
                          >
                            {open ? (
                              <>
                                <video
                                  ref={videoRef}
                                  width={492}
                                  height={190}
                                  controls
                                  autoPlay
                                  muted
                                  // onEnded={handleVideoEnded}
                                  // onPause={handleVideoPause}
                                  crossOrigin="anonymous"
                                >
                                  <source
                                    src={videos[selectedVideo]?.url}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                                <canvas
                                  ref={canvasRef}
                                  style={{ display: "none" }}
                                ></canvas>
                              </>
                            ) : videos.length <= 0 ? (
                              <p>No Videos Found !!</p>
                            ) : (
                              <>
                                <Image
                                  width={492}
                                  height={190}
                                  className="pro_img w100 w-100 cover"
                                  src="/assets/images/background/7.jpg"
                                  alt="7.jpg"
                                />
                                <div className="overlay_icon">
                                  <div
                                    onClick={() => setOpen(!open)}
                                    role="button"
                                    className="video_popup_btn red popup-youtube"
                                  >
                                    <span className="flaticon-play"></span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {open && (
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <button
                            className="btn btn-thm m-1"
                            onClick={handleCaptureSnapshot}
                          >
                            Capture
                          </button>
                          <select
                            onChange={(e) => setNoOfImages(e.target.value)}
                          >
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                          </select>
                          <button
                            className="btn btn-thm m-1"
                            onClick={handleGeneratePDF}
                          >
                            Generate Pdf
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;
