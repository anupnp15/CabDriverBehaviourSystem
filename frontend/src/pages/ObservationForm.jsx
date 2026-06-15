import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ObservationForm.css";

export default function ObservationForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        employeeName: "",
        employeeId: "",
        cabNumber: "",
        driverName: "",
        routeLocation: "",
        behaviourObservation: "",
        riskLevel: "",
        remarks: ""
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.employeeName ||
            !form.employeeId ||
            !form.cabNumber ||
            !form.driverName ||
            !form.routeLocation ||
            !form.behaviourObservation ||
            !form.riskLevel ||
            !file
        ) {
            alert("Please fill all required fields");
            return;
        }

        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            formData.append(key, form[key]);
        });

        formData.append("document", file);

        try {
            await axios.post(
                "https://cabdriver-backend.onrender.com/api/observations/create",
                formData
            );

            navigate("/success");
        } catch (error) {
            console.error(error);
            alert("Submission Failed");
        }
    };

    return (
        <>
            <div className="header">
                <button className="header-btn">
                    Cab Driver Behaviour Observation
                </button>
            </div>

            <div className="form-container">
                <div className="title-section">
                    <h1>Cab Driver Behaviour Observation</h1>
                    <p>
                        Report unsafe behaviour observed during transportation.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="field-box">
                        <div className="field-title">
                            <label>Employee Name</label>
                            <span>* Required</span>
                        </div>

                        <input
                            type="text"
                            name="employeeName"
                            placeholder="Enter Employee Name"
                            value={form.employeeName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-box">
                        <div className="field-title">
                            <label>Employee ID</label>
                            <span>* Required</span>
                        </div>

                        <input
                            type="text"
                            name="employeeId"
                            placeholder="Enter Employee ID"
                            value={form.employeeId}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-box">
                        <div className="field-title">
                            <label>Cab Number</label>
                            <span>* Required</span>
                        </div>

                        <input
                            type="text"
                            name="cabNumber"
                            placeholder="Enter Cab Number"
                            value={form.cabNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-box">
                        <div className="field-title">
                            <label>Driver Name</label>
                            <span>* Required</span>
                        </div>

                        <input
                            type="text"
                            name="driverName"
                            placeholder="Enter Driver Name"
                            value={form.driverName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-box">
                        <div className="field-title">
                            <label>Route Location</label>
                            <span>* Required</span>
                        </div>

                        <input
                            type="text"
                            name="routeLocation"
                            placeholder="Enter Route Location"
                            value={form.routeLocation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-box">
                        <div className="field-title">
                            <label>Behaviour Observation</label>
                            <span>* Required</span>
                        </div>

                        <textarea
                            rows="5"
                            name="behaviourObservation"
                            placeholder="Enter Behaviour Observation"
                            value={form.behaviourObservation}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-box">
                        <div className="field-title">
                            <label>Risk Level</label>
                            <span>* Required</span>
                        </div>

                        <select
                            name="riskLevel"
                            value={form.riskLevel}
                            onChange={handleChange}
                        >
                            <option value="">Select Risk Level</option>
                            <option value="LOW">LOW</option>
                            <option value="MODERATE">MODERATE</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>

                    <div className="field-box">
                        <div className="field-title">
                            <label>Upload Evidence</label>
                            <span>* Required</span>
                        </div>

                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <div className="field-box">
                        <div className="field-title">
                            <label>Remarks</label>
                        </div>

                        <textarea
                            rows="4"
                            name="remarks"
                            placeholder="Enter Remarks"
                            value={form.remarks}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="submit-btn">
                            Submit Report
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}