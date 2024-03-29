import React from "react";

export default function Button(props) {
  return (
    <button
      className={`uppercase ${props.text_clr} ${props.bg_clr} 
      ${props.px ? props.px : "px-[30px]"} ${props.py ? props.py : "py-sm"} 
      rounded-lg border-none cursor-pointer focus:outline-none shadow-md
      hover:opacity-80 transition-opacity duration-300 ease-in-out`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
