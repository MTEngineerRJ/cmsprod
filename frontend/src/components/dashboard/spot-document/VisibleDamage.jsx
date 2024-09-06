import React, { useEffect, useState } from "react";
import Image from "next/image";

const VisibleDamage = ({ allInfo , spotInfo}) => {
  const [splitText, setSplitText] = useState([]);

  const addVariables = (allInfo, string) => {
    string = string?.replace(
      "**CASSISNUMBER**",
      `<strong>${allInfo?.otherInfo[0]?.ChassisNumber}</strong>`
    );
    string = string?.replace(
      "**POLICYNUMBER**",
      `<strong>${allInfo?.otherInfo[0]?.PolicyNumber}</strong>`
    );
    string = string?.replace(".", "\n");
  
    return string;
  };

  function convertToProperHTML(htmlString) {
    // Create a new DOMParser
    const parser = new DOMParser();
  
    // Parse the HTML string
    const doc = parser.parseFromString(htmlString, "text/html");
  
    // Extract the text content from the parsed document
    let plainText = doc.body.textContent || "";
  
    // Add line breaks after every period (.)
    plainText = plainText.replace(/\./g, "\n");
  
    return plainText;
  }

  const text = convertToProperHTML(
    addVariables(allInfo, allInfo?.summaryReport[0]?.SummaryNotes)
  );
  

  useEffect(() => {
    const regex = /\s(?=\d{2}\s)/g;
    const splitParts = text.split(regex).map((part) => part.trim());
    setSplitText(splitParts);
  }, [text]);





  return (
    <>
      <div className="" style={{ marginTop: "10px" }}>
        <h5 className="text-dark" style={{ color: "black" }}>
          PARTICULARS OF VISIBLE DAMAGES :
        </h5>
        <table style={{ width: "100%" }}>
          <tr>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
                width: "5%",
              }}
            >
              S.No.
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
                width: "47%",
              }}
            >
              Heading
            </th>
            <th
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
                width: "47%",
              }}
            >
              Description
            </th>
          </tr>

          {spotInfo?.SpotReport?.map((field, index) => {
            return (
              true && (
                <>
                  <>
                    <tr>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        {field?.ReportID}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        {field.Headings ? field.Headings : "-"} 
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          paddingRight: "5px",
                        }}
                      >
                        {field.PartDescription ? field.PartDescription : "-"}
                      </td>
                    </tr>
                  </>
                </>
              )
            );
          })}

        </table>
      </div>

      <div>
        

        <span className="text-dark">
          Every care been taken in noting the damages,however if damages found
          any at the time of final survey can be considered if concurrent with
          cause of accident.
          <br /> Thanking you and assuring you of my best services at all times,
        </span>
        <br />
        <br />
        <div
          className="d-flex justify-content-between"
          style={{ marginBottom: "" }}
        >
          <div>
            <span>
              Enclosures :{" "}
              {allInfo?.summaryReport[0]?.Endurance !== "undefined"
                ? allInfo?.summaryReport[0]?.Endurance
                : "--"}
            </span>
          </div>
          <div className="text-end">
{/*             <Image
              width={261}
              height={89}
              priority
              className="w50"
              src="/assets/images/stamp.jpg"
              alt="1.jpg"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default VisibleDamage;
