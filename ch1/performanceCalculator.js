class PerformanceCaculator {
  constructor(aPerformance, aPlay) {
    this.performances = aPerformance;
    this.play = aPlay;
  }
  get amount() {
    throw new Error(`서브클래스 전용 메서드입니다.`);
  }
  get volumeCredits() {
    return Math.max(this.performances.audience - 30, 0);
  }
}

class TragedyCaculator extends PerformanceCaculator {
  get amount() {
    let result = 40000;
    if (this.performances.audience > 30)
      result += 1000 * (this.performances.audience - 30);
    return result;
  }
}

class ComdeyCaculator extends PerformanceCaculator {
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performances.audience / 5);
  }
  get amount() {
    let result = 30000;
    if (this.performances.audience > 20)
      result += 10000 + 500 * (this.performances.audience - 20);
    result += 300 * this.performances.audience;
    return result;
  }
}

const createPerformanceCalculator = (aPerformance, aPlay) => {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCaculator(aPerformance, aPlay);
    case 'comedy':
      return new ComdeyCaculator(aPerformance, aPlay);
    default:
      return new PerformanceCaculator(aPerformance, aPlay);
  }
};

export default createPerformanceCalculator;
