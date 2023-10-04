async function handleRequest() {
  const url = "https://api.github.com/repos/bestruirui/RUI_ICON/contents/?ref=icon";
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  };
  const response = await fetch(url, { headers });
  const data = await response.json();
  const files = Object.values(data).map((file) => ({ name: file.name.slice(0, -4) }));

  return new Response(JSON.stringify(files), {
    headers: { 
      "content-type": "application/json" ,
      "Access-Control-Allow-Origin": "*"
    } 

  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest());
});
