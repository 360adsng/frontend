export type SettingsProfileTab = "profile" | "password";

const TAB_ITEMS: { key: SettingsProfileTab; label: string }[] = [
  { key: "profile", label: "Edit Profile" },
  { key: "password", label: "Change Password" },
];

type SettingsProfileTabsProps = {
  tab: SettingsProfileTab;
  onTabChange: (tab: SettingsProfileTab) => void;
  className?: string;
};

/** Pill tabs — matches `/users/campaign` and negotiations list styling. */
export function SettingsProfileTabs({
  tab,
  onTabChange,
  className = "",
}: SettingsProfileTabsProps) {
  return (
    <div
      className={`mb-6 flex flex-wrap gap-2 border-b border-stone-200 pb-2 ${className}`.trim()}
    >
      {TAB_ITEMS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onTabChange(key)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            tab === key
              ? "bg-stone-900 text-white"
              : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
