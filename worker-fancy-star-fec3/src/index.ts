async function handleRequest() {
  const url = "https://api.github.com/repos/walkxcode/dashboard-icons/contents/svg";
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Access-Control-Allow-Origin": "*",
  };
  const response = await fetch(url, { headers });
  console.log(response)
  const data = await response.json();
  console.log(data)
  const files = Object.values(data).map((file) => ({ name: file.name.slice(0, -4) }));

  return new Response(JSON.stringify(files), {
    headers: { "content-type": "application/json" },
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest());
});
