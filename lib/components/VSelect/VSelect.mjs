import { createTextVNode as _createTextVNode, mergeProps as _mergeProps, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VSelect.css"; // Components

import { VDialogTransition } from "../transitions/index.mjs";
import { VChip } from "../VChip/index.mjs";
import { VDefaultsProvider } from "../VDefaultsProvider/index.mjs";
import { VList, VListItem } from "../VList/index.mjs";
import { VMenu } from "../VMenu/index.mjs";
import { VTextField } from "../VTextField/index.mjs"; // Composables

import { makeItemsProps, useItems } from "../../composables/items.mjs";
import { makeTransitionProps } from "../../composables/transition.mjs";
import { useForwardRef } from "../../composables/forwardRef.mjs";
import { useLocale } from "../../composables/locale.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { IconValue } from "../../composables/icons.mjs"; // Utility

import { computed, ref } from 'vue';
import { genericComponent, propsFactory, useRender, wrapInArray } from "../../util/index.mjs"; // Types

export const makeSelectProps = propsFactory({
  chips: Boolean,
  closableChips: Boolean,
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menuIcon: {
    type: IconValue,
    default: '$dropdown'
  },
  modelValue: {
    type: null,
    default: () => []
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: '$vuetify.noDataText'
  },
  openOnClear: Boolean,
  ...makeItemsProps({
    itemChildren: false
  })
}, 'select');
export const VSelect = genericComponent()({
  name: 'VSelect',
  props: { ...makeSelectProps(),
    ...makeTransitionProps({
      transition: {
        component: VDialogTransition
      }
    })
  },
  emits: {
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const menu = ref(false);
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0];
    });
    const selections = computed(() => {
      return model.value.map(v => {
        return items.value.find(item => item.value === v.value) || v;
      });
    });
    const selected = computed(() => selections.value.map(selection => selection.props.value));

    function onClear(e) {
      model.value = [];

      if (props.openOnClear) {
        menu.value = true;
      }
    }

    function onClickControl() {
      if (props.hideNoData && !items.value.length) return;
      menu.value = true;
    }

    function onKeydown(e) {
      if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
        menu.value = true;
      }

      if (['Escape', 'Tab'].includes(e.key)) {
        menu.value = false;
      }
    }

    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => selection === item.value);

        if (index === -1) {
          model.value = [...model.value, item];
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        menu.value = false;
      }
    }

    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      return _createVNode(VTextField, {
        "ref": vTextFieldRef,
        "class": ['v-select', {
          'v-select--active-menu': menu.value,
          'v-select--chips': !!props.chips,
          [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true
        }],
        "appendInnerIcon": props.menuIcon,
        "readonly": true,
        "onClick:clear": onClear,
        "onClick:input": onClickControl,
        "onClick:control": onClickControl,
        "onBlur": () => menu.value = false,
        "modelValue": model.value.map(v => v.props.value).join(', '),
        "onKeydown": onKeydown
      }, { ...slots,
        default: () => {
          var _slots$noData, _slots$noData2;

          return _createVNode(_Fragment, null, [_createVNode(VMenu, {
            "modelValue": menu.value,
            "onUpdate:modelValue": $event => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-select__content",
            "eager": props.eager,
            "openOnClick": false,
            "transition": props.transition
          }, {
            default: () => [_createVNode(VList, {
              "selected": selected.value,
              "selectStrategy": props.multiple ? 'independent' : 'single-independent'
            }, {
              default: () => [!items.value.length && !props.hideNoData && ((_slots$noData = (_slots$noData2 = slots['no-data']) == null ? void 0 : _slots$noData2.call(slots)) != null ? _slots$noData : _createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), items.value.map(item => _createVNode(VListItem, _mergeProps(item.props, {
                "onMousedown": e => e.preventDefault(),
                "onClick": () => select(item)
              }), null))]
            })]
          }), selections.value.map((selection, index) => {
            function onChipClose(e) {
              e.stopPropagation();
              e.preventDefault();
              select(selection);
            }

            const slotProps = {
              'onClick:close': onChipClose,
              modelValue: true
            };
            return _createVNode("div", {
              "class": "v-select__selection"
            }, [hasChips ? _createVNode(VDefaultsProvider, {
              "defaults": {
                VChip: {
                  closable: props.closableChips,
                  size: 'small',
                  text: selection.props.title
                }
              }
            }, {
              default: () => [slots.chip ? slots.chip({
                props: slotProps,
                selection,
                index
              }) : _createVNode(VChip, slotProps, null)]
            }) : slots.selection ? slots.selection({
              item: selection.originalItem,
              index
            }) : _createVNode("span", {
              "class": "v-select__selection-text"
            }, [selection.props.title, props.multiple && index < selections.value.length - 1 && _createVNode("span", {
              "class": "v-select__selection-comma"
            }, [_createTextVNode(",")])])]);
          })]);
        }
      });
    });
    return useForwardRef({}, vTextFieldRef);
  }

});
//# sourceMappingURL=VSelect.mjs.map