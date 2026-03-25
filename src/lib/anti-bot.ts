const MIN_HUMAN_SUBMIT_MS = 1500;

export function isHoneypotTriggered(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

export function isSubmissionTooFast(startedAt?: number) {
  if (!startedAt || !Number.isFinite(startedAt)) {
    return true;
  }

  const now = Date.now();
  const elapsedMs = now - startedAt;
  return elapsedMs < MIN_HUMAN_SUBMIT_MS;
}
