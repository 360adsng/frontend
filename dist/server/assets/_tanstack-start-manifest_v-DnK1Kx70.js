//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({
	routes: {
		__root__: {
			filePath: "C:/Users/user/OneDrive/Desktop/360/360frontend/app/__root.tsx",
			children: [
				"/",
				"/_admin",
				"/_usersauth",
				"/_public/_darknavbar",
				"/_public/_lightnavbar",
				"/vendors/billboards",
				"/vendors/influencers",
				"/_access/email-verification/",
				"/_access/forgot-password/",
				"/_access/reset-password/",
				"/_access/signin/",
				"/_access/signup/",
				"/_access/vendor-access/onboarding/"
			],
			assets: [{
				tag: "link",
				attrs: {
					rel: "stylesheet",
					href: "/assets/index-BEoA6VJJ.css",
					type: "text/css"
				}
			}],
			preloads: [
				"/assets/index-DljJnIqP.js",
				"/assets/useUsers-C20xCbY2.js",
				"/assets/countries-1Yz399KR.js",
				"/assets/nigeriaStatesLgas-B9JehKP4.js"
			]
		},
		"/_usersauth/users/settings/": {
			filePath: "C:/Users/user/OneDrive/Desktop/360/360frontend/app/_usersauth/users/settings/index.tsx",
			children: void 0,
			assets: void 0,
			preloads: ["/assets/settings-BDX0VDbF.js"]
		},
		"/_usersauth/users/negotiations/influencers/": {
			filePath: "C:/Users/user/OneDrive/Desktop/360/360frontend/app/_usersauth/users/negotiations/influencers/index.tsx",
			children: void 0,
			assets: void 0,
			preloads: ["/assets/influencers-CyqUjC0f.js"]
		},
		"/vendors/billboards/settings/coverage/": {
			filePath: "C:/Users/user/OneDrive/Desktop/360/360frontend/app/vendors/billboards/settings/coverage/index.tsx",
			children: void 0,
			assets: void 0,
			preloads: ["/assets/coverage-CwHYvGf0.js"]
		}
	},
	clientEntry: "/assets/index-DljJnIqP.js"
});
//#endregion
export { tsrStartManifest };
