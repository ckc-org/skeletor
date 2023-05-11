//customSvgs.ts
import {h} from "vue";
import type {IconSet, IconProps} from "vuetify";
import ProjectsIcon from "~/components/icons/ProjectsIcon.vue";
import DashboardIcon from "~/components/icons/DashboardIcon.vue";
import DailyTimeIcon from "~/components/icons/DailyTimeIcon.vue";
import DailyDateIcon from "~/components/icons/DailyDateIcon.vue";

const customSvgNameToComponent: any = {
    DashboardIcon,
    ProjectsIcon,
    DailyTimeIcon,
    DailyDateIcon,
};

const customIcons: IconSet = {
    component: (props: IconProps) => h(customSvgNameToComponent[props.icon]),
};

export {customIcons};
