import { SplitFactory } from "@splitsoftware/splitio-browserjs";

const authorizationKey = import.meta.env.VITE_SPLIT_CLIENT_KEY ?? "localhost";

// The app has no sign-in yet: a stable per-browser id stands in for the user.
export function currentUserId(): string {
  const k = "cardstack.user";
  let id = localStorage.getItem(k);
  if (!id) {
    id = "user_" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(k, id);
  }
  return id;
}

const factory = SplitFactory({
  core: { authorizationKey, key: currentUserId() },
  // Treatments used while the SDK runs in localhost mode (no key).
  features: { compact_columns: "off", wip_limit: "off" },
});

export const splitClient = factory.client();

export function onReady(cb: () => void) {
  splitClient.on(splitClient.Event.SDK_READY, cb);
  splitClient.on(splitClient.Event.SDK_READY_TIMED_OUT, cb);
}

export function treatment(flagName: string, attributes: Record<string, string | number | boolean> = {}): string {
  return splitClient.getTreatment(flagName, { plan: "free", ...attributes });
}

export function track(eventType: string, value?: number, properties: Record<string, string | number | boolean> = {}) {
  splitClient.track("user", eventType, value, properties);
}
