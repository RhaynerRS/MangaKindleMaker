
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import "./index.css"

const options = async (inputValue) => {
  let array = [];
  await axios.get(`https://api.consumet.org/manga/mangadex/${inputValue}`)
  .then((data)=>{
    data.data.results.forEach(item => {
      array.push({ value: item.id, label: item.title })
    });
  });
  return array;
}

export default function SelectInputDynamic(props){
  return(<div style={{marginBottom: "25px", position: "relative", width: "95%"}}>
    <label style={{ zIndex: "1" ,marginLeft: "13px"}}><FontAwesomeIcon  color="#726adc" icon={props.icon} size="xs"/></label>
    <AsyncSelect placeholder="Mangá Name" 
    onChange={(choice)=>props.onChange(choice)}
    styles={{
      control: (baseStyles, state) => ({
        ...baseStyles,
        width: "100%",
        display: "flex",
        backgroundColor: "f0f0f3",
        border: "none",
        boxShadow: "inset -2px -2px 5px #fff,inset 2px 2px 5px #bec8e4;",
        borderRadius: "56px",
    }),
    input: (baseStyles, state)=>({
      ...baseStyles,
      paddingBlock: "10px",
      margin: 0
    }),
    valueContainer: (baseStyles, state) => ({
      ...baseStyles,
      padding: 0,
      paddingLeft: "33px",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      zIndex: "2",
      backgroundColor: "#f0f0f3",
      padding: "8px",
      boxShadow: "-3px -3px 6px #fff, 3px 3px 6px #bec8e4;",
      borderRadius: "8px"
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#f0f0f3",
      cursor: "pointer",
      color:  state.isFocused?"#2979ff": "#000",
      boxShadow: state.isFocused? "inset -2px -2px 3px #fff, inset 2px 2px 3px #bec8e4;": "none",
      padding: "12px 16px",
      borderRadius: "4px"
    })
  }}
  cacheOptions defaultOptions loadOptions={options} /></div>)
}