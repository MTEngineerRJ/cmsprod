import React from "react";

const Remarks = ({allInfo}) => {
  const getCurrentImage = () => {
    const tempData = allInfo?.reportImagesDetails;
    let src =  "";
    let name = "";
    if (tempData?.length > 0) {
      src = tempData[1]?.FileUrl;
      name = tempData[1]?.FileName;
      
    }
    return { src, name };
  };
  return (
    <>
      <div
        className=""
        style={{
          backgroundColor: "white",
          width: "100%",
          border: "2px solid #2e008b",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ width: "75%" }}>
              <div>
                <h4 className="text-primary">Remarks</h4>
                <ul>
                  <li>
                    I/We hereby confirm that the vehicle has been inspected in
                    presence of me/my/our representative.
                  </li>
                  <li>
                    {" "}
                    I/We hereby confirm that the identification details and
                    damages of vehicle as noted/photographs taken by the
                    inspecting officer are correct.
                  </li>
                  <li>Nothing has been hidden/undisclosed.</li>
                  <li>
                    {" "}
                    I/We agreed that Repair/Replacement of dented/crack parts &
                    Repair Painting of dented/scratched panels as per this
                    inspection photographs shall be excluded in event of any
                    claim lodged during the policy period.
                  </li>
                  <li>
                    {" "}
                    I here certify that I have shown the same vehicle which I
                    have to get insured and if later at the time of claim it is
                    found that vehicle shown and accidental are different then
                    no claim is payable to me.
                  </li>
                  <li>
                    I here certify that I will not claim for damages existing in
                    my vehicle whether same are mentioned in report or not if
                    same are seen in photograph taken by the inspector.
                  </li>
                </ul>
              </div>
            </td>
           
          </tr>
        </table>
      </div>
      <div
        className="mt-2"
        style={{
          backgroundColor: "white",
          width: "100%",
          border: "2px solid #2e008b",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <table style={{ width: "100%" }}>
          <tr>
            <td style={{ width: "75%" }}>
              <div>
                <h4 className="text-primary">DECLARATION BY CUSTOMER</h4>
                <p>
                  {" "}
                  I/We hereby declare, confirm and agree that:- The Motor
                  vehicle proposed for insurance after a break in cover has not
                  met with any accident giving rise to any claim by a Third
                  Party for injury or death caused to any person or damages to
                  any property. I have presented the same vehicle for
                  pre-insurance inspection, which I have proposed for insurance.
                  Identification details noted/photographs taken by the
                  inspecting officials are correct. If later on, at any time it
                  is found that inspected vehicle and damaged/accidental
                  vehicles are different then neither any claim nor any
                  indemnity in respect of either own damage or third party death
                  or injury or property damage loss nor any benefit shall be
                  available to me/us. 
                </p>
              </div>
            </td>
            <td style={{ width: "25%", textAlign: "center" }}>
              <div>
                <img
                  width={681}
                  height={239}
                  priority
                  // className="w100"
                  src={getCurrentImage().src}
                  alt={getCurrentImage().name}
                />
                <label> Customer Signature</label>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Remarks;
