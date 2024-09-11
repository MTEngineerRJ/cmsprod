import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import PrivacyPolicy from "../components/dashboard/privacy-policy";

const index = () => {
  return (
    <>
      <Seo pageTitle="Privacy Policy" />
      <PrivacyPolicy />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
