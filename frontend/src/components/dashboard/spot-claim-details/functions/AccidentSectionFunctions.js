const closeFunction = (setEditCase_03, setisUpdateVehicleLoading) => {
  setEditCase_03(false);
  setisUpdateVehicleLoading(false);
};

const setDate = (newDate, settingFunc) => {
  const dateObj = new Date(newDate);
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  settingFunc(formattedDate);
};

const formatTime = (time24) => {
  if (!time24) return "";
  let [hours, minutes] = time24?.split(":");
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  if (hours == 0) {
    hours = 12;
  }

  return `${hours}:${minutes} ${period}`;
};

function convertDateFormat(inputDate) {
  const dateParts = inputDate?.split("-");
  if (dateParts?.length === 3) {
    const yyyy = dateParts[0];
    const mm = dateParts[1];
    const dd = dateParts[2];
    const formattedDate = `${dd}-${mm}-${yyyy}`;
    return formattedDate;
  }
  return "";
}

module.exports = {
  closeFunction,
  setDate,
  formatTime,
  convertDateFormat,
};
