const getAllLabelLinks = (docName, uploadedFiles) => {
  let requiredLinks = [];
  uploadedFiles.map((file, index) => {
    if (String(docName) === String(file.docName)) {
      requiredLinks = file.data;
    }
  });
  return requiredLinks;
};

const getIndex = (docName, fileData) => {
  let index = -1;
  fileData.map((file, idx) => {
    console.log(String(docName) === String(file.docName));
    if (String(docName) === String(file.docName)) {
      index = idx;
    }
  });
  return index;
};

function getFileNameFromUrl(url) {
  const urlObject = new URL(url);
  const pathname = urlObject.pathname;
  const parts = pathname.split("/");
  const filename = parts[parts.length - 1];

  return filename;
}

const location = (setLoc) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLoc(latitude + "," + longitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser");
  }
};

const getFileName = (idx, selectedFile) => {
  let currentIndex = "";
  selectedFile?.map((file, index) => {
    if (file?.index === idx) {
      currentIndex = file?.file;
    }
  });
  return currentIndex;
};

module.exports = {
  getAllLabelLinks,
  getIndex,
  getFileNameFromUrl,
  location,
  getFileName,
};
