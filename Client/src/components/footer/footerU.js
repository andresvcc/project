import React from "react";

var style = {
    backgroundColor: "#FFFBF9",
    borderTop: "1px solid #FFDECD",
    padding: "5px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "150px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '10px',
  height: '15px',
  width: '100%',
}

export default function FooterU({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                { children }
            </div>
        </div>
    )
}