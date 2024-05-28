import { useEffect, useState } from "react";
import SingleChatBoxReply from "./SingleChatBoxReplay";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const ChatboxContent = ({ leadId, finalDisable }) => {
  const [comment, setComment] = useState("");

  const [allComments, setAllComments] = useState([]);

  const [change, setChange] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setComment("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    axios
      .get("/api/getAllComments", {
        headers: {
          Authorization: `Bearer ${userInfo[0].token}`,
        },
        params: {
          leadId: leadId,
        },
      })
      .then((res) => {
        toast.dismiss();
        setAllComments(res.data.data.results);
      })
      .catch((err) => {
        toast.dismiss();
      });
    setChange(false);
  }, [change]);

  const addComment = (event) => {
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const payload = {
      LeadID: Number(leadId),
      Comment: comment,
      UserName: userInfo[0]?.Username,
    };

    toast.loading("Adding comment!!", {
      className: "toast-loading-message",
    });
    axios
      .post("/api/addComment", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0].token}`,
        },
      })
      .then(() => {
        toast.dismiss();
        toast.success("Successfully added the comment!", {
          className: "toast-loading-message",
        });
      })
      .catch((err) => {
        toast.dismiss();
        toast.error("Try Again!!", {
          className: "toast-loading-message",
        });
      });
    setComment("");
    setChange(true);
  };
  return (
    <>
      <div className="mi_text mt-2">
        <div className="message_input">
          <form className="form-inline position-relative">
            <textarea
              className="form-control"
              placeholder="Enter Comment..."
              cols="40"
              rows="3"
              wrap="hard"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button
              className="btn btn-color w-100 mt-3"
              disabled={finalDisable}
              onClick={(e) => addComment(e)}
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
      <div
        className="inbox_chatting_box mt-2"
        style={{ border: "1px solid #f2f2f2", borderRadius: "5px" }}
      >
        <ul className="chatting_content">
          <SingleChatBoxReply allComments={allComments} />
        </ul>
      </div>
    </>
  );
};

export default ChatboxContent;
