import { defineConfig } from "@pandacss/dev"

export default defineConfig({
	// Set Shadow panda preset
	presets: ["@shadow-panda/preset"],

	// Whether to use css reset
	preflight: true,

	// Use React
	jsxFramework: "react",

	// Where to look for your css declarations
	include: ["./src/components/**/*.{ts,tsx,js,jsx}", "./src/app/**/*.{ts,tsx,js,jsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {},
	},

	// Emit artifacts to `node_modules` as a package.
	emitPackage: true,

	// The output directory for your css system
	outdir: "@shadow-panda/styled-system",
});