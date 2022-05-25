import React, { useState } from "react";
import HeaderLeft from "../HeaderLeftComponent/HeaderLeft";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import styles from "./styles/style.module.css";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
  ILoadedEventArgs,
  ChartTheme,
  DataLabel,
  Category,
} from "@syncfusion/ej2-react-charts";

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
  const [primaryxAxis, setfirst] = useState({ valueType: "Category" });
  return (
    <>
      <ScrollToTop />
      <HeaderLeft />
      <div className={styles.manage}>
        <div className={styles.list}>
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
        </div>

        <div className={styles.chart}>
          <ChartComponent id="charts" primaryXAxis={primaryxAxis}>
            <Inject
              services={[LineSeries, Legend, Tooltip, DataLabel, Category]}
            />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={data}
                xName="month"
                yName="sales"
                name="Giải đấu mỗi tháng"
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
