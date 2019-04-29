import React from "react";

var style = {
    backgroundColor: "#FFFBF9",
    borderTop: "2px solid #FFDECD",
    padding: "15px",
    position: "relative",
    left: "0%",
    bottom: "0%",
    height: "85px",
    width: "100%",
}

export default function FooterU({ children }) {
    return (
        <div style={style}>
            <div>
                { children }
            </div>
        </div>
    )
}