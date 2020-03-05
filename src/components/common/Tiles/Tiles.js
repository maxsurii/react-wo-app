import React from "react";
import { Tile } from "carbon-components-react";

export default function Tiles(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        flexWrap: "wrap",
        ...props.style
      }}
    >
      {props.children.map(e => {
        return (
          <Tile
            key={e.key}
            style={{
              margin: "5px",
              width: "300px",
              height: "200px"
            }}
          >
            {e}
          </Tile>
        );
      })}
    </div>
  );
}
