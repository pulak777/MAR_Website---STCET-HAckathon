import React from "react";
import Typist from "react-typist";


export default function HomePage() {
  return (
    <div className=" " id="Home">
      <div className="container" id="MAR">
        <Typist className="MAR1">
          <span><h3> MANDATORY ADDITIONAL REQUIREMENTS</h3></span>
          <Typist.Backspace count={40} delay={200} />
          <span><h1>MAR - Simplified</h1></span>
        </Typist>
      </div>
      <div id="features">
        
      </div>
    </div>
  );
}
