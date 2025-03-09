import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className='absolute bottom-0 left-0 right-0 text-center'>
      <div>
        &copy; {currentYear} Juho
      </div>
    </div>
  );
}

export default Footer;