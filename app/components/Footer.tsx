import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className='mt-auto mb-3 text-center '>
      <div>
        &copy; {currentYear} Juho
      </div>
    </div>
  );
}

export default Footer;