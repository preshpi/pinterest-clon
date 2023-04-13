import { useState, useEffect } from "react";
import { Popover } from "antd";
import { formatDistanceToNow } from "date-fns";
import { AiOutlineSend } from "react-icons/ai";

const ReplyForm = ({ onReply }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const timestamp = new Date().toLocaleString();
    onReply(name, comment, timestamp);
    setName("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={name}
          placeholder="Enter your name"
          required
          className="bg-none outline-none h-[49px] w-[210px] rounded-[30px] border p-[13px] px-5 text-[#9197A3] text-[16px]"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="border rounded-[30px] outline-none w-[378px] h-[52px] px-3 inline-flex items-center justify-center">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Add a comment"
            className="bg-none outline-none w-[378px] h-[49px] text-[#9197A3] text-[16px]"
          />
          <div className="flex items-center jsutify-center">
            <button
              type="submit"
              className="border rounded-[30px] p-3 bg-blue-600 text-white text-[16px]"
            >
              <AiOutlineSend />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const MyComponent = () => {
  const [comments, setComments] = useState();

  // local Stroage
  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  // local Stroage
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  // handle reply
  const handleReply = (index, name, comment, timestamp) => {
    const updatedComments = [...comments];
    updatedComments[index].replies = updatedComments[index].replies || [];
    updatedComments[index].replies.push({ name, comment, timestamp });
    setComments(updatedComments);
  };

  // handle the submit so it renders on the screen
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const comment = event.target.comment.value;
    const timestamp = new Date();
    const updatedComments = [...comments];
    updatedComments.push({ name, comment, timestamp });
    setComments(updatedComments);
    event.target.reset();
  };

  // handle comment delete
  const handleDelete = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  // Delete reply
  const DeleteRelpy = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.splice(replyIndex, 1);
    setComments(updatedComments);
  };

  // change the time format
  const formatTimestamp = (timestamp) => {
    const formattedTimestamp = new Date(timestamp);
    const now = new Date();
    const distance = formatDistanceToNow(formattedTimestamp, {
      addSuffix: true,
    });

    if (distance === "less than a minute ago") {
      return "just now";
    }

    return distance;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="bg-none outline-none h-[49px] w-[210px] rounded-[30px] border p-[13px] px-5 text-[#9197A3] text-[16px]"
          />
          <div className="border rounded-[30px] outline-none w-[378px] h-[52px] px-3 inline-flex items-center jsutify-center">
            <input
              name="comment"
              type="text"
              required
              placeholder="Add a comment"
              className="bg-none outline-none w-[378px] h-[49px] text-[#9197A3] text-[16px]"
            />
            <div className="flex items-center jsutify-center">
              <button
                type="submit"
                className="border rounded-[30px] p-3 bg-blue-600 text-white text-[16px]"
              >
                <AiOutlineSend />
              </button>
            </div>
          </div>
        </div>
      </form>

      {comments?.map((comment, index) => (
        <div key={index} className="mt-5">
          <p>
            {comment.name} - {comment.comment}
          </p>
          <div className="flex gap-6 mt-1 text-[12px]">
            <p>{formatTimestamp(comment.timestamp)}</p>
            <Popover
              placement="right"
              content={
                <ReplyForm
                  onReply={(name, comment, timestamp) =>
                    handleReply(index, name, comment, timestamp)
                  }
                />
              }
            >
              <button>Reply</button>
            </Popover>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>

          {comment.replies &&
            comment.replies.map((reply, replyIndex) => (
              <div key={replyIndex} style={{ marginLeft: "1rem" }} className="mt-2">
                <p>
                  {reply.name} - {reply.comment}
                </p>
                <div className="flex gap-3 text-[12px]">
                  <p>{formatTimestamp(reply.timestamp)}</p>
                  <button onClick={() => DeleteRelpy(index, replyIndex)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
