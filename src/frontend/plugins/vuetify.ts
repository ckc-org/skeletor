import {createVuetify} from "vuetify";
import {DARK_THEME} from "~/utils/themes";
import {customIcons} from "assets/icons/icons";

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        defaults,
        // add theme
        theme: {
            defaultTheme: DARK_THEME,
            themes: {
                light,
                dark,
            },

            // add color variations
            // variations: {
            //     colors: ["primary", "secondary"],
            //     lighten: 3,
            //     darken: 3,
            // },
        },
        // Add the custom iconset
        icons: {
            defaultSet: "mdi",
            // aliases,
            sets: {
                mgmt: customIcons,
            },
        },
    });

    app.vueApp.use(vuetify);
});
