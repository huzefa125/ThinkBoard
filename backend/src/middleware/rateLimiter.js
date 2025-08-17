// rateLimiter.js
const { Ratelimit } = require("@upstash/ratelimit")
const { Redis } = require("@upstash/redis")

// Create a Redis instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Create a rate limiter (10 requests per 10 seconds for example)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key") // ✅ now works
    if (!success) {
      return res.status(429).json({ message: "Too many requests" })
    }
    next()
  } catch (error) {
    console.error("Rate limit Error", error)
    next(error)
  }
}

module.exports = rateLimiter
