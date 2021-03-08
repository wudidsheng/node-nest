import React from "react";
import ReactDOM from "react-dom";
import "./message.css";

function Message(props: any) {
  return <div className="box">{props.title}</div>;
}
const div = document.createElement("div");
document.body.appendChild(div);
// eslint-disable-next-line react/no-render-return-value
const MessageBox = {
  open: (props: any) => {
    ReactDOM.render(React.createElement(Message, props), div);
  },
  close: () => {
    ReactDOM.unmountComponentAtNode(div);
  },
};

export default MessageBox;
