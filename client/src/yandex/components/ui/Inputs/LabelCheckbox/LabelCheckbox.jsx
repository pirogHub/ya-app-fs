
import "./LabelCheckbox.scss"

const LabelCheckbox = ({ label }) => {

    return (
        <div className="LabelCheckbox">
            <label htmlFor="checkbox" >Квартиры от</label>
            <input id="checkbox" className="form-check-input me-10" type="checkbox" />
        </div>
    )
}

export default LabelCheckbox