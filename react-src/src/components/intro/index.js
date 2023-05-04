import "./index.css";
import useSound from 'use-sound';
import MangaHarvesto from "../../resourses/MangaHarvesto.mp3"
import { useEffect, useState } from "react";

export default function Intro() {


    setTimeout(()=>{
        document.getElementById("intro").style.display = "none";
        document.getElementById("App").style.backgroundPosition = "calc( 150px ) calc( 100% + 200px )";
        document.getElementById("form").scrollIntoView();
    },5500)
    

    return (
        <div className="intro-container" id="intro">
            <span>Manga Harvest</span>
            <div className="logo is-animetion">
                <span>マ</span>
                <span>ン</span>
                <span>ガ</span>
                <span>収</span>
                <span>穫</span>
            </div>
            <span>見たこ . とのない . マンガ</span>
        </div>
    )
}