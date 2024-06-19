import { useEffect, useState } from "react";
import { ClaimsHeadingCardsContent ,PrenispectionHeadingCardsContent} from "./DataHeader";

const ClaimsHeadingCards = ({allClaims,regionSearchValue,setSelectedCard}) => {
  

  const [updatedode,setUpdatedCode] = useState([]);
  const [TraversingData,setTraversingData] = useState([]);
  const getCount = (item) => {
    if (String(item.id) === '12'){
      return allClaims.length;
    }
    return allClaims.reduce((count, stat) => {
      if (String(stat.CurrentStatus) === String(item.id)) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  useEffect(()=>{
    if(String(regionSearchValue).toLowerCase().includes('preinspection')){
      setTraversingData(PrenispectionHeadingCardsContent);
    }
    else{
      setTraversingData(ClaimsHeadingCardsContent);
    }
  },[regionSearchValue]);

  useEffect(()=>{

    const getData = ()=>{
      const result =  TraversingData.map((item,index) => (
        <div
          className="col-xs-4 col-sm-2 col-md-6 col-lg-4 col-xl-1"
          key={item.id}
          style={{ padding: "0px" }}
          onClick={()=>setSelectedCard(index+1)}
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
    }
    const temp = getData();
  },[allClaims,TraversingData])

  return (
    <>
      {
      TraversingData.map((item,index) => (
        <div
          className="col-xs-4 col-sm-2 col-md-6 col-lg-4 col-xl-1"
          key={item.id}
          style={{ padding: "0px" }}
          onClick={()=>setSelectedCard(index+1)}
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
      ))
      }
    </>
  );
};

export default ClaimsHeadingCards;
