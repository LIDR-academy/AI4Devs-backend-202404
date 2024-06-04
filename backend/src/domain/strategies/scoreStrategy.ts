interface ScoreStrategy {
  calculate(interviews: any[]): number | null;
}

class DefaultScoreStrategy implements ScoreStrategy {
  calculate(interviews: any[]): number | null {
    if (!interviews.length) return null;
    const totalScore = interviews.reduce(
      (sum, interview) => sum + (interview.score || 0),
      0,
    );
    return totalScore / interviews.length;
  }
}

export { ScoreStrategy, DefaultScoreStrategy };
