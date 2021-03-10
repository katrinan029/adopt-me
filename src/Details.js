import React from "react";

export const Details = (props) => {
  return (
    <pre>
      <code>{JSON.stringify(props, null, 4)}</code>
    </pre>
  );
};

export default Details;
