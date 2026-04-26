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

const demoLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, "24 h"),
  analytics: true,
  prefix: "rl:demo:landing",
});

const aliceWindowLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(12, "10 m"),
  analytics: true,
  prefix: "rl:alice:window",
});

const aliceBurstLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(4, "1 m"),
  analytics: true,
  prefix: "rl:alice:burst",
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

export async function checkDemoLimit(identity: string): Promise<LimitResult> {
  const result = await demoLimiter.limit(identity);
  return { ok: result.success, reset: result.reset };
}

export function checkAliceLimit(identity: string) {
  return checkLimitPair(aliceWindowLimiter, aliceBurstLimiter, identity);
}
