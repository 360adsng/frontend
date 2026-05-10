import { i as useSetMyBillboardCoverage, n as useMe, r as useMyBillboardCoverage } from "./useUsers-DVvp5kzp.js";
import { n as getStateById, t as NIGERIA_STATES_LGAS } from "./nigeriaStatesLgas-By0dCEv4.js";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region components/vendor-settings/billboards/BillboardCoverageEditor.tsx
function BillboardCoverageEditor({ rows, onChange, inputBase }) {
	const stateOptions = useMemo(() => NIGERIA_STATES_LGAS.map((s) => ({
		id: s.id,
		name: s.name
	})), []);
	const setRowState = (index, stateId) => {
		onChange(rows.map((r, i) => i === index ? {
			state: stateId,
			lga: []
		} : r));
	};
	const addRow = () => onChange([...rows, {
		state: "",
		lga: []
	}]);
	const removeRow = (index) => onChange(rows.length <= 1 ? rows : rows.filter((_, i) => i !== index));
	const toggleLga = (rowIndex, lgaName) => {
		onChange(rows.map((r, i) => {
			if (i !== rowIndex) return r;
			const next = new Set(r.lga);
			if (next.has(lgaName)) next.delete(lgaName);
			else next.add(lgaName);
			return {
				...r,
				lga: Array.from(next)
			};
		}));
	};
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
			className: "font-medium text-stone-900",
			children: "Billboard coverage"
		}), /* @__PURE__ */ jsx("div", {
			className: "text-xs text-stone-500",
			children: "Select the states and LGAs you cover."
		})] }), /* @__PURE__ */ jsx("button", {
			type: "button",
			className: "rounded-10 border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50",
			onClick: addRow,
			children: "Add state"
		})]
	}), /* @__PURE__ */ jsx("div", {
		className: "mt-3 space-y-4",
		children: rows.map((r, idx) => {
			const lgas = getStateById(r.state)?.lgas ?? [];
			return /* @__PURE__ */ jsxs("div", {
				className: "rounded-10 border border-stone-200 p-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "w-full max-w-sm",
						children: [/* @__PURE__ */ jsx("label", {
							className: "text-sm text-stone-700",
							children: "State"
						}), /* @__PURE__ */ jsxs("select", {
							className: inputBase,
							value: r.state,
							onChange: (e) => setRowState(idx, e.target.value),
							children: [/* @__PURE__ */ jsx("option", {
								value: "",
								children: "Select state"
							}), stateOptions.map((s) => /* @__PURE__ */ jsx("option", {
								value: s.id,
								children: s.name
							}, s.id))]
						})]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "text-xs text-red-700 hover:underline",
						onClick: () => removeRow(idx),
						children: "Remove"
					})]
				}), r.state ? /* @__PURE__ */ jsxs("div", {
					className: "mt-3",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-sm text-stone-700 mb-2",
						children: "LGAs"
					}), lgas.length === 0 ? /* @__PURE__ */ jsx("div", {
						className: "text-sm text-stone-500",
						children: "No LGAs found."
					}) : /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 md:grid-cols-3 gap-2",
						children: lgas.map((name) => {
							const checked = r.lga.includes(name);
							return /* @__PURE__ */ jsxs("label", {
								className: `flex items-center gap-2 rounded-lg border px-3 py-2 text-xs cursor-pointer ${checked ? "border-ads360yellow-100 bg-amber-50/60" : "border-stone-200 hover:bg-stone-50"}`,
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked,
									onChange: () => toggleLga(idx, name)
								}), /* @__PURE__ */ jsx("span", { children: name })]
							}, name);
						})
					})]
				}) : null]
			}, `${idx}-${r.state}`);
		})
	})] });
}
//#endregion
//#region app/vendors/billboards/settings/coverage/index.tsx?tsr-split=component
var dash = "/icons/dash.svg";
var inputBase = "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10";
function CoverageSettingsPage() {
	const me = useMe().data;
	const coverageQuery = useMyBillboardCoverage();
	const { mutate: saveCoverage, isPending: isSaving } = useSetMyBillboardCoverage();
	const canEdit = me?.accountType === "billboard_owner";
	const [rows, setRows] = useState([{
		state: "",
		lga: []
	}]);
	useEffect(() => {
		if (!canEdit) return;
		const cov = coverageQuery.data?.billboardCoverage ?? [];
		if (cov.length) setRows(cov.map((c) => ({
			state: c.state,
			lga: c.lga ?? []
		})));
	}, [canEdit, coverageQuery.data]);
	const cleaned = useMemo(() => rows.filter((r) => r.state && (r.lga?.length ?? 0) > 0), [rows]);
	return /* @__PURE__ */ jsx("div", {
		className: "w-full h-full bg-[#FDFBF9] py-10",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-[92%] max-w-6xl mx-auto bg-white rounded-10 p-8 md:p-10 border border-[#EEE9E5]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx("img", {
						src: dash,
						alt: "",
						className: "w-6 h-6"
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-lg font-semibold text-stone-900",
						children: "Billboard coverage"
					}), /* @__PURE__ */ jsx("div", {
						className: "text-sm text-stone-500",
						children: "Select the states and LGAs you cover."
					})] })]
				}), /* @__PURE__ */ jsx(Link, {
					to: "/vendors/billboards/settings/",
					className: "text-sm font-semibold text-stone-700 hover:underline",
					children: "Back to settings"
				})]
			}), !canEdit ? /* @__PURE__ */ jsx("div", {
				className: "mt-6 text-sm text-stone-600",
				children: "You don't have permission to edit coverage."
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
				className: "mt-6",
				children: /* @__PURE__ */ jsx(BillboardCoverageEditor, {
					rows,
					onChange: setRows,
					inputBase
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-6 flex items-center justify-end gap-3",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "rounded-10 border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50",
					onClick: () => setRows([{
						state: "",
						lga: []
					}]),
					disabled: isSaving,
					children: "Reset"
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "rounded-10 bg-ads360yellow-100 px-4 py-2 text-sm font-semibold text-black hover:bg-ads360yellow-200 disabled:opacity-60",
					disabled: isSaving,
					onClick: () => saveCoverage({ billboardCoverage: cleaned }),
					children: isSaving ? "Saving..." : "Save coverage"
				})]
			})] })]
		})
	});
}
//#endregion
export { CoverageSettingsPage as component };
