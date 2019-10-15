// tslint:disable-next-line:no-commented-code
// import {routerRedux} from 'dva/router'

export default {
  namespace: 'mapReduce',

  state: {
    map: [],
    reducer: 'hello',
    output: [],
  },

  effects: {
    *submitAdvancedForm({payload}, {call}) {
      // tslint:disable-next-line:no-console
      console.log('payload', payload, call)
    },
  },

  reducers: {
    saveStepFormData(state, {payload}) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      }
    },
  },
}
