import React from 'react';

export function Unique(props) {
    let string = "";
    if (props.data.unique) {
      string += "Unique, ";
    }
    if (props.data.loyal) {
      string += "Loyal";
      if (props.data.tribe == 'M\'arrillian') {
        string += " - M'arrillians or Minions";
      }
      // Battlegear loyality
      if (props.data.loyal != "1") {
        string += " - " + props.data.loyal;
      }
    }
    if (props.data.legendary) {
      string = (string) ? ("Legendary, " + string) : "Legendary";
    }
    string = string.replace(/,\s+$/, "");
    return (
      <span style={{ fontWeight: "Bold" }}>{string}{string && <br />}</span>
    );
}
