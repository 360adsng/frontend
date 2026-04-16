import { a as clearAuthTokens, i as baseFetchJson, n as ACCESS_TOKEN_STORAGE_KEY, o as saveAccountType, r as ApiError, s as saveAuthTokens, t as COUNTRIES$1 } from "./countries-DNj5C3SE.js";
import { useEffect, useRef, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent, redirect, useNavigate, useParams, useRouter, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { FiArrowRight, FiMenu } from "react-icons/fi/index.esm.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import RawCountUp from "react-countup";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { GrTooltip } from "react-icons/gr/index.esm.js";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs/index.esm.js";
import { FaAngleDown } from "react-icons/fa/index.esm.js";
import { AiOutlineDownload } from "react-icons/ai/index.esm.js";
import Calendar from "react-calendar";
import { MdOutlineCancel } from "react-icons/md/index.esm.js";
//#region node_modules/sonner/dist/styles.css?url
var styles_default = "/assets/styles-DDCWxn3B.css";
//#endregion
//#region styles/global.css?url
var global_default = "/assets/global-CLMe_eIB.css";
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
var Route$47 = createRootRoute({
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
//#region app/_usersauth/route.tsx
var Layout$5 = () => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Outlet, {}) });
};
var Route$46 = createFileRoute("/_usersauth")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (!hasAccessToken()) throw redirect({ to: "/signin" });
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
				children: /* @__PURE__ */ jsx("button", {
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
var Route$45 = createFileRoute("/")({ component: Home });
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
async function logout$6() {
	await baseFetchJson("/auth/sign-out", { method: "POST" });
}
//#endregion
//#region endpoint/auth/useAuth.ts
function errorMessage(error) {
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
			toast.error(errorMessage(error));
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
			toast.error(errorMessage(error));
		}
	});
}
function useLogout() {
	return useMutation({
		mutationFn: logout$6,
		onSuccess: () => {
			clearAuthTokens();
			toast.success("Logged out.");
		},
		onError: (error) => {
			clearAuthTokens();
			toast.error(errorMessage(error));
		}
	});
}
//#endregion
//#region components/navs/Vendors/billboard/BillBoardSideNav.tsx
var ads360white$1 = "/logo/360white.svg";
var settings$3 = "/icons/usericon/whitesettings.svg";
var onsettings$3 = "/icons/usericon/onsettings.svg";
var dashboard$3 = "/icons/usericon/whitedashboard.svg";
var ondashboard$3 = "/icons/usericon/ondashboard.svg";
var campaign$3 = "/icons/usericon/whitecampaign.svg";
var oncampaign$3 = "/icons/usericon/oncampaign.svg";
var add$1 = "/icons/usericon/add.svg";
var list$1 = "/icons/usericon/list.svg";
var onlist$1 = "/icons/usericon/yellowlist.svg";
var onAdd$1 = "/icons/usericon/addyellow.svg";
var wallet$5 = "/icons/usericon/whitewallet.svg";
var onwallet$3 = "/icons/usericon/onwallet.svg";
var logout$5 = "/icons/usericon/whitelogout.svg";
var onlogout$3 = "/icons/usericon/onlogout.svg";
var BillBoardSideNav = () => {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const { mutate: logoutVendor, isPending: isLoggingOut } = useLogout();
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
	const handleLogout = () => {
		logoutVendor(void 0, { onSettled: () => {
			navigate({ to: "/vendors-acess/login" });
		} });
	};
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
			/* @__PURE__ */ jsxs("ul", {
				className: "space-y-4 my-14",
				children: [navItem2.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
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
				}) }, i)), /* @__PURE__ */ jsx("li", {
					onClick: handleLogout,
					children: isLoggingOut ? /* @__PURE__ */ jsxs(Link, {
						to: "#",
						className: "border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
						children: [/* @__PURE__ */ jsx("img", {
							src: onlogout$3,
							alt: "logout"
						}), /* @__PURE__ */ jsx("span", {
							className: "hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
							children: "Logging out..."
						})]
					}) : /* @__PURE__ */ jsxs(Link, {
						to: "#",
						className: "py-2 px-4 flex",
						children: [/* @__PURE__ */ jsx("img", {
							src: logout$5,
							alt: "logout"
						}), /* @__PURE__ */ jsx("span", {
							className: "hidden group-hover:block px-2 xl:px-4 hover:font-bold",
							children: "Logout"
						})]
					})
				})]
			})
		]
	});
};
//#endregion
//#region components/modal/Notification.tsx
var cancel$8 = "/icons/usericon/modalCancelBotton.svg";
var Notification = ({ isOpen, children, handleNotification }) => {
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(motion.div, {
		className: "fixed z-[10000000] top-0 w-full bg-black/50 h-full",
		initial: { right: 0 },
		animate: {
			right: 1,
			transition: {
				ease: "easeOut",
				duration: 1
			}
		},
		exit: {
			right: 0,
			transition: {
				ease: "easeIn",
				duration: .5
			}
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-[#F7F8F8] fixed right-0 w-10/12 md:w-6/12 lg:w-4/12 h-full",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "bg-ads360black-100 text-ads360light-100 p-5 flex justify-between",
				children: [/* @__PURE__ */ jsx("p", { children: "Notifications" }), /* @__PURE__ */ jsx("button", {
					className: "",
					onClick: handleNotification,
					children: /* @__PURE__ */ jsx("img", {
						src: cancel$8,
						alt: "cancel",
						className: "w-5 h-5"
					})
				})]
			}), children]
		})
	}) }) });
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
//#region components/navs/Vendors/billboard/BillBoardDrawerContent.tsx
var settings$2 = "/icons/usericon/whitesettings.svg";
var onsettings$2 = "/icons/usericon/onsettings.svg";
var dashboard$2 = "/icons/usericon/whitedashboard.svg";
var ondashboard$2 = "/icons/usericon/ondashboard.svg";
var campaign$2 = "/icons/usericon/whitecampaign.svg";
var oncampaign$2 = "/icons/usericon/oncampaign.svg";
var wallet$4 = "/icons/usericon/whitewallet.svg";
var onwallet$2 = "/icons/usericon/onwallet.svg";
var logout$4 = "/icons/usericon/whitelogout.svg";
var onlogout$2 = "/icons/usericon/onlogout.svg";
var add = "/icons/usericon/add.svg";
var list = "/icons/usericon/list.svg";
var onlist = "/icons/usericon/yellowlist.svg";
var onAdd = "/icons/usericon/addyellow.svg";
var BillBoardDrawerContent = ({ toggleDrawer }) => {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const { mutate: logoutVendor, isPending: isLoggingOut } = useLogout();
	const handleLogout = () => {
		logoutVendor(void 0, { onSettled: () => {
			toggleDrawer();
			navigate({ to: "/vendors-acess/login" });
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
					src: onlogout$2,
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
					src: logout$4,
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
var logout$3 = "/icons/usericon/onlogout.svg";
var BillBoardNav = () => {
	const [dropDown, setDropDown] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const navigate = useNavigate();
	const { mutate: logoutVendor, isPending: isLoggingOut } = useLogout();
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
					/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/vendors/billboards/settings",
						children: /* @__PURE__ */ jsx("img", {
							className: "border-4 rounded-[50%]",
							width: 45,
							height: 45,
							src: avatar$2,
							alt: "avatar"
						})
					}) })
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
										navigate({ to: "/vendors-acess/login" });
									} });
								},
								children: [/* @__PURE__ */ jsx("img", {
									src: logout$3,
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
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("main", {
		className: "md:flex",
		children: [/* @__PURE__ */ jsx("section", {
			className: "group hidden transistion duration-300 md:block basis-[6%] hover:basis-[18.2%] xl:hover:basis-[15.8%] ",
			children: /* @__PURE__ */ jsx(BillBoardSideNav, {})
		}), /* @__PURE__ */ jsxs("section", {
			className: "md:basis-[100%]",
			children: [/* @__PURE__ */ jsx(BillBoardNav, {}), /* @__PURE__ */ jsx(Outlet, {})]
		})]
	}) });
}
var Route$44 = createFileRoute("/vendors/billboards")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (!hasAccessToken()) throw redirect({ to: "/vendors-acess/login" });
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
var logout$2 = "/icons/usericon/whitelogout.svg";
var onlogout$1 = "/icons/usericon/onlogout.svg";
function UserSideNav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
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
		}
	];
	const navItem2 = [{
		link: "/users/settings",
		name: "Settings",
		off: settings$1,
		on: onsettings$1
	}];
	const handleLogout = () => {
		logoutUser(void 0, { onSettled: () => {
			navigate({ to: "/signin" });
		} });
	};
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
			/* @__PURE__ */ jsxs("ul", {
				className: "space-y-4 my-14",
				children: [navItem2.map((items, i) => /* @__PURE__ */ jsx("li", { children: pathname === items.link ? /* @__PURE__ */ jsxs(Link, {
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
				}) }, i)), /* @__PURE__ */ jsx("li", { children: isLoggingOut ? /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: handleLogout,
					className: "border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: onlogout$1,
						alt: "logout"
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold",
						children: "Logging out..."
					})]
				}) : /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: handleLogout,
					className: "py-2 px-4 flex",
					children: [/* @__PURE__ */ jsx("img", {
						src: logout$2,
						alt: "logout"
					}), /* @__PURE__ */ jsx("span", {
						className: "hidden group-hover:block px-2 xl:px-4 hover:font-bold",
						children: "Logout"
					})]
				}) })]
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
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	const navigate = useNavigate();
	const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
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
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/users/settings",
							children: /* @__PURE__ */ jsx("img", {
								className: "border-4 rounded-[50%]",
								width: 45,
								height: 45,
								src: avatar$1,
								alt: "avatar"
							})
						}) })
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
var Route$43 = createFileRoute("/_usersauth/users")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (!hasAccessToken()) throw redirect({ to: "/signin" });
	},
	component: Layout$3
});
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
var Route$42 = createFileRoute("/_usersauth/ads")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (!hasAccessToken()) throw redirect({ to: "/signin" });
	},
	component: Layout$2
});
//#endregion
//#region app/_public/_lightnavbar/route.tsx
function Layout$1() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(LightNavbar, {}),
		/* @__PURE__ */ jsx(Outlet, {}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
var Route$41 = createFileRoute("/_public/_lightnavbar")({ component: Layout$1 });
//#endregion
//#region components/navs/public/DarkNavbar.tsx
var MobileMenu = "/icons/menu.svg";
var DarkNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);
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
			/* @__PURE__ */ jsx("div", {
				className: "hidden md:block text-center",
				children: /* @__PURE__ */ jsx("button", {
					className: "group rounded-10 hover:animate-changeColor2 hover:text-ads360light-100 text-ads360black-100 bg-ads360light-100 w-123 h-12",
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
var Route$40 = createFileRoute("/_public/_darknavbar")({ component: Layout });
//#endregion
//#region app/vendors/influencers/index.tsx
var page = () => {
	return /* @__PURE__ */ jsx("div", { children: "page" });
};
var Route$39 = createFileRoute("/vendors/influencers/")({ component: page });
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
//#region app/vendors/billboards/index.tsx
var naira$5 = "/icons/usericon/naira.svg";
var billboard$2 = "/icons/led2.svg";
var bluecampaign$1 = "/icons/usericon/bluecampiagn.svg";
var BillBoardDashboard = () => {
	return /* @__PURE__ */ jsxs("section", {
		className: "bg-ads360-hash min-h-screen px-4 md:px-10 py-14",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-2xl",
				children: "Hello Aliyu, what would you like to do?"
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
								children: ["₦2900.00", /* @__PURE__ */ jsx("p", {
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
var Route$38 = createFileRoute("/vendors/billboards/")({ component: BillBoardDashboard });
//#endregion
//#region app/_usersauth/users/index.tsx
var naira$4 = "/icons/usericon/naira.svg";
var bluecampaign = "/icons/usericon/bluecampiagn.svg";
var cluterpoint = "/icons/usericon/cluterpoint.svg";
var createcampiagn = "/images/Createacampaign.png";
var allcampiagn = "/images/allcampaign.png";
var wishlist = "/images/wishlist.png";
function Dashboard() {
	return /* @__PURE__ */ jsxs("section", {
		className: "bg-ads360-hash min-h-screen px-4 md:px-10 py-14",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-2xl",
				children: "Hello Aliyu, what would you like to do?"
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
var Route$37 = createFileRoute("/_usersauth/users/")({ component: Dashboard });
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
var Route$36 = createFileRoute("/_usersauth/ads/")({ component: Ads });
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
function inputClass$1(hasError) {
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
											className: inputClass$1(!!businessErrors.businessName)
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
											className: inputClass$1(!!businessErrors.email)
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
														className: inputClass$1(!!businessErrors.password)
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
														className: inputClass$1(!!businessErrors.confirmPassword)
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
												className: inputClass$1(!!businessErrors.contactName),
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
														className: inputClass$1(!!businessErrors["phone.countryIso2"]),
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
														className: inputClass$1(!!businessErrors["phone.nationalNumber"]),
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
												className: inputClass$1(!!individualErrors.firstName)
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
												className: inputClass$1(!!individualErrors.lastName)
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
											className: inputClass$1(!!individualErrors.email)
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
													className: inputClass$1(!!individualErrors.password)
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
													className: inputClass$1(!!individualErrors.confirmPassword)
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
													className: inputClass$1(!!individualErrors["phone.countryIso2"]),
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
													className: inputClass$1(!!individualErrors["phone.nationalNumber"])
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
var Route$35 = createFileRoute("/_access/signup/")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (hasAccessToken()) throw redirect({ to: "/users" });
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
function inputClass(hasError) {
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
		login(parsed.data, { onSuccess: () => {
			router.navigate({ to: "/users" });
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
											className: inputClass(!!errors.email)
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
												className: inputClass(!!errors.password),
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
var Route$34 = createFileRoute("/_access/signin/")({
	beforeLoad: () => {
		if (typeof window === "undefined") return;
		if (hasAccessToken()) throw redirect({ to: "/users" });
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
var Route$33 = createFileRoute("/_access/email-verification/")({ component: EmailVerification });
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
var WalletSection$1 = () => {
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
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h3", { children: "Account Name" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-stone-400 text-xl my-4",
								children: "Ayomike Charles"
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "my-3 flex items-center space-x-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "relative group",
									children: [/* @__PURE__ */ jsx(GrTooltip, {}), /* @__PURE__ */ jsx("div", {
										className: "hidden group-hover:inline",
										children: /* @__PURE__ */ jsx(Tooltip, { info: "this is your real balance but you cannot widthdraw from it" })
									})]
								}), /* @__PURE__ */ jsx("p", { children: "Fixed Balance" })]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex",
								children: [/* @__PURE__ */ jsx("img", {
									alt: "naira",
									src: naira$3,
									className: "w-14 h-14"
								}), /* @__PURE__ */ jsxs("div", {
									className: "px-3",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-2xl",
										children: "₦1000000.00"
									}), /* @__PURE__ */ jsx("h3", {
										className: "text-stone-400 text-sm",
										children: "Available Balance"
									})]
								})]
							})] })
						] }),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "mt-5 md:my-0",
							children: "360ads Wallet ID"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xl text-ads360yellow-100 my-4",
							children: "3211711562"
						})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
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
								children: [/* @__PURE__ */ jsx("p", {
									className: "text-2xl",
									children: "₦1000000.00"
								}), /* @__PURE__ */ jsx("h3", {
									className: "text-stone-400 text-sm",
									children: "Available Balance"
								})]
							})]
						})] })] }),
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
					}), /* @__PURE__ */ jsxs("ul", { children: [
						/* @__PURE__ */ jsxs("li", {
							className: "mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold",
								children: "credit wallet"
							}), /* @__PURE__ */ jsx("p", { children: "June 1, 2023" })] }), /* @__PURE__ */ jsx("div", {
								className: "text-green-500",
								children: "+₦5000.00"
							})]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold",
								children: "widthdraw"
							}), /* @__PURE__ */ jsx("p", { children: "June 6, 2023" })] }), /* @__PURE__ */ jsx("div", {
								className: "text-red-500",
								children: "+₦3000.00"
							})]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold",
								children: "credit wallet"
							}), /* @__PURE__ */ jsx("p", { children: "June 8, 2023" })] }), /* @__PURE__ */ jsx("div", {
								className: "text-green-500",
								children: "+₦8000.00"
							})]
						})
					] })]
				})
			]
		})
	});
};
var Route$32 = createFileRoute("/vendors/billboards/wallet/")({ component: WalletSection$1 });
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
var Route$31 = createFileRoute("/vendors/billboards/settings/")({ component: EditBillboardComponent });
//#endregion
//#region app/vendors/billboards/requests/index.tsx
var search$1 = "/icons/search.svg";
var Requests = () => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", {
		className: "bg-ads360-hash min-h-screen px-4 md:px-10 py-14",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex lg:w-1/4 md:w-2/5 bg-[#f7f8f8] space-x-2 rounded-[40px] px-5 h-10",
				children: [/* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsx("img", {
					src: search$1,
					alt: "searchicon"
				}) }), /* @__PURE__ */ jsx("input", {
					className: "rounded-10 w-full bg-transparent focus:outline-none h-full",
					placeholder: "search..."
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
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex w-full justify-between",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex space-x-2",
					children: [
						/* @__PURE__ */ jsx("button", {
							className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
							children: "<"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
							children: "1"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
							children: "2"
						}),
						/* @__PURE__ */ jsx("button", { children: "..." }),
						/* @__PURE__ */ jsx("button", {
							className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
							children: "7"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
							children: "8"
						}),
						/* @__PURE__ */ jsx("button", {
							className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
							children: ">"
						})
					]
				}), /* @__PURE__ */ jsx("div", { children: "1 of 8" })]
			})
		]
	}) });
};
var Route$30 = createFileRoute("/vendors/billboards/requests/")({ component: Requests });
//#endregion
//#region components/ui/BillboardSorter.tsx
var cancel$6 = "/icons/usericon/modalCancelBotton.svg";
var BillboardSorter = ({ toggleModal, modal }) => {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex justify-between",
			children: [/* @__PURE__ */ jsx("p", { children: "Filter billboard" }), modal === true && /* @__PURE__ */ jsx("button", {
				onClick: toggleModal,
				children: /* @__PURE__ */ jsx("img", {
					src: cancel$6,
					alt: "modal cancel botton",
					className: "w-5"
				})
			})]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "my-2",
			children: [/* @__PURE__ */ jsx("p", { children: "Billboard Type" }), /* @__PURE__ */ jsxs("select", {
				defaultValue: "select",
				className: "p-2 border focus:outline-none rounded w-full",
				children: [
					/* @__PURE__ */ jsx("option", {
						disabled: true,
						children: "select"
					}),
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
			children: [
				/* @__PURE__ */ jsx("p", { children: "Location" }),
				/* @__PURE__ */ jsx("input", {
					list: "location",
					name: "browser",
					id: "browser",
					className: "border focus:outline-none rounded w-full p-2"
				}),
				/* @__PURE__ */ jsxs("datalist", {
					id: "location",
					className: "",
					children: [
						/* @__PURE__ */ jsx("option", { value: "Ikeja" }),
						/* @__PURE__ */ jsx("option", { value: "ikotun" }),
						/* @__PURE__ */ jsx("option", { value: "port harcourt" }),
						/* @__PURE__ */ jsx("option", { value: "abuja" }),
						/* @__PURE__ */ jsx("option", { value: "victoria island" })
					]
				})
			]
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "my-2",
			children: [/* @__PURE__ */ jsx("p", { children: "Status" }), /* @__PURE__ */ jsxs("select", {
				className: "p-2 border focus:outline-none rounded w-full",
				children: [/* @__PURE__ */ jsx("option", { children: "Negotiable" }), /* @__PURE__ */ jsx("option", { children: "Non Negotiable" })]
			})]
		}),
		/* @__PURE__ */ jsx("button", {
			className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5  text-white  w-2/6 h-10",
			children: "Search"
		})
	] });
};
//#endregion
//#region app/vendors/billboards/listing/index.tsx
var billboardImage1$1 = "/del/billboard1.png";
var billboardImage2$6 = "/del/billboard2.png";
var naira$2 = "/icons/naira.svg";
var location$3 = "/icons/yellowlocation.svg";
function Billboards$1() {
	const [filter, setFilter] = useState(false);
	const [wishlist, setWishlist] = useState([
		4,
		8,
		2,
		9
	]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "bg-ads360-hash min-h-screen px-4 md:px-10 py-14",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
			className: "text-2xl",
			children: "Billboard listing"
		}), /* @__PURE__ */ jsx("p", { children: "Check here for all your billboards" })] }), /* @__PURE__ */ jsxs("section", {
			className: "xl:flex my-5",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "gap-4 md:pr-4 grid grid-cols-1 md:grid-cols-2 basis-4/5",
					children: [
						{
							id: 1,
							name: "Eko hotel led, victoria island",
							location: "Along Adetokunbo Ademola Street by Eko",
							image: billboardImage1$1,
							pricepd: "60000",
							Impressions: "70 per day",
							negotiable: "yes",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						},
						{
							id: 2,
							name: "Adetokunbo Ademola led, victoria island",
							location: "Along Adetokunbo Ademola Street by Bishop",
							image: billboardImage2$6,
							negotiable: "yes",
							pricepd: "30000",
							Impressions: "40 per day",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						},
						{
							id: 3,
							name: "Eko hotel led, victoria island",
							location: "Along Adetokunbo Ademola Street by Eko",
							image: billboardImage1$1,
							pricepd: "40000",
							negotiable: "no",
							Impressions: "50 per day",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						},
						{
							id: 4,
							name: "Adetokunbo Ademola led, victoria island",
							location: "Along Adetokunbo Ademola Street by Bishop",
							image: billboardImage2$6,
							pricepd: "35000",
							negotiable: "yes",
							Impressions: "40 per day",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						},
						{
							id: 5,
							name: "Adetokunbo Ademola led, victoria island",
							location: "Along Adetokunbo Ademola Street by Bishop",
							image: billboardImage2$6,
							pricepd: "35000",
							Impressions: "40 per day",
							negotiable: "no",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						},
						{
							id: 6,
							name: "Adetokunbo Ademola led, victoria island",
							location: "Along Adetokunbo Ademola Street by Bishop",
							image: billboardImage2$6,
							pricepd: "35000",
							negotiable: "no",
							Impressions: "40 per day",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						},
						{
							id: 7,
							name: "Adetokunbo Ademola led, victoria island",
							location: "Along Adetokunbo Ademola Street by Bishop",
							image: billboardImage2$6,
							pricepd: "35000",
							negotiable: "no",
							Impressions: "40 per day",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						},
						{
							id: 8,
							name: "Adetokunbo Ademola led, victoria island",
							location: "Along Adetokunbo Ademola Street by Bishop",
							image: billboardImage2$6,
							pricepd: "35000",
							negotiable: "yes",
							Impressions: "40 per day",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						},
						{
							id: 9,
							name: "Adetokunbo Ademola led, victoria island",
							location: "Along Adetokunbo Ademola Street by Bishop",
							image: billboardImage2$6,
							pricepd: "35000",
							negotiable: "yes",
							Impressions: "40 per day",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						},
						{
							id: 10,
							name: "Adetokunbo Ademola led, victoria island",
							location: "Along Adetokunbo Ademola Street by Bishop",
							image: billboardImage2$6,
							pricepd: "35000",
							negotiable: "yes",
							Impressions: "40 per day",
							type: "Double faced Gantry LED",
							duration: "14hrs (6am - 9pm) 6days/week"
						}
					].map((billboard) => /* @__PURE__ */ jsxs("div", {
						className: "rounded bg-white border border-ads360yellow-100",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [
									billboard.negotiable === "yes" && /* @__PURE__ */ jsx("div", {
										className: "absolute w-1/2 md:w-2/3 xl:w-1/2 bg-ads360black-100/70 text-ads360light-100 rounded right-3 top-4 text-center py-2",
										children: "Negotiable"
									}),
									/* @__PURE__ */ jsx("img", {
										alt: billboard.name,
										src: billboard.image,
										className: "w-full rounded-t h-auto"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex text-ads360yellow-100 font-bold w-full text-sm md:text-base p-2",
										children: [/* @__PURE__ */ jsx("img", {
											src: location$3,
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
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-bold",
											children: "location: "
										}), billboard.location]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "my-1",
										children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-bold",
											children: "Impression: "
										}), billboard.Impressions] })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "my-1",
										children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-bold",
											children: "Board-type: "
										}), billboard.type] })
									}),
									/* @__PURE__ */ jsx("div", {
										className: "my-1",
										children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-bold",
											children: "Run-time: "
										}), billboard.duration] })
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
										billboard.pricepd
									]
								}), /* @__PURE__ */ jsx("button", {
									className: "group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12",
									children: /* @__PURE__ */ jsx(Link, {
										to: `/vendors/billboards/listing/${billboard.id}`,
										children: "View Details"
									})
								})]
							})
						]
					}, billboard.id))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "basis-1/5 text-sm hidden xl:block",
					children: /* @__PURE__ */ jsx("div", {
						className: "top-[12.5rem] sticky rounded border p-3 border-ads360yellow-100 bg-white ",
						children: /* @__PURE__ */ jsx(BillboardSorter, {
							toggleModal: () => {},
							modal: false
						})
					})
				}),
				filter === false && /* @__PURE__ */ jsx("div", {
					className: "fixed w-full left-3 bottom-5 xl:hidden",
					children: /* @__PURE__ */ jsx("button", {
						className: "rounded-10 font-bold border bg-ads360yellow-100 shadow-md border-white w-12 h-12",
						onClick: () => {
							setFilter(true);
						},
						children: "Filter"
					})
				})
			]
		})]
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen: filter,
		children: /* @__PURE__ */ jsx("div", {
			className: "bg-white p-3 w-10/12 md:w-9/12 mx-auto rounded-10",
			children: /* @__PURE__ */ jsx(BillboardSorter, {
				modal: true,
				toggleModal: () => setFilter(false)
			})
		})
	})] });
}
var Route$29 = createFileRoute("/vendors/billboards/listing/")({ component: Billboards$1 });
//#endregion
//#region components/inputs/FilesInput.tsx
var FilesInput = ({ handleChange, warning, accept, previewName }) => {
	const input = useRef(null);
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "bg-white flex items-center pl-3 justify-between rounded-10 my-1 w-full ...",
			children: [/* @__PURE__ */ jsx("div", { children: previewName !== void 0 && previewName.length > 10 ? previewName.slice(0, 9) + "..." + previewName.slice(-3) : previewName }), /* @__PURE__ */ jsx("button", {
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
var Add = () => {
	const [successfull, setSuccessfull] = useState(false);
	const navigate = useNavigate();
	const handleSubmitTemp = (e) => {
		e.preventDefault();
		setSuccessfull(true);
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
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
						children: [/* @__PURE__ */ jsx("p", { children: "Billboard name" }), /* @__PURE__ */ jsx("input", { className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]" })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Price" }), /* @__PURE__ */ jsx("input", { className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]" })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Location" }), /* @__PURE__ */ jsx("input", { className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]" })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Board Type" }), /* @__PURE__ */ jsx("input", { className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]" })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Daily Impressions" }), /* @__PURE__ */ jsx("input", {
							type: "number",
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Duration per display" }), /* @__PURE__ */ jsx("input", {
							type: "number",
							className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Time" }), /* @__PURE__ */ jsx("input", {
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
									className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "basis-1/2",
								children: /* @__PURE__ */ jsx("input", {
									placeholder: "height",
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
									className: "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
								})
							}), /* @__PURE__ */ jsx("div", {
								className: "basis-1/2",
								children: /* @__PURE__ */ jsx("input", {
									placeholder: "height",
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
								/* @__PURE__ */ jsx("option", { children: "Potrait" }),
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
								/* @__PURE__ */ jsx("option", { children: "Yes" }),
								/* @__PURE__ */ jsx("option", { children: "No" })
							]
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "my-3",
						children: [/* @__PURE__ */ jsx("p", { children: "Traffic Description" }), /* @__PURE__ */ jsx("textarea", {
							rows: 4,
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
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen: successfull,
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-white w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10 grid grid-cols-1 content-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-green-500 border-b p-3 font-semibold",
					children: "Billboard Added Successfully"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "px-3 py-5 border-b",
					children: "Do you want to add another board?"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end space-x-2 p-3",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => setSuccessfull(false),
						className: `bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2`,
						children: "Yes"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => navigate({ to: "/vendors/billboards/listing" }),
						className: `bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2`,
						children: "No"
					})]
				}),
				/* @__PURE__ */ jsx("div", {})
			]
		})
	})] });
};
var Route$28 = createFileRoute("/vendors/billboards/add-billboard/")({ component: Add });
//#endregion
//#region app/_usersauth/users/wallet/index.tsx
var naira$1 = "/icons/naira.svg";
var filter = "/icons/filter.svg";
var makepayment = "/icons/makepayment.svg";
var whatsAppPoint = "/icons/usericon/whatsappPoint.svg";
var WalletSection = () => {
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
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h3", { children: "Account Name" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-stone-400 text-xl my-4",
								children: "Ayomike Charles"
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "my-3",
								children: "Balance"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex",
								children: [/* @__PURE__ */ jsx("img", {
									alt: "naira",
									src: naira$1,
									className: "w-14 h-14"
								}), /* @__PURE__ */ jsxs("div", {
									className: "px-3",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-2xl",
										children: "₦1000000.00"
									}), /* @__PURE__ */ jsx("h3", {
										className: "text-stone-400 text-sm",
										children: "Available Balance"
									})]
								})]
							})] })
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("h3", {
								className: "mt-5 md:my-0",
								children: "360ads Wallet ID"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-xl text-ads360yellow-100 my-4",
								children: "3211711562"
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "my-3",
								children: "WhatsApp Point"
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex",
								children: [/* @__PURE__ */ jsx("img", {
									alt: "naira",
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
							})] })
						] }),
						/* @__PURE__ */ jsx("div", {
							className: "",
							children: /* @__PURE__ */ jsxs(Link, {
								to: "wallet/fundwallet",
								className: "flex px-10 space-x-5 py-5 my-5 md:my-0 rounded border text-ads360light-100 bg-ads360black-100/95 hover:bg-ads360black-100",
								children: [/* @__PURE__ */ jsx("img", {
									alt: "make payment icon",
									src: makepayment,
									className: "w-5 h-5"
								}), /* @__PURE__ */ jsx("span", { children: "Fund Wallet" })]
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
								src: filter,
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
					}), /* @__PURE__ */ jsxs("ul", { children: [
						/* @__PURE__ */ jsxs("li", {
							className: "mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold",
								children: "funded wallet"
							}), /* @__PURE__ */ jsx("p", { children: "June 1, 2023" })] }), /* @__PURE__ */ jsx("div", {
								className: "text-green-500",
								children: "+₦5000.00"
							})]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold",
								children: "debited wallet"
							}), /* @__PURE__ */ jsx("p", { children: "June 6, 2023" })] }), /* @__PURE__ */ jsx("div", {
								className: "text-red-500",
								children: "+₦3000.00"
							})]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-bold",
								children: "funded wallet"
							}), /* @__PURE__ */ jsx("p", { children: "June 8, 2023" })] }), /* @__PURE__ */ jsx("div", {
								className: "text-green-500",
								children: "+₦8000.00"
							})]
						})
					] })]
				})
			]
		})
	});
};
var Route$27 = createFileRoute("/_usersauth/users/wallet/")({ component: WalletSection });
//#endregion
//#region app/_usersauth/users/settings/index.tsx
var $$splitComponentImporter = () => import("./settings-BjApf04W.js");
var Route$26 = createFileRoute("/_usersauth/users/settings/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region components/ui/Table.tsx
var search = "/icons/search.svg";
var Table = () => {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex lg:w-1/4 md:w-2/5 bg-[#f7f8f8] space-x-2 rounded-[40px] px-5 h-10",
			children: [/* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsx("img", {
				src: search,
				alt: "searchicon"
			}) }), /* @__PURE__ */ jsx("input", {
				className: "rounded-10 w-full bg-transparent focus:outline-none h-full",
				placeholder: "search..."
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
									to: `/users/campaign/1`,
									children: "view"
								})
							})
						] }),
						/* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-br",
								children: "#2"
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
									to: `/users/campaign/2`,
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
									to: `/users/campaign/3`,
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
								children: "completed"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: /* @__PURE__ */ jsx(Link, {
									to: `/users/campaign/3`,
									children: "view"
								})
							})
						] })
					]
				})]
			})
		}),
		/* @__PURE__ */ jsxs("div", {
			className: "flex w-full justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex space-x-2",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
						children: "<"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
						children: "1"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
						children: "2"
					}),
					/* @__PURE__ */ jsx("button", { children: "..." }),
					/* @__PURE__ */ jsx("button", {
						className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
						children: "7"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
						children: "8"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "border rounded-10 border-ads360yellow-100 py-1 px-2",
						children: ">"
					})
				]
			}), /* @__PURE__ */ jsx("div", { children: "1 of 8" })]
		})
	] });
};
//#endregion
//#region app/_usersauth/users/campaign/index.tsx
var dash$2 = "/icons/dash.svg";
var Campaign = () => {
	const [view, setView] = useState("Billboard");
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "bg-[#E9E9E9] px-4 md:px-10 pt-14",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "text-2xl",
				children: "Campaigns"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 mb-5 mt-3",
				children: "Check all ads campaign history"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto py-1",
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-[600px]  md:w-full flex justify-between md:justify-start md:space-x-3",
					children: [
						/* @__PURE__ */ jsxs("button", {
							className: "relative",
							onClick: () => setView("Billboard"),
							children: ["Billboard", view === "Billboard" && /* @__PURE__ */ jsx("img", {
								alt: "Billboard Overview selected",
								src: dash$2,
								className: "w-2/3 mx-auto absolute top-[20px] left-[17%]"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							className: "relative",
							onClick: () => setView("Influencer"),
							children: ["Influencer", view === "Influencer" && /* @__PURE__ */ jsx("img", {
								alt: "Billboard Overview selected",
								src: dash$2,
								className: "w-2/3 mx-auto absolute top-[20px] left-[17%]"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							className: "relative",
							onClick: () => setView("sms"),
							children: ["Smart sms", view === "sms" && /* @__PURE__ */ jsx("img", {
								alt: "Billboard Overview selected",
								src: dash$2,
								className: "w-2/3 mx-auto absolute top-[20px] left-[17%]"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							className: "relative",
							onClick: () => setView("Whatsapp"),
							children: ["Whatsapp", view === "Whatsapp" && /* @__PURE__ */ jsx("img", {
								alt: "Billboard Overview selected",
								src: dash$2,
								className: "w-2/3 mx-auto absolute top-[20px] left-[17%]"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							className: "relative",
							onClick: () => setView("Digital"),
							children: ["Digital Ads", view === "Digital" && /* @__PURE__ */ jsx("img", {
								alt: "Billboard Overview selected",
								src: dash$2,
								className: "w-2/3 mx-auto absolute top-[20px] left-[17%]"
							})]
						})
					]
				})
			})
		]
	}), /* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash px-4 md:px-10 py-14",
		children: [
			view === "Billboard" && /* @__PURE__ */ jsx(Table, {}),
			view === "Influencer" && /* @__PURE__ */ jsx("div", { children: "No matching records found" }),
			view === "sms" && /* @__PURE__ */ jsx("div", { children: "No matching records found" }),
			view === "Digital" && /* @__PURE__ */ jsx("div", { children: "No matching records found" }),
			view === "Whatsapp" && /* @__PURE__ */ jsx("div", { children: "No matching records found" })
		]
	})] });
};
var Route$25 = createFileRoute("/_usersauth/users/campaign/")({ component: Campaign });
//#endregion
//#region app/_usersauth/users/analysis/index.tsx
var Analysis = () => {
	return /* @__PURE__ */ jsx("div", { children: "Analysis" });
};
var Route$24 = createFileRoute("/_usersauth/users/analysis/")({ component: Analysis });
//#endregion
//#region app/_usersauth/ads/whatsapp/index.tsx
function Whatsapp() {
	return /* @__PURE__ */ jsx("div", { children: "Coming Soon" });
}
var Route$23 = createFileRoute("/_usersauth/ads/whatsapp/")({ component: Whatsapp });
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
var Route$22 = createFileRoute("/_usersauth/ads/sms/")({ component: Sms });
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
var Route$21 = createFileRoute("/_usersauth/ads/influencer/")({ component: Influencer });
//#endregion
//#region app/_usersauth/ads/digital/index.tsx
function Digital() {
	return /* @__PURE__ */ jsx("div", { children: "Coming Soon" });
}
var Route$20 = createFileRoute("/_usersauth/ads/digital/")({ component: Digital });
//#endregion
//#region app/_usersauth/ads/billboard/index.tsx
var billboardImage1 = "/del/billboard1.png";
var billboardImage2$5 = "/del/billboard2.png";
var naira = "/icons/naira.svg";
var location$2 = "/icons/yellowlocation.svg";
function Billboards() {
	const [filter, setFilter] = useState(false);
	const [wishlist, setWishlist] = useState([
		4,
		8,
		2,
		9
	]);
	const handleWishlist = (billboardId) => {
		if (wishlist.includes(billboardId)) setWishlist(wishlist.filter((item) => item !== billboardId));
		else setWishlist((prev) => [...prev, billboardId]);
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
					/* @__PURE__ */ jsx("div", {
						className: "gap-5 md:px-5 grid grid-cols-1 md:grid-cols-2 basis-4/5",
						children: [
							{
								id: 1,
								name: "Eko hotel led, victoria island",
								location: "Along Adetokunbo Ademola Street by Eko",
								image: billboardImage1,
								pricepd: "60000",
								Impressions: "70 per day",
								negotiable: "yes",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							},
							{
								id: 2,
								name: "Adetokunbo Ademola led, victoria island",
								location: "Along Adetokunbo Ademola Street by Bishop",
								image: billboardImage2$5,
								negotiable: "yes",
								pricepd: "30000",
								Impressions: "40 per day",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							},
							{
								id: 3,
								name: "Eko hotel led, victoria island",
								location: "Along Adetokunbo Ademola Street by Eko",
								image: billboardImage1,
								pricepd: "40000",
								negotiable: "no",
								Impressions: "50 per day",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							},
							{
								id: 4,
								name: "Adetokunbo Ademola led, victoria island",
								location: "Along Adetokunbo Ademola Street by Bishop",
								image: billboardImage2$5,
								pricepd: "35000",
								negotiable: "yes",
								Impressions: "40 per day",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							},
							{
								id: 5,
								name: "Adetokunbo Ademola led, victoria island",
								location: "Along Adetokunbo Ademola Street by Bishop",
								image: billboardImage2$5,
								pricepd: "35000",
								Impressions: "40 per day",
								negotiable: "no",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							},
							{
								id: 6,
								name: "Adetokunbo Ademola led, victoria island",
								location: "Along Adetokunbo Ademola Street by Bishop",
								image: billboardImage2$5,
								pricepd: "35000",
								negotiable: "no",
								Impressions: "40 per day",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							},
							{
								id: 7,
								name: "Adetokunbo Ademola led, victoria island",
								location: "Along Adetokunbo Ademola Street by Bishop",
								image: billboardImage2$5,
								pricepd: "35000",
								negotiable: "no",
								Impressions: "40 per day",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							},
							{
								id: 8,
								name: "Adetokunbo Ademola led, victoria island",
								location: "Along Adetokunbo Ademola Street by Bishop",
								image: billboardImage2$5,
								pricepd: "35000",
								negotiable: "yes",
								Impressions: "40 per day",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							},
							{
								id: 9,
								name: "Adetokunbo Ademola led, victoria island",
								location: "Along Adetokunbo Ademola Street by Bishop",
								image: billboardImage2$5,
								pricepd: "35000",
								negotiable: "yes",
								Impressions: "40 per day",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							},
							{
								id: 10,
								name: "Adetokunbo Ademola led, victoria island",
								location: "Along Adetokunbo Ademola Street by Bishop",
								image: billboardImage2$5,
								pricepd: "35000",
								negotiable: "yes",
								Impressions: "40 per day",
								type: "Double faced Gantry LED",
								duration: "14hrs (6am - 9pm) 6days/week"
							}
						].map((billboard) => /* @__PURE__ */ jsxs("div", {
							className: "rounded bg-white border border-ads360yellow-100",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [
										billboard.negotiable === "yes" && /* @__PURE__ */ jsx("div", {
											className: "absolute w-1/2 md:w-2/3 xl:w-1/2 bg-ads360black-100/70 text-ads360light-100 rounded right-3 top-4 text-center py-2",
											children: "Negotiable"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute bottom-14 md:bottom-10 right-8 font-semibold text-ads360yellowBtn-100 hover:bg-ads360yellowBtn-100/30 hover:rounded-full flex justify-center p-2",
											children: wishlist.includes(billboard.id) ? /* @__PURE__ */ jsx("button", {
												onClick: () => handleWishlist(billboard.id),
												children: /* @__PURE__ */ jsx(BsSuitHeartFill, { size: 20 })
											}) : /* @__PURE__ */ jsx("button", {
												onClick: () => handleWishlist(billboard.id),
												children: /* @__PURE__ */ jsx(BsSuitHeart, { size: 20 })
											})
										}),
										/* @__PURE__ */ jsx("img", {
											alt: billboard.name,
											src: billboard.image,
											className: "w-full rounded-t h-auto"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "flex truncate ... text-ads360yellow-100 font-bold w-full text-sm md:text-base p-2",
											children: [/* @__PURE__ */ jsx("img", {
												src: location$2,
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
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold",
												children: "location: "
											}), billboard.location]
										}),
										/* @__PURE__ */ jsx("div", {
											className: "my-1",
											children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold",
												children: "Impression: "
											}), billboard.Impressions] })
										}),
										/* @__PURE__ */ jsx("div", {
											className: "my-1",
											children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold",
												children: "Board-type: "
											}), billboard.type] })
										}),
										/* @__PURE__ */ jsx("div", {
											className: "my-1",
											children: /* @__PURE__ */ jsxs("p", { children: [/* @__PURE__ */ jsx("span", {
												className: "font-bold",
												children: "Run-time: "
											}), billboard.duration] })
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
												alt: "naira sign"
											}),
											"From ₦",
											billboard.pricepd
										]
									}), /* @__PURE__ */ jsx("button", {
										className: "group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12",
										children: /* @__PURE__ */ jsx(Link, {
											to: `/ads/billboard/${billboard.id}`,
											children: "View BillBoard"
										})
									})]
								})
							]
						}, billboard.id))
					}),
					/* @__PURE__ */ jsx("div", {
						className: "basis-1/5 text-sm hidden xl:block",
						children: /* @__PURE__ */ jsx("div", {
							className: "top-[12.5rem] sticky rounded p-3 border border-ads360yellow-100 bg-white",
							children: /* @__PURE__ */ jsx(BillboardSorter, {
								modal: false,
								toggleModal: () => {}
							})
						})
					}),
					filter === false && /* @__PURE__ */ jsx("div", {
						className: "fixed w-full left-3 bottom-5 xl:hidden",
						children: /* @__PURE__ */ jsx("button", {
							className: "rounded-10 font-bold border bg-ads360yellow-100 shadow-md border-white w-12 h-12",
							onClick: () => {
								setFilter(true);
							},
							children: "Filter"
						})
					})
				]
			})
		]
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen: filter,
		children: /* @__PURE__ */ jsx("div", {
			className: "bg-white p-3 w-10/12 md:w-9/12 mx-auto rounded-10",
			children: /* @__PURE__ */ jsx(BillboardSorter, {
				modal: true,
				toggleModal: () => setFilter(false)
			})
		})
	})] });
}
var Route$19 = createFileRoute("/_usersauth/ads/billboard/")({ component: Billboards });
//#endregion
//#region app/_usersauth/ads/$transaction_id/index.tsx
var card$3 = "/icons/usericon/card.svg";
var dollar$1 = "/icons/usericon/dollar-sign.svg";
var purse = "/icons/usericon/purse.svg";
var Arrowleft = "/icons/Arrowleft.svg";
var mark = "/icons/mark.svg";
var cancel$5 = "/icons/usericon/modalCancelBotton.svg";
var Payment$1 = () => {
	const amount = 27e3;
	const wallet = 0;
	const router = useRouter();
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
					onClick: () => router.history.back(),
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
				children: [
					{
						image: purse,
						link: "ads/",
						name: "Wallet"
					},
					{
						image: card$3,
						link: "ads/",
						name: "Naira Funding Card"
					},
					{
						image: dollar$1,
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
							src: cancel$5,
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
				wallet < amount ? /* @__PURE__ */ jsx("div", {
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
						disabled: wallet < amount ? true : false,
						className: `${wallet < amount ? "bg-ads360gray-100 mt-5" : "bg-ads360black-100/95 hover:bg-ads360black-100 mt-10"} rounded  text-white  w-5/6 h-10`,
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
							src: cancel$5,
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
						className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-10  text-white  w-5/6 h-10",
						children: "Proceed"
					})
				})
			]
		}) : null
	})] });
};
var Route$18 = createFileRoute("/_usersauth/ads/$transaction_id/")({ component: Payment$1 });
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
var Route$17 = createFileRoute("/_public/_lightnavbar/faqs/")({ component: Faq });
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
var Route$16 = createFileRoute("/_public/_lightnavbar/contact/")({ component: Contact });
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
var Route$15 = createFileRoute("/_public/_lightnavbar/about/")({ component: About });
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
var Route$14 = createFileRoute("/_public/_darknavbar/discovery/")({ component: Service });
//#endregion
//#region app/_access/vendors-acess/onboarding/index.tsx
var VendorsOnboarding = () => {
	return /* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash",
		children: [/* @__PURE__ */ jsx("div", {
			className: "p-10",
			children: /* @__PURE__ */ jsx(BlackLogo, {})
		}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-11/12 md:w-6/12 py-12",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-center text-4xl",
					children: "Apply as a vendor"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-center text-ads360yellow-100 font-light my-3",
					children: "Please complete to create your account."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "",
					children: [/* @__PURE__ */ jsxs("form", { children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "lg:basis-1/2 lg:pr-2",
							children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "firstname",
									children: "Name"
								}),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									id: "firstname",
									className: "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]"
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "email",
									children: "Email"
								}),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									id: "email",
									className: "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]"
								})
							]
						})] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "lg:flex my-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "basis-1/2 my-3 lg:my-0 lg:pr-2",
									children: [
										/* @__PURE__ */ jsx("label", {
											htmlFor: "password",
											children: "Password"
										}),
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("input", {
											type: "password",
											id: "password",
											className: "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]"
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "basis-1/2 my-3 lg:my-0 lg:pl-2",
									children: [
										/* @__PURE__ */ jsx("label", {
											htmlFor: "confirmPassword",
											children: "Confirm Password"
										}),
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("input", {
											type: "password",
											id: "confirmPassword",
											className: "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]"
										})
									]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "my-3",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "email",
										children: "Phone Number"
									}),
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("input", {
										type: "text",
										className: "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]"
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "my-3",
								children: [
									/* @__PURE__ */ jsx("label", {
										htmlFor: "phoneNumber",
										children: "Vendor type"
									}),
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsxs("select", {
										className: "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]",
										children: [
											/* @__PURE__ */ jsx("option", { children: "select" }),
											/* @__PURE__ */ jsx("option", { children: "Billboard" }),
											/* @__PURE__ */ jsx("option", { children: "Influencer" })
										]
									})
								]
							})
						] }),
						/* @__PURE__ */ jsxs("div", {
							className: "text-center my-5",
							children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								value: "I agree with terms and conditions"
							}), /* @__PURE__ */ jsxs("span", { children: [" I agree with ", /* @__PURE__ */ jsx(Link, {
								to: "",
								className: "text-ads360yellow-100",
								children: "terms and conditions"
							})] })]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-center my-5",
							children: /* @__PURE__ */ jsx(BlackButtons, { text: "Register" })
						})
					] }), /* @__PURE__ */ jsxs("p", {
						className: "text-center my-5",
						children: ["Already have an account? ", /* @__PURE__ */ jsx(Link, {
							to: "/vendors/login",
							className: "text-ads360yellow-100",
							children: " Sign In"
						})]
					})]
				})
			]
		})]
	});
};
var Route$13 = createFileRoute("/_access/vendors-acess/onboarding/")({ component: VendorsOnboarding });
//#endregion
//#region app/_access/vendors-acess/login/index.tsx
var VendorsLogin = () => {
	return /* @__PURE__ */ jsxs("section", {
		className: "min-h-screen bg-ads360-hash",
		children: [/* @__PURE__ */ jsx("div", {
			className: "p-10",
			children: /* @__PURE__ */ jsx(BlackLogo, {})
		}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto w-11/12 md:w-6/12 lg:w-5/12 py-12",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "text-center text-4xl",
					children: "Welcome back"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-center text-ads360yellow-100 font-light my-3",
					children: "Lets get right to it! Log into your account."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "",
					children: [/* @__PURE__ */ jsxs("form", { children: [
						/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "email",
									children: "Email"
								}),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									id: "email",
									className: "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]"
								})
							]
						}) }),
						/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", {
							className: "my-3",
							children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "email",
									children: "Phone Number"
								}),
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("input", {
									type: "text",
									className: "bg-[#E4E4E4] focus:outline-none px-2 w-full rounded h-[38px] md:h-[45px]"
								})
							]
						}) }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex justify-between my-5",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								value: "Remember me"
							}), /* @__PURE__ */ jsx("span", { children: " Remember me " })] }), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, {
								to: "",
								className: "text-ads360yellow-100",
								children: "Forget Password"
							}) })]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-center my-5",
							children: /* @__PURE__ */ jsx(BlackButtons, { text: "Login" })
						})
					] }), /* @__PURE__ */ jsxs("p", {
						className: "text-center my-5",
						children: ["Dont have an account yet? ", /* @__PURE__ */ jsx(Link, {
							to: "/vendors/login",
							className: "text-ads360yellow-100",
							children: " Sign Up"
						})]
					})]
				})
			]
		})]
	});
};
var Route$12 = createFileRoute("/_access/vendors-acess/login/")({ component: VendorsLogin });
//#endregion
//#region app/vendors/billboards/requests/$slug/index.tsx
var cancel$4 = "/icons/usericon/modalCancelBotton.svg";
var billboardImage2$4 = "/del/billboard2.png";
var Request = ({ params }) => {
	const [accept, setAccept] = useState(false);
	const [reject, setReject] = useState(false);
	const [billboard, setBillboard] = useState({
		id: 2,
		name: "Adetokunbo Ademola led, victoria island",
		location: "Along Adetokunbo Ademola Street by Bishop",
		image: billboardImage2$4,
		status: params.slug === "3" ? "paid" : params.slug === "2" ? "negotiating" : params.slug === "1" ? "new" : "completed",
		pricepd: "30000",
		negotiationCount: 1,
		feedback: "",
		finalprice: "29500",
		yourPrice: "28000",
		Impressions: "40 per day",
		minimumNegotiableAmount: 26e3,
		type: "Double faced Gantry LED",
		duration: "14hrs (6am - 9pm) 6days/week"
	});
	return /* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-10 py-14   min-h-screen bg-ads360-hash",
		children: [
			/* @__PURE__ */ jsx("div", { className: "my-5 font-bold" }),
			/* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto w-8/12",
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute right-0 bg-black text-white p-2 cursor-pointer",
					children: /* @__PURE__ */ jsx(AiOutlineDownload, { size: 20 })
				}), /* @__PURE__ */ jsx("img", {
					alt: "billboard",
					className: "w-full",
					src: billboardImage2$4
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
							children: "Eko hotel LED, Victoria Island"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "Along Adetokunbo Ademola Street by Eko Hotels"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "4m(H) by 12m(W)"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "1 day(s)"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "2023-05-20"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "2023-05-21"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "₦30,000"
						})
					] }) })]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "md:flex md:space-x-2 justify-end",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "basis-1/2",
								children: "Status"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-bold basis-1/2",
								children: billboard.status
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "basis-1/2",
								children: "Total Amount"
							}), /* @__PURE__ */ jsxs("div", {
								className: "basis-1/2",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-bold",
									children: "30000"
								}), /* @__PURE__ */ jsx("div", { children: "cost x 1 day(s)" })]
							})]
						})]
					}),
					billboard.status === "negotiating" && /* @__PURE__ */ jsx("div", {
						className: "bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3 my-5 md:my-0",
						children: /* @__PURE__ */ jsxs("div", {
							className: "",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "font-bold",
								children: "Remark"
							}), /* @__PURE__ */ jsxs("div", {
								className: "",
								children: [
									/* @__PURE__ */ jsxs("p", { children: [
										"this user is negotiating this product for",
										" ",
										/* @__PURE__ */ jsx("b", { children: billboard.yourPrice }),
										" kindly accept or reject the offer"
									] }),
									/* @__PURE__ */ jsx("button", {
										onClick: () => setAccept(true),
										className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 text-white p-2",
										children: "accept"
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => setReject(true),
										className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 mx-2 text-white p-2",
										children: "reject"
									})
								]
							})]
						})
					}),
					billboard.status === "paid" && /* @__PURE__ */ jsx("div", {
						className: "bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3 my-5 md:my-0",
						children: /* @__PURE__ */ jsxs("div", {
							className: "",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "font-bold",
								children: "Remark"
							}), /* @__PURE__ */ jsxs("div", {
								className: "",
								children: [/* @__PURE__ */ jsx("p", { children: "this user has made payment this transaction" }), /* @__PURE__ */ jsxs("div", { children: ["notify user when you carry out transaction", /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(FilesInput, {
									previewName: "",
									accept: "image",
									handleChange: () => {},
									warning: "Require image size"
								}), /* @__PURE__ */ jsx("button", {
									className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2",
									children: "Upload"
								})] })] })]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx(Modal, {
				isOpen: accept,
				children: /* @__PURE__ */ jsxs("div", {
					className: "bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between mb-5",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "",
							children: "Accept Offer"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setAccept(false),
							children: /* @__PURE__ */ jsx("img", {
								src: cancel$4,
								alt: "modal cancel botton",
								className: "w-5"
							})
						})]
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("button", {
						onClick: () => setAccept(true),
						className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 text-white p-2",
						children: "Yes"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setAccept(true),
						className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 mx-2 text-white p-2",
						children: "No"
					})] })]
				})
			}),
			/* @__PURE__ */ jsx(Modal, {
				isOpen: reject,
				children: /* @__PURE__ */ jsxs("div", {
					className: "bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex justify-between mb-5",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "",
							children: "Reject Offer"
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setReject(false),
							children: /* @__PURE__ */ jsx("img", {
								src: cancel$4,
								alt: "modal cancel botton",
								className: "w-5"
							})
						})]
					}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("p", { children: "kindly enter the minimum price you would accept for this offer" }),
						/* @__PURE__ */ jsx("input", { className: "p-2 focus:outline-none w-full border rounded" }),
						/* @__PURE__ */ jsx("button", {
							className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 text-white p-2",
							children: "Reject"
						})
					] }) }) }) })]
				})
			})
		]
	});
};
var Route$11 = createFileRoute("/vendors/billboards/requests/$slug/")({ component: Request });
//#endregion
//#region app/vendors/billboards/listing/$slug/index.tsx
var led$1 = "/icons/led.svg";
var duration$1 = "/icons/duration.svg";
var impression$1 = "/icons/impression.svg";
var location$1 = "/icons/location.svg";
var dash$1 = "/icons/dash.svg";
var billboardImage2$3 = "/del/billboard2.png";
var Billboard$1 = () => {
	const [view, setView] = useState("Billboard Overview");
	const [preview, setPreview] = useState(false);
	const billboard = {
		id: 2,
		name: "Adetokunbo Ademola led, victoria island",
		location: "Along Adetokunbo Ademola Street by Bishop",
		image: billboardImage2$3,
		pricepd: "30000",
		Impressions: "40 per day",
		type: "Double faced Gantry LED",
		duration: "14hrs (6am - 9pm) 6days/week"
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "bg-[#E9E9E9] px-4 md:px-10 pt-5",
			children: [/* @__PURE__ */ jsx("p", {
				className: "text-stone-400 mb-5 mt-3",
				children: "View full details of billboard"
			}), /* @__PURE__ */ jsxs("div", {
				className: "w-full flex text-sm md:text-base justify-between md:justify-start md:space-x-3",
				children: [/* @__PURE__ */ jsxs("button", {
					className: "",
					onClick: () => setView("Billboard Overview"),
					children: ["Billboard Overview", view === "Billboard Overview" && /* @__PURE__ */ jsx("img", {
						alt: "Billboard Overview selected",
						src: dash$1,
						className: "w-2/3 mx-auto relative top-[4px] -left-2"
					})]
				}), /* @__PURE__ */ jsxs("button", {
					className: "",
					onClick: () => setView("License Agreement"),
					children: ["License Agreement", view === "License Agreement" && /* @__PURE__ */ jsx("img", {
						alt: "Billboard Overview selected",
						src: dash$1,
						className: "w-2/3 mx-auto relative top-[4px] -left-2"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ jsx(AnimatePresence, { children: view === "Billboard Overview" && /* @__PURE__ */ jsx(motion.div, {
			className: "",
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
							src: billboardImage2$3,
							alt: "billboard",
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
										alt: "boardtype LED",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: "70 impressions daily" })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: duration$1,
										alt: "boardtype LED",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: "14hrs (6am - 9pm) 6days/week" })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: led$1,
										alt: "boardtype LED",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: "Double faced Gantry LED" })]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "md:w-4/5",
							children: [
								/* @__PURE__ */ jsxs("h3", {
									className: "flex items-center font-bold text-lg my-3",
									children: [/* @__PURE__ */ jsx("img", {
										alt: "location",
										src: location$1
									}), "Hebert Macaulay Way LED"]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "my-3",
									children: [/* @__PURE__ */ jsx("b", { children: "Traffic:" }), " Facing Traffic Along Adetokumbo Ademola Street by Eko Hotels,Ahmadu Bello Way, Akin Adesola & Ajose Adeogun."]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "my-3",
									children: [/* @__PURE__ */ jsx("b", { children: "Size:" }), " 4m(H) by 12m(W)"]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "my-3",
									children: [/* @__PURE__ */ jsx("b", { children: "Pixel Size:" }), " 385(H) by 1125(W)"]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "my-3",
									children: [/* @__PURE__ */ jsx("b", { children: "Orientation:" }), " Landscape"]
								})
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:px-3 basis-1/3",
					children: [
						/* @__PURE__ */ jsx("h4", {
							className: "my-3 font-semibold",
							children: "Daily price"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 mb-7",
							children: "₦40,000 (per day)"
						}),
						/* @__PURE__ */ jsx("h4", {
							className: "my-3 font-semibold",
							children: "Note:"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "my-3",
							children: "Your advert will be displayed 70 times daily on the billboard."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "my-3",
							children: "Adverts will be displayed for 10 seconds each time it appears on the billboard."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex space-x-4 justify-end",
							children: [/* @__PURE__ */ jsx("button", {
								className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2",
								children: /* @__PURE__ */ jsx(Link, {
									to: `/vendors/billboards/listing/${billboard.id}/edit`,
									children: "Edit"
								})
							}), /* @__PURE__ */ jsx("button", {
								className: "bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2",
								children: "Delete"
							})]
						})
					]
				})]
			})
		}) }),
		/* @__PURE__ */ jsx(AnimatePresence, { children: view === "License Agreement" && /* @__PURE__ */ jsx(motion.div, {
			className: "",
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
					/* @__PURE__ */ jsx("p", { children: "360ads - NG is an investment platform, that enables Africans to purchase fractional shares of global real estate assets. Meristem Trustees - Investments & Assets are managed by SEC- regulated Meristem trustees" })
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
						src: billboardImage2$3,
						alt: "billboard",
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
var Route$10 = createFileRoute("/vendors/billboards/listing/$slug/")({ component: Billboard$1 });
//#endregion
//#region app/_usersauth/users/wallet/fundwallet/index.tsx
var card$2 = "/icons/usericon/card.svg";
var dollar = "/icons/usericon/dollar-sign.svg";
var bank = "/icons/usericon/banking.svg";
var cancel$3 = "/icons/usericon/modalCancelBotton.svg";
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
							src: cancel$3,
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
							src: cancel$3,
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
var Route$9 = createFileRoute("/_usersauth/users/wallet/fundwallet/")({ component: Payment });
//#endregion
//#region app/_usersauth/users/campaign/$slug/index.tsx
var cancel$2 = "/icons/usericon/modalCancelBotton.svg";
var billboardImage2$2 = "/del/billboard2.png";
var Checkout$3 = ({ params }) => {
	const [negotia, setNegotia] = useState(false);
	const [negotiatedAmount, setNegotiatedAmount] = useState("");
	const [successfull, setSuccessfull] = useState(false);
	const [billboard, setBillboard] = useState({
		id: 2,
		name: "Adetokunbo Ademola led, victoria island",
		location: "Along Adetokunbo Ademola Street by Bishop",
		image: billboardImage2$2,
		status: params.slug === "1" ? "completed" : params.slug === "2" ? "negotiating" : "ongoing",
		pricepd: "30000",
		negotiationCount: 1,
		feedback: "rejected",
		finalprice: "29500",
		yourPrice: "28000",
		Impressions: "40 per day",
		minimumNegotiableAmount: 26e3,
		type: "Double faced Gantry LED",
		duration: "14hrs (6am - 9pm) 6days/week"
	});
	const handleNegotiate = (e) => {
		setNegotiatedAmount(e.target.value);
	};
	const submit = (e) => {
		e.preventDefault();
		setSuccessfull(true);
		setNegotia(false);
		setBillboard((prev) => ({
			...prev,
			negotiationCount: 1
		}));
		setTimeout(() => {
			setSuccessfull(false);
		}, 4e3);
	};
	return /* @__PURE__ */ jsxs("section", {
		className: "px-4 md:px-10 py-14   min-h-screen bg-ads360-hash",
		children: [
			/* @__PURE__ */ jsx("div", { className: "my-5 font-bold" }),
			/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", {
				alt: "billboard",
				src: billboardImage2$2,
				className: "mx-auto"
			}) }),
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
							children: "Eko hotel LED, Victoria Island"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "Along Adetokunbo Ademola Street by Eko Hotels"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "4m(H) by 12m(W)"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "1 day(s)"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "2023-05-20"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "2023-05-21"
						}),
						/* @__PURE__ */ jsx("td", {
							className: "py-2 px-2 md:px-3 border-b",
							children: "₦30,000"
						})
					] }) })]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "md:flex md:space-x-2 justify-end",
				children: [billboard.status === "negotiating" && /* @__PURE__ */ jsx("div", {
					className: "bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3 my-5 md:my-0",
					children: /* @__PURE__ */ jsxs("div", {
						className: "",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "basis-1/2",
							children: "Remark"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-bold basis-1/2",
							children: billboard.feedback === "rejected" ? `the billboard owner has rejected your request, and their final price is ${billboard.finalprice}` : "the billboard owner has accepted your request, you can proceed to make payment"
						})]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "basis-1/2",
							children: "Status"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-bold basis-1/2",
							children: billboard.status
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "basis-1/2",
							children: "Total Amount"
						}), /* @__PURE__ */ jsxs("div", {
							className: "basis-1/2",
							children: [/* @__PURE__ */ jsx("div", {
								className: "font-bold",
								children: billboard.finalprice !== "" && billboard.feedback === "rejected" ? billboard.finalprice : billboard.feedback === "accepted" ? billboard.yourPrice : "₦30,000"
							}), /* @__PURE__ */ jsx("div", { children: "cost x 1 day(s)" })]
						})]
					})]
				})]
			}),
			billboard.status === "negotiating" && /* @__PURE__ */ jsxs("div", {
				className: "flex md:justify-end space-x-3 my-3",
				children: [billboard.negotiationCount > 1 && billboard.feedback === "rejected" && /* @__PURE__ */ jsx("button", {
					onClick: () => setNegotia(true),
					className: "group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12",
					children: "Negotiat"
				}), /* @__PURE__ */ jsx("button", {
					className: "group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12",
					children: "Pay Now"
				})]
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
								src: cancel$2,
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
									children: ["You cannot negotiat lower than ₦", billboard.minimumNegotiableAmount]
								}), /* @__PURE__ */ jsx("p", {
									className: "text-red-700 text-xs",
									children: "You can only negotiat once"
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex justify-center",
								children: /* @__PURE__ */ jsx("button", {
									disabled: negotiatedAmount === "" || parseInt(negotiatedAmount) < billboard.minimumNegotiableAmount ? true : false,
									className: `${negotiatedAmount === "" || parseInt(negotiatedAmount) < billboard.minimumNegotiableAmount ? "bg-ads360gray-100" : "bg-ads360black-100/95 hover:bg-ads360black-100"} rounded mt-5  text-white  w-5/6 h-10`,
									children: "Send Request"
								})
							})
						]
					})]
				})
			})
		]
	});
};
var Route$8 = createFileRoute("/_usersauth/users/campaign/$slug/")({ component: Checkout$3 });
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
var location = "/icons/location.svg";
var dash = "/icons/dash.svg";
var billboardImage2$1 = "/del/billboard2.png";
var Billboard = () => {
	const [view, setView] = useState("Billboard Overview");
	const [preview, setPreview] = useState(false);
	const billboard = {
		id: 2,
		name: "Adetokunbo Ademola led, victoria island",
		location: "Along Adetokunbo Ademola Street by Bishop",
		image: billboardImage2$1,
		pricepd: "30000",
		Impressions: "40 per day",
		type: "Double faced Gantry LED",
		duration: "14hrs (6am - 9pm) 6days/week"
	};
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
						className: "",
						onClick: () => setView("Billboard Overview"),
						children: ["Billboard Overview", view === "Billboard Overview" && /* @__PURE__ */ jsx("img", {
							alt: "Billboard Overview selected",
							src: dash,
							className: "w-2/3 mx-auto relative top-[4px] -left-2"
						})]
					}), /* @__PURE__ */ jsxs("button", {
						className: "",
						onClick: () => setView("License Agreement"),
						children: ["License Agreement", view === "License Agreement" && /* @__PURE__ */ jsx("img", {
							alt: "Billboard Overview selected",
							src: dash,
							className: "w-2/3 mx-auto relative top-[4px] -left-2"
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ jsx(AnimatePresence, { children: view === "Billboard Overview" && /* @__PURE__ */ jsx(motion.div, {
			className: "",
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
							src: billboardImage2$1,
							alt: "billboard",
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
										alt: "boardtype LED",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: "70 impressions daily" })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: duration,
										alt: "boardtype LED",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: "14hrs (6am - 9pm) 6days/week" })]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center space-x-1 lg:px-3",
									children: [/* @__PURE__ */ jsx("img", {
										src: led,
										alt: "boardtype LED",
										className: "rounded-t-10"
									}), /* @__PURE__ */ jsx("p", { children: "Double faced Gantry LED" })]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "md:w-4/5",
							children: [
								/* @__PURE__ */ jsxs("h3", {
									className: "flex items-center font-bold text-lg my-3",
									children: [/* @__PURE__ */ jsx("img", {
										alt: "location",
										src: location
									}), "Hebert Macaulay Way LED"]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "my-3",
									children: [/* @__PURE__ */ jsx("b", { children: "Traffic:" }), " Facing Traffic Along Adetokumbo Ademola Street by Eko Hotels,Ahmadu Bello Way, Akin Adesola & Ajose Adeogun."]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "my-3",
									children: [/* @__PURE__ */ jsx("b", { children: "Size:" }), " 4m(H) by 12m(W)"]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "my-3",
									children: [/* @__PURE__ */ jsx("b", { children: "Pixel Size:" }), " 385(H) by 1125(W)"]
								}),
								/* @__PURE__ */ jsxs("p", {
									className: "my-3",
									children: [/* @__PURE__ */ jsx("b", { children: "Orientation:" }), " Landscape"]
								})
							]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "md:px-3 basis-1/3",
					children: [
						/* @__PURE__ */ jsx("h4", {
							className: "my-3 font-semibold",
							children: "Daily price"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 mb-7",
							children: "₦40,000 (per day)"
						}),
						/* @__PURE__ */ jsx("h4", {
							className: "my-3 font-semibold",
							children: "Note:"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "my-3",
							children: "Your advert will be displayed 70 times daily on the billboard."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "my-3",
							children: "Adverts will be displayed for 10 seconds each time it appears on the billboard."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ jsx("button", {
								className: "group my-5 rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 px-2 h-12",
								children: /* @__PURE__ */ jsx(Link, {
									to: `/ads/billboard/${billboard.id}/onboard`,
									children: "Select Billboard"
								})
							})
						})
					]
				})]
			})
		}) }),
		/* @__PURE__ */ jsx(AnimatePresence, { children: view === "License Agreement" && /* @__PURE__ */ jsx(motion.div, {
			className: "",
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
					/* @__PURE__ */ jsx("p", { children: "360ads - NG is an investment platform, that enables Africans to purchase fractional shares of global real estate assets. Meristem Trustees - Investments & Assets are managed by SEC- regulated Meristem trustees" })
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
						src: billboardImage2$1,
						alt: "billboard",
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
//#region components/inputs/CalenderBox.tsx
var CalenderBox = ({ addDate, selectedDate, removeDate }) => {
	const [value, onChange] = useState(/* @__PURE__ */ new Date());
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full",
		children: [/* @__PURE__ */ jsx(Calendar, {
			onChange: (value) => {
				addDate(value);
			},
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
var Preview = ({ previewImage, attachmentType, previewVideo, needMessage, platform, needPlatform, writeup, plan, selectedDate }) => {
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
					plan === "Immediate" && /* @__PURE__ */ jsx("div", { children: "this ad will run once, immediately as soon as payment is confirm" }),
					plan === "Days" && /* @__PURE__ */ jsxs("div", { children: [
						"this ad will be run on seleted days",
						" ",
						selectedDate.map((day, i) => /* @__PURE__ */ jsx("div", { children: day?.toDateString() }, i))
					] }),
					plan === "Weeks" && /* @__PURE__ */ jsx("div", { children: "this ad will for 4 weeks from 1/2/2023" }),
					plan === "Months" && /* @__PURE__ */ jsx("div", { children: "this ad will for 2 months from 1/2/2023" }),
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
				children: attachmentType === "video" && previewVideo ? /* @__PURE__ */ jsxs("video", {
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
function Onboard() {
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
									warning: "Required billboard image dimension: 496(H) by 800(W)"
								}) : /* @__PURE__ */ jsx(FilesInput, {
									previewName: previewVideo?.name,
									accept: "video",
									handleChange,
									warning: "Required billboard video dimension: 496(H) by 800(W)"
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
						platform,
						needPlatform: false,
						needMessage: false,
						writeup: "",
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
						to: `/ads/billboard/2/onboard/checkout`,
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
var billboardImage2 = "/del/billboard2.png";
var cancel = "/icons/usericon/modalCancelBotton.svg";
var success = "/icons/usericon/checkSuccess.svg";
var Checkout = () => {
	const [negotia, setNegotia] = useState(false);
	const [negotiatedAmount, setNegotiatedAmount] = useState("");
	const [successfull, setSuccessfull] = useState(false);
	const [billboard, setBillboard] = useState({
		id: 2,
		name: "Adetokunbo Ademola led, victoria island",
		location: "Along Adetokunbo Ademola Street by Bishop",
		image: billboardImage2,
		paid: "no",
		pricepd: "30000",
		negotiationCount: 0,
		Impressions: "40 per day",
		minimumNegotiableAmount: 26e3,
		type: "Double faced Gantry LED",
		duration: "14hrs (6am - 9pm) 6days/week"
	});
	const handleNegotiate = (e) => {
		setNegotiatedAmount(e.target.value);
	};
	const submit = (e) => {
		e.preventDefault();
		setSuccessfull(true);
		setNegotia(false);
		setBillboard((prev) => ({
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
				/* @__PURE__ */ jsx(BackBtn, { children: "billboard Marketing" }),
				/* @__PURE__ */ jsx(Steps, {
					step: 4,
					text: "#1 - Checkout"
				}),
				/* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("img", {
					alt: "billboard",
					src: billboardImage2,
					className: "mx-auto"
				}) }),
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
								children: "Eko hotel LED, Victoria Island"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: "Along Adetokunbo Ademola Street by Eko Hotels"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: "4m(H) by 12m(W)"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: "1 day(s)"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: "2023-05-20"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: "2023-05-21"
							}),
							/* @__PURE__ */ jsx("td", {
								className: "py-2 px-2 md:px-3 border-b",
								children: "₦30,000"
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
							children: "₦30,000"
						}), /* @__PURE__ */ jsx("div", { children: "cost x 1 day(s)" })] })]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex md:justify-end space-x-3 my-3",
					children: [/* @__PURE__ */ jsx("button", {
						disabled: billboard.negotiationCount > 0 ? true : false,
						onClick: () => setNegotia(true),
						className: `w-123 h-12 rounded-10 my-2 ${billboard.negotiationCount > 0 ? "bg-ads360yellow-100/50 text-black/50" : "hover:animate-changeColor hover:text-white bg-ads360yellow-100"}`,
						children: "Negotiate"
					}), /* @__PURE__ */ jsx("button", {
						disabled: billboard.paid === "yes" ? true : false,
						className: `${billboard.paid === "yes" ? "bg-ads360yellow-100/50 text-black/50" : "hover:animate-changeColor hover:text-white bg-ads360yellow-100"} w-123 h-12 rounded-10 my-2 `,
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
								children: ["You cannot negotiat lower than ₦", billboard.minimumNegotiableAmount]
							}), /* @__PURE__ */ jsx("p", {
								className: "text-red-700 text-xs",
								children: "You can only negotiat once"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ jsx("button", {
								disabled: negotiatedAmount === "" || parseInt(negotiatedAmount) < billboard.minimumNegotiableAmount ? true : false,
								className: `${negotiatedAmount === "" || parseInt(negotiatedAmount) < billboard.minimumNegotiableAmount ? "bg-ads360gray-100" : "bg-ads360black-100/95 hover:bg-ads360black-100"} rounded mt-5  text-white  w-5/6 h-10`,
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
var Route = createFileRoute("/_usersauth/ads/billboard/$slug/onboard/checkout/")({ component: Checkout });
//#endregion
//#region routeTree.gen.ts
var UsersauthRouteRoute = Route$46.update({
	id: "/_usersauth",
	getParentRoute: () => Route$47
});
var IndexRoute = Route$45.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$47
});
var VendorsBillboardsRouteRoute = Route$44.update({
	id: "/vendors/billboards",
	path: "/vendors/billboards",
	getParentRoute: () => Route$47
});
var UsersauthUsersRouteRoute = Route$43.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => UsersauthRouteRoute
});
var UsersauthAdsRouteRoute = Route$42.update({
	id: "/ads",
	path: "/ads",
	getParentRoute: () => UsersauthRouteRoute
});
var PublicLightnavbarRouteRoute = Route$41.update({
	id: "/_public/_lightnavbar",
	getParentRoute: () => Route$47
});
var PublicDarknavbarRouteRoute = Route$40.update({
	id: "/_public/_darknavbar",
	getParentRoute: () => Route$47
});
var VendorsInfluencersIndexRoute = Route$39.update({
	id: "/vendors/influencers/",
	path: "/vendors/influencers/",
	getParentRoute: () => Route$47
});
var VendorsBillboardsIndexRoute = Route$38.update({
	id: "/",
	path: "/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var UsersauthUsersIndexRoute = Route$37.update({
	id: "/",
	path: "/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthAdsIndexRoute = Route$36.update({
	id: "/",
	path: "/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var AccessSignupIndexRoute = Route$35.update({
	id: "/_access/signup/",
	path: "/signup/",
	getParentRoute: () => Route$47
});
var AccessSigninIndexRoute = Route$34.update({
	id: "/_access/signin/",
	path: "/signin/",
	getParentRoute: () => Route$47
});
var AccessEmailVerificationIndexRoute = Route$33.update({
	id: "/_access/email-verification/",
	path: "/email-verification/",
	getParentRoute: () => Route$47
});
var VendorsBillboardsWalletIndexRoute = Route$32.update({
	id: "/wallet/",
	path: "/wallet/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsSettingsIndexRoute = Route$31.update({
	id: "/settings/",
	path: "/settings/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsRequestsIndexRoute = Route$30.update({
	id: "/requests/",
	path: "/requests/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsListingIndexRoute = Route$29.update({
	id: "/listing/",
	path: "/listing/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsAddBillboardIndexRoute = Route$28.update({
	id: "/add-billboard/",
	path: "/add-billboard/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var UsersauthUsersWalletIndexRoute = Route$27.update({
	id: "/wallet/",
	path: "/wallet/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthUsersSettingsIndexRoute = Route$26.update({
	id: "/settings/",
	path: "/settings/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthUsersCampaignIndexRoute = Route$25.update({
	id: "/campaign/",
	path: "/campaign/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthUsersAnalysisIndexRoute = Route$24.update({
	id: "/analysis/",
	path: "/analysis/",
	getParentRoute: () => UsersauthUsersRouteRoute
});
var UsersauthAdsWhatsappIndexRoute = Route$23.update({
	id: "/whatsapp/",
	path: "/whatsapp/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsSmsIndexRoute = Route$22.update({
	id: "/sms/",
	path: "/sms/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsInfluencerIndexRoute = Route$21.update({
	id: "/influencer/",
	path: "/influencer/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsDigitalIndexRoute = Route$20.update({
	id: "/digital/",
	path: "/digital/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsBillboardIndexRoute = Route$19.update({
	id: "/billboard/",
	path: "/billboard/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var UsersauthAdsTransaction_idIndexRoute = Route$18.update({
	id: "/$transaction_id/",
	path: "/$transaction_id/",
	getParentRoute: () => UsersauthAdsRouteRoute
});
var PublicLightnavbarFaqsIndexRoute = Route$17.update({
	id: "/faqs/",
	path: "/faqs/",
	getParentRoute: () => PublicLightnavbarRouteRoute
});
var PublicLightnavbarContactIndexRoute = Route$16.update({
	id: "/contact/",
	path: "/contact/",
	getParentRoute: () => PublicLightnavbarRouteRoute
});
var PublicLightnavbarAboutIndexRoute = Route$15.update({
	id: "/about/",
	path: "/about/",
	getParentRoute: () => PublicLightnavbarRouteRoute
});
var PublicDarknavbarDiscoveryIndexRoute = Route$14.update({
	id: "/discovery/",
	path: "/discovery/",
	getParentRoute: () => PublicDarknavbarRouteRoute
});
var AccessVendorsAcessOnboardingIndexRoute = Route$13.update({
	id: "/_access/vendors-acess/onboarding/",
	path: "/vendors-acess/onboarding/",
	getParentRoute: () => Route$47
});
var AccessVendorsAcessLoginIndexRoute = Route$12.update({
	id: "/_access/vendors-acess/login/",
	path: "/vendors-acess/login/",
	getParentRoute: () => Route$47
});
var VendorsBillboardsRequestsSlugIndexRoute = Route$11.update({
	id: "/requests/$slug/",
	path: "/requests/$slug/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var VendorsBillboardsListingSlugIndexRoute = Route$10.update({
	id: "/listing/$slug/",
	path: "/listing/$slug/",
	getParentRoute: () => VendorsBillboardsRouteRoute
});
var UsersauthUsersWalletFundwalletIndexRoute = Route$9.update({
	id: "/wallet/fundwallet/",
	path: "/wallet/fundwallet/",
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
	UsersauthAdsBillboardSlugOnboardCheckoutIndexRoute: Route.update({
		id: "/billboard/$slug/onboard/checkout/",
		path: "/billboard/$slug/onboard/checkout/",
		getParentRoute: () => UsersauthAdsRouteRoute
	}),
	UsersauthAdsInfluencerSlugOnboardingCheckoutIndexRoute
};
var UsersauthAdsRouteRouteWithChildren = UsersauthAdsRouteRoute._addFileChildren(UsersauthAdsRouteRouteChildren);
var UsersauthUsersRouteRouteChildren = {
	UsersauthUsersIndexRoute,
	UsersauthUsersAnalysisIndexRoute,
	UsersauthUsersCampaignIndexRoute,
	UsersauthUsersSettingsIndexRoute,
	UsersauthUsersWalletIndexRoute,
	UsersauthUsersCampaignSlugIndexRoute,
	UsersauthUsersWalletFundwalletIndexRoute
};
var UsersauthRouteRouteChildren = {
	UsersauthAdsRouteRoute: UsersauthAdsRouteRouteWithChildren,
	UsersauthUsersRouteRoute: UsersauthUsersRouteRoute._addFileChildren(UsersauthUsersRouteRouteChildren)
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
	VendorsBillboardsRequestsIndexRoute,
	VendorsBillboardsSettingsIndexRoute,
	VendorsBillboardsWalletIndexRoute,
	VendorsBillboardsListingSlugIndexRoute,
	VendorsBillboardsRequestsSlugIndexRoute,
	VendorsBillboardsListingSlugEditIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	UsersauthRouteRoute: UsersauthRouteRouteWithChildren,
	PublicDarknavbarRouteRoute: PublicDarknavbarRouteRouteWithChildren,
	PublicLightnavbarRouteRoute: PublicLightnavbarRouteRouteWithChildren,
	VendorsBillboardsRouteRoute: VendorsBillboardsRouteRoute._addFileChildren(VendorsBillboardsRouteRouteChildren),
	AccessEmailVerificationIndexRoute,
	AccessSigninIndexRoute,
	AccessSignupIndexRoute,
	VendorsInfluencersIndexRoute,
	AccessVendorsAcessLoginIndexRoute,
	AccessVendorsAcessOnboardingIndexRoute
};
var routeTree = Route$47._addFileChildren(rootRouteChildren)._addFileTypes();
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
