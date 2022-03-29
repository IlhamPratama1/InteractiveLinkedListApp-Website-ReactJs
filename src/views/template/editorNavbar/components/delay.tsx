import React, { useState, useEffect } from 'react';

type Props = {
  children: React.ReactElement | null,
  waitBeforeShow?: number;
};

const Delayed = ({ children, waitBeforeShow = 1000 }: Props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
      console.log(waitBeforeShow);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return isShown ? children : null;
};

export default Delayed;