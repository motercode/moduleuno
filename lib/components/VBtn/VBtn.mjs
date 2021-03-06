import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VBtn.css"; // Components

import { VBtnToggleSymbol } from "../VBtnToggle/VBtnToggle.mjs";
import { VIcon } from "../VIcon/index.mjs"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeGroupItemProps, useGroupItem } from "../../composables/group.mjs";
import { makeLocationProps, useLocation } from "../../composables/location.mjs";
import { makePositionProps, usePosition } from "../../composables/position.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeRouterProps, useLink } from "../../composables/router.mjs";
import { makeSizeProps, useSize } from "../../composables/size.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, provideTheme } from "../../composables/theme.mjs";
import { genOverlays, makeVariantProps, useVariant } from "../../composables/variant.mjs";
import { useSelectLink } from "../../composables/selectLink.mjs";
import { IconValue } from "../../composables/icons.mjs"; // Directives

import { Ripple } from "../../directives/ripple/index.mjs"; // Utilities

import { computed } from 'vue';
import { defineComponent } from "../../util/index.mjs"; // Types

export const VBtn = defineComponent({
  name: 'VBtn',
  directives: {
    Ripple
  },
  props: {
    active: Boolean,
    symbol: {
      type: null,
      default: VBtnToggleSymbol
    },
    flat: Boolean,
    icon: [Boolean, String, Function, Object],
    prependIcon: IconValue,
    appendIcon: IconValue,
    block: Boolean,
    stacked: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },
    ...makeBorderProps(),
    ...makeRoundedProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'button'
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'contained'
    })
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props);
    const {
      densityClasses
    } = useDensity(props);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      positionClasses
    } = usePosition(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      sizeClasses
    } = useSize(props);
    const group = useGroupItem(props, props.symbol, false);
    const link = useLink(props, attrs);
    const isDisabled = computed(() => (group == null ? void 0 : group.disabled.value) || props.disabled);
    const isElevated = computed(() => {
      return props.variant === 'contained' && !(props.disabled || props.flat || props.border);
    });
    useSelectLink(link, group == null ? void 0 : group.select);
    return () => {
      var _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasColor = !group || group.isSelected.value;
      return _withDirectives(_createVNode(Tag, {
        "type": Tag === 'a' ? undefined : 'button',
        "class": ['v-btn', group == null ? void 0 : group.selectedClass.value, {
          'v-btn--active': props.active,
          'v-btn--block': props.block,
          'v-btn--disabled': isDisabled.value,
          'v-btn--elevated': isElevated.value,
          'v-btn--flat': props.flat,
          'v-btn--icon': !!props.icon,
          'v-btn--stacked': props.stacked
        }, themeClasses.value, borderClasses.value, hasColor ? colorClasses.value : undefined, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [hasColor ? colorStyles.value : undefined, dimensionStyles.value, locationStyles.value],
        "disabled": isDisabled.value || undefined,
        "href": link.href.value,
        "onClick": e => {
          var _link$navigate;

          if (isDisabled.value) return;
          (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e);
          group == null ? void 0 : group.toggle();
        }
      }, {
        default: () => [genOverlays(true, 'v-btn'), !props.icon && props.prependIcon && _createVNode(VIcon, {
          "class": "v-btn__icon",
          "icon": props.prependIcon,
          "start": true
        }, null), _createVNode("div", {
          "class": "v-btn__content",
          "data-no-activator": ""
        }, [typeof props.icon === 'boolean' ? (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots) : _createVNode(VIcon, {
          "class": "v-btn__icon",
          "icon": props.icon,
          "size": props.size
        }, null)]), !props.icon && props.appendIcon && _createVNode(VIcon, {
          "class": "v-btn__icon",
          "icon": props.appendIcon,
          "end": true
        }, null)]
      }), [[_resolveDirective("ripple"), !isDisabled.value && props.ripple, null]]);
    };
  }

});
//# sourceMappingURL=VBtn.mjs.map