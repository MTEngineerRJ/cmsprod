import React from "react";

const Images = ({ allInfo }) => {
  const getAllImages = () => {
    let AllImages = allInfo?.reportImagesDetails;
    let updatedImagesArray = AllImages?.filter((image)=> image.SeqNo !== 0);
    updatedImagesArray?.sort((a, b) => a.SeqNo - b.SeqNo);
    let refactoredArray = updatedImagesArray?.slice(2);
    return refactoredArray;
  };
  return (
    <>
      <div
        className="mt-3"
        style={{
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <hr />
        <hr />
        <div>
          <h4
            className="text-primary"
            style={{ textDecoration: "underline", fontSize: "22px" }}
          >
            Uploaded Images :-
          </h4>

          <div className="container">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {getAllImages()?.map((image, index) => {
                return (
                  <>
                    <div key={index}>
                      <img
                        width={361}
                        height={239}
                        priority
                        className="w50"
                        src={image.FileUrl}
                        alt={decodeURIComponent(image.FileName)}
                      />
                      <br />
                      <label htmlFor="" className="fw-bold text-primary">
                        Image Title :
                      </label>
                      <span className="text-danger">
                        {" "}
                        {decodeURIComponent(image.FileName)}
                      </span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <hr />
    </>
  );
};

export default Images;
