import React, { useEffect, useState } from "react";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import { useLocation } from "react-router-dom";
import { useAnalyticsApi, useAuthorize } from "react-use-analytics-api";
import ReactGA from "react-ga";
export let data = [
  { month: "Jan", sales: 35 },
  { month: "Feb", sales: 28 },
  { month: "Mar", sales: 34 },
  { month: "Apr", sales: 32 },
  { month: "May", sales: 40 },
  { month: "Jun", sales: 32 },
  { month: "Jul", sales: 35 },
  { month: "Aug", sales: 55 },
  { month: "Sep", sales: 38 },
  { month: "Oct", sales: 30 },
  { month: "Nov", sales: 25 },
  { month: "Dec", sales: 32 },
];
function Dashboard() {
  const useGaTracker = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
      if (!window.location.href.includes("localhost")) {
        ReactGA.initialize("UA-314149563-x");
      }
      setInitialized(true);
    }, []);

    useEffect(() => {
      if (initialized) {
        ReactGA.pageview(location.pathname + location.search);
      }
    }, [initialized, location]);
  };

  useGaTracker();
  const [primaryxAxis, setfirst] = useState({ valueType: "Category" });

  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.title}>
          <h2 className={styles.title__left}>Thống kê</h2>
        </div>
        {/* <div className={styles.list}>
          <div className={styles.item}>
            <div className={styles.item__top}>
              <div className={styles.img}>
                <img src="/assets/icons/1.png" alt="1" />
              </div>
              <div className={styles.item__text}>
                <h3>179</h3>
                <p>Thành viên mới</p>
              </div>
            </div>
            <div className={styles.item__bot}>
              <img src="/assets/img/homepage/Chart.png" alt="chart" />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item__top}>
              <div className={styles.img}>
                <img src="/assets/icons/3.png" alt="1" />
              </div>
              <div className={styles.item__text}>
                <h3>160.3k</h3>
                <p>Lượt truy cập</p>
              </div>
            </div>
            <div className={styles.item__bot}>
              <img src="/assets/img/homepage/Path.png" alt="chart" />
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item__top}>
              <div className={styles.img}>
                <img src="/assets/icons/2.png" alt="1" />
              </div>
              <div className={styles.item__text}>
                <h3>10k</h3>
                <p>Lượt thích</p>
              </div>
            </div>
            <div className={styles.item__bot}>
              <img src="/assets/img/homepage/Path4.png" alt="chart" />
            </div>
          </div>
        </div> */}

        <div className={styles.chart1}>
          <iframe src="https://app.chartbrew.com/chart/2eaf86b8-5658-4a01-85ab-47a5161ac173/embedded" allowTransparency="true" width="420" height="300" scrolling="no" frameborder="0" className={styles.itemchart}></iframe>
          <iframe src="https://app.chartbrew.com/chart/6c0d0b7a-fcf9-42b0-8f4a-73433e38a90d/embedded" allowTransparency="true" width="700" height="300" scrolling="no" frameborder="0" className={styles.itemchart}></iframe>
          {/* <iframe src="https://app.chartbrew.com/chart/034b2fcf-238d-4cc8-8144-124cabe0b82e/embedded" allowTransparency="true" width="700" height="300" scrolling="no" frameborder="0" style="background-color: #ffffff"></iframe> */}
        </div>
        <div className={styles.chart}>
        <iframe src="https://app.chartbrew.com/chart/84e5c586-6735-4774-b86c-b0791a6db85a/embedded" allowTransparency="true" width="100%" height="300" scrolling="no" frameborder="0" className={styles.itemchart}></iframe>
          <iframe src="https://app.chartbrew.com/chart/2cc045f0-7c20-49a1-a94b-f8868d2af116/embedded" allowTransparency="true" width="100%" height="300" scrolling="no" frameborder="0" className={styles.itemchart}></iframe>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
