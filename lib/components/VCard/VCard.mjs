import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";

/* eslint-disable complexity */
// Styles
import "./VCard.css"; // Components

import { VAvatar } from "../VAvatar/index.mjs";
import { VImg } from "../VImg/index.mjs";
import { VCardActions } from "./VCardActions.mjs";
import { VCardAvatar } from "./VCardAvatar.mjs";
import { VCardContent } from "./VCardContent.mjs";
import { VCardHeader } from "./VCardHeader.mjs";
import { VCardHeaderText } from "./VCardHeaderText.mjs";
import { VCardImg } from "./VCardImg.mjs";
import { VCardSubtitle } from "./VCardSubtitle.mjs";
import { VCardText } from "./VCardText.mjs";
import { VCardTitle } from "./VCardTitle.mjs"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeLocationProps, useLocation } from "../../composables/location.mjs";
import { makePositionProps, usePosition } from "../../composables/position.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeRouterProps, useLink } from "../../composables/router.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, provideTheme } from "../../composables/theme.mjs";
import { genOverlays, makeVariantProps, useVariant } from "../../composables/variant.mjs";
import { IconValue } from "../../composables/icons.mjs"; // Directives

import { Ripple } from "../../directives/ripple/index.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
import { VDefaultsProvider } from "../VDefaultsProvider/index.mjs";
export const VCard = defineComponent({
  name: 'VCard',
  directives: {
    Ripple
  },
  props: {
    appendAvatar: String,
    appendIcon: IconValue,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: Boolean,
    subtitle: String,
    text: String,
    title: String,
    ...makeThemeProps(),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
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
    const link = useLink(props, attrs);
    return () => {
      var _slots$image, _slots$media, _slots$headerText, _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasTitle = !!(slots.title || props.title);
      const hasSubtitle = !!(slots.subtitle || props.subtitle);
      const hasHeaderText = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasHeader = hasHeaderText || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text);
      const isClickable = !props.disabled && (link.isClickable.value || props.link);
      return _withDirectives(_createVNode(Tag, {
        "class": ['v-card', {
          'v-card--disabled': props.disabled,
          'v-card--flat': props.flat,
          'v-card--hover': props.hover && !(props.disabled || props.flat),
          'v-card--link': isClickable
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, locationStyles.value],
        "href": link.href.value,
        "onClick": isClickable && link.navigate
      }, {
        default: () => [genOverlays(isClickable, 'v-card'), hasImage && _createVNode(VDefaultsProvider, {
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, {
          default: () => [_createVNode(VCardImg, null, {
            default: () => [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots) : _createVNode(VImg, {
              "alt": ""
            }, null)]
          })]
        }), (_slots$media = slots.media) == null ? void 0 : _slots$media.call(slots), hasHeader && _createVNode(VCardHeader, null, {
          default: () => [hasPrepend && _createVNode(VDefaultsProvider, {
            "defaults": {
              VAvatar: {
                density: props.density,
                icon: props.prependIcon,
                image: props.prependAvatar
              }
            }
          }, {
            default: () => [_createVNode(VCardAvatar, null, {
              default: () => [slots.prepend ? slots.prepend() : _createVNode(VAvatar, null, null)]
            })]
          }), hasHeaderText && _createVNode(VCardHeaderText, null, {
            default: () => [hasTitle && _createVNode(VCardTitle, null, {
              default: () => [slots.title ? slots.title() : props.title]
            }), hasSubtitle && _createVNode(VCardSubtitle, null, {
              default: () => [slots.subtitle ? slots.subtitle() : props.subtitle]
            }), (_slots$headerText = slots.headerText) == null ? void 0 : _slots$headerText.call(slots)]
          }), hasAppend && _createVNode(VDefaultsProvider, {
            "defaults": {
              VAvatar: {
                density: props.density,
                icon: props.appendIcon,
                image: props.appendAvatar
              }
            }
          }, {
            default: () => [_createVNode(VCardAvatar, null, {
              default: () => [slots.append ? slots.append() : _createVNode(VAvatar, null, null)]
            })]
          })]
        }), hasText && _createVNode(VCardText, null, {
          default: () => [slots.text ? slots.text() : props.text]
        }), slots.content && _createVNode(VCardContent, null, {
          default: slots.content
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.actions && _createVNode(VCardActions, null, {
          default: slots.actions
        })]
      }), [[_resolveDirective("ripple"), isClickable]]);
    };
  }

});
//# sourceMappingURL=VCard.mjs.map