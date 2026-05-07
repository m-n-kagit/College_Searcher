import { Request, Response } from 'express';
import * as predictorService from '../services/predictor.service';

export const getCutoffs = async (req: Request, res: Response) => {
  try {
    const data = await predictorService.getAllCutoffs();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPredictions = async (req: Request, res: Response) => {
  try {
    // We expect user data in the body
    const predictions = await predictorService.predictColleges(req.body);
    res.status(200).json({ 
      success: true, 
      count: predictions.length,
      data: predictions 
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};