import xs from 'xstream';
import SocketCluster from 'socketcluster-client'

/**
 *
 * @param options {
  hostname: 'securedomain.com',
  secure: true,
  port: 443,
  rejectUnauthorized: false // Only necessary during debug if using a self-signed certificate
}
 * @returns {scDriver}
 */
export function makeSCDriver(options) {
    let socket = SocketCluster.connect(options);
    function get(eventName, { multiArgs = false } = {}) {
        return xs.create({
            start(listener) {
                this.eventListener = multiArgs
                    ? (...args) => listener.next(args)
                    : arg => listener.next(arg);

                socket.on(eventName, this.eventListener);
            },
            stop() {
                socket.removeListener(eventName, this.eventListener);
            },
            eventListener: null,
        });
    }

    function publish(messageType, message) {
        socket.emit(messageType, message);
    }

    return function scDriver(events$) {
        events$.map(event => publish(event.messageType, event.message));
        return {
            get,
            dispose: socket.destroy.bind(socket)
        }
    };
}