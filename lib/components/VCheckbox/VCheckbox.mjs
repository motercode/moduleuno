import { createVNode as _createVNode, mergeProps as _mergeProps, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VCheckbox.css"; // Components

import { filterInputProps, makeVInputProps, VInput } from "../VInput/VInput.mjs";
import { filterControlProps, makeSelectionControlProps, VSelectionControl } from "../VSelectionControl/VSelectionControl.mjs"; // Composables

import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { IconValue } from "../../composables/icons.mjs"; // Utility

import { computed } from 'vue';
import { defineComponent, filterInputAttrs, useRender } from "../../util/index.mjs";
export const VCheckbox = defineComponent({
  name: 'VCheckbox',
  inheritAttrs: false,
  props: {
    indeterminate: Boolean,
    indeterminateIcon: {
      type: IconValue,
      default: '$checkboxIndeterminate'
    },
    ...makeVInputProps(),
    ...makeSelectionControlProps(),
    falseIcon: {
      type: IconValue,
      default: '$checkboxOff'
    },
    trueIcon: {
      type: IconValue,
      default: '$checkboxOn'
    }
  },
  emits: {
    'update:indeterminate': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, 'indeterminate');
    const falseIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.falseIcon;
    });
    const trueIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.trueIcon;
    });

    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }

    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs);
      const [inputProps, _1] = filterInputProps(props);
      const [controlProps, _2] = filterControlProps(props);
      return _createVNode(VInput, _mergeProps({
        "class": "v-checkbox"
      }, inputAttrs, inputProps), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isReadonly
          } = _ref2;
          return _createVNode(VSelectionControl, _mergeProps(controlProps, {
            "type": "checkbox",
            "onUpdate:modelValue": onChange,
            "falseIcon": falseIcon.value,
            "trueIcon": trueIcon.value,
            "aria-checked": indeterminate.value ? 'mixed' : undefined,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs), slots);
        }
      });
    });
    return {};
  }

});
//# sourceMappingURL=VCheckbox.mjs.map