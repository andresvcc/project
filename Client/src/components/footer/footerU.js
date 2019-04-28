import React from "react";

var style = {
    backgroundColor: "#FFFBF9",
    borderTop: "2px solid #FFDECD",
    padding: "50px",
    position: "fixed",
    left: "0%",
    bottom: "0%",
    height: "100px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%'
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