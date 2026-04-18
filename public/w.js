(() => {
  if (window.__testLoopWidgetLoaded) {
    return;
  }

  window.__testLoopWidgetLoaded = true;

  const widgetId = "testloop-widget";
  const send = (eventName, payload = {}) => {
    const message = {
      source: "testloop-widget",
      eventName,
      payload,
      createdAt: new Date().toISOString(),
      origin: window.location.origin,
    };

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(message, window.location.origin);
    }
  };

  send("widget_loaded", {
    path: window.location.pathname,
    title: document.title,
  });

  window.TestLoopWidget = {
    checkpoint(name, payload = {}) {
      send("checkpoint", {
        name,
        ...payload,
      });
    },
  };

  window.addEventListener("click", (event) => {
    const target = event.target instanceof HTMLElement ? event.target : null;
    send("click", {
      widgetId,
      text: target?.innerText?.slice(0, 80) ?? "",
      tagName: target?.tagName ?? "",
    });
  });

  window.addEventListener("paste", () => send("paste", { widgetId }));
  document.addEventListener("visibilitychange", () => {
    send("visibility_change", {
      widgetId,
      hidden: document.hidden,
    });
  });
})();
