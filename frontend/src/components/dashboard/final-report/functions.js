export const getMonthsDifference = (givenDate) => {
  // Convert the given date to a JavaScript Date object
  const givenDateTime = new Date(givenDate);

  // Get the current date
  const currentDate = new Date();
  if(givenDateTime.getFullYear()<2000)
   return 0;

  if(givenDateTime.getFullYear() < 2000){
    return 0;
  }
  // Calculate the difference in months
  const monthsDifference =
    (currentDate.getFullYear() - givenDateTime.getFullYear()) * 12 +
    (currentDate.getMonth() - givenDateTime.getMonth());

  return monthsDifference;
};

export const calculateDepreciationsPercenatge = (depreciations, type, age) => {
  let smaller = {};
  depreciations.map((dep, index) => {
    if (
      String(dep.PartType) === String(type) &&
      Number(dep.Age) <= Number(age)
    ) {
      smaller = dep;
    }
  });
  return smaller ? smaller.DepreciationPercentage : 0;
};


