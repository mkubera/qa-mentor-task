export const logger = (page) => {
  page.on("console", (msg) => console.log("[console]", msg.text()));

  page.on("requestfinished", (request) => {
    if (request.url().includes("/articles")) {
      console.log("[network]", request.method(), request.url());
    }
  });

  page.on("response", async (response) => {
    if (response.url().includes("/articles")) {
      console.log("[response]", response.status(), response.url());
      const body = await response.text();
      console.log("[response body]", body);
    }
  });
};
