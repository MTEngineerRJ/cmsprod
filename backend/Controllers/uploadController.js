const db = require("../Config/dbConfig");
const generateUniqueToken = require("../Config/generateToken");
const uploadToAWS = require("../Middleware/awsUpload");
const uploadToAWSVideo = require("../Middleware/awsUploadVideo");

const getReportDocument = (req, res) => {
  const LeadId = req.query.leadId;
  const sql = "SELECT * FROM ReportDocuments WHERE LeadId =?";
  db.query(sql, [LeadId], (error, results) => {
    if (error) {
      console.error("Error while fetching the report documents:", error);
      return res
        .status(500)
        .json({ error: "Error inserting data into VehicleDetails." });
    }

    return res.status(200).json({ results });
  });
};


const getReportDocumentsLabels = (req, res) => {
  const LeadId = req.query.leadId;
  //console.log("DcoList",LeadId)
  const sql = "SELECT * FROM DocumentNames WHERE LeadID = ?";
  db.query(sql, [LeadId],  (error, results) => {
    if (error) {
      console.error("Error while fetching the report documents labels:", error);
      return res
        .status(500)
        .json({ error: "Error inserting data into report documents labels:." });
    }

    return res.status(200).json({ results });
  });
};

// const getDocuments = (req, res) => {
//   const LeadId = req.query.LeadId;
//   //console.log("get", LeadId);
//   const sql = "SELECT * FROM DocumentList WHERE LeadId =?";
//   db.query(sql, [LeadId], (err, result) => {
//     if (err) {
//       // console.error(err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }
//     res.send(result);
//   });
// };

const getDocuments = (req, res) => {
  const LeadId = req.query.LeadId;
  //console.log("get", LeadId);
  const sql = "SELECT DocumentName, Photo1 as doc_url, Attribute1 as file_name, Photo1Latitude as latitude, Photo1Longitude as longitude, Photo1Timestamp as timestamp FROM DocumentList WHERE LeadID = ?;";
  
  db.query(sql, [LeadId], (err, result) => {
    if (err) {
      // console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    } else {
      //console.log('Documents result ', result);
    }
    
    // Process the result to group files by DocumentName
    const groupedResult = {};
    result.forEach(doc => {
      const { DocumentName, doc_url, file_name, latitude, longitude, timestamp } = doc;
      if (!groupedResult[DocumentName]) {
        groupedResult[DocumentName] = {
          DocumentName,
          doc_urls: [],
          file_names: [],
          latitudes: [],
          longitudes: [],
          timestamps: []
        };
      }
      //console.log('result',result);
      groupedResult[DocumentName].doc_urls.push(doc_url);
      groupedResult[DocumentName].file_names.push(file_name);
      groupedResult[DocumentName].latitudes.push(latitude);
      groupedResult[DocumentName].longitudes.push(longitude);
      groupedResult[DocumentName].timestamps.push(timestamp);
    });

    // Convert the grouped result to an array
    const processedResult = {
      msg: "OK",
      data: Object.values(groupedResult)
    };
    
    res.send(processedResult);
  });
};

const uploadClaimMedia = (req, res) => {
  const {
    garage,
    fileUrl,
    fileName,
    reportType,
    LeadId,
    isLastChunk,
    uploadedBy,
    file,
  } = req.body;

  uploadToAWS(file, fileName)
    .then((Location) => {
      const insertUploadDetails = `
          INSERT INTO ReportDocuments (
            LeadId,
            FileName,
            FilePath,
            UploadedBy,
            GarageName,
            ReportType
          ) VALUES (
            '${LeadId}',
            '${fileName}',
            '${Location}',
            '${uploadedBy}',
            '${garage}',
            '${reportType}'
          );
        `;

      // Execute the SQL queries individually

      db.query(insertUploadDetails, (error, results) => {
        if (error) {
          console.error("Error inserting data into VehicleDetails:", error);
          return res
            .status(500)
            .json({ error: "Error inserting data into VehicleDetails." });
        }

        return res.status(200).json({ Location });
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};
const uploadDocument = (req, res) => {
  const data = req.body;

  
  const type = data.type;
  const file = data;

  if(!file){
    res.status(500)
    .json({ error: "Error uploading documents ." });
  }
  

      const Location = file.data[0].Location;
      const latitude= Location?.split(",")[0];
      const longitude = Location?.split(",")[1];
      const insertUploadDetails = `
      INSERT INTO DocumentList (
        LeadId,
        DocumentName,
        Photo1,
        Attribute1,
        Photo1Latitude,
        Photo1Longitude,
        Photo1Timestamp
      ) VALUES (
        '${file.leadId}',
        '${file.docName}',
        '${file.data[0].url}',
        '${file.data[0].name}',
        '${latitude}',
        '${longitude}',
        '${file.data[0].Timestamp}'
      );
    `;

      db.query(insertUploadDetails, (error, results) => {
        if (error) {
          console.error("Error inserting data into Upload Details:", error);
          return res
            .status(500)
            .json({ error: "Error inserting data into DocumentDetails." });
        }
        return res.status(200).json({ message: "Data inserted successfully." });
      });

};


const addDocumentLabel = (req,res)=>{
  const {DocumentName , leadId} = req.body;
  
  const insertAddDocument = `
  INSERT INTO DocumentNames (
    DocumentName,
    IsActive,
    LeadID
  ) VALUES (
    '${DocumentName}',
    ${1},
    ${leadId}
  );
`;

//console.log(insertAddDocument)

  db.query(insertAddDocument, (error, results) => {
    if (error) {
      console.error("Error inserting data into DocumentNames:", error);
      return res
        .status(500)
        .json({ error: "Error inserting data into DocumentNames." });
    }
    return res.status(200).json({ message: "Data inserted successfully." });

  });
}

const uploadDocumentV2 = (req, res) => {
  const data = req.body;



  const type = data.type;
  const files = data.data;

  if(!files){
    res.status(500)
    .json({ error: "Error uploading documents ." });
  }
  
  const LeadId = files[0].leadId;

  files?.map((file,index)=>{
    const insideData = file.data;
    const docName = file.docName;

    insideData?.map((tempData,idx)=>{
      const Location = tempData[0]?.location;
      const latitude= Location?.split(",")[0];
      const longitude = Location?.split(",")[1];
      const insertUploadDetails = `
      INSERT INTO DocumentList (
        LeadId,
        DocumentName,
        Photo1,
        Attribute1,
        Photo1Latitude,
        Photo1Longitude,
        Photo1Timestamp
      ) VALUES (
        '${LeadId}',
        '${docName}',
        '${tempData[0].url}',
        '${tempData[0].name}',
        '${latitude}',
        '${longitude}',
        '${tempData[0].time}'
      );
    `;

   
      db.query(insertUploadDetails, (error, results) => {
        if (error) {
          console.error("Error inserting data into Upload Details:", error);
          return res
            .status(500)
            .json({ error: "Error inserting data into DocumentDetails." });
        }
      });
    })
   

  });

  const claimToken = generateUniqueToken();


    const insertTokeDteials =  String(type) === "1" ?  `
      UPDATE ClaimDetails
      SET InsuredToken='${claimToken}'
      WHERE LeadId = ${LeadId};
        ` : String(type) === "2" ?  `
        UPDATE ClaimDetails
        SET ImageToken='${claimToken}'
        WHERE LeadId = ${LeadId};
      `
      :  `
      UPDATE ClaimDetails
      SET VideoToken='${claimToken}'
      WHERE LeadId = ${LeadId};
      `;
  
     
      
    db.query(insertTokeDteials, (error, results) => {
      if (error) {
        console.error("Error updating token in claim Details:", error);
        return res.status(500).json({ error: "Error." });
      }
      return res.status(200).json({ message: "Data inserted successfully." });
    });

  

 
};

const uploadMedia = async (req, res) => {
  try {
    const { file, name } = req.body;
    const filesData = file;
    const nameInfo = name;

    const results = [];

    for (let i = 0; i < filesData.length; i++) {
      const fileData = filesData[i]; // Use a different name for the loop iteration
      const fileName = nameInfo[i];

      // Check if the file data starts with "data:image/"
      if (
        fileData.startsWith("data:image/") ||
        fileData.startsWith("'data:application/pdf")
      ) {
        const data = await uploadToAWS(fileData, fileName);
        results.push(data);
      } else if (fileData.startsWith("data:video/")) {
        const prefixToRemove = "data:video/webm;base64,";
        const dataWithoutPrefix = fileData.substring(prefixToRemove.length);

        const data = await uploadToAWSVideo(dataWithoutPrefix, fileName);
        // const data = await uploadToAWSVideo(fileData, fileName);
        // //console.log('BLOBB',fileData);
        results.push(data);
      } else {
        //console.log(`Unsupported file format for ${fileName}`);
        // Optionally handle the error or skip the file
        continue;
      }
    }
    //console.log("result", results);
    return res.status(200).json({ data: results });
  } catch (error) {
    //console.log("Error log", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyReportUpload = (req, res) => {
  const { leadId, DocumentName,VerifiedBy ,ModifiedDateTime} = req.body;
  const updateVerifyReport = `
    UPDATE ReportDocuments
          SET
          VerifiedBy='${VerifiedBy}',
          IsVerified ='${1}',
          ModifiedDateTime='${ModifiedDateTime}'
          WHERE ReportType ='${DocumentName}' AND LeadId = '${leadId}'
    `;
  db.query(updateVerifyReport, (err, result2) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("Internal Server Error while updating the verified status");
      return;
    }
    // //console.log(result2[0].Token === token);
    res.status(200).send("Successfully Updated!!");
  });
};

module.exports = {
  getReportDocument,
  getDocuments,
  uploadClaimMedia,
  uploadDocument,
  uploadMedia,
  verifyReportUpload,
  uploadDocumentV2,
  getReportDocumentsLabels,
  addDocumentLabel
};
