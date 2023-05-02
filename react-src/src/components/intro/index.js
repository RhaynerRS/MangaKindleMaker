import "./index.css";
import useSound from 'use-sound';
import MangaHarvesto from "../../resourses/MangaHarvesto.mp3"
import { useEffect, useState } from "react";

export default function Intro() {

    const audio = new Audio(MangaHarvesto);
    audio.loop = false;
    const [playSound, setPlaySound] = useState(false);
    const [play] = useSound(MangaHarvesto);
    setTimeout(()=>{play()},1500)
    

    return (
        <div className="intro-container">
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