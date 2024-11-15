import React from "react";

const ClientHeader = ({ pageName }) => {
  return (
    <div className="flex justify-between">
      <h1>{pageName}</h1>
      <h1>ระบบฐานข้อมูลเพื่อเตือนภัยความยากจน บริเวณจังหวัดชายแดน</h1>
    </div>
  );
};

export default ClientHeader;
