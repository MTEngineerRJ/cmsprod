const convertTimestampToReadableTime = (timestamp) => {
    // Create a new Date object using the timestamp
    const date = new Date(timestamp);

    // Get month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Extract individual components of the date
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const period = date.getHours() < 12 ? "AM" : "PM";

    // Format the time string
    const formattedTime = `${day} ${month} ${year}, ${hours}:${minutes} ${period}`;

    return formattedTime;
  };

  async function getLocationFromCoordinates(latitude, longitude) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.display_name) {
        // Extract the formatted address
        const formattedAddress = data.display_name;
        return formattedAddress;
      } else {
        throw new Error("Failed to retrieve location information.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  }

  module.exports={
    getLocationFromCoordinates,
    convertTimestampToReadableTime
  }