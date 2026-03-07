'use client';

import { useEffect, useState } from 'react';

export default function BlinkingCursor() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return <span style={{ opacity: visible ? 1 : 0 }}>_</span>;
}
