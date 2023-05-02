//customSvgs.ts
import {h} from "vue";
import type {IconSet, IconProps} from "vuetify";
import ProjectsIcon from "~/components/icons/ProjectsIcon.vue";
import DashboardIcon from "~/components/icons/DashboardIcon.vue";

const customSvgNameToComponent: any = {
    DashboardIcon,
    ProjectsIcon,
};

const customIcons: IconSet = {
    component: (props: IconProps) => h(customSvgNameToComponent[props.icon]),
};

export {customIcons};
