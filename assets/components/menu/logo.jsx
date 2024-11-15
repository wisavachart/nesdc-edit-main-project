import React from "react";
// import logo from "/public/logo/LogoThai.png";
const Logo = () => {
  return (
    <div className="flex items-center">
      <img className="h-[72px] check" src={logo} alt="" />
      <div className="flex flex-col items-start">
        <h6>สำนักงานสภาพัฒนาการเศรษฐกิจ</h6>
        <h6>และสังคมแห่งชาติ</h6>
      </div>
    </div>
  );
};

export default Logo;
