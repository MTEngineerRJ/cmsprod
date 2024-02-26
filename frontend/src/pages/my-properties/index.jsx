import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
// import MyProperties from "../../components/dashboard/my-properties";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Properties" />
    
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
