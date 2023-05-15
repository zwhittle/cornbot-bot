import { CornbotAPI } from './CornbotAPI'
import { Feedback } from '../interfaces/Feedback'

export class FeedbacksAPI extends CornbotAPI<Feedback> {
  constructor() {
    super('feedbacks')
  }
}
