import axios, { AxiosInstance } from 'axios'
import Vue from 'vue'
import { IdentifiedObject, actions } from '@/modules/ModuleInterface'

export default Vue.extend({
  props: {
    tag: { type: String, default: 'div' },
    from: { type: String, required: true }
  },
  computed: {
    hasArtifacts(): boolean {
      return this.artifacts.length > 0
    },
    artifacts(): IdentifiedObject[] {
      return this.$store.getters[`${this.from}/storedObjectsArray`]
    },
  },
  methods: {
    async store(artifact: object, updateInstance: boolean = false) {
      return this.$store.dispatch({
        object: artifact,
        type: `${this.from}/${actions.pushObject}`,
        updateInstance,
      })
    },
  },
  render(h) {
    const Tag: string = this.tag;
    const slotScope = {
      save: this.store.bind(this),
      artifacts: this.artifacts
    }
    let contents;

    if (this.$scopedSlots.default !== undefined) {
      contents = this.$scopedSlots.default(slotScope)
    } else if (this.hasArtifacts) {
      if (this.$scopedSlots.artifacts !== undefined) {
        contents = this.$scopedSlots.artifacts(slotScope)
      } else if (this.$scopedSlots.artifact !== undefined) {
        const artifactSlot = this.$scopedSlots.artifact;
        contents = this.artifacts.map((artifact, index) => artifactSlot({
          ...slotScope,
          artifact,
          index,
        }))
      } 
    } else if (this.$scopedSlots.ifNotFound !== undefined) {
      contents = this.$scopedSlots.ifNotFound(slotScope)
    } else {
      contents = '';
    }

    return <Tag {...this.$attrs}>{ contents }</Tag>
  }
})
