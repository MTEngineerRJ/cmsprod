
import RCData from "./CreatListing";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const Index = ({leadId}) => {
  const [vehicleDetails,setDriverDetails]=useState({});

  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(
    Date.now()
  );

  const router = useRouter();

  useEffect(() => {
    const activityHandler = () => {
      setLastActivityTimestamp(Date.now());
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", activityHandler);
    window.addEventListener("keydown", activityHandler);
    window.addEventListener("click", activityHandler);

    // Cleanup event listeners when the component is unmounted
    return () => {
      window.removeEventListener("mousemove", activityHandler);
      window.removeEventListener("keydown", activityHandler);
      window.removeEventListener("click", activityHandler);
    };
  }, []);

  useEffect(() => {
    const inactivityCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTimestamp;
      if (timeSinceLastActivity > 100000) {
        localStorage.removeItem("userInfo");
        router.push("/login");
      }
    }, 60000);
    return () => clearInterval(inactivityCheckInterval);
  }, [lastActivityTimestamp]);

 
  useEffect(() => {

    const url = window.location.pathname;
    const leadId = url.split("/rc-document/")[1];
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    toast.loading("Fetching rc Details!!", {
      // position: toast.POSITION.BOTTOM_LEFT,
      className: "toast-loading-message",
    });
    axios
      .get("/api/getSpecificVehicleDetails", {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
        params: {
          LeadId: leadId,
        },
      })
      .then((res) => {
        toast.dismiss()
        toast.success("Successfully fetched !", {
          // position: toast.POSITION.BOTTOM_LEFT,
          className: "toast-loading-message",
        });
       
        setDriverDetails(res.data.data.vehicleDetails);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Got error while fetching details!");
      });
    },[]);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      {/* <Header /> */}

      {/* <!--  Mobile Menu --> */}
      {/* <MobileMenu /> */}

      {/* <!-- Modal --> */}
      {/* <PopupSignInUp /> */}
      {/* <!-- Our Error Page --> */}
      <section className="" style={{ paddingTop: "10px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* <ErrorPageContent allInfo={allInfo} /> */}
              <RCData vehicleDetails = {vehicleDetails} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
