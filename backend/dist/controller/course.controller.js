import * as courseService from '../services/course.service';
const getIdFromParams = (req) => String(req.params?.id ?? '').trim();
export const getCourseDetails = async (req, res) => {
    try {
        const id = getIdFromParams(req);
        if (!id)
            return res.status(400).json({ success: false, message: 'Missing course id' });
        const data = await courseService.getCourseById(id);
        if (!data)
            return res.status(404).json({ success: false, message: 'Course not found' });
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
export const getPlacements = async (req, res) => {
    try {
        const id = getIdFromParams(req);
        if (!id)
            return res.status(400).json({ success: false, message: 'Missing course id' });
        const data = await courseService.getCoursePlacements(id);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
export const getReviews = async (req, res) => {
    try {
        const id = getIdFromParams(req);
        if (!id)
            return res.status(400).json({ success: false, message: 'Missing course id' });
        const data = await courseService.getCourseReviews(id);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
export const getCutoffs = async (req, res) => {
    try {
        const id = getIdFromParams(req);
        if (!id)
            return res.status(400).json({ success: false, message: 'Missing course id' });
        const data = await courseService.getCourseCutoffs(id);
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
// ...existing
//# sourceMappingURL=course.controller.js.map