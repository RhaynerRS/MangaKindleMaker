import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css"

export default function Input(props) {
  const handleChange = event => {
    props.onChange(event.target.value);
  };

  return (
    <div className="form-group">
        <label><FontAwesomeIcon icon={props.icon} style={{marginLeft: "13px"}} color="#726adc" size="xs"/></label>
        <input className="input-form" type="text" onChange={handleChange} value={props.value} placeholder={props.placeholder}></input>
    </div>
  );
}
