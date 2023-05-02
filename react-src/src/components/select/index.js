import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";

export default function SelectInput(props) {
    let totalVolumes = 5;
    const options = [];

    useEffect(() => {
        async function fetchData() {
            if (props.mangaId != undefined) {
                await axios
                    .get(`https://api.consumet.org/manga/mangadex/info/${props.mangaId}`)
                    .then((data) => {
                        let dataFiltered = data.data.chapters.filter(
                            (x) => x.volumeNumber != null
                        );
                        for (let i = 1; i < parseInt(dataFiltered[0].volumeNumber); i++) {
                            options.push({ value: i, label: i });
                        }
                    });
            }
        }
        fetchData();
        console.log(options);
    }, [props.mangaId]);

    return (
        <div style={{ marginBottom: "25px", position: "relative" , width: "95%"}}>
            <label style={{ zIndex: "1", marginLeft: "13px" }}>
                <FontAwesomeIcon icon={props.icon}  color="#726adc" size="xs" />
            </label>
            <Select
                placeholder="Mangá Volume"
                onChange={(choice) => props.onChange(choice)}
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
                    input: (baseStyles, state) => ({
                        ...baseStyles,
                        paddingBlock: "10px",
                        margin: 0,
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
                        borderRadius: "8px",
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: "#f0f0f3",
                        cursor: "pointer",
                        color: state.isFocused ? "#2979ff" : "#000",
                        boxShadow: state.isFocused
                            ? "inset -2px -2px 3px #fff, inset 2px 2px 3px #bec8e4;"
                            : "none",
                        padding: "12px 16px",
                        borderRadius: "4px",
                    }),
                }}
                options={options}
            />
        </div>
    );
}
