import { i as baseFetchJson, r as ApiError, t as COUNTRIES } from "./countries-DNj5C3SE.js";
import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
//#region endpoint/users/users.ts
function getMe() {
	return baseFetchJson("/users/me", { method: "GET" });
}
function updateProfile(payload) {
	return baseFetchJson("/users/profile", {
		method: "PATCH",
		body: payload
	});
}
function changePassword(payload) {
	return baseFetchJson("/users/password", {
		method: "PATCH",
		body: payload
	});
}
async function uploadProfilePhoto(file) {
	const form = new FormData();
	form.append("file", file);
	return baseFetchJson("/users/profile/photo", {
		method: "POST",
		body: form
	});
}
//#endregion
//#region endpoint/users/useUsers.ts
function errorMessage(error) {
	if (error instanceof ApiError) return error.message;
	if (error instanceof Error) return error.message;
	return "Something went wrong. Please try again.";
}
function useMe() {
	return useQuery({
		queryKey: ["me"],
		queryFn: getMe
	});
}
function useUpdateProfile() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: updateProfile,
		onSuccess: async (data) => {
			toast.success(data?.message ?? "Profile updated.");
			await qc.invalidateQueries({ queryKey: ["me"] });
		},
		onError: (error) => {
			toast.error(errorMessage(error));
		}
	});
}
function useChangePassword() {
	return useMutation({
		mutationFn: changePassword,
		onSuccess: (data) => {
			toast.success(data?.message ?? "Password changed.");
		},
		onError: (error) => {
			toast.error(errorMessage(error));
		}
	});
}
function useUploadProfilePhoto() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: uploadProfilePhoto,
		onSuccess: async (data) => {
			toast.success(data?.message ?? "Photo uploaded.");
			await qc.invalidateQueries({ queryKey: ["me"] });
		},
		onError: (error) => {
			toast.error(errorMessage(error));
		}
	});
}
//#endregion
//#region app/_usersauth/users/settings/index.tsx?tsr-split=component
var dash = "/icons/dash.svg";
var avatarFallback = "/icons/user.png";
var profileSchemaRegular = z.object({
	firstName: z.string().trim().min(1, "First name is required."),
	lastName: z.string().trim().min(1, "Last name is required."),
	occupation: z.string().trim().optional(),
	address: z.string().trim().optional(),
	altPhoneCountryIso2: z.string().trim().optional(),
	altPhoneNationalNumber: z.string().trim().optional()
});
var profileSchemaBusiness = z.object({
	contactName: z.string().trim().min(1, "Contact name is required."),
	businessDescription: z.string().trim().optional(),
	altPhoneCountryIso2: z.string().trim().optional(),
	altPhoneNationalNumber: z.string().trim().optional()
});
var passwordSchema = z.object({
	oldPassword: z.string().trim().min(1, "Old password is required."),
	newPassword: z.string().trim().min(8, "New password must be at least 8 characters."),
	confirmNewPassword: z.string().trim().min(1, "Confirm your new password.")
}).refine((d) => d.newPassword === d.confirmNewPassword, {
	path: ["confirmNewPassword"],
	message: "Passwords do not match."
});
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "text-sm text-red-600 mt-1",
		children: message
	});
}
var inputBase = "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10";
function phonePartsFromE164(e164) {
	if (!e164) return null;
	const parsed = parsePhoneNumberFromString(e164);
	if (!parsed?.isValid()) return null;
	return {
		countryIso2: parsed.country ?? "",
		nationalNumber: parsed.nationalNumber ?? ""
	};
}
function toE164FromParts(countryIso2, nationalNumber) {
	const trimmed = nationalNumber.trim().replace(/[\s-]/g, "");
	if (!countryIso2 || !trimmed) return null;
	const parsed = parsePhoneNumberFromString(trimmed, countryIso2);
	if (!parsed?.isValid()) return null;
	return parsed.format("E.164");
}
function SettingsPage() {
	const [tab, setTab] = useState("profile");
	const meQuery = useMe();
	const me = meQuery.data;
	const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
	const { mutate: uploadPhoto, isPending: isUploadingPhoto } = useUploadProfilePhoto();
	const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword();
	const [profileErrors, setProfileErrors] = useState({});
	const [passwordErrors, setPasswordErrors] = useState({});
	const defaultCountryIso2 = COUNTRIES[0]?.iso2 ?? "NG";
	const [regularForm, setRegularForm] = useState({
		firstName: "",
		lastName: "",
		occupation: "",
		address: "",
		altPhoneCountryIso2: defaultCountryIso2,
		altPhoneNationalNumber: ""
	});
	const [businessForm, setBusinessForm] = useState({
		contactName: "",
		businessDescription: "",
		altPhoneCountryIso2: defaultCountryIso2,
		altPhoneNationalNumber: ""
	});
	const [avatarPreview, setAvatarPreview] = useState(avatarFallback);
	const [passwordForm, setPasswordForm] = useState({
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: ""
	});
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	useEffect(() => {
		if (!me) return;
		setAvatarPreview(me.profileImage || avatarFallback);
		if (me.accountType === "regular_user") {
			const parts = phonePartsFromE164(me.alternatePhoneNumber);
			setRegularForm({
				firstName: me.firstName ?? "",
				lastName: me.lastName ?? "",
				occupation: me.occupation ?? "",
				address: me.address ?? "",
				altPhoneCountryIso2: parts?.countryIso2 || defaultCountryIso2,
				altPhoneNationalNumber: parts?.nationalNumber || ""
			});
		} else if (me.accountType === "business_user") {
			const parts = phonePartsFromE164(me.alternatePhoneNumber);
			setBusinessForm({
				contactName: me.contactName ?? "",
				businessDescription: me.businessDescription ?? "",
				altPhoneCountryIso2: parts?.countryIso2 || defaultCountryIso2,
				altPhoneNationalNumber: parts?.nationalNumber || ""
			});
		}
	}, [me]);
	const accountTypeLabel = useMemo(() => {
		if (!me) return "";
		return me.accountType === "business_user" ? "Business" : "Individual";
	}, [me]);
	const onSaveProfile = (e) => {
		e.preventDefault();
		setProfileErrors({});
		if (!me) return;
		if (me.accountType === "regular_user") {
			const parsed = profileSchemaRegular.safeParse(regularForm);
			if (!parsed.success) {
				const map = {};
				for (const issue of parsed.error.issues) map[issue.path.join(".")] = issue.message;
				setProfileErrors(map);
				return;
			}
			const altFilled = Boolean(parsed.data.altPhoneCountryIso2?.trim()) || Boolean(parsed.data.altPhoneNationalNumber?.trim());
			const altE164 = altFilled ? toE164FromParts(parsed.data.altPhoneCountryIso2 || "", parsed.data.altPhoneNationalNumber || "") : null;
			if (altFilled && !altE164) {
				setProfileErrors({ altPhoneNationalNumber: "Enter a valid alternate phone number." });
				return;
			}
			updateProfile({
				firstName: parsed.data.firstName,
				lastName: parsed.data.lastName,
				occupation: parsed.data.occupation,
				address: parsed.data.address,
				alternatePhoneNumber: altE164 ?? void 0
			});
			return;
		}
		if (me.accountType === "business_user") {
			const parsed = profileSchemaBusiness.safeParse(businessForm);
			if (!parsed.success) {
				const map = {};
				for (const issue of parsed.error.issues) map[issue.path.join(".")] = issue.message;
				setProfileErrors(map);
				return;
			}
			const altFilled = Boolean(parsed.data.altPhoneCountryIso2?.trim()) || Boolean(parsed.data.altPhoneNationalNumber?.trim());
			const altE164 = altFilled ? toE164FromParts(parsed.data.altPhoneCountryIso2 || "", parsed.data.altPhoneNationalNumber || "") : null;
			if (altFilled && !altE164) {
				setProfileErrors({ altPhoneNationalNumber: "Enter a valid alternate phone number." });
				return;
			}
			updateProfile({
				contactName: parsed.data.contactName,
				businessDescription: parsed.data.businessDescription,
				alternatePhoneNumber: altE164 ?? void 0
			});
		}
	};
	const onSavePassword = (e) => {
		e.preventDefault();
		setPasswordErrors({});
		const parsed = passwordSchema.safeParse(passwordForm);
		if (!parsed.success) {
			const map = {};
			for (const issue of parsed.error.issues) map[issue.path.join(".")] = issue.message;
			setPasswordErrors(map);
			return;
		}
		changePassword({
			oldPassword: parsed.data.oldPassword,
			newPassword: parsed.data.newPassword
		}, { onSuccess: () => {
			setPasswordForm({
				oldPassword: "",
				newPassword: "",
				confirmNewPassword: ""
			});
		} });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-14",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-2xl",
				children: "Settings"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-[#8B8B8B] mb-5 mt-3",
				children: [
					accountTypeLabel ? `${accountTypeLabel} account` : "Account",
					" ",
					"settings"
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "w-full flex text-sm md:text-base md:justify-start space-x-3",
				children: [/* @__PURE__ */ jsxs("button", {
					className: "relative",
					onClick: () => setTab("profile"),
					children: ["Edit Profile", tab === "profile" && /* @__PURE__ */ jsx("img", {
						alt: "selected",
						src: dash,
						className: "w-2/3 mx-auto absolute top-[20px] left-[17%]"
					})]
				}), /* @__PURE__ */ jsxs("button", {
					className: "relative",
					onClick: () => setTab("password"),
					children: ["Change Password", tab === "password" && /* @__PURE__ */ jsx("img", {
						alt: "selected",
						src: dash,
						className: "w-2/5 mx-auto absolute top-[20px] left-[17%]"
					})]
				})]
			})
		]
	}), /* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash px-4 md:px-10 py-14",
		children: [
			meQuery.isLoading && /* @__PURE__ */ jsx("p", { children: "Loading..." }),
			meQuery.isError && /* @__PURE__ */ jsx("p", { children: "Failed to load profile." }),
			tab === "profile" && me && /* @__PURE__ */ jsxs("div", {
				className: "border border-ads360yellow-100 bg-white rounded-10 my-5 p-4 md:p-6",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "my-5 font-bold",
						children: "User Details"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "text-center mb-8",
						children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: "profilePhoto",
								className: "inline-block cursor-pointer",
								children: [/* @__PURE__ */ jsx("img", {
									alt: "profile",
									src: avatarPreview,
									className: "w-20 h-20 mx-auto bg-[#f1f1f1] rounded-full object-cover"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm text-gray-600 mt-3",
									children: "Click the image to change"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								id: "profilePhoto",
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (e) => {
									const file = e.target.files?.[0];
									if (!file) return;
									setAvatarPreview(URL.createObjectURL(file));
									uploadPhoto(file, { onSuccess: (data) => {
										if (data?.url) setAvatarPreview(data.url);
									} });
								}
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xs text-gray-500",
								children: isUploadingPhoto ? "Uploading..." : "Select an image to upload."
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("label", { children: "Email:" }), /* @__PURE__ */ jsx("input", {
								value: me.email,
								disabled: true,
								className: `${inputBase} bg-gray-100`
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("label", { children: "Phone Number:" }), /* @__PURE__ */ jsx("input", {
								value: me.phone,
								disabled: true,
								className: `${inputBase} bg-gray-100`
							})]
						})] })
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: onSaveProfile,
						children: [me.accountType === "regular_user" ? /* @__PURE__ */ jsxs("div", {
							className: "md:flex justify-evenly",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "md:w-[40%] px-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", { children: "First Name:" }),
										/* @__PURE__ */ jsx("input", {
											value: regularForm.firstName,
											onChange: (e) => setRegularForm((p) => ({
												...p,
												firstName: e.target.value
											})),
											className: inputBase
										}),
										/* @__PURE__ */ jsx(FieldError, { message: profileErrors.firstName })
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", { children: "Last Name:" }),
										/* @__PURE__ */ jsx("input", {
											value: regularForm.lastName,
											onChange: (e) => setRegularForm((p) => ({
												...p,
												lastName: e.target.value
											})),
											className: inputBase
										}),
										/* @__PURE__ */ jsx(FieldError, { message: profileErrors.lastName })
									]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "md:w-[40%] px-3",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "my-3",
										children: [
											/* @__PURE__ */ jsx("label", { children: "Alternate Phone Number:" }),
											/* @__PURE__ */ jsxs("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ jsx("select", {
													value: regularForm.altPhoneCountryIso2,
													onChange: (e) => setRegularForm((p) => ({
														...p,
														altPhoneCountryIso2: e.target.value
													})),
													className: inputBase,
													children: COUNTRIES.map((c) => /* @__PURE__ */ jsxs("option", {
														value: c.iso2,
														children: [
															c.flag,
															" +",
															c.callingCode
														]
													}, c.iso2))
												}), /* @__PURE__ */ jsx("input", {
													value: regularForm.altPhoneNationalNumber,
													onChange: (e) => setRegularForm((p) => ({
														...p,
														altPhoneNationalNumber: e.target.value
													})),
													className: inputBase,
													placeholder: "8012345678",
													inputMode: "tel"
												})]
											}),
											/* @__PURE__ */ jsx(FieldError, { message: profileErrors.altPhoneNationalNumber })
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "my-3",
										children: [
											/* @__PURE__ */ jsx("label", { children: "Occupation:" }),
											/* @__PURE__ */ jsx("input", {
												value: regularForm.occupation,
												onChange: (e) => setRegularForm((p) => ({
													...p,
													occupation: e.target.value
												})),
												className: inputBase
											}),
											/* @__PURE__ */ jsx(FieldError, { message: profileErrors.occupation })
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "my-3",
										children: [
											/* @__PURE__ */ jsx("label", { children: "Address:" }),
											/* @__PURE__ */ jsx("textarea", {
												value: regularForm.address,
												onChange: (e) => setRegularForm((p) => ({
													...p,
													address: e.target.value
												})),
												className: inputBase
											}),
											/* @__PURE__ */ jsx(FieldError, { message: profileErrors.address })
										]
									})
								]
							})]
						}) : /* @__PURE__ */ jsxs("div", {
							className: "md:flex justify-evenly",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "md:w-[40%] px-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", { children: "Contact Name:" }),
										/* @__PURE__ */ jsx("input", {
											value: businessForm.contactName,
											onChange: (e) => setBusinessForm((p) => ({
												...p,
												contactName: e.target.value
											})),
											className: inputBase
										}),
										/* @__PURE__ */ jsx(FieldError, { message: profileErrors.contactName })
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", { children: "Alternate Phone Number:" }),
										/* @__PURE__ */ jsxs("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsx("select", {
												value: businessForm.altPhoneCountryIso2,
												onChange: (e) => setBusinessForm((p) => ({
													...p,
													altPhoneCountryIso2: e.target.value
												})),
												className: inputBase,
												children: COUNTRIES.map((c) => /* @__PURE__ */ jsxs("option", {
													value: c.iso2,
													children: [
														c.flag,
														" +",
														c.callingCode
													]
												}, c.iso2))
											}), /* @__PURE__ */ jsx("input", {
												value: businessForm.altPhoneNationalNumber,
												onChange: (e) => setBusinessForm((p) => ({
													...p,
													altPhoneNationalNumber: e.target.value
												})),
												className: inputBase,
												placeholder: "8012345678",
												inputMode: "tel"
											})]
										}),
										/* @__PURE__ */ jsx(FieldError, { message: profileErrors.altPhoneNationalNumber })
									]
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "md:w-[40%] px-3",
								children: /* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", { children: "Business Description:" }),
										/* @__PURE__ */ jsx("textarea", {
											value: businessForm.businessDescription,
											onChange: (e) => setBusinessForm((p) => ({
												...p,
												businessDescription: e.target.value
											})),
											className: inputBase
										}),
										/* @__PURE__ */ jsx(FieldError, { message: profileErrors.businessDescription })
									]
								})
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "text-center my-7",
							children: /* @__PURE__ */ jsx("button", {
								disabled: isUpdating,
								type: "submit",
								className: "group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 py-2 px-4 disabled:opacity-60 disabled:cursor-not-allowed",
								children: isUpdating ? "Saving..." : "Save"
							})
						})]
					})
				]
			}),
			tab === "password" && /* @__PURE__ */ jsx("div", {
				className: "border border-ads360yellow-100 bg-white rounded-10 my-5 p-4 md:p-6",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto w-full md:w-1/2",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "my-5 font-bold",
						children: "Change Password"
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: onSavePassword,
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "my-3",
								children: [
									/* @__PURE__ */ jsx("label", { children: "Old Password:" }),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx("input", {
											type: showOldPassword ? "text" : "password",
											value: passwordForm.oldPassword,
											onChange: (e) => setPasswordForm((p) => ({
												...p,
												oldPassword: e.target.value
											})),
											className: inputBase
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700",
											onClick: () => setShowOldPassword((s) => !s),
											children: showOldPassword ? "Hide" : "Show"
										})]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: passwordErrors.oldPassword })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "my-3",
								children: [
									/* @__PURE__ */ jsx("label", { children: "New Password:" }),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx("input", {
											type: showNewPassword ? "text" : "password",
											value: passwordForm.newPassword,
											onChange: (e) => setPasswordForm((p) => ({
												...p,
												newPassword: e.target.value
											})),
											className: inputBase
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700",
											onClick: () => setShowNewPassword((s) => !s),
											children: showNewPassword ? "Hide" : "Show"
										})]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: passwordErrors.newPassword })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "my-3",
								children: [
									/* @__PURE__ */ jsx("label", { children: "Confirm Password:" }),
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [/* @__PURE__ */ jsx("input", {
											type: showConfirmPassword ? "text" : "password",
											value: passwordForm.confirmNewPassword,
											onChange: (e) => setPasswordForm((p) => ({
												...p,
												confirmNewPassword: e.target.value
											})),
											className: inputBase
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700",
											onClick: () => setShowConfirmPassword((s) => !s),
											children: showConfirmPassword ? "Hide" : "Show"
										})]
									}),
									/* @__PURE__ */ jsx(FieldError, { message: passwordErrors.confirmNewPassword })
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-center my-7",
								children: /* @__PURE__ */ jsx("button", {
									disabled: isChangingPassword,
									type: "submit",
									className: "group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 py-2 px-4 disabled:opacity-60 disabled:cursor-not-allowed",
									children: isChangingPassword ? "Saving..." : "Save"
								})
							})
						]
					})]
				})
			})
		]
	})] });
}
//#endregion
export { SettingsPage as component };
