export default function ({$axios}) {
    // Django CSRF configuration
    $axios.onRequest(config => {
        config.xsrfCookieName = 'csrftoken'
        config.xsrfHeaderName = 'X-CSRFToken'

        // for cookies, especially websocket
        config.withCredentials = true
    })
}
