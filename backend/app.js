const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const claimRoutes = require("./Routes/claimRoutes");
const depreciationRoutes = require("./Routes/depreciationRoutes");
const emailRoutes = require("./Routes/emailRoutes");
const finalReportRoutes=require("./Routes/finalReportRoutes");
const labourerRoutes = require("./Routes/labourerRoute");
const loginRoute=require("./Routes/loginRoute");
const newPartsRoute = require("./Routes/newPartsRoute");
const statusRoute=require("./Routes/statusRoute");
const uploadRoute = require("./Routes/uploadRoute");
const vehicleOnlineDetailRoutes = require("./Routes/vehicleOnlineDetailRoutes");
const reportRoutes = require("./Routes/reportRoutes");
const feeReportRoutes = require("./Routes/feereportRoute");
const driverOnlineDetailRoutes=require("./Routes/driverOnlineDetailRoutes");
const misSheetRoutes=require("./Routes/misSheetRoutes");
const insurerRoutes=require("./Routes/InsurerRoute");
const uploadReportDoc = require("./Routes/reportDocumentUpload");
const servicingOfficeRoutes = require("./Routes/servicingOfficeRoutes");
const commentRoute = require("./Routes/commentsRoute");
const multer = require("multer");


const dotenv = require("dotenv").config();
const port = process.env.PORT || 3006;
const app = express();

const storage = multer.memoryStorage(); 
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, 
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Enable CORS for all * origins (adjust as necessary for security)
app.use(cors());


app.use("/claim",claimRoutes);

app.use("/depreciation",depreciationRoutes);

app.use("/email",emailRoutes);

app.use("/finalReport",finalReportRoutes);

app.use("/labourer",labourerRoutes);

app.use("/login",loginRoute);

app.use("/newParts",newPartsRoute);

app.use("/status",statusRoute);

app.use("/upload",uploadRoute);

app.use("/report",reportRoutes);

app.use("/vehicleDetails",vehicleOnlineDetailRoutes);

app.use("/driverDetails",driverOnlineDetailRoutes);

app.use("/report",reportRoutes);

app.use("/fee",feeReportRoutes);

app.use("/mis",misSheetRoutes);

app.use("/Insurers",insurerRoutes);

app.use("/reportDocument",uploadReportDoc);

app.use("/comments",commentRoute)

app.use("/fetch",servicingOfficeRoutes);

app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
