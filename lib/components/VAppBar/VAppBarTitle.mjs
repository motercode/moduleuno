import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Composables
import { VToolbarTitle } from "../VToolbar/index.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VAppBarTitle = defineComponent({
  name: 'VAppBarTitle',
  props: { ...VToolbarTitle.props
  },

  setup(_, _ref) {
    let {
      slots
    } = _ref;
    return () => _createVNode(VToolbarTitle, {
      "class": "v-app-bar-title"
    }, slots);
  }

});
//# sourceMappingURL=VAppBarTitle.mjs.map