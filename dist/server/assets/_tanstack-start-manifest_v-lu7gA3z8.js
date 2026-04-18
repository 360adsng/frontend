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
				"/_access/email-verification/",
				"/_access/signin/",
				"/_access/signup/",
				"/vendors/influencers/",
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
			preloads: ["/assets/index-CnrfLe3h.js", "/assets/countries-CKzeLIC8.js"]
		},
		"/_usersauth/users/settings/": {
			filePath: "C:/Users/user/OneDrive/Desktop/360/360frontend/app/_usersauth/users/settings/index.tsx",
			children: void 0,
			assets: void 0,
			preloads: ["/assets/settings-C76IYWmy.js"]
		}
	},
	clientEntry: "/assets/index-CnrfLe3h.js"
});
//#endregion
export { tsrStartManifest };
