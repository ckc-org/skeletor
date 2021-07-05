import ws_client from "@/utils/ws_client"

export const state = () => ({
    connection: null,
    initiated: false,
})

export const actions = {
    start_listening({commit, state}) {
        if(state.initiated) {
            console.warn("Realtime listening already initiated!")
            return
        }

        const ws_base_url = this.$axios.defaults.baseURL
                            .replace("https://", "wss://")
                            .replace("http://", "ws://")

        ws_client.debug = true
        ws_client.open(`${ws_base_url}/ws/`)

        ws_client.onopen = e => {
            // Anything we need to do upon connection opening, we can do here
        }

        ws_client.onmessage = e => {
            const data = JSON.parse(e.data)
            if(data.type === "update") {
                commit(data.commit, data.data, { root: true })
            }
        }

        ws_client.onerror = e => {
            console.error(e)
        }
        ws_client.onclose = () => {
            console.log("WS connection closed.")
        }

        commit('we_began_listening')
    },
}

export const mutations = {
    we_began_listening(state) {
        state.initiated = true
    }
}
