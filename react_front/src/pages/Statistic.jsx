import React, { useEffect } from "react";

function Statistic({ setHeaderLinks }) {

  useEffect ( () => {
    setHeaderLinks('/statistic')
  }, [])

  return (
    <div>
        
    </div>

  );
}

export default Statistic;
