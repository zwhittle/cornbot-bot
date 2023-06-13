
import { Message } from '../interfaces/Message'
import { CornbotAPI } from './CornbotAPI'

export class MessagesAPI extends CornbotAPI<Message> {
  constructor() {
    super('messages')
  }
}
