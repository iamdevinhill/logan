

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/videos/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.CBu1F4al.js","_app/immutable/chunks/scheduler.BabQTIuJ.js","_app/immutable/chunks/index.BHUZScgJ.js"];
export const stylesheets = ["_app/immutable/assets/7.B2SkrmdW.css"];
export const fonts = [];
