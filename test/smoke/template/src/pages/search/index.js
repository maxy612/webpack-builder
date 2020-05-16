import React from "react";
import ReactDOM from "react-dom";
import logo from "../../assets/bg-main.png";
import img from "../../assets/tax-all.png";

import styles from "./index.less";

class Search extends React.Component {
  render() {
    return (
      <div className={styles.searchWrapper}>
        search box wrapper
        <img
          src={logo}
          className={styles.searchImg}
        />
        <img src={img} className={styles.searchImg2} />
        <br />
      </div>
    );
  }
}

ReactDOM.render(<Search />, document.querySelector("#app"));
