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
				"/assets/index-ksMhQZr4.js",
				"/assets/useUsers-CrC2HGXe.js",
				"/assets/countries-1Yz399KR.js",
				"/assets/nigeriaStatesLgas-CamrRt2g.js"
			]
		},
		"/_usersauth/users/settings/": {
			filePath: "C:/Users/user/OneDrive/Desktop/360/360frontend/app/_usersauth/users/settings/index.tsx",
			children: void 0,
			assets: void 0,
			preloads: ["/assets/settings-Ba2V3wGi.js"]
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
			preloads: ["/assets/coverage-D7VKRHrX.js"]
		}
	},
	clientEntry: "/assets/index-ksMhQZr4.js"
});
//#endregion
export { tsrStartManifest };
