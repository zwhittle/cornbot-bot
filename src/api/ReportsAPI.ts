import { CornbotAPI } from './CornbotAPI'
import { UserReport } from '../interfaces/UserReport'

export class ReportsAPI extends CornbotAPI<UserReport> {
  constructor() {
    super('reports')
  }
}
