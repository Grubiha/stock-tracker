import { NextFunction, Request, Response } from "express"

export const StockMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.path.startsWith("/stocks") && ["POST", "PATCH"].includes(req.method)) {
    const originalSend = res.send
    res.send = function (body: any) {
      const jsonBody = JSON.parse(body) 
      if (res.statusCode >= 300 || res.statusCode < 200) return originalSend.call(this, body)
      ;(async () => {
        try {
          const response = await fetch(`${process.env.URL_EVENT_SERVICE}/events`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              stockId: jsonBody.id,
              plu: jsonBody.plu,
              shopId: jsonBody.shopId,
              onShelf: jsonBody.onShelf,
              inOrder: jsonBody.inOrder,
              action: req.method.toLowerCase(),
              date: new Date(),
            }),
          })
          if (!response.ok) {
            console.error("Failed to send request:", response.statusText)
          }
        } catch (error) {
          console.error("Error sending request:", error)
        }
      })()

      return originalSend.call(this, body)
    }
  }
  next()
}
