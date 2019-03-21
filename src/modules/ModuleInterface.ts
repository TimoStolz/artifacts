import { Module, Payload } from 'vuex'

export interface IdentifiedObject extends Object {
  id: string
}

export interface ModuleState {
  objects: { [key: string]: IdentifiedObject }
}

export interface RootState {}

export module actions {
  export const pullObjects: string = 'pullObjects'
  export const pushObject: string = 'pushObject'

  export interface PullObjects extends Payload {
    where?: object
  }

  export interface PushObject extends Payload {
    object: object
    updateInstance: boolean
  }
}

export module mutations {
  export const addObjects: string = 'addObjects'
  export const removeObjects: string = 'removeObjects'

  export interface AddObjects extends Payload {
    objects: IdentifiedObject[]
  }

  export interface RemoveObjects extends Payload {
    objects: Array<object | string>
  }
}

