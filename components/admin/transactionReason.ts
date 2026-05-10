/** Human-entered explanations sometimes live on transaction metadata. */
export function transactionReasonFromMetadata(
  metadata: Record<string, unknown> | null | undefined,
): string | undefined {
  if (!metadata || typeof metadata !== "object") return undefined;
  const keys = [
    "reason",
    "rejectionReason",
    "rejectReason",
    "walletBlockedReason",
    "disputeReason",
  ];
  for (const k of keys) {
    const v = metadata[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}
