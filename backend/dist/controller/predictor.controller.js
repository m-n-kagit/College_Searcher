import * as predictorService from '../services/predictor.service.js';
export const getCutoffs = async (req, res) => {
    try {
        const data = await predictorService.getAllCutoffs();
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getPredictions = async (req, res) => {
    try {
        // We expect user data in the body
        const predictions = await predictorService.predictColleges(req.body);
        res.status(200).json({
            success: true,
            count: predictions.length,
            data: predictions
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
//# sourceMappingURL=predictor.controller.js.map