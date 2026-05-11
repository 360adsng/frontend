import { baseFetchJson } from "../baseFetch";
import { uploadFileToR2 } from "../storage/r2";

export type DisputeBookingKindApi = "influencer" | "billboard";

export type DisputeMessageSenderRoleApi = "booker" | "vendor" | "admin";

export type DisputeMessageDto = {
  id: string;
  bookingKind: DisputeBookingKindApi;
  bookingId: number;
  senderRole: DisputeMessageSenderRoleApi;
  authorUserId: number;
  body: string;
  imageUrl?: string | null;
  createdAt: string;
  isMine: boolean;
};

export async function getDisputeMessages(
  bookingKind: DisputeBookingKindApi,
  bookingId: number,
): Promise<{ messages: DisputeMessageDto[] }> {
  return baseFetchJson<{ messages: DisputeMessageDto[] }>(
    `/dispute-chat/${bookingKind}/${bookingId}/messages`,
    { method: "GET" },
  );
}

export async function postDisputeMessage(
  bookingKind: DisputeBookingKindApi,
  bookingId: number,
  body: string,
  image?: File | null,
): Promise<DisputeMessageDto> {
  const trimmed = body.trim();
  let imageUrl: string | undefined;
  if (image?.size) {
    const { publicUrl } = await uploadFileToR2(image, "dispute");
    imageUrl = publicUrl;
  }
  if (!trimmed && !imageUrl) {
    throw new Error("Message or image is required");
  }
  return baseFetchJson<DisputeMessageDto>(
    `/dispute-chat/${bookingKind}/${bookingId}/messages`,
    {
      method: "POST",
      body: {
        ...(trimmed ? { body: trimmed } : {}),
        ...(imageUrl ? { imageUrl } : {}),
      },
    } as unknown as RequestInit,
  );
}

/** Admin dispute resolution — same payout path as campaign owner confirming delivery */
export async function postAdminDisputeComplete(
  bookingKind: DisputeBookingKindApi,
  bookingId: number,
): Promise<unknown> {
  return baseFetchJson<unknown>(
    `/dispute-chat/admin/${bookingKind}/${bookingId}/complete`,
    { method: "POST", body: {} },
  );
}

/** Admin refund — wallet credit or Flutterwave refund, consistent with vendor cancellation */
export async function postAdminDisputeCancelRefund(
  bookingKind: DisputeBookingKindApi,
  bookingId: number,
  reason?: string,
): Promise<unknown> {
  return baseFetchJson<unknown>(
    `/dispute-chat/admin/${bookingKind}/${bookingId}/cancel-refund`,
    { method: "POST", body: reason?.trim() ? { reason: reason.trim() } : {} },
  );
}
