const prisma = require("../config/db");
const sendRiskNotification = require("../services/notificationService");

exports.createObservation = async (req, res) => {
    try {

        let {
            employeeName,
            employeeId,
            cabNumber,
            driverName,
            routeLocation,
            behaviourObservation,
            riskLevel,
            remarks
        } = req.body;

        // ✅ FIX ENUM ISSUE
        if (riskLevel) {
            riskLevel = riskLevel.toUpperCase();
        }

        let documentUrl = null;

        if (req.file) {
            documentUrl = `/uploads/${req.file.filename}`;
        }

        const observation = await prisma.observation.create({
            data: {
                employeeName,
                employeeId,
                cabNumber,
                driverName,
                routeLocation,
                behaviourObservation,
                riskLevel,
                remarks,
                documentUrl
            }
        });

        await sendRiskNotification(observation);

        res.status(201).json({
            success: true,
            data: observation
        });

    } catch (error) {
        console.error("Controller Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};