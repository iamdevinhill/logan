export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicol.png","l.png","robots.txt","logan3.jpg"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.JyiAH0pz.js","app":"_app/immutable/entry/app.drykj4vT.js","imports":["_app/immutable/entry/start.JyiAH0pz.js","_app/immutable/chunks/entry.B2M9FD8j.js","_app/immutable/chunks/scheduler.BabQTIuJ.js","_app/immutable/entry/app.drykj4vT.js","_app/immutable/chunks/preload-helper.C1FmrZbK.js","_app/immutable/chunks/scheduler.BabQTIuJ.js","_app/immutable/chunks/index.BHUZScgJ.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/signup",
				pattern: /^\/api\/signup\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/signup/_server.ts.js'))
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/music",
				pattern: /^\/music\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/tour",
				pattern: /^\/tour\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/videos",
				pattern: /^\/videos\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
