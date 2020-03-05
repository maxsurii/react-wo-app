import React from "react";

import { Loading as LoadingWidget } from "carbon-components-react";

export default function Loading(props) {
  if (props.loading) {
    return <LoadingWidget />;
  } else {
    return props.children;
  }
}

