const handleCheckboxChange = (setSelectedItems,id, value, checked) => {
    if (checked) {
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        { id, value },
      ]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.id !== id)
      );
    }
  };

  const createStringFromSelectedItems = (selectedItems) => {
    return selectedItems
      .map((item, index) => {
        return `${index + 1}) ${index > 0 ? ` ${item.value}` : item.value}`;
      })
      .join("<br/>");
  };

  const createStringFromSelectedItems2 = (selectedItems) => {
    return selectedItems
      .map((item, index) => {
        return `${item.value},`;
      })
      .join("");
  };

  const handleSelectChange = (e,setType) => {
    setType(e.target.value);
  };

  module.exports={
    handleCheckboxChange,
    createStringFromSelectedItems,
    createStringFromSelectedItems2,
    handleSelectChange
  }


