const eventBus = {
  listeners: {},

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    // Return an unsubscribe function
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (cb) => cb !== callback
      );
    };
  },

  emit(event, payload) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((cb) => cb(payload));
    }
  },
};

export default eventBus;
