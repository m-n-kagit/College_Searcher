import * as reviewService from '../services/review.service.js';
const getUserIdFromReq = (req) => req.user?.userId ?? req.user?.id;
export const postReview = async (req, res) => {
    try {
        const userId = getUserIdFromReq(req);
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const payload = req.body;
        const review = await reviewService.createReview(userId, payload);
        res.status(201).json({ success: true, data: review });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
export const getReview = async (req, res) => {
    try {
        const id = String(req.params?.id ?? '').trim();
        if (!id)
            return res.status(400).json({ success: false, message: 'Missing review id' });
        const review = await reviewService.getReviewById(id);
        if (!review)
            return res.status(404).json({ success: false, message: 'Review not found' });
        res.status(200).json({ success: true, data: review });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
export const removeReview = async (req, res) => {
    try {
        const userId = getUserIdFromReq(req);
        if (!userId)
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        const id = String(req.params?.id ?? '').trim();
        if (!id)
            return res.status(400).json({ success: false, message: 'Missing review id' });
        await reviewService.deleteReview(id, userId);
        res.status(200).json({ success: true, message: 'Review deleted' });
    }
    catch (error) {
        const status = error?.statusCode || 500;
        res.status(status).json({ success: false, message: error?.message ?? 'Server error' });
    }
};
//
//# sourceMappingURL=review.controller.js.map