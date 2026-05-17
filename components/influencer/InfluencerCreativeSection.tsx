import Tick from "@components/inputs/Tick";

const fileInputClass =
  "block w-full text-sm text-neutral-700 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white";

type Props = {
  attachmentType: string;
  setAttachmentType: (type: string) => void;
  imageFile: File | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  creativeVideoUrl: string;
  onVideoUrlChange: (url: string) => void;
};

export function InfluencerCreativeSection({
  attachmentType,
  setAttachmentType,
  imageFile,
  onImageChange,
  creativeVideoUrl,
  onVideoUrlChange,
}: Props) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-4">
      <h4 className="font-bold text-neutral-900">Campaign creative</h4>
      <p className="mt-1 text-xs text-neutral-500">
        Optional image or video link to share with the influencer.
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        <Tick
          label="No attachment"
          asset="none"
          setAttachmentType={setAttachmentType}
          attachmentType={attachmentType}
        />
        <Tick
          label="Image"
          asset="image"
          setAttachmentType={setAttachmentType}
          attachmentType={attachmentType}
        />
        <Tick
          label="Video link"
          asset="video"
          setAttachmentType={setAttachmentType}
          attachmentType={attachmentType}
        />
      </div>

      {attachmentType === "image" ? (
        <div className="mt-3 space-y-2">
          <label className="block text-sm font-medium text-neutral-800">
            Upload image (PNG, JPG, or WebP)
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className={fileInputClass}
            onChange={onImageChange}
          />
          {imageFile ? (
            <p className="text-xs text-neutral-600">
              Selected: {imageFile.name}
            </p>
          ) : null}
          <p className="rounded-lg bg-amber-50 px-2 py-1.5 text-xs text-amber-900/90">
            Recommended size 496(H) × 800(W)
          </p>
        </div>
      ) : null}

      {attachmentType === "video" ? (
        <div className="mt-3 space-y-2">
          <label className="block text-sm font-medium text-neutral-800">
            Video URL (YouTube or hosted link)
          </label>
          <input
            type="url"
            value={creativeVideoUrl}
            onChange={(e) => onVideoUrlChange(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full rounded-xl border border-neutral-200 bg-white p-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          />
          <p className="text-xs text-neutral-500">
            Videos are links only — no file upload for video creatives.
          </p>
        </div>
      ) : null}

      {attachmentType === "none" ? (
        <p className="mt-3 text-sm text-neutral-500">
          You can book with your message only — no creative required.
        </p>
      ) : null}
    </section>
  );
}
