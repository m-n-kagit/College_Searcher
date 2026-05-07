import { Request, Response } from 'express';
import * as compareService from '../services/compare.service';

export const handleComparison = async (req: Request, res: Response) => {
  try {
    const { ids } = req.query;
    
    if (!ids || typeof ids !== 'string') {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide college IDs as a comma-separated string" 
      });
    }

    const collegeIds = ids.split(',');
    
    if (collegeIds.length < 2) {
      return res.status(400).json({ 
        success: false, 
        message: "Select at least 2 colleges to compare" 
      });
    }

    const comparisonData = await compareService.compareColleges(collegeIds);
    res.status(200).json({ success: true, data: comparisonData });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};