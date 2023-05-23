import { CornbotAPI } from './CornbotAPI'
import { AnalyticsEvent } from '../interfaces/AnalyticsEvent'

export class AnalyticsAPI extends CornbotAPI<AnalyticsEvent> {
  constructor() {
    super('analytics')
  }
}
