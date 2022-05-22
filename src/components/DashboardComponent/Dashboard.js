import React from "react";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
function Dashboard() {
  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      <div className={styles.manage}>
          <div className={styles.item}>
              
          </div>
      </div>
    </>
  );
}

export default Dashboard;
