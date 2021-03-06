import { Ref, DeepReadonly, ToRefs, JSXComponent, PropType, App, ComponentInternalInstance, CSSProperties } from 'vue';

declare type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
declare type ThemeOptions = false | {
    defaultTheme?: string;
    variations?: false | VariationsOptions;
    themes?: Record<string, ThemeDefinition>;
};
declare type ThemeDefinition = DeepPartial<InternalThemeDefinition>;
interface VariationsOptions {
    colors: string[];
    lighten: number;
    darken: number;
}
interface InternalThemeDefinition {
    dark: boolean;
    colors: Colors;
    variables: Record<string, string | number>;
}
interface Colors extends BaseColors, OnColors {
    [key: string]: string;
}
interface BaseColors {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
}
interface OnColors {
    'on-background': string;
    'on-surface': string;
    'on-primary': string;
    'on-secondary': string;
    'on-success': string;
    'on-warning': string;
    'on-error': string;
    'on-info': string;
}
interface ThemeInstance {
    isDisabled: boolean;
    name: Ref<string>;
    themes: Ref<Record<string, InternalThemeDefinition>>;
    readonly current: DeepReadonly<Ref<InternalThemeDefinition>>;
    readonly computedThemes: DeepReadonly<Ref<Record<string, InternalThemeDefinition>>>;
    themeClasses: Readonly<Ref<string | undefined>>;
    styles: Readonly<Ref<string>>;
}
declare function useTheme(): ThemeInstance;

interface DefaultsInstance {
    [key: string]: undefined | Record<string, unknown>;
    global?: Record<string, unknown>;
}
declare type DefaultsOptions = Partial<DefaultsInstance>;

declare type DisplayBreakpoint = keyof DisplayThresholds;
interface DisplayThresholds {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
}
interface DisplayOptions {
    mobileBreakpoint?: number | DisplayBreakpoint;
    thresholds?: Partial<DisplayThresholds>;
}
interface DisplayPlatform {
    android: boolean;
    ios: boolean;
    cordova: boolean;
    electron: boolean;
    chrome: boolean;
    edge: boolean;
    firefox: boolean;
    opera: boolean;
    win: boolean;
    mac: boolean;
    linux: boolean;
    touch: boolean;
    ssr: boolean;
}
interface DisplayInstance {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    xxl: boolean;
    smAndUp: boolean;
    mdAndUp: boolean;
    lgAndUp: boolean;
    xlAndUp: boolean;
    smAndDown: boolean;
    mdAndDown: boolean;
    lgAndDown: boolean;
    xlAndDown: boolean;
    name: DisplayBreakpoint;
    height: number;
    width: number;
    mobile: boolean;
    mobileBreakpoint: number | DisplayBreakpoint;
    platform: DisplayPlatform;
    thresholds: DisplayThresholds;
}
declare function useDisplay(): ToRefs<DisplayInstance>;

declare type IconValue = string | JSXComponent;
declare const IconValue: PropType<IconValue>;
interface IconAliases {
    [name: string]: IconValue;
    complete: IconValue;
    cancel: IconValue;
    close: IconValue;
    delete: IconValue;
    clear: IconValue;
    success: IconValue;
    info: IconValue;
    warning: IconValue;
    error: IconValue;
    prev: IconValue;
    next: IconValue;
    checkboxOn: IconValue;
    checkboxOff: IconValue;
    checkboxIndeterminate: IconValue;
    delimiter: IconValue;
    sort: IconValue;
    expand: IconValue;
    menu: IconValue;
    subgroup: IconValue;
    dropdown: IconValue;
    radioOn: IconValue;
    radioOff: IconValue;
    edit: IconValue;
    ratingEmpty: IconValue;
    ratingFull: IconValue;
    ratingHalf: IconValue;
    loading: IconValue;
    first: IconValue;
    last: IconValue;
    unfold: IconValue;
    file: IconValue;
    plus: IconValue;
    minus: IconValue;
}
interface IconProps {
    tag: string;
    icon: IconValue;
    disabled?: Boolean;
}
declare type IconComponent = JSXComponent<IconProps>;
interface IconSet {
    component: IconComponent;
}
declare type IconOptions = {
    defaultSet: string;
    aliases?: Partial<IconAliases>;
    sets: Record<string, IconSet>;
};

interface RtlOptions {
    defaultRtl?: boolean;
    rtl?: Record<string, boolean>;
}
interface RtlProps {
    rtl?: boolean;
}
interface RtlInstance {
    isRtl: Ref<boolean>;
    rtl: Record<string, boolean>;
    rtlClasses: Ref<string>;
}
declare function provideRtl(props: RtlProps, localeScope: LocaleInstance): RtlInstance;
declare function useRtl(): RtlInstance;

interface LocaleMessages {
    [key: string]: LocaleMessages | string;
}
interface LocaleOptions {
    defaultLocale?: string;
    fallbackLocale?: string;
    messages?: LocaleMessages;
}
interface LocaleProps {
    locale?: string;
    fallbackLocale?: string;
    messages?: LocaleMessages;
}
interface LocaleInstance {
    current: Ref<string>;
    fallback: Ref<string>;
    messages: Ref<LocaleMessages>;
    t: (key: string, ...params: unknown[]) => string;
    n: (value: number) => string;
}
interface LocaleAdapter {
    createRoot: (app?: App) => LocaleInstance;
    getScope: () => LocaleInstance;
    createScope: (options?: LocaleProps) => LocaleInstance;
}

declare type Position = 'top' | 'left' | 'right' | 'bottom';
declare type LayoutItem = {
    id: string;
    top: number;
    bottom: number;
    left: number;
    right: number;
    size: number;
};
interface LayoutProvide {
    register: (vm: ComponentInternalInstance, options: {
        id: string;
        order: Ref<number>;
        position: Ref<Position>;
        layoutSize: Ref<number | string>;
        elementSize: Ref<number | string | undefined>;
        active: Ref<boolean>;
        disableTransitions?: Ref<boolean>;
        absolute: Ref<boolean | undefined>;
    }) => {
        layoutItemStyles: Ref<CSSProperties>;
        layoutItemScrimStyles: Ref<CSSProperties>;
        zIndex: Ref<number>;
    };
    unregister: (id: string) => void;
    mainStyles: Ref<CSSProperties>;
    getLayoutItem: (id: string) => LayoutItem | undefined;
    items: Ref<LayoutItem[]>;
    layoutRect: Ref<DOMRectReadOnly | undefined>;
    rootZIndex: Ref<number>;
}
declare function useLayout(): LayoutProvide;

interface FormValidationResult {
    id: number | string;
    errorMessages: string[];
}
interface SubmitEventPromise extends SubmitEvent, Promise<{
    valid: boolean;
    errorMessages: FormValidationResult[];
}> {
}

interface VuetifyOptions {
    aliases?: Record<string, any>;
    components?: Record<string, any>;
    directives?: Record<string, any>;
    defaults?: DefaultsOptions;
    display?: DisplayOptions;
    theme?: ThemeOptions;
    icons?: IconOptions;
    locale?: (LocaleOptions & RtlOptions) | (LocaleAdapter & RtlOptions);
}
declare const createVuetify: (options?: VuetifyOptions) => {
    install: (app: App) => void;
};

export { DefaultsInstance, DisplayBreakpoint, DisplayInstance, DisplayThresholds, IconAliases, IconOptions, IconProps, IconSet, LocaleAdapter, RtlInstance, SubmitEventPromise, ThemeDefinition, ThemeInstance, VuetifyOptions, createVuetify, provideRtl, useDisplay, useLayout, useRtl, useTheme };

import type { ComponentPublicInstance, FunctionalComponent, VNodeChild } from 'vue'


declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      $children: {}
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>
}

declare module '@vue/runtime-dom' {
  export interface HTMLAttributes {
    $children?: VNodeChild
  }
  export interface SVGAttributes {
    $children?: VNodeChild
  }
}

declare module '@vue/runtime-core' {
  interface Vuetify {
    defaults: DefaultsInstance
    display: DisplayInstance
    theme: ThemeInstance
    icons: IconOptions
    locale: LocaleAdapter
    rtl: RtlInstance
  }

  export interface ComponentCustomProperties {
    $vuetify: Vuetify
  }

  export interface GlobalComponents {
    VApp: typeof import('vuetify/components')['VApp']
    VAppBar: typeof import('vuetify/components')['VAppBar']
    VAppBarNavIcon: typeof import('vuetify/components')['VAppBarNavIcon']
    VAppBarTitle: typeof import('vuetify/components')['VAppBarTitle']
    VAlert: typeof import('vuetify/components')['VAlert']
    VAlertTitle: typeof import('vuetify/components')['VAlertTitle']
    VAutocomplete: typeof import('vuetify/components')['VAutocomplete']
    VAvatar: typeof import('vuetify/components')['VAvatar']
    VBadge: typeof import('vuetify/components')['VBadge']
    VBanner: typeof import('vuetify/components')['VBanner']
    VBannerActions: typeof import('vuetify/components')['VBannerActions']
    VBannerAvatar: typeof import('vuetify/components')['VBannerAvatar']
    VBannerIcon: typeof import('vuetify/components')['VBannerIcon']
    VBannerText: typeof import('vuetify/components')['VBannerText']
    VBottomNavigation: typeof import('vuetify/components')['VBottomNavigation']
    VBreadcrumbs: typeof import('vuetify/components')['VBreadcrumbs']
    VBreadcrumbsItem: typeof import('vuetify/components')['VBreadcrumbsItem']
    VBreadcrumbsDivider: typeof import('vuetify/components')['VBreadcrumbsDivider']
    VBtn: typeof import('vuetify/components')['VBtn']
    VBtnGroup: typeof import('vuetify/components')['VBtnGroup']
    VBtnToggle: typeof import('vuetify/components')['VBtnToggle']
    VCard: typeof import('vuetify/components')['VCard']
    VCardActions: typeof import('vuetify/components')['VCardActions']
    VCardAvatar: typeof import('vuetify/components')['VCardAvatar']
    VCardContent: typeof import('vuetify/components')['VCardContent']
    VCardHeader: typeof import('vuetify/components')['VCardHeader']
    VCardHeaderText: typeof import('vuetify/components')['VCardHeaderText']
    VCardImg: typeof import('vuetify/components')['VCardImg']
    VCardSubtitle: typeof import('vuetify/components')['VCardSubtitle']
    VCardText: typeof import('vuetify/components')['VCardText']
    VCardTitle: typeof import('vuetify/components')['VCardTitle']
    VCarousel: typeof import('vuetify/components')['VCarousel']
    VCarouselItem: typeof import('vuetify/components')['VCarouselItem']
    VCheckbox: typeof import('vuetify/components')['VCheckbox']
    VChip: typeof import('vuetify/components')['VChip']
    VChipGroup: typeof import('vuetify/components')['VChipGroup']
    VCode: typeof import('vuetify/components')['VCode']
    VColorPicker: typeof import('vuetify/components')['VColorPicker']
    VCombobox: typeof import('vuetify/components')['VCombobox']
    VCounter: typeof import('vuetify/components')['VCounter']
    VDefaultsProvider: typeof import('vuetify/components')['VDefaultsProvider']
    VDialog: typeof import('vuetify/components')['VDialog']
    VDivider: typeof import('vuetify/components')['VDivider']
    VExpansionPanels: typeof import('vuetify/components')['VExpansionPanels']
    VExpansionPanel: typeof import('vuetify/components')['VExpansionPanel']
    VExpansionPanelText: typeof import('vuetify/components')['VExpansionPanelText']
    VExpansionPanelTitle: typeof import('vuetify/components')['VExpansionPanelTitle']
    VField: typeof import('vuetify/components')['VField']
    VFieldLabel: typeof import('vuetify/components')['VFieldLabel']
    VFileInput: typeof import('vuetify/components')['VFileInput']
    VFooter: typeof import('vuetify/components')['VFooter']
    VForm: typeof import('vuetify/components')['VForm']
    VContainer: typeof import('vuetify/components')['VContainer']
    VCol: typeof import('vuetify/components')['VCol']
    VRow: typeof import('vuetify/components')['VRow']
    VSpacer: typeof import('vuetify/components')['VSpacer']
    VHover: typeof import('vuetify/components')['VHover']
    VIcon: typeof import('vuetify/components')['VIcon']
    VComponentIcon: typeof import('vuetify/components')['VComponentIcon']
    VSvgIcon: typeof import('vuetify/components')['VSvgIcon']
    VLigatureIcon: typeof import('vuetify/components')['VLigatureIcon']
    VClassIcon: typeof import('vuetify/components')['VClassIcon']
    VImg: typeof import('vuetify/components')['VImg']
    VInput: typeof import('vuetify/components')['VInput']
    VItemGroup: typeof import('vuetify/components')['VItemGroup']
    VItem: typeof import('vuetify/components')['VItem']
    VKbd: typeof import('vuetify/components')['VKbd']
    VLabel: typeof import('vuetify/components')['VLabel']
    VLayout: typeof import('vuetify/components')['VLayout']
    VLayoutItem: typeof import('vuetify/components')['VLayoutItem']
    VLazy: typeof import('vuetify/components')['VLazy']
    VList: typeof import('vuetify/components')['VList']
    VListSubheader: typeof import('vuetify/components')['VListSubheader']
    VListImg: typeof import('vuetify/components')['VListImg']
    VListItem: typeof import('vuetify/components')['VListItem']
    VListItemAction: typeof import('vuetify/components')['VListItemAction']
    VListItemAvatar: typeof import('vuetify/components')['VListItemAvatar']
    VListItemHeader: typeof import('vuetify/components')['VListItemHeader']
    VListItemIcon: typeof import('vuetify/components')['VListItemIcon']
    VListItemMedia: typeof import('vuetify/components')['VListItemMedia']
    VListItemSubtitle: typeof import('vuetify/components')['VListItemSubtitle']
    VListItemTitle: typeof import('vuetify/components')['VListItemTitle']
    VListGroup: typeof import('vuetify/components')['VListGroup']
    VLocaleProvider: typeof import('vuetify/components')['VLocaleProvider']
    VMain: typeof import('vuetify/components')['VMain']
    VMenu: typeof import('vuetify/components')['VMenu']
    VMessages: typeof import('vuetify/components')['VMessages']
    VNavigationDrawer: typeof import('vuetify/components')['VNavigationDrawer']
    VNoSsr: typeof import('vuetify/components')['VNoSsr']
    VOverlay: typeof import('vuetify/components')['VOverlay']
    VPagination: typeof import('vuetify/components')['VPagination']
    VParallax: typeof import('vuetify/components')['VParallax']
    VProgressCircular: typeof import('vuetify/components')['VProgressCircular']
    VProgressLinear: typeof import('vuetify/components')['VProgressLinear']
    VRadio: typeof import('vuetify/components')['VRadio']
    VRadioGroup: typeof import('vuetify/components')['VRadioGroup']
    VRangeSlider: typeof import('vuetify/components')['VRangeSlider']
    VRating: typeof import('vuetify/components')['VRating']
    VResponsive: typeof import('vuetify/components')['VResponsive']
    VSelect: typeof import('vuetify/components')['VSelect']
    VSelectionControl: typeof import('vuetify/components')['VSelectionControl']
    VSelectionControlGroup: typeof import('vuetify/components')['VSelectionControlGroup']
    VSheet: typeof import('vuetify/components')['VSheet']
    VSlider: typeof import('vuetify/components')['VSlider']
    VSnackbar: typeof import('vuetify/components')['VSnackbar']
    VSwitch: typeof import('vuetify/components')['VSwitch']
    VSystemBar: typeof import('vuetify/components')['VSystemBar']
    VTabs: typeof import('vuetify/components')['VTabs']
    VTab: typeof import('vuetify/components')['VTab']
    VTable: typeof import('vuetify/components')['VTable']
    VTextarea: typeof import('vuetify/components')['VTextarea']
    VTextField: typeof import('vuetify/components')['VTextField']
    VThemeProvider: typeof import('vuetify/components')['VThemeProvider']
    VTimeline: typeof import('vuetify/components')['VTimeline']
    VTimelineItem: typeof import('vuetify/components')['VTimelineItem']
    VToolbar: typeof import('vuetify/components')['VToolbar']
    VToolbarTitle: typeof import('vuetify/components')['VToolbarTitle']
    VToolbarItems: typeof import('vuetify/components')['VToolbarItems']
    VTooltip: typeof import('vuetify/components')['VTooltip']
    VValidation: typeof import('vuetify/components')['VValidation']
    VWindow: typeof import('vuetify/components')['VWindow']
    VWindowItem: typeof import('vuetify/components')['VWindowItem']
    VCarouselTransition: typeof import('vuetify/components')['VCarouselTransition']
    VCarouselReverseTransition: typeof import('vuetify/components')['VCarouselReverseTransition']
    VTabTransition: typeof import('vuetify/components')['VTabTransition']
    VTabReverseTransition: typeof import('vuetify/components')['VTabReverseTransition']
    VMenuTransition: typeof import('vuetify/components')['VMenuTransition']
    VFabTransition: typeof import('vuetify/components')['VFabTransition']
    VDialogBottomTransition: typeof import('vuetify/components')['VDialogBottomTransition']
    VDialogTopTransition: typeof import('vuetify/components')['VDialogTopTransition']
    VFadeTransition: typeof import('vuetify/components')['VFadeTransition']
    VScaleTransition: typeof import('vuetify/components')['VScaleTransition']
    VScrollXTransition: typeof import('vuetify/components')['VScrollXTransition']
    VScrollXReverseTransition: typeof import('vuetify/components')['VScrollXReverseTransition']
    VScrollYTransition: typeof import('vuetify/components')['VScrollYTransition']
    VScrollYReverseTransition: typeof import('vuetify/components')['VScrollYReverseTransition']
    VSlideXTransition: typeof import('vuetify/components')['VSlideXTransition']
    VSlideXReverseTransition: typeof import('vuetify/components')['VSlideXReverseTransition']
    VSlideYTransition: typeof import('vuetify/components')['VSlideYTransition']
    VSlideYReverseTransition: typeof import('vuetify/components')['VSlideYReverseTransition']
    VExpandTransition: typeof import('vuetify/components')['VExpandTransition']
    VExpandXTransition: typeof import('vuetify/components')['VExpandXTransition']
    VDialogTransition: typeof import('vuetify/components')['VDialogTransition']
  }
}
