import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}

    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}

    // http://www.typescriptlang.org/docs/handbook/jsx.html
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
