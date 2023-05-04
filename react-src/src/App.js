import { useEffect, useState } from "react";
import SelectInputDynamic from "./components/select-input-dynamic";
import * as iconSolid from "@fortawesome/free-solid-svg-icons";
import Input from "./components/input";
import "./App.css";
import { Button, ProgressCircular } from "ui-neumorphism";
import "ui-neumorphism/dist/index.css";
import axios from "axios";
import { filesystem } from "@neutralinojs/lib";
import SelectInput from "./components/select";
import Intro from "./components/intro";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const API_URL = "http://34.207.109.98:3000/api/mangas/";
const DOWNLOAD_URL = `${API_URL}download/`;

const App = () => {
  const [mangaId, setMangaId] = useState("");
  const [mangaVolume, setMangaVolume] = useState("");
  const [author, setAuthor] = useState("");
  const [mangaCover, setMangaCover] = useState("");
  const MySwal = withReactContent(Swal)

  const generateMangaVolume = async () => {
    const spinner = document.querySelector("[role='progressbar']");
    let fileName = ""

    spinner.style.display = "block";

    try {
      const response = await axios.post(API_URL + "generate-volume", {
        id: mangaId.value,
        volume: mangaVolume.value,
        author: author,
        cover: mangaCover,
      }, {
        headers: { "Content-Type": "application/json", apikey: "dasda" },
      });

      fileName = response.data;
      spinner.style.display = "none";

      const downloadResponse = await axios({
        url: DOWNLOAD_URL + fileName,
        method: "GET",
        responseType: "blob",
      });

      MySwal.fire({
        title: <p>('download completed!')</p>,
        icon: "success",
      });

      const href = URL.createObjectURL(downloadResponse.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", `${fileName}.epub`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    } catch (error) {
      console.error(error);
    }
  }

  const scrollToForm = () => {
    setTimeout(() => {
      document.getElementById("form").scrollIntoView({ behavior: "smooth" });
    }, 4000);
  }

  useEffect(() => {
    scrollToForm();
  }, []);

  return (
    <div className="App" id="App">
      <Intro />
      <div className="form" id="form">
        <div className="signup-form">
          <h2 className="form-title">Enhance your manga</h2>
          <SelectInputDynamic onChange={setMangaId} icon={iconSolid.faBook} />
          <SelectInput
            name="teste"
            mangaId={mangaId?.value}
            onChange={setMangaVolume}
            icon={iconSolid.faBookmark}
          />
          <Input
            placeholder="Author"
            icon={iconSolid.faUser}
            value={author}
            onChange={setAuthor}
          />
          <Input
            placeholder="Mangá Cover"
            icon={iconSolid.faImage}
            value={mangaCover}
            onChange={setMangaCover}
          />
          <div style={{ display: "flex" }}>
            <Button
              style={{ width: "55%", padding: "10px 15px" }}
              bgColor="#f0f0f3"
              onClick={generateMangaVolume}
              rounded
            >
              Generate Volume
            </Button>
            <ProgressCircular
              id="spiner"
              indeterminate
              color="var(--primary)"
              style={{ marginLeft: "15px", display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
