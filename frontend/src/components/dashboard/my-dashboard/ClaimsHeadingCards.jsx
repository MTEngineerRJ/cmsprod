import { useEffect, useState } from "react";
import { ClaimsHeadingCardsContent, PrenispectionHeadingCardsContent } from "./DataHeader";

const ClaimsHeadingCards = ({ allClaims, regionSearchValue, setSelectedCard, fromDate, toDate }) => {
  const [updatedode, setUpdatedCode] = useState([]);
  const [TraversingData, setTraversingData] = useState([]);

  // Helper function to check if a claim is within the date range
  const isWithinDateRange = (claimDate) => {
    if (!fromDate || !toDate) return true; // Include all if no date range selected
    const claimDateObj = new Date(claimDate);
    return claimDateObj >= new Date(fromDate) && claimDateObj <= new Date(toDate);
  };

  // Filter the claims based on both region and date range
  const getCount = (item) => {
    if (String(item.id) === "12") {
      // Count all claims within the date range
      return allClaims.filter((claim) => isWithinDateRange(claim.AddedDate)).length;
    }

    // Count claims matching the CurrentStatus and within the date range
    return allClaims.reduce((count, stat) => {
      if (
        String(stat.CurrentStatus) === String(item.id) &&
        isWithinDateRange(stat.AddedDate)
      ) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  useEffect(() => {
    // Switch between "Preinspection" or other region content
    if (String(regionSearchValue).toLowerCase().includes("preinspection")) {
      setTraversingData(PrenispectionHeadingCardsContent);
    } else {
      setTraversingData(ClaimsHeadingCardsContent);
    }
  }, [regionSearchValue]);

  useEffect(() => {
    const getData = () => {
      // Prepare the content for the current region
      const result = TraversingData.map((item, index) => (
        <div
          className="col-xs-4 col-sm-2 col-md-6 col-lg-4 col-xl-1"
          key={item.id}
          style={{ padding: "0px" }}
          onClick={() => setSelectedCard(index + 1)}
        >
          <div
            className={`ff_one ${item.blockStyle}`}
            style={{ backgroundColor: item.color, marginRight: "5px" }}
          >
            <div className="detais">
              <div className="timer fw-bold" style={{ fontSize: "32px" }}>
                {getCount(item)}
              </div>
              <p
                style={{ fontSize: "12px", color: "black", fontWeight: "bold" }}
              >
                {item.name}
              </p>
            </div>
          </div>
        </div>
      ));
      return result;
    };

    const temp = getData();
  }, [allClaims, TraversingData, fromDate, toDate]);

  return (
    <>
      {TraversingData.map((item) => (
        <div
          className="col-xs-4 col-sm-2 col-md-6 col-lg-4 col-xl-1"
          key={item.id}
          style={{ padding: "0px" }}
          onClick={() => setSelectedCard(item.id)}
        >
          <div
            className={`ff_one ${item.blockStyle}`}
            style={{ backgroundColor: item.color, marginRight: "5px" }}
          >
            <div className="detais">
              <div className="timer fw-bold" style={{ fontSize: "32px" }}>
                {getCount(item)}
              </div>
              <p
                style={{ fontSize: "12px", color: "black", fontWeight: "bold" }}
              >
                {item.name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default ClaimsHeadingCards;
