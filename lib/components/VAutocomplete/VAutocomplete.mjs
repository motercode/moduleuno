import { createTextVNode as _createTextVNode, mergeProps as _mergeProps, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VAutocomplete.css"; // Components

import { makeSelectProps } from "../VSelect/VSelect.mjs";
import { VChip } from "../VChip/index.mjs";
import { VDefaultsProvider } from "../VDefaultsProvider/index.mjs";
import { VList, VListItem } from "../VList/index.mjs";
import { VMenu } from "../VMenu/index.mjs";
import { VTextField } from "../VTextField/index.mjs"; // Composables

import { makeFilterProps, useFilter } from "../../composables/filter.mjs";
import { makeTransitionProps } from "../../composables/transition.mjs";
import { useItems } from "../../composables/items.mjs";
import { useForwardRef } from "../../composables/forwardRef.mjs";
import { useLocale } from "../../composables/locale.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utility

import { computed, nextTick, ref, watch } from 'vue';
import { genericComponent, useRender, wrapInArray } from "../../util/index.mjs"; // Types

function highlightResult(text, matches, length) {
  if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented');
  return typeof matches === 'number' && ~matches ? _createVNode(_Fragment, null, [_createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(0, matches)]), _createVNode("span", {
    "class": "v-autocomplete__mask"
  }, [text.substr(matches, length)]), _createVNode("span", {
    "class": "v-autocomplete__unmask"
  }, [text.substr(matches + length)])]) : text;
}

export const VAutocomplete = genericComponent()({
  name: 'VAutocomplete',
  props: {
    // TODO: implement post keyboard support
    // autoSelectFirst: Boolean,
    search: String,
    ...makeFilterProps({
      filterKeys: ['title']
    }),
    ...makeSelectProps(),
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    'click:clear': e => true,
    'update:search': val => true,
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
    const isFocused = ref(false);
    const isPristine = ref(true);
    const menu = ref(false);
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const search = useProxiedModel(props, 'search', '');
    const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0];
    });
    const {
      filteredItems
    } = useFilter(props, items, computed(() => isPristine.value ? undefined : search.value));
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

      search.value = '';
    }

    function onClickControl() {
      if (props.hideNoData && !filteredItems.value.length) return;
      menu.value = true;
    }

    function onKeydown(e) {
      if (['Enter', 'ArrowDown'].includes(e.key)) {
        menu.value = true;
      }

      if (['Escape'].includes(e.key)) {
        menu.value = false;
      }

      if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
        isPristine.value = true;
      }
    }

    function onInput(e) {
      search.value = e.target.value;
    }

    function onAfterLeave() {
      if (isFocused.value) isPristine.value = true;
    }

    const isSelecting = ref(false);

    function select(item) {
      if (props.multiple) {
        const index = selected.value.findIndex(selection => selection === item.value);

        if (index === -1) {
          model.value = [...model.value, item];
          search.value = '';
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      } else {
        model.value = [item];
        isSelecting.value = true;
        search.value = item.title;
        menu.value = false;
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      }
    }

    watch(isFocused, val => {
      if (val) {
        var _selections$value$at$, _selections$value$at;

        isSelecting.value = true;
        search.value = props.multiple ? '' : String((_selections$value$at$ = (_selections$value$at = selections.value.at(-1)) == null ? void 0 : _selections$value$at.props.title) != null ? _selections$value$at$ : '');
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      } else {
        menu.value = false;
        search.value = '';
      }
    });
    watch(search, val => {
      if (!isFocused.value || isSelecting.value) return;
      if (val) menu.value = true;
      isPristine.value = !val;
    });
    useRender(() => {
      const hasChips = !!(props.chips || slots.chip);
      return _createVNode(VTextField, {
        "ref": vTextFieldRef,
        "modelValue": search.value,
        "onInput": onInput,
        "class": ['v-autocomplete', {
          'v-autocomplete--active-menu': menu.value,
          'v-autocomplete--chips': !!props.chips,
          [`v-autocomplete--${props.multiple ? 'multiple' : 'single'}`]: true
        }],
        "appendInnerIcon": props.menuIcon,
        "dirty": selected.value.length > 0,
        "onClick:clear": onClear,
        "onClick:control": onClickControl,
        "onClick:input": onClickControl,
        "onFocus": () => isFocused.value = true,
        "onBlur": () => isFocused.value = false,
        "onKeydown": onKeydown
      }, { ...slots,
        default: () => {
          var _slots$noData, _slots$noData2;

          return _createVNode(_Fragment, null, [_createVNode(VMenu, {
            "modelValue": menu.value,
            "onUpdate:modelValue": $event => menu.value = $event,
            "activator": "parent",
            "contentClass": "v-autocomplete__content",
            "eager": props.eager,
            "openOnClick": false,
            "transition": props.transition,
            "onAfterLeave": onAfterLeave
          }, {
            default: () => [_createVNode(VList, {
              "selected": selected.value,
              "selectStrategy": props.multiple ? 'independent' : 'single-independent'
            }, {
              default: () => [!filteredItems.value.length && !props.hideNoData && ((_slots$noData = (_slots$noData2 = slots['no-data']) == null ? void 0 : _slots$noData2.call(slots)) != null ? _slots$noData : _createVNode(VListItem, {
                "title": t(props.noDataText)
              }, null)), filteredItems.value.map(_ref2 => {
                let {
                  item,
                  matches
                } = _ref2;
                return _createVNode(VListItem, _mergeProps(item.props, {
                  "onMousedown": e => e.preventDefault(),
                  "onClick": () => select(item)
                }), {
                  title: () => {
                    var _search$value$length, _search$value;

                    return isPristine.value ? item.title : highlightResult(item.title, matches.title, (_search$value$length = (_search$value = search.value) == null ? void 0 : _search$value.length) != null ? _search$value$length : 0);
                  }
                });
              })]
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
              "class": "v-autocomplete__selection"
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
                item: selection.originalItem,
                index
              }) : _createVNode(VChip, slotProps, null)]
            }) : slots.selection ? slots.selection({
              item: selection.originalItem,
              index
            }) : _createVNode("span", {
              "class": "v-autocomplete__selection-text"
            }, [selection.props.title, props.multiple && index < selections.value.length - 1 && _createVNode("span", {
              "class": "v-autocomplete__selection-comma"
            }, [_createTextVNode(",")])])]);
          })]);
        }
      });
    });
    return useForwardRef({
      filteredItems
    }, vTextFieldRef);
  }

});
//# sourceMappingURL=VAutocomplete.mjs.map