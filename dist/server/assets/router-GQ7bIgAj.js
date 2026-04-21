import { c as baseFetchJson, d as hasAccessToken$1, f as saveAccountType, l as clearAuthTokens, o as ACCESS_TOKEN_STORAGE_KEY, p as saveAuthTokens, r as useMe, s as ApiError, t as COUNTRIES$1, u as getAccountType } from "./countries-BHYilOdD.js";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent, redirect, useNavigate, useParams, useRouter, useRouterState, useSearch } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import RawCountUp from "react-countup";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Calendar from "react-calendar";
//#region node_modules/sonner/dist/styles.css?url
var styles_default = "/assets/styles-DDCWxn3B.css";
//#endregion
//#region styles/global.css?url
var global_default = "/assets/global-DT2UeY7D.css";
//#endregion
//#region node_modules/react-icons/lib/esm/iconContext.js
var DefaultContext = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
};
var IconContext = React.createContext && React.createContext(DefaultContext);
//#endregion
//#region node_modules/react-icons/lib/esm/iconBase.js
var __assign = function() {
	__assign = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
};
function Tree2Element(tree) {
	return tree && tree.map(function(node, i) {
		return React.createElement(node.tag, __assign({ key: i }, node.attr), Tree2Element(node.child));
	});
}
function GenIcon(data) {
	return function(props) {
		return React.createElement(IconBase, __assign({ attr: __assign({}, data.attr) }, props), Tree2Element(data.child));
	};
}
function IconBase(props) {
	var elem = function(conf) {
		var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, [
			"attr",
			"size",
			"title"
		]);
		var computedSize = size || conf.size || "1em";
		var className;
		if (conf.className) className = conf.className;
		if (props.className) className = (className ? className + " " : "") + props.className;
		return React.createElement("svg", __assign({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, conf.attr, attr, svgProps, {
			className,
			style: __assign(__assign({ color: props.color || conf.color }, conf.style), props.style),
			height: computedSize,
			width: computedSize,
			xmlns: "http://www.w3.org/2000/svg"
		}), title && React.createElement("title", null, title), props.children);
	};
	return IconContext !== void 0 ? React.createElement(IconContext.Consumer, null, function(conf) {
		return elem(conf);
	}) : elem(DefaultContext);
}
//#endregion
//#region node_modules/react-icons/fi/index.esm.js
function FiArrowRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "5",
				"y1": "12",
				"x2": "19",
				"y2": "12"
			}
		}, {
			"tag": "polyline",
			"attr": { "points": "12 5 19 12 12 19" }
		}]
	})(props);
}
function FiMenu(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "12",
					"x2": "21",
					"y2": "12"
				}
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "6",
					"x2": "21",
					"y2": "6"
				}
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "18",
					"x2": "21",
					"y2": "18"
				}
			}
		]
	})(props);
}
//#endregion
//#region components/NotFoundPage.tsx
var notfound = "/images/404.png";
function NotFoundPage() {
	return /* @__PURE__ */ jsxs("section", {
		className: "fixed h-full w-full bg-ads360black-100",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex justify-center drop-shadow pt-32",
			children: /* @__PURE__ */ jsx("img", {
				src: notfound,
				alt: "404",
				className: "max-w-full h-auto"
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "flex justify-center my-10",
			children: /* @__PURE__ */ jsx(Link, {
				to: "/",
				children: /* @__PURE__ */ jsxs("span", {
					className: "group flex w-[238px]",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "group-hover:translate-x-48 group-hover:bg-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white",
						children: /* @__PURE__ */ jsx(FiArrowRight, { size: 28 })
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "group-hover:-translate-x-11  group-hover:bg-ads360light-100 w-48 transition rounded-10 bg-ads360yellowBtn-100 h-12",
						children: "Back to HomePage"
					})]
				})
			})
		})]
	});
}
//#endregion
//#region app/__root.tsx
var Route$54 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "360 Ads" }
		],
		links: [
			{
				rel: "stylesheet",
				href: global_default
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
			}
		]
	}),
	notFoundComponent: NotFoundPage,
	component: RootLayout
});
function RootLayout() {
	const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1e3 } } }));
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [/* @__PURE__ */ jsxs(QueryClientProvider, {
			client: queryClient,
			children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster, {
				theme: "light",
				position: "top-center",
				richColors: true,
				closeButton: true
			})]
		}), /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
//#endregion
//#region lib/auth.ts
function hasAccessToken() {
	if (typeof window === "undefined") return false;
	return Boolean(localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY));
}
//#endregion
//#region lib/accountDashboard.ts
/** Mirrors backend `AccountType` enum. */
var ACCOUNT_TYPE = {
	REGULAR_USER: "regular_user",
	BUSINESS_USER: "business_user",
	BILLBOARD_OWNER: "billboard_owner",
	ADMIN: "admin"
};
var USER_DASHBOARD = "/users";
var BILLBOARD_DASHBOARD = "/vendors/billboards";
var ADMIN_DASHBOARD = "/admin";
var SIGN_IN = "/signin";
/** Where to send a user after login (or when they are already authenticated). */
function getDashboardPathForAccountType(accountType) {
	switch (accountType) {
		case ACCOUNT_TYPE.REGULAR_USER:
		case ACCOUNT_TYPE.BUSINESS_USER: return USER_DASHBOARD;
		case ACCOUNT_TYPE.BILLBOARD_OWNER: return BILLBOARD_DASHBOARD;
		case ACCOUNT_TYPE.ADMIN: return ADMIN_DASHBOARD;
		default: return SIGN_IN;
	}
}
//#endregion
//#region components/auth/DashboardGate.tsx
var MODE_ALLOWED = {
	users: [ACCOUNT_TYPE.REGULAR_USER, ACCOUNT_TYPE.BUSINESS_USER],
	billboard: [ACCOUNT_TYPE.BILLBOARD_OWNER],
	admin: [ACCOUNT_TYPE.ADMIN]
};
/**
* Enforces account type on the client before rendering children. Required because
* `beforeLoad` skips when `window` is undefined (SSR), so the wrong dashboard could
* otherwise flash until some interaction re-ran guards.
*/
function DashboardGate({ mode, children }) {
	const router = useRouter();
	const [allowed, setAllowed] = useState(false);
	useEffect(() => {
		const expected = MODE_ALLOWED[mode];
		if (!hasAccessToken()) {
			router.navigate({
				to: "/signin",
				replace: true
			});
			return;
		}
		const at = getAccountType();
		if (!at) {
			router.navigate({
				to: "/signin",
				replace: true
			});
			return;
		}
		if (!expected.includes(at)) {
			router.navigate({
				to: getDashboardPathForAccountType(at),
				replace: true
			});
			return;
		}
		setAllowed(true);
	}, [mode, router]);
	if (!allowed) return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-ads360-hash",
		"aria-busy": "true",
		"aria-label": "Checking access",
		children: /* @__PURE__ */ jsx("p", {
			className: "text-sm text-gray-600",
			children: "Loading…"
		})
	});
	return /* @__PURE__ */ jsx(Fragment, { children });
}
//#endregion
//#region app/_usersauth/route.tsx
var Layout$6 = () => {
	return /* @__PURE__ */ jsx(DashboardGate, {
		mode: "users",
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
};
var Route$53 = createFileRoute("/_usersauth")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (!hasAccessToken()) throw redirect({ to: "/signin" });
		const at = getAccountType();
		if (!at) throw redirect({ to: "/signin" });
		if (at !== ACCOUNT_TYPE.REGULAR_USER && at !== ACCOUNT_TYPE.BUSINESS_USER) throw redirect({ to: getDashboardPathForAccountType(at) });
	},
	component: Layout$6
});
//#endregion
//#region app/_admin/route.tsx
var Layout$5 = () => /* @__PURE__ */ jsx(DashboardGate, {
	mode: "admin",
	children: /* @__PURE__ */ jsx(Outlet, {})
});
var Route$52 = createFileRoute("/_admin")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (!hasAccessToken()) throw redirect({ to: "/signin" });
		const at = getAccountType();
		if (!at) throw redirect({ to: "/signin" });
		if (at !== ACCOUNT_TYPE.ADMIN) throw redirect({ to: getDashboardPathForAccountType(at) });
	},
	component: Layout$5
});
//#endregion
//#region components/buttons/BlackButton.tsx
var BlackButtons = ({ text, handleClick, isPending = false }) => {
	const disabledStyles = "opacity-60 cursor-not-allowed pointer-events-none group-hover:translate-x-0 group-hover:-translate-x-0 group-hover:bg-ads360black-100 group-hover:text-ads360light-100";
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("span", {
		className: "group flex w-[168px]",
		children: [/* @__PURE__ */ jsx("button", {
			onClick: handleClick,
			disabled: isPending,
			className: `group-hover:translate-x-32 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100 w-12 transition bg-ads360black-100 text-ads360light-100 mx-1 h-12 flex justify-center items-center rounded-[50%] color-white ${isPending ? disabledStyles : ""}`,
			children: /* @__PURE__ */ jsx(FiArrowRight, { size: 28 })
		}), /* @__PURE__ */ jsx("button", {
			onClick: handleClick,
			disabled: isPending,
			className: `group-hover:-translate-x-10 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100 w-32 transition rounded-10 text-ads360light-100 bg-ads360black-100 h-12 ${isPending ? disabledStyles : ""}`,
			children: text
		})]
	}) });
};
//#endregion
//#region components/buttons/YellowButton.tsx
var YellowButtons = ({ text }) => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("span", {
		className: "group flex w-[216px]",
		children: [/* @__PURE__ */ jsx("button", {
			className: "group-hover:translate-x-44 group-hover:text-ads360light-100 group-hover:bg-ads360black-100  w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white",
			children: /* @__PURE__ */ jsx(FiArrowRight, { size: 28 })
		}), /* @__PURE__ */ jsx("button", {
			className: "group-hover:-translate-x-10 group-hover:text-ads360light-100 group-hover:bg-ads360black-100  w-44 transition rounded-10 bg-ads360yellowBtn-100 h-12",
			children: text
		})]
	}) });
};
//#endregion
//#region components/slides/MobileCarousel.tsx
var digital$3 = "/images/digitalads3.png";
var billboard$4 = "/images/Billboard.png";
var happy$2 = "/images/happy.png";
var Arrowright = "/icons/Arrowright.svg";
var Arrowleft$2 = "/icons/Arrowleft.svg";
var Yellowdot$2 = "/icons/yellowdot.svg";
var influencer$3 = "/images/influencer1.png";
var MobileCaruosel = ({ display }) => {
	const [slide, setSlide] = useState(0);
	const slides = useRef(null);
	const next = (current) => {
		if (current === 4) slides?.current?.swiper.slideTo(0);
		else slides?.current?.swiper.slideNext();
	};
	const prev = (current) => {
		if (current === 0) slides?.current?.swiper.slideTo(5);
		else slides?.current?.swiper.slidePrev();
	};
	const items = [
		{
			image: billboard$4,
			text: "Capture attention and make a lasting impact with our billboard advertising module.We connect you to billboards strategically placed in high-traffic areas, ensuring maximum visibility for your brand.",
			link: "",
			name: "Billboard Ads"
		},
		{
			image: happy$2,
			text: "Engage customers directly through personalised SMS campaigns. Our platform enables you to create and send targeted messages, keeping your audience informed, and driving conversions..",
			link: "",
			name: "SMS Ads"
		},
		{
			image: influencer$3,
			text: "Leverage the power of influencers to amplify your brand's reach. Our platform connects you with a diverse network of influencers, allowing you to tap into their engagedaudiences and drive brand awareness.",
			link: "",
			name: "Influencer Ads"
		},
		{
			image: digital$3,
			text: "Connect with Influencers on Twitter to Host Engaging Twitter Spaces 360ads connects you with influential voices on Twitter, empowering you to host interactive audio sessions that foster engagement and build brand loyalty.",
			link: "",
			name: "Twitter Spaces"
		},
		{
			image: happy$2,
			text: "Expand your online presence by placing ads on popular blogs. Our platform allows you to negotiate and secure ad placements on relevant blogs, effectively reaching your target audience.",
			link: "",
			name: "Blog Ads"
		},
		{
			image: influencer$3,
			text: "Showcase your brand in the WhatsApp ecosystem. With our platform, you can seamlessly place ads in WhatsApp status, reaching a vast user base and generating buzz around your products or services.",
			link: "",
			name: "WhatsApp Ads"
		}
	];
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Swiper, {
		modules: [Autoplay],
		slidesPerView: "auto",
		spaceBetween: 30,
		ref: slides,
		autoplay: {
			delay: 2e3,
			pauseOnMouseEnter: true
		},
		onSlideChange: () => setSlide(slides?.current?.swiper.activeIndex),
		children: [items.map((values, i) => /* @__PURE__ */ jsxs(SwiperSlide, { children: [/* @__PURE__ */ jsxs("div", {
			className: "flex mb-4 justify-center",
			children: [/* @__PURE__ */ jsx("span", {
				className: "flex items-center pr-3",
				children: /* @__PURE__ */ jsx("img", {
					src: Yellowdot$2,
					alt: ""
				})
			}), values.name]
		}), /* @__PURE__ */ jsxs("div", {
			className: "",
			children: [/* @__PURE__ */ jsx("div", {
				className: "mb-7 flex justify-center",
				children: /* @__PURE__ */ jsx("img", {
					src: values.image,
					alt: "..."
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "",
					children: values.text
				}), /* @__PURE__ */ jsx(Link, {
					to: values.link,
					className: `${display} my-5`,
					children: /* @__PURE__ */ jsx(YellowButtons, { text: "Learn More" })
				})] })
			})]
		})] }, i)), /* @__PURE__ */ jsxs("div", {
			className: "flex justify-center mt-7",
			children: [
				/* @__PURE__ */ jsx("button", {
					onClick: () => prev(slides?.current?.swiper.activeIndex),
					className: "group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-50  h-50 flex justify-center items-center rounded-[50%] color-white",
					children: /* @__PURE__ */ jsx("img", {
						src: Arrowleft$2,
						alt: ""
					})
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "text-[#777777] px-7 flex py-3",
					children: [
						slide + 1,
						" / ",
						items.length
					]
				}),
				/* @__PURE__ */ jsx("button", {
					onClick: () => next(slides?.current?.swiper.activeIndex),
					className: "group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-50  h-50 flex justify-center items-center rounded-[50%] color-white",
					children: /* @__PURE__ */ jsx("img", {
						src: Arrowright,
						alt: ""
					})
				})
			]
		})]
	}) });
};
//#endregion
//#region components/buttons/YellowBtnShort.tsx
var YellowBtnShort = ({ text }) => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("span", {
		className: "group flex w-[168px]",
		children: [/* @__PURE__ */ jsx("button", {
			className: "group-hover:translate-x-32 group-hover:text-ads360light-100 group-hover:bg-ads360black-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white",
			children: /* @__PURE__ */ jsx(FiArrowRight, { size: 28 })
		}), /* @__PURE__ */ jsx("button", {
			className: "group-hover:-translate-x-10 w-32 group-hover:text-ads360light-100 group-hover:bg-ads360black-100  transition rounded-10 bg-ads360yellowBtn-100 h-12",
			children: text
		})]
	}) });
};
//#endregion
//#region components/slides/DesktopCarousel.tsx
var Darkdot = "/icons/darkdot.svg";
var Yellowdot$1 = "/icons/yellowdot.svg";
var digital$2 = "/images/digitalads3.png";
var billboard$3 = "/images/Billboard.png";
var happy$1 = "/images/happy.png";
var influencer$2 = "/images/influencer1.png";
var DesktopCaruosel = () => {
	const [slide, setSlide] = useState(0);
	const slides = useRef(null);
	const items = [
		{
			image: billboard$3,
			text: "Capture attention and make a lasting impact with our billboard advertising module.We connect you to billboards strategically placed in high-traffic areas, ensuring maximum visibility for your brand.",
			link: "",
			Name: "Billboard Ads"
		},
		{
			image: happy$1,
			text: "Engage customers directly through personalised SMS campaigns. Our platform enables you to create and send targeted messages, keeping your audience informed, and driving conversions..",
			link: "",
			Name: "SMS Ads"
		},
		{
			image: influencer$2,
			text: "Leverage the power of influencers to amplify your brand's reach. Our platform connects you with a diverse network of influencers, allowing you to tap into their engagedaudiences and drive brand awareness.",
			link: "",
			Name: "Influencer Ads"
		},
		{
			image: digital$2,
			text: "Showcase your brand in the WhatsApp ecosystem. With our platform, you can seamlessly place ads in WhatsApp status,reaching a vast user base and generating buzz around your products or services.",
			link: "",
			Name: "WhatsApp Ads"
		}
	];
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Swiper, {
		modules: [Autoplay],
		slidesPerView: 1,
		ref: slides,
		autoplay: {
			delay: 2e3,
			pauseOnMouseEnter: true
		},
		onSlideChange: () => setSlide(slides?.current?.swiper.activeIndex),
		children: [/* @__PURE__ */ jsxs("div", {
			slot: "container-start",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex text-center justify-evenly mb-5",
				children: items.map((item, i) => /* @__PURE__ */ jsxs("div", {
					className: "flex",
					onClick: () => {
						slides?.current?.swiper.slideTo(i);
						setSlide(i);
					},
					children: [slide === i ? /* @__PURE__ */ jsx("img", {
						src: Yellowdot$1,
						alt: ""
					}) : /* @__PURE__ */ jsx("img", {
						src: Darkdot,
						alt: ""
					}), item.Name]
				}, i))
			}), /* @__PURE__ */ jsx("hr", { className: "mb-10" })]
		}), items.map((values, i) => /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsxs("div", {
			className: "flex justify-evenly",
			children: [/* @__PURE__ */ jsx("div", {
				className: "basis-2/3",
				children: /* @__PURE__ */ jsx("img", {
					src: values.image,
					alt: ""
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 content-center basis-5/6 px-5 lg:px-8",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-justify",
					children: values.text
				}), /* @__PURE__ */ jsx(Link, {
					to: values.link,
					className: "block mt-5",
					children: /* @__PURE__ */ jsx(YellowBtnShort, { text: "Learn More" })
				})] })
			})]
		}) }, i))]
	}) });
};
//#endregion
//#region components/ui/Why360.tsx
var why1 = "/icons/why1.svg";
var why2 = "/icons/why2.svg";
var why3 = "/icons/why3.svg";
var why4 = "/icons/why4.svg";
var Why360 = () => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", {
		id: "why360Ads",
		className: "bg-ads360black-100 py-24 text-ads360light-100",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-11/12 md:w-10/12 xl:w-9/12",
			children: [/* @__PURE__ */ jsx("h4", {
				className: "text-center text-2xl lg:text-4xl mb-10",
				children: "Why 360 ads"
			}), /* @__PURE__ */ jsx("div", {
				className: "md:grid md:grid-cols-2 md:gap-7 lg:gap-10",
				children: [
					{
						yellowWriteUp: "Automated Advertising Platform",
						whiteWripeUp: "Our platform eliminates the need for intermediaries and streamlines the advertising process, saving you time, effort, and resources. You have full control over your ad placements, allowing you to make data-driven decisions and optimise your campaigns for maximum effectiveness.",
						image: why2
					},
					{
						yellowWriteUp: "User-Friendly Interface",
						whiteWripeUp: "Our platform is designed with user-friendliness in mind, making it easy for you to navigate and manage your advertising campaigns. You don't need prior advertising experience to utilise our platform effectively.",
						image: why1
					},
					{
						yellowWriteUp: "Exceptional Support",
						whiteWripeUp: "Our dedicated support team is here to assist you every step of the way. If you have any questions or encounter any issues, we are ready to provide prompt and helpful assistance.",
						image: why4
					},
					{
						yellowWriteUp: "Targeted Reach",
						whiteWripeUp: "With our precise targeting capabilities, we ensure that your ads reach the right audience, maximizing your chances of success and generating tangible results.",
						image: why3
					}
				].map((values, i) => /* @__PURE__ */ jsxs("div", {
					className: "bg-ads360black-50 my-14 rounded-10 md:my-0 text-center pt-5 px-5 shadow-2xl shadow-black",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "text-ads360yellow-100 text-lg mb-2",
							children: values.yellowWriteUp
						}),
						/* @__PURE__ */ jsx("div", {
							className: "text-ads360light-100 my-4 text-justify",
							children: values.whiteWripeUp
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mx-auto w-1/2",
							children: /* @__PURE__ */ jsx("img", {
								src: values.image,
								className: "",
								alt: "..."
							})
						})
					]
				}, i))
			})]
		})
	}) });
};
//#endregion
//#region components/ui/HowWeThink.jsx
var think1 = "/images/think1.jpg";
var HowWeThink = () => {
	return /* @__PURE__ */ jsx("section", {
		id: "howWeThink",
		className: "bg-ads360light-100 pt-20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-11/12 md:w-10/12 xl:w-9/12",
			children: [
				/* @__PURE__ */ jsx("h4", {
					className: "text-ads360yellow-100 mb-10",
					children: "How we think"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "md:flex justify-between mb-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-2xl lg:text-4xl lg:mb-4 mb-2",
							children: "We're challengers at heart and builders by nature."
						}), /* @__PURE__ */ jsxs("h6", {
							className: "",
							children: [
								"We work as one team and deliver projects",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "text-ads360yellow-100",
									children: "concurrently..."
								})
							]
						})]
					}), /* @__PURE__ */ jsx(Link, {
						className: "block mt-5",
						to: "/signup",
						children: /* @__PURE__ */ jsx(YellowButtons, { text: "Dive into our culture" })
					})]
				}),
				/* @__PURE__ */ jsx("img", {
					src: think1,
					alt: "",
					className: "w-full"
				})
			]
		})
	});
};
//#endregion
//#region components/buttons/SmallBtnYellow.tsx
var SmallBtnYello = ({ text }) => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("span", {
		className: "group flex w-[80px]",
		children: [/* @__PURE__ */ jsx("button", {
			className: "group-hover:translate-x-7 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 transition rounded-10 bg-ads360yellowBtn-100 w-14 h-8 text-xs text-ads360black-100 font-display font-semibold",
			children: text
		}), /* @__PURE__ */ jsx("button", {
			className: "transition group-hover:-translate-x-14 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 bg-ads360yellowBtn-100 ml-1 w-8 h-8 flex justify-center text-ads360black-100 items-center rounded-[50%] font-display font-semibold",
			children: /* @__PURE__ */ jsx(FiArrowRight, { size: 24 })
		})]
	}) });
};
//#endregion
//#region components/ui/NewsLetter.tsx
var NewsLetter = ({ img }) => {
	return /* @__PURE__ */ jsx("section", {
		id: "newsletter",
		className: "bg-ads360light-100 pt-20 md:pb-20",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto px-1 md:px-0 pt-5 w-11/12 xl:w-10/12 text-center text-white md:bg-ads360black-100 md:rounded",
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-ads360black-100 pt-10 pb-10 md:pb-5 rounded md:rounded-none",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "text-2xl lg:text-4xl",
							children: "Subscribe to Our Newsletter"
						}),
						/* @__PURE__ */ jsxs("h6", {
							className: "",
							children: [
								"For exclusives updates &",
								" ",
								/* @__PURE__ */ jsx("span", {
									className: "text-ads360yellow-100",
									children: "news"
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-5 md:mt-10",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex text-black px-1 rounded h-[38px] md:h-[45px] w-11/12 md:w-1/2 mx-auto items-center justify-center bg-ads360light-100",
								children: [/* @__PURE__ */ jsx("input", {
									type: "text",
									className: "w-full focus:outline-none bg-transparent h-[38px] md:h-[45px]",
									placeholder: "Enter Email..."
								}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SmallBtnYello, { text: "Submit" }) })]
							})
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "flex justify-center md:mt-5",
					children: /* @__PURE__ */ jsx("img", {
						src: img,
						alt: "..."
					})
				})]
			})
		})
	});
};
//#endregion
//#region components/ui/CountUp.tsx
var CountUp = RawCountUp && typeof RawCountUp === "object" && "default" in RawCountUp ? RawCountUp.default : RawCountUp;
//#endregion
//#region components/logo/WhiteLogo.tsx
var React360Logo$2 = "/logo/360white.svg";
var ReactAdsLogo$2 = "/logo/adsWhite.svg";
var WhiteLogo = () => {
	return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, {
		to: "/",
		className: "flex items-center",
		children: [/* @__PURE__ */ jsx("img", {
			src: React360Logo$2,
			alt: "",
			className: "hover:-rotate-90 transistion duration-300"
		}), /* @__PURE__ */ jsx("img", {
			src: ReactAdsLogo$2,
			alt: ""
		})]
	}) });
};
//#endregion
//#region components/modal/Drawer.tsx
var CloseAside$2 = "/icons/closeAside.svg";
var Drawer = ({ isOpen, toggleDrawer, children }) => {
	const drawer = useRef(null);
	useEffect(() => {
		if (isOpen) {
			drawer.current?.classList.add("forward");
			drawer.current?.classList.remove("reverse");
			drawer.current?.classList.remove("-left-[100%]");
		} else {
			drawer.current?.classList.add("reverse");
			drawer.current?.classList.remove("forward");
		}
	}, [isOpen]);
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("aside", {
		ref: drawer,
		className: "bg-ads360black-100 text-white z-30 -left-[100%] md:hidden fixed w-full h-full top-0 overflow-y-scroll",
		children: /* @__PURE__ */ jsxs("div", {
			className: "px-5",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between  py-5",
				children: [/* @__PURE__ */ jsx("div", {
					className: "py-5",
					children: /* @__PURE__ */ jsx(WhiteLogo, {})
				}), /* @__PURE__ */ jsx("div", {
					className: "md:hidden",
					onClick: toggleDrawer,
					children: /* @__PURE__ */ jsx("img", {
						src: CloseAside$2,
						alt: ""
					})
				})]
			}), children]
		})
	}) });
};
//#endregion
//#region components/logo/BlackLogo.tsx
var React360Logo$1 = "/logo/360black.svg";
var ReactAdsLogo$1 = "/logo/ads.svg";
var BlackLogo = () => {
	return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Link, {
		to: "/",
		className: "flex items-center",
		children: [/* @__PURE__ */ jsx("img", {
			src: React360Logo$1,
			alt: "",
			className: "hover:-rotate-90 transistion duration-300"
		}), /* @__PURE__ */ jsx("img", {
			src: ReactAdsLogo$1,
			alt: ""
		})]
	}) });
};
//#endregion
//#region components/navs/public/DrawerContent.tsx
var instagram$2 = "/icons/Instagram.svg";
var whatsapp$4 = "/icons/whiteWhatsapp.svg";
var twitter$3 = "/icons/Twitter.svg";
var DrawerContent = ({ toggleDrawer }) => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "text-ads360light-100",
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: "text-2xl my-2",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/about",
						onClick: toggleDrawer,
						children: "About Us"
					})
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-2xl my-2",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/discovery",
						onClick: toggleDrawer,
						children: "Our Services"
					})
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-2xl my-2",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/faqs",
						onClick: toggleDrawer,
						children: "FAQs"
					})
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-2xl my-2",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/contact",
						onClick: toggleDrawer,
						children: "Contact Us"
					})
				})
			]
		}),
		/* @__PURE__ */ jsx("hr", { className: "my-5" }),
		/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col text-ads360light-100 mb-5",
			children: [
				/* @__PURE__ */ jsx("h5", {
					className: "text-ads360yellow-100 my-3",
					children: "OUR SERVICES"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/discovery/#billboard",
					className: "my-2",
					onClick: toggleDrawer,
					children: "Billboard Advertisement"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/discovery/#blog",
					className: "my-2",
					onClick: toggleDrawer,
					children: "Blog Advertisements"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/discovery/#sms",
					className: "my-2",
					onClick: toggleDrawer,
					children: "SMS Campaigns"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "discovery/#whatsapp",
					className: "my-2",
					onClick: toggleDrawer,
					children: "WhatsApp Status Ads"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/discovery/#influencer",
					className: "my-2",
					onClick: toggleDrawer,
					children: "Influencer Marketing"
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/discovery/#twitter",
					className: "my-2",
					onClick: toggleDrawer,
					children: "Twitter Spaces"
				})
			]
		}),
		/* @__PURE__ */ jsx(Link, {
			to: "/signup",
			onClick: toggleDrawer,
			children: /* @__PURE__ */ jsxs("span", {
				className: "group flex w-[168px] text-ads360black-100",
				children: [/* @__PURE__ */ jsx("button", {
					className: "group-hover:translate-x-32 group-hover:bg-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white",
					children: /* @__PURE__ */ jsx(FiArrowRight, { size: 28 })
				}), /* @__PURE__ */ jsx("button", {
					className: "group-hover:-translate-x-10 w-32 group-hover:bg-ads360light-100  transition rounded-10 bg-ads360yellowBtn-100 h-12",
					children: "Get Started"
				})]
			})
		}),
		/* @__PURE__ */ jsx("hr", { className: "my-5" }),
		/* @__PURE__ */ jsxs("div", {
			className: "text-ads360light-100",
			children: [
				/* @__PURE__ */ jsx("h5", {
					className: "text-ads360yellow-100 my-3",
					children: "CONTACT INFO"
				}),
				/* @__PURE__ */ jsx("h6", { children: "King Court estate," }),
				/* @__PURE__ */ jsx("h6", { children: "Lagos, Nigeria." }),
				/* @__PURE__ */ jsx("h6", { children: "+2347082436214" }),
				/* @__PURE__ */ jsx("h6", { children: "hello@360ads.com.ng" })
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex px-1 rounded h-[50px] w-full md:w-[40%] items-center justify-center bg-ads360light-100 mt-10 mb-5",
			children: [/* @__PURE__ */ jsx("input", {
				type: "text",
				className: "w-full focus:outline-none bg-transparent h-[50px]",
				placeholder: "Enter Email..."
			}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SmallBtnYello, { text: "Submit" }) })]
		}),
		/* @__PURE__ */ jsx("hr", {}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between my-5",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-ads360light-100",
				children: "360 ads © 2023"
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex",
				children: [/* @__PURE__ */ jsx(Link, {
					to: "",
					className: "mx-2 hidden",
					children: "Terms & Conditions"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "https://www.instagram.com/360ads.ng/",
							className: "mx-2",
							children: /* @__PURE__ */ jsx("img", {
								src: instagram$2,
								alt: "instagram logo"
							})
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "https://wa.me/+2347082436214?text=urlencodedtext",
							className: "mx-2",
							children: /* @__PURE__ */ jsx("img", {
								src: whatsapp$4,
								alt: "facebook logo"
							})
						}),
						/* @__PURE__ */ jsx(Link, {
							to: "https://twitter.com/360adsNg",
							className: "mx-2",
							children: /* @__PURE__ */ jsx("img", {
								src: twitter$3,
								alt: "twitter logo"
							})
						})
					]
				})]
			})]
		})
	] }) });
};
//#endregion
//#region components/navs/public/LightNavBar.tsx
var MobileMenu$1 = "/icons/menu.svg";
var LightNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const isLoggedIn = hasAccessToken$1();
	const handleToggleDrawer = () => {
		if (isOpen) setIsOpen(false);
		else setIsOpen(true);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("nav", {
		className: "flex px-5 md:px-0 justify-between md:justify-evenly font-sans py-5 bg-ads360light-100 text-base",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "py-3",
				children: /* @__PURE__ */ jsx(BlackLogo, {})
			}),
			/* @__PURE__ */ jsxs("ul", {
				className: "py-3 hidden md:flex text-center",
				children: [
					/* @__PURE__ */ jsxs("li", {
						className: "group",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/about",
							className: "mx-4 transition duration-300 hover:text-ads360yellow-100",
							children: "About Us"
						}), /* @__PURE__ */ jsx("div", { className: "group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1" })]
					}),
					/* @__PURE__ */ jsxs("li", {
						className: "group",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/discovery",
							className: "mx-4 transition duration-300 hover:text-ads360yellow-100",
							children: "Services"
						}), /* @__PURE__ */ jsx("div", { className: "group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1" })]
					}),
					/* @__PURE__ */ jsxs("li", {
						className: "group",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/faqs",
							className: "mx-4 transition duration-300 hover:text-ads360yellow-100",
							children: "FAQs"
						}), /* @__PURE__ */ jsx("div", { className: "group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1" })]
					}),
					/* @__PURE__ */ jsxs("li", {
						className: "group",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/contact",
							className: "mx-4 transition duration-300 hover:text-ads360yellow-100",
							children: "Contact Us"
						}), /* @__PURE__ */ jsx("div", { className: "group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1" })]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "hidden md:block text-center",
				children: isLoggedIn ? /* @__PURE__ */ jsx("button", {
					className: "group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/users",
						children: "Dashboard"
					})
				}) : /* @__PURE__ */ jsx("button", {
					className: "group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/signup",
						children: "Get Stated"
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "md:hidden",
				onClick: handleToggleDrawer,
				children: /* @__PURE__ */ jsx("img", {
					src: MobileMenu$1,
					alt: ""
				})
			})
		]
	}), /* @__PURE__ */ jsx(Drawer, {
		isOpen,
		toggleDrawer: handleToggleDrawer,
		children: /* @__PURE__ */ jsx(DrawerContent, { toggleDrawer: handleToggleDrawer })
	})] });
};
//#endregion
//#region components/navs/public/Footer.tsx
var flogo = "/icons/footerlogo.svg";
var instagram$1 = "/icons/Instagram.svg";
var whatsapp$3 = "/icons/whiteWhatsapp.svg";
var twitter$2 = "/icons/Twitter.svg";
var Footer = () => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("footer", {
		className: "bg-ads360black-100 py-10 px-5 lg:p-24 text-white",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "md:flex",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "basis-1/4 my-10",
						children: /* @__PURE__ */ jsx("img", {
							src: flogo,
							alt: "footer logo"
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basis-1/4 my-10 md:text-center",
						children: [
							/* @__PURE__ */ jsx("h4", {
								className: "text-ads360yellow-100 my-4",
								children: "QUICK LINKS"
							}),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/about",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "About Us"
							}) }),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/contact",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "Contact"
							}) }),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/discovery",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "Services"
							}) }),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/faqs",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "FAQs"
							}) })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basis-1/4 my-10 md:text-center",
						children: [
							/* @__PURE__ */ jsx("h4", {
								className: "text-ads360yellow-100 my-4",
								children: "OUR SERVICES"
							}),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/discovery/#billboard",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "Billboard Advertisements"
							}) }),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/discovery/#blog",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "Blog Advertisements"
							}) }),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/discovery/#sms",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "SMS Campaigns"
							}) }),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/discovery/#whatsapp",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "WhatsApp Status Ads"
							}) }),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/discovery/#influencer",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "Influencer Marketing"
							}) }),
							/* @__PURE__ */ jsx("h6", { children: /* @__PURE__ */ jsx(Link, {
								to: "/discovery/#twitter",
								className: "transition duration-300 hover:text-ads360yellowBtn-100",
								children: "Twitter Spaces"
							}) })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basis-1/4 my-10 md:text-right",
						children: [
							/* @__PURE__ */ jsx("h4", {
								className: "text-ads360yellow-100 my-4",
								children: "CONTACT INFO"
							}),
							/* @__PURE__ */ jsx("h6", { children: "King Court estate," }),
							/* @__PURE__ */ jsx("h6", { children: "Lagos, Nigeria" }),
							/* @__PURE__ */ jsx("h6", { children: "+234 7082436214" })
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex text-black px-1 rounded h-[38px] md:h-[45px] w-full md:w-[40%] items-center justify-center bg-ads360light-100 mb-5",
				children: [/* @__PURE__ */ jsx("input", {
					type: "text",
					className: "w-full focus:outline-none bg-transparent h-[38px] md:h-[45px]",
					placeholder: "Enter Email..."
				}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SmallBtnYello, { text: "Submit" }) })]
			}),
			/* @__PURE__ */ jsx("hr", {}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between mt-5",
				children: [/* @__PURE__ */ jsx("p", { children: "360 ads © 2023" }), /* @__PURE__ */ jsxs("div", {
					className: "flex",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "",
						className: "mx-2 hidden md:inline",
						children: "Terms & Conditions"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex",
						children: [
							/* @__PURE__ */ jsx(Link, {
								to: "https://www.instagram.com/360ads.ng/",
								className: "mr-1 md:mx-2",
								children: /* @__PURE__ */ jsx("img", {
									src: instagram$1,
									alt: "instagram logo"
								})
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "https://wa.me/+2347082436214?text=urlencodedtext",
								className: "mx-2",
								children: /* @__PURE__ */ jsx("img", {
									src: whatsapp$3,
									alt: "facebook logo"
								})
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "https://twitter.com/360adsNg",
								className: "mx-2",
								children: /* @__PURE__ */ jsx("img", {
									src: twitter$2,
									alt: "twitter logo"
								})
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "text-center md:hidden my-2",
				children: /* @__PURE__ */ jsx(Link, {
					to: "",
					children: "Terms & Conditions"
				})
			})
		]
	}) });
};
//#endregion
//#region app/index.tsx
var heroGirl = "/images/herogirl.png";
var Group$1 = "/images/Group.png";
var adsgirl = "/images/adsgirl.png";
var adsgirl3 = "/images/adsgirl3.png";
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(LightNavbar, {}),
		/* @__PURE__ */ jsx("section", {
			id: "Hero",
			className: "bg-ads360light-100 pt-20",
			children: /* @__PURE__ */ jsx("div", {
				className: "flex justify-center mx-auto w-11/12 md:w-10/12 xl:w-9/12",
				children: /* @__PURE__ */ jsxs("div", {
					className: "",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "md:mr-[190px] text-5xl md:text-6xl lg:text-7xl font-[600]",
						children: [
							/* @__PURE__ */ jsx("h3", { children: "All day," }),
							/* @__PURE__ */ jsx("h3", { children: "Ad campaign " }),
							/* @__PURE__ */ jsx("h3", {
								className: "text-ads360yellow-100",
								children: "360..."
							})
						]
					}), /* @__PURE__ */ jsx(Link, {
						className: "block mt-5",
						to: "/signin",
						children: /* @__PURE__ */ jsx(BlackButtons, {
							handleClick: () => {},
							isPending: false,
							text: "Let's dive in"
						})
					})] }), /* @__PURE__ */ jsx("div", {
						className: "md:ml-[190px] md:-mt-[130px]",
						children: /* @__PURE__ */ jsx("img", {
							src: heroGirl,
							alt: "hero"
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ jsx("section", {
			id: "reach",
			className: "bg-ads360black-100 py-24 text-ads360light-100",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-11/12 md:w-10/12 xl:w-9/12",
				children: [/* @__PURE__ */ jsxs("h3", {
					className: "text-justify md:text-center",
					children: [
						"At 360ads, our platform is designed to",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "text-ads360yellowBtn-100",
							children: "revolutionise"
						}),
						" the way you handle your advertising needs. With our cutting-edge technology, we provide you with the tools and capabilities to efficiently manage your ad placements and maximise your brand's visibility. Our platform simplifies the process, empowering you to take full control of your advertising campaigns."
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:flex flex-row-reverse mt-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-ads360black-50 rounded-10 shadow-2xl shadow-black basis-1/3 pt-2",
						children: [
							/* @__PURE__ */ jsxs("h3", {
								className: "mb-4 px-2",
								children: [
									"Grow Your Business with our seamless",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "text-ads360yellow-100",
										children: "options..."
									})
								]
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "mb-4 text-sm px-3 text-justify",
								children: "We are your comprehensive solution for automating your ad placements, offering a platform that streamlines the entire process"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mx-auto w-1/2 md:w-3/4 xl:w-3/5 mb-10 md:mb-0",
								children: /* @__PURE__ */ jsx("img", {
									src: Group$1,
									className: "mx-auto w-full  sm:w-1/2 md:w-full",
									alt: "..."
								})
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex text-center justify-evenly basis-3/5 md:mt-56",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("h2", {
									className: "text-2xl font-bold",
									children: [/* @__PURE__ */ jsx(CountUp, {
										end: 123,
										duration: 1,
										enableScrollSpy: true
									}), /* @__PURE__ */ jsx("span", {
										className: "text-ads360yellow-100",
										children: "+"
									})]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "",
									children: "Completed"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "",
									children: "Sites"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("h2", {
									className: "text-2xl font-bold",
									children: [/* @__PURE__ */ jsx(CountUp, {
										end: 1300,
										duration: 1,
										enableScrollSpy: true
									}), /* @__PURE__ */ jsx("span", {
										className: "text-ads360yellow-100",
										children: "+"
									})]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "",
									children: "Happy"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "",
									children: "Customer"
								})
							] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("h2", {
									className: "text-2xl font-bold",
									children: [/* @__PURE__ */ jsx(CountUp, {
										end: 100,
										duration: 1,
										enableScrollSpy: true
									}), /* @__PURE__ */ jsx("span", {
										className: "text-ads360yellow-100",
										children: "%"
									})]
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "",
									children: "Client"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "",
									children: "Reach"
								})
							] })
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ jsx(HowWeThink, {}),
		/* @__PURE__ */ jsx("section", {
			id: "ourService",
			className: "py-24 bg-ads360light-100",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-11/12 md:w-10/12 xl:w-9/12",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "text-center mb-16",
						children: [
							/* @__PURE__ */ jsx("h4", {
								className: "text-ads360yellow-100 mb-10",
								children: "Our Services"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-2xl lg:text-4xl lg:mb-4 mb-2",
								children: "Get your audience’s attention with our services"
							}),
							/* @__PURE__ */ jsxs("h6", {
								className: "",
								children: [
									"Let’s help secure the right audience with our",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "text-ads360yellow-100",
										children: "services..."
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "hidden md:block",
						children: /* @__PURE__ */ jsx(DesktopCaruosel, {})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "md:hidden",
						children: /* @__PURE__ */ jsx(MobileCaruosel, { display: "block" })
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Why360, {}),
		/* @__PURE__ */ jsx("section", {
			id: "contactus",
			className: "bg-ads360light-100 pt-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-11/12 md:w-10/12 xl:w-9/12",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-10",
					children: [
						/* @__PURE__ */ jsx("h4", {
							className: "text-ads360yellow-100 mb-10",
							children: "Keep in touch"
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-2xl lg:text-4xl lg:mb-4 mb-2",
							children: "Ready to Automate Your Advertising Strategy?"
						}),
						/* @__PURE__ */ jsxs("h6", {
							className: "",
							children: [
								"Get in",
								/* @__PURE__ */ jsx("span", {
									className: "text-ads360yellow-100",
									children: " touch "
								}),
								"with us today"
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:flex md:space-x-12",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-white shadow-2xl shadow-zinc-600 rounded px-3 md:px-12 py-7 md:w-8/12 lg:w-6/12",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "my-5",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "name",
										children: "Your Name:"
									}),
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("input", {
										type: "text",
										id: "name",
										className: "border focus:outline-none drop-shadow-md rounded bg-[#E4E4E4] h-[38px] w-full px-2",
										placeholder: "Enter Your Name..."
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "my-5",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "number",
										children: "Phone Number:"
									}),
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("input", {
										type: "text",
										id: "number",
										className: "border focus:outline-none drop-shadow-md rounded bg-[#E4E4E4] h-[38px] w-full px-2",
										placeholder: "Enter Phine Number..."
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "my-5",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "email",
										children: "Your Email:"
									}),
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("input", {
										type: "text",
										id: "emain",
										className: "border focus:outline-none drop-shadow-md rounded h-[38px] bg-[#E4E4E4] w-full px-2",
										placeholder: "Enter Email Address..."
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mx-3 mt-12 flex justify-center",
								children: /* @__PURE__ */ jsx(BlackButtons, {
									handleClick: () => {},
									isPending: false,
									text: "Contact Us"
								})
							})
						]
					}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", {
						src: adsgirl,
						className: "md:h-[400px] mx-auto",
						alt: "..."
					}) })]
				})]
			})
		}),
		/* @__PURE__ */ jsx(NewsLetter, { img: adsgirl3 }),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
var Route$51 = createFileRoute("/")({ component: Home });
//#endregion
//#region components/navs/Vendors/billboard/BillBoardSideNav.tsx
var ads360white$1 = "/logo/360white.svg";
var settings$3 = "/icons/usericon/whitesettings.svg";
var onsettings$3 = "/icons/usericon/onsettings.svg";
var dashboard$3 = "/icons/usericon/whitedashboard.svg";
var ondashboard$3 = "/icons/usericon/ondashboard.svg";
var campaign$3 = "/icons/usericon/whitecampaign.svg";
var oncampaign$3 = "/icons/usericon/oncampaign.svg";
var negotiations$3 = "/icons/usericon/offnegotiation.svg";
var onnegotiations$3 = "/icons/usericon/onnegotiation.svg";
var add$1 = "/icons/usericon/add.svg";
var list$1 = "/icons/usericon/list.svg";
var onlist$1 = "/icons/usericon/yellowlist.svg";
var onAdd$1 = "/icons/usericon/addyellow.svg";
var wallet$5 = "/icons/usericon/whitewallet.svg";
var onwallet$3 = "/icons/usericon/onwallet.svg";
var BillBoardSideNav = () => {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navItem1 = [
		{
			link: "/vendors/billboards",
			name: "Dashboard",
			off: dashboard$3,
			on: ondashboard$3
		},
		{
			link: "/vendors/billboards/requests",
			name: "Requests",
			off: campaign$3,
			on: oncampaign$3
		},
		{
			link: "/vendors/billboards/negotiations",
			name: "Negotiations",
			off: negotiations$3,
			on: onnegotiations$3
		},
		{
			link: "/vendors/billboards/listing",
			name: "Billboards",
			off: list$1,
			on: onlist$1
		},
		{
			link: "/vendors/billboards/add-billboard",
			name: "Add",
			off: add$1,
			on: onAdd$1
		},
		{
			link: "/vendors/billboards/wallet",
			name: "Wallet",
			off: wallet$5,
			on: onwallet$3
		}
	];
	const navItem2 = [{
		link: "/vendors/billboards/settings",
		name: "Settings",
		off: settings$3,
		on: onsettings$3
	}];
	return /* @__PURE__ */ jsxs("aside", {
		className: "group bg-[#292728] w-[5.7%] pt-5 hover:w-[18.5%] xl:hover:w-[14.5%] transistion duration-300 fixed overflow-hidden h-full text-white",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "mx-1 xl:mx-2",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					children: /* @__PURE__ */ jsx("img", {
						src: ads360white$1,
						alt: "360 ads logo"
					})
				})
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "space-y-4 my-14",
				children: navItem1.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
					to: items.link,
					className: "border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: items.on,
						alt: items.name
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
						children: items.name
					})]
				}) : /* @__PURE__ */ jsxs(Link, {
					to: items.link,
					className: "py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: items.off,
						alt: items.name
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block px-2 xl:px-4 hover:font-bold",
						children: items.name
					})]
				}) }, i))
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "space-y-4 my-14",
				children: navItem2.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
					to: items.link,
					className: "border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: items.on,
						alt: items.name
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
						children: items.name
					})]
				}) : /* @__PURE__ */ jsxs(Link, {
					to: items.link,
					className: "py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: items.off,
						alt: items.name
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block px-2 xl:px-4 hover:font-bold",
						children: items.name
					})]
				}) }, i))
			})
		]
	});
};
//#endregion
//#region components/modal/Notification.tsx
var cancel$8 = "/icons/usericon/modalCancelBotton.svg";
var Notification = ({ isOpen, children, handleNotification }) => {
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(motion.div, {
		className: "fixed z-[10000000] inset-0",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			"aria-label": "Close notifications",
			className: "absolute inset-0 bg-black/50",
			onClick: handleNotification
		}), /* @__PURE__ */ jsxs(motion.div, {
			className: "bg-[#F7F8F8] fixed right-0 top-0 w-10/12 md:w-6/12 lg:w-4/12 h-full",
			initial: { x: "100%" },
			animate: {
				x: 0,
				transition: {
					ease: "easeOut",
					duration: .25
				}
			},
			exit: {
				x: "100%",
				transition: {
					ease: "easeIn",
					duration: .2
				}
			},
			children: [/* @__PURE__ */ jsxs("div", {
				className: "bg-ads360black-100 text-ads360light-100 p-5 flex justify-between",
				children: [/* @__PURE__ */ jsx("p", { children: "Notifications" }), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: handleNotification,
					children: /* @__PURE__ */ jsx("img", {
						src: cancel$8,
						alt: "cancel",
						className: "w-5 h-5"
					})
				})]
			}), children]
		})]
	}) });
};
//#endregion
//#region components/navs/Vendors/billboard/BillboardNotification.tsx
var noticeBell$1 = "/images/noticebell.png";
var BillboardNotification = () => {
	return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", {
		className: "text-center w-11/12 md:w-8/12 mx-auto my-16",
		children: [
			/* @__PURE__ */ jsx("img", {
				alt: "",
				src: noticeBell$1
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "font-bold",
				children: "You don't have any notifications!"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-gray-500",
				children: "But as soon as something happens, you'll find it right here."
			})
		]
	}) });
};
//#endregion
//#region endpoint/auth/auth.ts
/** POST /auth/register — public; does not attach session or run refresh on 401. */
async function register(payload) {
	return baseFetchJson("/auth/register", {
		method: "POST",
		body: payload
	}, { skipAuthRefresh: true });
}
/** POST /auth/login — public; returns { id, accessToken, refreshToken }. */
async function login(payload) {
	return baseFetchJson("/auth/login", {
		method: "POST",
		body: payload
	}, { skipAuthRefresh: true });
}
/** POST /auth/sign-out — clears refresh token on backend (requires access token). */
async function logout$4() {
	await baseFetchJson("/auth/sign-out", { method: "POST" });
}
/** POST /auth/vendor-onboarding — public; validates invite token and returns onboarding step. */
async function vendorOnboarding(payload) {
	return baseFetchJson("/auth/vendor-onboarding", {
		method: "POST",
		body: payload
	}, { skipAuthRefresh: true });
}
/** POST /auth/billboard-owner-signup — public; progressive billboard onboarding. */
async function billboardOwnerSignup(payload) {
	return baseFetchJson("/auth/billboard-owner-signup", {
		method: "POST",
		body: payload
	}, { skipAuthRefresh: true });
}
//#endregion
//#region endpoint/auth/useAuth.ts
function errorMessage$2(error) {
	if (error instanceof ApiError) return error.message;
	if (error instanceof Error) return error.message;
	return "Something went wrong. Please try again.";
}
function useRegister() {
	return useMutation({
		mutationFn: register,
		onSuccess: () => {
			toast.success("Account created successfully.");
		},
		onError: (error) => {
			toast.error(errorMessage$2(error));
		}
	});
}
function useLogin() {
	return useMutation({
		mutationFn: login,
		onSuccess: (data) => {
			saveAuthTokens({
				accessToken: data.accessToken,
				refreshToken: data.refreshToken
			});
			saveAccountType(data.accountType);
			toast.success("Logged in successfully.");
		},
		onError: (error) => {
			toast.error(errorMessage$2(error));
		}
	});
}
function useLogout() {
	return useMutation({
		mutationFn: logout$4,
		onSuccess: () => {
			clearAuthTokens();
			toast.success("Logged out.");
		},
		onError: (error) => {
			clearAuthTokens();
			toast.error(errorMessage$2(error));
		}
	});
}
//#endregion
//#region components/navs/Vendors/billboard/BillBoardDrawerContent.tsx
var settings$2 = "/icons/usericon/whitesettings.svg";
var onsettings$2 = "/icons/usericon/onsettings.svg";
var dashboard$2 = "/icons/usericon/whitedashboard.svg";
var ondashboard$2 = "/icons/usericon/ondashboard.svg";
var campaign$2 = "/icons/usericon/whitecampaign.svg";
var oncampaign$2 = "/icons/usericon/oncampaign.svg";
var wallet$4 = "/icons/usericon/whitewallet.svg";
var onwallet$2 = "/icons/usericon/onwallet.svg";
var logout$3 = "/icons/usericon/whitelogout.svg";
var onlogout$1 = "/icons/usericon/onlogout.svg";
var add = "/icons/usericon/add.svg";
var list = "/icons/usericon/list.svg";
var onlist = "/icons/usericon/yellowlist.svg";
var onAdd = "/icons/usericon/addyellow.svg";
var negotiations$2 = "/icons/usericon/whitecampaign.svg";
var onnegotiations$2 = "/icons/usericon/oncampaign.svg";
var BillBoardDrawerContent = ({ toggleDrawer }) => {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const { mutate: logoutVendor, isPending: isLoggingOut } = useLogout();
	const handleLogout = () => {
		logoutVendor(void 0, { onSettled: () => {
			toggleDrawer();
			navigate({ to: "/signin" });
		} });
	};
	const navItem1 = [
		{
			link: "/vendors/billboards",
			name: "Dashboard",
			off: dashboard$2,
			on: ondashboard$2
		},
		{
			link: "/vendors/billboards/requests",
			name: "Requests",
			off: campaign$2,
			on: oncampaign$2
		},
		{
			link: "/vendors/billboards/negotiations",
			name: "Negotiations",
			off: negotiations$2,
			on: onnegotiations$2
		},
		{
			link: "/vendors/billboards/listing",
			name: "Billboards",
			off: list,
			on: onlist
		},
		{
			link: "/vendors/billboards/add-billboard",
			name: "Add",
			off: add,
			on: onAdd
		},
		{
			link: "/vendors/billboards/wallet",
			name: "Wallet",
			off: wallet$4,
			on: onwallet$2
		}
	];
	const navItem2 = [{
		link: "/vendors/billboards/settings",
		name: "Settings",
		off: settings$2,
		on: onsettings$2
	}];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("ul", {
		className: "space-y-4 my-14 ",
		children: navItem1.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
			onClick: toggleDrawer,
			to: items.link,
			className: "border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
			children: [/* @__PURE__ */ jsx("img", {
				src: items.on,
				alt: items.name,
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
				children: items.name
			})]
		}) : /* @__PURE__ */ jsxs(Link, {
			onClick: toggleDrawer,
			to: items.link,
			className: "py-2 px-4 flex items-center",
			children: [/* @__PURE__ */ jsx("img", {
				src: items.off,
				alt: items.name,
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "px-2 xl:px-4 hover:font-bold",
				children: items.name
			})]
		}) }, i))
	}), /* @__PURE__ */ jsxs("ul", {
		className: "space-y-4 my-14",
		children: [navItem2.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
			onClick: toggleDrawer,
			to: items.link,
			className: "border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
			children: [/* @__PURE__ */ jsx("img", {
				src: items.on,
				alt: items.name,
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
				children: items.name
			})]
		}) : /* @__PURE__ */ jsxs(Link, {
			onClick: toggleDrawer,
			to: items.link,
			className: "py-2 items-center px-4 flex",
			children: [/* @__PURE__ */ jsx("img", {
				src: items.off,
				alt: items.name,
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "px-2 xl:px-4 hover:font-bold",
				children: items.name
			})]
		}) }, i)), /* @__PURE__ */ jsx("li", {
			onClick: handleLogout,
			children: isLoggingOut ? /* @__PURE__ */ jsxs(Link, {
				onClick: toggleDrawer,
				to: "#",
				className: "border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
				children: [/* @__PURE__ */ jsx("img", {
					src: onlogout$1,
					alt: "logout",
					className: "w-8 h-8"
				}), /* @__PURE__ */ jsx("span", {
					className: "text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
					children: "Logging out..."
				})]
			}) : /* @__PURE__ */ jsxs(Link, {
				onClick: toggleDrawer,
				to: "#",
				className: "py-2 items-center px-4 flex",
				children: [/* @__PURE__ */ jsx("img", {
					src: logout$3,
					alt: "logout",
					className: "w-8 h-8"
				}), /* @__PURE__ */ jsx("span", {
					className: "px-2 xl:px-4 hover:font-bold",
					children: "Logout"
				})]
			})
		})]
	})] });
};
//#endregion
//#region components/navs/Vendors/billboard/BillBoardNav.tsx
var wallet$3 = "/icons/wallet.svg";
var bell$1 = "/icons/bell.svg";
var avatar$2 = "/icons/user.png";
var logout$2 = "/icons/usericon/onlogout.svg";
var BillBoardNav = () => {
	const [dropDown, setDropDown] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const navigate = useNavigate();
	const { mutate: logoutVendor, isPending: isLoggingOut } = useLogout();
	const me = useMe();
	useRouterState({ select: (s) => s.location.pathname });
	const handleToggleDrawer = () => {
		if (isDrawerOpen) setIsDrawerOpen(false);
		else setIsDrawerOpen(true);
	};
	const handleToggleNotification = () => {
		if (isNotificationOpen) setIsNotificationOpen(false);
		else setIsNotificationOpen(true);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("nav", {
			className: "bg-white md:flex md:px-14 py-3 justify-between items-center hidden",
			children: [/* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", {
				className: "flex justify-between space-x-7 items-center",
				children: [
					/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/vendors/billboards/wallet",
						children: /* @__PURE__ */ jsx("img", {
							src: wallet$3,
							alt: "wallet"
						})
					}) }),
					/* @__PURE__ */ jsxs("li", {
						className: "relative cursor-pointer",
						onClick: handleToggleNotification,
						children: [/* @__PURE__ */ jsx("span", {
							className: "absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white",
							children: "0"
						}), /* @__PURE__ */ jsx("img", {
							src: bell$1,
							alt: "bell"
						})]
					}),
					/* @__PURE__ */ jsxs("li", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setProfileOpen((p) => !p),
							children: /* @__PURE__ */ jsx("img", {
								className: "border-4 rounded-[50%]",
								width: 45,
								height: 45,
								src: avatar$2,
								alt: "avatar"
							})
						}), profileOpen && /* @__PURE__ */ jsxs("div", {
							className: "absolute right-0 top-12 bg-ads360light-100 z-[100000] w-[220px] rounded-10 p-3 shadow",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "px-2 py-2 border-b text-sm",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-bold",
										children: me.data?.accountType === "billboard_owner" ? me.data.businessName ?? `${me.data.firstName} ${me.data.lastName}`.trim() : me.data?.accountType === "business_user" ? me.data.businessName : me.data?.accountType === "regular_user" ? `${me.data.firstName} ${me.data.lastName}`.trim() : "Account"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-stone-500 text-xs",
										children: me.data?.email ?? ""
									})]
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "/vendors/billboards/settings",
									className: "flex items-center justify-center my-3 w-full hover:opacity-90",
									onClick: () => setProfileOpen(false),
									children: /* @__PURE__ */ jsx("span", {
										className: "px-3",
										children: "Profile"
									})
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									disabled: isLoggingOut,
									className: `flex items-center justify-center my-3 w-full ${isLoggingOut ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`,
									onClick: () => {
										if (isLoggingOut) return;
										logoutVendor(void 0, { onSettled: () => {
											setProfileOpen(false);
											navigate({ to: "/signin" });
										} });
									},
									children: [/* @__PURE__ */ jsx("img", {
										src: logout$2,
										alt: "logout"
									}), /* @__PURE__ */ jsx("span", {
										className: "px-3",
										children: isLoggingOut ? "Logging out..." : "Logout"
									})]
								})
							]
						})]
					})
				]
			}) })]
		}),
		/* @__PURE__ */ jsxs("nav", {
			className: "bg-white md:hidden md:px-14 py-3 justify-between items-center flex",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "py-1 px-2 flex items-center space-x-3",
				children: [/* @__PURE__ */ jsx("div", {
					className: "rounded-full border shadow-md border-ads360yellow-100 p-2",
					onClick: handleToggleDrawer,
					children: /* @__PURE__ */ jsx(FiMenu, { size: 24 })
				}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BlackLogo, {}) })]
			}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("ul", {
				className: "flex py-1 px-2 items-center",
				onClick: () => setDropDown((prev) => !prev),
				children: /* @__PURE__ */ jsxs("li", {
					className: "relative",
					children: [/* @__PURE__ */ jsx("img", {
						className: "border-4 rounded-[50%]",
						width: 45,
						height: 45,
						src: avatar$2,
						alt: "avatar"
					}), dropDown && /* @__PURE__ */ jsxs("ul", {
						className: "absolute right-0 top-10 bg-ads360light-100 z-[100000] w-[200px] rounded-10 p-3",
						children: [
							/* @__PURE__ */ jsx("li", {
								className: "my-3",
								children: /* @__PURE__ */ jsxs(Link, {
									to: "/vendors/billboards/settings",
									className: "flex items-center",
									children: [/* @__PURE__ */ jsx("img", {
										className: "border-4 rounded-[50%] w-8 h-8",
										src: avatar$2,
										alt: "avatar"
									}), /* @__PURE__ */ jsx("span", {
										className: "px-3",
										children: "Profile"
									})]
								})
							}),
							/* @__PURE__ */ jsx("li", {
								className: "my-3",
								children: /* @__PURE__ */ jsxs(Link, {
									to: "/vendors/billboards/wallet",
									className: "flex items-center",
									children: [/* @__PURE__ */ jsx("img", {
										src: wallet$3,
										alt: "wallet"
									}), /* @__PURE__ */ jsx("span", {
										className: "px-3",
										children: "Wallet"
									})]
								})
							}),
							/* @__PURE__ */ jsxs("li", {
								className: "flex items-center my-3 relative cursor-pointer",
								onClick: handleToggleNotification,
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white",
										children: "0"
									}),
									/* @__PURE__ */ jsx("img", {
										src: bell$1,
										alt: "bell"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "px-3",
										children: "Notification"
									})
								]
							}),
							/* @__PURE__ */ jsx("hr", {}),
							/* @__PURE__ */ jsxs("li", {
								className: `flex justify-center items-center my-3 ${isLoggingOut ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`,
								onClick: () => {
									if (isLoggingOut) return;
									logoutVendor(void 0, { onSettled: () => {
										setDropDown(false);
										navigate({ to: "/signin" });
									} });
								},
								children: [/* @__PURE__ */ jsx("img", {
									src: logout$2,
									alt: "logout"
								}), /* @__PURE__ */ jsx("span", {
									className: "px-3",
									children: isLoggingOut ? "Logging out..." : "Logout"
								})]
							})
						]
					})]
				})
			}) })]
		}),
		/* @__PURE__ */ jsx(Drawer, {
			isOpen: isDrawerOpen,
			toggleDrawer: handleToggleDrawer,
			children: /* @__PURE__ */ jsx(BillBoardDrawerContent, { toggleDrawer: handleToggleDrawer })
		}),
		/* @__PURE__ */ jsx(Notification, {
			isOpen: isNotificationOpen,
			handleNotification: handleToggleNotification,
			children: /* @__PURE__ */ jsx(BillboardNotification, {})
		})
	] });
};
//#endregion
//#region app/vendors/billboards/route.tsx
function Layout$4() {
	return /* @__PURE__ */ jsx(DashboardGate, {
		mode: "billboard",
		children: /* @__PURE__ */ jsxs("main", {
			className: "md:flex",
			children: [/* @__PURE__ */ jsx("section", {
				className: "group hidden transistion duration-300 md:block basis-[6%] hover:basis-[18.2%] xl:hover:basis-[15.8%] ",
				children: /* @__PURE__ */ jsx(BillBoardSideNav, {})
			}), /* @__PURE__ */ jsxs("section", {
				className: "md:basis-[100%]",
				children: [/* @__PURE__ */ jsx(BillBoardNav, {}), /* @__PURE__ */ jsx(Outlet, {})]
			})]
		})
	});
}
var Route$50 = createFileRoute("/vendors/billboards")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (!hasAccessToken()) throw redirect({ to: "/signin" });
		const at = getAccountType();
		if (!at) throw redirect({ to: "/signin" });
		if (at !== ACCOUNT_TYPE.BILLBOARD_OWNER) throw redirect({ to: getDashboardPathForAccountType(at) });
	},
	component: Layout$4
});
//#endregion
//#region components/navs/users/UserSideNav.tsx
var ads360white = "/logo/360white.svg";
var settings$1 = "/icons/usericon/whitesettings.svg";
var onsettings$1 = "/icons/usericon/onsettings.svg";
var dashboard$1 = "/icons/usericon/whitedashboard.svg";
var ondashboard$1 = "/icons/usericon/ondashboard.svg";
var campaign$1 = "/icons/usericon/whitecampaign.svg";
var oncampaign$1 = "/icons/usericon/oncampaign.svg";
var wallet$2 = "/icons/usericon/whitewallet.svg";
var onwallet$1 = "/icons/usericon/onwallet.svg";
var negotiations$1 = "/icons/usericon/offnegotiation.svg";
var onnegotiations$1 = "/icons/usericon/onnegotiation.svg";
function UserSideNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navItem1 = [
		{
			link: "/users",
			name: "Dashboard",
			off: dashboard$1,
			on: ondashboard$1
		},
		{
			link: "/users/campaign",
			name: "Campaign",
			off: campaign$1,
			on: oncampaign$1
		},
		{
			link: "/users/wallet",
			name: "Wallet",
			off: wallet$2,
			on: onwallet$1
		},
		{
			link: "/users/negotiations",
			name: "Negotiations",
			off: negotiations$1,
			on: onnegotiations$1
		}
	];
	const navItem2 = [{
		link: "/users/settings",
		name: "Settings",
		off: settings$1,
		on: onsettings$1
	}];
	return /* @__PURE__ */ jsxs("aside", {
		className: "group bg-[#292728] w-[5.7%] pt-5 hover:w-[18.5%] xl:hover:w-[14.5%] transistion duration-300 fixed overflow-hidden h-full text-white",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "mx-1 xl:mx-2",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					children: /* @__PURE__ */ jsx("img", {
						src: ads360white,
						alt: "360 ads logo"
					})
				})
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "space-y-4 my-14",
				children: navItem1.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
					to: items.link,
					className: "border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: items.on,
						alt: items.name
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
						children: items.name
					})]
				}) : /* @__PURE__ */ jsxs(Link, {
					to: items.link,
					className: "py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: items.off,
						alt: items.name
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block px-2 xl:px-4 hover:font-bold",
						children: items.name
					})]
				}) }, i))
			}),
			/* @__PURE__ */ jsx("ul", {
				className: "space-y-4 my-14",
				children: navItem2.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
					to: items.link,
					className: "border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: items.on,
						alt: items.name
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
						children: items.name
					})]
				}) : /* @__PURE__ */ jsxs(Link, {
					to: items.link,
					className: "py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: items.off,
						alt: items.name
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block px-2 xl:px-4 hover:font-bold",
						children: items.name
					})]
				}) }, i))
			})
		]
	});
}
//#endregion
//#region components/navs/users/UserDrawerContent.tsx
var settings = "/icons/usericon/whitesettings.svg";
var onsettings = "/icons/usericon/onsettings.svg";
var dashboard = "/icons/usericon/whitedashboard.svg";
var ondashboard = "/icons/usericon/ondashboard.svg";
var campaign = "/icons/usericon/whitecampaign.svg";
var oncampaign = "/icons/usericon/oncampaign.svg";
var wallet$1 = "/icons/usericon/whitewallet.svg";
var onwallet = "/icons/usericon/onwallet.svg";
var logout$1 = "/icons/usericon/whitelogout.svg";
var onlogout = "/icons/usericon/onlogout.svg";
var negotiations = "/icons/usericon/offnegotiation.svg";
var onnegotiations = "/icons/usericon/onnegotiation.svg";
var UserDrawerContent = ({ toggleDrawer }) => {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
	const handleLogout = () => {
		logoutUser(void 0, { onSettled: () => {
			toggleDrawer();
			navigate({ to: "/signin" });
		} });
	};
	const navItem1 = [
		{
			link: "/users",
			name: "Dashboard",
			off: dashboard,
			on: ondashboard
		},
		{
			link: "/users/campaign",
			name: "Campaign",
			off: campaign,
			on: oncampaign
		},
		{
			link: "/users/wallet",
			name: "Wallet",
			off: wallet$1,
			on: onwallet
		},
		{
			link: "/users/negotiations",
			name: "Negotiations",
			off: negotiations,
			on: onnegotiations
		}
	];
	const navItem2 = [{
		link: "/users/settings",
		name: "Settings",
		off: settings,
		on: onsettings
	}];
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("ul", {
		className: "space-y-4 my-14 ",
		children: navItem1.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
			onClick: toggleDrawer,
			to: items.link,
			className: "border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
			children: [/* @__PURE__ */ jsx("img", {
				src: items.on,
				alt: items.name,
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
				children: items.name
			})]
		}) : /* @__PURE__ */ jsxs(Link, {
			onClick: toggleDrawer,
			to: items.link,
			className: "py-2 px-4 flex items-center",
			children: [/* @__PURE__ */ jsx("img", {
				src: items.off,
				alt: items.name,
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "px-2 xl:px-4 hover:font-bold",
				children: items.name
			})]
		}) }, i))
	}), /* @__PURE__ */ jsxs("ul", {
		className: "space-y-4 my-14",
		children: [navItem2.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
			onClick: toggleDrawer,
			to: items.link,
			className: "border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
			children: [/* @__PURE__ */ jsx("img", {
				src: items.on,
				alt: items.name,
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
				children: items.name
			})]
		}) : /* @__PURE__ */ jsxs(Link, {
			onClick: toggleDrawer,
			to: items.link,
			className: "py-2 items-center px-4 flex",
			children: [/* @__PURE__ */ jsx("img", {
				src: items.off,
				alt: items.name,
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "px-2 xl:px-4 hover:font-bold",
				children: items.name
			})]
		}) }, i)), /* @__PURE__ */ jsx("li", { children: isLoggingOut ? /* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: handleLogout,
			className: "border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
			children: [/* @__PURE__ */ jsx("img", {
				src: onlogout,
				alt: "logout",
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
				children: "Logging out..."
			})]
		}) : /* @__PURE__ */ jsxs("button", {
			type: "button",
			onClick: handleLogout,
			className: "py-2 items-center px-4 flex",
			children: [/* @__PURE__ */ jsx("img", {
				src: logout$1,
				alt: "logout",
				className: "w-8 h-8"
			}), /* @__PURE__ */ jsx("span", {
				className: "px-2 xl:px-4 hover:font-bold",
				children: "Logout"
			})]
		}) })]
	})] });
};
//#endregion
//#region components/navs/users/UserNotificationContent.tsx
var noticeBell = "/images/noticebell.png";
var UserNotificationContent = () => {
	return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", {
		className: "text-center w-11/12 md:w-8/12 mx-auto my-16",
		children: [
			/* @__PURE__ */ jsx("img", {
				alt: "",
				src: noticeBell
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "font-bold",
				children: "You don't have any notifications!"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-gray-500",
				children: "But as soon as something happens, you'll find it right here."
			})
		]
	}) });
};
//#endregion
//#region components/navs/users/UsersNav.tsx
var wallet = "/icons/wallet.svg";
var bell = "/icons/bell.svg";
var avatar$1 = "/icons/user.png";
var logout = "/icons/usericon/onlogout.svg";
function UsersNav() {
	const [dropDown, setDropDown] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const navigate = useNavigate();
	const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
	const me = useMe();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const handleToggleDrawer = () => {
		if (isDrawerOpen) setIsDrawerOpen(false);
		else setIsDrawerOpen(true);
	};
	const handleToggleNotification = () => {
		if (isNotificationOpen) setIsNotificationOpen(false);
		else setIsNotificationOpen(true);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("nav", {
			className: "bg-white md:flex md:px-14 py-3 justify-between items-center hidden",
			children: [
				pathname.split("/")[1] !== "users" && /* @__PURE__ */ jsx(BlackLogo, {}),
				/* @__PURE__ */ jsx("div", {}),
				/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("ul", {
					className: "flex justify-between space-x-7 items-center",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/users/wallet",
							children: /* @__PURE__ */ jsx("img", {
								src: wallet,
								alt: "wallet"
							})
						}) }),
						/* @__PURE__ */ jsxs("li", {
							className: "relative cursor-pointer",
							onClick: handleToggleNotification,
							children: [/* @__PURE__ */ jsx("span", {
								className: "absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white",
								children: "0"
							}), /* @__PURE__ */ jsx("img", {
								src: bell,
								alt: "bell"
							})]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "relative",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setProfileOpen((p) => !p),
								children: /* @__PURE__ */ jsx("img", {
									className: "border-4 rounded-[50%]",
									width: 45,
									height: 45,
									src: avatar$1,
									alt: "avatar"
								})
							}), profileOpen && /* @__PURE__ */ jsxs("div", {
								className: "absolute right-0 top-12 bg-ads360light-100 z-[100000] w-[220px] rounded-10 p-3 shadow",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "px-2 py-2 border-b text-sm",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-bold",
										children: me.data?.accountType === "business_user" ? me.data.businessName : me.data?.accountType === "regular_user" ? `${me.data.firstName} ${me.data.lastName}`.trim() : "Account"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-stone-500 text-xs",
										children: me.data?.email ?? ""
									})]
								}), /* @__PURE__ */ jsxs("button", {
									type: "button",
									disabled: isLoggingOut,
									className: `flex items-center justify-center my-3 w-full ${isLoggingOut ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`,
									onClick: () => {
										if (isLoggingOut) return;
										logoutUser(void 0, { onSettled: () => {
											setProfileOpen(false);
											navigate({ to: "/signin" });
										} });
									},
									children: [/* @__PURE__ */ jsx("img", {
										src: logout,
										alt: "logout"
									}), /* @__PURE__ */ jsx("span", {
										className: "px-3",
										children: isLoggingOut ? "Logging out..." : "Logout"
									})]
								})]
							})]
						})
					]
				}) })
			]
		}),
		/* @__PURE__ */ jsxs("nav", {
			className: "bg-white md:hidden md:px-14 py-3 justify-between items-center flex",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "py-1 px-2 flex items-center space-x-3",
				children: [pathname.split("/")[1] === "users" && /* @__PURE__ */ jsx("div", {
					className: "rounded-full border shadow-md border-ads360yellow-100 p-2",
					onClick: handleToggleDrawer,
					children: /* @__PURE__ */ jsx(FiMenu, { size: 24 })
				}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BlackLogo, {}) })]
			}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("ul", {
				className: "flex py-1 px-2 items-center",
				onClick: () => setDropDown((prev) => !prev),
				children: /* @__PURE__ */ jsxs("li", {
					className: "relative",
					children: [/* @__PURE__ */ jsx("img", {
						className: "border-4 rounded-[50%]",
						width: 45,
						height: 45,
						src: avatar$1,
						alt: "avatar"
					}), dropDown && /* @__PURE__ */ jsxs("ul", {
						className: "absolute right-0 top-10 bg-ads360light-100 z-[100000] w-[200px] rounded-10 p-3",
						children: [
							/* @__PURE__ */ jsx("li", {
								className: "my-3",
								children: /* @__PURE__ */ jsxs(Link, {
									to: "/users/settings",
									className: "flex items-center",
									children: [/* @__PURE__ */ jsx("img", {
										className: "border-4 rounded-[50%] w-8 h-8",
										src: avatar$1,
										alt: "avatar"
									}), /* @__PURE__ */ jsx("span", {
										className: "px-3",
										children: "Profile"
									})]
								})
							}),
							/* @__PURE__ */ jsx("li", {
								className: "my-3",
								children: /* @__PURE__ */ jsxs(Link, {
									to: "/users/wallet",
									className: "flex items-center",
									children: [/* @__PURE__ */ jsx("img", {
										src: wallet,
										alt: "wallet"
									}), /* @__PURE__ */ jsx("span", {
										className: "px-3",
										children: "Wallet"
									})]
								})
							}),
							/* @__PURE__ */ jsxs("li", {
								className: "flex items-center my-3 cursor-pointer relative",
								onClick: handleToggleNotification,
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white",
										children: "0"
									}),
									/* @__PURE__ */ jsx("img", {
										src: bell,
										alt: "bell"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "px-3",
										children: "Notification"
									})
								]
							}),
							/* @__PURE__ */ jsx("hr", {}),
							/* @__PURE__ */ jsxs("li", {
								className: `flex justify-center items-center my-3 ${isLoggingOut ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`,
								onClick: () => {
									if (isLoggingOut) return;
									logoutUser(void 0, { onSettled: () => {
										setDropDown(false);
										navigate({ to: "/signin" });
									} });
								},
								children: [/* @__PURE__ */ jsx("img", {
									src: logout,
									alt: "logout"
								}), /* @__PURE__ */ jsx("span", {
									className: "px-3",
									children: isLoggingOut ? "Logging out..." : "Logout"
								})]
							})
						]
					})]
				})
			}) })]
		}),
		/* @__PURE__ */ jsx(Drawer, {
			isOpen: isDrawerOpen,
			toggleDrawer: handleToggleDrawer,
			children: /* @__PURE__ */ jsx(UserDrawerContent, { toggleDrawer: handleToggleDrawer })
		}),
		/* @__PURE__ */ jsx(Notification, {
			handleNotification: handleToggleNotification,
			isOpen: isNotificationOpen,
			children: /* @__PURE__ */ jsx(UserNotificationContent, {})
		})
	] });
}
//#endregion
//#region app/_usersauth/users/route.tsx
function Layout$3() {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("main", {
		className: "md:flex",
		children: [/* @__PURE__ */ jsx("section", {
			className: "group hidden transistion duration-300 md:block basis-[6%] hover:basis-[18.2%] xl:hover:basis-[15.8%] ",
			children: /* @__PURE__ */ jsx(UserSideNav, {})
		}), /* @__PURE__ */ jsxs("section", {
			className: "md:basis-[100%]",
			children: [/* @__PURE__ */ jsx(UsersNav, {}), /* @__PURE__ */ jsx(Outlet, {})]
		})]
	}) });
}
var Route$49 = createFileRoute("/_usersauth/users")({ component: Layout$3 });
//#endregion
//#region app/_usersauth/ads/route.tsx
function Layout$2() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("nav", {
		className: "fixed w-full z-[10000]",
		children: /* @__PURE__ */ jsx(UsersNav, {})
	}), /* @__PURE__ */ jsx("section", {
		className: "bg-ads360-hash min-h-screen",
		children: /* @__PURE__ */ jsx(Outlet, {})
	})] });
}
var Route$48 = createFileRoute("/_usersauth/ads")({ component: Layout$2 });
//#endregion
//#region app/_public/_lightnavbar/route.tsx
function Layout$1() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(LightNavbar, {}),
		/* @__PURE__ */ jsx(Outlet, {}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
var Route$47 = createFileRoute("/_public/_lightnavbar")({ component: Layout$1 });
//#endregion
//#region components/navs/public/DarkNavbar.tsx
var MobileMenu = "/icons/menu.svg";
var DarkNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const isLoggedIn = hasAccessToken$1();
	const handleToggleDrawer = () => {
		if (isOpen) setIsOpen(false);
		else setIsOpen(true);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("nav", {
		className: "flex px-5 md:px-0 justify-between md:justify-evenly -left-[100%] text-ads360light-100 py-5 bg-ads360black-100 text-base",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "py-2",
				children: /* @__PURE__ */ jsx(WhiteLogo, {})
			}),
			/* @__PURE__ */ jsxs("ul", {
				className: "py-3 hidden md:flex text-center",
				children: [
					/* @__PURE__ */ jsxs("li", {
						className: "group",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/about",
							className: "mx-4 transition duration-300 hover:text-ads360yellow-100",
							children: "About Us"
						}), /* @__PURE__ */ jsx("div", { className: "group-hover:animate-move ml-4 w-0 border-b border-b-ads360light-100 mt-1" })]
					}),
					/* @__PURE__ */ jsxs("li", {
						className: "group",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/discovery",
							className: "mx-4 transition duration-300 hover:text-ads360yellow-100",
							children: "Services"
						}), /* @__PURE__ */ jsx("div", { className: "group-hover:animate-move ml-4 w-0 border-b border-b-ads360light-100 mt-1" })]
					}),
					/* @__PURE__ */ jsxs("li", {
						className: "group",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/faqs",
							className: "mx-4 transition duration-300 hover:text-ads360yellow-100",
							children: "FAQs"
						}), /* @__PURE__ */ jsx("div", { className: "group-hover:animate-move ml-4 w-0 border-b border-b-ads360light-100 mt-1" })]
					}),
					/* @__PURE__ */ jsxs("li", {
						className: "group",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/contact",
							className: "mx-4 transition duration-300 hover:text-ads360yellow-100",
							children: "Contact Us"
						}), /* @__PURE__ */ jsx("div", { className: "group-hover:animate-move ml-4 w-0 border-b border-b-ads360light-100 mt-1" })]
					})
				]
			}),
			isLoggedIn ? /* @__PURE__ */ jsx("button", {
				className: "group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/users",
					children: "Dashboard"
				})
			}) : /* @__PURE__ */ jsx("button", {
				className: "group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12",
				children: /* @__PURE__ */ jsx(Link, {
					to: "/signup",
					children: "Get Stated"
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "md:hidden",
				onClick: handleToggleDrawer,
				children: /* @__PURE__ */ jsx("img", {
					src: MobileMenu,
					alt: ""
				})
			})
		]
	}), /* @__PURE__ */ jsx(Drawer, {
		isOpen,
		toggleDrawer: handleToggleDrawer,
		children: /* @__PURE__ */ jsx(DrawerContent, { toggleDrawer: handleToggleDrawer })
	})] });
};
//#endregion
//#region app/_public/_darknavbar/route.tsx
function Layout() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(DarkNavbar, {}),
		/* @__PURE__ */ jsx(Outlet, {}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
var Route$46 = createFileRoute("/_public/_darknavbar")({ component: Layout });
//#endregion
//#region app/_admin/admin/route.tsx
function AdminShell() {
	const router = useRouter();
	const { mutate: logout, isPending } = useLogout();
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-ads360-hash",
		children: [/* @__PURE__ */ jsx("header", {
			className: "border-b border-ads360yellow-100/30 bg-white/90 backdrop-blur",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3",
				children: [/* @__PURE__ */ jsxs(Link, {
					to: "/admin",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(BlackLogo, {}), /* @__PURE__ */ jsx("span", {
						className: "text-sm font-semibold text-gray-800",
						children: "Admin"
					})]
				}), /* @__PURE__ */ jsxs("nav", {
					className: "flex items-center gap-4 text-sm",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "text-gray-600 hover:text-gray-900",
						children: "Marketing site"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						disabled: isPending,
						className: "rounded border border-gray-300 px-3 py-1.5 text-gray-800 hover:bg-gray-50 disabled:opacity-50",
						onClick: () => logout(void 0, { onSuccess: () => router.navigate({ to: "/signin" }) }),
						children: isPending ? "Signing out…" : "Sign out"
					})]
				})]
			})
		}), /* @__PURE__ */ jsx("main", {
			className: "mx-auto max-w-5xl px-4 py-10",
			children: /* @__PURE__ */ jsx(Outlet, {})
		})]
	});
}
var Route$45 = createFileRoute("/_admin/admin")({ component: AdminShell });
//#endregion
//#region app/vendors/influencers/index.tsx
var page = () => {
	return /* @__PURE__ */ jsx("div", { children: "page" });
};
var Route$44 = createFileRoute("/vendors/influencers/")({ component: page });
//#endregion
//#region components/ui/LineCharts.tsx
var LineCharts = () => {
	return /* @__PURE__ */ jsx("div", {
		className: "",
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "95%",
			height: 300,
			children: /* @__PURE__ */ jsxs(LineChart, {
				data: [
					{
						id: "1",
						month: "jan",
						amt: 2400
					},
					{
						id: "2",
						month: "feb",
						amt: 2e3
					},
					{
						id: "3",
						month: "march",
						amt: 2700
					},
					{
						id: "4",
						month: "april",
						amt: 2500
					}
				],
				children: [
					/* @__PURE__ */ jsx(Line, {
						type: "monotone",
						dataKey: "amt",
						stroke: "#8884d8"
					}),
					/* @__PURE__ */ jsx(CartesianGrid, { stroke: "#ccc" }),
					/* @__PURE__ */ jsx(XAxis, { dataKey: "month" }),
					/* @__PURE__ */ jsx(YAxis, { dataKey: "amt" })
				]
			})
		})
	});
};
//#endregion
//#region components/ui/PieCharts.tsx
var PieCharts = () => {
	return /* @__PURE__ */ jsx(ResponsiveContainer, {
		width: "95%",
		height: 300,
		children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsx(Pie, {
			data: [
				{
					"name": "Group A",
					"value": 400
				},
				{
					"name": "Group B",
					"value": 300
				},
				{
					"name": "Group C",
					"value": 300
				},
				{
					"name": "Group D",
					"value": 200
				},
				{
					"name": "Group E",
					"value": 278
				},
				{
					"name": "jan",
					"value": 189
				}
			],
			dataKey: "value",
			nameKey: "name",
			cx: "50%",
			cy: "50%",
			innerRadius: 60,
			outerRadius: 80,
			fill: "#82ca9d",
			label: true
		}) })
	});
};
//#endregion
//#region endpoint/wallet/wallet.ts
function getWallet() {
	return baseFetchJson("/wallet", { method: "GET" });
}
function getWalletTransactions(limit = 100) {
	return baseFetchJson(`/wallet/transactions${limit ? `?limit=${limit}` : ""}`, { method: "GET" });
}
function getSavedPaymentCards() {
	return baseFetchJson("/wallet/cards", { method: "GET" });
}
function postWalletDeposit(body) {
	return baseFetchJson("/wallet/deposit", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
}
function postPayNow(body) {
	return baseFetchJson("/wallet/PayNow", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
}
//#endregion
//#region endpoint/wallet/useWallet.ts
function depositErrorMessage(error) {
	if (error instanceof ApiError) return error.message;
	if (error instanceof Error) return error.message;
	return "Payment could not be started.";
}
function useWallet() {
	return useQuery({
		queryKey: ["wallet"],
		queryFn: getWallet
	});
}
function useWalletTransactions(limit = 100) {
	return useQuery({
		queryKey: [
			"wallet",
			"transactions",
			limit
		],
		queryFn: () => getWalletTransactions(limit)
	});
}
function useSavedPaymentCards(enabled) {
	return useQuery({
		queryKey: ["wallet", "cards"],
		queryFn: getSavedPaymentCards,
		enabled
	});
}
function useWalletDeposit() {
	return useMutation({
		mutationFn: (body) => postWalletDeposit(body),
		onError: (error) => {
			toast.error(depositErrorMessage(error));
		}
	});
}
function usePayNow() {
	return useMutation({
		mutationFn: (body) => postPayNow(body),
		onError: (error) => {
			toast.error(depositErrorMessage(error));
		}
	});
}
function useInvalidateWalletQueries() {
	const qc = useQueryClient();
	return async () => {
		await qc.invalidateQueries({ queryKey: ["wallet"] });
		await qc.invalidateQueries({ queryKey: ["wallet", "transactions"] });
		await qc.invalidateQueries({ queryKey: ["wallet", "cards"] });
	};
}
//#endregion
//#region app/vendors/billboards/index.tsx
var naira$5 = "/icons/usericon/naira.svg";
var billboard$2 = "/icons/led2.svg";
var bluecampaign$1 = "/icons/usericon/bluecampiagn.svg";
var BillBoardDashboard = () => {
	const me = useMe();
	const wallet = useWallet();
	return /* @__PURE__ */ jsxs("section", {
		className: "bg-ads360-hash min-h-screen px-4 md:px-10 py-14",
		children: [
			/* @__PURE__ */ jsxs("h3", {
				className: "text-2xl",
				children: [
					"Hello ",
					me.data?.accountType === "billboard_owner" ? me.data.businessName ?? `${me.data.firstName} ${me.data.lastName}`.trim() : me.data?.accountType === "business_user" ? me.data.businessName : me.data?.accountType === "regular_user" ? `${me.data.firstName} ${me.data.lastName}`.trim() : "there",
					", what would you like to do?"
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "shadow border-ads360yellow-100 bg-white rounded-10 border my-10 overflow-x-auto",
				children: /* @__PURE__ */ jsxs("div", {
					className: "items-center flex md:justify-between px-2 md:px-14 py-5 w-[700px] md:w-full",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center my-3 md:my-0",
							children: [/* @__PURE__ */ jsx("img", {
								width: 60,
								height: 60,
								src: naira$5,
								alt: "naira sign"
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-sm px-2",
								children: [
									"₦",
									Number(wallet.data?.balance ?? 0).toFixed(2),
									/* @__PURE__ */ jsx("p", {
										className: "text-stone-400 text-xs",
										children: "Available Balance"
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center my-3 md:my-0",
							children: [/* @__PURE__ */ jsx("img", {
								width: 60,
								height: 60,
								src: bluecampaign$1,
								alt: "campiagn sign"
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-sm px-2",
								children: ["0", /* @__PURE__ */ jsx("p", {
									className: "text-stone-400 text-xs",
									children: "Total Campaigns"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center my-3 md:my-0",
							children: [/* @__PURE__ */ jsx("img", {
								width: 60,
								height: 60,
								src: billboard$2,
								alt: "cluster points"
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-sm px-2",
								children: ["0", /* @__PURE__ */ jsx("p", {
									className: "text-stone-400 text-xs",
									children: "Billboards"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center my-3 md:my-0",
							children: [/* @__PURE__ */ jsx("img", {
								width: 60,
								height: 60,
								src: bluecampaign$1,
								alt: "campiagn sign"
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-sm px-2",
								children: ["0", /* @__PURE__ */ jsx("p", {
									className: "text-stone-400 text-xs",
									children: "Active Campaigns"
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
				className: "md:flex md:space-x-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "basis-8/12 p-2 bg-white rounded-10 border border-ads360yellow-100 my-3",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "font-bold",
						children: "Revenue"
					}), /* @__PURE__ */ jsx(LineCharts, {})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "basis-4/12 p-2 bg-white rounded-10 border border-ads360yellow-100 my-3",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "font-bold",
						children: "Ads"
					}), /* @__PURE__ */ jsx(PieCharts, {})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-10 border border-ads360yellow-100 my-10",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "font-bold m-2",
					children: "Recent request"
				}), /* @__PURE__ */ jsx("div", {
					className: "w-full overflow-x-auto mt-2 mb-5",
					children: /* @__PURE__ */ jsxs("table", {
						className: "min-w-full",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-[#D0B301]/40",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "ID"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "COST"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "DATE CREATED"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "STATUS"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "ACTIONS"
								})
							] })
						}), /* @__PURE__ */ jsxs("tbody", {
							className: "text-center",
							children: [
								/* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-br",
										children: "#1"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "₦200000"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "2023-05-20"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "new"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: /* @__PURE__ */ jsx(Link, {
											to: `/vendors/billboards/requests/1`,
											children: "view"
										})
									})
								] }),
								/* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsxs("td", {
										className: "py-2 px-2 md:px-3 border-br relative",
										children: ["#2 ", /* @__PURE__ */ jsx("div", {
											className: "absolute px-1 bg-ads360yellowBtn-100 text-[10px] top-0 rounded-full",
											children: " new"
										})]
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "₦60000"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "2023-05-4"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "negotiating"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: /* @__PURE__ */ jsx(Link, {
											to: `/vendors/billboards/requests/2`,
											children: "view"
										})
									})
								] }),
								/* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-br",
										children: "#3"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "₦500000"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "2023-05-2"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "paid"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: /* @__PURE__ */ jsx(Link, {
											to: `/vendors/billboards/requests/3`,
											children: "view"
										})
									})
								] }),
								/* @__PURE__ */ jsxs("tr", { children: [
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-br",
										children: "#4"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "₦500000"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "2023-05-2"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: "completed"
									}),
									/* @__PURE__ */ jsx("td", {
										className: "py-2 px-2 md:px-3 border-b",
										children: /* @__PURE__ */ jsx(Link, {
											to: `/vendors/billboards/requests/4`,
											children: "view"
										})
									})
								] })
							]
						})]
					})
				})]
			})] })
		]
	});
};
var Route$43 = createFileRoute("/vendors/billboards/")({ component: BillBoardDashboard });
//#endregion
//#region app/_usersauth/wallet/index.tsx
function normalizeSearch(raw) {
	const pick = (k) => {
		const v = raw[k];
		if (typeof v === "string" && v.trim()) return v.trim();
		if (Array.isArray(v) && typeof v[0] === "string" && v[0].trim()) return v[0].trim();
	};
	return {
		status: pick("status"),
		tx_ref: pick("tx_ref"),
		transaction_id: pick("transaction_id")
	};
}
function isPaidStatus(status) {
	if (!status) return false;
	const s = status.toLowerCase();
	return s === "successful" || s === "success" || s === "completed" || s === "succeeded";
}
function isFailedLikeStatus(status) {
	if (!status) return false;
	const s = status.toLowerCase();
	return s === "failed" || s === "error" || s === "cancelled" || s === "canceled" || s === "aborted";
}
function WalletPaymentReturnPage() {
	const { status, tx_ref, transaction_id } = Route$42.useSearch();
	const queryClient = useQueryClient();
	useEffect(() => {
		if (!isPaidStatus(status)) return;
		queryClient.invalidateQueries({ queryKey: ["wallet"] });
		queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
		queryClient.invalidateQueries({ queryKey: ["wallet", "cards"] });
	}, [status, queryClient]);
	const paid = isPaidStatus(status);
	const failed = isFailedLikeStatus(status);
	return /* @__PURE__ */ jsx("section", {
		className: "min-h-screen bg-ads360-hash px-4 md:px-10 py-14",
		children: /* @__PURE__ */ jsx("div", {
			className: "container mx-auto max-w-lg",
			children: /* @__PURE__ */ jsxs("div", {
				className: "rounded-10 border border-ads360yellow-100 bg-white p-6 shadow-md",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "text-xl font-semibold text-stone-900",
						children: "Wallet payment"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-stone-500",
						children: "You were redirected here after paying with Flutterwave. Your bank may take a moment; the webhook updates your balance shortly after success."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 rounded-lg border border-stone-200 bg-stone-50 p-4",
						children: [paid ? /* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-green-700",
							children: "Payment reported as successful."
						}) : failed ? /* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-red-700",
							children: "Payment was not completed."
						}) : status != null && status !== "" && !paid && !failed ? /* @__PURE__ */ jsxs("p", {
							className: "text-sm font-medium text-amber-800",
							children: ["Status: ", status]
						}) : /* @__PURE__ */ jsx("p", {
							className: "text-sm text-stone-600",
							children: "No status was returned in the URL. Check your transaction in the wallet history."
						}), /* @__PURE__ */ jsxs("dl", {
							className: "mt-4 space-y-2 text-xs text-stone-600",
							children: [tx_ref ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
								className: "text-stone-400",
								children: "Reference (tx_ref)"
							}), /* @__PURE__ */ jsx("dd", {
								className: "font-mono break-all",
								children: tx_ref
							})] }) : null, transaction_id ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
								className: "text-stone-400",
								children: "Transaction ID"
							}), /* @__PURE__ */ jsx("dd", {
								className: "font-mono break-all",
								children: transaction_id
							})] }) : null]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end",
						children: [/* @__PURE__ */ jsx(Link, {
							to: "/users/wallet",
							className: "inline-flex justify-center rounded border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-50",
							children: "View wallet and history"
						}), /* @__PURE__ */ jsx(Link, {
							to: "/users",
							className: "inline-flex justify-center rounded border border-transparent bg-ads360black-100/95 px-4 py-2.5 text-sm font-medium text-ads360light-100 hover:bg-ads360black-100",
							children: "Back to dashboard"
						})]
					})
				]
			})
		})
	});
}
var Route$42 = createFileRoute("/_usersauth/wallet/")({
	validateSearch: (raw) => normalizeSearch(raw),
	component: WalletPaymentReturnPage
});
//#endregion
//#region app/_usersauth/users/index.tsx
var naira$4 = "/icons/usericon/naira.svg";
var bluecampaign = "/icons/usericon/bluecampiagn.svg";
var cluterpoint = "/icons/usericon/cluterpoint.svg";
var createcampiagn = "/images/Createacampaign.png";
var allcampiagn = "/images/allcampaign.png";
var wishlist = "/images/wishlist.png";
function Dashboard() {
	const me = useMe();
	return /* @__PURE__ */ jsxs("section", {
		className: "bg-ads360-hash min-h-screen px-4 md:px-10 py-14",
		children: [
			/* @__PURE__ */ jsxs("h3", {
				className: "text-2xl",
				children: [
					"Hello ",
					(me.data?.accountType === "business_user" ? me.data.businessName : me.data?.accountType === "regular_user" ? `${me.data.firstName} ${me.data.lastName}`.trim() : "") || "there",
					", what would you like to do?"
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "shadow border-ads360yellow-100 bg-white rounded-10 border my-10 overflow-x-auto",
				children: /* @__PURE__ */ jsxs("div", {
					className: "items-center flex md:justify-between px-3 md:px-20 py-5 w-[600px] md:w-full",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center my-3 md:my-0",
							children: [/* @__PURE__ */ jsx("img", {
								width: 60,
								height: 60,
								src: naira$4,
								alt: "naira sign"
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-sm px-5",
								children: ["₦500.00", /* @__PURE__ */ jsx("p", {
									className: "text-stone-400 text-xs",
									children: "Available Balance"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center my-3 md:my-0",
							children: [/* @__PURE__ */ jsx("img", {
								width: 60,
								height: 60,
								src: bluecampaign,
								alt: "campiagn sign"
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-sm px-5",
								children: ["0", /* @__PURE__ */ jsx("p", {
									className: "text-stone-400 text-xs",
									children: "Active Campaigns"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center my-3 md:my-0",
							children: [/* @__PURE__ */ jsx("img", {
								width: 60,
								height: 60,
								src: cluterpoint,
								alt: "cluster points"
							}), /* @__PURE__ */ jsxs("div", {
								className: "text-sm px-5",
								children: ["0", /* @__PURE__ */ jsx("p", {
									className: "text-stone-400 text-xs",
									children: "Cluster Points"
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "border text-center border-ads360yellow-100 bg-white rounded-10 px-3 py-5",
						children: [
							/* @__PURE__ */ jsx("img", {
								height: 150,
								width: 150,
								alt: "create campaign",
								src: createcampiagn,
								className: "mx-auto"
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "my-3 font-bold",
								children: "Create an Ad Campaign"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-center",
								children: /* @__PURE__ */ jsxs("span", {
									className: "group flex w-[200px]",
									children: [/* @__PURE__ */ jsx("button", {
										className: "group-hover:translate-x-40 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white",
										children: /* @__PURE__ */ jsx(FiArrowRight, { size: 28 })
									}), /* @__PURE__ */ jsxs("button", {
										className: "group-hover:-translate-x-10 w-40 group-hover:bg-ads360black-100  group-hover:text-ads360light-100 transition rounded-10 bg-ads360yellowBtn-100 h-12",
										children: [" ", /* @__PURE__ */ jsx(Link, {
											to: "../ads",
											children: "Let’s Get Started"
										})]
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border text-center border-ads360yellow-100 bg-white rounded-10 px-3 py-5",
						children: [
							/* @__PURE__ */ jsx("img", {
								height: 150,
								width: 150,
								alt: "create campaign",
								src: allcampiagn,
								className: "mx-auto"
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "my-3 font-bold",
								children: "See all my Campaigns"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-center",
								children: /* @__PURE__ */ jsxs("span", {
									className: "group flex w-[200px]",
									children: [/* @__PURE__ */ jsx("button", {
										className: "group-hover:translate-x-40 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white",
										children: /* @__PURE__ */ jsx(FiArrowRight, { size: 28 })
									}), /* @__PURE__ */ jsxs("button", {
										className: "group-hover:-translate-x-10 w-40 group-hover:bg-ads360black-100  group-hover:text-ads360light-100 transition rounded-10 bg-ads360yellowBtn-100 h-12",
										children: [" ", /* @__PURE__ */ jsx(Link, {
											to: "/users/campaign",
											children: "My Campaign"
										})]
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "border text-center border-ads360yellow-100 bg-white rounded-10 px-3 py-5",
						children: [
							/* @__PURE__ */ jsx("img", {
								height: 150,
								width: 150,
								alt: "create campaign",
								src: wishlist,
								className: "mx-auto"
							}),
							/* @__PURE__ */ jsx("h4", {
								className: "my-3 font-bold",
								children: "See all my Wishlist"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-center",
								children: /* @__PURE__ */ jsxs("span", {
									className: "group flex w-[200px]",
									children: [/* @__PURE__ */ jsx("button", {
										className: "group-hover:translate-x-40 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white",
										children: /* @__PURE__ */ jsx(FiArrowRight, { size: 28 })
									}), /* @__PURE__ */ jsxs("button", {
										className: "group-hover:-translate-x-10 w-40 group-hover:bg-ads360black-100  group-hover:text-ads360light-100 transition rounded-10 bg-ads360yellowBtn-100 h-12",
										children: [" ", /* @__PURE__ */ jsx(Link, {
											to: "/",
											children: "Wishlist"
										})]
									})]
								})
							})
						]
					})
				]
			})
		]
	});
}
var Route$41 = createFileRoute("/_usersauth/users/")({ component: Dashboard });
//#endregion
//#region components/buttons/BackBtn.tsx
var Arrowleft$1 = "/icons/Arrowleft.svg";
var BackBtn = ({ children }) => {
	const router = useRouter();
	const goBack = () => {
		router.history.back();
	};
	return /* @__PURE__ */ jsxs("div", {
		onClick: goBack,
		className: "flex items-center font-bold",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: "group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white",
			children: /* @__PURE__ */ jsx("img", {
				src: Arrowleft$1,
				alt: "arrow"
			})
		}), children]
	});
};
//#endregion
//#region components/ui/Steps.tsx
var mark$1 = "/icons/mark.svg";
var Steps = ({ step, text }) => {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "hidden items-center justify-center mx-auto mt-5 mb-14 md:flex",
		children: [
			step > 1 ? /* @__PURE__ */ jsxs("div", {
				className: "font-bold text-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-5 h-5 rounded-full border flex justify-center bg-ads360yellow-100",
						children: /* @__PURE__ */ jsx("img", {
							src: mark$1,
							alt: ""
						})
					}), /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0" })]
				}), /* @__PURE__ */ jsx("div", {
					className: "relative -left-10",
					children: "Select Campaign"
				})]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "font-bold text-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full border border-ads360yellow-100" }), /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[200px] border border-gray-300 h-0" })]
				}), /* @__PURE__ */ jsx("div", {
					className: "relative -left-10",
					children: "Select Campaign"
				})]
			}),
			step > 2 ? /* @__PURE__ */ jsxs("div", {
				className: "font-bold text-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center",
						children: /* @__PURE__ */ jsx("img", {
							src: mark$1,
							alt: ""
						})
					}), /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0" })]
				}), /* @__PURE__ */ jsx("div", {
					className: "relative -left-10",
					children: "Onboarding"
				})]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "font-bold text-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full border border-ads360yellow-100" }), /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[200px] border border-gray-300 h-0" })]
				}), /* @__PURE__ */ jsx("div", {
					className: "relative -left-10",
					children: "Onboarding"
				})]
			}),
			step > 3 ? /* @__PURE__ */ jsxs("div", {
				className: "font-bold text-sm",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center",
						children: /* @__PURE__ */ jsx("img", {
							src: mark$1,
							alt: ""
						})
					}), /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0" })]
				}), /* @__PURE__ */ jsx("div", {
					className: "relative -left-10",
					children: "completion"
				})]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "font-bold text-sm text-left",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full border border-ads360yellow-100" }), /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[200px] border border-gray-300 h-0" })]
				}), /* @__PURE__ */ jsx("div", {
					className: "relative -left-7",
					children: "completion"
				})]
			}),
			step > 4 ? /* @__PURE__ */ jsxs("div", {
				className: "font-bold text-sm",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex items-center",
					children: /* @__PURE__ */ jsx("div", {
						className: "w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center",
						children: /* @__PURE__ */ jsx("img", {
							src: mark$1,
							alt: ""
						})
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "relative -left-5",
					children: "Checkout"
				})]
			}) : /* @__PURE__ */ jsxs("div", {
				className: "font-bold text-sm",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex items-center",
					children: /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full border border-ads360yellow-100" })
				}), /* @__PURE__ */ jsx("div", {
					className: "relative -left-5",
					children: "Checkout"
				})]
			})
		]
	}), /* @__PURE__ */ jsx("div", {
		className: "font-bold md:hidden text-right mt-5 mb-10",
		children: text
	})] });
};
//#endregion
//#region components/modal/modal.tsx
var Modal = ({ isOpen, children }) => {
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(motion.div, {
		className: "fixed z-[10000000] left-0 top-0 w-full bg-black/50 h-full",
		initial: {
			opacity: 0,
			scale: .75
		},
		animate: {
			opacity: 1,
			scale: 1,
			transition: {
				ease: "easeOut",
				duration: .15
			}
		},
		exit: {
			opacity: 0,
			scale: .75,
			transition: {
				ease: "easeIn",
				duration: .15
			}
		},
		children: /* @__PURE__ */ jsx("div", {
			className: "bg-black/50 fixed z-50 w-full h-full grid grid-cols-1 content-center",
			children
		})
	}) }) });
};
//#endregion
//#region app/_usersauth/ads/index.tsx
var cancel$7 = "/icons/usericon/modalCancelBotton.svg";
var digital$1 = "/icons/digital.svg";
var billboard$1 = "/icons/led2.svg";
var sms = "/icons/sms.svg";
var influencer$1 = "/icons/influencer.svg";
var whatsapp$2 = "/icons/whatsappCluster.svg";
function Ads() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	let user = "verified";
	const handleRoute = (link) => {
		if (user === "verified" || link === "ads/sms") navigate({ to: `/${link}` });
		else setOpen(true);
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-10 py-24",
		children: [
			/* @__PURE__ */ jsx(BackBtn, { children: "Create an ad campaign" }),
			/* @__PURE__ */ jsx(Steps, {
				step: 1,
				text: "#1 - select campaign"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 text-center",
				children: "Select the goal that would make the campaign successful for you."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 gap-5 my-10",
				children: [
					{
						image: billboard$1,
						text: "Get access to a new world of campaigning with the right touch",
						link: "ads/billboard",
						name: "Billboard Ads"
					},
					{
						image: digital$1,
						text: "Hit your right target with smart Voice / SMS",
						link: "ads/digital",
						name: "Digital Ads"
					},
					{
						image: sms,
						text: "Bring speed and scale to your business with juicy and premium offers",
						link: "ads/sms",
						name: "Smart SMS"
					},
					{
						image: influencer$1,
						text: "Tap from our unlimited network of top influencers APP Download Campaign",
						link: "ads/influencer",
						name: "Influencer Ads"
					},
					{
						image: whatsapp$2,
						text: "Get cluster points and increase your stats in exchange for money",
						link: "ads/whatsapp",
						name: "WhatsApp Ads"
					}
				].map((ad, i) => /* @__PURE__ */ jsx("div", {
					onClick: () => handleRoute(ad.link),
					className: "cursor-pointer",
					children: /* @__PURE__ */ jsxs("div", {
						className: "group shadow flex rounded justify-between px-3 md:px-10 py-5 bg-white border border-ads360yellow-100 items-center",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center",
							children: [/* @__PURE__ */ jsx("img", {
								width: 70,
								height: 70,
								alt: ad.name,
								src: ad.image
							}), /* @__PURE__ */ jsxs("div", {
								className: "px-4",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-bold group-hover:text-ads360yellow-100",
									children: ad.name
								}), /* @__PURE__ */ jsx("p", {
									className: "text-stone-400 text-sm",
									children: ad.text
								})]
							})]
						}), user === "not verified" && ad.name !== "Smart SMS" && /* @__PURE__ */ jsx("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ jsx("button", {
								className: "p-1 rounded-10 text-sm bg-ads360yellowBtn-100",
								children: "get verified"
							})
						})]
					})
				}, i))
			}),
			/* @__PURE__ */ jsx(Modal, {
				isOpen: open,
				children: /* @__PURE__ */ jsxs("div", {
					className: "bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between mb-5",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "font-bold",
							children: "Get Verified"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setOpen(false),
							children: /* @__PURE__ */ jsx("img", {
								src: cancel$7,
								alt: "modal cancel botton",
								className: "w-5"
							})
						})]
					}), /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("p", { children: "enter your NIN to get verified" }),
						/* @__PURE__ */ jsx("input", { className: "p-2 focus:outline-none w-full border rounded-r" }),
						/* @__PURE__ */ jsx("button", {
							className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 text-white p-2",
							children: "Verify"
						})
					] }) })]
				})
			})
		]
	});
}
var Route$40 = createFileRoute("/_usersauth/ads/")({ component: Ads });
//#endregion
//#region app/_admin/admin/index.tsx
function AdminHome() {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-10 border border-ads360yellow-100 bg-white p-8 shadow-sm",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-semibold text-gray-900",
				children: "Admin dashboard"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-gray-600",
				children: "This is a placeholder home for administrators. Connect admin tools (invites, billboard verification, etc.) here as you build them."
			}),
			/* @__PURE__ */ jsxs("ul", {
				className: "mt-6 list-disc space-y-2 pl-5 text-sm text-gray-700",
				children: [
					/* @__PURE__ */ jsx("li", { children: "Use the API to create invites and verify billboard owners." }),
					/* @__PURE__ */ jsx("li", { children: "Regular and business users use the main app at /users." }),
					/* @__PURE__ */ jsx("li", { children: "Billboard owners use /vendors/billboards." })
				]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-8 text-sm text-gray-500",
				children: [
					"Tip: sign in with an account that has ",
					/* @__PURE__ */ jsx("code", {
						className: "rounded bg-gray-100 px-1",
						children: "admin"
					}),
					" ",
					"as account type to access this area."
				]
			})
		]
	});
}
var Route$39 = createFileRoute("/_admin/admin/")({ component: AdminHome });
//#endregion
//#region app/_access/signup/index.tsx
var MIN_PASSWORD_LENGTH = 8;
var PHONE_NUMBER_HINT = "Enter phone number without the leading 0.";
var requiredString = (label) => z.string().trim().min(1, `${label} is required.`);
var phoneSchema = z.object({
	countryIso2: requiredString("Country").transform((v) => v.toUpperCase()),
	nationalNumber: requiredString("Phone number").regex(/^[0-9\s-]+$/, "Phone number must contain only digits.").transform((v) => v.replace(/[\s-]/g, ""))
});
function parsePhoneToE164(countryIso2, nationalNumber) {
	const parsed = parsePhoneNumberFromString(nationalNumber, countryIso2);
	if (!parsed?.isValid()) return null;
	return parsed.format("E.164");
}
var termsSchema = z.boolean().refine((v) => v, { message: "You must agree to the terms and conditions." });
var individualSchema = z.object({
	firstName: requiredString("First name"),
	lastName: requiredString("Last name"),
	email: requiredString("Email").email("Enter a valid email."),
	password: requiredString("Password").min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`),
	confirmPassword: requiredString("Confirm password"),
	phone: phoneSchema,
	termsAccepted: termsSchema
}).refine((d) => d.password === d.confirmPassword, {
	path: ["confirmPassword"],
	message: "Passwords do not match."
});
var businessSchema = z.object({
	businessName: requiredString("Business name"),
	email: requiredString("Business email").email("Enter a valid email."),
	contactName: requiredString("Contact name"),
	password: requiredString("Password").min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`),
	confirmPassword: requiredString("Confirm password"),
	phone: phoneSchema,
	termsAccepted: termsSchema
}).refine((d) => d.password === d.confirmPassword, {
	path: ["confirmPassword"],
	message: "Passwords do not match."
});
function collectZodErrors(issues) {
	const out = {};
	for (const issue of issues) {
		const key = issue.path.join(".");
		if (!out[key]) out[key] = issue.message;
	}
	return out;
}
var baseInputClass$1 = "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px] border";
function inputClass$2(hasError) {
	return `${baseInputClass$1} ${hasError ? "border-red-500" : "border-transparent"}`;
}
function FieldError$1({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "text-sm text-red-600 mt-1",
		children: message
	});
}
var CloseAside$1 = "/icons/closeAside.svg";
var girl$1 = "/images/adsgirlblank.png";
var SignUp = () => {
	const router = useRouter();
	const [isIndividual, setIsIndividual] = useState(true);
	const slider = useRef(null);
	const sliderB = useRef(null);
	const sliderI = useRef(null);
	const handleSignUp = () => {
		if (isIndividual) {
			setIsIndividual(false);
			slider.current?.classList.add("SignupSliderB");
			slider.current?.classList.remove("SignupSliderI");
			slider.current?.classList.remove("left-0");
			sliderI.current?.classList.add("SignupI");
			sliderB.current?.classList.add("SignupB");
		} else {
			setIsIndividual(true);
			slider.current?.classList.add("SignupSliderI");
			slider.current?.classList.remove("SignupSliderB");
			sliderB.current?.classList.remove("SignupB");
			sliderI.current?.classList.remove("SignupI");
		}
	};
	const defaultCountryIso2 = COUNTRIES$1[0]?.iso2 ?? "NG";
	const [individual, setIndividual] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: {
			countryIso2: defaultCountryIso2,
			nationalNumber: ""
		},
		termsAccepted: false
	});
	const [business, setBusiness] = useState({
		businessName: "",
		email: "",
		contactName: "",
		password: "",
		confirmPassword: "",
		phone: {
			countryIso2: defaultCountryIso2,
			nationalNumber: ""
		},
		termsAccepted: false
	});
	const [individualErrors, setIndividualErrors] = useState({});
	const [businessErrors, setBusinessErrors] = useState({});
	const [showIndividualPassword, setShowIndividualPassword] = useState(false);
	const [showIndividualConfirmPassword, setShowIndividualConfirmPassword] = useState(false);
	const [showBusinessPassword, setShowBusinessPassword] = useState(false);
	const [showBusinessConfirmPassword, setShowBusinessConfirmPassword] = useState(false);
	const { mutate: register, isPending } = useRegister();
	const signUp = () => {
		if (isIndividual) {
			setIndividualErrors({});
			const parsed = individualSchema.safeParse(individual);
			if (!parsed.success) {
				setIndividualErrors(collectZodErrors(parsed.error.issues));
				return;
			}
			const e164 = parsePhoneToE164(parsed.data.phone.countryIso2, parsed.data.phone.nationalNumber);
			if (!e164) {
				setIndividualErrors((prev) => ({
					...prev,
					"phone.nationalNumber": "Enter a valid phone number."
				}));
				return;
			}
			register({
				firstName: parsed.data.firstName,
				lastName: parsed.data.lastName,
				email: parsed.data.email,
				password: parsed.data.password,
				phone: e164,
				accountType: "regular_user"
			}, { onSuccess: (data) => {
				console.log(data);
				router.navigate({
					to: "/email-verification",
					state: (prev) => ({
						...prev ?? {},
						user: data?.user || {}
					})
				});
			} });
		} else {
			setBusinessErrors({});
			const parsed = businessSchema.safeParse(business);
			if (!parsed.success) {
				setBusinessErrors(collectZodErrors(parsed.error.issues));
				return;
			}
			const e164 = parsePhoneToE164(parsed.data.phone.countryIso2, parsed.data.phone.nationalNumber);
			if (!e164) {
				setBusinessErrors((prev) => ({
					...prev,
					"phone.nationalNumber": "Enter a valid phone number."
				}));
				return;
			}
			register({
				businessName: parsed.data.businessName,
				email: parsed.data.email,
				password: parsed.data.password,
				phone: e164,
				accountType: "business_user",
				contactName: parsed.data.contactName
			}, { onSuccess: (data) => {
				console.log(data);
				router.navigate({
					to: "/email-verification",
					state: (prev) => ({
						...prev ?? {},
						user: data?.user || {}
					})
				});
			} });
		}
	};
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", {
		className: "bg-ads360light-100 h-screen",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "hidden w-1/2 bg-ads360black-100 lg:flex justify-end pt-36 h-full fixed z-40",
				children: /* @__PURE__ */ jsx("div", {
					className: "w-4/5",
					children: /* @__PURE__ */ jsx("img", {
						src: girl$1,
						alt: "..."
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "lg:flex",
				children: [/* @__PURE__ */ jsx("div", { className: "hidden lg:flex lg:basis-1/2" }), /* @__PURE__ */ jsx("div", {
					className: "lg:basis-1/2",
					children: /* @__PURE__ */ jsxs("div", {
						className: "w-[90%] md:w-[80%] mx-auto",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									children: /* @__PURE__ */ jsx("img", {
										src: CloseAside$1,
										alt: "..."
									})
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-center",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-2xl lg:text-4xl mb-2",
									children: "Let’s Dive right in."
								}), /* @__PURE__ */ jsx("h5", {
									className: "text-ads360yellow-100",
									children: "Please complete to create your account."
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-around flex-row-reverse lg:flex-row hover:cursor-pointer relative h-10 rounded-3xl bg-ads360black-100 text-ads360light-100 my-5",
								children: [
									/* @__PURE__ */ jsx("div", {
										onClick: handleSignUp,
										className: "basis-1/2 text-center py-2",
										children: "Individual Account"
									}),
									/* @__PURE__ */ jsxs("div", {
										ref: slider,
										className: "text-center absolute w-1/2 bg-ads360gray-100 left-0 rounded-3xl top-0 h-10 py-2 transition duration-700",
										children: [/* @__PURE__ */ jsx("span", {
											className: "hidden lg:inline",
											children: isIndividual ? "Individual Account" : "Business Account"
										}), /* @__PURE__ */ jsx("span", {
											className: "lg:hidden",
											children: isIndividual ? "Business Account" : "Individual Account"
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										onClick: handleSignUp,
										className: "basis-1/2 text-center py-2",
										children: "Business Account"
									})
								]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex overflow-hidden lg:overflow-auto",
				children: [/* @__PURE__ */ jsx("div", {
					ref: sliderB,
					className: "lg:basis-1/2 bg-ads360light-100 transition duration-700 shrink-0 w-full",
					children: /* @__PURE__ */ jsx("div", {
						className: "w-[80%] mx-auto",
						children: /* @__PURE__ */ jsxs("div", {
							className: "",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
									className: "lg:basis-1/2 lg:pr-2",
									children: [
										/* @__PURE__ */ jsx("label", {
											htmlFor: "firstname",
											children: "Business Name"
										}),
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("input", {
											type: "text",
											id: "firstname",
											value: business.businessName,
											onChange: (e) => setBusiness((p) => ({
												...p,
												businessName: e.target.value
											})),
											className: inputClass$2(!!businessErrors.businessName)
										}),
										/* @__PURE__ */ jsx(FieldError$1, { message: businessErrors.businessName })
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", {
											htmlFor: "email",
											children: "Business Email"
										}),
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("input", {
											type: "email",
											id: "email",
											value: business.email,
											onChange: (e) => setBusiness((p) => ({
												...p,
												email: e.target.value
											})),
											className: inputClass$2(!!businessErrors.email)
										}),
										/* @__PURE__ */ jsx(FieldError$1, { message: businessErrors.email })
									]
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("div", {
										className: "lg:flex my-3",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "basis-1/2 my-3 lg:my-0 lg:pr-2",
											children: [
												/* @__PURE__ */ jsx("label", {
													htmlFor: "password-business",
													children: "Password"
												}),
												/* @__PURE__ */ jsx("br", {}),
												/* @__PURE__ */ jsxs("div", {
													className: "relative",
													children: [/* @__PURE__ */ jsx("input", {
														type: showBusinessPassword ? "text" : "password",
														id: "password-business",
														value: business.password,
														onChange: (e) => setBusiness((p) => ({
															...p,
															password: e.target.value
														})),
														autoComplete: "new-password",
														className: inputClass$2(!!businessErrors.password)
													}), /* @__PURE__ */ jsx("button", {
														type: "button",
														className: "absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700",
														onClick: () => setShowBusinessPassword((s) => !s),
														children: showBusinessPassword ? "Hide" : "Show"
													})]
												}),
												/* @__PURE__ */ jsx(FieldError$1, { message: businessErrors.password })
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "basis-1/2 my-3 lg:my-0 lg:pl-2",
											children: [
												/* @__PURE__ */ jsx("label", {
													htmlFor: "confirmPassword-business",
													children: "Confirm Password"
												}),
												/* @__PURE__ */ jsx("br", {}),
												/* @__PURE__ */ jsxs("div", {
													className: "relative",
													children: [/* @__PURE__ */ jsx("input", {
														type: showBusinessConfirmPassword ? "text" : "password",
														id: "confirmPassword-business",
														value: business.confirmPassword,
														onChange: (e) => setBusiness((p) => ({
															...p,
															confirmPassword: e.target.value
														})),
														autoComplete: "new-password",
														className: inputClass$2(!!businessErrors.confirmPassword)
													}), /* @__PURE__ */ jsx("button", {
														type: "button",
														className: "absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700",
														onClick: () => setShowBusinessConfirmPassword((s) => !s),
														children: showBusinessConfirmPassword ? "Hide" : "Show"
													})]
												}),
												/* @__PURE__ */ jsx(FieldError$1, { message: businessErrors.confirmPassword })
											]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "my-3",
										children: [
											/* @__PURE__ */ jsx("label", {
												htmlFor: "email",
												children: "Contact Name"
											}),
											/* @__PURE__ */ jsx("br", {}),
											/* @__PURE__ */ jsx("input", {
												type: "text",
												id: "email",
												className: inputClass$2(!!businessErrors.contactName),
												value: business.contactName,
												onChange: (e) => setBusiness((p) => ({
													...p,
													contactName: e.target.value
												}))
											}),
											/* @__PURE__ */ jsx(FieldError$1, { message: businessErrors.contactName })
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "my-3",
										children: [
											/* @__PURE__ */ jsx("label", {
												htmlFor: "phoneNumber-business",
												children: "Phone Number"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-sm text-gray-600 mt-1 mb-1.5 leading-snug",
												children: PHONE_NUMBER_HINT
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "basis-1/3",
													children: [/* @__PURE__ */ jsx("select", {
														value: business.phone.countryIso2,
														onChange: (e) => setBusiness((p) => ({
															...p,
															phone: {
																...p.phone,
																countryIso2: e.target.value
															}
														})),
														className: inputClass$2(!!businessErrors["phone.countryIso2"]),
														children: COUNTRIES$1.map((c) => /* @__PURE__ */ jsxs("option", {
															value: c.iso2,
															children: [
																c.flag,
																" +",
																c.callingCode
															]
														}, c.iso2))
													}), /* @__PURE__ */ jsx(FieldError$1, { message: businessErrors["phone.countryIso2"] })]
												}), /* @__PURE__ */ jsxs("div", {
													className: "basis-2/3",
													children: [/* @__PURE__ */ jsx("input", {
														type: "tel",
														inputMode: "tel",
														id: "phoneNumber-business",
														placeholder: "8012345678",
														autoComplete: "tel-national",
														className: inputClass$2(!!businessErrors["phone.nationalNumber"]),
														value: business.phone.nationalNumber,
														onChange: (e) => setBusiness((p) => ({
															...p,
															phone: {
																...p.phone,
																nationalNumber: e.target.value
															}
														}))
													}), /* @__PURE__ */ jsx(FieldError$1, { message: businessErrors["phone.nationalNumber"] })]
												})]
											})
										]
									})
								] }),
								/* @__PURE__ */ jsxs("div", {
									className: "text-center my-5",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: business.termsAccepted,
											onChange: (e) => setBusiness((p) => ({
												...p,
												termsAccepted: e.target.checked
											})),
											className: `h-4 w-4 ${businessErrors.termsAccepted ? "accent-red-600" : ""}`
										}), /* @__PURE__ */ jsxs("span", { children: [
											"I agree with",
											" ",
											/* @__PURE__ */ jsx(Link, {
												to: "/",
												className: "text-ads360yellow-100",
												children: "terms and conditions"
											})
										] })]
									}), /* @__PURE__ */ jsx(FieldError$1, { message: businessErrors.termsAccepted })]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex justify-center my-5",
									children: /* @__PURE__ */ jsx(BlackButtons, {
										handleClick: signUp,
										text: "Sign Up",
										isPending
									})
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-center my-5",
									children: [
										"Already have an account?",
										" ",
										/* @__PURE__ */ jsxs(Link, {
											to: "/signin",
											className: "text-ads360yellow-100",
											children: [" ", "Sign In"]
										})
									]
								})
							]
						})
					})
				}), /* @__PURE__ */ jsx("div", {
					ref: sliderI,
					className: "lg:basis-1/2 bg-ads360light-100 transition duration-700 shrink-0 w-full",
					children: /* @__PURE__ */ jsx("div", {
						className: "w-[80%] mx-auto",
						children: /* @__PURE__ */ jsxs("div", {
							className: "",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
									className: "lg:flex my-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "basis-1/2 my-3 lg:my-0 md:pr-2",
										children: [
											/* @__PURE__ */ jsx("label", {
												htmlFor: "firstname",
												children: "First Name"
											}),
											/* @__PURE__ */ jsx("br", {}),
											/* @__PURE__ */ jsx("input", {
												type: "text",
												id: "firstname",
												value: individual.firstName,
												onChange: (e) => setIndividual((p) => ({
													...p,
													firstName: e.target.value
												})),
												className: inputClass$2(!!individualErrors.firstName)
											}),
											/* @__PURE__ */ jsx(FieldError$1, { message: individualErrors.firstName })
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "basis-1/2 my-3 lg:my-0 lg:pl-2",
										children: [
											/* @__PURE__ */ jsx("label", {
												htmlFor: "lastname",
												children: "Last Name"
											}),
											/* @__PURE__ */ jsx("br", {}),
											/* @__PURE__ */ jsx("input", {
												type: "text",
												id: "lastname",
												value: individual.lastName,
												onChange: (e) => setIndividual((p) => ({
													...p,
													lastName: e.target.value
												})),
												className: inputClass$2(!!individualErrors.lastName)
											}),
											/* @__PURE__ */ jsx(FieldError$1, { message: individualErrors.lastName })
										]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", {
											htmlFor: "email",
											children: "Email"
										}),
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("input", {
											type: "email",
											id: "email",
											value: individual.email,
											onChange: (e) => setIndividual((p) => ({
												...p,
												email: e.target.value
											})),
											className: inputClass$2(!!individualErrors.email)
										}),
										/* @__PURE__ */ jsx(FieldError$1, { message: individualErrors.email })
									]
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
									className: "lg:flex my-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "basis-1/2 my-3 lg:my-0 md:pr-2",
										children: [
											/* @__PURE__ */ jsx("label", {
												htmlFor: "password-individual",
												children: "Password"
											}),
											/* @__PURE__ */ jsx("br", {}),
											/* @__PURE__ */ jsxs("div", {
												className: "relative",
												children: [/* @__PURE__ */ jsx("input", {
													type: showIndividualPassword ? "text" : "password",
													id: "password-individual",
													value: individual.password,
													onChange: (e) => setIndividual((p) => ({
														...p,
														password: e.target.value
													})),
													autoComplete: "new-password",
													className: inputClass$2(!!individualErrors.password)
												}), /* @__PURE__ */ jsx("button", {
													type: "button",
													className: "absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700",
													onClick: () => setShowIndividualPassword((s) => !s),
													children: showIndividualPassword ? "Hide" : "Show"
												})]
											}),
											/* @__PURE__ */ jsx(FieldError$1, { message: individualErrors.password })
										]
									}), /* @__PURE__ */ jsxs("div", {
										className: "basis-1/2 my-3 lg:my-0 lg:pl-2",
										children: [
											/* @__PURE__ */ jsx("label", {
												htmlFor: "confirmPassword-individual",
												children: "Confirm Password"
											}),
											/* @__PURE__ */ jsx("br", {}),
											/* @__PURE__ */ jsxs("div", {
												className: "relative",
												children: [/* @__PURE__ */ jsx("input", {
													type: showIndividualConfirmPassword ? "text" : "password",
													id: "confirmPassword-individual",
													value: individual.confirmPassword,
													onChange: (e) => setIndividual((p) => ({
														...p,
														confirmPassword: e.target.value
													})),
													autoComplete: "new-password",
													className: inputClass$2(!!individualErrors.confirmPassword)
												}), /* @__PURE__ */ jsx("button", {
													type: "button",
													className: "absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700",
													onClick: () => setShowIndividualConfirmPassword((s) => !s),
													children: showIndividualConfirmPassword ? "Hide" : "Show"
												})]
											}),
											/* @__PURE__ */ jsx(FieldError$1, { message: individualErrors.confirmPassword })
										]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", {
											htmlFor: "phoneNumber-individual",
											children: "Phone Number"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-gray-600 mt-1 mb-1.5 leading-snug",
											children: PHONE_NUMBER_HINT
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "basis-1/3",
												children: [/* @__PURE__ */ jsx("select", {
													value: individual.phone.countryIso2,
													onChange: (e) => setIndividual((p) => ({
														...p,
														phone: {
															...p.phone,
															countryIso2: e.target.value
														}
													})),
													className: inputClass$2(!!individualErrors["phone.countryIso2"]),
													children: COUNTRIES$1.map((c) => /* @__PURE__ */ jsxs("option", {
														value: c.iso2,
														children: [
															c.flag,
															" +",
															c.callingCode
														]
													}, c.iso2))
												}), /* @__PURE__ */ jsx(FieldError$1, { message: individualErrors["phone.countryIso2"] })]
											}), /* @__PURE__ */ jsxs("div", {
												className: "basis-2/3",
												children: [/* @__PURE__ */ jsx("input", {
													type: "tel",
													inputMode: "tel",
													id: "phoneNumber-individual",
													placeholder: "8012345678",
													autoComplete: "tel-national",
													value: individual.phone.nationalNumber,
													onChange: (e) => setIndividual((p) => ({
														...p,
														phone: {
															...p.phone,
															nationalNumber: e.target.value
														}
													})),
													className: inputClass$2(!!individualErrors["phone.nationalNumber"])
												}), /* @__PURE__ */ jsx(FieldError$1, { message: individualErrors["phone.nationalNumber"] })]
											})]
										})
									]
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "text-center my-5",
									children: [/* @__PURE__ */ jsxs("label", {
										className: "inline-flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: individual.termsAccepted,
											onChange: (e) => setIndividual((p) => ({
												...p,
												termsAccepted: e.target.checked
											})),
											className: `h-4 w-4 ${individualErrors.termsAccepted ? "accent-red-600" : ""}`
										}), /* @__PURE__ */ jsxs("span", { children: [
											"I agree with",
											" ",
											/* @__PURE__ */ jsx(Link, {
												to: "/",
												className: "text-ads360yellow-100",
												children: "terms and conditions"
											})
										] })]
									}), /* @__PURE__ */ jsx(FieldError$1, { message: individualErrors.termsAccepted })]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex justify-center my-5",
									children: /* @__PURE__ */ jsx(BlackButtons, {
										text: "Sign Up",
										handleClick: signUp,
										isPending
									})
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-center my-5",
									children: [
										"Already have an account?",
										" ",
										/* @__PURE__ */ jsxs(Link, {
											to: "/signin",
											className: "text-ads360yellow-100",
											children: [" ", "Sign In"]
										})
									]
								})
							]
						})
					})
				})]
			})
		]
	}) });
};
var Route$38 = createFileRoute("/_access/signup/")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (hasAccessToken()) throw redirect({ to: getDashboardPathForAccountType(getAccountType()) });
	},
	component: SignUp
});
//#endregion
//#region app/_access/signin/index.tsx
var girl = "/images/adsgirlblank.png";
var CloseAside = "/icons/closeAside.svg";
var schema = z.object({
	email: z.string().trim().min(1, "Email is required.").email("Enter a valid email."),
	password: z.string().trim().min(1, "Password is required.")
});
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("p", {
		className: "text-sm text-red-600 mt-1",
		children: message
	});
}
var baseInputClass = "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px] border";
function inputClass$1(hasError) {
	return `${baseInputClass} ${hasError ? "border-red-500" : "border-transparent"}`;
}
var SignIn = () => {
	const router = useRouter();
	const { mutate: login, isPending } = useLogin();
	const [form, setForm] = useState({
		email: "",
		password: ""
	});
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const submit = () => {
		setErrors({});
		const parsed = schema.safeParse(form);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path[0];
				if (!next[key]) next[key] = issue.message;
			}
			setErrors(next);
			return;
		}
		login(parsed.data, { onSuccess: (data) => {
			router.navigate({ to: getDashboardPathForAccountType(data.accountType) });
		} });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		submit();
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "bg-ads360light-100 h-screen",
		children: [/* @__PURE__ */ jsx("div", {
			className: "hidden md:w-1/2 bg-ads360black-100 md:flex justify-end pt-36 h-full fixed",
			children: /* @__PURE__ */ jsx("div", {
				className: "w-4/5",
				children: /* @__PURE__ */ jsx("img", {
					src: girl,
					alt: "..."
				})
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "flex justify-end",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full md:w-1/2 bg-ads360light-100",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						children: /* @__PURE__ */ jsx("img", {
							src: CloseAside,
							alt: "..."
						})
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "w-[80%] mx-auto",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "text-center mb-10",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "text-2xl lg:text-4xl mb-2",
								children: "Welcome Back"
							}), /* @__PURE__ */ jsx("h5", {
								className: "text-ads360yellow-100",
								children: "Lets get right to it! Log into your account"
							})]
						}),
						/* @__PURE__ */ jsxs("form", {
							onSubmit,
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", {
											htmlFor: "email",
											children: "Email"
										}),
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("input", {
											type: "email",
											id: "email",
											value: form.email,
											onChange: (e) => setForm((p) => ({
												...p,
												email: e.target.value
											})),
											className: inputClass$1(!!errors.email)
										}),
										/* @__PURE__ */ jsx(FieldError, { message: errors.email })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "my-3",
									children: [
										/* @__PURE__ */ jsx("label", {
											htmlFor: "password",
											children: "Password"
										}),
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsxs("div", {
											className: "relative",
											children: [/* @__PURE__ */ jsx("input", {
												type: showPassword ? "text" : "password",
												id: "password",
												value: form.password,
												onChange: (e) => setForm((p) => ({
													...p,
													password: e.target.value
												})),
												className: inputClass$1(!!errors.password),
												autoComplete: "current-password"
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												className: "absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-700",
												onClick: () => setShowPassword((s) => !s),
												children: showPassword ? "Hide" : "Show"
											})]
										}),
										/* @__PURE__ */ jsx(FieldError, { message: errors.password })
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex justify-between my-3",
									children: [/* @__PURE__ */ jsx("div", {}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, {
										to: "/",
										className: "text-ads360yellow-100",
										children: "Forget Password"
									}) })]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex justify-center my-3",
									children: /* @__PURE__ */ jsx(BlackButtons, {
										text: isPending ? "Signing in..." : "Sign In",
										handleClick: submit,
										isPending
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-center mt-3 mb-20",
							children: [
								"Dont have an account yet?",
								" ",
								/* @__PURE__ */ jsxs(Link, {
									to: "/signup",
									className: "text-ads360yellow-100",
									children: [" ", "Sign Up"]
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-center mt-3 mb-5",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/",
								children: "Term of use. Privacy policy"
							})
						})
					]
				})]
			})
		})]
	});
};
var Route$37 = createFileRoute("/_access/signin/")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (hasAccessToken()) throw redirect({ to: getDashboardPathForAccountType(getAccountType()) });
	},
	component: SignIn
});
//#endregion
//#region app/_access/email-verification/index.tsx
var EmailVerification = () => {
	const user = useRouterState({ select: (s) => s.location.state?.user });
	const [isResending, setIsResending] = useState(false);
	const email = user?.email ?? "your email";
	return /* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash",
		children: [/* @__PURE__ */ jsx("div", {
			className: "px-6 pt-10",
			children: /* @__PURE__ */ jsx(BlackLogo, {})
		}), /* @__PURE__ */ jsx("div", {
			className: "px-6 pb-16",
			children: /* @__PURE__ */ jsxs("div", {
				className: "max-w-xl mx-auto mt-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "bg-white/90 backdrop-blur rounded-2xl shadow-sm border border-black/5 p-6 md:p-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h1", {
									className: "text-2xl md:text-3xl font-semibold text-ads360black-100",
									children: "Verify your email"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-gray-600 mt-2 leading-relaxed",
									children: "We sent a verification link to:"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "inline-flex items-center mt-3 px-3 py-1.5 rounded-full bg-ads360black-100 text-ads360light-100 text-sm",
									children: email
								})
							] }), /* @__PURE__ */ jsx("div", {
								className: "shrink-0 hidden md:block",
								children: /* @__PURE__ */ jsx("div", {
									className: "h-12 w-12 rounded-2xl bg-ads360yellowBtn-100 flex items-center justify-center text-ads360black-100 font-bold",
									children: "@"
								})
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-6 space-y-3 text-gray-700",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "mt-0.5 h-6 w-6 rounded-full bg-ads360yellowBtn-100 text-ads360black-100 flex items-center justify-center text-sm font-semibold",
									children: "1"
								}), /* @__PURE__ */ jsx("p", {
									className: "leading-relaxed",
									children: "Open your inbox and click the verification link."
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "mt-0.5 h-6 w-6 rounded-full bg-ads360yellowBtn-100 text-ads360black-100 flex items-center justify-center text-sm font-semibold",
									children: "2"
								}), /* @__PURE__ */ jsx("p", {
									className: "leading-relaxed",
									children: "If you don’t see it, check your Spam/Junk folder."
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex flex-col items-center gap-3",
							children: [/* @__PURE__ */ jsx(BlackButtons, {
								handleClick: () => {
									setIsResending(true);
									setTimeout(() => setIsResending(false), 1200);
								},
								isPending: isResending,
								text: isResending ? "Sending..." : "Resend Link"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-sm text-gray-600",
								children: [
									"Wrong email?",
									" ",
									/* @__PURE__ */ jsx(Link, {
										to: "/signup",
										className: "text-ads360yellow-100",
										children: "Go back"
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ jsx("p", {
					className: "text-center text-xs text-gray-500 mt-6",
					children: "If you still can’t verify your account, contact support."
				})]
			})
		})]
	});
};
var Route$36 = createFileRoute("/_access/email-verification/")({ component: EmailVerification });
//#endregion
//#region node_modules/react-icons/gr/index.esm.js
function GrTooltip(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"strokeWidth": "2",
				"d": "M16.5,18 L12,22.5 L7.5,18 L1,18 L1,1 L23,1 L23,18 L16.5,18 Z M6,10 L7,10 L7,9 L6,9 L6,10 Z M11.5,10 L12.5,10 L12.5,9 L11.5,9 L11.5,10 Z M17,10 L18,10 L18,9 L17,9 L17,10 Z"
			}
		}]
	})(props);
}
//#endregion
//#region components/ui/Tooltip.tsx
var Tooltip = ({ info }) => {
	return /* @__PURE__ */ jsx("div", {
		className: "absolute w-[150px] rounded-10 p-1 top-0 left-0 bg-ads360-hash text-xs",
		children: info
	});
};
//#endregion
//#region app/vendors/billboards/wallet/index.tsx
var naira$3 = "/icons/naira.svg";
var filter$1 = "/icons/filter.svg";
var makepayment$1 = "/icons/makepayment.svg";
function money(n) {
	const v = Number(n ?? 0);
	if (!Number.isFinite(v)) return "0.00";
	return v.toFixed(2);
}
function dateOnly(s) {
	if (!s) return "-";
	return String(s).slice(0, 10);
}
var WalletSection$1 = () => {
	const me = useMe();
	const wallet = useWallet();
	const txns = useWalletTransactions(20);
	me.data?.accountType === "billboard_owner" ? me.data.businessName ?? `${me.data.firstName} ${me.data.lastName}`.trim() : me.data?.accountType === "business_user" ? me.data.businessName : me.data?.accountType === "regular_user" && `${me.data.firstName} ${me.data.lastName}`.trim();
	return /* @__PURE__ */ jsx("section", {
		className: "min-h-screen bg-ads360-hash px-4 md:px-10 py-14",
		children: /* @__PURE__ */ jsxs("div", {
			className: "container mx-auto",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-2xl",
					children: "My Wallet"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-stone-400",
					children: "View billing history and current balance here"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "md:flex my-10 justify-around bg-white p-5 shadow-md rounded-10 border border-ads360yellow-100",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "my-3 flex items-center space-x-1",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative group",
								children: [/* @__PURE__ */ jsx(GrTooltip, {}), /* @__PURE__ */ jsx("div", {
									className: "hidden group-hover:inline",
									children: /* @__PURE__ */ jsx(Tooltip, { info: "this is your incoming balance that you receive from bookings" })
								})]
							}), /* @__PURE__ */ jsx("p", { children: "Incoming Balance" })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex",
							children: [/* @__PURE__ */ jsx("img", {
								alt: "naira",
								src: naira$3,
								className: "w-14 h-14"
							}), /* @__PURE__ */ jsxs("div", {
								className: "px-3",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "text-2xl",
									children: [
										wallet.data?.currency,
										" ",
										money(wallet.data?.incomingBalance)
									]
								}), /* @__PURE__ */ jsx("h3", {
									className: "text-stone-400 text-sm",
									children: "Available Balance"
								})]
							})]
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "my-3 flex items-center space-x-1",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative group",
								children: [/* @__PURE__ */ jsx(GrTooltip, {}), /* @__PURE__ */ jsx("div", {
									className: "hidden group-hover:inline",
									children: /* @__PURE__ */ jsx(Tooltip, { info: "this is your outgoing balance that you request to widthdraw" })
								})]
							}), /* @__PURE__ */ jsx("p", { children: "Outgoing Balance" })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex",
							children: [/* @__PURE__ */ jsx("img", {
								alt: "naira",
								src: naira$3,
								className: "w-14 h-14"
							}), /* @__PURE__ */ jsxs("div", {
								className: "px-3",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "text-2xl",
									children: [
										wallet.data?.currency,
										" ",
										money(wallet.data?.outgoingBalance)
									]
								}), /* @__PURE__ */ jsx("h3", {
									className: "text-stone-400 text-sm",
									children: "Available Balance"
								})]
							})]
						})] })] }),
						/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "my-3 flex space-x-1 items-center",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative group",
								children: [/* @__PURE__ */ jsx(GrTooltip, {}), /* @__PURE__ */ jsx("div", {
									className: "hidden group-hover:inline",
									children: /* @__PURE__ */ jsx(Tooltip, { info: "this is your actual balance that you can widthdraw from" })
								})]
							}), /* @__PURE__ */ jsx("p", { children: "Actual Balance" })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex",
							children: [/* @__PURE__ */ jsx("img", {
								alt: "naira",
								src: naira$3,
								className: "w-14 h-14"
							}), /* @__PURE__ */ jsxs("div", {
								className: "px-3",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "text-2xl",
									children: [
										wallet.data?.currency,
										" ",
										money(wallet.data?.balance)
									]
								}), /* @__PURE__ */ jsx("h3", {
									className: "text-stone-400 text-sm",
									children: "Available Balance"
								})]
							})]
						})] }) }),
						/* @__PURE__ */ jsx("div", {
							className: "",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "/",
								className: "flex px-10 space-x-5 py-5 my-5 md:my-0 rounded border text-ads360light-100 bg-ads360black-100/95 hover:bg-ads360black-100",
								children: [/* @__PURE__ */ jsx("img", {
									alt: "make payment icon",
									src: makepayment$1,
									className: "w-5 h-5"
								}), /* @__PURE__ */ jsx("span", { children: "Widthdraw" })]
							})
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "group",
					children: /* @__PURE__ */ jsx("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ jsxs("button", {
							className: "flex space-x-2 bg-[#E4E4E4] p-1 rounded-full px-5",
							children: [/* @__PURE__ */ jsx("img", {
								src: filter$1,
								alt: "filter",
								className: "py-2",
								width: 20,
								height: 20
							}), /* @__PURE__ */ jsx("span", { children: "filter" })]
						})
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white p-4 shadow-md my-3 rounded-10 border border-ads360yellow-100",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-lg mb-2",
						children: "Transaction History"
					}), txns.isLoading ? /* @__PURE__ */ jsx("div", {
						className: "text-stone-500",
						children: "Loading..."
					}) : txns.isError ? /* @__PURE__ */ jsx("div", {
						className: "text-stone-500",
						children: "Unable to load transactions"
					}) : /* @__PURE__ */ jsx("ul", { children: (txns.data ?? []).length === 0 ? /* @__PURE__ */ jsx("li", {
						className: "text-stone-500 py-4",
						children: "No transactions yet"
					}) : (txns.data ?? []).map((t) => /* @__PURE__ */ jsxs("li", {
						className: "mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "font-bold",
							children: t.description || t.type
						}), /* @__PURE__ */ jsx("p", { children: dateOnly(t.createdAt) })] }), /* @__PURE__ */ jsxs("div", {
							className: t.amount >= 0 ? "text-green-600" : "text-red-600",
							children: [
								t.amount >= 0 ? "+" : "-",
								"₦",
								money(Math.abs(t.amount))
							]
						})]
					}, t.id)) })]
				})
			]
		})
	});
};
var Route$35 = createFileRoute("/vendors/billboards/wallet/")({ component: WalletSection$1 });
//#endregion
//#region app/vendors/billboards/settings/index.tsx
var avatar = "/icons/user.png";
var dash$3 = "/icons/dash.svg";
var EditBillboardComponent = () => {
	const [user, setUser] = useState({
		email: "cayomike@gmail.com",
		phoneNumber: "08140231279",
		firstName: "Charles",
		lastName: "Ayomike",
		occupation: "Web developer",
		residentialAddress: "Lagos state, Nigeria",
		password: ""
	});
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};
	const [editProfile, setEditProfile] = useState(true);
	const [view, setView] = useState("Edit");
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-14",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-2xl",
				children: "Settings"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-[#8B8B8B] mb-5 mt-3",
				children: "Edit or view profile settings"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "",
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full flex text-sm md:text-base md:justify-start space-x-3",
					children: [/* @__PURE__ */ jsxs("button", {
						className: "relative",
						onClick: () => setView("Edit"),
						children: ["Edit Profile", view === "Edit" && /* @__PURE__ */ jsx("img", {
							alt: "Billboard Overview selected",
							src: dash$3,
							className: "w-2/3 mx-auto absolute top-[20px] left-[17%]"
						})]
					}), /* @__PURE__ */ jsxs("button", {
						className: "relative",
						onClick: () => setView("password"),
						children: ["Change Password", view === "password" && /* @__PURE__ */ jsx("img", {
							alt: "Billboard Overview selected",
							src: dash$3,
							className: "w-2/5 mx-auto absolute top-[20px] left-[17%]"
						})]
					})]
				})
			})
		]
	}), /* @__PURE__ */ jsx("section", {
		className: "min-h-screen bg-ads360-hash px-4 md:px-10 py-14",
		children: view === "Edit" ? /* @__PURE__ */ jsxs("div", {
			className: "border border-ads360yellow-100 bg-white rounded-10 my-5 p-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mt-5 mb-7",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "my-5 font-bold px-5",
					children: "User Details"
				}), /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs("div", {
					className: "text-center",
					children: [/* @__PURE__ */ jsx("img", {
						alt: "",
						src: avatar,
						className: "w-20 h-20 mx-auto bg-[#f1f1f1] rounded-full"
					}), /* @__PURE__ */ jsx("input", {
						type: "file",
						className: "border border-[#c5c4c5] text-[#8B8B8B] my-3 w-9/12 md:w-[35%]"
					})]
				}) })]
			}), /* @__PURE__ */ jsxs("form", { children: [/* @__PURE__ */ jsxs("div", {
				className: "md:flex justify-evenly",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "md:w-[40%] px-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", { children: "Email:" }),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "email",
									name: "email",
									value: user.email,
									onChange: handleChange,
									required: true,
									className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full  p-2 rounded-10"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", { children: "Phone Number:" }),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "tel",
									name: "phoneNumber",
									value: user.phoneNumber,
									onChange: handleChange,
									required: true,
									className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", { children: "First Name:" }),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									name: "firstName",
									value: user.firstName,
									onChange: handleChange,
									required: true,
									className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", { children: "Last Name:" }),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									name: "lastName",
									value: user.lastName,
									onChange: handleChange,
									required: true,
									className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10"
								})
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:w-[40%] px-3",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", { children: "Company Name:" }),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									name: "occupation",
									value: user.occupation,
									onChange: handleChange,
									required: true,
									className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", { children: "Address:" }),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("textarea", {
									name: "residentialAddress",
									value: user.residentialAddress,
									onChange: handleChange,
									required: true,
									className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", { children: "Password:" }),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "password",
									name: "password",
									value: user.password,
									onChange: handleChange,
									required: true,
									className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10"
								})
							]
						})
					]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "text-center my-7",
				children: /* @__PURE__ */ jsx("button", {
					type: "submit",
					className: "group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 py-2 px-4",
					children: "Save"
				})
			})] })]
		}) : /* @__PURE__ */ jsx("div", {
			className: "border border-ads360yellow-100 bg-white rounded-10 my-5 p-2",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-full md:w-1/2",
				children: [
					/* @__PURE__ */ jsx("h2", {
						className: "my-5 font-bold",
						children: "Change Password"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [
							/* @__PURE__ */ jsx("label", { children: "Old Password:" }),
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("input", {
								type: "password",
								name: "password",
								value: user.password,
								onChange: handleChange,
								required: true,
								className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [
							/* @__PURE__ */ jsx("label", { children: "New Password:" }),
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("input", {
								type: "password",
								name: "password",
								value: user.password,
								onChange: handleChange,
								required: true,
								className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [
							/* @__PURE__ */ jsx("label", { children: "Confirm Password:" }),
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("input", {
								type: "password",
								name: "password",
								value: user.password,
								onChange: handleChange,
								required: true,
								className: "border border-[#c5c4c5] text-[#8B8B8B] focus:outline-none w-full p-2 rounded-10"
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-center my-7",
						children: /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 py-2 px-4",
							children: "Save"
						})
					})
				]
			})
		})
	})] });
};
var Route$34 = createFileRoute("/vendors/billboards/settings/")({ component: EditBillboardComponent });
//#endregion
//#region endpoint/billboard/billboard.ts
function billboardListQueryString(params) {
	const usp = new URLSearchParams();
	if (params.page != null) usp.set("page", String(params.page));
	if (params.limit != null) usp.set("limit", String(params.limit));
	if (params.boardType) usp.set("boardType", params.boardType);
	if (params.location?.trim()) usp.set("location", params.location.trim());
	if (params.minPrice != null) usp.set("minPrice", String(params.minPrice));
	if (params.maxPrice != null) usp.set("maxPrice", String(params.maxPrice));
	if (params.negotiable !== void 0) usp.set("negotiable", String(params.negotiable));
	const q = usp.toString();
	return q ? `?${q}` : "";
}
function getMyBillboardListings(params = {}) {
	return baseFetchJson(`/billboard/listings/mine${billboardListQueryString(params)}`, { method: "GET" });
}
function getBrowseBillboardListings(params = {}) {
	return baseFetchJson(`/billboard/listings${billboardListQueryString(params)}`, { method: "GET" });
}
function getBillboardListingById(id) {
	return baseFetchJson(`/billboard/listings/${id}`, { method: "GET" });
}
function getMyBillboardListingById(id) {
	return baseFetchJson(`/billboard/listings/mine/${id}`, { method: "GET" });
}
function createBillboardListing(payload, imageFile) {
	const form = new FormData();
	form.append("payload", JSON.stringify(payload));
	form.append("file", imageFile);
	return baseFetchJson("/billboard/listings", {
		method: "POST",
		body: form
	});
}
function createBillboardBooking(listingId, payload, imageFile) {
	const form = new FormData();
	form.append("payload", JSON.stringify(payload));
	if (imageFile) form.append("file", imageFile);
	return baseFetchJson(`/billboard/listings/${listingId}/bookings`, {
		method: "POST",
		body: form
	});
}
function getBillboardBookingById(id) {
	return baseFetchJson(`/billboard/bookings/${id}`, { method: "GET" });
}
function negotiateBillboardBooking(id, negotiatedAmount) {
	return baseFetchJson(`/billboard/bookings/${id}/negotiate`, {
		method: "POST",
		body: { negotiatedAmount }
	});
}
function getMyBillboardBookings(params = {}) {
	const usp = new URLSearchParams();
	if (params.status?.trim()) usp.set("status", params.status.trim());
	const q = usp.toString();
	return baseFetchJson(`/billboard/bookings${q ? `?${q}` : ""}`, { method: "GET" });
}
function getMyVendorBillboardBookings(params = {}) {
	const usp = new URLSearchParams();
	if (params.status?.trim()) usp.set("status", params.status.trim());
	const q = usp.toString();
	return baseFetchJson(`/billboard/vendor/bookings${q ? `?${q}` : ""}`, { method: "GET" });
}
function getVendorBillboardBookingById(id) {
	return baseFetchJson(`/billboard/vendor/bookings/${id}`, { method: "GET" });
}
function markVendorBookingActive(bookingId, proofImage) {
	const form = new FormData();
	form.append("file", proofImage);
	return baseFetchJson(`/billboard/vendor/bookings/${bookingId}/active`, {
		method: "POST",
		body: form
	});
}
function completeBillboardBooking(bookingId) {
	return baseFetchJson(`/billboard/bookings/${bookingId}/complete`, { method: "POST" });
}
function rejectVendorBillboardBooking(bookingId, body) {
	return baseFetchJson(`/billboard/vendor/bookings/${bookingId}/reject`, {
		method: "POST",
		body: body?.reason != null && body.reason.trim() !== "" ? { reason: body.reason.trim() } : {}
	});
}
//#endregion
//#region endpoint/billboard/useBillboard.ts
function errorMessage$1(error) {
	if (error instanceof ApiError) return error.message;
	if (error instanceof Error) return error.message;
	return "Something went wrong. Please try again.";
}
function useMyBillboardListings(params = {}) {
	return useQuery({
		queryKey: [
			"billboard",
			"listings",
			"mine",
			params
		],
		queryFn: () => getMyBillboardListings(params)
	});
}
function useBrowseBillboardListings(params = {}) {
	return useQuery({
		queryKey: [
			"billboard",
			"listings",
			"browse",
			params
		],
		queryFn: () => getBrowseBillboardListings(params)
	});
}
function useBillboardListing(id) {
	return useQuery({
		queryKey: [
			"billboard",
			"listing",
			id
		],
		queryFn: () => getBillboardListingById(id),
		enabled: typeof id === "number" && id > 0
	});
}
function useMyBillboardListing(id) {
	return useQuery({
		queryKey: [
			"billboard",
			"listing",
			"mine",
			id
		],
		queryFn: () => getMyBillboardListingById(id),
		enabled: typeof id === "number" && id > 0
	});
}
function useCreateBillboardListing() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ payload, imageFile }) => createBillboardListing(payload, imageFile),
		onSuccess: async (data) => {
			toast.success(data?.message ?? "Billboard listing created.");
			await qc.invalidateQueries({ queryKey: ["billboard", "listings"] });
		},
		onError: (error) => {
			toast.error(errorMessage$1(error));
		}
	});
}
function useCreateBillboardBooking() {
	return useMutation({
		mutationFn: ({ listingId, payload, imageFile }) => createBillboardBooking(listingId, payload, imageFile),
		onError: (error) => {
			toast.error(errorMessage$1(error));
		}
	});
}
function useBillboardBooking(id) {
	return useQuery({
		queryKey: [
			"billboard",
			"booking",
			id
		],
		queryFn: () => getBillboardBookingById(id),
		enabled: typeof id === "number" && id > 0
	});
}
function useNegotiateBillboardBooking() {
	return useMutation({
		mutationFn: (vars) => negotiateBillboardBooking(vars.id, vars.negotiatedAmount),
		onError: (error) => {
			toast.error(errorMessage$1(error));
		}
	});
}
function useMyBillboardBookings(params = {}) {
	return useQuery({
		queryKey: [
			"billboard",
			"bookings",
			"mine",
			params
		],
		queryFn: () => getMyBillboardBookings(params)
	});
}
function useMyNegotiatingBillboardBookings() {
	return useMyBillboardBookings({ status: "negotiating" });
}
function useMyPaidBillboardBookings() {
	return useMyBillboardBookings({ status: "paid" });
}
function useMyVendorBillboardBookings(params = {}) {
	return useQuery({
		queryKey: [
			"billboard",
			"bookings",
			"vendor",
			params
		],
		queryFn: () => getMyVendorBillboardBookings(params)
	});
}
function useMyVendorNegotiatingBillboardBookings() {
	return useMyVendorBillboardBookings({ status: "negotiating" });
}
function useVendorBillboardBooking(id) {
	return useQuery({
		queryKey: [
			"billboard",
			"booking",
			"vendor",
			id
		],
		queryFn: () => getVendorBillboardBookingById(id),
		enabled: typeof id === "number" && id > 0
	});
}
function useMarkVendorBookingActive() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => markVendorBookingActive(vars.bookingId, vars.proofImage),
		onSuccess: async () => {
			toast.success("Campaign accepted and marked active");
			await qc.invalidateQueries({ queryKey: ["billboard", "bookings"] });
			await qc.invalidateQueries({ queryKey: ["billboard", "booking"] });
		},
		onError: (error) => {
			toast.error(errorMessage$1(error));
		}
	});
}
function useCompleteBillboardBooking() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (bookingId) => completeBillboardBooking(bookingId),
		onSuccess: async () => {
			toast.success("Campaign completed");
			await qc.invalidateQueries({ queryKey: ["billboard", "bookings"] });
			await qc.invalidateQueries({ queryKey: ["billboard", "booking"] });
		},
		onError: (error) => {
			toast.error(errorMessage$1(error));
		}
	});
}
function useRejectVendorBillboardBooking() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (vars) => rejectVendorBillboardBooking(vars.bookingId, { reason: vars.reason }),
		onSuccess: async () => {
			toast.success("Campaign rejected; refund processed where applicable");
			await qc.invalidateQueries({ queryKey: ["billboard", "bookings"] });
			await qc.invalidateQueries({ queryKey: ["billboard", "booking"] });
		},
		onError: (error) => {
			toast.error(errorMessage$1(error));
		}
	});
}
//#endregion
//#region components/ui/BookingsTable.tsx
function formatDate(v) {
	if (!v) return "-";
	const d = typeof v === "string" ? new Date(v) : v;
	if (!Number.isFinite(d.getTime())) return String(v).slice(0, 10);
	return d.toISOString().slice(0, 10);
}
function formatNaira$1(v) {
	if (v == null) return "-";
	const n = typeof v === "string" ? Number(v) : v;
	if (!Number.isFinite(n)) return String(v);
	return `₦${n.toLocaleString()}`;
}
function StatusPill({ status }) {
	const s = status.trim().toLowerCase();
	const styles = s === "completed" ? "bg-green-100 text-green-700 border-green-200" : s === "active" ? "bg-blue-100 text-blue-700 border-blue-200" : s === "rejected" ? "bg-red-100 text-red-700 border-red-200" : s === "pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : s === "negotiating" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-stone-100 text-stone-700 border-stone-200";
	const label = s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`,
		children: label
	});
}
function PaymentPill({ paymentStatus }) {
	const s = paymentStatus.trim().toLowerCase();
	const styles = s === "paid" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : s === "refunded" ? "bg-violet-100 text-violet-800 border-violet-200" : s === "unpaid" ? "bg-amber-100 text-amber-900 border-amber-200" : "bg-stone-100 text-stone-700 border-stone-200";
	const label = s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`,
		children: label
	});
}
function Pagination({ page, pageCount, onChange }) {
	if (pageCount <= 1) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-end gap-2 mt-4",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				disabled: !(page > 1),
				onClick: () => onChange(page - 1),
				className: "rounded-10 border border-stone-200 bg-white px-3 py-2 text-sm disabled:opacity-50",
				children: "Previous"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "text-sm text-stone-600",
				children: [
					"Page ",
					page,
					" of ",
					pageCount
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				disabled: !(page < pageCount),
				onClick: () => onChange(page + 1),
				className: "rounded-10 border border-stone-200 bg-white px-3 py-2 text-sm disabled:opacity-50",
				children: "Next"
			})
		]
	});
}
function BookingsTable({ rows, isLoading, isError, emptyText = "No records found", statusOptions, statusFilterLabel = "Filter by status", defaultStatus = "all", pageSize = 10, showPaymentStatus = true }) {
	const [status, setStatus] = useState(defaultStatus);
	const [page, setPage] = useState(1);
	const colSpan = showPaymentStatus ? 7 : 6;
	const filtered = useMemo(() => {
		const raw = rows ?? [];
		const st = status.trim();
		if (st === "abandoned") {
			const fourDaysMs = 5760 * 60 * 1e3;
			return raw.filter((r) => {
				if (String(r.status ?? "").toLowerCase() !== "pending") return false;
				const t = new Date(String(r.createdAt ?? "")).getTime();
				if (!Number.isFinite(t)) return false;
				return Date.now() - t >= fourDaysMs;
			});
		}
		if (!st || st === "all") return raw;
		return raw.filter((r) => String(r.status ?? "").toLowerCase() === st);
	}, [rows, status]);
	const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
	const safePage = Math.min(page, pageCount);
	const start = (safePage - 1) * pageSize;
	const paged = filtered.slice(start, start + pageSize);
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-end gap-2",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-sm text-stone-600",
				children: statusFilterLabel
			}), /* @__PURE__ */ jsx("select", {
				value: status,
				onChange: (e) => {
					setStatus(e.target.value);
					setPage(1);
				},
				className: "rounded-10 border border-ads360yellow-100 bg-white px-3 py-2 text-sm",
				children: (statusOptions ?? [
					{
						value: "all",
						label: "All"
					},
					{
						value: "pending",
						label: "Pending"
					},
					{
						value: "active",
						label: "Active"
					},
					{
						value: "rejected",
						label: "Rejected"
					},
					{
						value: "completed",
						label: "Completed"
					}
				]).map((o) => /* @__PURE__ */ jsx("option", {
					value: o.value,
					children: o.label
				}, o.value))
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "w-full overflow-x-auto mt-4 rounded-10 border border-[#D0B301]/30 bg-white",
			children: /* @__PURE__ */ jsxs("table", {
				className: "min-w-full",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "bg-[#D0B301]/15",
					children: /* @__PURE__ */ jsxs("tr", {
						className: "text-left text-xs font-semibold text-stone-700",
						children: [
							/* @__PURE__ */ jsx("th", {
								className: "py-4 px-4 border-b border-[#D0B301]/25",
								children: "ID"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-4 px-4 border-b border-[#D0B301]/25",
								children: "LISTING"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-4 px-4 border-b border-[#D0B301]/25",
								children: "DATE CREATED"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-4 px-4 border-b border-[#D0B301]/25",
								children: "AMOUNT"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "py-4 px-4 border-b border-[#D0B301]/25",
								children: "STATUS"
							}),
							showPaymentStatus ? /* @__PURE__ */ jsx("th", {
								className: "py-4 px-4 border-b border-[#D0B301]/25",
								children: "PAYMENT"
							}) : null,
							/* @__PURE__ */ jsx("th", {
								className: "py-4 px-4 border-b border-[#D0B301]/25",
								children: "ACTION"
							})
						]
					})
				}), /* @__PURE__ */ jsx("tbody", {
					className: "text-sm",
					children: isLoading ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan,
						className: "py-10 px-4 text-center text-stone-500",
						children: "Loading..."
					}) }) : isError ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan,
						className: "py-10 px-4 text-center text-stone-500",
						children: "Unable to load records"
					}) }) : paged.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
						colSpan,
						className: "py-10 px-4 text-center text-stone-500",
						children: emptyText
					}) }) : paged.map((r) => /* @__PURE__ */ jsxs("tr", {
						className: "border-b last:border-b-0",
						children: [
							/* @__PURE__ */ jsxs("td", {
								className: "py-5 px-4 text-stone-800",
								children: ["NG#", r.id]
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-5 px-4 text-stone-800",
								children: r.listing ?? "-"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-5 px-4 text-stone-700",
								children: formatDate(r.createdAt)
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-5 px-4 text-stone-800",
								children: formatNaira$1(r.amount)
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-5 px-4",
								children: /* @__PURE__ */ jsx(StatusPill, { status: String(r.status ?? "unknown") })
							}),
							showPaymentStatus ? /* @__PURE__ */ jsx("td", {
								className: "py-5 px-4",
								children: /* @__PURE__ */ jsx(PaymentPill, { paymentStatus: String(r.paymentStatus ?? "unpaid") })
							}) : null,
							/* @__PURE__ */ jsx("td", {
								className: "py-5 px-4",
								children: /* @__PURE__ */ jsx(Link, {
									to: r.actionHref,
									className: "inline-flex items-center rounded-10 border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50",
									children: r.actionLabel ?? "View"
								})
							})
						]
					}, String(r.id)))
				})]
			})
		}),
		/* @__PURE__ */ jsx(Pagination, {
			page: safePage,
			pageCount,
			onChange: (n) => setPage(n)
		})
	] });
}
//#endregion
//#region app/vendors/billboards/requests/index.tsx
var search$1 = "/icons/search.svg";
function isAbandoned(createdAt) {
	if (!createdAt) return false;
	const t = new Date(createdAt).getTime();
	if (!Number.isFinite(t)) return false;
	return Date.now() - t >= 5760 * 60 * 1e3;
}
var Requests = () => {
	const [q, setQ] = useState("");
	const [filter, setFilter] = useState("all");
	const list = useMyVendorBillboardBookings();
	const rows = useMemo(() => {
		const notNegotiating = (list.data ?? []).filter((r) => r.status !== "negotiating");
		const filtered = filter === "all" ? notNegotiating : filter === "abandoned" ? notNegotiating.filter((r) => r.status === "pending" && isAbandoned(r.createdAt)) : notNegotiating.filter((r) => r.status === filter);
		const s = q.trim().toLowerCase();
		if (!s) return filtered;
		return filtered.filter((r) => {
			return `${r.id} ${r.listingName ?? ""} ${r.status ?? ""} ${r.paymentStatus ?? ""}`.toLowerCase().includes(s);
		});
	}, [
		list.data,
		q,
		filter
	]);
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", {
		className: "bg-ads360-hash min-h-screen px-4 md:px-10 py-14",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col md:flex-row gap-3 md:items-center md:justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex lg:w-1/4 md:w-2/5 bg-[#f7f8f8] space-x-2 rounded-[40px] px-5 h-10",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					children: /* @__PURE__ */ jsx("img", {
						src: search$1,
						alt: "searchicon"
					})
				}), /* @__PURE__ */ jsx("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					className: "rounded-10 w-full bg-transparent focus:outline-none h-full",
					placeholder: "search..."
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex gap-2 items-center justify-end",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-sm text-stone-600",
					children: "Filter:"
				}), /* @__PURE__ */ jsxs("select", {
					value: filter,
					onChange: (e) => setFilter(e.target.value),
					className: "bg-white text-black border border-ads360yellow-100 px-3 py-2 rounded-10",
					children: [
						/* @__PURE__ */ jsx("option", {
							value: "all",
							children: "All (excluding negotiating)"
						}),
						/* @__PURE__ */ jsx("option", {
							value: "abandoned",
							children: "Abandoned (unpaid 4+ days)"
						}),
						/* @__PURE__ */ jsx("option", {
							value: "pending",
							children: "Pending"
						}),
						/* @__PURE__ */ jsx("option", {
							value: "active",
							children: "Active"
						}),
						/* @__PURE__ */ jsx("option", {
							value: "rejected",
							children: "Rejected"
						}),
						/* @__PURE__ */ jsx("option", {
							value: "completed",
							children: "Completed"
						})
					]
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "w-full my-5",
			children: /* @__PURE__ */ jsx(BookingsTable, {
				rows: rows.map((r) => ({
					id: r.id,
					listing: r.listingName ?? "-",
					createdAt: r.createdAt,
					amount: r.negotiatedAmount ?? r.quotedTotal,
					status: r.status,
					paymentStatus: r.paymentStatus ?? "unpaid",
					actionHref: `/vendors/billboards/requests/${r.id}`,
					actionLabel: "View"
				})),
				isLoading: list.isLoading,
				isError: list.isError,
				emptyText: "No requests found",
				statusOptions: [
					{
						value: "all",
						label: "All (excluding negotiating)"
					},
					{
						value: "abandoned",
						label: "Abandoned (unpaid 4+ days)"
					},
					{
						value: "pending",
						label: "Pending"
					},
					{
						value: "active",
						label: "Active"
					},
					{
						value: "rejected",
						label: "Rejected"
					},
					{
						value: "completed",
						label: "Completed"
					}
				],
				pageSize: 10
			})
		})]
	}) });
};
var Route$33 = createFileRoute("/vendors/billboards/requests/")({ component: Requests });
//#endregion
//#region app/vendors/billboards/negotiations/index.tsx
var search = "/icons/search.svg";
function VendorNegotiationsPage() {
	const [q, setQ] = useState("");
	const negotiating = useMyVendorNegotiatingBillboardBookings();
	const rows = useMemo(() => {
		const raw = negotiating.data ?? [];
		const s = q.trim().toLowerCase();
		if (!s) return raw;
		return raw.filter((r) => {
			return `${r.id} ${r.listingName ?? ""} ${r.bookerName ?? ""} ${r.status ?? ""}`.toLowerCase().includes(s);
		});
	}, [negotiating.data, q]);
	return /* @__PURE__ */ jsxs("section", {
		className: "bg-ads360-hash min-h-screen px-4 md:px-10 py-14",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "text-2xl",
					children: "Negotiations"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-stone-400",
					children: "Bookings currently under negotiation"
				})] })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex lg:w-1/4 md:w-2/5 bg-[#f7f8f8] space-x-2 rounded-[40px] px-5 h-10 mt-6",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					children: /* @__PURE__ */ jsx("img", {
						src: search,
						alt: "searchicon"
					})
				}), /* @__PURE__ */ jsx("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					className: "rounded-10 w-full bg-transparent focus:outline-none h-full",
					placeholder: "search..."
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "w-full overflow-x-auto my-5",
				children: /* @__PURE__ */ jsx(BookingsTable, {
					showPaymentStatus: false,
					rows: rows.map((r) => ({
						id: r.id,
						listing: r.listingName ?? "-",
						createdAt: r.createdAt,
						amount: r.negotiatedAmount ?? r.quotedTotal,
						status: "negotiating",
						actionHref: `/vendors/billboards/negotiations/${r.id}`,
						actionLabel: "View"
					})),
					isLoading: negotiating.isLoading,
					isError: negotiating.isError,
					emptyText: "No negotiations found",
					statusOptions: [{
						value: "all",
						label: "All"
					}, {
						value: "negotiating",
						label: "Negotiating"
					}],
					defaultStatus: "negotiating",
					pageSize: 10
				})
			})
		]
	});
}
var Route$32 = createFileRoute("/vendors/billboards/negotiations/")({ component: VendorNegotiationsPage });
//#endregion
//#region components/ui/BillboardSorter.tsx
var cancel$6 = "/icons/usericon/modalCancelBotton.svg";
var BillboardSorter = ({ toggleModal, modal, value, onChange, onApply }) => {
	const set = (key, v) => onChange({
		...value,
		[key]: v
	});
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ jsx("p", { children: "Filter billboard" }), modal ? /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: toggleModal,
				children: /* @__PURE__ */ jsx("img", {
					src: cancel$6,
					alt: "",
					className: "w-5"
				})
			}) : null]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "my-2",
			children: [/* @__PURE__ */ jsx("p", { children: "Billboard type" }), /* @__PURE__ */ jsxs("select", {
				value: value.boardType,
				onChange: (e) => set("boardType", e.target.value),
				className: "p-2 border focus:outline-none rounded w-full",
				children: [
					/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Any"
					}),
					/* @__PURE__ */ jsx("option", {
						value: "digital",
						children: "Digital"
					}),
					/* @__PURE__ */ jsx("option", {
						value: "led",
						children: "LED"
					}),
					/* @__PURE__ */ jsx("option", {
						value: "unipole",
						children: "Unipole"
					}),
					/* @__PURE__ */ jsx("option", {
						value: "billboard_bridge",
						children: "Billboard bridge"
					})
				]
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "my-2",
			children: [/* @__PURE__ */ jsx("p", { children: "Price range (effective daily rate)" }), /* @__PURE__ */ jsxs("div", {
				className: "flex justify-between space-x-1",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "basis-1/2",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "price-from",
						children: "From"
					}), /* @__PURE__ */ jsx("input", {
						id: "price-from",
						type: "number",
						min: 0,
						value: value.minPrice,
						onChange: (e) => set("minPrice", e.target.value),
						className: "rounded w-full border focus:outline-none p-2",
						placeholder: "₦"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "basis-1/2",
					children: [/* @__PURE__ */ jsx("label", {
						htmlFor: "price-to",
						children: "To"
					}), /* @__PURE__ */ jsx("input", {
						id: "price-to",
						type: "number",
						min: 0,
						value: value.maxPrice,
						onChange: (e) => set("maxPrice", e.target.value),
						className: "rounded w-full border focus:outline-none p-2",
						placeholder: "₦"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "my-2",
			children: [/* @__PURE__ */ jsx("p", { children: "Location" }), /* @__PURE__ */ jsx("input", {
				type: "text",
				value: value.location,
				onChange: (e) => set("location", e.target.value),
				placeholder: "City, area, or address",
				className: "border focus:outline-none rounded w-full p-2"
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "my-2",
			children: [/* @__PURE__ */ jsx("p", { children: "Negotiable" }), /* @__PURE__ */ jsxs("select", {
				value: value.negotiable,
				onChange: (e) => set("negotiable", e.target.value),
				className: "p-2 border focus:outline-none rounded w-full",
				children: [
					/* @__PURE__ */ jsx("option", {
						value: "all",
						children: "Any"
					}),
					/* @__PURE__ */ jsx("option", {
						value: "yes",
						children: "Negotiable"
					}),
					/* @__PURE__ */ jsx("option", {
						value: "no",
						children: "Non-negotiable"
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: onApply,
			className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5 text-white w-2/6 h-10",
			children: "Search"
		})
	] });
};
//#endregion
//#region lib/billboardDisplay.ts
var BOARD_LABEL = {
	digital: "Digital",
	led: "LED",
	unipole: "Unipole",
	billboard_bridge: "Billboard bridge"
};
function formatNaira(n) {
	return new Intl.NumberFormat("en-NG").format(n);
}
function primaryPrice(pricing) {
	if (pricing.daily != null && pricing.daily > 0) return formatNaira(pricing.daily);
	if (pricing.weekly != null && pricing.weekly > 0) return `${formatNaira(pricing.weekly)}/wk`;
	if (pricing.monthly != null && pricing.monthly > 0) return `${formatNaira(pricing.monthly)}/mo`;
	return "—";
}
function formatRuntime(b) {
	const days = b.activeDays?.length ?? 0;
	const dayLabel = days === 0 ? "—" : days === 7 ? "7 days/week" : `${days} days/week`;
	return `${b.startTime}–${b.endTime} · ${dayLabel}`;
}
function boardTypeLabel(slug) {
	return BOARD_LABEL[slug] ?? slug.replace(/_/g, " ");
}
var DAY_BIT_LABELS = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
/** Active day bits 0–6 (Sun–Sat), same as add-billboard form. */
function formatActiveDaysSummary(days) {
	if (!days?.length) return "—";
	return [...days].sort((a, b) => a - b).map((d) => DAY_BIT_LABELS[d] ?? String(d)).join(", ");
}
function formatListingDate(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "—";
	return d.toLocaleDateString("en-NG", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function googleMapsSearchUrl(lat, lng) {
	return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
//#endregion
//#region lib/billboardFilters.ts
function toBillboardListQuery(draft, page, limit) {
	const minRaw = draft.minPrice.trim();
	const maxRaw = draft.maxPrice.trim();
	const minPrice = minRaw ? Number(minRaw) : void 0;
	const maxPrice = maxRaw ? Number(maxRaw) : void 0;
	return {
		page,
		limit,
		boardType: draft.boardType || void 0,
		location: draft.location.trim() || void 0,
		minPrice: minPrice !== void 0 && !Number.isNaN(minPrice) ? minPrice : void 0,
		maxPrice: maxPrice !== void 0 && !Number.isNaN(maxPrice) ? maxPrice : void 0,
		negotiable: draft.negotiable === "all" ? void 0 : draft.negotiable === "yes"
	};
}
var defaultBillboardFilterForm = () => ({
	boardType: "",
	minPrice: "",
	maxPrice: "",
	location: "",
	negotiable: "all"
});
//#endregion
//#region app/vendors/billboards/listing/index.tsx
var naira$2 = "/icons/naira.svg";
var location$1 = "/icons/yellowlocation.svg";
var PAGE_SIZE$1 = 12;
function Billboards$1() {
	const [draft, setDraft] = useState(defaultBillboardFilterForm);
	const [query, setQuery] = useState({
		page: 1,
		limit: PAGE_SIZE$1
	});
	const { data, isPending, isError, error, refetch } = useMyBillboardListings(query);
	const listings = data?.data ?? [];
	const meta = data?.meta;
	const [filter, setFilter] = useState(false);
	const applyFilters = useCallback(() => {
		setQuery(toBillboardListQuery(draft, 1, PAGE_SIZE$1));
		setFilter(false);
	}, [draft]);
	const goPage = (next) => {
		if (!meta) return;
		if (next < 1 || next > meta.totalPages) return;
		setQuery((q) => ({
			...q,
			page: next
		}));
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "bg-ads360-hash min-h-screen px-4 md:px-10 py-14",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
			className: "text-2xl",
			children: "Billboard listing"
		}), /* @__PURE__ */ jsx("p", { children: "Check here for all your billboards" })] }), /* @__PURE__ */ jsxs("section", {
			className: "xl:flex my-5",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "gap-4 md:pr-4 grid grid-cols-1 md:grid-cols-2 basis-4/5",
					children: [
						isPending ? /* @__PURE__ */ jsx("p", {
							className: "text-neutral-600 col-span-full",
							children: "Loading your billboards…"
						}) : null,
						isError ? /* @__PURE__ */ jsxs("div", {
							className: "col-span-full rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800",
							children: [/* @__PURE__ */ jsx("p", { children: error instanceof Error ? error.message : "Could not load billboards." }), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => refetch(),
								className: "mt-2 underline",
								children: "Try again"
							})]
						}) : null,
						!isPending && !isError && listings.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-neutral-600 col-span-full",
							children: "No billboards match your filters yet."
						}) : null,
						listings.map((billboard) => /* @__PURE__ */ jsxs("div", {
							className: "rounded bg-white border border-ads360yellow-100",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [
										billboard.isNegotiable ? /* @__PURE__ */ jsx("div", {
											className: "absolute w-1/2 md:w-2/3 xl:w-1/2 bg-ads360black-100/70 text-ads360light-100 rounded right-3 top-4 text-center py-2",
											children: "Negotiable"
										}) : null,
										/* @__PURE__ */ jsx("img", {
											alt: billboard.name,
											src: billboard.imageUrl,
											className: "w-full rounded-t h-auto object-cover max-h-80"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex text-ads360yellow-100 font-bold w-full text-sm md:text-base p-2",
											children: [/* @__PURE__ */ jsx("img", {
												src: location$1,
												alt: ""
											}), billboard.name.toLocaleUpperCase()]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 md:grid-cols-2 my-3 w-11/12 mx-auto",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "my-1",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "font-bold",
													children: "location: "
												}),
												billboard.address,
												", ",
												billboard.city,
												", ",
												billboard.state
											]
										}),
										billboard.durationPerDisplay != null ? /* @__PURE__ */ jsx("div", {
											className: "my-1",
											children: /* @__PURE__ */ jsxs("p", { children: [
												/* @__PURE__ */ jsx("span", {
													className: "font-bold",
													children: "Display: "
												}),
												billboard.durationPerDisplay,
												"s per rotation"
											] })
										}) : null,
										/* @__PURE__ */ jsx("div", {
											className: "my-1",
											children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold",
												children: "Board-type: "
											}), boardTypeLabel(billboard.boardType)] })
										}),
										/* @__PURE__ */ jsx("div", {
											className: "my-1",
											children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold",
												children: "Run-time: "
											}), formatRuntime(billboard)] })
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mb-5 flex justify-between mx-auto w-11/12",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center",
										children: [
											/* @__PURE__ */ jsx("img", {
												src: naira$2,
												alt: "naira sign"
											}),
											"From ₦",
											primaryPrice(billboard.pricing)
										]
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										className: "group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12",
										children: /* @__PURE__ */ jsx(Link, {
											to: "/vendors/billboards/listing/$slug",
											params: { slug: String(billboard.id) },
											children: "View Details"
										})
									})]
								})
							]
						}, billboard.id)),
						meta && meta.totalPages > 1 ? /* @__PURE__ */ jsxs("div", {
							className: "col-span-full flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-neutral-600",
								children: [
									"Page ",
									meta.page,
									" of ",
									meta.totalPages,
									" (",
									meta.total,
									" total)"
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									disabled: meta.page <= 1 || isPending,
									onClick: () => goPage(meta.page - 1),
									className: "rounded border border-ads360yellow-100 bg-white px-3 py-1.5 text-sm disabled:opacity-40",
									children: "Previous"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									disabled: meta.page >= meta.totalPages || isPending,
									onClick: () => goPage(meta.page + 1),
									className: "rounded border border-ads360yellow-100 bg-white px-3 py-1.5 text-sm disabled:opacity-40",
									children: "Next"
								})]
							})]
						}) : null
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "basis-1/5 text-sm hidden xl:block",
					children: /* @__PURE__ */ jsx("div", {
						className: "top-[12.5rem] sticky rounded border p-3 border-ads360yellow-100 bg-white ",
						children: /* @__PURE__ */ jsx(BillboardSorter, {
							modal: false,
							toggleModal: () => {},
							value: draft,
							onChange: setDraft,
							onApply: applyFilters
						})
					})
				}),
				filter === false ? /* @__PURE__ */ jsx("div", {
					className: "fixed w-full left-3 bottom-5 xl:hidden",
					children: /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "rounded-10 font-bold border bg-ads360yellow-100 shadow-md border-white w-12 h-12",
						onClick: () => setFilter(true),
						children: "Filter"
					})
				}) : null
			]
		})]
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen: filter,
		children: /* @__PURE__ */ jsx("div", {
			className: "bg-white p-3 w-10/12 md:w-9/12 mx-auto rounded-10",
			children: /* @__PURE__ */ jsx(BillboardSorter, {
				modal: true,
				toggleModal: () => setFilter(false),
				value: draft,
				onChange: setDraft,
				onApply: applyFilters
			})
		})
	})] });
}
var Route$31 = createFileRoute("/vendors/billboards/listing/")({ component: Billboards$1 });
//#endregion
//#region components/inputs/FilesInput.tsx
var FilesInput = ({ handleChange, warning, accept, previewName }) => {
	const input = useRef(null);
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "bg-white flex items-center pl-3 justify-between rounded-10 my-1 w-full ...",
			children: [/* @__PURE__ */ jsx("div", { children: previewName !== void 0 && previewName.length > 10 ? previewName.slice(0, 9) + "..." + previewName.slice(-3) : previewName }), /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "p-2 rounded-r-10 bg-ads360gray-100",
				onClick: () => input.current?.click(),
				children: "browse"
			})]
		}),
		/* @__PURE__ */ jsx("input", {
			type: "file",
			hidden: true,
			onChange: (e) => handleChange(e, accept),
			ref: input,
			accept: `${accept}/*`
		}),
		/* @__PURE__ */ jsx("p", {
			className: "text-red-500 mb-1",
			children: warning
		})
	] });
};
//#endregion
//#region app/vendors/billboards/add-billboard/index.tsx
/** Matches intended API / listing schema */
var BOARD_TYPES = [
	{
		value: "digital",
		label: "Digital"
	},
	{
		value: "led",
		label: "LED"
	},
	{
		value: "unipole",
		label: "Unipole"
	},
	{
		value: "billboard_bridge",
		label: "Billboard bridge"
	}
];
var AUDIENCE_TYPES = [
	{
		value: "commuters",
		label: "Commuters"
	},
	{
		value: "high_income_area",
		label: "High-income area"
	},
	{
		value: "business_district",
		label: "Business district"
	}
];
var ILLUMINATION = [{
	value: "lit",
	label: "Lit"
}, {
	value: "unlit",
	label: "Unlit"
}];
var FACING_DIRECTION = [{
	value: "inbound_traffic",
	label: "Inbound traffic"
}, {
	value: "outbound_traffic",
	label: "Outbound traffic"
}];
var WEEKDAYS = [
	{
		bit: 0,
		label: "Sun"
	},
	{
		bit: 1,
		label: "Mon"
	},
	{
		bit: 2,
		label: "Tue"
	},
	{
		bit: 3,
		label: "Wed"
	},
	{
		bit: 4,
		label: "Thu"
	},
	{
		bit: 5,
		label: "Fri"
	},
	{
		bit: 6,
		label: "Sat"
	}
];
var inputClass = "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]";
var initialForm = {
	name: "",
	priceDaily: "",
	priceWeekly: "",
	priceMonthly: "",
	address: "",
	city: "",
	state: "",
	latitude: "",
	longitude: "",
	boardType: "",
	orientation: "",
	isNegotiable: false,
	trafficDescription: "",
	durationPerDisplay: "",
	width: "",
	height: "",
	pixelWidth: "",
	pixelHeight: "",
	startTime: "06:00",
	endTime: "21:00",
	activeDays: [
		1,
		2,
		3,
		4,
		5,
		6
	],
	isAvailable: true,
	audienceTypes: [],
	nearbyLandmarks: "",
	illumination: "",
	facingDirection: ""
};
function toggleDay(days, bit) {
	if (days.includes(bit)) return days.filter((d) => d !== bit);
	return [...days, bit].sort((a, b) => a - b);
}
function toggleAudience(list, value) {
	if (list.includes(value)) return list.filter((v) => v !== value);
	return [...list, value];
}
function optionalNumber(s) {
	if (!s.trim()) return void 0;
	const n = Number(s);
	return Number.isNaN(n) ? void 0 : n;
}
function optionalPositiveInt(s) {
	if (s.trim() === "") return void 0;
	const n = Number(s);
	if (Number.isNaN(n)) return void 0;
	return Math.round(n);
}
function buildListingPayload(form) {
	const pd = parseFloat(form.priceDaily);
	const pw = parseFloat(form.priceWeekly);
	const pm = parseFloat(form.priceMonthly);
	return {
		name: form.name.trim(),
		address: form.address.trim(),
		city: form.city.trim(),
		state: form.state.trim(),
		latitude: optionalNumber(form.latitude),
		longitude: optionalNumber(form.longitude),
		pricing: {
			...pd > 0 && !Number.isNaN(pd) ? { daily: pd } : {},
			...pw > 0 && !Number.isNaN(pw) ? { weekly: pw } : {},
			...pm > 0 && !Number.isNaN(pm) ? { monthly: pm } : {}
		},
		boardType: form.boardType,
		orientation: form.orientation || void 0,
		isNegotiable: form.isNegotiable,
		trafficDescription: form.trafficDescription.trim() || void 0,
		durationPerDisplay: optionalNumber(form.durationPerDisplay),
		width: optionalNumber(form.width),
		height: optionalNumber(form.height),
		pixelWidth: optionalPositiveInt(form.pixelWidth),
		pixelHeight: optionalPositiveInt(form.pixelHeight),
		startTime: form.startTime,
		endTime: form.endTime,
		activeDays: form.activeDays,
		isAvailable: form.isAvailable,
		audienceTypes: form.audienceTypes,
		nearbyLandmarks: form.nearbyLandmarks.trim() || void 0,
		illumination: form.illumination || void 0,
		facingDirection: form.facingDirection || void 0
	};
}
var Add = () => {
	const { mutate: createListing, isPending } = useCreateBillboardListing();
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [validationError, setValidationError] = useState("");
	const [form, setForm] = useState(() => ({
		...initialForm,
		activeDays: [...initialForm.activeDays]
	}));
	const [imagePreviewName, setImagePreviewName] = useState("");
	const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
	const [imageError, setImageError] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		if (!imageFile) {
			setImagePreviewUrl(null);
			return;
		}
		const url = URL.createObjectURL(imageFile);
		setImagePreviewUrl(url);
		return () => URL.revokeObjectURL(url);
	}, [imageFile]);
	const set = (key) => (v) => {
		if (v && typeof v === "object" && "target" in v) {
			const t = v.target;
			const val = t.type === "checkbox" ? t.checked : t.value;
			setForm((f) => ({
				...f,
				[key]: val
			}));
		} else setForm((f) => ({
			...f,
			[key]: v
		}));
	};
	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		setImageError("");
		if (!file) {
			setImagePreviewName("");
			setImageFile(null);
			return;
		}
		if (!file.type.startsWith("image/")) {
			setImageError("Use a JPG, PNG, or other image file.");
			setImagePreviewName("");
			setImageFile(null);
			e.target.value = "";
			return;
		}
		setImagePreviewName(file.name);
		setImageFile(file);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setValidationError("");
		if (!form.name.trim() || !form.address.trim() || !form.city.trim() || !form.state.trim()) {
			setValidationError("Fill in name, address, city, and state.");
			return;
		}
		if (!form.boardType) {
			setValidationError("Select a board type.");
			return;
		}
		const pd = parseFloat(form.priceDaily);
		const pw = parseFloat(form.priceWeekly);
		const pm = parseFloat(form.priceMonthly);
		if (!(!Number.isNaN(pd) && pd > 0 || !Number.isNaN(pw) && pw > 0 || !Number.isNaN(pm) && pm > 0)) {
			setValidationError("Enter at least one price: per day, per week, or per month.");
			return;
		}
		if (!imageFile) {
			const msg = "Upload a hero image.";
			setImageError(msg);
			setValidationError(msg);
			return;
		}
		if (form.activeDays.length === 0) {
			setValidationError("Select at least one active day.");
			return;
		}
		createListing({
			payload: buildListingPayload(form),
			imageFile
		}, { onSuccess: () => setShowSuccessModal(true) });
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash py-14",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-11/12",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-2xl font-semibold",
				children: "Add billboard"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-neutral-600 mt-1",
				children: "Listing details for location, pricing, schedule, and creative specs."
			})]
		}), /* @__PURE__ */ jsx("form", {
			onSubmit: handleSubmit,
			children: /* @__PURE__ */ jsxs("div", {
				className: "md:flex mx-auto w-11/12 gap-0",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "basis-6/12 md:pr-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Billboard name"
							}), /* @__PURE__ */ jsx("input", {
								name: "name",
								required: true,
								value: form.name,
								onChange: set("name"),
								className: inputClass,
								placeholder: "e.g. Lekki-Epe Express facing VI"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium mb-1",
									children: "Pricing (₦)"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-neutral-500 mb-2",
									children: "Add one or more: day, week, and month — advertisers can compare options."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs text-neutral-600 block mb-1",
											children: "Per day"
										}), /* @__PURE__ */ jsx("input", {
											name: "priceDaily",
											type: "number",
											min: 0,
											step: "0.01",
											value: form.priceDaily,
											onChange: set("priceDaily"),
											className: inputClass,
											placeholder: "—"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs text-neutral-600 block mb-1",
											children: "Per week"
										}), /* @__PURE__ */ jsx("input", {
											name: "priceWeekly",
											type: "number",
											min: 0,
											step: "0.01",
											value: form.priceWeekly,
											onChange: set("priceWeekly"),
											className: inputClass,
											placeholder: "—"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
											className: "text-xs text-neutral-600 block mb-1",
											children: "Per month"
										}), /* @__PURE__ */ jsx("input", {
											name: "priceMonthly",
											type: "number",
											min: 0,
											step: "0.01",
											value: form.priceMonthly,
											onChange: set("priceMonthly"),
											className: inputClass,
											placeholder: "—"
										})] })
									]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Street address"
							}), /* @__PURE__ */ jsx("input", {
								name: "address",
								required: true,
								value: form.address,
								onChange: set("address"),
								className: inputClass,
								placeholder: "Full street address"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3 grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "City"
							}), /* @__PURE__ */ jsx("input", {
								name: "city",
								required: true,
								value: form.city,
								onChange: set("city"),
								className: inputClass
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "State"
							}), /* @__PURE__ */ jsx("input", {
								name: "state",
								required: true,
								value: form.state,
								onChange: set("state"),
								className: inputClass
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3 grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Latitude (optional)"
							}), /* @__PURE__ */ jsx("input", {
								name: "latitude",
								type: "number",
								step: "any",
								value: form.latitude,
								onChange: set("latitude"),
								className: inputClass,
								placeholder: "6.4281"
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Longitude (optional)"
							}), /* @__PURE__ */ jsx("input", {
								name: "longitude",
								type: "number",
								step: "any",
								value: form.longitude,
								onChange: set("longitude"),
								className: inputClass,
								placeholder: "3.4219"
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Board type"
							}), /* @__PURE__ */ jsxs("select", {
								name: "boardType",
								required: true,
								value: form.boardType,
								onChange: set("boardType"),
								className: inputClass,
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Select type"
								}), BOARD_TYPES.map((t) => /* @__PURE__ */ jsx("option", {
									value: t.value,
									children: t.label
								}, t.value))]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Duration per display (seconds)"
							}), /* @__PURE__ */ jsx("input", {
								name: "durationPerDisplay",
								type: "number",
								min: 0,
								value: form.durationPerDisplay,
								onChange: set("durationPerDisplay"),
								className: inputClass
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3 grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Display from"
							}), /* @__PURE__ */ jsx("input", {
								name: "startTime",
								type: "time",
								value: form.startTime,
								onChange: set("startTime"),
								className: inputClass
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Display until"
							}), /* @__PURE__ */ jsx("input", {
								name: "endTime",
								type: "time",
								value: form.endTime,
								onChange: set("endTime"),
								className: inputClass
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium mb-1",
									children: "Active days"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-2",
									children: WEEKDAYS.map(({ bit, label }) => /* @__PURE__ */ jsxs("label", {
										className: `cursor-pointer rounded border px-2 py-1 text-sm ${form.activeDays.includes(bit) ? "bg-ads360black-100 text-white border-ads360black-100" : "bg-white border-[#E4E4E4]"}`,
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											className: "sr-only",
											checked: form.activeDays.includes(bit),
											onChange: () => setForm((f) => ({
												...f,
												activeDays: toggleDay(f.activeDays, bit)
											}))
										}), label]
									}, bit))
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-neutral-500 mt-1",
									children: "At least one day required."
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Physical dimensions (m)"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ jsx("input", {
									name: "width",
									type: "number",
									min: 0,
									step: "any",
									placeholder: "Width",
									value: form.width,
									onChange: set("width"),
									className: inputClass
								}), /* @__PURE__ */ jsx("input", {
									name: "height",
									type: "number",
									min: 0,
									step: "any",
									placeholder: "Height",
									value: form.height,
									onChange: set("height"),
									className: inputClass
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Creative resolution (px)"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ jsx("input", {
									name: "pixelWidth",
									type: "number",
									min: 0,
									placeholder: "Width",
									value: form.pixelWidth,
									onChange: set("pixelWidth"),
									className: inputClass
								}), /* @__PURE__ */ jsx("input", {
									name: "pixelHeight",
									type: "number",
									min: 0,
									placeholder: "Height",
									value: form.pixelHeight,
									onChange: set("pixelHeight"),
									className: inputClass
								})]
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "basis-6/12 md:pl-2",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Orientation"
							}), /* @__PURE__ */ jsxs("select", {
								name: "orientation",
								value: form.orientation,
								onChange: set("orientation"),
								className: inputClass,
								children: [
									/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Select"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "portrait",
										children: "Portrait"
									}),
									/* @__PURE__ */ jsx("option", {
										value: "landscape",
										children: "Landscape"
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3 flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("input", {
								id: "isNegotiable",
								type: "checkbox",
								checked: form.isNegotiable,
								onChange: (e) => setForm((f) => ({
									...f,
									isNegotiable: e.target.checked
								})),
								className: "rounded border-[#E4E4E4]"
							}), /* @__PURE__ */ jsx("label", {
								htmlFor: "isNegotiable",
								className: "text-sm font-medium",
								children: "Price is negotiable"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Availability"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("input", {
									id: "isAvailable",
									type: "checkbox",
									checked: form.isAvailable,
									onChange: (e) => setForm((f) => ({
										...f,
										isAvailable: e.target.checked
									})),
									className: "rounded border-[#E4E4E4]"
								}), /* @__PURE__ */ jsx("label", {
									htmlFor: "isAvailable",
									className: "text-sm",
									children: "Currently available for booking"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Audience type"
							}), /* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: AUDIENCE_TYPES.map((a) => /* @__PURE__ */ jsxs("label", {
									className: `cursor-pointer rounded border px-2 py-1 text-sm ${form.audienceTypes.includes(a.value) ? "bg-ads360black-100 text-white border-ads360black-100" : "bg-white border-[#E4E4E4]"}`,
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										className: "sr-only",
										checked: form.audienceTypes.includes(a.value),
										onChange: () => setForm((f) => ({
											...f,
											audienceTypes: toggleAudience(f.audienceTypes, a.value)
										}))
									}), a.label]
								}, a.value))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Nearby landmarks"
							}), /* @__PURE__ */ jsx("input", {
								name: "nearbyLandmarks",
								value: form.nearbyLandmarks,
								onChange: set("nearbyLandmarks"),
								className: inputClass,
								placeholder: "e.g. Near Eko Hotel, opposite Shoprite"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3 grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Illumination"
							}), /* @__PURE__ */ jsxs("select", {
								name: "illumination",
								value: form.illumination,
								onChange: set("illumination"),
								className: inputClass,
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Select"
								}), ILLUMINATION.map((i) => /* @__PURE__ */ jsx("option", {
									value: i.value,
									children: i.label
								}, i.value))]
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Facing direction"
							}), /* @__PURE__ */ jsxs("select", {
								name: "facingDirection",
								value: form.facingDirection,
								onChange: set("facingDirection"),
								className: inputClass,
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Select"
								}), FACING_DIRECTION.map((d) => /* @__PURE__ */ jsx("option", {
									value: d.value,
									children: d.label
								}, d.value))]
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium mb-1",
								children: "Traffic description"
							}), /* @__PURE__ */ jsx("textarea", {
								name: "trafficDescription",
								rows: 4,
								value: form.trafficDescription,
								onChange: set("trafficDescription"),
								placeholder: "Facing traffic along Adetokunbo Ademola by Eko Hotel, Ahmadu Bello Way…",
								className: inputClass
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium mb-1",
									children: "Hero image"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-xs text-neutral-600 mb-2",
									children: "JPG, PNG, or other common image formats."
								}),
								/* @__PURE__ */ jsx(FilesInput, {
									previewName: imagePreviewName,
									accept: "image",
									handleChange: handleImageChange,
									warning: imageError || " "
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "bg-neutral-50 w-full min-h-[240px] rounded-10 border border-dashed border-[#E4E4E4] overflow-hidden flex items-center justify-center",
							children: imagePreviewUrl ? /* @__PURE__ */ jsx("img", {
								src: imagePreviewUrl,
								alt: "Billboard hero image preview",
								className: "max-h-[min(480px,70vh)] w-full object-contain"
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-sm text-neutral-500 px-4 text-center",
								children: "Image preview appears here after you choose a file above."
							})
						}),
						validationError ? /* @__PURE__ */ jsx("p", {
							className: "text-sm text-red-600 mt-4",
							role: "alert",
							children: validationError
						}) : null,
						/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: isPending,
							className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5 text-white p-2 px-4 disabled:opacity-60 disabled:pointer-events-none",
							children: isPending ? "Submitting…" : "Submit listing"
						}) })
					]
				})]
			})
		})]
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen: showSuccessModal,
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-white w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10 grid grid-cols-1 content-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-green-500 border-b p-3 font-semibold",
					children: "Billboard added successfully"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "px-3 py-5 border-b",
					children: "Do you want to add another board?"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end space-x-2 p-3",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => {
							setShowSuccessModal(false);
							setValidationError("");
							setForm({
								...initialForm,
								activeDays: [...initialForm.activeDays]
							});
							setImagePreviewName("");
							setImageFile(null);
							setImageError("");
						},
						className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2",
						children: "Yes"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => navigate({ to: "/vendors/billboards/listing" }),
						className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2",
						children: "No"
					})]
				})
			]
		})
	})] });
};
var Route$30 = createFileRoute("/vendors/billboards/add-billboard/")({ component: Add });
//#endregion
//#region components/wallet/FundWalletModal.tsx
var cancel$5 = "/icons/usericon/modalCancelBotton.svg";
var cardIcon = "/icons/usericon/card.svg";
function FundWalletModal({ isOpen, onClose }) {
	const [amount, setAmount] = useState("");
	const [selected, setSelected] = useState("new");
	const [saveCard, setSaveCard] = useState(false);
	const { data: savedCards = [], isFetching: cardsLoading } = useSavedPaymentCards(isOpen);
	const deposit = useWalletDeposit();
	const invalidateWallet = useInvalidateWalletQueries();
	const handleProceed = async () => {
		const amt = Number(amount);
		if (!Number.isFinite(amt) || amt <= 0) {
			toast.error("Enter a valid amount.");
			return;
		}
		try {
			const res = await deposit.mutateAsync({
				amount: amt,
				saveCard: selected === "new" ? saveCard : false,
				savedCardId: selected === "new" ? void 0 : selected
			});
			const link = res && typeof res === "object" && res.data && typeof res.data.link === "string" ? res.data.link : null;
			if (link) {
				window.location.assign(link);
				return;
			}
			toast.success("Payment started.");
			await invalidateWallet();
			onClose();
		} catch {}
	};
	return /* @__PURE__ */ jsx(Modal, {
		isOpen,
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-white p-5 w-11/12 max-w-md mx-auto rounded-10 max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between items-start mb-4",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
						className: "text-lg font-semibold",
						children: "Fund wallet"
					}), /* @__PURE__ */ jsx("p", {
						className: "text-sm text-stone-500 mt-1",
						children: "Pay with a saved card or a new card via checkout"
					})] }), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ jsx("img", {
							src: cancel$5,
							alt: "",
							className: "w-5"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mb-5",
					children: [/* @__PURE__ */ jsx("label", {
						className: "text-sm font-medium text-stone-600",
						htmlFor: "fund-amount",
						children: "Amount"
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex mt-1",
						children: [/* @__PURE__ */ jsx("div", {
							className: "bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-14 content-center text-black/50 text-sm",
							children: "₦"
						}), /* @__PURE__ */ jsx("input", {
							id: "fund-amount",
							inputMode: "decimal",
							placeholder: "0.00",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							className: "p-2 w-full border border-l-0 rounded-r focus:outline-none focus:ring-1 focus:ring-ads360yellow-100"
						})]
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm font-medium text-stone-700 mb-2",
					children: "Saved cards"
				}),
				cardsLoading ? /* @__PURE__ */ jsx("p", {
					className: "text-sm text-stone-500 mb-4",
					children: "Loading cards…"
				}) : null,
				/* @__PURE__ */ jsxs("ul", {
					className: "space-y-2 mb-4",
					children: [savedCards.map((c) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setSelected(c.id),
						className: `w-full flex items-center gap-3 rounded border p-3 text-left transition-colors ${selected === c.id ? "border-ads360yellow-100 bg-ads360yellow-100/10" : "border-[#E4E4E4] hover:border-ads360yellow-100/50"}`,
						children: [
							/* @__PURE__ */ jsx("img", {
								src: cardIcon,
								alt: "",
								width: 36,
								height: 36,
								className: "shrink-0"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-medium text-sm",
									children: (c.brand ?? "Card") + (c.last4 ? ` ·••• ${c.last4}` : "")
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-stone-500",
									children: c.expMonth && c.expYear ? `Expires ${c.expMonth}/${c.expYear}` : "Saved on file"
								})]
							}),
							/* @__PURE__ */ jsx("span", {
								className: `h-4 w-4 rounded-full border-2 shrink-0 ${selected === c.id ? "border-ads360black-100 bg-ads360black-100" : "border-stone-300"}`,
								"aria-hidden": true
							})
						]
					}) }, c.id)), /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setSelected("new"),
						className: `w-full flex items-center gap-3 rounded border p-3 text-left transition-colors ${selected === "new" ? "border-ads360yellow-100 bg-ads360yellow-100/10" : "border-[#E4E4E4] hover:border-ads360yellow-100/50"}`,
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "h-9 w-9 rounded border border-dashed border-stone-400 grid place-items-center text-stone-500 text-lg shrink-0",
								children: "+"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ jsx("p", {
									className: "font-medium text-sm",
									children: "Use a new card"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-stone-500",
									children: "Opens secure checkout"
								})]
							}),
							/* @__PURE__ */ jsx("span", {
								className: `h-4 w-4 rounded-full border-2 shrink-0 ${selected === "new" ? "border-ads360black-100 bg-ads360black-100" : "border-stone-300"}`,
								"aria-hidden": true
							})
						]
					}) })]
				}),
				selected === "new" ? /* @__PURE__ */ jsxs("label", {
					className: "flex items-center gap-2 cursor-pointer select-none mb-6",
					children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: saveCard,
						onChange: (e) => setSaveCard(e.target.checked),
						className: "rounded border-stone-400 text-ads360black-100 focus:ring-ads360yellow-100"
					}), /* @__PURE__ */ jsx("span", {
						className: "text-sm text-stone-700",
						children: "Save this card for next time"
					})]
				}) : /* @__PURE__ */ jsx("p", {
					className: "text-xs text-stone-500 mb-6",
					children: "Paying with a card already on file — no need to save again."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ jsx("button", {
						type: "button",
						disabled: deposit.isPending,
						className: "bg-ads360black-100/95 hover:bg-ads360black-100 disabled:opacity-60 rounded text-white w-5/6 h-10 text-sm font-medium",
						onClick: () => void handleProceed(),
						children: deposit.isPending ? "Please wait…" : "Proceed"
					})
				})
			]
		})
	});
}
//#endregion
//#region app/_usersauth/users/wallet/index.tsx
var naira$1 = "/icons/naira.svg";
var filter = "/icons/filter.svg";
var makepayment = "/icons/makepayment.svg";
var whatsAppPoint = "/icons/usericon/whatsappPoint.svg";
function formatMoney(n, currency) {
	return `${currency === "NGN" ? "₦" : `${currency} `}${new Intl.NumberFormat("en-NG", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(n)}`;
}
function accountDisplayName(me) {
	if (!me) return "—";
	if (me.accountType === "business_user") return me.businessName || me.contactName || me.email;
	if (me.accountType === "regular_user") return `${me.firstName} ${me.lastName}`.trim() || me.email;
	return me.email;
}
var TYPE_LABELS = {
	wallet_fund: "Wallet fund",
	wallet_withdrawal: "Wallet withdrawal",
	wallet_debit: "Wallet debit",
	billboard_booking: "Billboard booking",
	billboard_payout: "Billboard payout",
	refund: "Refund",
	admin_adjustment: "Adjustment",
	other: "Other"
};
var STATUS_LABELS = {
	pending: "Pending",
	completed: "Completed",
	failed: "Failed"
};
var ALL_TYPES = [
	"all",
	"wallet_fund",
	"wallet_withdrawal",
	"wallet_debit",
	"billboard_booking",
	"billboard_payout",
	"refund",
	"admin_adjustment",
	"other"
];
var ALL_STATUSES = [
	"all",
	"pending",
	"completed",
	"failed"
];
function amountPresentation(tx) {
	const base = formatMoney(Math.abs(tx.amount), tx.currency);
	const creditTypes = [
		"wallet_fund",
		"refund",
		"billboard_payout"
	];
	const debitTypes = [
		"wallet_withdrawal",
		"wallet_debit",
		"billboard_booking"
	];
	if (creditTypes.includes(tx.type)) return {
		text: `+${base}`,
		className: "text-green-600"
	};
	if (debitTypes.includes(tx.type)) return {
		text: `-${base}`,
		className: "text-red-600"
	};
	return {
		text: base,
		className: "text-stone-700"
	};
}
function formatWhen(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleString("en-NG", {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
var WalletSection = () => {
	const { data: me } = useMe();
	const { data: wallet, isPending: walletLoading, isError: walletError } = useWallet();
	const { data: transactions = [], isPending: txLoading, isError: txError, refetch: refetchTx } = useWalletTransactions(100);
	const [fundOpen, setFundOpen] = useState(false);
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const filtered = useMemo(() => {
		return transactions.filter((t) => {
			if (statusFilter !== "all" && t.status !== statusFilter) return false;
			if (typeFilter !== "all" && t.type !== typeFilter) return false;
			return true;
		});
	}, [
		transactions,
		statusFilter,
		typeFilter
	]);
	const displayName = accountDisplayName(me);
	return /* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash px-4 md:px-10 py-14",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container mx-auto",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-2xl",
					children: "My Wallet"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-stone-400",
					children: "View billing history and current balance here"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "md:flex my-10 justify-around items-start gap-6 bg-white p-5 shadow-md rounded-10 border border-ads360yellow-100",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h3", { children: "Account Name" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-stone-400 text-xl my-4",
								children: displayName
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "my-3",
								children: "Balance"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex",
								children: [/* @__PURE__ */ jsx("img", {
									alt: "",
									src: naira$1,
									className: "w-14 h-14"
								}), /* @__PURE__ */ jsxs("div", {
									className: "px-3",
									children: [walletLoading ? /* @__PURE__ */ jsx("p", {
										className: "text-2xl text-stone-400",
										children: "…"
									}) : walletError ? /* @__PURE__ */ jsx("p", {
										className: "text-sm text-red-600",
										children: "Could not load balance"
									}) : /* @__PURE__ */ jsx("p", {
										className: "text-2xl",
										children: formatMoney(wallet?.balance ?? 0, wallet?.currency ?? "NGN")
									}), /* @__PURE__ */ jsx("h3", {
										className: "text-stone-400 text-sm",
										children: "Available Balance"
									})]
								})]
							})] })
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-5 md:mt-0",
							children: [/* @__PURE__ */ jsx("p", {
								className: "my-3",
								children: "WhatsApp Point"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex",
								children: [/* @__PURE__ */ jsx("img", {
									alt: "",
									src: whatsAppPoint,
									className: "w-14 h-14"
								}), /* @__PURE__ */ jsxs("div", {
									className: "px-3",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-2xl",
										children: "0"
									}), /* @__PURE__ */ jsx("h3", {
										className: "text-stone-400 text-sm",
										children: "Available Balance"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "shrink-0",
							children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setFundOpen(true),
								className: "flex px-10 space-x-5 py-5 my-5 md:my-0 rounded border text-ads360light-100 bg-ads360black-100/95 hover:bg-ads360black-100",
								children: [/* @__PURE__ */ jsx("img", {
									alt: "",
									src: makepayment,
									className: "w-5 h-5"
								}), /* @__PURE__ */ jsx("span", { children: "Fund Wallet" })]
							})
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "group my-4",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col md:flex-row md:items-center md:justify-end gap-3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center space-x-2 bg-[#E4E4E4] p-1 rounded-full px-5 w-fit",
							children: [/* @__PURE__ */ jsx("img", {
								src: filter,
								alt: "",
								className: "py-2",
								width: 20,
								height: 20
							}), /* @__PURE__ */ jsx("span", { children: "filter" })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row gap-2 sm:justify-end",
							children: [/* @__PURE__ */ jsx("select", {
								value: statusFilter,
								onChange: (e) => setStatusFilter(e.target.value),
								className: "rounded p-2 focus:outline-none bg-ads360light-100 border border-transparent min-w-[10rem]",
								children: ALL_STATUSES.map((v) => /* @__PURE__ */ jsx("option", {
									value: v,
									children: v === "all" ? "All statuses" : STATUS_LABELS[v]
								}, v))
							}), /* @__PURE__ */ jsx("select", {
								value: typeFilter,
								onChange: (e) => setTypeFilter(e.target.value),
								className: "rounded p-2 focus:outline-none bg-ads360light-100 border border-transparent min-w-[10rem]",
								children: ALL_TYPES.map((v) => /* @__PURE__ */ jsx("option", {
									value: v,
									children: v === "all" ? "All types" : TYPE_LABELS[v]
								}, v))
							})]
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "bg-white p-4 shadow-md my-3 rounded-10 border border-ads360yellow-100",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center justify-between gap-2 mb-3",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "text-lg",
							children: "Transaction History"
						}), txError ? /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => refetchTx(),
							className: "text-sm text-ads360yellow-100 underline",
							children: "Retry"
						}) : null]
					}), txLoading ? /* @__PURE__ */ jsx("p", {
						className: "text-stone-500 text-sm py-4",
						children: "Loading transactions…"
					}) : txError ? /* @__PURE__ */ jsx("p", {
						className: "text-red-600 text-sm py-4",
						children: "Could not load transactions."
					}) : filtered.length === 0 ? /* @__PURE__ */ jsx("p", {
						className: "text-stone-500 text-sm py-4",
						children: "No transactions match your filters."
					}) : /* @__PURE__ */ jsx("ul", {
						className: "space-y-3",
						children: filtered.map((tx) => {
							const amt = amountPresentation(tx);
							return /* @__PURE__ */ jsxs("li", {
								className: "bg-[#f1f1f1] p-3 rounded text-sm",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex justify-between gap-3 items-start",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ jsx("p", {
											className: "font-bold text-stone-900",
											children: tx.description
										}), /* @__PURE__ */ jsx("p", {
											className: "text-stone-500 mt-0.5",
											children: formatWhen(tx.createdAt)
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: `font-semibold shrink-0 ${amt.className}`,
										children: amt.text
									})]
								}), /* @__PURE__ */ jsxs("dl", {
									className: "mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-stone-600 border-t border-stone-200/80 pt-2",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
											className: "text-stone-400",
											children: "Type"
										}), /* @__PURE__ */ jsx("dd", { children: TYPE_LABELS[tx.type] ?? tx.type })] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
											className: "text-stone-400",
											children: "Status"
										}), /* @__PURE__ */ jsx("dd", { children: STATUS_LABELS[tx.status] ?? tx.status })] }),
										tx.provider ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
											className: "text-stone-400",
											children: "Provider"
										}), /* @__PURE__ */ jsx("dd", {
											className: "capitalize",
											children: tx.provider
										})] }) : null,
										tx.providerRef ? /* @__PURE__ */ jsxs("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ jsx("dt", {
												className: "text-stone-400",
												children: "Reference"
											}), /* @__PURE__ */ jsx("dd", {
												className: "font-mono break-all",
												children: tx.providerRef
											})]
										}) : null,
										tx.referenceType != null || tx.referenceId != null ? /* @__PURE__ */ jsxs("div", {
											className: "sm:col-span-2",
											children: [/* @__PURE__ */ jsx("dt", {
												className: "text-stone-400",
												children: "Linked record"
											}), /* @__PURE__ */ jsxs("dd", { children: [tx.referenceType ?? "—", tx.referenceId != null ? ` #${tx.referenceId}` : ""] })]
										}) : null
									]
								})]
							}, tx.id);
						})
					})]
				})
			]
		}), /* @__PURE__ */ jsx(FundWalletModal, {
			isOpen: fundOpen,
			onClose: () => setFundOpen(false)
		})]
	});
};
var Route$29 = createFileRoute("/_usersauth/users/wallet/")({ component: WalletSection });
//#endregion
//#region app/_usersauth/users/settings/index.tsx
var $$splitComponentImporter = () => import("./settings-CgU6HwSR.js");
var Route$28 = createFileRoute("/_usersauth/users/settings/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region app/_usersauth/users/negotiations/index.tsx
var dash$2 = "/icons/dash.svg";
function NegotiationsPage() {
	const { data, isLoading, isError } = useMyNegotiatingBillboardBookings();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-14",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-2xl",
				children: "Negotiations"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 mb-5 mt-3",
				children: "Bookings currently in negotiation"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto py-1",
				children: /* @__PURE__ */ jsx("div", {
					className: "w-[600px] md:w-full flex justify-start md:space-x-3",
					children: /* @__PURE__ */ jsxs("button", {
						className: "relative",
						children: ["Billboard", /* @__PURE__ */ jsx("img", {
							alt: "Billboard Overview selected",
							src: dash$2,
							className: "w-2/3 mx-auto absolute top-[20px] left-[17%]"
						})]
					})
				})
			})
		]
	}), /* @__PURE__ */ jsx("section", {
		className: "min-h-screen bg-ads360-hash px-4 md:px-10 py-14",
		children: /* @__PURE__ */ jsx(BookingsTable, {
			showPaymentStatus: false,
			rows: (data ?? []).map((r) => ({
				id: r.id,
				listing: r.listingName ?? "-",
				createdAt: r.createdAt,
				amount: r.negotiatedAmount ?? r.quotedTotal,
				status: "negotiating",
				actionHref: `/users/negotiations/${r.id}`,
				actionLabel: "View"
			})),
			isLoading,
			isError,
			emptyText: "No negotiations found",
			statusOptions: [{
				value: "all",
				label: "All"
			}, {
				value: "negotiating",
				label: "Negotiating"
			}],
			defaultStatus: "negotiating",
			pageSize: 10
		})
	})] });
}
var Route$27 = createFileRoute("/_usersauth/users/negotiations/")({ component: NegotiationsPage });
//#endregion
//#region app/_usersauth/users/campaign/index.tsx
var Campaign = () => {
	const [view, setView] = useState("Billboard");
	const { data, isLoading, isError } = useMyPaidBillboardBookings();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 py-2",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "text-2xl",
			children: "Campaigns"
		}), /* @__PURE__ */ jsx("p", {
			className: "text-stone-400 mt-3",
			children: "Check all ads campaign history"
		})]
	}), /* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash px-4 md:px-10 py-14",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex justify-between items-center",
					children: /* @__PURE__ */ jsx("button", {
						className: "bg-ads360yellow-100 text-white px-4 py-2 rounded-md",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/users/campaign/create",
							children: "Create Campaign"
						})
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "",
					children: /* @__PURE__ */ jsxs("select", {
						onChange: (e) => setView(e.target.value),
						className: "bg-white text-black border-2 border-ads360yellow-100 px-4 py-2 rounded-md",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "Billboard",
								children: "Billboard"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "Influencer",
								children: "Influencer"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "Whatsapp",
								children: "Whatsapp"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "sms",
								children: "SMS"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "Digital",
								children: "Digital"
							})
						]
					})
				})]
			}),
			view === "Billboard" && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(BookingsTable, {
				rows: (data ?? []).map((r) => ({
					id: r.id,
					listing: r.listingName ?? "-",
					createdAt: r.createdAt,
					amount: r.negotiatedAmount ?? r.quotedTotal,
					status: r.status,
					paymentStatus: r.paymentStatus ?? "unpaid",
					actionHref: `/users/campaign/${r.id}`,
					actionLabel: "View"
				})),
				isLoading,
				isError,
				emptyText: "No campaigns found",
				statusFilterLabel: "Filter by status",
				statusOptions: [
					{
						value: "all",
						label: "All"
					},
					{
						value: "pending",
						label: "Pending"
					},
					{
						value: "active",
						label: "Active"
					},
					{
						value: "rejected",
						label: "Rejected"
					},
					{
						value: "completed",
						label: "Completed"
					}
				],
				pageSize: 10
			}) }),
			view === "Influencer" && /* @__PURE__ */ jsx("div", { children: "No matching records found" }),
			view === "sms" && /* @__PURE__ */ jsx("div", { children: "No matching records found" }),
			view === "Digital" && /* @__PURE__ */ jsx("div", { children: "No matching records found" }),
			view === "Whatsapp" && /* @__PURE__ */ jsx("div", { children: "No matching records found" })
		]
	})] });
};
var Route$26 = createFileRoute("/_usersauth/users/campaign/")({ component: Campaign });
//#endregion
//#region app/_usersauth/users/analysis/index.tsx
var Analysis = () => {
	return /* @__PURE__ */ jsx("div", { children: "Analysis" });
};
var Route$25 = createFileRoute("/_usersauth/users/analysis/")({ component: Analysis });
//#endregion
//#region app/_usersauth/ads/whatsapp/index.tsx
function Whatsapp() {
	return /* @__PURE__ */ jsx("div", { children: "Coming Soon" });
}
var Route$24 = createFileRoute("/_usersauth/ads/whatsapp/")({ component: Whatsapp });
//#endregion
//#region components/inputs/Tick.tsx
var tick2 = "/icons/tick2.svg";
var tick3 = "/icons/tick3.svg";
var Tick = ({ attachmentType, setAttachmentType, label, asset }) => {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex space-x-3",
		children: [attachmentType === asset ? /* @__PURE__ */ jsx("img", {
			height: 17,
			width: 17,
			alt: "tick2",
			src: tick3
		}) : /* @__PURE__ */ jsx("img", {
			height: 17,
			width: 17,
			alt: "tick2",
			src: tick2,
			onClick: () => setAttachmentType(asset)
		}), /* @__PURE__ */ jsx("span", { children: label })]
	});
};
//#endregion
//#region utils/countries.ts
var COUNTRIES = [
	{
		name: "Afghanistan",
		code: "AF",
		timezone: "Afghanistan Standard Time",
		utc: "UTC+04:30",
		mobileCode: "+93"
	},
	{
		name: "Åland Islands",
		code: "AX",
		timezone: "FLE Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+358-18"
	},
	{
		name: "Albania",
		code: "AL",
		timezone: "Central Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+355"
	},
	{
		name: "Algeria",
		code: "DZ",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+213"
	},
	{
		name: "American Samoa",
		code: "AS",
		timezone: "UTC-11",
		utc: "UTC-11:00",
		mobileCode: "+1-684"
	},
	{
		name: "Andorra",
		code: "AD",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+376"
	},
	{
		name: "Angola",
		code: "AO",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+244"
	},
	{
		name: "Anguilla",
		code: "AI",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-264"
	},
	{
		name: "Antarctica",
		code: "AQ",
		timezone: "Pacific SA Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+"
	},
	{
		name: "Antigua and Barbuda",
		code: "AG",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-268"
	},
	{
		name: "Argentina",
		code: "AR",
		timezone: "Argentina Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+54"
	},
	{
		name: "Armenia",
		code: "AM",
		timezone: "Caucasus Standard Time",
		utc: "UTC+04:00",
		mobileCode: "+374"
	},
	{
		name: "Aruba",
		code: "AW",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+297"
	},
	{
		name: "Australia",
		code: "AU",
		timezone: "AUS Eastern Standard Time",
		utc: "UTC+10:00",
		mobileCode: "+61"
	},
	{
		name: "Austria",
		code: "AT",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+43"
	},
	{
		name: "Azerbaijan",
		code: "AZ",
		timezone: "Azerbaijan Standard Time",
		utc: "UTC+04:00",
		mobileCode: "+994"
	},
	{
		name: "Bahamas, The",
		code: "BS",
		timezone: "Eastern Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+1-242"
	},
	{
		name: "Bahrain",
		code: "BH",
		timezone: "Arab Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+973"
	},
	{
		name: "Bangladesh",
		code: "BD",
		timezone: "Bangladesh Standard Time",
		utc: "UTC+06:00",
		mobileCode: "+880"
	},
	{
		name: "Barbados",
		code: "BB",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-246"
	},
	{
		name: "Belarus",
		code: "BY",
		timezone: "Belarus Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+375"
	},
	{
		name: "Belgium",
		code: "BE",
		timezone: "Romance Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+32"
	},
	{
		name: "Belize",
		code: "BZ",
		timezone: "Central America Standard Time",
		utc: "UTC-06:00",
		mobileCode: "+501"
	},
	{
		name: "Benin",
		code: "BJ",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+229"
	},
	{
		name: "Bermuda",
		code: "BM",
		timezone: "Atlantic Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-441"
	},
	{
		name: "Bhutan",
		code: "BT",
		timezone: "Bangladesh Standard Time",
		utc: "UTC+06:00",
		mobileCode: "+975"
	},
	{
		name: "Bolivarian Republic of Venezuela",
		code: "VE",
		timezone: "Venezuela Standard Time",
		utc: "UTC-04:30",
		mobileCode: "+58"
	},
	{
		name: "Bolivia",
		code: "BO",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+591"
	},
	{
		name: "Bonaire, Sint Eustatius and Saba",
		code: "BQ",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+599"
	},
	{
		name: "Bosnia and Herzegovina",
		code: "BA",
		timezone: "Central European Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+387"
	},
	{
		name: "Botswana",
		code: "BW",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+267"
	},
	{
		name: "Bouvet Island",
		code: "BV",
		timezone: "UTC",
		utc: "UTC",
		mobileCode: "+"
	},
	{
		name: "Brazil",
		code: "BR",
		timezone: "E. South America Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+55"
	},
	{
		name: "British Indian Ocean Territory",
		code: "IO",
		timezone: "Central Asia Standard Time",
		utc: "UTC+06:00",
		mobileCode: "+246"
	},
	{
		name: "Brunei",
		code: "BN",
		timezone: "Singapore Standard Time",
		utc: "UTC+08:00",
		mobileCode: "+673"
	},
	{
		name: "Bulgaria",
		code: "BG",
		timezone: "FLE Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+359"
	},
	{
		name: "Burkina Faso",
		code: "BF",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+226"
	},
	{
		name: "Burundi",
		code: "BI",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+257"
	},
	{
		name: "Cabo Verde",
		code: "CV",
		timezone: "Cape Verde Standard Time",
		utc: "UTC-01:00",
		mobileCode: "+238"
	},
	{
		name: "Cambodia",
		code: "KH",
		timezone: "SE Asia Standard Time",
		utc: "UTC+07:00",
		mobileCode: "+855"
	},
	{
		name: "Cameroon",
		code: "CM",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+237"
	},
	{
		name: "Canada",
		code: "CA",
		timezone: "Eastern Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+1"
	},
	{
		name: "Cayman Islands",
		code: "KY",
		timezone: "SA Pacific Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+1-345"
	},
	{
		name: "Central African Republic",
		code: "CF",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+236"
	},
	{
		name: "Chad",
		code: "TD",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+235"
	},
	{
		name: "Chile",
		code: "CL",
		timezone: "Pacific SA Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+56"
	},
	{
		name: "China",
		code: "CN",
		timezone: "China Standard Time",
		utc: "UTC+08:00",
		mobileCode: "+86"
	},
	{
		name: "Christmas Island",
		code: "CX",
		timezone: "SE Asia Standard Time",
		utc: "UTC+07:00",
		mobileCode: "+61"
	},
	{
		name: "Cocos (Keeling) Islands",
		code: "CC",
		timezone: "Myanmar Standard Time",
		utc: "UTC+06:30",
		mobileCode: "+61"
	},
	{
		name: "Colombia",
		code: "CO",
		timezone: "SA Pacific Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+57"
	},
	{
		name: "Comoros",
		code: "KM",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+269"
	},
	{
		name: "Congo",
		code: "CG",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+242"
	},
	{
		name: "Congo (DRC)",
		code: "CD",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+243"
	},
	{
		name: "Cook Islands",
		code: "CK",
		timezone: "Hawaiian Standard Time",
		utc: "UTC-10:00",
		mobileCode: "+682"
	},
	{
		name: "Costa Rica",
		code: "CR",
		timezone: "Central America Standard Time",
		utc: "UTC-06:00",
		mobileCode: "+506"
	},
	{
		name: "Côte d'Ivoire",
		code: "CI",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+225"
	},
	{
		name: "Croatia",
		code: "HR",
		timezone: "Central European Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+385"
	},
	{
		name: "Cuba",
		code: "CU",
		timezone: "Eastern Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+53"
	},
	{
		name: "Curaçao",
		code: "CW",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+599"
	},
	{
		name: "Cyprus",
		code: "CY",
		timezone: "E. Europe Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+357"
	},
	{
		name: "Czech Republic",
		code: "CZ",
		timezone: "Central Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+420"
	},
	{
		name: "Democratic Republic of Timor-Leste",
		code: "TL",
		timezone: "Tokyo Standard Time",
		utc: "UTC+09:00",
		mobileCode: "+670"
	},
	{
		name: "Denmark",
		code: "DK",
		timezone: "Romance Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+45"
	},
	{
		name: "Djibouti",
		code: "DJ",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+253"
	},
	{
		name: "Dominica",
		code: "DM",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-767"
	},
	{
		name: "Dominican Republic",
		code: "DO",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-809"
	},
	{
		name: "Ecuador",
		code: "EC",
		timezone: "SA Pacific Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+593"
	},
	{
		name: "Egypt",
		code: "EG",
		timezone: "Egypt Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+20"
	},
	{
		name: "El Salvador",
		code: "SV",
		timezone: "Central America Standard Time",
		utc: "UTC-06:00",
		mobileCode: "+503"
	},
	{
		name: "Equatorial Guinea",
		code: "GQ",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+240"
	},
	{
		name: "Eritrea",
		code: "ER",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+291"
	},
	{
		name: "Estonia",
		code: "EE",
		timezone: "FLE Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+372"
	},
	{
		name: "Ethiopia",
		code: "ET",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+251"
	},
	{
		name: "Falkland Islands (Islas Malvinas)",
		code: "FK",
		timezone: "SA Eastern Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+500"
	},
	{
		name: "Faroe Islands",
		code: "FO",
		timezone: "GMT Standard Time",
		utc: "UTC",
		mobileCode: "+298"
	},
	{
		name: "Fiji Islands",
		code: "FJ",
		timezone: "Fiji Standard Time",
		utc: "UTC+12:00",
		mobileCode: "+679"
	},
	{
		name: "Finland",
		code: "FI",
		timezone: "FLE Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+358"
	},
	{
		name: "France",
		code: "FR",
		timezone: "Romance Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+33"
	},
	{
		name: "French Guiana",
		code: "GF",
		timezone: "SA Eastern Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+594"
	},
	{
		name: "French Polynesia",
		code: "PF",
		timezone: "Hawaiian Standard Time",
		utc: "UTC-10:00",
		mobileCode: "+689"
	},
	{
		name: "French Southern and Antarctic Lands",
		code: "TF",
		timezone: "West Asia Standard Time",
		utc: "UTC+05:00",
		mobileCode: "+"
	},
	{
		name: "Gabon",
		code: "GA",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+241"
	},
	{
		name: "Gambia, The",
		code: "GM",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+220"
	},
	{
		name: "Georgia",
		code: "GE",
		timezone: "Georgian Standard Time",
		utc: "UTC+04:00",
		mobileCode: "+995"
	},
	{
		name: "Germany",
		code: "DE",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+49"
	},
	{
		name: "Ghana",
		code: "GH",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+233"
	},
	{
		name: "Gibraltar",
		code: "GI",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+350"
	},
	{
		name: "Greece",
		code: "GR",
		timezone: "GTB Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+30"
	},
	{
		name: "Greenland",
		code: "GL",
		timezone: "Greenland Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+299"
	},
	{
		name: "Grenada",
		code: "GD",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-473"
	},
	{
		name: "Guadeloupe",
		code: "GP",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+590"
	},
	{
		name: "Guam",
		code: "GU",
		timezone: "West Pacific Standard Time",
		utc: "UTC+10:00",
		mobileCode: "+1-671"
	},
	{
		name: "Guatemala",
		code: "GT",
		timezone: "Central America Standard Time",
		utc: "UTC-06:00",
		mobileCode: "+502"
	},
	{
		name: "Guernsey",
		code: "GG",
		timezone: "GMT Standard Time",
		utc: "UTC",
		mobileCode: "+44-1481"
	},
	{
		name: "Guinea",
		code: "GN",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+224"
	},
	{
		name: "Guinea-Bissau",
		code: "GW",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+245"
	},
	{
		name: "Guyana",
		code: "GY",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+592"
	},
	{
		name: "Haiti",
		code: "HT",
		timezone: "Eastern Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+509"
	},
	{
		name: "Heard Island and McDonald Islands",
		code: "HM",
		timezone: "Mauritius Standard Time",
		utc: "UTC+04:00",
		mobileCode: "+ "
	},
	{
		name: "Honduras",
		code: "HN",
		timezone: "Central America Standard Time",
		utc: "UTC-06:00",
		mobileCode: "+504"
	},
	{
		name: "Hong Kong SAR",
		code: "HK",
		timezone: "China Standard Time",
		utc: "UTC+08:00",
		mobileCode: "+852"
	},
	{
		name: "Hungary",
		code: "HU",
		timezone: "Central Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+36"
	},
	{
		name: "Iceland",
		code: "IS",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+354"
	},
	{
		name: "India",
		code: "IN",
		timezone: "India Standard Time",
		utc: "UTC+05:30",
		mobileCode: "+91"
	},
	{
		name: "Indonesia",
		code: "ID",
		timezone: "SE Asia Standard Time",
		utc: "UTC+07:00",
		mobileCode: "+62"
	},
	{
		name: "Iran",
		code: "IR",
		timezone: "Iran Standard Time",
		utc: "UTC+03:30",
		mobileCode: "+98"
	},
	{
		name: "Iraq",
		code: "IQ",
		timezone: "Arabic Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+964"
	},
	{
		name: "Ireland",
		code: "IE",
		timezone: "GMT Standard Time",
		utc: "UTC",
		mobileCode: "+353"
	},
	{
		name: "Israel",
		code: "IL",
		timezone: "Israel Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+972"
	},
	{
		name: "Italy",
		code: "IT",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+39"
	},
	{
		name: "Jamaica",
		code: "JM",
		timezone: "SA Pacific Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+1-876"
	},
	{
		name: "Jan Mayen",
		code: "SJ",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+47"
	},
	{
		name: "Japan",
		code: "JP",
		timezone: "Tokyo Standard Time",
		utc: "UTC+09:00",
		mobileCode: "+81"
	},
	{
		name: "Jersey",
		code: "JE",
		timezone: "GMT Standard Time",
		utc: "UTC",
		mobileCode: "+44-1534"
	},
	{
		name: "Jordan",
		code: "JO",
		timezone: "Jordan Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+962"
	},
	{
		name: "Kazakhstan",
		code: "KZ",
		timezone: "Central Asia Standard Time",
		utc: "UTC+06:00",
		mobileCode: "+7"
	},
	{
		name: "Kenya",
		code: "KE",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+254"
	},
	{
		name: "Kiribati",
		code: "KI",
		timezone: "UTC+12",
		utc: "UTC+12:00",
		mobileCode: "+686"
	},
	{
		name: "Korea",
		code: "KR",
		timezone: "Korea Standard Time",
		utc: "UTC+09:00",
		mobileCode: "+82"
	},
	{
		name: "Kosovo",
		code: "XK",
		timezone: "Central European Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+"
	},
	{
		name: "Kuwait",
		code: "KW",
		timezone: "Arab Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+965"
	},
	{
		name: "Kyrgyzstan",
		code: "KG",
		timezone: "Central Asia Standard Time",
		utc: "UTC+06:00",
		mobileCode: "+996"
	},
	{
		name: "Laos",
		code: "LA",
		timezone: "SE Asia Standard Time",
		utc: "UTC+07:00",
		mobileCode: "+856"
	},
	{
		name: "Latvia",
		code: "LV",
		timezone: "FLE Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+371"
	},
	{
		name: "Lebanon",
		code: "LB",
		timezone: "Middle East Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+961"
	},
	{
		name: "Lesotho",
		code: "LS",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+266"
	},
	{
		name: "Liberia",
		code: "LR",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+231"
	},
	{
		name: "Libya",
		code: "LY",
		timezone: "E. Europe Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+218"
	},
	{
		name: "Liechtenstein",
		code: "LI",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+423"
	},
	{
		name: "Lithuania",
		code: "LT",
		timezone: "FLE Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+370"
	},
	{
		name: "Luxembourg",
		code: "LU",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+352"
	},
	{
		name: "Macao SAR",
		code: "MO",
		timezone: "China Standard Time",
		utc: "UTC+08:00",
		mobileCode: "+853"
	},
	{
		name: "Macedonia, Former Yugoslav Republic of",
		code: "MK",
		timezone: "Central European Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+389"
	},
	{
		name: "Madagascar",
		code: "MG",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+261"
	},
	{
		name: "Malawi",
		code: "MW",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+265"
	},
	{
		name: "Malaysia",
		code: "MY",
		timezone: "Singapore Standard Time",
		utc: "UTC+08:00",
		mobileCode: "+60"
	},
	{
		name: "Maldives",
		code: "MV",
		timezone: "West Asia Standard Time",
		utc: "UTC+05:00",
		mobileCode: "+960"
	},
	{
		name: "Mali",
		code: "ML",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+223"
	},
	{
		name: "Malta",
		code: "MT",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+356"
	},
	{
		name: "Man, Isle of",
		code: "IM",
		timezone: "GMT Standard Time",
		utc: "UTC",
		mobileCode: "+44-1624"
	},
	{
		name: "Marshall Islands",
		code: "MH",
		timezone: "UTC+12",
		utc: "UTC+12:00",
		mobileCode: "+692"
	},
	{
		name: "Martinique",
		code: "MQ",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+596"
	},
	{
		name: "Mauritania",
		code: "MR",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+222"
	},
	{
		name: "Mauritius",
		code: "MU",
		timezone: "Mauritius Standard Time",
		utc: "UTC+04:00",
		mobileCode: "+230"
	},
	{
		name: "Mayotte",
		code: "YT",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+262"
	},
	{
		name: "Mexico",
		code: "MX",
		timezone: "Central Standard Time (Mexico)",
		utc: "UTC-06:00",
		mobileCode: "+52"
	},
	{
		name: "Micronesia",
		code: "FM",
		timezone: "West Pacific Standard Time",
		utc: "UTC+10:00",
		mobileCode: "+691"
	},
	{
		name: "Moldova",
		code: "MD",
		timezone: "GTB Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+373"
	},
	{
		name: "Monaco",
		code: "MC",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+377"
	},
	{
		name: "Mongolia",
		code: "MN",
		timezone: "Ulaanbaatar Standard Time",
		utc: "UTC+08:00",
		mobileCode: "+976"
	},
	{
		name: "Montenegro",
		code: "ME",
		timezone: "Central European Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+382"
	},
	{
		name: "Montserrat",
		code: "MS",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-664"
	},
	{
		name: "Morocco",
		code: "MA",
		timezone: "Morocco Standard Time",
		utc: "UTC",
		mobileCode: "+212"
	},
	{
		name: "Mozambique",
		code: "MZ",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+258"
	},
	{
		name: "Myanmar",
		code: "MM",
		timezone: "Myanmar Standard Time",
		utc: "UTC+06:30",
		mobileCode: "+95"
	},
	{
		name: "Namibia",
		code: "NA",
		timezone: "Namibia Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+264"
	},
	{
		name: "Nauru",
		code: "NR",
		timezone: "UTC+12",
		utc: "UTC+12:00",
		mobileCode: "+674"
	},
	{
		name: "Nepal",
		code: "NP",
		timezone: "Nepal Standard Time",
		utc: "UTC+05:45",
		mobileCode: "+977"
	},
	{
		name: "Netherlands",
		code: "NL",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+31"
	},
	{
		name: "New Caledonia",
		code: "NC",
		timezone: "Central Pacific Standard Time",
		utc: "UTC+11:00",
		mobileCode: "+687"
	},
	{
		name: "New Zealand",
		code: "NZ",
		timezone: "New Zealand Standard Time",
		utc: "UTC+12:00",
		mobileCode: "+64"
	},
	{
		name: "Nicaragua",
		code: "NI",
		timezone: "Central America Standard Time",
		utc: "UTC-06:00",
		mobileCode: "+505"
	},
	{
		name: "Niger",
		code: "NE",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+227"
	},
	{
		name: "Nigeria",
		code: "NG",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+234"
	},
	{
		name: "Niue",
		code: "NU",
		timezone: "UTC-11",
		utc: "UTC-11:00",
		mobileCode: "+683"
	},
	{
		name: "Norfolk Island",
		code: "NF",
		timezone: "Central Pacific Standard Time",
		utc: "UTC+11:00",
		mobileCode: "+672"
	},
	{
		name: "North Korea",
		code: "KP",
		timezone: "Korea Standard Time",
		utc: "UTC+09:00",
		mobileCode: "+850"
	},
	{
		name: "Northern Mariana Islands",
		code: "MP",
		timezone: "West Pacific Standard Time",
		utc: "UTC+10:00",
		mobileCode: "+1-670"
	},
	{
		name: "Norway",
		code: "NO",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+47"
	},
	{
		name: "Oman",
		code: "OM",
		timezone: "Arabian Standard Time",
		utc: "UTC+04:00",
		mobileCode: "+968"
	},
	{
		name: "Pakistan",
		code: "PK",
		timezone: "Pakistan Standard Time",
		utc: "UTC+05:00",
		mobileCode: "+92"
	},
	{
		name: "Palau",
		code: "PW",
		timezone: "Tokyo Standard Time",
		utc: "UTC+09:00",
		mobileCode: "+680"
	},
	{
		name: "Palestinian Authority",
		code: "PS",
		timezone: "Egypt Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+970"
	},
	{
		name: "Panama",
		code: "PA",
		timezone: "SA Pacific Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+507"
	},
	{
		name: "Papua New Guinea",
		code: "PG",
		timezone: "West Pacific Standard Time",
		utc: "UTC+10:00",
		mobileCode: "+675"
	},
	{
		name: "Paraguay",
		code: "PY",
		timezone: "Paraguay Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+595"
	},
	{
		name: "Peru",
		code: "PE",
		timezone: "SA Pacific Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+51"
	},
	{
		name: "Philippines",
		code: "PH",
		timezone: "Singapore Standard Time",
		utc: "UTC+08:00",
		mobileCode: "+63"
	},
	{
		name: "Pitcairn Islands",
		code: "PN",
		timezone: "Pacific Standard Time",
		utc: "UTC-08:00",
		mobileCode: "+870"
	},
	{
		name: "Poland",
		code: "PL",
		timezone: "Central European Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+48"
	},
	{
		name: "Portugal",
		code: "PT",
		timezone: "GMT Standard Time",
		utc: "UTC",
		mobileCode: "+351"
	},
	{
		name: "Puerto Rico",
		code: "PR",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-787"
	},
	{
		name: "Qatar",
		code: "QA",
		timezone: "Arab Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+974"
	},
	{
		name: "Reunion",
		code: "RE",
		timezone: "Mauritius Standard Time",
		utc: "UTC+04:00",
		mobileCode: "+262"
	},
	{
		name: "Romania",
		code: "RO",
		timezone: "GTB Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+40"
	},
	{
		name: "Russia",
		code: "RU",
		timezone: "Russian Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+7"
	},
	{
		name: "Rwanda",
		code: "RW",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+250"
	},
	{
		name: "Saint Barthélemy",
		code: "BL",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+590"
	},
	{
		name: "Saint Helena, Ascension and Tristan da Cunha",
		code: "SH",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+290"
	},
	{
		name: "Saint Kitts and Nevis",
		code: "KN",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-869"
	},
	{
		name: "Saint Lucia",
		code: "LC",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-758"
	},
	{
		name: "Saint Martin (French part)",
		code: "MF",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+590"
	},
	{
		name: "Saint Pierre and Miquelon",
		code: "PM",
		timezone: "Greenland Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+508"
	},
	{
		name: "Saint Vincent and the Grenadines",
		code: "VC",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-784"
	},
	{
		name: "Samoa",
		code: "WS",
		timezone: "Samoa Standard Time",
		utc: "UTC+13:00",
		mobileCode: "+685"
	},
	{
		name: "San Marino",
		code: "SM",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+378"
	},
	{
		name: "São Tomé and Príncipe",
		code: "ST",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+239"
	},
	{
		name: "Saudi Arabia",
		code: "SA",
		timezone: "Arab Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+966"
	},
	{
		name: "Senegal",
		code: "SN",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+221"
	},
	{
		name: "Serbia",
		code: "RS",
		timezone: "Central Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+381"
	},
	{
		name: "Seychelles",
		code: "SC",
		timezone: "Mauritius Standard Time",
		utc: "UTC+04:00",
		mobileCode: "+248"
	},
	{
		name: "Sierra Leone",
		code: "SL",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+232"
	},
	{
		name: "Singapore",
		code: "SG",
		timezone: "Singapore Standard Time",
		utc: "UTC+08:00",
		mobileCode: "+65"
	},
	{
		name: "Sint Maarten (Dutch part)",
		code: "SX",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+599"
	},
	{
		name: "Slovakia",
		code: "SK",
		timezone: "Central Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+421"
	},
	{
		name: "Slovenia",
		code: "SI",
		timezone: "Central Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+386"
	},
	{
		name: "Solomon Islands",
		code: "SB",
		timezone: "Central Pacific Standard Time",
		utc: "UTC+11:00",
		mobileCode: "+677"
	},
	{
		name: "Somalia",
		code: "SO",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+252"
	},
	{
		name: "South Africa",
		code: "ZA",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+27"
	},
	{
		name: "South Georgia and the South Sandwich Islands",
		code: "GS",
		timezone: "UTC-02",
		utc: "UTC-02:00",
		mobileCode: "+"
	},
	{
		name: "South Sudan",
		code: "SS",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+211"
	},
	{
		name: "Spain",
		code: "ES",
		timezone: "Romance Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+34"
	},
	{
		name: "Sri Lanka",
		code: "LK",
		timezone: "Sri Lanka Standard Time",
		utc: "UTC+05:30",
		mobileCode: "+94"
	},
	{
		name: "Sudan",
		code: "SD",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+249"
	},
	{
		name: "Suriname",
		code: "SR",
		timezone: "SA Eastern Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+597"
	},
	{
		name: "Svalbard",
		code: "SJ",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+47"
	},
	{
		name: "Swaziland",
		code: "SZ",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+268"
	},
	{
		name: "Sweden",
		code: "SE",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+46"
	},
	{
		name: "Switzerland",
		code: "CH",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+41"
	},
	{
		name: "Syria",
		code: "SY",
		timezone: "Syria Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+963"
	},
	{
		name: "Taiwan",
		code: "TW",
		timezone: "Taipei Standard Time",
		utc: "UTC+08:00",
		mobileCode: "+886"
	},
	{
		name: "Tajikistan",
		code: "TJ",
		timezone: "West Asia Standard Time",
		utc: "UTC+05:00",
		mobileCode: "+992"
	},
	{
		name: "Tanzania",
		code: "TZ",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+255"
	},
	{
		name: "Thailand",
		code: "TH",
		timezone: "SE Asia Standard Time",
		utc: "UTC+07:00",
		mobileCode: "+66"
	},
	{
		name: "Togo",
		code: "TG",
		timezone: "Greenwich Standard Time",
		utc: "UTC",
		mobileCode: "+228"
	},
	{
		name: "Tokelau",
		code: "TK",
		timezone: "Tonga Standard Time",
		utc: "UTC+13:00",
		mobileCode: "+690"
	},
	{
		name: "Tonga",
		code: "TO",
		timezone: "Tonga Standard Time",
		utc: "UTC+13:00",
		mobileCode: "+676"
	},
	{
		name: "Trinidad and Tobago",
		code: "TT",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-868"
	},
	{
		name: "Tunisia",
		code: "TN",
		timezone: "W. Central Africa Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+216"
	},
	{
		name: "Turkey",
		code: "TR",
		timezone: "Turkey Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+90"
	},
	{
		name: "Turkmenistan",
		code: "TM",
		timezone: "West Asia Standard Time",
		utc: "UTC+05:00",
		mobileCode: "+993"
	},
	{
		name: "Turks and Caicos Islands",
		code: "TC",
		timezone: "Eastern Standard Time",
		utc: "UTC-05:00",
		mobileCode: "+1-649"
	},
	{
		name: "Tuvalu",
		code: "TV",
		timezone: "UTC+12",
		utc: "UTC+12:00",
		mobileCode: "+688"
	},
	{
		name: "U.S. Minor Outlying Islands",
		code: "UM",
		timezone: "UTC-11",
		utc: "UTC-11:00",
		mobileCode: "+1"
	},
	{
		name: "Uganda",
		code: "UG",
		timezone: "E. Africa Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+256"
	},
	{
		name: "Ukraine",
		code: "UA",
		timezone: "FLE Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+380"
	},
	{
		name: "United Arab Emirates",
		code: "AE",
		timezone: "Arabian Standard Time",
		utc: "UTC+04:00",
		mobileCode: "+971"
	},
	{
		name: "United Kingdom",
		code: "GB",
		timezone: "GMT Standard Time",
		utc: "UTC",
		mobileCode: "+44"
	},
	{
		name: "United States",
		code: "US",
		timezone: "Pacific Standard Time",
		utc: "UTC-08:00",
		mobileCode: "+1"
	},
	{
		name: "Uruguay",
		code: "UY",
		timezone: "Montevideo Standard Time",
		utc: "UTC-03:00",
		mobileCode: "+598"
	},
	{
		name: "Uzbekistan",
		code: "UZ",
		timezone: "West Asia Standard Time",
		utc: "UTC+05:00",
		mobileCode: "+998"
	},
	{
		name: "Vanuatu",
		code: "VU",
		timezone: "Central Pacific Standard Time",
		utc: "UTC+11:00",
		mobileCode: "+678"
	},
	{
		name: "Vatican City",
		code: "VA",
		timezone: "W. Europe Standard Time",
		utc: "UTC+01:00",
		mobileCode: "+379"
	},
	{
		name: "Vietnam",
		code: "VN",
		timezone: "SE Asia Standard Time",
		utc: "UTC+07:00",
		mobileCode: "+84"
	},
	{
		name: "Virgin Islands, U.S.",
		code: "VI",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-340"
	},
	{
		name: "Virgin Islands, British",
		code: "VG",
		timezone: "SA Western Standard Time",
		utc: "UTC-04:00",
		mobileCode: "+1-284"
	},
	{
		name: "Wallis and Futuna",
		code: "WF",
		timezone: "UTC+12",
		utc: "UTC+12:00",
		mobileCode: "+681"
	},
	{
		name: "Yemen",
		code: "YE",
		timezone: "Arab Standard Time",
		utc: "UTC+03:00",
		mobileCode: "+967"
	},
	{
		name: "Zambia",
		code: "ZM",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+260"
	},
	{
		name: "Zimbabwe",
		code: "ZW",
		timezone: "South Africa Standard Time",
		utc: "UTC+02:00",
		mobileCode: "+263"
	}
];
//#endregion
//#region app/_usersauth/ads/sms/index.tsx
function Sms() {
	const [attachmentType, setAttachmentType] = useState("image");
	const [numberInput, setNumberInput] = useState("type");
	const [previewImage, setPreviewImage] = useState();
	const [previewVideo, setPreviewVideo] = useState();
	const handleChange = (e, type) => {
		const file = e.target.files;
		if (file !== null && file.length > 0) {
			const objectUrl = URL.createObjectURL(file[0]);
			if (type === "image") {
				setPreviewVideo(void 0);
				setPreviewImage({
					src: objectUrl,
					name: file[0].name
				});
			} else {
				setPreviewImage(void 0);
				setPreviewVideo({
					src: objectUrl,
					name: file[0].name
				});
			}
		}
	};
	const handleNumber = () => {};
	return /* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-10 py-24",
		children: [
			/* @__PURE__ */ jsx(BackBtn, { children: "Smart SMS / Display Ad" }),
			/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 mb-5 mt-3",
				children: "Provide all requested details to send sms campaign"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "md:flex justify-between",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "basis-1/2",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("form", { children: [
							/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("select", {
								className: "my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]",
								children: /* @__PURE__ */ jsx("option", { children: "Select Channel" })
							}) }),
							/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("select", {
								className: "my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]",
								children: /* @__PURE__ */ jsx("option", { children: "Your Sender ID" })
							}) }),
							/* @__PURE__ */ jsxs("div", {
								className: "my-3",
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-xs",
									children: "if you dont have a sender id, kindly select from 360ads sender id"
								}), /* @__PURE__ */ jsx("select", {
									className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]",
									children: /* @__PURE__ */ jsx("option", { children: "Our Sender ID" })
								})]
							}),
							/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("input", {
								type: "url",
								placeholder: "Input URL audiences can view products with...",
								className: "my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
							}) }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex my-3",
								children: [/* @__PURE__ */ jsx("select", {
									className: "basis-2/12 bg-ads360gray-100 w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]",
									children: COUNTRIES.map((country) => /* @__PURE__ */ jsx("option", {
										selected: country.name === "Nigeria" ? true : false,
										children: country.code + " " + country.mobileCode
									}, country.name))
								}), /* @__PURE__ */ jsx("input", {
									placeholder: "Enter Phone Number",
									className: "basis-10/12 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
								})]
							}),
							/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("input", {
								placeholder: "Input Call To Action e.g Buy now...",
								className: "my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
							}) }),
							/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("textarea", {
								rows: 4,
								placeholder: "Input Call To Action e.g Buy now...",
								className: "my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
							}) }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex space-x-3",
								children: [/* @__PURE__ */ jsx(Tick, {
									label: "Image Assets",
									asset: "image",
									setAttachmentType,
									attachmentType
								}), /* @__PURE__ */ jsx(Tick, {
									label: "Video Assets",
									asset: "video",
									setAttachmentType,
									attachmentType
								})]
							}),
							attachmentType === "image" ? /* @__PURE__ */ jsx(FilesInput, {
								previewName: previewImage?.name,
								accept: "image",
								handleChange,
								warning: "Required image size"
							}) : /* @__PURE__ */ jsx(FilesInput, {
								previewName: previewVideo?.name,
								accept: "video",
								handleChange,
								warning: "Required video size"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "my-3",
										children: /* @__PURE__ */ jsx(Tick, {
											label: "Type Number",
											asset: "type",
											setAttachmentType: setNumberInput,
											attachmentType: numberInput
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "my-3",
										children: /* @__PURE__ */ jsx(Tick, {
											label: "Import Number",
											asset: "import",
											setAttachmentType: setNumberInput,
											attachmentType: numberInput
										})
									}),
									numberInput === "type" ? /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", { children: "Enter msisdns separated by commas e.g. 23480xxxxxxxx,23480xxxxxxxx" }), /* @__PURE__ */ jsx("textarea", {
										rows: 4,
										placeholder: "23480xxxxxxxx,23480xxxxxxxx",
										className: "my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
									})] }) }) : /* @__PURE__ */ jsx(FilesInput, {
										previewName: "",
										accept: ".cvs",
										handleChange: handleNumber,
										warning: "Require an excel or cvs file"
									})
								]
							})
						] }), /* @__PURE__ */ jsx("button", {
							className: "group my-5 rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 px-6 h-12",
							children: /* @__PURE__ */ jsx(Link, {
								to: `/ads/sms/checkout`,
								children: "Next"
							})
						})] })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "basis-1/3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "w-11/12 md:w-full lg:w-9/12 h-[550px] bg-white mx-auto border-[15px] rounded-[40px] border-[#1D1D1B]",
							children: [/* @__PURE__ */ jsx("div", { className: "mx-auto w-3/12 bg-[#1D1D1B] h-6 my-3 rounded-10" }), /* @__PURE__ */ jsx("div", { className: "w-10/12 mx-auto bg-ads360light-100 rounded-md" })]
						}), /* @__PURE__ */ jsx("div", { className: "rounded-[90%] my-5 h-5 w-9/12 lg:w-8/12 border mx-auto bg-gray-400" })]
					}),
					/* @__PURE__ */ jsx("div", {})
				]
			})
		]
	});
}
var Route$23 = createFileRoute("/_usersauth/ads/sms/")({ component: Sms });
//#endregion
//#region node_modules/react-icons/bs/index.esm.js
function BsSuitHeartFill(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "currentColor",
			"viewBox": "0 0 16 16"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" }
		}]
	})(props);
}
function BsSuitHeart(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "currentColor",
			"viewBox": "0 0 16 16"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" }
		}]
	})(props);
}
//#endregion
//#region app/_usersauth/ads/influencer/index.tsx
var inf = "/del/team.jpg";
var inf2 = "/del/dav.png";
var inf3 = "/del/girl.jpg";
function Influencer() {
	const [filter, setFilter] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [wishlist, setWishlist] = useState([
		4,
		8,
		2,
		9
	]);
	const handleWishlist = (influencerId) => {
		if (wishlist.includes(influencerId)) setWishlist(wishlist.filter((item) => item !== influencerId));
		else setWishlist((prev) => [...prev, influencerId]);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-10 py-24",
		children: [
			/* @__PURE__ */ jsx(BackBtn, { children: "influencer Marketing" }),
			/* @__PURE__ */ jsx(Steps, {
				step: 2,
				text: "#2 - Onboarding"
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "lg:flex my-5",
				children: [/* @__PURE__ */ jsx("div", {
					className: "gap-5 md:px-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 basis-4/5",
					children: [
						{
							id: 1,
							name: "Pankeeroy",
							occupation: "influencer",
							negotiable: "no",
							image: inf,
							reach: "180K"
						},
						{
							id: 2,
							name: "Kraks Tv",
							occupation: "influencer",
							negotiable: "yes",
							image: inf2,
							reach: "190K"
						},
						{
							id: 3,
							name: "Pankeeroy",
							occupation: "influencer",
							negotiable: "yes",
							image: inf3,
							reach: "170K"
						},
						{
							id: 4,
							name: "Pankeeroy",
							occupation: "influencer",
							negotiable: "no",
							image: inf,
							reach: "180K"
						},
						{
							id: 5,
							name: "Rodney",
							occupation: "influencer",
							negotiable: "yes",
							image: inf2,
							reach: "190K"
						},
						{
							id: 6,
							name: "SplufikNg",
							occupation: "influencer",
							negotiable: "no",
							image: inf3,
							reach: "170K"
						},
						{
							id: 7,
							name: "Tiwalola",
							occupation: "influencer",
							negotiable: "no",
							image: inf,
							reach: "180K"
						},
						{
							id: 8,
							name: "Egbami",
							occupation: "influencer",
							negotiable: "yes",
							image: inf2,
							reach: "190K"
						},
						{
							id: 9,
							name: "SplufikNg",
							occupation: "influencer",
							negotiable: "no",
							image: inf3,
							reach: "170K"
						},
						{
							id: 10,
							name: "SplufikNg",
							occupation: "influencer",
							negotiable: "no",
							image: inf3,
							reach: "170K"
						},
						{
							id: 11,
							name: "Tiwalola",
							occupation: "influencer",
							negotiable: "no",
							image: inf,
							reach: "180K"
						},
						{
							id: 12,
							name: "Egbami",
							occupation: "influencer",
							negotiable: "yes",
							image: inf2,
							reach: "190K"
						},
						{
							id: 13,
							name: "Egbami",
							occupation: "influencer",
							negotiable: "yes",
							image: inf2,
							reach: "190K"
						},
						{
							id: 14,
							name: "SplufikNg",
							occupation: "influencer",
							negotiable: "no",
							image: inf3,
							reach: "170K"
						},
						{
							id: 15,
							name: "SplufikNg",
							occupation: "influencer",
							negotiable: "no",
							image: inf3,
							reach: "170K"
						},
						{
							id: 16,
							name: "Tiwalola",
							occupation: "influencer",
							negotiable: "no",
							image: inf,
							reach: "180K"
						},
						{
							id: 17,
							name: "Egbami",
							occupation: "influencer",
							negotiable: "yes",
							image: inf2,
							reach: "190K"
						}
					].map((influencer) => /* @__PURE__ */ jsxs("div", {
						className: "bg-white rounded-10 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "p-1",
							children: /* @__PURE__ */ jsx(Link, {
								to: `/ads/influencer/${influencer.id}`,
								children: /* @__PURE__ */ jsx("img", {
									alt: "",
									src: influencer.image,
									className: "w-full h-32 rounded-10"
								})
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative grid grid-cols-1 content-center",
							children: [
								influencer.negotiable === "yes" && /* @__PURE__ */ jsx("p", {
									className: "text-xs rounded-tr-10 text-ads360light-100 p-1 bg-ads360yellow-100 absolute top-0 right-0",
									children: "Negotiable"
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "font-bold truncate ...",
									children: influencer.name
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "text-sm text-gray-400",
									children: [/* @__PURE__ */ jsx("p", { children: influencer.occupation }), /* @__PURE__ */ jsx("p", { children: influencer.reach })]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "font-semibold text-ads360yellowBtn-100 hover:bg-ads360yellowBtn-100/30 hover:rounded-full flex justify-center w-8 h-8 p-2",
									children: wishlist.includes(influencer.id) ? /* @__PURE__ */ jsx("button", {
										onClick: () => handleWishlist(influencer.id),
										children: /* @__PURE__ */ jsx(BsSuitHeartFill, { size: 20 })
									}) : /* @__PURE__ */ jsx("button", {
										onClick: () => handleWishlist(influencer.id),
										children: /* @__PURE__ */ jsx(BsSuitHeart, { size: 20 })
									})
								})
							]
						})]
					}, influencer.id))
				}), /* @__PURE__ */ jsx("div", {
					className: "basis-1/5 text-sm",
					children: /* @__PURE__ */ jsxs("div", {
						className: "top-[12.5rem] sticky rounded p-3 border border-ads360yellow-100 bg-white hidden lg:block",
						children: [
							/* @__PURE__ */ jsx("p", { children: "Filter influencer" }),
							/* @__PURE__ */ jsxs("div", {
								className: "my-2",
								children: [/* @__PURE__ */ jsx("p", { children: "influencer Type" }), /* @__PURE__ */ jsxs("select", {
									className: "p-2 w-full border focus:outline-none rounded",
									children: [
										/* @__PURE__ */ jsx("option", { children: "select" }),
										/* @__PURE__ */ jsx("option", { children: "Double faced Gantry LED" }),
										/* @__PURE__ */ jsx("option", { children: "Single faced Gantry LED" }),
										/* @__PURE__ */ jsx("option", { children: "Double faced Gantry LED" })
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "my-2",
								children: [/* @__PURE__ */ jsx("p", { children: "Price Range" }), /* @__PURE__ */ jsxs("div", {
									className: "flex justify-between space-x-1",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "basis-1/2",
										children: [/* @__PURE__ */ jsx("label", { children: "from:" }), /* @__PURE__ */ jsx("input", {
											type: "number",
											className: "rounded w-full border focus:outline-none p-2"
										})]
									}), /* @__PURE__ */ jsxs("div", {
										className: "basis-1/2",
										children: [/* @__PURE__ */ jsx("label", { children: "to:" }), /* @__PURE__ */ jsx("input", {
											type: "number",
											className: "rounded w-full border focus:outline-none p-2"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "my-2",
								children: [/* @__PURE__ */ jsx("p", { children: "Status" }), /* @__PURE__ */ jsxs("select", {
									className: "p-2 w-full border focus:outline-none rounded",
									children: [/* @__PURE__ */ jsx("option", { children: "Negotiable" }), /* @__PURE__ */ jsx("option", { children: "Non Negotiable" })]
								})]
							}),
							/* @__PURE__ */ jsx("button", {
								className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3  text-white  w-2/6 h-10",
								children: "Search"
							})
						]
					})
				})]
			})
		]
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen: showDetails,
		children: /* @__PURE__ */ jsx("div", {
			className: "bg-white p-3 w-10/12 md:w-9/12 mx-auto rounded-10",
			children: /* @__PURE__ */ jsx("button", {
				onClick: () => setShowDetails(false),
				children: "close"
			})
		})
	})] });
}
var Route$22 = createFileRoute("/_usersauth/ads/influencer/")({ component: Influencer });
//#endregion
//#region app/_usersauth/ads/digital/index.tsx
function Digital() {
	return /* @__PURE__ */ jsx("div", { children: "Coming Soon" });
}
var Route$21 = createFileRoute("/_usersauth/ads/digital/")({ component: Digital });
//#endregion
//#region app/_usersauth/ads/billboard/index.tsx
var naira = "/icons/naira.svg";
var location = "/icons/yellowlocation.svg";
var PAGE_SIZE = 12;
function Billboards() {
	const [draft, setDraft] = useState(defaultBillboardFilterForm);
	const [query, setQuery] = useState({
		page: 1,
		limit: PAGE_SIZE
	});
	const { data, isPending, isError, error, refetch } = useBrowseBillboardListings(query);
	const listings = data?.data ?? [];
	const meta = data?.meta;
	const [filter, setFilter] = useState(false);
	const [wishlist, setWishlist] = useState([]);
	const handleWishlist = (billboardId) => {
		setWishlist((prev) => prev.includes(billboardId) ? prev.filter((id) => id !== billboardId) : [...prev, billboardId]);
	};
	const applyFilters = useCallback(() => {
		setQuery(toBillboardListQuery(draft, 1, PAGE_SIZE));
		setFilter(false);
	}, [draft]);
	const goPage = (next) => {
		if (!meta) return;
		if (next < 1 || next > meta.totalPages) return;
		setQuery((q) => ({
			...q,
			page: next
		}));
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-10 py-24",
		children: [
			/* @__PURE__ */ jsx(BackBtn, { children: "BillBoard Marketing" }),
			/* @__PURE__ */ jsx(Steps, {
				step: 2,
				text: "#2 - Onboarding"
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "xl:flex my-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "gap-5 md:px-5 grid grid-cols-1 md:grid-cols-2 basis-4/5",
						children: [
							isPending ? /* @__PURE__ */ jsx("p", {
								className: "text-neutral-600 col-span-full",
								children: "Loading billboards…"
							}) : null,
							isError ? /* @__PURE__ */ jsxs("div", {
								className: "col-span-full rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800",
								children: [/* @__PURE__ */ jsx("p", { children: error instanceof Error ? error.message : "Could not load billboards." }), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => refetch(),
									className: "mt-2 underline",
									children: "Try again"
								})]
							}) : null,
							!isPending && !isError && listings.length === 0 ? /* @__PURE__ */ jsx("p", {
								className: "text-neutral-600 col-span-full",
								children: "No billboards match your filters. Try adjusting search criteria."
							}) : null,
							listings.map((billboard) => /* @__PURE__ */ jsxs("div", {
								className: "rounded bg-white border border-ads360yellow-100",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "relative",
										children: [
											billboard.isNegotiable ? /* @__PURE__ */ jsx("div", {
												className: "absolute w-1/2 md:w-2/3 xl:w-1/2 bg-ads360black-100/70 text-ads360light-100 rounded right-3 top-4 text-center py-2",
												children: "Negotiable"
											}) : null,
											/* @__PURE__ */ jsx("div", {
												className: "absolute bottom-14 md:bottom-10 right-8 font-semibold text-ads360yellowBtn-100 hover:bg-ads360yellowBtn-100/30 hover:rounded-full flex justify-center p-2",
												children: wishlist.includes(billboard.id) ? /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => handleWishlist(billboard.id),
													"aria-label": "Remove from wishlist",
													children: /* @__PURE__ */ jsx(BsSuitHeartFill, { size: 20 })
												}) : /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => handleWishlist(billboard.id),
													"aria-label": "Add to wishlist",
													children: /* @__PURE__ */ jsx(BsSuitHeart, { size: 20 })
												})
											}),
											/* @__PURE__ */ jsx("img", {
												alt: "",
												src: billboard.imageUrl,
												className: "w-full rounded-t h-auto object-cover max-h-80"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex truncate ... text-ads360yellow-100 font-bold w-full text-sm md:text-base p-2",
												children: [/* @__PURE__ */ jsx("img", {
													src: location,
													alt: ""
												}), billboard.name.toLocaleUpperCase()]
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-1 md:grid-cols-2 my-3 w-11/12 mx-auto",
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "my-1",
												children: [
													/* @__PURE__ */ jsx("span", {
														className: "font-bold",
														children: "Location: "
													}),
													billboard.address,
													", ",
													billboard.city,
													", ",
													billboard.state
												]
											}),
											billboard.nearbyLandmarks ? /* @__PURE__ */ jsx("div", {
												className: "my-1",
												children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
													className: "font-bold",
													children: "Nearby: "
												}), billboard.nearbyLandmarks] })
											}) : null,
											/* @__PURE__ */ jsx("div", {
												className: "my-1",
												children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
													className: "font-bold",
													children: "Board-type: "
												}), boardTypeLabel(billboard.boardType)] })
											}),
											/* @__PURE__ */ jsx("div", {
												className: "my-1",
												children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
													className: "font-bold",
													children: "Run-time: "
												}), formatRuntime(billboard)] })
											})
										]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mb-5 flex justify-between mx-auto w-11/12",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center",
											children: [
												/* @__PURE__ */ jsx("img", {
													src: naira,
													alt: ""
												}),
												"From ₦",
												primaryPrice(billboard.pricing)
											]
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12",
											children: /* @__PURE__ */ jsx(Link, {
												to: "/ads/billboard/$slug",
												params: { slug: String(billboard.id) },
												children: "View BillBoard"
											})
										})]
									})
								]
							}, billboard.id)),
							meta && meta.totalPages > 1 ? /* @__PURE__ */ jsxs("div", {
								className: "col-span-full flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4",
								children: [/* @__PURE__ */ jsxs("p", {
									className: "text-sm text-neutral-600",
									children: [
										"Page ",
										meta.page,
										" of ",
										meta.totalPages,
										" (",
										meta.total,
										" total)"
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										disabled: meta.page <= 1 || isPending,
										onClick: () => goPage(meta.page - 1),
										className: "rounded border border-ads360yellow-100 bg-white px-3 py-1.5 text-sm disabled:opacity-40",
										children: "Previous"
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										disabled: meta.page >= meta.totalPages || isPending,
										onClick: () => goPage(meta.page + 1),
										className: "rounded border border-ads360yellow-100 bg-white px-3 py-1.5 text-sm disabled:opacity-40",
										children: "Next"
									})]
								})]
							}) : null
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "basis-1/5 text-sm hidden xl:block",
						children: /* @__PURE__ */ jsx("div", {
							className: "top-[12.5rem] sticky rounded p-3 border border-ads360yellow-100 bg-white",
							children: /* @__PURE__ */ jsx(BillboardSorter, {
								modal: false,
								toggleModal: () => {},
								value: draft,
								onChange: setDraft,
								onApply: applyFilters
							})
						})
					}),
					filter === false ? /* @__PURE__ */ jsx("div", {
						className: "fixed w-full left-3 bottom-5 xl:hidden",
						children: /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "rounded-10 font-bold border bg-ads360yellow-100 shadow-md border-white w-12 h-12",
							onClick: () => setFilter(true),
							children: "Filter"
						})
					}) : null
				]
			})
		]
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen: filter,
		children: /* @__PURE__ */ jsx("div", {
			className: "bg-white p-3 w-10/12 md:w-9/12 mx-auto rounded-10",
			children: /* @__PURE__ */ jsx(BillboardSorter, {
				modal: true,
				toggleModal: () => setFilter(false),
				value: draft,
				onChange: setDraft,
				onApply: applyFilters
			})
		})
	})] });
}
var Route$20 = createFileRoute("/_usersauth/ads/billboard/")({ component: Billboards });
//#endregion
//#region app/_usersauth/ads/$transaction_id/index.tsx
var card$3 = "/icons/usericon/card.svg";
var purse = "/icons/usericon/purse.svg";
var Arrowleft = "/icons/Arrowleft.svg";
var mark = "/icons/mark.svg";
var cancel$4 = "/icons/usericon/modalCancelBotton.svg";
var Payment$1 = () => {
	const params = useParams({ strict: false });
	const bookingId = Number(params.transaction_id);
	const booking = useBillboardBooking(Number.isFinite(bookingId) && bookingId > 0 ? bookingId : null);
	const walletQuery = useWallet();
	const payNow = usePayNow();
	const navigate = useNavigate();
	const amount = Number(booking.data?.negotiatedAmount ?? booking.data?.quotedTotal ?? 0);
	const walletBalance = Number(walletQuery.data?.balance ?? 0);
	const [selected, setSelected] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = (paymentMethod) => {
		if (paymentMethod === "USD Card") return;
		setIsOpen(true);
		setSelected(paymentMethod);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-10 py-24",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center font-bold",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: () => window.history.back(),
					className: "group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white",
					children: /* @__PURE__ */ jsx("img", {
						src: Arrowleft,
						alt: "arrow"
					})
				}), "Payment Method"]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "hidden items-center justify-center mx-auto mt-5 mb-10 md:flex",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "font-bold text-sm",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center",
								children: /* @__PURE__ */ jsx("img", {
									src: mark,
									alt: ""
								})
							}), /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0" })]
						}), /* @__PURE__ */ jsx("div", {
							className: "relative -left-10",
							children: "Select Campaign"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "font-bold text-sm",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center",
								children: /* @__PURE__ */ jsx("img", {
									src: mark,
									alt: ""
								})
							}), /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0" })]
						}), /* @__PURE__ */ jsx("div", {
							className: "relative -left-10",
							children: "Onboarding"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "font-bold text-sm text-left",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center",
								children: /* @__PURE__ */ jsx("img", {
									src: mark,
									alt: ""
								})
							}), /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0" })]
						}), /* @__PURE__ */ jsx("div", {
							className: "relative -left-7",
							children: "Completing"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "font-bold text-sm",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex items-center",
							children: /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full border border-ads360yellow-100" })
						}), /* @__PURE__ */ jsx("div", {
							className: "relative -left-5",
							children: "Checkout"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "font-bold md:hidden text-right mt-5 mb-10",
				children: "#4 - Checkout"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 text-center",
				children: "Choose a payment to complete your campaign."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 gap-5 my-10",
				children: [{
					image: purse,
					link: "ads/",
					name: "Wallet"
				}, {
					image: card$3,
					link: "ads/",
					name: "Flutterwave Payment"
				}].map((ad, i) => /* @__PURE__ */ jsx("div", {
					onClick: () => handleClick(ad.name),
					children: /* @__PURE__ */ jsx("div", {
						className: `${ad.name === "USD Card" ? "bg-white/50 text-gray-400" : "bg-white group cursor-pointer"} shadow flex justify-between rounded px-3 md:px-10 py-7 border border-ads360yellow-100 items-center`,
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center space-x-5",
							children: [/* @__PURE__ */ jsx("img", {
								width: 45,
								height: 45,
								alt: ad.name,
								src: ad.image
							}), /* @__PURE__ */ jsx("div", {
								className: "px-4",
								children: /* @__PURE__ */ jsx("h4", {
									className: "group-hover:text-ads360yellow-100 font-semibold",
									children: ad.name
								})
							})]
						})
					})
				}, i))
			})
		]
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen,
		children: selected === "Wallet" ? /* @__PURE__ */ jsxs("div", {
			className: "bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between mb-5",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "",
						children: "Amount"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setIsOpen(false),
						children: /* @__PURE__ */ jsx("img", {
							src: cancel$4,
							alt: "modal cancel botton",
							className: "w-5"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50",
						children: [
							" ",
							"₦",
							" "
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "p-2 w-full border rounded-r text-black/50",
						children: amount
					})]
				}),
				walletBalance < amount ? /* @__PURE__ */ jsx("div", {
					className: "my-3",
					children: /* @__PURE__ */ jsxs("p", {
						className: "text-red-700 text-xs",
						children: [
							"Not enough money on wallet, please use a different option. or click ",
							/* @__PURE__ */ jsx(Link, {
								to: "/users/wallet/fundwallet",
								className: "text-red-900 font-semibold",
								children: "here"
							}),
							" to fun wallet"
						]
					})
				}) : null,
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ jsx("button", {
						disabled: walletBalance < amount || payNow.isPending || !bookingId,
						onClick: async () => {
							if (!bookingId) return;
							try {
								await payNow.mutateAsync({
									bookingId,
									paymentMethod: "wallet"
								});
								setIsOpen(false);
								toast.success("Payment successful");
								await navigate({ to: "/users/campaign" });
							} catch {}
						},
						className: `${walletBalance < amount ? "bg-ads360gray-100 mt-5" : "bg-ads360black-100/95 hover:bg-ads360black-100 mt-10"} rounded  text-white  w-5/6 h-10`,
						children: payNow.isPending ? "Processing..." : "Proceed"
					})
				})
			]
		}) : selected === "Flutterwave Payment" ? /* @__PURE__ */ jsxs("div", {
			className: "bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between mb-5",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "",
						children: "Amount"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setIsOpen(false),
						children: /* @__PURE__ */ jsx("img", {
							src: cancel$4,
							alt: "modal cancel botton",
							className: "w-5"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50",
						children: [
							" ",
							"₦",
							" "
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "p-2 w-full border rounded-r",
						children: amount
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ jsx("button", {
						disabled: payNow.isPending || !bookingId,
						onClick: async () => {
							if (!bookingId) return;
							try {
								const link = (await payNow.mutateAsync({
									bookingId,
									paymentMethod: "flutterwave"
								}))?.data?.link;
								if (typeof link === "string" && link.length > 0) {
									window.location.href = link;
									return;
								}
								toast.error("Payment link not returned");
							} catch {}
						},
						className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-10  text-white  w-5/6 h-10 disabled:opacity-60",
						children: payNow.isPending ? "Starting..." : "Proceed"
					})
				})
			]
		}) : null
	})] });
};
var Route$19 = createFileRoute("/_usersauth/ads/$transaction_id/")({ component: Payment$1 });
//#endregion
//#region node_modules/react-icons/fa/index.esm.js
function FaAngleDown(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 320 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" }
		}]
	})(props);
}
//#endregion
//#region components/ui/Faqs.tsx
var Faqs = () => {
	const questions = [
		{
			questions: "How are the ads runned?",
			answers: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			questions: "Can I negotiate prices of ads on this platform?",
			answers: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt"
		},
		{
			questions: "Where is the 360 ads located?",
			answers: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat"
		},
		{
			questions: "Is there a mobile app?",
			answers: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
		},
		{
			questions: "How long is the verification process after registration?",
			answers: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga"
		},
		{
			questions: "How can i fund my wallet?",
			answers: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt"
		},
		{
			questions: "Who are 360 ads sponsors?",
			answers: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
		}
	];
	const [index, setIndex] = useState();
	const handleAnswers = (value) => {
		if (index === value) setIndex(void 0);
		else setIndex(value);
	};
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", {
		className: "bg-ads360light-100 pb-24",
		children: /* @__PURE__ */ jsx("div", {
			className: "md:w-8/12 w-11/12 mx-auto  bg-white rounded-10 shadow-md",
			children: questions.map((item, i) => /* @__PURE__ */ jsxs("div", {
				className: `p-4 ${questions.length !== i + 1 && "border-b border-ads360black-50"}`,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between",
					children: [item.questions, /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
						onClick: () => handleAnswers(i),
						children: /* @__PURE__ */ jsx(FaAngleDown, {
							size: 23,
							className: "text-ads360black-50"
						})
					}) })]
				}), /* @__PURE__ */ jsx("div", {
					style: { transition: "max-height 1s" },
					className: `overflow-hidden transition duration-700 ease-out pt-2 ${index === i ? "max-h-[400px]" : "max-h-0"}`,
					children: item.answers
				})]
			}, i))
		})
	}) });
};
//#endregion
//#region app/_public/_lightnavbar/faqs/index.tsx
var Faq = () => {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("section", {
		className: "bg-ads360light-100 py-24",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-11/12 md:w-10/12 xl:w-7/12",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-4xl md:text-6xl font-[600]",
				children: [/* @__PURE__ */ jsx("h3", { children: "Frequently Asked " }), /* @__PURE__ */ jsx("h3", { children: "Questions" })]
			}), /* @__PURE__ */ jsxs("div", {
				className: "md:flex flex-row-reverse justify-between my-10",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-10",
					children: /* @__PURE__ */ jsx(BlackButtons, { text: "Get in touch" })
				}), /* @__PURE__ */ jsxs("h5", { children: [
					"you can also send us a plain email if you want too ;",
					")",
					" hello@360ads.ng"
				] })]
			})]
		})
	}), /* @__PURE__ */ jsx(Faqs, {})] });
};
var Route$18 = createFileRoute("/_public/_lightnavbar/faqs/")({ component: Faq });
//#endregion
//#region app/_public/_lightnavbar/contact/index.tsx
var phone = "/icons/phone.svg";
var email = "/icons/mail.svg";
var time = "/icons/time.svg";
var React360Logo = "/logo/360white.svg";
var instagram = "/icons/Instagram2.svg";
var whatsapp$1 = "/icons/Whatsapp.svg";
var twitter$1 = "/icons/twitter2.svg";
var ReactAdsLogo = "/logo/adsWhite.svg";
var Contact = () => {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "bg-ads360light-100 py-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-11/12 md:w-10/12 xl:w-7/12",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-4xl md:text-6xl font-[600]",
					children: [
						/* @__PURE__ */ jsx("h3", { children: "ready when" }),
						/* @__PURE__ */ jsx("h3", { children: "you are—Let’s kickstart" }),
						/* @__PURE__ */ jsx("h3", { children: "your campaign." })
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:flex flex-row-reverse justify-between my-10",
					children: [/* @__PURE__ */ jsx("div", {
						className: "mb-10",
						children: /* @__PURE__ */ jsx(BlackButtons, { text: "Get in touch" })
					}), /* @__PURE__ */ jsxs("h5", { children: [
						"you can also send us a plain email if you want too ;",
						")",
						" hello@360ads.ng"
					] })]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-ads360black-100 py-24 text-ads360light-100",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-11/12 md:w-10/12 xl:w-9/12",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "md:flex my-8",
					children: [/* @__PURE__ */ jsx("div", {
						className: "basis-8/12 text-right md:text-left",
						children: /* @__PURE__ */ jsx("h5", {
							className: "text-ads360yellow-100",
							children: "Our Office"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "basis-4/12 text-right",
						children: [/* @__PURE__ */ jsx("h6", { children: "King Court estate," }), /* @__PURE__ */ jsx("h6", { children: "Lagos, Nigeria." })]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col-reverse md:flex-row md:justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "basis-5/12 mt-5 md:mt-0",
						children: [
							"If you have ideas for your brand, your business, or the world at large, we’re here to listen and collaborate. We can build a more human future ",
							/* @__PURE__ */ jsx("span", {
								className: "text-ads360yellow-100",
								children: "together"
							}),
							"."
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "basis-4/12",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("h5", {
								className: "flex justify-end my-2 space-x-1",
								children: [/* @__PURE__ */ jsx("img", {
									src: phone,
									alt: "phone number"
								}), /* @__PURE__ */ jsx("span", { children: " +2347082436214" })]
							}),
							/* @__PURE__ */ jsxs("h5", {
								className: "flex justify-end my-2 space-x-1",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: email,
										alt: "email"
									}),
									/* @__PURE__ */ jsx("span", { children: " hello@360ads.ng" }),
									" "
								]
							}),
							/* @__PURE__ */ jsxs("h5", {
								className: "flex justify-end my-2 space-x-1",
								children: [/* @__PURE__ */ jsx("img", {
									src: time,
									alt: "time"
								}), /* @__PURE__ */ jsx("span", { children: " 24/7" })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-end my-2",
								children: [/* @__PURE__ */ jsx("img", {
									src: React360Logo,
									className: "hover:-rotate-90 transistion duration-300",
									alt: "logo"
								}), /* @__PURE__ */ jsx("img", {
									src: ReactAdsLogo,
									alt: ""
								})]
							})
						] }), /* @__PURE__ */ jsx("div", {})]
					})]
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-ads360gray-100 py-24 text-ads360black-100",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto w-11/12 md:w-10/12 xl:w-7/12",
				children: /* @__PURE__ */ jsxs("div", {
					className: "md:flex",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-2xl lg:text-4xl mb-5 lg:mb-4 basis-10/12",
						children: "Looking forward to working with amazing brands and businesses"
					}), /* @__PURE__ */ jsx("div", {
						className: "flex justify-end basis-2/12",
						children: /* @__PURE__ */ jsxs("div", {
							className: "border-l border-[#3C3C3B] pl-7",
							children: [
								/* @__PURE__ */ jsx(Link, {
									to: " https://wa.me/+2347082436214?text=urlencodedtext",
									children: /* @__PURE__ */ jsx("img", {
										src: whatsapp$1,
										className: "my-3",
										alt: "whatsapp"
									})
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "https://www.instagram.com/360ads.ng/",
									children: /* @__PURE__ */ jsx("img", {
										src: instagram,
										className: "my-3",
										alt: "instagram"
									})
								}),
								/* @__PURE__ */ jsx(Link, {
									to: "https://twitter.com/360adsNg",
									children: /* @__PURE__ */ jsx("img", {
										src: twitter$1,
										className: "my-3",
										alt: "twitter"
									})
								})
							]
						})
					})]
				})
			})
		})
	] });
};
var Route$17 = createFileRoute("/_public/_lightnavbar/contact/")({ component: Contact });
//#endregion
//#region components/buttons/BlackButtonsLong.tsx
var BlackButtonsLong = ({ text }) => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("span", {
		className: "group flex w-[216px]",
		children: [/* @__PURE__ */ jsx("button", {
			className: "group-hover:translate-x-10 w-44 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100 transition rounded-10 text-ads360light-100 bg-ads360black-100 h-12",
			children: text
		}), /* @__PURE__ */ jsx("button", {
			className: "group-hover:-translate-x-44 w-12 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100  transition text-ads360light-100 bg-ads360black-100 mx-1 h-12 flex justify-center items-center rounded-[50%] color-white",
			children: /* @__PURE__ */ jsx(FiArrowRight, { size: 28 })
		})]
	}) });
};
//#endregion
//#region app/_public/_lightnavbar/about/index.tsx
var manInfluencer1 = "//images/maninfluencer1.png";
var About = () => {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "bg-ads360light-100 pt-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-4xl md:text-6xl px-5 font-[600] md:text-center",
				children: [/* @__PURE__ */ jsx("h3", { children: "building concurrent" }), /* @__PURE__ */ jsx("h3", { children: "——— projects together" })]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-ads360light-100 pt-14 md:pt-24",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-11/12 md:w-10/12 xl:w-9/12",
				children: [
					/* @__PURE__ */ jsx("h4", {
						className: "text-ads360yellow-100 mb-10",
						children: "Culture @ 360 ads"
					}),
					/* @__PURE__ */ jsx("p", { children: "360 Ads NG is a tech company that specializes in Digital Marketing. Our recently developed web-based digital campaign manager enables corporations & SME's to promote and target adverts to prospective customers." }),
					/* @__PURE__ */ jsx("br", {}),
					/* @__PURE__ */ jsx("p", { children: "Our aim is to aid organizations drive digital campaign model via our collections of tools specifically developed to manage the design process, generate leads, improve user responsive ness and efficiently deliver advert contents." }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex md:justify-between flex-col-reverse md:flex-row",
						children: [/* @__PURE__ */ jsx("div", {
							className: "pt-10 md:pt-20 basis-1/2 grid grid-col-1 place-content-end md:place-content-start",
							children: /* @__PURE__ */ jsx(BlackButtonsLong, { text: "Advertise with Us" })
						}), /* @__PURE__ */ jsx("div", {
							className: "grid grid-col-1 place-content-end mt-5 pl-10 md:pl-0 md:p-10 md:place-content-start",
							children: /* @__PURE__ */ jsx("img", {
								src: manInfluencer1,
								alt: "..."
							})
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mb-16",
			children: /* @__PURE__ */ jsx(HowWeThink, {})
		})
	] });
};
var Route$16 = createFileRoute("/_public/_lightnavbar/about/")({ component: About });
//#endregion
//#region components/slides/InViewX.tsx
var SectionX = ({ children, val }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false });
	return /* @__PURE__ */ jsx("section", {
		ref,
		children: /* @__PURE__ */ jsx("span", {
			style: {
				transform: isInView ? "none" : `translateX(50px)`,
				opacity: isInView ? 1 : 0,
				transition: "all cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
			},
			className: "-translate-x-20 block opacity-0",
			children
		})
	});
};
//#endregion
//#region components/slides/InViewY.tsx
var SectionY = ({ children, val }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false });
	return /* @__PURE__ */ jsx("section", {
		ref,
		children: /* @__PURE__ */ jsx("span", {
			style: {
				transform: isInView ? "none" : `translateY(${val}px)`,
				opacity: isInView ? 1 : 0,
				transition: "all cubic-bezier(0.17, 0.55, 0.55, 1) 1s"
			},
			className: "-translate-y-32 block opacity-0",
			children
		})
	});
};
//#endregion
//#region app/_public/_darknavbar/discovery/index.tsx
var Group = "/images/Group.png";
var digital = "/images/digitalads3.png";
var billboard = "/images/Billboard.png";
var happy = "/images/happy.png";
var influencer = "/images/influencer1.png";
var Yellowdot = "/icons/yellowdot.svg";
var manads2 = "/images/manads2.png";
var Service = () => {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx("section", {
			className: "bg-ads360black-100 pt-20 text-ads360light-100",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-4xl md:text-6xl px-5 font-[600] md:text-center",
				children: [/* @__PURE__ */ jsxs("h3", { children: ["services / ", /* @__PURE__ */ jsx("span", {
					className: "text-ads360black-50",
					children: "we offer"
				})] }), /* @__PURE__ */ jsx("h3", { children: "this is what we do best." })]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			id: "reach",
			className: "bg-ads360black-100 pb-24 pt-16 text-ads360light-100",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-11/12 md:w-10/12 xl:w-9/12",
				children: [
					/* @__PURE__ */ jsx("h5", {
						className: "text-ads360yellow-100  text-right mb-14",
						children: "Discorvery @ 360 ads"
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-justify md:text-center",
						children: "At 360ads we offer an extensive range of automated advertising solutions that are tailored to suit your unique goals and target audience. Our platform simplifies and automates the entire process, allowing you to effortlessly manage your ad placements and achieve maximum results."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "md:flex flex-row-reverse mt-10",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "bg-ads360black-50 rounded-10 drop-shadow-2xl basis-1/3 pt-2",
							children: [
								/* @__PURE__ */ jsxs("h3", {
									className: "mb-4 px-2",
									children: ["Grow Your Business with our seamless ", /* @__PURE__ */ jsx("span", {
										className: "text-ads360yellow-100",
										children: "options..."
									})]
								}),
								/* @__PURE__ */ jsx("h4", {
									className: "mb-4 text-sm px-2 text-justify",
									children: " We are your comprehensive solution for automating your ad placements, offering a platform that streamlines the entire process"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mx-auto w-1/2 md:w-3/4 xl:w-3/5 mb-10 md:mb-0",
									children: /* @__PURE__ */ jsx("img", {
										src: Group,
										className: "mx-auto w-full  sm:w-1/2 md:w-full",
										alt: "..."
									})
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex text-center justify-evenly basis-3/5 md:mt-56",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("h2", {
										className: "text-2xl font-bold",
										children: [/* @__PURE__ */ jsx(CountUp, {
											end: 123,
											duration: 1,
											enableScrollSpy: true
										}), /* @__PURE__ */ jsx("span", {
											className: "text-ads360yellow-100",
											children: "+"
										})]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "",
										children: "Completed"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "",
										children: "Sites"
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("h2", {
										className: "text-2xl font-bold",
										children: [/* @__PURE__ */ jsx(CountUp, {
											end: 1300,
											duration: 1,
											enableScrollSpy: true
										}), /* @__PURE__ */ jsx("span", {
											className: "text-ads360yellow-100",
											children: "+"
										})]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "",
										children: "Happy"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "",
										children: "Customer"
									})
								] }),
								/* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsxs("h2", {
										className: "text-2xl font-bold",
										children: [/* @__PURE__ */ jsx(CountUp, {
											end: 100,
											duration: 1,
											enableScrollSpy: true
										}), /* @__PURE__ */ jsx("span", {
											className: "text-ads360yellow-100",
											children: "%"
										})]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "",
										children: "Client"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "",
										children: "Reach"
									})
								] })
							]
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "bg-ads360light-100 py-20",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto w-11/12 md:w-10/12 xl:w-9/12",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-14",
						children: [/* @__PURE__ */ jsx("h5", {
							className: "text-ads360yellow-100  mb-8",
							children: "Our Services"
						}), /* @__PURE__ */ jsx("h3", {
							className: "text-2xl lg:text-4xl lg:mb-4 mb-2",
							children: "Discover Our Automated Advertising Solutions"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hidden md:block",
						children: [
							/* @__PURE__ */ jsxs("div", {
								id: "influencer",
								className: "flex my-10",
								children: [/* @__PURE__ */ jsx("div", {
									className: "basis-1/2 -rotate-12",
									children: /* @__PURE__ */ jsxs(SectionX, {
										val: -200,
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex mb-2 justify-center",
											children: [/* @__PURE__ */ jsx("span", {
												className: "flex items-center pr-3",
												children: /* @__PURE__ */ jsx("img", {
													src: Yellowdot,
													alt: "..."
												})
											}), " Influencer Marketing"]
										}), /* @__PURE__ */ jsx("img", {
											src: influencer,
											alt: "..."
										})]
									})
								}), /* @__PURE__ */ jsx("div", {
									className: "basis-1/2 grid grid-cols-1 content-center",
									children: /* @__PURE__ */ jsx(SectionY, {
										val: -200,
										children: "Leverage the power of influencers to amplify your brand's reach. Our platform connects you with a diverse network of influencers, allowing you to tap into their engaged audiences and drive brand awareness."
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								id: "twitter",
								className: "flex flex-row-reverse my-10 space-x-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "basis-1/2 rotate-6",
									children: /* @__PURE__ */ jsxs(SectionX, {
										val: 200,
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex mb-2 justify-center",
											children: [/* @__PURE__ */ jsx("span", {
												className: "flex items-center",
												children: /* @__PURE__ */ jsx("img", {
													src: Yellowdot,
													alt: "..."
												})
											}), "Twitter Spaces"]
										}), /* @__PURE__ */ jsx("img", {
											src: digital,
											alt: "..."
										})]
									})
								}), /* @__PURE__ */ jsx("div", {
									className: "basis-1/2 grid grid-cols-1 content-center",
									children: /* @__PURE__ */ jsx(SectionY, {
										val: 200,
										children: "Connect with Influencers on Twitter to Host Engaging Twitter Spaces 360ads connects you with influential voices on Twitter, empowering you to host interactive audio sessions that foster engagement and build brand loyalty. Amplify your reach and create valuable connections with your target audience through our network of influential partners. Discover the power of hosting impactful Twitter Spaces with 360ads"
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								id: "sms",
								className: "flex my-10 space-x-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "basis-1/2 -rotate-12",
									children: /* @__PURE__ */ jsxs(SectionX, {
										val: -200,
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex mb-2 justify-center",
											children: [/* @__PURE__ */ jsx("span", {
												className: "flex items-center",
												children: /* @__PURE__ */ jsx("img", {
													src: Yellowdot,
													alt: "..."
												})
											}), "SMS Campaigns"]
										}), /* @__PURE__ */ jsx("img", {
											src: happy,
											alt: "..."
										})]
									})
								}), /* @__PURE__ */ jsx("div", {
									className: "basis-1/2 grid grid-cols-1 content-center",
									children: /* @__PURE__ */ jsx(SectionY, {
										val: -200,
										children: "Engage customers directly through personalised SMS campaigns. Our platform enables you to create and send targeted messages, keeping your audience informed, and driving conversions."
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								id: "billboard",
								className: "flex flex-row-reverse my-10 space-x-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "basis-1/2 rotate-6",
									children: /* @__PURE__ */ jsxs(SectionX, {
										val: 200,
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex mb-2 justify-center",
											children: [/* @__PURE__ */ jsx("span", {
												className: "flex items-center",
												children: /* @__PURE__ */ jsx("img", {
													src: Yellowdot,
													alt: "..."
												})
											}), "Billboard Advertisements"]
										}), /* @__PURE__ */ jsx("img", {
											src: billboard,
											alt: "..."
										})]
									})
								}), /* @__PURE__ */ jsx("div", {
									className: "basis-1/2 grid grid-cols-1 content-center",
									children: /* @__PURE__ */ jsx(SectionY, {
										val: 200,
										children: "Capture attention and make a lasting impact with our billboard advertising module. We connect you to billboards strategically placed in high-traffic areas, ensuring maximum visibility for your brand."
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								id: "whatsapp",
								className: "flex my-10 space-x-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "basis-1/2 -rotate-12",
									children: /* @__PURE__ */ jsxs(SectionX, {
										val: -200,
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex mb-2 justify-center",
											children: [/* @__PURE__ */ jsx("span", {
												className: "flex items-center",
												children: /* @__PURE__ */ jsx("img", {
													src: Yellowdot,
													alt: "..."
												})
											}), "WhatsApp Status Ads"]
										}), /* @__PURE__ */ jsx("img", {
											src: digital,
											alt: "..."
										})]
									})
								}), /* @__PURE__ */ jsx("div", {
									className: "basis-1/2 grid grid-cols-1 content-center",
									children: /* @__PURE__ */ jsx(SectionY, {
										val: -200,
										children: "Showcase your brand in the WhatsApp ecosystem. With our platform, you can seamlessly place ads in WhatsApp status, reaching a vast user base and generating buzz around your products or services."
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								id: "blog",
								className: "flex flex-row-reverse my-10 space-x-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "basis-1/2 rotate-6",
									children: /* @__PURE__ */ jsxs(SectionX, {
										val: 200,
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex mb-2 justify-center",
											children: [/* @__PURE__ */ jsx("span", {
												className: "flex items-center",
												children: /* @__PURE__ */ jsx("img", {
													src: Yellowdot,
													alt: "..."
												})
											}), "Blog Advertisements"]
										}), /* @__PURE__ */ jsx("img", {
											src: billboard,
											alt: "..."
										})]
									})
								}), /* @__PURE__ */ jsx("div", {
									className: "basis-1/2 grid grid-cols-1 content-center",
									children: /* @__PURE__ */ jsx(SectionY, {
										val: 200,
										children: "Expand your online presence by placing ads on popular blogs. Our platform allows you to negotiate and secure ad placements on relevant blogs, effectively reaching your target audience."
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "md:hidden",
						children: /* @__PURE__ */ jsx(MobileCaruosel, { display: "hidden" })
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Why360, {}),
		/* @__PURE__ */ jsx(NewsLetter, { img: manads2 })
	] });
};
var Route$15 = createFileRoute("/_public/_darknavbar/discovery/")({ component: Service });
//#endregion
//#region lib/nigeriaStatesLgas.ts
var NIGERIA_STATES_LGAS = [
	{
		id: "lagos",
		name: "Lagos",
		lgas: [
			"Ikeja",
			"Surulere",
			"Eti-Osa",
			"Kosofe"
		]
	},
	{
		id: "abuja",
		name: "FCT Abuja",
		lgas: [
			"Abaji",
			"Bwari",
			"Gwagwalada",
			"Municipal"
		]
	},
	{
		id: "rivers",
		name: "Rivers",
		lgas: [
			"Port Harcourt",
			"Obio-Akpor",
			"Eleme"
		]
	}
];
function getStateById(id) {
	return NIGERIA_STATES_LGAS.find((s) => s.id === id);
}
//#endregion
//#region app/_access/vendor-access/onboarding/index.tsx
var inputBase = "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded min-h-[38px] md:min-h-[45px]";
function extractToken() {
	if (typeof window === "undefined") return null;
	const token = new URLSearchParams(window.location.search).get("token");
	return token?.trim() ? token.trim() : null;
}
function errorMessage(error) {
	if (error instanceof ApiError) return error.message;
	if (error instanceof Error) return error.message;
	return "Something went wrong. Please try again.";
}
function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const fr = new FileReader();
		fr.onload = () => resolve(fr.result);
		fr.onerror = () => reject(fr.error);
		fr.readAsDataURL(file);
	});
}
function isBillboardVendor(accountType) {
	return accountType === "billboard_owner" || accountType === "billboard";
}
function initialWizardStepFromBackend(backendStep) {
	if (backendStep === "account") return 1;
	if (backendStep === "business") return 2;
	if (backendStep === "contact") return 3;
	if (backendStep === "fix") return 2;
	return 1;
}
function BillboardOnboardingWizard({ inviteToken, backendStep, inviteEmail, savedUser, savedBusiness, onAfterSave }) {
	const [wizardStep, setWizardStep] = useState(() => initialWizardStepFromBackend(backendStep));
	const [submitting, setSubmitting] = useState(false);
	const [formError, setFormError] = useState(null);
	const [email] = useState(inviteEmail);
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPw, setShowPw] = useState(false);
	const [showPw2, setShowPw2] = useState(false);
	const [businessName, setBusinessName] = useState("");
	const [businessAddress, setBusinessAddress] = useState("");
	const [cacPreview, setCacPreview] = useState(null);
	const [cacFile, setCacFile] = useState(null);
	const [cacServerUrl, setCacServerUrl] = useState(null);
	const [logoPreview, setLogoPreview] = useState(null);
	const [logoFile, setLogoFile] = useState(null);
	const [logoServerUrl, setLogoServerUrl] = useState(null);
	const [website, setWebsite] = useState("");
	const [coverageRows, setCoverageRows] = useState([{
		state: "",
		lga: []
	}]);
	const [contactName, setContactName] = useState("");
	const [contactPhone, setContactPhone] = useState("");
	const [contactEmail, setContactEmail] = useState("");
	const [contactPosition, setContactPosition] = useState("");
	useEffect(() => {
		if (savedUser?.phone) setPhone(savedUser.phone);
	}, [savedUser]);
	useEffect(() => {
		if (!savedBusiness) return;
		setBusinessName(savedBusiness.businessName ?? "");
		setBusinessAddress(savedBusiness.businessAddress ?? "");
		setWebsite(savedBusiness.businessWebsite ?? "");
		if (savedBusiness.cac) {
			setCacServerUrl(savedBusiness.cac);
			setCacPreview(savedBusiness.cac);
		}
		if (savedBusiness.businessLogo) {
			setLogoServerUrl(savedBusiness.businessLogo);
			setLogoPreview(savedBusiness.businessLogo);
		}
		if (savedBusiness.billboardCoverage?.length) setCoverageRows(savedBusiness.billboardCoverage.map((c) => ({
			state: c.state,
			lga: c.lga ?? []
		})));
		setContactName(savedBusiness.contactPersonName ?? "");
		setContactPhone(savedBusiness.contactPersonPhone ?? "");
		setContactEmail(savedBusiness.contactPersonEmail ?? "");
		setContactPosition(savedBusiness.contactPersonPosition ?? "");
	}, [savedBusiness]);
	const setRowState = (index, stateId) => {
		setCoverageRows((rows) => rows.map((r, i) => i === index ? {
			state: stateId,
			lga: []
		} : r));
	};
	const addCoverageRow = () => {
		setCoverageRows((rows) => [...rows, {
			state: "",
			lga: []
		}]);
	};
	const removeCoverageRow = (index) => {
		setCoverageRows((rows) => rows.filter((_, i) => i !== index));
	};
	const toggleLga = (rowIndex, lgaName) => {
		setCoverageRows((rows) => rows.map((r, i) => {
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
	const hasCacOrServer = Boolean(cacFile) || Boolean(cacServerUrl) || Boolean(cacPreview && !cacPreview.startsWith("blob:"));
	const canGoNext = wizardStep === 1 ? Boolean(phone.trim() && password && password === confirmPassword) : wizardStep === 2 ? Boolean(businessName.trim() && businessAddress.trim() && hasCacOrServer && coverageRows.some((r) => r.state && r.lga.length > 0)) : Boolean(contactName.trim() && contactPhone.trim() && contactEmail.trim() && contactPosition.trim());
	const handleContinueStep1 = async () => {
		if (!canGoNext || wizardStep !== 1) return;
		setFormError(null);
		setSubmitting(true);
		try {
			await billboardOwnerSignup({
				inviteToken,
				step: 1,
				phoneNumber: phone.trim(),
				password
			});
			await onAfterSave();
			setWizardStep(2);
		} catch (e) {
			setFormError(errorMessage(e));
		} finally {
			setSubmitting(false);
		}
	};
	const handleContinueStep2 = async () => {
		if (!canGoNext || wizardStep !== 2) return;
		setFormError(null);
		setSubmitting(true);
		try {
			const coverage = coverageRows.filter((r) => r.state && r.lga.length).map((r) => ({
				state: r.state,
				lga: r.lga
			}));
			const payload = {
				inviteToken,
				step: 2,
				businessName: businessName.trim(),
				address: businessAddress.trim(),
				billboardCoverage: coverage,
				website: website.trim() || void 0
			};
			if (cacFile) payload.cacDataUrl = await fileToDataUrl(cacFile);
			else if (cacServerUrl) payload.cacUrl = cacServerUrl;
			if (logoFile) payload.logoDataUrl = await fileToDataUrl(logoFile);
			else if (logoServerUrl) payload.logoUrl = logoServerUrl;
			await billboardOwnerSignup(payload);
			await onAfterSave();
			setWizardStep(3);
		} catch (e) {
			setFormError(errorMessage(e));
		} finally {
			setSubmitting(false);
		}
	};
	const handleSubmitStep3 = async () => {
		if (!canGoNext || wizardStep !== 3) return;
		setFormError(null);
		setSubmitting(true);
		try {
			await billboardOwnerSignup({
				inviteToken,
				step: 3,
				contactName: contactName.trim(),
				contactPhone: contactPhone.trim(),
				contactEmail: contactEmail.trim(),
				contactPosition: contactPosition.trim()
			});
			await onAfterSave();
		} catch (e) {
			setFormError(errorMessage(e));
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-4",
		children: [
			formError && /* @__PURE__ */ jsx("p", {
				className: "text-red-600 text-sm mb-3",
				role: "alert",
				children: formError
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-center gap-2 text-sm mb-6",
				children: [
					1,
					2,
					3
				].map((n) => /* @__PURE__ */ jsxs("span", {
					className: `rounded-full px-3 py-1 ${wizardStep === n ? "bg-ads360yellow-100 text-black font-medium" : "bg-[#E4E4E4] text-gray-700"}`,
					children: [
						n,
						". ",
						n === 1 ? "Account" : n === 2 ? "Business" : "Contact"
					]
				}, n))
			}),
			wizardStep === 1 && /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h3", {
					className: "text-xl font-semibold mb-4",
					children: "Step 1 — Your account"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Email" }), /* @__PURE__ */ jsx("input", {
						value: email,
						disabled: true,
						className: `${inputBase} opacity-70`
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [
						/* @__PURE__ */ jsx("label", { children: "Phone number" }),
						/* @__PURE__ */ jsx("input", {
							className: inputBase,
							value: phone,
							onChange: (e) => setPhone(e.target.value),
							placeholder: "+2348012345678"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-xs text-gray-600 mt-1",
							children: "International format (E.164)."
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Password" }), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("input", {
							type: showPw ? "text" : "password",
							className: inputBase,
							value: password,
							onChange: (e) => setPassword(e.target.value)
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700",
							onClick: () => setShowPw((s) => !s),
							children: showPw ? "Hide" : "Show"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Confirm password" }), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("input", {
							type: showPw2 ? "text" : "password",
							className: inputBase,
							value: confirmPassword,
							onChange: (e) => setConfirmPassword(e.target.value)
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-700",
							onClick: () => setShowPw2((s) => !s),
							children: showPw2 ? "Hide" : "Show"
						})]
					})]
				})
			] }),
			wizardStep === 2 && /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h3", {
					className: "text-xl font-semibold mb-4",
					children: "Step 2 — Business details"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Business name" }), /* @__PURE__ */ jsx("input", {
						className: inputBase,
						value: businessName,
						onChange: (e) => setBusinessName(e.target.value)
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Business address" }), /* @__PURE__ */ jsx("input", {
						className: inputBase,
						value: businessAddress,
						onChange: (e) => setBusinessAddress(e.target.value)
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "CAC (image)" }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 flex-wrap",
						children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "cacFile",
								className: "inline-flex items-center justify-center rounded bg-ads360yellow-100 px-3 py-2 cursor-pointer text-sm",
								children: "Upload CAC"
							}),
							/* @__PURE__ */ jsx("input", {
								id: "cacFile",
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (e) => {
									const f = e.target.files?.[0];
									if (!f) return;
									setCacFile(f);
									setCacPreview(URL.createObjectURL(f));
								}
							}),
							cacPreview && /* @__PURE__ */ jsx("img", {
								alt: "CAC",
								src: cacPreview,
								className: "h-14 w-14 rounded object-cover bg-white"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Business website (optional)" }), /* @__PURE__ */ jsx("input", {
						className: inputBase,
						value: website,
						onChange: (e) => setWebsite(e.target.value),
						placeholder: "https://"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Business logo (optional)" }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 flex-wrap",
						children: [
							/* @__PURE__ */ jsx("label", {
								htmlFor: "logoFile",
								className: "inline-flex items-center justify-center rounded border border-gray-400 px-3 py-2 cursor-pointer text-sm",
								children: "Upload logo"
							}),
							/* @__PURE__ */ jsx("input", {
								id: "logoFile",
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (e) => {
									const f = e.target.files?.[0];
									if (!f) return;
									setLogoFile(f);
									setLogoPreview(URL.createObjectURL(f));
								}
							}),
							logoPreview && /* @__PURE__ */ jsx("img", {
								alt: "Logo",
								src: logoPreview,
								className: "h-14 w-14 rounded object-cover bg-white"
							})
						]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-medium",
								children: "Billboard coverage"
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "text-sm text-ads360yellow-100",
								onClick: addCoverageRow,
								children: "+ Add state"
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-xs text-gray-600 mb-3",
							children: [
								"For each state, tap the circle next to an LGA to include it. Output shape:",
								" ",
								/* @__PURE__ */ jsx("code", {
									className: "text-[11px]",
									children: "[{ state, lga: [] }]"
								})
							]
						}),
						coverageRows.map((row, idx) => {
							const stateDef = row.state ? getStateById(row.state) : void 0;
							return /* @__PURE__ */ jsxs("div", {
								className: "mb-4 rounded border border-gray-200 p-3 bg-[#fafafa]",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between items-center mb-2",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "text-sm font-medium",
											children: ["State ", idx + 1]
										}), coverageRows.length > 1 && /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "text-xs text-red-600",
											onClick: () => removeCoverageRow(idx),
											children: "Remove"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "my-2",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-sm",
											children: "State"
										}), /* @__PURE__ */ jsxs("select", {
											className: inputBase,
											value: row.state,
											onChange: (e) => setRowState(idx, e.target.value),
											children: [/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Select state"
											}), NIGERIA_STATES_LGAS.map((s) => /* @__PURE__ */ jsx("option", {
												value: s.id,
												children: s.name
											}, s.id))]
										})]
									}),
									stateDef && /* @__PURE__ */ jsxs("div", {
										className: "my-2",
										children: [/* @__PURE__ */ jsx("label", {
											className: "text-sm block mb-2",
											children: "LGAs"
										}), /* @__PURE__ */ jsx("div", {
											className: "flex flex-col gap-2 max-h-[min(280px,50vh)] overflow-y-auto pr-1",
											children: stateDef.lgas.map((lga) => {
												const selected = row.lga.includes(lga);
												return /* @__PURE__ */ jsxs("button", {
													type: "button",
													role: "checkbox",
													"aria-checked": selected,
													onClick: () => toggleLga(idx, lga),
													className: `flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${selected ? "border-ads360yellow-100 bg-ads360yellow-100/15" : "border-gray-200 bg-white hover:bg-gray-50"}`,
													children: [/* @__PURE__ */ jsx("span", {
														className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${selected ? "border-ads360yellow-100 bg-ads360yellow-100 text-black" : "border-gray-400 bg-white"}`,
														"aria-hidden": true,
														children: selected ? /* @__PURE__ */ jsx("svg", {
															className: "h-3.5 w-3.5",
															viewBox: "0 0 12 12",
															fill: "none",
															xmlns: "http://www.w3.org/2000/svg",
															children: /* @__PURE__ */ jsx("path", {
																d: "M2 6l3 3 5-5",
																stroke: "currentColor",
																strokeWidth: "2",
																strokeLinecap: "round",
																strokeLinejoin: "round"
															})
														}) : null
													}), /* @__PURE__ */ jsx("span", {
														className: "flex-1",
														children: lga
													})]
												}, lga);
											})
										})]
									})
								]
							}, idx);
						})
					]
				})
			] }),
			wizardStep === 3 && /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h3", {
					className: "text-xl font-semibold mb-4",
					children: "Step 3 — Contact person"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Contact name" }), /* @__PURE__ */ jsx("input", {
						className: inputBase,
						value: contactName,
						onChange: (e) => setContactName(e.target.value)
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Contact phone" }), /* @__PURE__ */ jsx("input", {
						className: inputBase,
						value: contactPhone,
						onChange: (e) => setContactPhone(e.target.value),
						placeholder: "+234..."
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Contact email" }), /* @__PURE__ */ jsx("input", {
						type: "email",
						className: inputBase,
						value: contactEmail,
						onChange: (e) => setContactEmail(e.target.value)
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "my-3",
					children: [/* @__PURE__ */ jsx("label", { children: "Position / role" }), /* @__PURE__ */ jsx("input", {
						className: inputBase,
						value: contactPosition,
						onChange: (e) => setContactPosition(e.target.value)
					})]
				})
			] }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap justify-between gap-3 mt-8",
				children: [
					wizardStep > 1 && /* @__PURE__ */ jsx("button", {
						type: "button",
						disabled: submitting,
						className: "rounded border px-4 py-2 text-sm disabled:opacity-50",
						onClick: () => setWizardStep((s) => s > 1 ? s - 1 : s),
						children: "Back"
					}),
					/* @__PURE__ */ jsx("div", { className: "flex-1" }),
					wizardStep < 3 ? /* @__PURE__ */ jsx("button", {
						type: "button",
						disabled: !canGoNext || submitting,
						className: "rounded bg-ads360yellow-100 px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed",
						onClick: () => {
							if (wizardStep === 1) handleContinueStep1();
							else if (wizardStep === 2) handleContinueStep2();
						},
						children: submitting ? "Saving…" : "Continue"
					}) : /* @__PURE__ */ jsx(BlackButtons, {
						text: submitting ? "Submitting…" : "Submit application",
						isPending: submitting,
						handleClick: () => void handleSubmitStep3()
					})
				]
			})
		]
	});
}
var VendorAccessOnboarding = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);
	const token = useMemo(() => extractToken(), []);
	const loadOnboarding = useCallback(async () => {
		if (!token) return;
		setData(await vendorOnboarding({ inviteToken: token }));
	}, [token]);
	useEffect(() => {
		let alive = true;
		(async () => {
			if (!token) {
				setError("Missing invite token.");
				setLoading(false);
				return;
			}
			try {
				await loadOnboarding();
			} catch (e) {
				if (!alive) return;
				setError(errorMessage(e));
			} finally {
				if (alive) setLoading(false);
			}
		})();
		return () => {
			alive = false;
		};
	}, [token, loadOnboarding]);
	const email = data && "email" in data ? data.email : "";
	const accountType = data && "accountType" in data ? data.accountType : void 0;
	const backendStep = data && "step" in data ? data.step : null;
	const savedUser = data && "user" in data && data.user && typeof data.user === "object" && "id" in data.user ? data.user : null;
	const savedBusiness = data && "business" in data && data.business && typeof data.business === "object" && "id" in data.business ? data.business : null;
	const rejectionReason = backendStep === "fix" ? savedBusiness?.verificationRejectionReason : void 0;
	return /* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash",
		children: [/* @__PURE__ */ jsx("div", {
			className: "p-10",
			children: /* @__PURE__ */ jsx(BlackLogo, {})
		}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-11/12 md:w-7/12 lg:w-6/12 py-12",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-center text-4xl",
					children: "Vendor onboarding"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-center text-ads360yellow-100 font-light my-3",
					children: "Validating your invite link…"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "border border-ads360yellow-100 bg-white rounded-10 my-5 p-4 md:p-6",
					children: [
						loading && /* @__PURE__ */ jsx("p", {
							className: "text-center",
							children: "Validating token..."
						}),
						!loading && error && /* @__PURE__ */ jsxs("div", {
							className: "text-center",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "text-red-600 font-medium",
									children: error
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-600 mt-2",
									children: "If you believe this is a mistake, request a new invite link."
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-5",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/signin",
										className: "text-ads360yellow-100",
										children: "Go to sign in"
									})
								})
							]
						}),
						!loading && !error && data && "status" in data && /* @__PURE__ */ jsxs("div", {
							className: "text-center",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "text-xl font-semibold",
									children: "Application submitted"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-sm text-gray-700 mt-2",
									children: "We already received your onboarding details."
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "text-sm text-gray-600 mt-2",
									children: [
										"Status:",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "font-medium",
											children: data.businessStatus ?? "pending"
										})
									]
								})
							]
						}),
						!loading && !error && data && "step" in data && /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "rounded bg-ads360-hash p-3 text-sm text-gray-700 mb-2",
								children: [/* @__PURE__ */ jsxs("div", { children: ["Invite email: ", /* @__PURE__ */ jsx("span", {
									className: "font-medium",
									children: email
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "mt-1",
									children: [
										"Vendor type:",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "font-medium",
											children: accountType ?? "—"
										})
									]
								})]
							}),
							backendStep && token && isBillboardVendor(accountType) && (backendStep === "account" || backendStep === "business" || backendStep === "contact" || backendStep === "fix") && /* @__PURE__ */ jsxs("div", { children: [(backendStep === "business" || backendStep === "fix") && /* @__PURE__ */ jsx("div", {
								className: "rounded bg-amber-50 border border-amber-200 p-3 text-sm text-gray-800 mb-4",
								children: backendStep === "fix" ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "font-medium text-amber-900",
									children: "Your application needs updates before we can approve it."
								}), rejectionReason ? /* @__PURE__ */ jsxs("p", {
									className: "mt-2 text-gray-800",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-medium",
										children: "Reason: "
									}), rejectionReason]
								}) : /* @__PURE__ */ jsx("p", {
									className: "mt-2 text-gray-700",
									children: "Update your details below and resubmit."
								})] }) : "Complete your business and contact information."
							}), /* @__PURE__ */ jsx(BillboardOnboardingWizard, {
								inviteToken: token,
								backendStep,
								inviteEmail: email,
								savedUser,
								savedBusiness,
								onAfterSave: loadOnboarding
							})] }),
							backendStep && accountType && !isBillboardVendor(accountType) && /* @__PURE__ */ jsxs("p", {
								className: "text-center text-gray-700 mt-6",
								children: [
									"Onboarding for this vendor type (",
									String(accountType),
									") is not available yet."
								]
							})
						] })
					]
				})
			]
		})]
	});
};
var Route$14 = createFileRoute("/_access/vendor-access/onboarding/")({ component: VendorAccessOnboarding });
//#endregion
//#region components/ui/CreativeMedia.tsx
function youtubeEmbed(url) {
	try {
		const u = new URL(url);
		const host = u.hostname.replace(/^www\./, "");
		if (host === "youtu.be") {
			const id = u.pathname.split("/").filter(Boolean)[0];
			return id ? `https://www.youtube.com/embed/${id}` : null;
		}
		if (host === "youtube.com" || host === "m.youtube.com") {
			const id = u.searchParams.get("v");
			return id ? `https://www.youtube.com/embed/${id}` : null;
		}
	} catch {}
	return null;
}
async function copyText(text) {
	try {
		if (navigator?.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			toast.success("Copied");
			return;
		}
	} catch {}
	toast.error("Unable to copy");
}
function CreativeMedia({ creativeKind, creativeImageUrl, creativeVideoUrl, className, hideActions = false }) {
	const kind = String(creativeKind ?? "").toLowerCase();
	const url = (kind === "video" ? creativeVideoUrl : creativeImageUrl)?.trim() || "";
	const yt = useMemo(() => url ? youtubeEmbed(url) : null, [url]);
	if (!url) return /* @__PURE__ */ jsx("div", {
		className: className ?? "",
		children: /* @__PURE__ */ jsx("div", {
			className: "bg-white rounded-10 p-4 text-center text-stone-500 border",
			children: "No creative uploaded for this booking yet."
		})
	});
	const canDownload = kind !== "video";
	return /* @__PURE__ */ jsxs("div", {
		className: className ?? "",
		children: [kind === "video" ? yt ? /* @__PURE__ */ jsx("iframe", {
			className: "w-full h-80 rounded-10",
			src: yt,
			title: "Creative video",
			allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
			allowFullScreen: true
		}) : /* @__PURE__ */ jsxs("div", {
			className: "bg-white rounded-10 p-4 border",
			children: [/* @__PURE__ */ jsx("div", {
				className: "text-stone-500 text-sm mb-2",
				children: "Video link"
			}), /* @__PURE__ */ jsx("a", {
				className: "text-ads360yellow-100 break-all",
				href: url,
				target: "_blank",
				rel: "noreferrer",
				children: url
			})]
		}) : /* @__PURE__ */ jsx("img", {
			alt: "Creative",
			src: url,
			className: "mx-auto w-full rounded-10 max-h-[420px] object-contain bg-white border"
		}), !hideActions ? /* @__PURE__ */ jsxs("div", {
			className: "mt-3 flex flex-wrap gap-2 justify-end",
			children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "px-3 py-2 rounded bg-white border hover:bg-stone-50 text-sm",
				onClick: () => copyText(url),
				children: "Copy URL"
			}), /* @__PURE__ */ jsx("a", {
				className: "px-3 py-2 rounded bg-ads360black-100/95 hover:bg-ads360black-100 text-ads360light-100 text-sm",
				href: url,
				target: "_blank",
				rel: "noreferrer",
				download: canDownload ? "" : void 0,
				children: canDownload ? "Download" : "Open"
			})]
		}) : null]
	});
}
//#endregion
//#region components/campaign/CampaignDetailShared.tsx
function formatCampaignMoney(amount, currency = "NGN") {
	return `${currency === "NGN" ? "₦" : `${currency} `}${amount.toLocaleString()}`;
}
function formatDateShort(iso) {
	if (!iso) return "—";
	const d = new Date(iso);
	if (!Number.isFinite(d.getTime())) return String(iso).slice(0, 10);
	return d.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function formatDateRange(start, end) {
	const a = formatDateShort(start ?? null);
	const b = formatDateShort(end ?? null);
	if (a === "—" && b === "—") return "—";
	return `${a} – ${b}`;
}
function personDisplayName(p) {
	const biz = p.businessName?.trim();
	if (biz) return biz;
	return `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || "—";
}
var statusStyles = {
	pending: "bg-amber-50 text-amber-800 border-amber-200",
	active: "bg-green-50 text-green-700 border-green-200",
	rejected: "bg-red-50 text-red-700 border-red-200",
	completed: "bg-emerald-50 text-emerald-800 border-emerald-200",
	paid: "bg-green-50 text-green-700 border-green-200"
};
function CampaignStatusBadge({ status }) {
	const s = String(status ?? "").toLowerCase();
	const cls = statusStyles[s] ?? "bg-stone-100 text-stone-700 border-stone-200";
	const label = s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`,
		children: label
	});
}
var paymentStatusStyles = {
	paid: "bg-emerald-50 text-emerald-800 border-emerald-200",
	unpaid: "bg-amber-50 text-amber-900 border-amber-200",
	refunded: "bg-violet-50 text-violet-800 border-violet-200"
};
function CampaignPaymentStatusBadge({ paymentStatus }) {
	const s = String(paymentStatus ?? "unpaid").toLowerCase();
	const cls = paymentStatusStyles[s] ?? "bg-stone-100 text-stone-700 border-stone-200";
	const label = s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";
	return /* @__PURE__ */ jsxs("span", {
		className: `inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`,
		title: "Payment status",
		children: ["Payment: ", label]
	});
}
function SectionLabel({ children }) {
	return /* @__PURE__ */ jsx("p", {
		className: "text-[11px] font-semibold tracking-widest text-stone-500 uppercase mb-2",
		children
	});
}
function InfoCard({ icon, label, value, sub }) {
	return /* @__PURE__ */ jsx("div", {
		className: "rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ads360yellow-100/30 text-ads360yellow-100",
				children: icon
			}), /* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ jsx(SectionLabel, { children: label }),
					/* @__PURE__ */ jsx("div", {
						className: "text-lg font-semibold text-stone-900 leading-tight",
						children: value
					}),
					sub ? /* @__PURE__ */ jsx("div", {
						className: "mt-1 text-sm text-stone-600",
						children: sub
					}) : null
				]
			})]
		})
	});
}
function MediaFrame({ title, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-[200px] flex-col rounded-2xl border border-dashed border-amber-200/80 bg-[#FAFAF8] p-4",
		children: [/* @__PURE__ */ jsx(SectionLabel, { children: title }), /* @__PURE__ */ jsx("div", {
			className: "flex flex-1 flex-col justify-center",
			children
		})]
	});
}
//#endregion
//#region components/campaign/CampaignIcons.tsx
function NairaIcon() {
	return /* @__PURE__ */ jsx("span", {
		className: "text-sm font-bold",
		"aria-hidden": true,
		children: "₦"
	});
}
function CalendarDays() {
	return /* @__PURE__ */ jsx("svg", {
		className: "h-5 w-5 text-stone-700",
		fill: "none",
		viewBox: "0 0 24 24",
		stroke: "currentColor",
		strokeWidth: 1.5,
		"aria-hidden": true,
		children: /* @__PURE__ */ jsx("path", {
			strokeLinecap: "round",
			strokeLinejoin: "round",
			d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5"
		})
	});
}
//#endregion
//#region app/vendors/billboards/requests/$slug/index.tsx
var cancel$3 = "/icons/usericon/modalCancelBotton.svg";
var Request = () => {
	const { slug } = Route$13.useParams();
	const id = Number(slug);
	const booking = useVendorBillboardBooking(Number.isFinite(id) && id > 0 ? id : null);
	const b = booking.data;
	const markActive = useMarkVendorBookingActive();
	const rejectMutation = useRejectVendorBillboardBooking();
	const [proofFile, setProofFile] = useState(null);
	const [proofPreviewUrl, setProofPreviewUrl] = useState("");
	const [rejectOpen, setRejectOpen] = useState(false);
	const [rejectReason, setRejectReason] = useState("");
	const canAct = (b?.paymentStatus === "paid" || b?.status === "paid") && b?.status === "pending" && b?.paymentStatus !== "refunded" && b?.status !== "rejected" && b?.status !== "completed";
	const creativeUrl = String(b?.creativeKind ?? "").toLowerCase() === "video" ? b?.creativeVideoUrl?.trim() ?? "" : b?.creativeImageUrl?.trim() ?? "";
	const canDownload = String(b?.creativeKind ?? "").toLowerCase() !== "video";
	async function copyCreative() {
		if (!creativeUrl) {
			toast.error("No creative URL");
			return;
		}
		try {
			await navigator.clipboard.writeText(creativeUrl);
			toast.success("Copied");
		} catch {
			toast.error("Unable to copy");
		}
	}
	return /* @__PURE__ */ jsx("section", {
		className: "min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-3xl",
			children: [
				booking.isLoading && /* @__PURE__ */ jsx("p", {
					className: "text-center text-stone-600",
					children: "Loading…"
				}),
				booking.isError && /* @__PURE__ */ jsx("p", {
					className: "text-center text-red-600",
					children: "Unable to load request"
				}),
				!booking.isLoading && !booking.isError && b && /* @__PURE__ */ jsxs("div", {
					className: "overflow-hidden rounded-2xl border border-amber-200/40 bg-white shadow-sm",
					children: [
						/* @__PURE__ */ jsxs("header", {
							className: "flex flex-col gap-3 border-b border-stone-100 px-5 pt-6 pb-4 sm:flex-row sm:items-start sm:justify-between sm:px-7",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
								className: "font-serif text-2xl font-medium tracking-tight text-stone-900 md:text-3xl",
								children: "Campaign details"
							}), /* @__PURE__ */ jsxs("p", {
								className: "mt-1.5 text-sm text-stone-500",
								children: [
									"ID: NG#",
									b.id,
									" ·",
									" ",
									formatDateRange(b.campaignStartDate, b.campaignEndDate)
								]
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-2 self-end sm:self-start sm:justify-end",
								children: [
									/* @__PURE__ */ jsx(CampaignStatusBadge, { status: b.status }),
									/* @__PURE__ */ jsx(CampaignPaymentStatusBadge, { paymentStatus: b.paymentStatus }),
									/* @__PURE__ */ jsx(Link, {
										to: "/vendors/billboards/requests",
										className: "text-xl leading-none text-stone-400 transition hover:text-stone-700",
										"aria-label": "Back to requests",
										children: "×"
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-5 pt-5 sm:px-7",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "font-serif text-xl text-stone-900 md:text-2xl",
								children: b.listing?.name ?? "Billboard request"
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700",
										children: "Billboard"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs text-stone-600",
										children: b.status
									}),
									b.paymentStatus ? /* @__PURE__ */ jsx("span", {
										className: "rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs text-stone-600",
										children: b.paymentStatus
									}) : null
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-7",
							children: [/* @__PURE__ */ jsx(InfoCard, {
								label: "Total budget",
								icon: /* @__PURE__ */ jsx(NairaIcon, {}),
								value: formatCampaignMoney(b.negotiatedAmount ?? b.quotedTotal, b.currency),
								sub: "Booker’s agreed price"
							}), /* @__PURE__ */ jsx(InfoCard, {
								label: "Campaign duration",
								icon: /* @__PURE__ */ jsx(CalendarDays, {}),
								value: formatDateRange(b.campaignStartDate, b.campaignEndDate),
								sub: b.durationPlan ? `Plan: ${b.durationPlan}` : void 0
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "px-5 pb-6 sm:px-7",
							children: /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5",
								children: [/* @__PURE__ */ jsx(SectionLabel, { children: "Campaign owner (booker)" }), b.booker ? /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ads360yellow-100 text-lg font-serif text-white",
										children: personDisplayName(b.booker).slice(0, 1).toUpperCase()
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-stone-900",
											children: personDisplayName(b.booker)
										}), /* @__PURE__ */ jsx("p", {
											className: "text-sm text-stone-600",
											children: b.booker.email
										})]
									})]
								}) : /* @__PURE__ */ jsx("p", {
									className: "text-sm text-stone-500",
									children: "No booker details"
								})]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 px-5 pb-6 sm:grid-cols-3 sm:px-7",
							children: [
								/* @__PURE__ */ jsx(MediaFrame, {
									title: "Campaign creative",
									children: b.creativeImageUrl || b.creativeVideoUrl ? /* @__PURE__ */ jsx(CreativeMedia, {
										creativeKind: b.creativeKind,
										creativeImageUrl: b.creativeImageUrl,
										creativeVideoUrl: b.creativeVideoUrl,
										hideActions: true,
										className: "w-full"
									}) : /* @__PURE__ */ jsx("p", {
										className: "py-8 text-center text-sm text-stone-500",
										children: "No creative uploaded"
									})
								}),
								/* @__PURE__ */ jsx(MediaFrame, {
									title: "Billboard",
									children: b.listing?.imageUrl ? /* @__PURE__ */ jsx("img", {
										src: b.listing.imageUrl,
										alt: b.listing.name ?? "Billboard",
										className: "max-h-52 w-full rounded-lg object-contain"
									}) : /* @__PURE__ */ jsx("p", {
										className: "py-8 text-center text-sm text-stone-500",
										children: "No image"
									})
								}),
								/* @__PURE__ */ jsx(MediaFrame, {
									title: "Active proof",
									children: b.activeProofImageUrl ? /* @__PURE__ */ jsx("img", {
										src: b.activeProofImageUrl,
										alt: "Activation proof",
										className: "max-h-52 w-full rounded-lg object-contain"
									}) : /* @__PURE__ */ jsx("p", {
										className: "py-8 text-center text-sm text-stone-500",
										children: "Upload proof when you accept the campaign"
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 border-t border-stone-100 px-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:px-7",
							children: [
								creativeUrl ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => void copyCreative(),
									className: "rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50",
									children: "Copy creative URL"
								}), /* @__PURE__ */ jsx("a", {
									className: "inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50",
									href: creativeUrl,
									target: "_blank",
									rel: "noreferrer",
									download: canDownload ? "" : void 0,
									children: canDownload ? "Download" : "Open creative"
								})] }) : null,
								canAct ? /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setRejectOpen(true),
									disabled: rejectMutation.isPending,
									className: "rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-800 transition hover:bg-red-100 disabled:opacity-50",
									children: "Reject"
								}) : null,
								canAct ? /* @__PURE__ */ jsxs("div", {
									className: "flex w-full flex-col gap-2 sm:w-auto sm:min-w-[220px]",
									children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-xs text-stone-500",
											children: "Proof image required to accept"
										}),
										/* @__PURE__ */ jsx(FilesInput, {
											previewName: proofFile?.name ?? "",
											accept: "image",
											handleChange: (e) => {
												const f = e.target.files?.[0];
												if (!f) return;
												setProofFile(f);
												setProofPreviewUrl(URL.createObjectURL(f));
											},
											warning: ""
										}),
										proofPreviewUrl ? /* @__PURE__ */ jsx("img", {
											src: proofPreviewUrl,
											alt: "Preview",
											className: "max-h-32 w-full rounded-lg border object-contain"
										}) : null,
										/* @__PURE__ */ jsx("button", {
											type: "button",
											disabled: !proofFile || markActive.isPending || !Number.isFinite(id),
											onClick: async () => {
												if (!proofFile) {
													toast.error("Select a proof image");
													return;
												}
												try {
													await markActive.mutateAsync({
														bookingId: id,
														proofImage: proofFile
													});
													await booking.refetch();
													setProofFile(null);
													setProofPreviewUrl("");
												} catch {}
											},
											className: "rounded-xl border-2 border-stone-900 bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-50",
											children: markActive.isPending ? "Accepting…" : "Accept campaign"
										})
									]
								}) : null
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "px-5 pb-6 sm:px-7",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/vendors/billboards/requests",
								className: "text-sm font-medium text-ads360yellow-100",
								children: "← Back to requests"
							})
						})
					]
				}),
				/* @__PURE__ */ jsx(Modal, {
					isOpen: rejectOpen,
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto w-11/12 max-w-md rounded-10 bg-white p-5 md:w-full",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-4 flex justify-between",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-serif text-lg",
									children: "Reject campaign"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setRejectOpen(false),
									"aria-label": "Close",
									children: /* @__PURE__ */ jsx("img", {
										src: cancel$3,
										alt: "",
										className: "h-5 w-5"
									})
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-stone-600",
								children: "This will refund the booker (wallet or card) per your platform rules. Optional reason:"
							}),
							/* @__PURE__ */ jsx("textarea", {
								className: "mt-3 w-full rounded-lg border border-stone-200 p-3 text-sm",
								rows: 3,
								value: rejectReason,
								onChange: (e) => setRejectReason(e.target.value),
								placeholder: "Reason (optional)"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4 flex justify-end gap-2",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									className: "rounded-lg border px-4 py-2 text-sm",
									onClick: () => setRejectOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									disabled: rejectMutation.isPending,
									className: "rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50",
									onClick: async () => {
										try {
											await rejectMutation.mutateAsync({
												bookingId: id,
												reason: rejectReason.trim() || void 0
											});
											setRejectOpen(false);
											setRejectReason("");
											await booking.refetch();
										} catch {}
									},
									children: rejectMutation.isPending ? "Rejecting…" : "Confirm reject"
								})]
							})
						]
					})
				})
			]
		})
	});
};
var Route$13 = createFileRoute("/vendors/billboards/requests/$slug/")({ component: Request });
//#endregion
//#region app/vendors/billboards/negotiations/$id/index.tsx
function VendorNegotiationDetail() {
	const { id: idParam } = Route$12.useParams();
	const id = Number(idParam);
	const booking = useVendorBillboardBooking(Number.isFinite(id) && id > 0 ? id : null);
	const b = booking.data;
	const bookerLabel = b?.booker?.businessName || `${b?.booker?.firstName ?? ""} ${b?.booker?.lastName ?? ""}`.trim() || b?.booker?.email || "-";
	return /* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-10 py-14 min-h-screen bg-ads360-hash",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between items-center mb-6",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-2xl font-bold",
					children: "Negotiation"
				}), /* @__PURE__ */ jsx(Link, {
					to: "/vendors/billboards/negotiations",
					className: "text-ads360yellow-100",
					children: "Back"
				})]
			}),
			booking.isLoading && /* @__PURE__ */ jsx("div", { children: "Loading..." }),
			booking.isError && /* @__PURE__ */ jsx("div", { children: "Unable to load negotiation" }),
			!booking.isLoading && !booking.isError && b && /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-10 p-5 border",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "mb-5",
						children: /* @__PURE__ */ jsx(CreativeMedia, {
							creativeKind: b.creativeKind,
							creativeImageUrl: b.creativeImageUrl,
							creativeVideoUrl: b.creativeVideoUrl
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid md:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-stone-500 text-sm",
								children: "Booking ID"
							}), /* @__PURE__ */ jsxs("div", {
								className: "font-bold",
								children: ["#", b.id]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-stone-500 text-sm",
								children: "Status"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-bold",
								children: b.status
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-stone-500 text-sm",
								children: "Listing"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-bold",
								children: b.listing?.name ?? "-"
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-stone-500 text-sm",
								children: "Booker"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-bold",
								children: bookerLabel
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-stone-500 text-sm",
								children: "Quoted Total"
							}), /* @__PURE__ */ jsxs("div", {
								className: "font-bold",
								children: ["₦", b.quotedTotal]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-stone-500 text-sm",
								children: "Minimum Negotiable"
							}), /* @__PURE__ */ jsxs("div", {
								className: "font-bold",
								children: ["₦", b.minimumNegotiableAmount ?? 0]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-stone-500 text-sm",
								children: "Their Offer"
							}), /* @__PURE__ */ jsxs("div", {
								className: "font-bold",
								children: ["₦", b.negotiatedAmount ?? 0]
							})] })
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 text-stone-600",
						children: "This booking is currently under negotiation. (Accept/reject actions will be wired once the vendor negotiation endpoints are implemented.)"
					})
				]
			})
		]
	});
}
var Route$12 = createFileRoute("/vendors/billboards/negotiations/$id/")({ component: VendorNegotiationDetail });
//#endregion
//#region components/billboard/BillboardDetailInfo.tsx
var locationIcon = "/icons/location.svg";
function BillboardDetailMainColumn({ bb }) {
	const hasCoords = bb.latitude != null && bb.longitude != null && Number.isFinite(bb.latitude) && Number.isFinite(bb.longitude);
	const sizeLine = bb.width != null && bb.height != null ? `${bb.width}m (W) × ${bb.height}m (H)` : bb.width != null ? `Width: ${bb.width}m` : bb.height != null ? `Height: ${bb.height}m` : null;
	const pixelLine = bb.pixelWidth != null && bb.pixelHeight != null ? `${bb.pixelWidth}px (W) × ${bb.pixelHeight}px (H)` : null;
	const audience = bb.audienceTypes?.filter(Boolean).length > 0 ? bb.audienceTypes.join(", ") : null;
	return /* @__PURE__ */ jsxs("div", {
		className: "md:w-4/5 space-y-4",
		children: [
			/* @__PURE__ */ jsxs("h3", {
				className: "flex items-center gap-2 font-bold text-lg",
				children: [/* @__PURE__ */ jsx("img", {
					alt: "",
					src: locationIcon,
					className: "h-5 w-5 shrink-0"
				}), bb.name]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: `rounded-full px-2.5 py-0.5 text-xs font-medium ${bb.isAvailable ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`,
					children: bb.isAvailable ? "Available for booking" : "Not available"
				}), bb.isNegotiable ? /* @__PURE__ */ jsx("span", {
					className: "rounded-full bg-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-800",
					children: "Negotiable"
				}) : /* @__PURE__ */ jsx("span", {
					className: "rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600",
					children: "Fixed pricing"
				})]
			}),
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Board type"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5",
				children: boardTypeLabel(bb.boardType)
			})] }),
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h4", {
					className: "text-sm font-semibold text-neutral-600",
					children: "Location"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-0.5",
					children: bb.address
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "text-neutral-700",
					children: [
						bb.city,
						", ",
						bb.state
					]
				}),
				hasCoords ? /* @__PURE__ */ jsx("a", {
					href: googleMapsSearchUrl(bb.latitude, bb.longitude),
					target: "_blank",
					rel: "noopener noreferrer",
					className: "mt-1 inline-block text-sm text-ads360yellowBtn-100 underline",
					children: "Open in Google Maps"
				}) : null
			] }),
			bb.nearbyLandmarks ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Nearby"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5",
				children: bb.nearbyLandmarks
			})] }) : null,
			bb.trafficDescription ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Traffic"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5",
				children: bb.trafficDescription
			})] }) : null,
			sizeLine ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Physical size"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5",
				children: sizeLine
			})] }) : null,
			pixelLine ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Pixel size"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5",
				children: pixelLine
			})] }) : null,
			bb.orientation ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Orientation"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5",
				children: bb.orientation
			})] }) : null,
			bb.illumination ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Illumination"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5",
				children: bb.illumination
			})] }) : null,
			bb.facingDirection ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Facing direction"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5",
				children: bb.facingDirection
			})] }) : null,
			/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("h4", {
					className: "text-sm font-semibold text-neutral-600",
					children: "Schedule"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-0.5",
					children: formatRuntime(bb)
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-1 text-sm text-neutral-600",
					children: ["Active days: ", formatActiveDaysSummary(bb.activeDays)]
				})
			] }),
			audience ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Audience"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-0.5",
				children: audience
			})] }) : null,
			bb.durationPerDisplay != null ? /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
				className: "text-sm font-semibold text-neutral-600",
				children: "Spot duration"
			}), /* @__PURE__ */ jsxs("p", {
				className: "mt-0.5",
				children: [
					"About ",
					bb.durationPerDisplay,
					" seconds per display rotation"
				]
			})] }) : null,
			/* @__PURE__ */ jsxs("div", {
				className: "border-t border-neutral-200 pt-4 text-sm text-neutral-500",
				children: [/* @__PURE__ */ jsxs("p", { children: ["Listing ID: ", bb.id] }), /* @__PURE__ */ jsxs("p", {
					className: "mt-1",
					children: [
						"Listed ",
						formatListingDate(bb.createdAt),
						" · Updated",
						" ",
						formatListingDate(bb.updatedAt)
					]
				})]
			})
		]
	});
}
function BillboardDetailPricingColumn({ bb, actions }) {
	const p = bb.pricing;
	const rows = [];
	if (p.daily != null && p.daily > 0) rows.push({
		label: "Daily",
		value: `₦${formatNaira(p.daily)}`
	});
	if (p.weekly != null && p.weekly > 0) rows.push({
		label: "Weekly",
		value: `₦${formatNaira(p.weekly)}`
	});
	if (p.monthly != null && p.monthly > 0) rows.push({
		label: "Monthly",
		value: `₦${formatNaira(p.monthly)}`
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "md:px-3 basis-1/3",
		children: [
			/* @__PURE__ */ jsx("h4", {
				className: "my-3 font-semibold",
				children: "Price"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-1 text-lg font-medium text-ads360black-100",
				children: [
					"From ₦",
					primaryPrice(bb.pricing),
					p.daily != null && p.daily > 0 ? /* @__PURE__ */ jsx("span", {
						className: "text-sm font-normal text-neutral-600",
						children: " / day"
					}) : null
				]
			}),
			rows.length > 0 ? /* @__PURE__ */ jsx("ul", {
				className: "mt-4 space-y-2 border-t border-neutral-200 pt-4 text-sm",
				children: rows.map((r) => /* @__PURE__ */ jsxs("li", {
					className: "flex justify-between gap-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-neutral-600",
						children: r.label
					}), /* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: r.value
					})]
				}, r.label))
			}) : /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-neutral-500",
				children: "No rate tiers listed."
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6 border-t border-neutral-200 pt-4",
				children: [
					/* @__PURE__ */ jsx("h4", {
						className: "font-semibold text-neutral-800",
						children: "Notes"
					}),
					bb.isNegotiable ? /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-neutral-700",
						children: "The owner has indicated this placement may be negotiable."
					}) : /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-neutral-700",
						children: "Pricing is as shown unless otherwise agreed on-platform."
					}),
					bb.durationPerDisplay != null ? /* @__PURE__ */ jsxs("p", {
						className: "mt-2 text-sm text-neutral-600",
						children: [
							"Each loop runs about ",
							bb.durationPerDisplay,
							" seconds on screen."
						]
					}) : null
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-6",
				children: actions
			})
		]
	});
}
//#endregion
//#region app/vendors/billboards/listing/$slug/index.tsx
var led$1 = "/icons/led.svg";
var duration$1 = "/icons/duration.svg";
var impression$1 = "/icons/impression.svg";
var dash$1 = "/icons/dash.svg";
var Billboard$1 = () => {
	const { slug } = Route$11.useParams();
	const parsed = Number.parseInt(slug, 10);
	const listingId = Number.isFinite(parsed) && parsed > 0 ? parsed : null;
	const { data: bb, isPending, isError, error, refetch } = useMyBillboardListing(listingId);
	const [view, setView] = useState("Billboard Overview");
	const [preview, setPreview] = useState(false);
	if (listingId == null) return /* @__PURE__ */ jsx("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-5",
		children: /* @__PURE__ */ jsx("p", {
			className: "mt-4 text-red-700",
			children: "Invalid billboard link."
		})
	});
	if (isPending) return /* @__PURE__ */ jsx("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-5",
		children: /* @__PURE__ */ jsx("p", {
			className: "mt-4 text-stone-500",
			children: "Loading billboard…"
		})
	});
	if (isError || !bb) return /* @__PURE__ */ jsx("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-5",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mt-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800",
			children: [/* @__PURE__ */ jsx("p", { children: error instanceof Error ? error.message : "Could not load this billboard." }), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => refetch(),
				className: "mt-2 underline",
				children: "Try again"
			})]
		})
	});
	const displayLine = bb.durationPerDisplay != null ? `${bb.durationPerDisplay}s per display` : "—";
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "bg-[#E9E9E9] px-4 md:px-10 pt-5",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 mb-5 mt-3",
				children: "View full details of billboard"
			}), /* @__PURE__ */ jsxs("div", {
				className: "w-full flex text-sm md:text-base justify-between md:justify-start md:space-x-3",
				children: [/* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setView("Billboard Overview"),
					children: ["Billboard Overview", view === "Billboard Overview" && /* @__PURE__ */ jsx("img", {
						alt: "Billboard Overview selected",
						src: dash$1,
						className: "w-2/3 mx-auto relative top-[4px] -left-2"
					})]
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setView("License Agreement"),
					children: ["License Agreement", view === "License Agreement" && /* @__PURE__ */ jsx("img", {
						alt: "License Agreement selected",
						src: dash$1,
						className: "w-2/3 mx-auto relative top-[4px] -left-2"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsx(AnimatePresence, { children: view === "Billboard Overview" && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				scale: .75
			},
			animate: {
				opacity: 1,
				scale: 1,
				transition: {
					ease: "easeOut",
					duration: .15
				}
			},
			exit: {
				opacity: 0,
				scale: .75,
				transition: {
					ease: "easeIn",
					duration: .15
				}
			},
			children: /* @__PURE__ */ jsxs("section", {
				className: "md:flex px-4 md:px-7 lg:px-20 py-14",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "md:px-3 lg:px-6 basis-2/3",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: bb.imageUrl,
							alt: bb.name,
							className: "rounded-t-10 w-full",
							onClick: () => setPreview(true)
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "md:flex bg-ads360black-100 space-y-2 md:space-y-0 w-full rounded-b-10 text-white py-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: impression$1,
										alt: "",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: displayLine })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: duration$1,
										alt: "",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: formatRuntime(bb) })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: led$1,
										alt: "",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: boardTypeLabel(bb.boardType) })]
								})
							]
						}),
						/* @__PURE__ */ jsx(BillboardDetailMainColumn, { bb })
					]
				}), /* @__PURE__ */ jsx(BillboardDetailPricingColumn, {
					bb,
					actions: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap justify-end gap-3",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white px-4 py-2",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/vendors/billboards/listing/$slug/edit",
								params: { slug: String(bb.id) },
								children: "Edit"
							})
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white px-4 py-2",
							children: "Delete"
						})]
					})
				})]
			})
		}) }),
		/* @__PURE__ */ jsx(AnimatePresence, { children: view === "License Agreement" && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				scale: .75
			},
			animate: {
				opacity: 1,
				scale: 1,
				transition: {
					ease: "easeOut",
					duration: .15
				}
			},
			exit: {
				opacity: 0,
				scale: .75,
				transition: {
					ease: "easeIn",
					duration: .15
				}
			},
			children: /* @__PURE__ */ jsxs("section", {
				className: "px-4 md:px-14 lg:px-24 py-14",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "my-3 text-2xl font-semibold",
						children: "Parties Involved"
					}),
					/* @__PURE__ */ jsx("p", { children: "360ads - NG is an investment platform, that enables Africans to purchase fractional shares of global real estate assets. Meristem Trustees - Investments & Assets are managed by SEC- regulated Meristem trustees" }),
					/* @__PURE__ */ jsx("h3", {
						className: "my-3 text-2xl font-semibold",
						children: "Negotiations"
					}),
					/* @__PURE__ */ jsx("p", { children: bb.isNegotiable ? "Advertisers may request negotiated terms where applicable." : "Standard listed pricing applies." }),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-6 text-sm text-neutral-500",
						children: [
							"Your listing #",
							bb.id,
							" · Last updated",
							" ",
							formatListingDate(bb.updatedAt),
							"."
						]
					})
				]
			})
		}) }),
		/* @__PURE__ */ jsx(Modal, {
			isOpen: preview,
			children: /* @__PURE__ */ jsxs("div", {
				className: "transition duration-500",
				children: [/* @__PURE__ */ jsx("div", {
					className: "fixed w-full left-0 top-[30%]  md:left-[20%] md:top-[10%] md:w-2/3 z-[1000000000]",
					children: /* @__PURE__ */ jsx("img", {
						src: bb.imageUrl,
						alt: bb.name,
						className: "rounded-10 w-full"
					})
				}), /* @__PURE__ */ jsx("div", {
					role: "presentation",
					onClick: () => setPreview(false),
					className: "fixed w-full px-5 py-10 bg-black/20 top-0 left-0 h-full z-[100000]"
				})]
			})
		})
	] });
};
var Route$11 = createFileRoute("/vendors/billboards/listing/$slug/")({ component: Billboard$1 });
//#endregion
//#region app/_usersauth/users/wallet/fundwallet/index.tsx
var card$2 = "/icons/usericon/card.svg";
var dollar = "/icons/usericon/dollar-sign.svg";
var bank = "/icons/usericon/banking.svg";
var cancel$2 = "/icons/usericon/modalCancelBotton.svg";
var Payment = () => {
	const [selected, setSelected] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = (paymentMethod) => {
		if (paymentMethod === "USD Card") return;
		setIsOpen(true);
		setSelected(paymentMethod);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash px-4 md:px-10 py-14",
		children: [
			/* @__PURE__ */ jsx("h2", {
				className: "text-2xl",
				children: "Fund Wallet"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-stone-400",
				children: "Choose a payment to fund your wallet."
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 gap-5 my-10",
				children: [
					{
						image: bank,
						link: "ads/",
						name: "Bank Transfer"
					},
					{
						image: card$2,
						link: "ads/",
						name: "Naira Funding Card"
					},
					{
						image: dollar,
						link: "ads/",
						name: "USD Card"
					}
				].map((ad, i) => /* @__PURE__ */ jsx("div", {
					onClick: () => handleClick(ad.name),
					children: /* @__PURE__ */ jsx("div", {
						className: `${ad.name === "USD Card" ? "bg-white/50 text-gray-400" : "bg-white group cursor-pointer"} shadow flex justify-between rounded px-3 md:px-10 py-7 border border-ads360yellow-100 items-center`,
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center space-x-5",
							children: [/* @__PURE__ */ jsx("img", {
								width: 45,
								height: 45,
								alt: ad.name,
								src: ad.image
							}), /* @__PURE__ */ jsx("div", {
								className: "px-4",
								children: /* @__PURE__ */ jsx("h4", {
									className: "group-hover:text-ads360yellow-100 font-semibold",
									children: ad.name
								})
							})]
						})
					})
				}, i))
			})
		]
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen,
		children: selected === "Bank Transfer" ? /* @__PURE__ */ jsxs("div", {
			className: "bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end mb-5",
					children: /* @__PURE__ */ jsx("button", {
						onClick: () => setIsOpen(false),
						children: /* @__PURE__ */ jsx("img", {
							src: cancel$2,
							alt: "modal cancel botton",
							className: "w-5"
						})
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "mb-2",
							children: "Make Tranfer to the following account and click proceed when you are done"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "my-1",
							children: "Account Name:"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-stone-400 text-lg",
							children: "360Ads"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-2 mb-1",
							children: "Account Number:"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-stone-400 text-lg",
							children: "1234567890"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ jsx("button", {
						className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5  text-white  w-5/6 h-10",
						children: "Proceed"
					})
				})
			]
		}) : selected === "Naira Funding Card" ? /* @__PURE__ */ jsxs("div", {
			className: "bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between mb-5",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "",
						children: "Amount"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setIsOpen(false),
						children: /* @__PURE__ */ jsx("img", {
							src: cancel$2,
							alt: "modal cancel botton",
							className: "w-5"
						})
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50",
						children: [
							" ",
							"₦",
							" "
						]
					}), /* @__PURE__ */ jsx("input", { className: "p-2 w-full border rounded-r text-black/50 focus:outline-none" })]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-center",
					children: /* @__PURE__ */ jsx("button", {
						className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5  text-white  w-5/6 h-10",
						children: "Proceed"
					})
				})
			]
		}) : null
	})] });
};
var Route$10 = createFileRoute("/_usersauth/users/wallet/fundwallet/")({ component: Payment });
//#endregion
//#region app/_usersauth/users/negotiations/$id/index.tsx
function NegotiationDetail() {
	const { id: idParam } = Route$9.useParams();
	const id = Number(idParam);
	const booking = useBillboardBooking(Number.isFinite(id) && id > 0 ? id : null);
	const b = booking.data;
	return /* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-10 py-14 min-h-screen bg-ads360-hash",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-between items-center mb-6",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-2xl font-bold",
					children: "Negotiation"
				}), /* @__PURE__ */ jsx(Link, {
					to: "/users/negotiations",
					className: "text-ads360yellow-100",
					children: "Back"
				})]
			}),
			booking.isLoading && /* @__PURE__ */ jsx("div", { children: "Loading..." }),
			booking.isError && /* @__PURE__ */ jsx("div", { children: "Unable to load negotiation" }),
			!booking.isLoading && !booking.isError && b && /* @__PURE__ */ jsxs("div", {
				className: "bg-white rounded-10 p-5 border",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid md:grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-stone-500 text-sm",
							children: "Booking ID"
						}), /* @__PURE__ */ jsxs("div", {
							className: "font-bold",
							children: ["#", b.id]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-stone-500 text-sm",
							children: "Status"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-bold",
							children: b.status
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-stone-500 text-sm",
							children: "Listing"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-bold",
							children: b.listing?.name ?? "-"
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-stone-500 text-sm",
							children: "Quoted Total"
						}), /* @__PURE__ */ jsxs("div", {
							className: "font-bold",
							children: ["₦", b.quotedTotal]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-stone-500 text-sm",
							children: "Minimum Negotiable"
						}), /* @__PURE__ */ jsxs("div", {
							className: "font-bold",
							children: ["₦", b.minimumNegotiableAmount ?? 0]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-stone-500 text-sm",
							children: "Your Offer"
						}), /* @__PURE__ */ jsxs("div", {
							className: "font-bold",
							children: ["₦", b.negotiatedAmount ?? 0]
						})] })
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-6 text-stone-600",
					children: "This booking is currently under negotiation. Once the billboard owner responds, you’ll be able to proceed to payment."
				})]
			})
		]
	});
}
var Route$9 = createFileRoute("/_usersauth/users/negotiations/$id/")({ component: NegotiationDetail });
//#endregion
//#region app/_usersauth/users/campaign/$slug/index.tsx
var CampaignDetail = () => {
	const { slug } = Route$8.useParams();
	const id = Number(slug);
	const booking = useBillboardBooking(Number.isFinite(id) && id > 0 ? id : null);
	const complete = useCompleteBillboardBooking();
	const b = booking.data;
	const isPaid = b?.paymentStatus === "paid" || b?.status === "paid";
	const canComplete = Boolean(b) && isPaid && b?.paymentStatus !== "refunded" && b?.status === "active";
	return /* @__PURE__ */ jsx("section", {
		className: "min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-3xl",
			children: [
				booking.isLoading && /* @__PURE__ */ jsx("p", {
					className: "text-center text-stone-600",
					children: "Loading…"
				}),
				booking.isError && /* @__PURE__ */ jsx("p", {
					className: "text-center text-red-600",
					children: "Unable to load campaign"
				}),
				!booking.isLoading && !booking.isError && b && /* @__PURE__ */ jsxs("div", {
					className: "overflow-hidden rounded-2xl border border-amber-200/40 bg-white shadow-sm",
					children: [
						/* @__PURE__ */ jsxs("header", {
							className: "flex flex-col gap-3 border-b border-stone-100 px-5 pt-6 pb-4 sm:flex-row sm:items-start sm:justify-between sm:px-7",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
								className: "font-serif text-2xl font-medium tracking-tight text-stone-900 md:text-3xl",
								children: "Campaign details"
							}), /* @__PURE__ */ jsxs("p", {
								className: "mt-1.5 text-sm text-stone-500",
								children: [
									"ID: NG#",
									b.id,
									" · ",
									formatDateRange(b.campaignStartDate, b.campaignEndDate)
								]
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap items-center gap-2 self-end sm:self-start sm:justify-end",
								children: [
									/* @__PURE__ */ jsx(CampaignStatusBadge, { status: b.status }),
									/* @__PURE__ */ jsx(CampaignPaymentStatusBadge, { paymentStatus: b.paymentStatus }),
									/* @__PURE__ */ jsx(Link, {
										to: "/users/campaign",
										className: "text-xl leading-none text-stone-400 transition hover:text-stone-700",
										"aria-label": "Back to campaigns",
										children: "×"
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "px-5 pt-5 sm:px-7",
							children: [/* @__PURE__ */ jsx("h2", {
								className: "font-serif text-xl text-stone-900 md:text-2xl",
								children: b.listing?.name ?? "Billboard campaign"
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700",
									children: "Billboard"
								}), /* @__PURE__ */ jsx("span", {
									className: "rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs text-stone-600",
									children: b.status
								})]
							})]
						}),
						!isPaid && /* @__PURE__ */ jsxs("div", {
							className: "mx-5 my-4 rounded-xl border border-amber-200/50 bg-amber-50/50 p-4 text-sm text-stone-700 sm:mx-7",
							children: [
								"This booking is not paid yet. Unpaid and negotiating bookings are under",
								" ",
								/* @__PURE__ */ jsx(Link, {
									to: "/users/negotiations",
									className: "font-medium text-ads360yellow-100 underline",
									children: "Negotiations"
								}),
								"."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-7",
							children: [/* @__PURE__ */ jsx(InfoCard, {
								label: "Total budget",
								icon: /* @__PURE__ */ jsx(NairaIcon, {}),
								value: formatCampaignMoney(b.negotiatedAmount ?? b.quotedTotal, b.currency),
								sub: "Agreed price for this placement"
							}), /* @__PURE__ */ jsx(InfoCard, {
								label: "Campaign duration",
								icon: /* @__PURE__ */ jsx(CalendarDays, {}),
								value: formatDateRange(b.campaignStartDate, b.campaignEndDate),
								sub: b.durationPlan ? `Plan: ${b.durationPlan}` : void 0
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "px-5 pb-6 sm:px-7",
							children: /* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5",
								children: [/* @__PURE__ */ jsx(SectionLabel, { children: "Billboard owner" }), b.billboardOwner ? /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ads360yellow-100 text-lg font-serif text-white",
										children: personDisplayName(b.billboardOwner).slice(0, 1).toUpperCase()
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-stone-900",
											children: personDisplayName(b.billboardOwner)
										}), /* @__PURE__ */ jsx("p", {
											className: "text-sm text-stone-600",
											children: b.billboardOwner.email
										})]
									})]
								}) : /* @__PURE__ */ jsx("p", {
									className: "text-sm text-stone-500",
									children: "No owner details"
								})]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 px-5 pb-6 sm:grid-cols-3 sm:px-7",
							children: [
								/* @__PURE__ */ jsx(MediaFrame, {
									title: "Campaign creative",
									children: b.creativeImageUrl || b.creativeVideoUrl ? /* @__PURE__ */ jsx(CreativeMedia, {
										creativeKind: b.creativeKind,
										creativeImageUrl: b.creativeImageUrl,
										creativeVideoUrl: b.creativeVideoUrl,
										hideActions: true,
										className: "w-full"
									}) : /* @__PURE__ */ jsx("p", {
										className: "py-8 text-center text-sm text-stone-500",
										children: "No creative uploaded yet"
									})
								}),
								/* @__PURE__ */ jsx(MediaFrame, {
									title: "Billboard",
									children: b.listing?.imageUrl ? /* @__PURE__ */ jsx("img", {
										src: b.listing.imageUrl,
										alt: b.listing.name ?? "Billboard",
										className: "max-h-52 w-full rounded-lg object-contain"
									}) : /* @__PURE__ */ jsx("p", {
										className: "py-8 text-center text-sm text-stone-500",
										children: "No image"
									})
								}),
								/* @__PURE__ */ jsx(MediaFrame, {
									title: "Active proof",
									children: b.activeProofImageUrl ? /* @__PURE__ */ jsx("img", {
										src: b.activeProofImageUrl,
										alt: "Proof of activation",
										className: "max-h-52 w-full rounded-lg object-contain"
									}) : /* @__PURE__ */ jsx("p", {
										className: "py-8 text-center text-sm text-stone-500",
										children: "The owner has not uploaded activation proof yet"
									})
								})
							]
						}),
						canComplete && /* @__PURE__ */ jsx("div", {
							className: "flex justify-end border-t border-stone-100 px-5 py-5 sm:px-7",
							children: /* @__PURE__ */ jsx("button", {
								type: "button",
								disabled: complete.isPending,
								onClick: () => {
									if (!Number.isFinite(id) || id <= 0) return;
									complete.mutateAsync(id);
								},
								className: "rounded-xl border-2 border-stone-900 bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-50",
								children: complete.isPending ? "Completing…" : "Complete campaign"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "px-5 pb-6 sm:px-7",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/users/campaign",
								className: "text-sm font-medium text-ads360yellow-100",
								children: "← Back to campaigns"
							})
						})
					]
				})
			]
		})
	});
};
var Route$8 = createFileRoute("/_usersauth/users/campaign/$slug/")({ component: CampaignDetail });
//#endregion
//#region app/_usersauth/ads/sms/checkout/index.tsx
var card$1 = "/del/cards.png";
var Checkout$2 = () => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", {
		className: "mx-4 md:mx-10 pt-32 pb-24",
		children: [/* @__PURE__ */ jsx(BackBtn, { children: "Smart SMS / Display Ad" }), /* @__PURE__ */ jsxs("div", {
			className: "mt-10 my-10 md:flex bg-ads360light-100 rounded-10 border-ads360yellow-100 border",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "md:basis-6/12 mx-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-2 gap-2 my-5",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "font-medium",
								children: "Sender ID"
							}), /* @__PURE__ */ jsx("p", { children: "Super Sales" })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "font-medium",
								children: "Number"
							}), /* @__PURE__ */ jsx("p", { children: "08140231279" })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "font-medium",
								children: "USSD code"
							}), /* @__PURE__ */ jsx("p", { children: "*123#" })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "font-medium",
								children: "url"
							}), /* @__PURE__ */ jsx("p", { children: "www.testing.com" })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "font-medium",
								children: "Message"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-justify",
								children: "Lorem ipsum dolor sit amet. ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum"
							})] })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-5",
						children: [
							/* @__PURE__ */ jsx("h4", {
								className: "font-medium",
								children: "Duration"
							}),
							/* @__PURE__ */ jsx("p", { children: "Days" }),
							/* @__PURE__ */ jsx("h5", { children: "2/12/2023" }),
							/* @__PURE__ */ jsx("h5", { children: "2/12/2023" }),
							/* @__PURE__ */ jsx("h5", { children: "2/12/2023" })
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-5",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-meduim",
								children: "Pricing"
							}),
							/* @__PURE__ */ jsx("p", { children: "4000 numbers loaded at the rate of 4 naira each" }),
							/* @__PURE__ */ jsx("h4", { children: "Total: 16000" })
						]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "my-5",
						children: /* @__PURE__ */ jsx("button", {
							className: `hover:animate-changeColor hover:text-white bg-ads360yellow-100 w-123 h-12 rounded-10 my-2 `,
							children: /* @__PURE__ */ jsx(Link, {
								to: `/ads/2`,
								children: "Pay Now"
							})
						})
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "basis-6/12 my-5",
				children: /* @__PURE__ */ jsx("img", {
					alt: "",
					src: card$1
				})
			})]
		})]
	}) });
};
var Route$7 = createFileRoute("/_usersauth/ads/sms/checkout/")({ component: Checkout$2 });
//#endregion
//#region app/_usersauth/ads/influencer/$slug/index.tsx
var influencerImage2 = "/del/dav.png";
var whatsapp = "/icons/Whatsapp.svg";
var twitter = "/icons/twitter2.svg";
var facebook = "/icons/Facebook2.svg";
var InfluencerDetails = () => {
	const [preview, setPreview] = useState(false);
	const influencer = {
		id: 13,
		name: "Egbami",
		occupation: "influencer",
		negotiable: "yes",
		image: influencerImage2,
		reach: "190K"
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "bg-[#E9E9E9] px-4 md:px-10 pt-24 pb-7",
			children: [/* @__PURE__ */ jsx(BackBtn, { children: "influencer Details" }), /* @__PURE__ */ jsx("p", {
				className: "text-stone-400 mb-5 mt-3",
				children: "View full details of influencer and proceed to checkout"
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "md:flex py-14 mx-auto w-11/12 md:w-10/12 lg:w-8/12",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "md:px-3 lg:px-6 basis-2/3",
				children: [/* @__PURE__ */ jsx("img", {
					src: influencer.image,
					alt: "influencer",
					className: "rounded-10 w-96 h-96",
					onClick: () => setPreview(true)
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:w-4/5",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "flex items-center font-bold text-lg my-3",
						children: influencer.name
					}), /* @__PURE__ */ jsxs("p", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("b", { children: "Bio:" }), " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"]
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "basis-1/3",
				children: [
					/* @__PURE__ */ jsx("h4", {
						className: "my-3 font-semibold",
						children: "Platforms"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "my-3",
						children: [
							/* @__PURE__ */ jsx("img", {
								alt: "",
								src: whatsapp,
								className: "inline w-5 h-5"
							}),
							" blog:",
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold",
								children: " 36000"
							})
						]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "my-3",
						children: [
							/* @__PURE__ */ jsx("img", {
								alt: "",
								src: twitter,
								className: "inline w-5 h-5"
							}),
							" Twitter: ",
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold",
								children: " 59000"
							})
						]
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "my-3",
						children: [
							/* @__PURE__ */ jsx("img", {
								alt: "",
								src: facebook,
								className: "inline w-5 h-5"
							}),
							" Facebook: ",
							/* @__PURE__ */ jsx("span", {
								className: "font-semibold",
								children: " 20000"
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 mb-7",
						children: "₦40,000 (per post)"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "",
						children: /* @__PURE__ */ jsx("button", {
							className: "group my-5 rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 px-2 h-12",
							children: /* @__PURE__ */ jsx(Link, {
								to: `/ads/influencer/${influencer.id}/onboarding`,
								children: "Select influencer"
							})
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx(Modal, {
			isOpen: preview,
			children: /* @__PURE__ */ jsxs("div", {
				className: "transition duration-500",
				children: [/* @__PURE__ */ jsx("div", {
					className: "fixed w-full left-0 top-[30%]  md:left-[20%] md:top-[10%] md:w-2/3 z-[1000000000]",
					children: /* @__PURE__ */ jsx("img", {
						src: influencerImage2,
						alt: "influencer",
						className: "rounded-10 w-full"
					})
				}), /* @__PURE__ */ jsx("div", {
					onClick: () => setPreview(false),
					className: `fixed w-full px-5 py-10 bg-black/20 top-0 left-0 h-full z-[100000]`
				})]
			})
		})
	] });
};
var Route$6 = createFileRoute("/_usersauth/ads/influencer/$slug/")({ component: InfluencerDetails });
//#endregion
//#region app/_usersauth/ads/billboard/$slug/index.tsx
var led = "/icons/led.svg";
var duration = "/icons/duration.svg";
var impression = "/icons/impression.svg";
var dash = "/icons/dash.svg";
var Billboard = () => {
	const { slug } = Route$5.useParams();
	const parsed = Number.parseInt(slug, 10);
	const listingId = Number.isFinite(parsed) && parsed > 0 ? parsed : null;
	const { data: bb, isPending, isError, error, refetch } = useBillboardListing(listingId);
	const [view, setView] = useState("Billboard Overview");
	const [preview, setPreview] = useState(false);
	if (listingId == null) return /* @__PURE__ */ jsxs("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-24",
		children: [/* @__PURE__ */ jsx(BackBtn, { children: " Billboard Details" }), /* @__PURE__ */ jsx("p", {
			className: "mt-4 text-red-700",
			children: "Invalid billboard link."
		})]
	});
	if (isPending) return /* @__PURE__ */ jsxs("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-24",
		children: [/* @__PURE__ */ jsx(BackBtn, { children: " Billboard Details" }), /* @__PURE__ */ jsx("p", {
			className: "mt-4 text-stone-500",
			children: "Loading billboard…"
		})]
	});
	if (isError || !bb) return /* @__PURE__ */ jsxs("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-24",
		children: [/* @__PURE__ */ jsx(BackBtn, { children: " Billboard Details" }), /* @__PURE__ */ jsxs("div", {
			className: "mt-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800",
			children: [/* @__PURE__ */ jsx("p", { children: error instanceof Error ? error.message : "Could not load this billboard." }), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => refetch(),
				className: "mt-2 underline",
				children: "Try again"
			})]
		})]
	});
	const displayLine = bb.durationPerDisplay != null ? `${bb.durationPerDisplay}s per display` : "—";
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "bg-[#E9E9E9] px-4 md:px-10 pt-24",
			children: [
				/* @__PURE__ */ jsx(BackBtn, { children: " Billboard Details" }),
				/* @__PURE__ */ jsx("p", {
					className: "text-stone-400 mb-5 mt-3",
					children: "View full details of billboard and proceed to checkout"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "w-full flex text-sm md:text-base justify-between md:justify-start md:space-x-3",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setView("Billboard Overview"),
						children: ["Billboard Overview", view === "Billboard Overview" && /* @__PURE__ */ jsx("img", {
							alt: "Billboard Overview selected",
							src: dash,
							className: "w-2/3 mx-auto relative top-[4px] -left-2"
						})]
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => setView("License Agreement"),
						children: ["License Agreement", view === "License Agreement" && /* @__PURE__ */ jsx("img", {
							alt: "License Agreement selected",
							src: dash,
							className: "w-2/3 mx-auto relative top-[4px] -left-2"
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ jsx(AnimatePresence, { children: view === "Billboard Overview" && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				scale: .75
			},
			animate: {
				opacity: 1,
				scale: 1,
				transition: {
					ease: "easeOut",
					duration: .15
				}
			},
			exit: {
				opacity: 0,
				scale: .75,
				transition: {
					ease: "easeIn",
					duration: .15
				}
			},
			children: /* @__PURE__ */ jsxs("section", {
				className: "md:flex px-4 md:px-7 lg:px-20 py-14",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "md:px-3 lg:px-6 basis-2/3",
					children: [
						/* @__PURE__ */ jsx("img", {
							src: bb.imageUrl,
							alt: bb.name,
							className: "rounded-t-10 w-full",
							onClick: () => setPreview(true)
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "md:flex bg-ads360black-100 space-y-2 md:space-y-0 w-full rounded-b-10 text-white py-2",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: impression,
										alt: "",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: displayLine })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: duration,
										alt: "",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: formatRuntime(bb) })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: led,
										alt: "",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: boardTypeLabel(bb.boardType) })]
								})
							]
						}),
						/* @__PURE__ */ jsx(BillboardDetailMainColumn, { bb })
					]
				}), /* @__PURE__ */ jsx(BillboardDetailPricingColumn, {
					bb,
					actions: /* @__PURE__ */ jsx("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 px-4 h-12",
							children: /* @__PURE__ */ jsx(Link, {
								to: "/ads/billboard/$slug/onboard",
								params: { slug: String(bb.id) },
								search: { data: bb },
								children: "Select Billboard"
							})
						})
					})
				})]
			})
		}) }),
		/* @__PURE__ */ jsx(AnimatePresence, { children: view === "License Agreement" && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				scale: .75
			},
			animate: {
				opacity: 1,
				scale: 1,
				transition: {
					ease: "easeOut",
					duration: .15
				}
			},
			exit: {
				opacity: 0,
				scale: .75,
				transition: {
					ease: "easeIn",
					duration: .15
				}
			},
			children: /* @__PURE__ */ jsxs("section", {
				className: "px-4 md:px-14 lg:px-24 py-14",
				children: [
					/* @__PURE__ */ jsx("h3", {
						className: "my-3 text-2xl font-semibold",
						children: "Parties Involved"
					}),
					/* @__PURE__ */ jsx("p", { children: "360ads - NG is an investment platform, that enables Africans to purchase fractional shares of global real estate assets. Meristem Trustees - Investments & Assets are managed by SEC- regulated Meristem trustees" }),
					/* @__PURE__ */ jsx("h3", {
						className: "my-3 text-2xl font-semibold",
						children: "Negotiations"
					}),
					/* @__PURE__ */ jsx("p", { children: bb.isNegotiable ? "Pricing and terms may be negotiated according to platform rules." : "Pricing for this placement is fixed as listed." }),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-6 text-sm text-neutral-500",
						children: [
							"Listing #",
							bb.id,
							" · Terms snapshot as of",
							" ",
							formatListingDate(bb.updatedAt),
							"."
						]
					})
				]
			})
		}) }),
		/* @__PURE__ */ jsx(Modal, {
			isOpen: preview,
			children: /* @__PURE__ */ jsxs("div", {
				className: "transition duration-500",
				children: [/* @__PURE__ */ jsx("div", {
					className: "fixed w-full left-0 top-[30%]  md:left-[20%] md:top-[10%] md:w-2/3 z-[1000000000]",
					children: /* @__PURE__ */ jsx("img", {
						src: bb.imageUrl,
						alt: bb.name,
						className: "rounded-10 w-full"
					})
				}), /* @__PURE__ */ jsx("div", {
					role: "presentation",
					onClick: () => setPreview(false),
					className: "fixed w-full px-5 py-10 bg-black/20 top-0 left-0 h-full z-[100000]"
				})]
			})
		})
	] });
};
var Route$5 = createFileRoute("/_usersauth/ads/billboard/$slug/")({ component: Billboard });
//#endregion
//#region app/vendors/billboards/listing/$slug/edit/index.tsx
var Edit = () => {
	const [successfull, setSuccessfull] = useState(false);
	const handleSubmitTemp = (e) => {
		e.preventDefault();
		setSuccessfull(true);
	};
	const billboard = {
		id: 9,
		name: "Adetokunbo Ademola led, victoria island",
		location: "Along Adetokunbo Ademola Street by Bishop",
		image: "",
		pricepd: "35000",
		negotiable: "yes",
		Impressions: "40 per day",
		type: "Double faced Gantry LED",
		duration: "14hrs (6am - 9pm) 6days/week"
	};
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash py-14",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-11/12",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "text-2xl",
				children: "Add Billboard"
			}), /* @__PURE__ */ jsx("p", { children: "Add billboards here" })]
		}), /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs("div", {
			className: "md:flex mx-auto w-11/12",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "basis-6/12 md:pr-5",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Billboard name" }), /* @__PURE__ */ jsx("input", {
							value: billboard.name,
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Price" }), /* @__PURE__ */ jsx("input", {
							value: billboard.pricepd,
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Location" }), /* @__PURE__ */ jsx("input", {
							value: billboard.location,
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Board Type" }), /* @__PURE__ */ jsx("input", {
							value: billboard.type,
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Daily Impressions" }), /* @__PURE__ */ jsx("input", {
							type: "number",
							value: billboard.Impressions,
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Duration per display" }), /* @__PURE__ */ jsx("input", {
							type: "number",
							value: billboard.duration,
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Time" }), /* @__PURE__ */ jsx("input", {
							value: "14hrs (6am - 9pm) 6days/week",
							placeholder: "14hrs (6am - 9pm) 6days/week",
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Dimention" }), /* @__PURE__ */ jsxs("div", {
							className: "flex space-x-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "basis-1/2",
								children: /* @__PURE__ */ jsx("input", {
									placeholder: "width",
									value: 800,
									className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "basis-1/2",
								children: /* @__PURE__ */ jsx("input", {
									placeholder: "height",
									value: 300,
									className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
								})
							})]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Pixel Size" }), /* @__PURE__ */ jsxs("div", {
							className: "flex space-x-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "basis-1/2",
								children: /* @__PURE__ */ jsx("input", {
									placeholder: "width",
									value: 800,
									className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "basis-1/2",
								children: /* @__PURE__ */ jsx("input", {
									placeholder: "height",
									value: 300,
									className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
								})
							})]
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "basis-6/12",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Orientation" }), /* @__PURE__ */ jsxs("select", {
							defaultValue: "select",
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]",
							children: [
								/* @__PURE__ */ jsx("option", {
									disabled: true,
									children: "select"
								}),
								/* @__PURE__ */ jsx("option", {
									selected: true,
									children: "Potrait"
								}),
								/* @__PURE__ */ jsx("option", { children: "Landscape" })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Negotiable" }), /* @__PURE__ */ jsxs("select", {
							defaultValue: "select",
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]",
							children: [
								/* @__PURE__ */ jsx("option", {
									disabled: true,
									children: "select"
								}),
								/* @__PURE__ */ jsx("option", {
									selected: true,
									children: "Yes"
								}),
								/* @__PURE__ */ jsx("option", { children: "No" })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Traffic Description" }), /* @__PURE__ */ jsx("textarea", {
							rows: 4,
							value: "Facing Traffic Along Adetokumbo Ademola Street by Eko Hotels,Ahmadu Bello Way, Akin Adesola & Ajose Adeogun.",
							placeholder: "Facing Traffic Along Adetokumbo Ademola Street by Eko Hotels,Ahmadu Bello Way, Akin Adesola & Ajose Adeogun.",
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Image" }), /* @__PURE__ */ jsx(FilesInput, {
							previewName: "",
							accept: "image",
							handleChange: () => {},
							warning: "Require image size"
						})]
					}),
					/* @__PURE__ */ jsx("div", { className: "bg-white w-full h-60 rounded-10" }),
					/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", {
						onClick: handleSubmitTemp,
						className: `bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5  text-white p-2`,
						children: "Submit"
					}) })
				]
			})]
		}) })]
	}) });
};
var Route$4 = createFileRoute("/vendors/billboards/listing/$slug/edit/")({ component: Edit });
//#endregion
//#region components/inputs/Checkbox.tsx
var Checkbox = ({ id, onClick, label }) => {
	return /* @__PURE__ */ jsxs("div", {
		id,
		className: "flex gap-2",
		children: [
			/* @__PURE__ */ jsx("input", {
				onChange: (e) => onClick(e, label),
				type: "checkbox",
				className: "relative peer shrink-0\r\n        appearance-none w-4 h-4 border-2 border-ads360yellowBtn-100 rounded-sm bg-white\r\n        mt-1\r\n        checked:bg-ads360yellowBtn-100 checked:border-0\r\n        focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-blue-100\r\n        disabled:border-steel-400 disabled:bg-steel-400"
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: id,
				children: [" ", label]
			}),
			/* @__PURE__ */ jsx("svg", {
				className: "\r\n                absolute \r\n                w-4 h-4 mt-1\r\n                hidden peer-checked:block\r\n                pointer-events-none",
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "white",
				strokeWidth: "4",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" })
			})
		]
	});
};
//#endregion
//#region node_modules/react-icons/md/index.esm.js
function MdOutlineCancel(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0V0z",
				"opacity": ".87"
			}
		}, {
			"tag": "path",
			"attr": { "d": "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" }
		}]
	})(props);
}
//#endregion
//#region components/inputs/CalenderBox.tsx
var CalenderBox = ({ addDate, selectedDate, removeDate }) => {
	const [value, onChange] = useState(/* @__PURE__ */ new Date());
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full",
		children: [/* @__PURE__ */ jsx(Calendar, {
			onChange: (value) => {
				onChange(value);
				addDate(value);
			},
			minDate: today,
			className: `shadow-lg rounded-l-10 basis-[67%] md:basis-[70%]`,
			value
		}), /* @__PURE__ */ jsxs("div", {
			className: "bg-white overflow-y-scroll basis-[33%] md:basis-[30%] selectedDate h-[19rem] px-1 shadow-lg rounded-r-10 w-full",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 text-center text-sm",
				children: "Seleted days"
			}), /* @__PURE__ */ jsx("div", { children: selectedDate?.map((date, i) => /* @__PURE__ */ jsxs("div", {
				className: "flex p-1 rounded justify-center text-sm bg-[#006edc] text-white my-1",
				children: [/* @__PURE__ */ jsx("span", {
					className: "px-1 basis-9/12",
					children: date?.toLocaleDateString()
				}), /* @__PURE__ */ jsx("button", {
					onClick: () => removeDate(date),
					children: /* @__PURE__ */ jsx(MdOutlineCancel, {})
				})]
			}, i)) })]
		})]
	});
};
//#endregion
//#region components/ui/Preview.tsx
var Preview = ({ previewImage, attachmentType, previewVideo, externalVideoUrl, needMessage, platform, needPlatform, writeup, plan, selectedDate, durationText }) => {
	const yt = (() => {
		const raw = externalVideoUrl?.trim();
		if (!raw) return null;
		try {
			const u = new URL(raw);
			const host = u.hostname.replace(/^www\./, "");
			if (host === "youtu.be") {
				const id = u.pathname.split("/").filter(Boolean)[0];
				return id ? `https://www.youtube.com/embed/${id}` : null;
			}
			if (host === "youtube.com" || host === "m.youtube.com") {
				const id = u.searchParams.get("v");
				return id ? `https://www.youtube.com/embed/${id}` : null;
			}
		} catch {}
		return null;
	})();
	return /* @__PURE__ */ jsxs("div", {
		className: "",
		children: [
			/* @__PURE__ */ jsx("h4", {
				className: "font-bold text-xl my-3",
				children: "Preview"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "bg-white my-5 rounded-10 p-2 min-h-[40px]",
				children: [
					durationText?.trim() ? /* @__PURE__ */ jsx("div", { children: durationText }) : null,
					plan === "Immediate" && /* @__PURE__ */ jsx("div", { children: "This ad will run once, immediately after payment is confirmed." }),
					plan === "Days" && /* @__PURE__ */ jsxs("div", { children: ["This ad will run on selected day(s):", selectedDate.map((day, i) => /* @__PURE__ */ jsx("div", { children: day?.toDateString() }, i))] }),
					plan === "Weeks" && !durationText?.trim() && /* @__PURE__ */ jsx("div", { children: "Choose a start date and number of weeks to preview." }),
					plan === "Months" && !durationText?.trim() && /* @__PURE__ */ jsx("div", { children: "Choose a start date and number of months to preview." }),
					plan === "" && /* @__PURE__ */ jsx("div", {
						className: "text-gray-500 text-center",
						children: "Preview Duration Plan"
					})
				]
			}),
			needPlatform && /* @__PURE__ */ jsxs("div", {
				className: "bg-white my-5 rounded-10 p-2 min-h-[40px]",
				children: [platform.length > 0 && /* @__PURE__ */ jsx("div", { children: platform.map((platforms) => /* @__PURE__ */ jsx("div", { children: platforms }, platforms)) }), platform.length === 0 && /* @__PURE__ */ jsx("div", {
					className: "text-gray-500 text-center",
					children: "Preview Platforms"
				})]
			}),
			needMessage && /* @__PURE__ */ jsx("div", {
				className: "prevText my-5 bg-white rounded-10 p-2 h-[200px] overflow-y-auto",
				children: writeup !== "" ? /* @__PURE__ */ jsx("p", {
					className: "break-all",
					children: writeup
				}) : /* @__PURE__ */ jsx("div", {
					className: "flex justify-center items-center h-full",
					children: /* @__PURE__ */ jsx("p", {
						className: "text-gray-500",
						children: "Preview Message"
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "rounded-10 w-full",
				children: attachmentType === "video" ? previewVideo ? /* @__PURE__ */ jsxs("video", {
					className: "rounded- h-80 w-full",
					controls: true,
					children: [
						/* @__PURE__ */ jsx("source", {
							className: "w-full",
							src: previewVideo.src,
							type: "video/mp4"
						}),
						/* @__PURE__ */ jsx("source", {
							className: "w-full",
							src: previewVideo.src,
							type: "video/webm"
						}),
						"Your browser does not support the video tag."
					]
				}) : yt ? /* @__PURE__ */ jsx("iframe", {
					className: "w-full h-80 rounded-10",
					src: yt,
					title: "Video preview",
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
					allowFullScreen: true
				}) : externalVideoUrl?.trim() ? /* @__PURE__ */ jsxs("div", {
					className: "my-5 bg-white rounded-10 p-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-stone-500 text-sm mb-2",
						children: "Video link"
					}), /* @__PURE__ */ jsx("a", {
						className: "text-ads360yellow-100 break-all",
						href: externalVideoUrl,
						target: "_blank",
						rel: "noreferrer",
						children: externalVideoUrl
					})]
				}) : /* @__PURE__ */ jsx("div", {
					className: "my-5 flex justify-center items-center bg-white rounded-10 p-2 h-[300px]",
					children: /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-center",
						children: "Paste a video link to preview"
					})
				}) : attachmentType === "image" && previewImage ? /* @__PURE__ */ jsx("img", {
					alt: "influencer",
					src: previewImage.src,
					className: "mx-auto w-full rounded-10 h-80"
				}) : /* @__PURE__ */ jsx("div", {
					className: "my-5 flex justify-center items-center bg-white rounded-10 p-2 h-[300px]",
					children: /* @__PURE__ */ jsx("p", {
						className: "text-gray-500 text-center",
						children: "Preview Media"
					})
				})
			})
		]
	});
};
//#endregion
//#region app/_usersauth/ads/influencer/$slug/onboarding/index.tsx
function Onboard$1() {
	const [plan, setPlan] = useState("");
	const [writeup, setWriteup] = useState("");
	const [startWeek, setStartWeek] = useState({
		startday: "",
		duration: ""
	});
	const [startMonth, setStartMonth] = useState({
		startday: "",
		duration: ""
	});
	const [platform, setPlatform] = useState([]);
	const [selectedDate, setSelectedDate] = useState([]);
	const [attachmentType, setAttachmentType] = useState("image");
	const [previewImage, setPreviewImage] = useState();
	const [previewVideo, setPreviewVideo] = useState();
	useParams({ strict: false }).slug;
	const handlePlan = (e) => {
		const { value } = e.target;
		if (value === "Select") {
			toast.error("kindly selete a duration plan");
			setPlan("");
		} else setPlan(value);
	};
	const addDate = (info) => {
		if (selectedDate.find((date) => {
			return info?.toLocaleString() === date?.toLocaleString();
		})) toast.error("You have selected this date already");
		else setSelectedDate((prev) => [...prev, info]);
	};
	const removeDate = (rmDate) => {
		setSelectedDate(selectedDate.filter((dates) => rmDate !== dates));
	};
	const handleChange = (e, type) => {
		const file = e.target.files;
		if (file !== null && file.length > 0) {
			const objectUrl = URL.createObjectURL(file[0]);
			if (type === "image") {
				setPreviewVideo(void 0);
				setPreviewImage({
					src: objectUrl,
					name: file[0].name
				});
			} else {
				setPreviewImage(void 0);
				setPreviewVideo({
					src: objectUrl,
					name: file[0].name
				});
			}
		}
	};
	const handlePlatform = (e, value) => {
		if (e.target.checked) setPlatform((current) => [...current, value]);
		else setPlatform((current) => current.filter((each) => each !== value));
	};
	const handleDuration = (e, type) => {
		const { value, name } = e.target;
		if (type === "week") {
			setStartWeek((current) => ({
				...current,
				[name]: value
			}));
			setStartMonth({
				startday: "",
				duration: ""
			});
		} else {
			setStartMonth((current) => ({
				...current,
				[name]: value
			}));
			setSelectedDate([]);
			setStartWeek({
				startday: "",
				duration: ""
			});
		}
		setSelectedDate([]);
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-7 xl:px-20 py-24",
		children: [
			/* @__PURE__ */ jsx(BackBtn, { children: "Influencer Marketing" }),
			/* @__PURE__ */ jsx(Steps, {
				step: 3,
				text: "#3 - Completing"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 text-center",
				children: "Provide all requested details to help complete the campaign creation"
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "md:flex my-10 md:space-x-5 xl:space-x-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "md:basis-6/12 xl:basis-5/12",
					children: [
						/* @__PURE__ */ jsx("h4", {
							className: "font-bold my-3",
							children: "Choose day(s) to run campaign"
						}),
						/* @__PURE__ */ jsxs("select", {
							onChange: handlePlan,
							className: "mb-3 bg-white focus:outline-none w-full p-2 rounded-10",
							children: [
								/* @__PURE__ */ jsx("option", { children: "Select" }),
								/* @__PURE__ */ jsx("option", { children: "Immediate" }),
								/* @__PURE__ */ jsx("option", { children: "Days" }),
								/* @__PURE__ */ jsx("option", { children: "Weeks" }),
								/* @__PURE__ */ jsx("option", { children: "Months" })
							]
						}),
						plan === "Days" ? /* @__PURE__ */ jsx(CalenderBox, {
							addDate,
							selectedDate,
							removeDate
						}) : plan === "Weeks" ? /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between space-x-2 md:space-x-0 my-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", { children: "Start day" }), /* @__PURE__ */ jsx("input", {
								type: "date",
								value: startWeek?.startday,
								name: "startday",
								onChange: (e) => handleDuration(e, "week"),
								className: "w-full bg-white rounded-10 p-2 focus:outline-none"
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", { children: "Number of weeks" }), /* @__PURE__ */ jsx("input", {
								value: startWeek?.duration,
								name: "duration",
								type: "number",
								onChange: (e) => handleDuration(e, "week"),
								className: "w-full bg-white rounded-10 p-2 focus:outline-none"
							})] })]
						}) : plan === "Months" ? /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between space-x-2 md:space-x-0 my-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", { children: "Start day" }), /* @__PURE__ */ jsx("input", {
								value: startMonth?.startday,
								name: "startday",
								onChange: (e) => handleDuration(e, "month"),
								type: "date",
								className: "w-full bg-white rounded-10 p-2 focus:outline-none"
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", { children: "Number of Months" }), /* @__PURE__ */ jsx("input", {
								value: startMonth?.duration,
								name: "duration",
								onChange: (e) => handleDuration(e, "month"),
								type: "number",
								className: "w-full bg-white rounded-10 p-2 focus:outline-none"
							})] })]
						}) : null,
						/* @__PURE__ */ jsxs("div", {
							className: "my-5",
							children: [
								/* @__PURE__ */ jsx("h4", {
									className: "font-bold my-3",
									children: "Chose Platform"
								}),
								/* @__PURE__ */ jsx(Checkbox, {
									id: "facebook",
									onClick: handlePlatform,
									label: "Facebook 38000"
								}),
								/* @__PURE__ */ jsx(Checkbox, {
									id: "blog",
									onClick: handlePlatform,
									label: "Blog 39000"
								}),
								/* @__PURE__ */ jsx(Checkbox, {
									id: "twitter",
									onClick: handlePlatform,
									label: "Twitter 39000"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-5",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "font-bold my-3",
								children: "Message"
							}), /* @__PURE__ */ jsx("textarea", {
								value: writeup,
								onChange: (e) => setWriteup(e.target.value),
								rows: 9,
								className: "textscroll p-2 w-full border focus:outline-none  rounded-10 border-ads360yellowBtn-100"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-5",
							children: [
								/* @__PURE__ */ jsx("h4", {
									className: "font-bold my-3",
									children: "Attachments"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex space-x-3",
									children: [/* @__PURE__ */ jsx(Tick, {
										label: "Image Assets",
										asset: "image",
										setAttachmentType,
										attachmentType
									}), /* @__PURE__ */ jsx(Tick, {
										label: "Video Assets",
										asset: "video",
										setAttachmentType,
										attachmentType
									})]
								}),
								attachmentType === "image" ? /* @__PURE__ */ jsx(FilesInput, {
									previewName: previewImage?.name,
									accept: "image",
									handleChange,
									warning: "Required influencer image dimension: 496(H) by 800(W)"
								}) : /* @__PURE__ */ jsx(FilesInput, {
									previewName: previewVideo?.name,
									accept: "video",
									handleChange,
									warning: "Required influencer video dimension: 496(H) by 800(W)"
								})
							]
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "lg:basis-7/12 md:basis-6/12 lg:my-0",
					children: /* @__PURE__ */ jsx(Preview, {
						previewImage,
						attachmentType,
						previewVideo,
						needPlatform: true,
						needMessage: true,
						platform,
						writeup,
						plan,
						selectedDate
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ jsx("button", {
					className: "group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12",
					children: /* @__PURE__ */ jsx(Link, {
						to: `/ads/influencer/2/onboarding/checkout`,
						children: "Next"
					})
				})
			}),
			/* @__PURE__ */ jsx(Toaster, {
				position: "top-center",
				closeButton: true
			})
		]
	});
}
var Route$3 = createFileRoute("/_usersauth/ads/influencer/$slug/onboarding/")({ component: Onboard$1 });
//#endregion
//#region app/_usersauth/ads/billboard/$slug/onboard/index.tsx
function isoDateOnly(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function startOfToday() {
	const d = /* @__PURE__ */ new Date();
	d.setHours(0, 0, 0, 0);
	return d;
}
function isPastDateOnly(dateOnly) {
	if (!dateOnly) return false;
	const d = /* @__PURE__ */ new Date(`${dateOnly}T00:00:00`);
	if (Number.isNaN(d.getTime())) return false;
	return d.getTime() < startOfToday().getTime();
}
function Onboard() {
	const { data } = Route$2.useSearch();
	const [plan, setPlan] = useState("");
	const [startWeek, setStartWeek] = useState({
		startday: "",
		duration: ""
	});
	const [startMonth, setStartMonth] = useState({
		startday: "",
		duration: ""
	});
	const [platform, setPlatform] = useState([]);
	const [selectedDate, setSelectedDate] = useState([]);
	const [attachmentType, setAttachmentType] = useState("image");
	const [previewImage, setPreviewImage] = useState();
	const selectedbillboard = useParams({ strict: false }).slug;
	const listingId = useMemo(() => Number(selectedbillboard), [selectedbillboard]);
	const navigate = useNavigate();
	const createBooking = useCreateBillboardBooking();
	const [imageFile, setImageFile] = useState(null);
	const [creativeVideoUrl, setCreativeVideoUrl] = useState("");
	const durationText = useMemo(() => {
		if (plan === "Weeks") {
			const n = Number(startWeek.duration);
			if (startWeek.startday && Number.isFinite(n) && n > 0) return `This ad will run for ${n} week(s) from ${startWeek.startday}.`;
			return "";
		}
		if (plan === "Months") {
			const n = Number(startMonth.duration);
			if (startMonth.startday && Number.isFinite(n) && n > 0) return `This ad will run for ${n} month(s) from ${startMonth.startday}.`;
			return "";
		}
		return "";
	}, [
		plan,
		startWeek.duration,
		startWeek.startday,
		startMonth.duration,
		startMonth.startday
	]);
	const handlePlan = (e) => {
		const { value } = e.target;
		if (value === "Select") {
			toast.error("kindly selete a duration plan");
			setPlan("");
		} else setPlan(value);
	};
	const addDate = (info) => {
		if (selectedDate.find((date) => {
			return info?.toLocaleString() === date?.toLocaleString();
		})) toast.error("You have selected this date already");
		else setSelectedDate((prev) => [...prev, info]);
	};
	const removeDate = (rmDate) => {
		setSelectedDate(selectedDate.filter((dates) => rmDate !== dates));
	};
	const handleChange = (e, type) => {
		if (type !== "image") return;
		const file = e.target.files;
		if (file !== null && file.length > 0) {
			const objectUrl = URL.createObjectURL(file[0]);
			setImageFile(file[0]);
			setPreviewImage({
				src: objectUrl,
				name: file[0].name
			});
		}
	};
	const handleDuration = (e, type) => {
		const { value, name } = e.target;
		if (type === "week") {
			setStartWeek((current) => ({
				...current,
				[name]: value
			}));
			setStartMonth({
				startday: "",
				duration: ""
			});
		} else {
			setStartMonth((current) => ({
				...current,
				[name]: value
			}));
			setSelectedDate([]);
			setStartWeek({
				startday: "",
				duration: ""
			});
		}
		setSelectedDate([]);
	};
	const handleNext = async () => {
		if (!Number.isFinite(listingId) || listingId <= 0) {
			toast.error("Invalid billboard id");
			return;
		}
		const durationPlan = plan === "Immediate" ? "immediate" : plan === "Days" ? "days" : plan === "Weeks" ? "weeks" : plan === "Months" ? "months" : null;
		if (!durationPlan) {
			toast.error("kindly selete a duration plan");
			return;
		}
		const selectedDates = durationPlan === "days" ? selectedDate.filter((d) => d instanceof Date).map((d) => isoDateOnly(d)) : void 0;
		const periodStart = durationPlan === "weeks" ? startWeek.startday || void 0 : durationPlan === "months" ? startMonth.startday || void 0 : void 0;
		const periodDurationCount = durationPlan === "weeks" ? Number(startWeek.duration) : durationPlan === "months" ? Number(startMonth.duration) : void 0;
		const creativeKind = attachmentType === "image" ? "image" : "video";
		const payload = {
			durationPlan,
			selectedDates,
			periodStart,
			periodDurationCount: periodDurationCount != null && Number.isFinite(periodDurationCount) ? periodDurationCount : void 0,
			creativeKind,
			creativeVideoUrl: creativeKind === "video" ? creativeVideoUrl.trim() || void 0 : void 0
		};
		if (creativeKind === "image" && !imageFile) {
			toast.error("Please select an image file");
			return;
		}
		if (creativeKind === "video" && !payload.creativeVideoUrl) {
			toast.error("Please paste a video link");
			return;
		}
		if (selectedDates?.some((d) => isPastDateOnly(d))) {
			toast.error("You cannot select a past date");
			return;
		}
		if (periodStart && isPastDateOnly(periodStart)) {
			toast.error("Start date cannot be in the past");
			return;
		}
		try {
			const res = await createBooking.mutateAsync({
				listingId,
				payload,
				imageFile: imageFile ?? void 0
			});
			await navigate({
				to: `/ads/billboard/${listingId}/onboard/checkout`,
				search: { bookingId: res.id }
			});
		} catch {}
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-7 xl:px-20 py-24",
		children: [
			/* @__PURE__ */ jsx(BackBtn, { children: "billboard Marketing" }),
			/* @__PURE__ */ jsx(Steps, {
				step: 3,
				text: "#3 - Completing"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 text-center",
				children: "Provide all requested details to help complete the campaign creation"
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "md:flex my-10 md:space-x-5 xl:space-x-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "md:basis-6/12 xl:basis-5/12",
					children: [
						/* @__PURE__ */ jsx("h4", {
							className: "font-bold my-3",
							children: "Choose day(s) to run campaign"
						}),
						/* @__PURE__ */ jsxs("select", {
							onChange: handlePlan,
							className: "mb-3 bg-white focus:outline-none w-full p-2 rounded-10",
							children: [
								/* @__PURE__ */ jsx("option", { children: "Select" }),
								/* @__PURE__ */ jsx("option", { children: "Immediate" }),
								/* @__PURE__ */ jsx("option", { children: "Days" }),
								/* @__PURE__ */ jsx("option", { children: "Weeks" }),
								/* @__PURE__ */ jsx("option", { children: "Months" })
							]
						}),
						plan === "Days" ? /* @__PURE__ */ jsx(CalenderBox, {
							addDate,
							selectedDate,
							removeDate
						}) : plan === "Weeks" ? /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between space-x-2 md:space-x-0 my-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", { children: "Start day" }), /* @__PURE__ */ jsx("input", {
								type: "date",
								min: isoDateOnly(startOfToday()),
								value: startWeek?.startday,
								name: "startday",
								onChange: (e) => handleDuration(e, "week"),
								className: "w-full bg-white rounded-10 p-2 focus:outline-none"
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", { children: "Number of weeks" }), /* @__PURE__ */ jsx("input", {
								value: startWeek?.duration,
								name: "duration",
								type: "number",
								onChange: (e) => handleDuration(e, "week"),
								className: "w-full bg-white rounded-10 p-2 focus:outline-none"
							})] })]
						}) : plan === "Months" ? /* @__PURE__ */ jsxs("div", {
							className: "flex justify-between space-x-2 md:space-x-0 my-3",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", { children: "Start day" }), /* @__PURE__ */ jsx("input", {
								value: startMonth?.startday,
								name: "startday",
								onChange: (e) => handleDuration(e, "month"),
								type: "date",
								min: isoDateOnly(startOfToday()),
								className: "w-full bg-white rounded-10 p-2 focus:outline-none"
							})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", { children: "Number of Months" }), /* @__PURE__ */ jsx("input", {
								value: startMonth?.duration,
								name: "duration",
								onChange: (e) => handleDuration(e, "month"),
								type: "number",
								className: "w-full bg-white rounded-10 p-2 focus:outline-none"
							})] })]
						}) : null,
						/* @__PURE__ */ jsxs("div", {
							className: "mt-5",
							children: [
								/* @__PURE__ */ jsx("h4", {
									className: "font-bold my-3",
									children: "Attachments"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex space-x-3",
									children: [/* @__PURE__ */ jsx(Tick, {
										label: "Image Assets",
										asset: "image",
										setAttachmentType,
										attachmentType
									}), /* @__PURE__ */ jsx(Tick, {
										label: "Video Assets",
										asset: "video",
										setAttachmentType,
										attachmentType
									})]
								}),
								attachmentType === "image" ? /* @__PURE__ */ jsx(FilesInput, {
									previewName: previewImage?.name,
									accept: "image",
									handleChange,
									warning: `Required billboard image dimension: ${data?.width}px by ${data?.height}px (W x H)`
								}) : /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
									value: creativeVideoUrl,
									onChange: (e) => {
										setCreativeVideoUrl(e.target.value);
										setImageFile(null);
										setPreviewImage(void 0);
									},
									placeholder: "Paste YouTube / video link",
									className: "mb-2 bg-white focus:outline-none w-full p-2 rounded-10"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-stone-500 text-xs",
									children: "Videos are links only (e.g. YouTube). No video upload."
								})] })
							]
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "lg:basis-7/12 md:basis-6/12 lg:my-0",
					children: /* @__PURE__ */ jsx(Preview, {
						previewImage,
						attachmentType,
						previewVideo: void 0,
						externalVideoUrl: attachmentType === "video" ? creativeVideoUrl : void 0,
						platform,
						needPlatform: false,
						needMessage: false,
						writeup: "",
						plan,
						selectedDate,
						durationText
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: handleNext,
					disabled: createBooking.isPending,
					className: "group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12 disabled:opacity-60",
					children: createBooking.isPending ? "Saving..." : "Next"
				})
			}),
			/* @__PURE__ */ jsx(Toaster, {
				position: "top-center",
				closeButton: true
			})
		]
	});
}
var Route$2 = createFileRoute("/_usersauth/ads/billboard/$slug/onboard/")({ component: Onboard });
//#endregion
//#region app/_usersauth/ads/influencer/$slug/onboarding/checkout/index.tsx
var cancel$1 = "/icons/usericon/modalCancelBotton.svg";
var success$1 = "/icons/usericon/checkSuccess.svg";
var card = "/del/cards.png";
var influencerImg = "/del/girl.jpg";
var Checkout$1 = () => {
	const [negotia, setNegotia] = useState(false);
	const [negotiatedAmount, setNegotiatedAmount] = useState("");
	const [successfull, setSuccessfull] = useState(false);
	const [influencer, setinfluencer] = useState({
		id: 2,
		name: "Egbami",
		image: influencerImg,
		paid: "no",
		platform: [
			"facebook 30000",
			"twitter 45000",
			"instagram 15000"
		],
		negotiationCount: 0,
		minimumNegotiableAmount: 85e3,
		type: "influencer",
		duration: "3 days"
	});
	const handleNegotiate = (e) => {
		setNegotiatedAmount(e.target.value);
	};
	const submit = (e) => {
		e.preventDefault();
		setSuccessfull(true);
		setNegotia(false);
		setinfluencer((prev) => ({
			...prev,
			negotiationCount: 1
		}));
		setTimeout(() => {
			setSuccessfull(false);
		}, 4e3);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "mx-4 md:mx-10 pt-32 pb-24",
			children: [
				/* @__PURE__ */ jsx(BackBtn, { children: "influencer Marketing" }),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-10 md:flex justify-between my-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "basis-5/12",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "my-5 text-[#292728] text-xl",
							children: "Post Message"
						}), /* @__PURE__ */ jsx("p", {
							className: "mb-5",
							children: "\"Unlock the road to convenience with our rideshare app. Say goodbye to traffic woes and hello to hassle-free rides!\" Contact us @drapmeinc or mail us info@drapme.co #rideshare #luxurycars #chaffeurservices"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "basis-5/12",
						children: /* @__PURE__ */ jsx("img", {
							alt: "influencer",
							src: card,
							className: "mx-auto"
						})
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "w-full overflow-x-auto my-5",
					children: /* @__PURE__ */ jsxs("table", {
						className: "min-w-full bg-white",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-[#D0B301]/40",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Vendor"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Type"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Platform/Price"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Duration"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Start Date"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "End Date"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Total Amount"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", {
							className: "text-center",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsxs("td", {
									className: "py-2 px-2 md:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										alt: "",
										src: influencer.image,
										className: "inline",
										width: 40,
										height: 40
									}), influencer.name]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Influencer"
								}),
								/* @__PURE__ */ jsxs("td", {
									className: "py-2 px-2 md:px-3 border-b",
									children: [
										/* @__PURE__ */ jsxs("div", { children: ["Facebook", /* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-400",
											children: " ₦30000"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: ["Twitter", /* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-400",
											children: " ₦45000"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: ["Instagram", /* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-400",
											children: " ₦15000"
										})] })
									]
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "1 day(s)"
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "2023-05-21"
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "2023-05-21"
								}),
								/* @__PURE__ */ jsx("td", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "₦90,000"
								})
							] })
						})]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-[#D0B301]/40 flex justify-between w-full py-10  px-5 md:w-1/2 lg:w-1/3",
						children: [/* @__PURE__ */ jsx("h4", { children: "Total Amount" }), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", {
							className: "font-bold",
							children: "₦90,000"
						}) })]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex md:justify-end space-x-3 my-3",
					children: [/* @__PURE__ */ jsx("button", {
						disabled: influencer.negotiationCount > 0 ? true : false,
						onClick: () => setNegotia(true),
						className: `w-123 h-12 rounded-10 my-2 ${influencer.negotiationCount > 0 ? "bg-ads360yellow-100/50 text-black/50" : "hover:animate-changeColor hover:text-white bg-ads360yellow-100"}`,
						children: "Negotiate"
					}), /* @__PURE__ */ jsx("button", {
						disabled: influencer.paid === "yes" ? true : false,
						className: `${influencer.paid === "yes" ? "bg-ads360yellow-100/50 text-black/50" : "hover:animate-changeColor hover:text-white bg-ads360yellow-100"} w-123 h-12 rounded-10 my-2 `,
						children: /* @__PURE__ */ jsx(Link, {
							to: `/ads/2`,
							children: "Pay Now"
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ jsx(Modal, {
			isOpen: negotia,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between mb-5",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "",
						children: "Input Amount"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setNegotia(false),
						children: /* @__PURE__ */ jsx("img", {
							src: cancel$1,
							alt: "modal cancel botton",
							className: "w-5"
						})
					})]
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50",
								children: [
									" ",
									"₦",
									" "
								]
							}), /* @__PURE__ */ jsx("input", {
								type: "number",
								value: negotiatedAmount,
								onChange: handleNegotiate,
								className: "p-2 focus:outline-none w-full border rounded-r"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "text-red-700 text-xs",
								children: ["You cannot negotiat lower than ₦", influencer.minimumNegotiableAmount]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-red-700 text-xs",
								children: "You can only negotiat once"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ jsx("button", {
								disabled: negotiatedAmount === "" || parseInt(negotiatedAmount) < influencer.minimumNegotiableAmount ? true : false,
								className: `${negotiatedAmount === "" || parseInt(negotiatedAmount) < influencer.minimumNegotiableAmount ? "bg-ads360gray-100" : "bg-ads360black-100/95 hover:bg-ads360black-100"} rounded mt-5  text-white  w-5/6 h-10`,
								children: "Send Request"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(Modal, {
			isOpen: successfull,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white px-5 py-10 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10 grid grid-cols-1 content-center",
				children: [/* @__PURE__ */ jsx("img", {
					alt: "",
					src: success$1,
					className: "mx-auto w-2/6"
				}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", {
					className: "text-green-500 text-center mt-5 font-semibold",
					children: [
						"Request Sent ",
						/* @__PURE__ */ jsx("br", {}),
						" Successfully"
					]
				}) })]
			})
		})
	] });
};
var Route$1 = createFileRoute("/_usersauth/ads/influencer/$slug/onboarding/checkout/")({ component: Checkout$1 });
//#endregion
//#region app/_usersauth/ads/billboard/$slug/onboard/checkout/index.tsx
var cancel = "/icons/usericon/modalCancelBotton.svg";
var success = "/icons/usericon/checkSuccess.svg";
var Checkout = () => {
	const [negotia, setNegotia] = useState(false);
	const [negotiatedAmount, setNegotiatedAmount] = useState("");
	const [successfull, setSuccessfull] = useState(false);
	const search = useSearch({ strict: false });
	const bookingId = useMemo(() => Number(search.bookingId), [search.bookingId]);
	const booking = useBillboardBooking(Number.isFinite(bookingId) && bookingId > 0 ? bookingId : null);
	const negotiate = useNegotiateBillboardBooking();
	const b = booking.data;
	const handleNegotiate = (e) => {
		setNegotiatedAmount(e.target.value);
	};
	const submit = async (e) => {
		e.preventDefault();
		if (!Number.isFinite(bookingId) || bookingId <= 0) {
			toast.error("Missing booking id");
			return;
		}
		const amt = Number(negotiatedAmount);
		if (!Number.isFinite(amt) || amt <= 0) {
			toast.error("Enter a valid amount");
			return;
		}
		try {
			await negotiate.mutateAsync({
				id: bookingId,
				negotiatedAmount: amt
			});
			await booking.refetch();
			setSuccessfull(true);
			setNegotia(false);
			setNegotiatedAmount("");
			setTimeout(() => setSuccessfull(false), 4e3);
		} catch {}
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "mx-4 md:mx-10 pt-32 pb-24",
			children: [
				/* @__PURE__ */ jsx(BackBtn, { children: "billboard Marketing" }),
				/* @__PURE__ */ jsx(Steps, {
					step: 4,
					text: "#1 - Checkout"
				}),
				/* @__PURE__ */ jsx("div", { children: b?.listing?.imageUrl ? /* @__PURE__ */ jsx("img", {
					alt: "billboard",
					src: b.listing.imageUrl,
					className: "mx-auto"
				}) : null }),
				/* @__PURE__ */ jsx("div", {
					className: "w-full overflow-x-auto my-5",
					children: /* @__PURE__ */ jsxs("table", {
						className: "min-w-full bg-white",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-[#D0B301]/40",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Name"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Location"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Size"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Duration"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Start Date"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "End Date"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "py-2 px-2 md:px-3 border-b",
									children: "Cost/day"
								})
							] })
						}), /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: b?.listing?.name ?? "-"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: b?.listing ? `${b.listing.address}, ${b.listing.city}, ${b.listing.state}` : "-"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: "4m(H) by 12m(W)"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: b?.durationPlan ?? "-"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: b?.campaignStartDate ? String(b.campaignStartDate).slice(0, 10) : "-"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: b?.campaignEndDate ? String(b.campaignEndDate).slice(0, 10) : "-"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: b ? `₦${b.quotedTotal}` : "-"
							})
						] }) })]
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-[#D0B301]/40 flex justify-between w-full p-5 md:w-1/2 lg:w-1/3",
						children: [/* @__PURE__ */ jsx("h4", { children: "Total Amount" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "font-bold",
							children: b ? `₦${b.quotedTotal}` : "—"
						}), /* @__PURE__ */ jsx("div", { children: b?.durationPlan ?? "" })] })]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex md:justify-end space-x-3 my-3",
					children: [/* @__PURE__ */ jsx("button", {
						disabled: !b?.listingWasNegotiable || b?.minimumNegotiableAmount == null || b?.negotiatedAmount != null || negotiate.isPending,
						onClick: () => setNegotia(true),
						className: `w-123 h-12 rounded-10 my-2 ${!b?.listingWasNegotiable || b?.negotiatedAmount != null ? "bg-ads360yellow-100/50 text-black/50" : "hover:animate-changeColor hover:text-white bg-ads360yellow-100"}`,
						children: "Negotiate"
					}), /* @__PURE__ */ jsx(Link, {
						to: "/ads/$transaction_id",
						params: { transaction_id: String(bookingId || "") },
						disabled: !bookingId || b?.status === "paid",
						className: "hover:animate-changeColor hover:text-white bg-ads360yellow-100 w-123 h-12 rounded-10 my-2 disabled:opacity-60 flex items-center justify-center",
						children: "Pay Now"
					})]
				})
			]
		}),
		/* @__PURE__ */ jsx(Modal, {
			isOpen: negotia,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex justify-between mb-5",
					children: [/* @__PURE__ */ jsx("h4", {
						className: "",
						children: "Input Amount"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setNegotia(false),
						children: /* @__PURE__ */ jsx("img", {
							src: cancel,
							alt: "modal cancel botton",
							className: "w-5"
						})
					})]
				}), /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50",
								children: [
									" ",
									"₦",
									" "
								]
							}), /* @__PURE__ */ jsx("input", {
								type: "number",
								value: negotiatedAmount,
								onChange: handleNegotiate,
								className: "p-2 focus:outline-none w-full border rounded-r"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "text-red-700 text-xs",
								children: ["You cannot negotiat lower than ₦", b?.minimumNegotiableAmount ?? 0]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-red-700 text-xs",
								children: "You can only negotiat once"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ jsx("button", {
								disabled: negotiatedAmount === "" || b?.minimumNegotiableAmount != null && parseInt(negotiatedAmount) < b.minimumNegotiableAmount || negotiate.isPending,
								className: `${negotiatedAmount === "" || b?.minimumNegotiableAmount != null && parseInt(negotiatedAmount) < b.minimumNegotiableAmount || negotiate.isPending ? "bg-ads360gray-100" : "bg-ads360black-100/95 hover:bg-ads360black-100"} rounded mt-5  text-white  w-5/6 h-10`,
								children: negotiate.isPending ? "Sending..." : "Send Request"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ jsx(Modal, {
			isOpen: successfull,
			children: /* @__PURE__ */ jsxs("div", {
				className: "bg-white px-5 py-10 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10 grid grid-cols-1 content-center",
				children: [/* @__PURE__ */ jsx("img", {
					alt: "",
					src: success,
					className: "mx-auto w-2/6"
				}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("p", {
					className: "text-green-500 text-center mt-5 font-semibold",
					children: [
						"Request Sent ",
						/* @__PURE__ */ jsx("br", {}),
						" Successfully"
					]
				}) })]
			})
		})
	] });
};
var Route = createFileRoute("/_usersauth/ads/billboard/$slug/onboard/checkout/")({
	validateSearch: (search) => ({ bookingId: search.bookingId }),
	component: Checkout
});
//#endregion
//#region routeTree.gen.ts
var UsersauthRouteRoute = Route$53.update({
	id: "/_usersauth",
	getParentRoute: () => Route$54
});
var AdminRouteRoute = Route$52.update({
	id: "/_admin",
	getParentRoute: () => Route$54
});
var IndexRoute = Route$51.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$54
});
var VendorsBillboardsRouteRoute = Route$50.update({
	id: "/vendors/billboards",
	path: "/vendors/billboards",
	getParentRoute: () => Route$54
});
var UsersauthUsersRouteRoute = Route$49.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => UsersauthRouteRoute
});
var UsersauthAdsRouteRoute = Route$48.update({
	id: "/ads",
	path: "/ads",
	getParentRoute: () => UsersauthRouteRoute
});
var PublicLightnavbarRouteRoute = Route$47.update({
	id: "/_public/_lightnavbar",
	getParentRoute: () => Route$54
});
var PublicDarknavbarRouteRoute = Route$46.update({
	id: "/_public/_darknavbar",
	getParentRoute: () => Route$54
});
var AdminAdminRouteRoute = Route$45.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AdminRouteRoute
});
var VendorsInfluencersIndexRoute = Route$44.update({
	id: "/vendors/influencers/",
	path: "/vendors/influencers/",
	getParentRoute: () => Route$54
});
var VendorsBillboardsIndexRoute = Route$43.update({
	id: "/",
	path: "/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var UsersauthWalletIndexRoute = Route$42.update({
	id: "/wallet/",
	path: "/wallet/",
	getParentRoute: () => UsersauthRouteRoute
});
var UsersauthUsersIndexRoute = Route$41.update({
	id: "/",
	path: "/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthAdsIndexRoute = Route$40.update({
	id: "/",
	path: "/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var AdminAdminIndexRoute = Route$39.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminAdminRouteRoute
});
var AccessSignupIndexRoute = Route$38.update({
	id: "/_access/signup/",
	path: "/signup/",
	getParentRoute: () => Route$54
});
var AccessSigninIndexRoute = Route$37.update({
	id: "/_access/signin/",
	path: "/signin/",
	getParentRoute: () => Route$54
});
var AccessEmailVerificationIndexRoute = Route$36.update({
	id: "/_access/email-verification/",
	path: "/email-verification/",
	getParentRoute: () => Route$54
});
var VendorsBillboardsWalletIndexRoute = Route$35.update({
	id: "/wallet/",
	path: "/wallet/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsSettingsIndexRoute = Route$34.update({
	id: "/settings/",
	path: "/settings/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsRequestsIndexRoute = Route$33.update({
	id: "/requests/",
	path: "/requests/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsNegotiationsIndexRoute = Route$32.update({
	id: "/negotiations/",
	path: "/negotiations/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsListingIndexRoute = Route$31.update({
	id: "/listing/",
	path: "/listing/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsAddBillboardIndexRoute = Route$30.update({
	id: "/add-billboard/",
	path: "/add-billboard/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var UsersauthUsersWalletIndexRoute = Route$29.update({
	id: "/wallet/",
	path: "/wallet/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthUsersSettingsIndexRoute = Route$28.update({
	id: "/settings/",
	path: "/settings/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthUsersNegotiationsIndexRoute = Route$27.update({
	id: "/negotiations/",
	path: "/negotiations/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthUsersCampaignIndexRoute = Route$26.update({
	id: "/campaign/",
	path: "/campaign/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthUsersAnalysisIndexRoute = Route$25.update({
	id: "/analysis/",
	path: "/analysis/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthAdsWhatsappIndexRoute = Route$24.update({
	id: "/whatsapp/",
	path: "/whatsapp/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsSmsIndexRoute = Route$23.update({
	id: "/sms/",
	path: "/sms/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsInfluencerIndexRoute = Route$22.update({
	id: "/influencer/",
	path: "/influencer/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsDigitalIndexRoute = Route$21.update({
	id: "/digital/",
	path: "/digital/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsBillboardIndexRoute = Route$20.update({
	id: "/billboard/",
	path: "/billboard/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsTransaction_idIndexRoute = Route$19.update({
	id: "/$transaction_id/",
	path: "/$transaction_id/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var PublicLightnavbarFaqsIndexRoute = Route$18.update({
	id: "/faqs/",
	path: "/faqs/",
	getParentRoute: () => PublicLightnavbarRouteRoute
});
var PublicLightnavbarContactIndexRoute = Route$17.update({
	id: "/contact/",
	path: "/contact/",
	getParentRoute: () => PublicLightnavbarRouteRoute
});
var PublicLightnavbarAboutIndexRoute = Route$16.update({
	id: "/about/",
	path: "/about/",
	getParentRoute: () => PublicLightnavbarRouteRoute
});
var PublicDarknavbarDiscoveryIndexRoute = Route$15.update({
	id: "/discovery/",
	path: "/discovery/",
	getParentRoute: () => PublicDarknavbarRouteRoute
});
var AccessVendorAccessOnboardingIndexRoute = Route$14.update({
	id: "/_access/vendor-access/onboarding/",
	path: "/vendor-access/onboarding/",
	getParentRoute: () => Route$54
});
var VendorsBillboardsRequestsSlugIndexRoute = Route$13.update({
	id: "/requests/$slug/",
	path: "/requests/$slug/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsNegotiationsIdIndexRoute = Route$12.update({
	id: "/negotiations/$id/",
	path: "/negotiations/$id/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsListingSlugIndexRoute = Route$11.update({
	id: "/listing/$slug/",
	path: "/listing/$slug/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var UsersauthUsersWalletFundwalletIndexRoute = Route$10.update({
	id: "/wallet/fundwallet/",
	path: "/wallet/fundwallet/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthUsersNegotiationsIdIndexRoute = Route$9.update({
	id: "/negotiations/$id/",
	path: "/negotiations/$id/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthUsersCampaignSlugIndexRoute = Route$8.update({
	id: "/campaign/$slug/",
	path: "/campaign/$slug/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthAdsSmsCheckoutIndexRoute = Route$7.update({
	id: "/sms/checkout/",
	path: "/sms/checkout/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsInfluencerSlugIndexRoute = Route$6.update({
	id: "/influencer/$slug/",
	path: "/influencer/$slug/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsBillboardSlugIndexRoute = Route$5.update({
	id: "/billboard/$slug/",
	path: "/billboard/$slug/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var VendorsBillboardsListingSlugEditIndexRoute = Route$4.update({
	id: "/listing/$slug/edit/",
	path: "/listing/$slug/edit/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var UsersauthAdsInfluencerSlugOnboardingIndexRoute = Route$3.update({
	id: "/influencer/$slug/onboarding/",
	path: "/influencer/$slug/onboarding/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsBillboardSlugOnboardIndexRoute = Route$2.update({
	id: "/billboard/$slug/onboard/",
	path: "/billboard/$slug/onboard/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsInfluencerSlugOnboardingCheckoutIndexRoute = Route$1.update({
	id: "/influencer/$slug/onboarding/checkout/",
	path: "/influencer/$slug/onboarding/checkout/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsBillboardSlugOnboardCheckoutIndexRoute = Route.update({
	id: "/billboard/$slug/onboard/checkout/",
	path: "/billboard/$slug/onboard/checkout/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var AdminAdminRouteRouteChildren = { AdminAdminIndexRoute };
var AdminRouteRouteChildren = { AdminAdminRouteRoute: AdminAdminRouteRoute._addFileChildren(AdminAdminRouteRouteChildren) };
var AdminRouteRouteWithChildren = AdminRouteRoute._addFileChildren(AdminRouteRouteChildren);
var UsersauthAdsRouteRouteChildren = {
	UsersauthAdsIndexRoute,
	UsersauthAdsTransaction_idIndexRoute,
	UsersauthAdsBillboardIndexRoute,
	UsersauthAdsDigitalIndexRoute,
	UsersauthAdsInfluencerIndexRoute,
	UsersauthAdsSmsIndexRoute,
	UsersauthAdsWhatsappIndexRoute,
	UsersauthAdsBillboardSlugIndexRoute,
	UsersauthAdsInfluencerSlugIndexRoute,
	UsersauthAdsSmsCheckoutIndexRoute,
	UsersauthAdsBillboardSlugOnboardIndexRoute,
	UsersauthAdsInfluencerSlugOnboardingIndexRoute,
	UsersauthAdsBillboardSlugOnboardCheckoutIndexRoute,
	UsersauthAdsInfluencerSlugOnboardingCheckoutIndexRoute
};
var UsersauthAdsRouteRouteWithChildren = UsersauthAdsRouteRoute._addFileChildren(UsersauthAdsRouteRouteChildren);
var UsersauthUsersRouteRouteChildren = {
	UsersauthUsersIndexRoute,
	UsersauthUsersAnalysisIndexRoute,
	UsersauthUsersCampaignIndexRoute,
	UsersauthUsersNegotiationsIndexRoute,
	UsersauthUsersSettingsIndexRoute,
	UsersauthUsersWalletIndexRoute,
	UsersauthUsersCampaignSlugIndexRoute,
	UsersauthUsersNegotiationsIdIndexRoute,
	UsersauthUsersWalletFundwalletIndexRoute
};
var UsersauthRouteRouteChildren = {
	UsersauthAdsRouteRoute: UsersauthAdsRouteRouteWithChildren,
	UsersauthUsersRouteRoute: UsersauthUsersRouteRoute._addFileChildren(UsersauthUsersRouteRouteChildren),
	UsersauthWalletIndexRoute
};
var UsersauthRouteRouteWithChildren = UsersauthRouteRoute._addFileChildren(UsersauthRouteRouteChildren);
var PublicDarknavbarRouteRouteChildren = { PublicDarknavbarDiscoveryIndexRoute };
var PublicDarknavbarRouteRouteWithChildren = PublicDarknavbarRouteRoute._addFileChildren(PublicDarknavbarRouteRouteChildren);
var PublicLightnavbarRouteRouteChildren = {
	PublicLightnavbarAboutIndexRoute,
	PublicLightnavbarContactIndexRoute,
	PublicLightnavbarFaqsIndexRoute
};
var PublicLightnavbarRouteRouteWithChildren = PublicLightnavbarRouteRoute._addFileChildren(PublicLightnavbarRouteRouteChildren);
var VendorsBillboardsRouteRouteChildren = {
	VendorsBillboardsIndexRoute,
	VendorsBillboardsAddBillboardIndexRoute,
	VendorsBillboardsListingIndexRoute,
	VendorsBillboardsNegotiationsIndexRoute,
	VendorsBillboardsRequestsIndexRoute,
	VendorsBillboardsSettingsIndexRoute,
	VendorsBillboardsWalletIndexRoute,
	VendorsBillboardsListingSlugIndexRoute,
	VendorsBillboardsNegotiationsIdIndexRoute,
	VendorsBillboardsRequestsSlugIndexRoute,
	VendorsBillboardsListingSlugEditIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRouteRoute: AdminRouteRouteWithChildren,
	UsersauthRouteRoute: UsersauthRouteRouteWithChildren,
	PublicDarknavbarRouteRoute: PublicDarknavbarRouteRouteWithChildren,
	PublicLightnavbarRouteRoute: PublicLightnavbarRouteRouteWithChildren,
	VendorsBillboardsRouteRoute: VendorsBillboardsRouteRoute._addFileChildren(VendorsBillboardsRouteRouteChildren),
	AccessEmailVerificationIndexRoute,
	AccessSigninIndexRoute,
	AccessSignupIndexRoute,
	VendorsInfluencersIndexRoute,
	AccessVendorAccessOnboardingIndexRoute
};
var routeTree = Route$54._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region router.tsx
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true
	});
}
//#endregion
export { getRouter };
