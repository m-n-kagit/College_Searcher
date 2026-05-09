import * as collegeService from '../services/college.service';
export const getColleges = async (req, res) => {
    try {
        // Note: In routes, we'll validate req.query using our schema
        const result = await collegeService.getAllColleges(req.query);
        res.status(200).json({ success: true, ...result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
export const getCollegeDetails = async (req, res) => {
    try {
        const id = String(req.params?.id ?? '');
        if (!id)
            return res.status(400).json({ success: false, message: 'Missing college id' });
        const college = await collegeService.getCollegeById(id);
        if (!college)
            return res.status(404).json({ success: false, message: 'College not found' });
        res.status(200).json({ success: true, data: college });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
// GET /api/v1/colleges/search?name=...
export const searchColleges = async (req, res) => {
    try {
        const rawName = req.query?.name;
        const name = Array.isArray(rawName) ? String(rawName[0]) : String(rawName ?? '');
        if (!name.trim()) {
            return res.status(400).json({ success: false, message: 'Missing name query parameter' });
        }
        const results = await collegeService.searchColleges(name);
        res.status(200).json({ success: true, data: results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
// GET /api/v1/colleges/:id/courses
export const getCollegeCourses = async (req, res) => {
    try {
        const id = String(req.params?.id ?? '');
        if (!id)
            return res.status(400).json({ success: false, message: 'Missing college id' });
        const courses = await collegeService.getCoursesByCollegeId(id);
        res.status(200).json({ success: true, data: courses });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
// GET /api/v1/colleges/:id/reviews
export const getCollegeReviews = async (req, res) => {
    try {
        const id = String(req.params?.id ?? '');
        if (!id)
            return res.status(400).json({ success: false, message: 'Missing college id' });
        const reviews = await collegeService.getReviewsByCollegeId(id);
        res.status(200).json({ success: true, data: reviews });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
//# sourceMappingURL=college.controller.js.map