export const appFetch = (
  url: string,
  method: "PUT" | "POST" | "GET",
  body?: any
) => {
  const request: RequestInit = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  }
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:8080/${url}`,
      request
    )
      .then((response) => response.json())
      .then((response) => {
        resolve(response)
      })
  })
}
