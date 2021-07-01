export default {
    // Default reconnect interval
    reconnectInterval: 5000,

    // Define whether it has ever reconnected
    reconnected: false,

    // Log messages
    debug: false,

    // Open the URL
    open: function(url) {
        // Define that
        const that = this;

        // Open the URL
        this.url = url;

        // Create underlying websocket instance
        this.instance = new WebSocket(this.url)
        // Setup the event handler for onopen
        this.instance.onopen = function (ev) {
            // If it has ever reconnected lets say that
            if (that.reconnected && that.debug) {
                console.log('[WS]: Reconnected.');
            }

            // Run the open function
            that.onopen(ev);
        }
        // Setup the event handler for onmessage
        this.instance.onmessage = function(data, flags) {
            that.onmessage(data, flags);
        }
        // Setup the event handler for onclose
        this.instance.onclose = function(e) {
            switch (e){

                // Normal closure
                case 1000:
                    if (that.debug) {
                        console.log("[WS]: Closed");
                    }
                    break;

                // Abnormal closure
                default:
                    that.reconnect(e);
                    break;
            }

            // Run onclose event
            that.onclose(e);
        }

        // Setup the event handler for onerror
        this.instance.onerror = function(e) {
            switch (e.code){

                // Try and reconnect
                case 'ECONNREFUSED':
                    that.reconnect(e);
                    break;

                // Otherwise run error
                default:
                    that.onerror(e);
                    break;
            }
        }
    },

    // Setup send function
    sendRaw: function(data, option) {
        try {
            this.instance.send(data, option);
        } catch (e) {
            this.instance.emit('error', e);
        }
    },

    // Send the content
    send: function(content) {
        this.instance.send(content);
    },

    // Define the reconnection function
    reconnect: function(e) {

        // Define that
        const that = this;

        // Log reconnection
        if (that.debug) {
            console.log(`[WS]: Reconnecting in ${this.reconnectInterval / 1000} seconds.`);
        }

        // Set reconnect timeout
        setTimeout(function() {

            // Log reconnecting
            if (that.debug) {
                console.log("[WS]: Reconnecting...");
            }

            // Define has reconnected
            that.reconnected = true;

            // Try and open the URL
            that.open(that.url);

        }, this.reconnectInterval);
    },
}
