import "./Success.css";
import { Link } from "react-router-dom";

export default function Success() {
    return (
        <div className="success-page">
            <div className="success-box">
                <div className="tick">✓</div>

                <h1>Form Submitted Successfully</h1>

                <p>
                    Thank you for submitting the observation.
                </p>

                <Link to="/" className="success-btn">
                    Submit Another Response
                </Link>
            </div>
        </div>
    );
}