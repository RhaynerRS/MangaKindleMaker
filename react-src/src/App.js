import { useEffect } from 'react'
import SelectInputDynamic from './components/select-input-dynamic'
import * as iconSolid from "@fortawesome/free-solid-svg-icons";
import Input from './components/input'
import './App.css';
import { useState } from "react";
import { Button , ProgressCircular } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import axios from "axios";
import { filesystem } from "@neutralinojs/lib"
import SelectInput from './components/select';
import Intro from './components/intro';

function App() {
  const [MangaId, SetMangaId] = useState("");
  const [MangaVolume, SetMangaVolume] = useState("");
  const [Author, SetAuthor] = useState("");
  const [MangaCover, SetMangaCover] = useState("");

  let loading = 'none';

  async function GenerateMangaVolume() {
    loading = 'block';
    axios.post("http://34.207.109.98:3000/api/mangas/generate-volume",{
      id: MangaId.value,
      volume: MangaVolume.value,
      author: Author,
      cover: MangaCover
    },
    {
      headers: { 'Content-Type': 'application/json',
                  'apikey': 'dasda'}
    }).then(()=>{
      loading="none"
    })
  }

  setTimeout(()=>{
    document.getElementById("form").scrollIntoView({behavior: "smooth"});
  }, 4000)

  return (
    <div className="App" id="App">
    <Intro />
    <div className="form" id='form'>
      <div className="signup-form" >
        <h2 className="form-title">Enhance your manga</h2>
        <SelectInputDynamic onChange={SetMangaId} icon={iconSolid.faBook} />
        <SelectInput name="teste" mangaId={MangaId?.value} onChange={SetMangaVolume} icon={iconSolid.faBookmark} />
        <Input placeholder="Author" icon={iconSolid.faUser} value={Author} onChange={SetAuthor} />
        <Input placeholder="Mangá Cover" icon={iconSolid.faImage} value={MangaCover} onChange={SetMangaCover} />
        <div style={{display: 'flex'}}>
          <Button style={{ width: '55%', padding: '10px 15px' }} bgColor='#f0f0f3' onClick={GenerateMangaVolume} rounded>Generate Volume</Button>
          <ProgressCircular indeterminate color='var(--primary)' style={{ marginLeft: '15px'}}/>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;