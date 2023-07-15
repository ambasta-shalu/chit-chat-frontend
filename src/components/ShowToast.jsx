import React from "react";
import "../css/ShowToast.css";

function ShowToast(props) {
  const { data } = props;

  return (
    <div className="show__toast">
      <p>{data}</p>
    </div>
  );
}

export default ShowToast;
