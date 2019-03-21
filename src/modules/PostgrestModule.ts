import axios, { AxiosPromise } from 'axios'
import Vue from 'vue'
import { Module } from 'vuex'

import { IdentifiedObject, ModuleState, actions, RootState, mutations } from './ModuleInterface'

export function postgrestModuleFactory({
  baseUrl,
  namespaced = false,
}: {
  baseUrl: string
  namespaced: boolean
}): Module<ModuleState, RootState> {
  return {
    actions: {
      async [actions.pullObjects](
        { commit },
        { where }: actions.PullObjects
      ) {
        return axios
          .get<IdentifiedObject[]>(baseUrl)
          .then(({ data }) => {
            commit<mutations.AddObjects>({
              objects: data,
              type: mutations.addObjects,
            })
            return data
          })
          .catch(error => {
            console.log(error)
          })
      },
      async [actions.pushObject](
        { commit },
        { object, updateInstance = false }: actions.PushObject
      ) {
        // UPSERT: http://postgrest.org/en/v5.2/api.html#upsert
        return axios
          .post<IdentifiedObject[]>(baseUrl, object, {
            headers: {
              Prefer: 'return=representation, resolution=merge-duplicates',
            },
          })
          .then(({ data }) => {
            const upsertedInstance = data[0]

            commit<mutations.AddObjects>({
              objects: data,
              type: mutations.addObjects,
            })

            if (updateInstance) {
              Object.assign(object, upsertedInstance)
              return object
            } else {
              return upsertedInstance
            }
          })
          .catch(error => {
            console.error(error)
            throw error
          })
      },
    },
    getters: {
      storedObjects: state => state.objects,
      storedObjectsArray: state => Object.values(state.objects),
    },
    mutations: {
      [mutations.addObjects](
        state,
        { objects }: mutations.AddObjects
      ) {
        objects.forEach(object => {
          Vue.set(state.objects, object.id, object)
        })
      },
    },
    namespaced,
    state: {
      objects: {},
    },
  }
}
