import React, { useState } from 'react';

const Tooltip = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div style={{ position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'black', color: 'white', padding: '0.5rem', borderRadius: '4px', zIndex: '999' }}>{content}</div>}
    </div>
  );
};

export default Tooltip;
