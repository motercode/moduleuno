import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Composables
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VListItemMedia = defineComponent({
  name: 'VListItemMedia',
  props: {
    start: Boolean,
    end: Boolean,
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      return _createVNode(props.tag, {
        "class": ['v-list-item-media', {
          'v-list-item-media--start': props.start,
          'v-list-item-media--end': props.end
        }]
      }, slots);
    };
  }

});
//# sourceMappingURL=VListItemMedia.mjs.map