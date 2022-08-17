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
          <h2 className={styles.title__left}>Quản lý tài khoản</h2>
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
          <iframe
            width="538"
            height="329"
            seamless
            frameborder="0"
            scrolling="no"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT5RAIfDRSfvmCHN6MAAMrg6NVwAygdSKZGZHGNl-khkJ8uzkWORP5jYXE9E-FsIHCgagFFcinQKpOe/pubchart?oid=723021633&amp;format=interactive"
          ></iframe>
          <iframe
            width="531"
            height="329"
            seamless
            frameborder="0"
            scrolling="no"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT5RAIfDRSfvmCHN6MAAMrg6NVwAygdSKZGZHGNl-khkJ8uzkWORP5jYXE9E-FsIHCgagFFcinQKpOe/pubchart?oid=1771922923&amp;format=interactive"
          ></iframe>
        </div>
        <div className={styles.chart}>
          <iframe
            width="1180"
            height="371"
            seamless
            frameborder="0"
            scrolling="no"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vT5RAIfDRSfvmCHN6MAAMrg6NVwAygdSKZGZHGNl-khkJ8uzkWORP5jYXE9E-FsIHCgagFFcinQKpOe/pubchart?oid=26099282&amp;format=interactive"
          ></iframe>
        </div>
      </div>
    </>
  );
  // const { ready, gapi, authorized, error } = useAnalyticsApi();
  // if (error) {
  //   console.error(error);
  // }
  // const authorize = useAuthorize(gapi, {
  //   clientId:
  //     "67772401711-q8r4726ido6n07e20hacno6fo7b7llar.apps.googleusercontent.com",
  //   container: "authorize-container-id",
  // });
  // return (
  //   <div>
  //     {!error &&
  //       (ready && !!gapi ? (
  //         <>
  //           <div>✔️ Loaded and ready to use!</div>
  //           {authorized && <div>☀️ Logged into Google Analytics!</div>}
  //           {!authorized && <div>🔐 Not logged into Google Analytics</div>}
  //         </>
  //       ) : (
  //         <div>⌛ Loading...</div>
  //       ))}
  //     {error && (
  //       <div>
  //         <div style={{ fontSize: "120%" }}>❌ Error</div>
  //         <hr style={{ border: 0, borderTop: "solid 1px rosybrown" }} />
  //         <p>{error.toString()}</p>
  //         <p>See the console for more information.</p>
  //       </div>
  //     )}
  //   </div>
  // );
}

export default Dashboard;
