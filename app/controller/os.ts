import {Controller} from 'egg'
import * as os from 'os'
import * as util from 'util'

export default class OSController extends Controller {
  public async info() {
    const {ctx} = this
    ctx.body = {
      EOL: os.EOL,
      arch: os.arch(),
      constants: util.inspect(os.constants),
      cpus: os.cpus(),
      endianness: os.endianness(),
      freemem: os.freemem(),
      totalmem: os.totalmem(),
      homedir: os.homedir(),
      hostname: os.hostname(),
      loadavg: util.inspect(os.loadavg()),
      networkInterfaces: util.inspect(os.networkInterfaces()),
      platform: os.platform(),
      release: os.release(),
      tmpdir: os.tmpdir(),
      type: os.type(),
      uptime: os.uptime(),
      userInfo: util.inspect(os.userInfo()),
    }
  }
}
