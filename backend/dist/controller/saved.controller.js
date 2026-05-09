import * as savedService from '../services/saved.service';
const getUserIdFromReq = (req) => req.user?.userId ?? req.user?.id;
export const getMySavedItems = async (req, res) => {
    try {
        const userId = getUserIdFromReq(req);
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const colleges = await savedService.getSavedColleges(userId);
        res.status(200).json({ success: true, data: colleges });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
export const addToSaved = async (req, res) => {
    try {
        const userId = getUserIdFromReq(req);
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const collegeId = String(req.params?.collegeId ?? '').trim();
        if (!collegeId)
            return res.status(400).json({ success: false, message: 'Missing collegeId param' });
        await savedService.saveCollege(userId, collegeId);
        res.status(201).json({ success: true, message: 'College saved' });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
export const removeFromSaved = async (req, res) => {
    try {
        const userId = getUserIdFromReq(req);
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const collegeId = String(req.params?.collegeId ?? '').trim();
        if (!collegeId)
            return res.status(400).json({ success: false, message: 'Missing collegeId param' });
        await savedService.unsaveCollege(userId, collegeId);
        res.status(200).json({ success: true, message: 'College removed from saved' });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
//# sourceMappingURL=saved.controller.js.map