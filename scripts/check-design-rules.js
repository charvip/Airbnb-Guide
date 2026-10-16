// Enforces the design-system rules in CLAUDE.md:
// pages (src/routes) and app components (src/lib/components/app) may only
// style through design tokens, and pages may only build UI from library
// components. Run with `pnpm check:design` (also part of `pnpm check`).

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;

const PALETTE =
	'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white';
const COLOR_UTILS =
	'bg|text|border|border-[trblxy]|ring|ring-offset|outline|fill|stroke|from|via|to|decoration|divide|placeholder|accent|caret|shadow';

// Rules for every file in scope.
const styleRules = [
	{
		re: new RegExp(`\\b(?:${COLOR_UTILS})-(?:${PALETTE})(?:-\\d{2,3})?\\b`, 'g'),
		why: 'raw Tailwind palette colour; use a token utility (bg-primary, text-muted-foreground, …)'
	},
	{
		re: /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|oklab)\(/g,
		why: 'raw colour value; add a token in src/lib/styles/tokens.css instead'
	},
	{
		re: /\b[a-z][a-z0-9-]*-\[[^\]]+\]/g,
		why: 'arbitrary Tailwind value; add a token (or use the Tailwind scale) instead'
	},
	{ re: /\sstyle=/g, why: 'inline style; use token utilities or a library component' }
];

// Extra rules for pages: build UI from the library, not raw elements.
const pageRules = [
	{
		re: /<(button|select|textarea|img|a)\b/g,
		why: 'raw <$1> in a page; use a library component (Button, NativeSelect, …)'
	},
	{
		re: /<input\b(?![^>]*type="hidden")/g,
		why: 'raw <input> in a page; use a library component (Input, TextField, …)'
	},
	{
		re: /from ['"]#lib\/components\/(?!app\/index\.js['"]|ui\/[a-z-]+\/index\.js['"])/g,
		why: 'import components from #lib/components/app/index.js or #lib/components/ui/<name>/index.js'
	}
];

function files(dir) {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		return statSync(path).isDirectory() ? files(path) : [path];
	});
}

const strip = (src) =>
	// Ignore comments so rules can be explained in prose.
	src
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/^\s*\/\/.*$/gm, '');

const problems = [];
function check(path, rules) {
	const src = strip(readFileSync(path, 'utf8'));
	for (const { re, why } of rules) {
		for (const match of src.matchAll(re)) {
			const line = src.slice(0, match.index).split('\n').length;
			problems.push(
				`${relative(root, path)}:${line}  ${match[0].trim()}  → ${why.replace('$1', match[1] ?? '')}`
			);
		}
	}
}

for (const path of files(join(root, 'src/routes')).filter((p) => p.endsWith('.svelte'))) {
	check(path, [...styleRules, ...pageRules]);
}
for (const path of files(join(root, 'src/lib/components/app')).filter((p) =>
	p.endsWith('.svelte')
)) {
	check(path, styleRules);
}

if (problems.length) {
	console.error(`Design rule violations (see CLAUDE.md):\n\n${problems.join('\n')}\n`);
	process.exit(1);
}
console.log('Design rules: OK');
