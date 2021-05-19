import "components/DayListItem.scss";
import React from "react";
var classnames = require('classnames/dedupe');

export default function DayListItem(props) {

  let formatSpots = (spots) => {
    if (spots <= 0 || spots === undefined) {
      return `no spots remaining`;
    }
    if (spots === 1) {
      return `1 spot remaining`;
    }

    return `${spots} spots remaining`;

  }
  console.log(formatSpots(props.spots))
  const dayClass = classnames("day-list__item ", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
