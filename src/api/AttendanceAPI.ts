import { Attendance } from '../interfaces/Attendance'
import { CornbotAPI } from './CornbotAPI'

export class AttendanceAPI extends CornbotAPI<Attendance> {
  constructor() {
    super('attendance')
  }

  async byUser(userId: string): Promise<Attendance[]> {
    const all = await this.all()
    return all.filter(a => a.userId === userId)
  }

  async byShow(tourKey: string, showRole: string): Promise<Attendance[]> {
    const all = await this.all()
    return all.filter(a => a.tourKey === tourKey && a.showRole === showRole)
  }

  async findRecord(userId: string, showRole: string): Promise<Attendance | undefined> {
    const all = await this.all()
    return all.find(a => a.userId === userId && a.showRole === showRole)
  }
}
