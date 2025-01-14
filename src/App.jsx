import React from "react";
import EarningsCalendarWidget from "./components/EarningsCalendarWidget/EarningsCalendarWidget";

function App() {
  return (
    <EarningsCalendarWidget
      customStyle={{
        maxWidth: 800,
        height: 600,
      }}
    />
  );
}

export default App;
