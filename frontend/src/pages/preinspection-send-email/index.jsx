import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import SendMail from "../../components/dashboard/send-mail";

const index = () => {
  return (
    <>
      <Seo pageTitle="Send Mails" />
      <SendMail />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
