import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const contactWindowLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
  prefix: "rl:contact:window",
});

const contactBurstLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "30 s"),
  analytics: true,
  prefix: "rl:contact:burst",
});

type LimitResult = {
  ok: boolean;
  reset: number;
};

async function checkLimitPair(
  windowLimiter: Ratelimit,
  burstLimiter: Ratelimit,
  identity: string,
): Promise<LimitResult> {
  const [windowResult, burstResult] = await Promise.all([
    windowLimiter.limit(identity),
    burstLimiter.limit(identity),
  ]);

  return {
    ok: windowResult.success && burstResult.success,
    reset: Math.max(windowResult.reset, burstResult.reset),
  };
}

export function checkContactLimit(identity: string) {
  return checkLimitPair(contactWindowLimiter, contactBurstLimiter, identity);
}
