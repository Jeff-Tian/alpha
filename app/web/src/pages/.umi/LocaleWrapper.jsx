import React from 'react';
import {
  _setIntlObject,
  addLocaleData,
  IntlProvider,
  intlShape,
  LangContext,
  _setLocaleContext
} from 'umi-plugin-locale';

const InjectedWrapper = (() => {
  let sfc = (props, context) => {
    _setIntlObject(context.intl);
    return props.children;
  };
  sfc.contextTypes = {
    intl: intlShape,
  };
  return sfc;
})();

import 'moment/locale/pt-br';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-tw';

const baseNavigator = true;
const useLocalStorage = true;

import { LocaleProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
let defaultAntd = require('antd/lib/locale-provider/zh_CN');
defaultAntd = defaultAntd.default || defaultAntd;

const localeInfo = {
  'en-US': {
    messages: {
      ...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/jefftian/alpha/app/web/src/locales/en-US.js')),
    },
    locale: 'en-US',
    antd: require('antd/lib/locale-provider/en_US'),
    data: require('react-intl/locale-data/en'),
    momentLocale: '',
  },
  'pt-BR': {
    messages: {
      ...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/jefftian/alpha/app/web/src/locales/pt-BR.js')),
    },
    locale: 'pt-BR',
    antd: require('antd/lib/locale-provider/pt_BR'),
    data: require('react-intl/locale-data/pt'),
    momentLocale: 'pt-br',
  },
  'zh-CN': {
    messages: {
      ...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/jefftian/alpha/app/web/src/locales/zh-CN.js')),
    },
    locale: 'zh-CN',
    antd: require('antd/lib/locale-provider/zh_CN'),
    data: require('react-intl/locale-data/zh'),
    momentLocale: 'zh-cn',
  },
  'zh-TW': {
    messages: {
      ...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/jefftian/alpha/app/web/src/locales/zh-TW.js')),
    },
    locale: 'zh-TW',
    antd: require('antd/lib/locale-provider/zh_TW'),
    data: require('react-intl/locale-data/zh'),
    momentLocale: 'zh-tw',
  },
};

class LocaleWrapper extends React.Component{
  state = {
    locale: 'zh-CN',
  };
  getAppLocale(){
    let appLocale = {
      locale: 'zh-CN',
      messages: {},
      data: require('react-intl/locale-data/zh'),
      momentLocale: 'zh-cn',
    };

    const runtimeLocale = require('umi/_runtimePlugin').mergeConfig('locale') || {};
    const runtimeLocaleDefault =  typeof runtimeLocale.default === 'function' ? runtimeLocale.default() : runtimeLocale.default;
    if (
      useLocalStorage
      && typeof localStorage !== 'undefined'
      && localStorage.getItem('umi_locale')
      && localeInfo[localStorage.getItem('umi_locale')]
    ) {
      appLocale = localeInfo[localStorage.getItem('umi_locale')];
    } else if (
      typeof navigator !== 'undefined'
      && localeInfo[navigator.language]
      && baseNavigator
    ) {
      appLocale = localeInfo[navigator.language];
    } else if(localeInfo[runtimeLocaleDefault]){
      appLocale = localeInfo[runtimeLocaleDefault];
    } else {
      appLocale = localeInfo['zh-CN'] || appLocale;
    }
    window.g_lang = appLocale.locale;
    appLocale.data && addLocaleData(appLocale.data);

    return appLocale;
  }
  reloadAppLocale = () => {
    const appLocale = this.getAppLocale();
    this.setState({
      locale: appLocale.locale,
    });
  };

  render(){
    const appLocale = this.getAppLocale();
    const LangContextValue = {
      locale: appLocale.locale,
      reloadAppLocale: this.reloadAppLocale,
    };
    let ret = this.props.children;
    ret = (<IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <InjectedWrapper>
        <LangContext.Provider value={LangContextValue}>
          <LangContext.Consumer>{(value) => {
            _setLocaleContext(value);
            return this.props.children
            }}</LangContext.Consumer>
        </LangContext.Provider>
      </InjectedWrapper>
    </IntlProvider>)
     return (<LocaleProvider locale={appLocale.antd ? (appLocale.antd.default || appLocale.antd) : defaultAntd}>
      {ret}
    </LocaleProvider>);
    return ret;
  }
}
export default LocaleWrapper;
