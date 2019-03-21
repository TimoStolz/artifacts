import Vue from 'vue'
import Test from './components/Test.vue'
import Records from './components/Records'
export { postgrestModuleFactory } from './modules/PostgrestModule'

export function install(Vue: any, options?: {
  prefix?: string
}) {
  const prefix: string = (options && options.prefix) || 'ar'; 
  Vue.component(`${prefix}-test`, Test);
  Vue.component(`${prefix}-records`, Records);
}
