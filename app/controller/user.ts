import { Controller } from 'egg';

export default class UserController extends Controller {
  public async logout() {
    const { ctx } = this;

    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }

  public async code() {
    const { ctx } = this;

    ctx.body = ctx.query;
  }

  public async authenticate() {
    const { ctx } = this;
    ctx.body = ctx.query;
  }

  public async current() {
    const { ctx } = this;

    ctx.body = {
      name: 'Serati Ma',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      country: 'China',
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    };
  }
}
