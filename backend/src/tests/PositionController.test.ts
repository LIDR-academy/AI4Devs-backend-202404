import request from 'supertest';
import app from '../index';
import PositionService from '../application/services/PositionServices'

// Mock the PositionService to control its behavior in tests
jest.mock('../application/services/PositionServices');

describe('PositionController', () => {
  describe('GET /position/:id/candidates', () => {
    it('should return 200 and a list of candidates for a valid position id', async () => {
      const mockCandidates = [
        { fullName: 'John Doe', currentInterviewStep: 'Screening', averageScore: 85 },
        { fullName: 'Jane Smith', currentInterviewStep: 'Technical Interview', averageScore: 90 }
      ];

      // Mock the service method to resolve with mock data
      PositionService.getCandidatesForPosition = jest.fn().mockResolvedValue(mockCandidates);

      const response = await request(app).get('/position/1/candidates');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCandidates);
      expect(PositionService.getCandidatesForPosition).toHaveBeenCalledWith(1);
    });

    it('should return 404 when no candidates are found for the position id', async () => {
      // Mock the service method to throw an error
      PositionService.getCandidatesForPosition = jest.fn().mockImplementation(() => {
        throw new Error('No candidates found for this position');
      });

      const response = await request(app).get('/position/999/candidates');

      expect(response.status).toBe(404);
      expect(response.text).toContain('No candidates found for this position');
    });

    it('should handle unexpected errors gracefully', async () => {
      // Mock the service method to throw a generic error
      PositionService.getCandidatesForPosition = jest.fn().mockImplementation(() => {
        throw new Error('Internal server error');
      });

      const response = await request(app).get('/position/2/candidates');

      expect(response.status).toBe(500);
      expect(response.text).toContain('Internal server error');
    });
  });
});
