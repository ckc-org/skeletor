import { defineStore } from "pinia";
import { useSnackbarStore } from "~/store/snackbar";
import { useRuntimeConfig } from "#app";
import ws_client from "~/utils/ws_client";

export const useRealtimeStore = defineStore({
  id: "realtime",

  state: () => ({
    initiated: false,
  }),

  actions: {
    startListening() {
      if (this.initiated) {
        console.warn("Realtime listening already initiated!");
        return;
      }

      this.initiated = true;

      // get nuxt runtime server_url and transform it into a websocket URL
      const config = useRuntimeConfig();
      const ws_base_url = config.public.server_url
        .replace("https://", "wss://")
        .replace("http://", "ws://")
        .replace(/\/api$/, "/ws/"); // remove /api end of URL so we can replace it with /ws

      console.log(`we are connecting to ${ws_base_url}`);

      ws_client.debug = true;
      ws_client.open(ws_base_url);

      // eslint-disable-next-line no-unused-vars
      ws_client.onopen = (e) => {
        // Anything we need to do upon connection opening, we can do here
      };

      ws_client.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log("Message received of type", data.type, "with data:", data);
        if (data.type === "update") {
          const pinia = usePinia();
          const stores = pinia._s;
          const store = stores.get(data.store);
          const actionName = data.action;

          if (typeof store[actionName] === "function") {
            store[actionName](...data.args); // Call the action
          } else {
            const snackbar = useSnackbarStore();
            snackbar.displaySnackbar(
              "error",
              `Action '${actionName}' does not exist on the store '${data.store}'`
            );
          }
        }
      };

      ws_client.onerror = (e) => {
        console.error(e);
      };
      ws_client.onclose = () => {
        console.log("WS connection closed.");
      };
    },
  },
});
