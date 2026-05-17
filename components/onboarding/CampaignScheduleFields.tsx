import CalenderBox from "@components/inputs/CalenderBox";
import { Value } from "react-calendar/dist/cjs/shared/types";

type DurationState = { startday: string; duration: string };

type Props = {
  plan: string;
  onPlanChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedDate: valuePiece[];
  addDate: (info: Value) => void;
  removeDate: (rmDate: valuePiece) => void;
  startWeek: DurationState;
  startMonth: DurationState;
  onDurationChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "week" | "month",
  ) => void;
  minStartDate: string;
};

const fieldClass =
  "mt-1 w-full rounded-xl border border-neutral-200 bg-white p-2.5 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30";

export function CampaignScheduleFields({
  plan,
  onPlanChange,
  selectedDate,
  addDate,
  removeDate,
  startWeek,
  startMonth,
  onDurationChange,
  minStartDate,
}: Props) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-4">
      <h4 className="font-bold text-neutral-900">Campaign schedule</h4>
      <p className="mt-1 text-xs text-neutral-500">
        Choose when your ad should run on this placement.
      </p>

      <label className="mt-3 block text-sm font-medium text-neutral-800">
        Duration plan
      </label>
      <select
        value={plan || "Select"}
        onChange={onPlanChange}
        className={fieldClass}
      >
        <option value="Select">Select a plan</option>
        <option value="Days">Specific days</option>
        <option value="Weeks">Weekly block</option>
        <option value="Months">Monthly block</option>
      </select>

      {plan === "Days" ? (
        <div className="mt-3">
          <CalenderBox
            addDate={addDate}
            selectedDate={selectedDate}
            removeDate={removeDate}
          />
        </div>
      ) : null}

      {plan === "Weeks" ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-neutral-800">
              Start date
            </label>
            <input
              type="date"
              min={minStartDate}
              value={startWeek.startday}
              name="startday"
              onChange={(e) => onDurationChange(e, "week")}
              className={fieldClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-800">
              Number of weeks
            </label>
            <input
              value={startWeek.duration}
              name="duration"
              type="number"
              min={1}
              onChange={(e) => onDurationChange(e, "week")}
              className={fieldClass}
            />
          </div>
        </div>
      ) : null}

      {plan === "Months" ? (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-neutral-800">
              Start date
            </label>
            <input
              type="date"
              min={minStartDate}
              value={startMonth.startday}
              name="startday"
              onChange={(e) => onDurationChange(e, "month")}
              className={fieldClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-800">
              Number of months
            </label>
            <input
              value={startMonth.duration}
              name="duration"
              type="number"
              min={1}
              onChange={(e) => onDurationChange(e, "month")}
              className={fieldClass}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
