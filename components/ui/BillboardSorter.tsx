import React from "react";

const cancel = "/icons/usericon/modalCancelBotton.svg";

export type BillboardFilterForm = {
  boardType: string;
  minPrice: string;
  maxPrice: string;
  location: string;
  negotiable: "all" | "yes" | "no";
};

type Props = {
  modal: boolean;
  toggleModal: () => void;
  value: BillboardFilterForm;
  onChange: (next: BillboardFilterForm) => void;
  onApply: () => void;
};

const BillboardSorter = ({
  toggleModal,
  modal,
  value,
  onChange,
  onApply,
}: Props) => {
  const set = <K extends keyof BillboardFilterForm>(
    key: K,
    v: BillboardFilterForm[K],
  ) => onChange({ ...value, [key]: v });

  return (
    <div>
      <div className="flex justify-between">
        <p>Filter billboard</p>
        {modal ? (
          <button type="button" onClick={toggleModal}>
            <img src={cancel} alt="" className="w-5" />
          </button>
        ) : null}
      </div>

      <div className="my-2">
        <p>Billboard type</p>
        <select
          value={value.boardType}
          onChange={(e) => set("boardType", e.target.value)}
          className="p-2 border focus:outline-none rounded w-full"
        >
          <option value="">Any</option>
          <option value="digital">Digital</option>
          <option value="led">LED</option>
          <option value="unipole">Unipole</option>
          <option value="billboard_bridge">Billboard bridge</option>
        </select>
      </div>

      <div className="my-2">
        <p>Price range (effective daily rate)</p>
        <div className="flex justify-between space-x-1">
          <div className="basis-1/2">
            <label htmlFor="price-from">From</label>
            <input
              id="price-from"
              type="number"
              min={0}
              value={value.minPrice}
              onChange={(e) => set("minPrice", e.target.value)}
              className="rounded w-full border focus:outline-none p-2"
              placeholder="₦"
            />
          </div>
          <div className="basis-1/2">
            <label htmlFor="price-to">To</label>
            <input
              id="price-to"
              type="number"
              min={0}
              value={value.maxPrice}
              onChange={(e) => set("maxPrice", e.target.value)}
              className="rounded w-full border focus:outline-none p-2"
              placeholder="₦"
            />
          </div>
        </div>
      </div>

      <div className="my-2">
        <p>Location</p>
        <input
          type="text"
          value={value.location}
          onChange={(e) => set("location", e.target.value)}
          placeholder="City, area, or address"
          className="border focus:outline-none rounded w-full p-2"
        />
      </div>

      <div className="my-2">
        <p>Negotiable</p>
        <select
          value={value.negotiable}
          onChange={(e) =>
            set(
              "negotiable",
              e.target.value as BillboardFilterForm["negotiable"],
            )
          }
          className="p-2 border focus:outline-none rounded w-full"
        >
          <option value="all">Any</option>
          <option value="yes">Negotiable</option>
          <option value="no">Non-negotiable</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onApply}
        className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5 text-white w-2/6 h-10"
      >
        Search
      </button>
    </div>
  );
};

export default BillboardSorter;
