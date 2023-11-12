import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-center">
      <div>
        &copy; {currentYear} Juho
      </div>
    </div>
  );
}

export default Footer;