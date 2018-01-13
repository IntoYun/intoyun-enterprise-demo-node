export const scope = function (f, scope) {
  return function () {
    return f.apply(scope, arguments)
  }
}

export default class wsClient {
  connected = false;
  onMessage () {};

  constructor (uri, clientId) {
    this.uri = uri;
    this.clientId = clientId;
  }

  connect (connectOptions = {}) {
    if (this.connected) {
      throw new Error('already connected')
    }

    if (this.socket) {
      throw new Error('already connected')
    }

    this.connected = false;
    this.socket = new WebSocket(this.uri)

    this.binaryType = 'arraybuffer'
    this.socket.onopen = scope(this._on_socket_open, this)
    this.socket.onmessage = scope(this._on_socket_message, this)
    this.socket.onerror = scope(this._on_socket_error, this)
    this.socket.onclose = scope(this._on_socket_close, this)
  }

  send (data) {
    if (!this.connected) {
      throw new Error('not connected')
    }

    this.socket.send(data)
  }

  _on_socket_open () {
    this.connected = true
    console.log('_on_socket_open')
  }

  _on_socket_close (...args) {
    console.log('_on_socket_close')
    console.log(args)
  }

  _on_socket_error (error) {
    console.error(error.data)
  }

  _on_socket_message (event) {
    const data = event.data
    console.log(data)

    this.onMessage(data)
  }
}
