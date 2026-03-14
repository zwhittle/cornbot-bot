import { Tour } from '../interfaces/Tour'
import { CornbotAPI } from './CornbotAPI'

export class ToursAPI extends CornbotAPI<Tour> {
  constructor() {
    super('tours')
  }

  sync(tours: Tour[]) {
    this._sync(tours.map(tour => ({ id: tour.key, data: tour })))
  }
}
