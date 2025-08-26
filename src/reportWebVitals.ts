import { ReportHandler } from "web-vitals";
// onPerfEntry 인자 타입 지정: web-vitals 라이브러리에서 제공하는 ReportHandler 타입을 사용하여 onPerfEntry 인자가 함수임을 명시

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
