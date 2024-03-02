import competitionSettings from  './competitionSettings';
import competitorInformation from './competitorInformation'
class CompetitionDTO {
        
  
    updateSettings({ classNumber, firstRoundTime, joRoundTime, competition }) {
      this.competitionSettings = { classNumber, firstRoundTime, joRoundTime, competition };
    }
  
    addCompetitor(competitor) {
      this.competitorInformation.push(competitor);
    }
  
    // Method to add settings to each competitor before sending
    prepareDataForSending() {
      return this.competitorInformation.map(competitor => ({
        ...competitor,
        ...this.competitionSettings,
      }));
    }
}