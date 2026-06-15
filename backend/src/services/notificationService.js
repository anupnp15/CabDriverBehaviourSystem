const sendEmail = require("./emailService");

const sendRiskNotification = async (observation) => {
    try {

        const html = `
            <h2>Cab Driver Behaviour Alert</h2>

            <p><b>Employee:</b> ${observation.employeeName}</p>
            <p><b>ID:</b> ${observation.employeeId}</p>
            <p><b>Cab:</b> ${observation.cabNumber}</p>
            <p><b>Driver:</b> ${observation.driverName}</p>
            <p><b>Route:</b> ${observation.routeLocation}</p>
            <p><b>Observation:</b> ${observation.behaviourObservation}</p>
            <p><b>Risk Level:</b> ${observation.riskLevel}</p>
            <p><b>Remarks:</b> ${observation.remarks}</p>
            <p><b>Document:</b> ${observation.documentUrl || "N/A"}</p>
            <p><b>Time:</b> ${observation.createdAt}</p>
        `;

        if (!observation.riskLevel) return;

        if (observation.riskLevel === "LOW") return;

        if (observation.riskLevel === "MODERATE") {
            await sendEmail({
                to: process.env.HR_EMAIL,
                subject: "Moderate Risk Driver Alert",
                html
            });
            return;
        }

        if (observation.riskLevel === "HIGH") {

            await sendEmail({
                to: process.env.HR_EMAIL,
                subject: "[HIGH RISK ALERT] Driver Behaviour",
                html
            });

            await sendEmail({
                to: process.env.PLANT_HEAD_EMAIL,
                subject: "[HIGH RISK ALERT] Driver Behaviour",
                html
            });
        }

    } catch (error) {
        console.error("Notification Error:", error.message);
    }
};

module.exports = sendRiskNotification;