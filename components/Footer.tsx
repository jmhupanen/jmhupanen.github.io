import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-center">
      <div>
        &copy; Juho Hupanen {currentYear}
      </div>
    </div>
  );
}

export default Footer;