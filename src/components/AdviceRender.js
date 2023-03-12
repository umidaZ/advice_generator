import React, { useState, useEffect } from "react";
import classes from "./AdviceRender.module.css";
import dividerDesktop from ".././images/pattern-divider-desktop.svg";
import dividerMobile from ".././images/pattern-divider-mobile.svg";
import axios from "axios";
import icon from ".././images/icon-dice.svg";

const AdviceRender = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const adviceRenderingHandler = async () => {
    setLoading(true);

    await fetch("https://api.adviceslip.com/advice");
    // .then((response) => {
    //   return response.json();
    // })
    // .then((data) => {
    //   setAdvice(data.slip);
    // });
    await axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        setAdvice(response.data.slip);
      })
      .catch((error) => console.log(error));

    setLoading(false);
  };
  useEffect(() => {
    adviceRenderingHandler();
  }, []);
  return (
    <>
      {loading ? (
        <h1> Loading ....</h1>
      ) : (
        <div className={classes.container}>
          <h1>
            Advice <span>#{advice.id}</span>
          </h1>
          <p className="advice">{advice.advice}</p>
          <img
            className={classes.divider_desktop}
            src={dividerDesktop}
            alt="pattern_divider_desktop"
          />
          <img
            className={classes.divider_mobile}
            src={dividerMobile}
            alt="pattern_divider_mobile"
          />

          <button onClick={adviceRenderingHandler}>
            <img className="icon" src={icon} alt="icon" />
          </button>
        </div>
      )}
    </>
  );
};

export default AdviceRender;
