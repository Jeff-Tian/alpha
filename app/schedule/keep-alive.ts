import { Subscription } from 'egg';

export default class KeepAlive extends Subscription {
  static get schedule() {
    return {
      interval: '29m',
      type: 'all',
    };
  }

  async subscribe() {
    const result = await this.ctx.curl(
      'https://uniheart.herokuapp.com/health-check',
      {
        // 自动解析 JSON response
        dataType: 'json',
        timeout: 10000,
      },
    );

    this.ctx.body = {
      status: result.status,
      headers: result.headers,
      data: result.data,
    };
  }
}
