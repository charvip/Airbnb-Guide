<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const emojiVariants = tv({
		base: 'inline-block leading-none select-none',
		variants: {
			size: {
				sm: 'text-xl',
				md: 'text-3xl',
				lg: 'text-4xl'
			}
		},
		defaultVariants: { size: 'md' }
	});

	export type EmojiSize = VariantProps<typeof emojiVariants>['size'];
</script>

<script lang="ts">
	// Decorative emoji icon. Hidden from screen readers; the text next to it
	// carries the meaning.
	let { emoji, size = 'md' }: { emoji: string; size?: EmojiSize } = $props();
</script>

<span class={emojiVariants({ size })} aria-hidden="true">{emoji}</span>
