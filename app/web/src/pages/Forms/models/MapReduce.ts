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
    *submitAdvancedForm(/* {payload}, {call} */): object {
      // console.log('payload', payload, call)
      yield null
    },
  },

  reducers: {
    saveStepFormData(state, {payload}): object {
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
