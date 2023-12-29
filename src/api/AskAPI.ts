import { CornbotAPI } from './CornbotAPI'
import { ChatQuestion } from 'src/interfaces/ChatQuestion'

export class ChatbotAPI extends CornbotAPI<ChatQuestion> {
  constructor() {
    super('chat')
  }
}
