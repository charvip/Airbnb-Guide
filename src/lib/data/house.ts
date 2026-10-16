// Default guide content. This is the starting point the first time the site
// runs; after that, hosts edit it from /host and the saved copy lives in
// Vercel Blob (see src/lib/server/content.ts).
// Anything wrapped in [ADD: ...] still needs the host's real details.

export type Appliance = {
	id: string;
	name: string;
	emoji: string;
	summary: string;
	location: string;
	suppliesLocation: string;
	steps: string[];
	troubleshooting?: string[];
	tips?: string[];
	photos?: string[];
};

export type TourStop = {
	id: string;
	title: string;
	emoji: string;
	summary: string;
	details: string[];
	applianceIds: string[];
	photos?: string[];
};

export type Activity = {
	id: string;
	name: string;
	emoji: string;
	summary: string;
	details: string[];
	applianceId?: string;
	photos?: string[];
};

export type Faq = { question: string; answer: string };

export const house = {
	name: '[ADD: Property name]',
	welcome: "We're so glad you're here. Tap a section below to get settled in."
};

export const host = {
	// Demo details: fictional names, 555-01xx test number, example.com email.
	name: 'Maya & Sam Rivera',
	phone: '(614) 555-0142',
	email: 'hosts@example.com',
	responseNote: 'Text is the fastest way to reach me. For emergencies, call 911 first.'
};

export const essentials = {
	parking: '[ADD: Where guests should park, e.g. driveway on the left, max 2 cars]',
	// Demo code. Real codes should be entered through the host side, not committed here.
	doorLock: {
		code: '7381',
		instructions:
			'Your code is active from 3:00 PM on your arrival day. Enter the code on the keypad, then turn the handle.'
	},
	wifi: {
		network: '[ADD: WiFi network name]',
		password: '[ADD: WiFi password]'
	},
	checkoutTime: '11:00 AM',
	checkoutChecklist: [
		'Leave used towels in the washer',
		'[ADD: Any other checkout tasks, e.g. dishes in dishwasher, trash out, thermostat setting]',
		'Lock the door behind you'
	],
	quietHours: 'Quiet hours begin at 10:00 PM.'
};

export const appliances: Appliance[] = [
	{
		id: 'thermostat',
		name: 'Thermostat',
		emoji: '🌡️',
		summary: 'Controls heating and cooling for the house.',
		location: 'Living room',
		suppliesLocation: 'Nothing extra needed.',
		steps: [
			'Turn the ring to set your temperature.',
			'Press the ring once to choose Heat, Cool or Auto.',
			'It returns to Eco mode after checkout.'
		],
		troubleshooting: ['Screen blank? Press the ring. It sleeps to save power.']
	},
	{
		id: 'fireplace',
		name: 'Fireplace',
		emoji: '🔥',
		summary: 'A cozy gas fireplace for cool evenings.',
		location: 'Living room',
		suppliesLocation:
			'The brass valve is to the left of the hearth. The flame is set with the wall dial.',
		steps: [
			"Turn the brass valve a quarter turn (it's to the left of the hearth).",
			'Hold the ignite button for five seconds.',
			'Set the flame with the wall dial. Close the valve when you are done.'
		],
		troubleshooting: ['No flame? Hold ignite a little longer, then check the wall switch is on.'],
		tips: [
			'Never leave the fire unattended.',
			'Keep blankets, pillows, and decorations away from the fireplace.'
		]
	},
	{
		id: 'tv',
		name: 'TV',
		emoji: '📺',
		summary: 'Smart TV for streaming and movie nights.',
		location: 'Living room',
		suppliesLocation: 'Use the black remote.',
		steps: [
			'Press the power button on the black remote.',
			'Press Home, then choose the Guest profile.',
			'Your own accounts are fine to sign in. Please sign out at checkout.'
		],
		troubleshooting: ['No picture? Press Input, choose HDMI 1.']
	},
	{
		id: 'espresso-machine',
		name: 'Espresso Machine',
		emoji: '☕',
		summary: 'Make espresso, lattes, and cappuccinos.',
		location: 'Kitchen',
		suppliesLocation: 'The water tank is at the back of the machine.',
		steps: [
			'Fill the water tank at the back. Switch on the left button.',
			'Wait for the light to stop blinking, about 40 seconds.',
			'Press the single or double cup, then enjoy.'
		],
		troubleshooting: ['Nothing comes out? Refill the tank and press the steam wand once to prime.']
	},
	{
		id: 'washer-dryer',
		name: 'Washer & Dryer',
		emoji: '🧺',
		summary: 'Washer and dryer for your laundry.',
		location: '[ADD: Where the washer and dryer are]',
		suppliesLocation: 'Detergent pods are on the shelf above the washer.',
		steps: [
			'Use one pod from the shelf above.',
			'Turn the dial to Normal, press Start.',
			'Move to the dryer. Choose Medium and press Start.'
		],
		troubleshooting: ['Door will not open? Wait two minutes after the cycle ends.'],
		tips: ['At checkout, please leave used towels in the washer (no need to run it).']
	},
	{
		id: 'hot-tub',
		name: 'Hot Tub',
		emoji: '♨️',
		summary: 'Relax in the hot tub out in the garden.',
		location: 'Garden',
		suppliesLocation: 'Rest the cover on the rail while the tub is open.',
		steps: [
			'Lift the cover using both handles and rest it on the rail.',
			'It is preset to 102°F. Press Jets once for low, twice for high.',
			'Close and latch the cover after use. Quiet hours begin at 10 PM.'
		],
		troubleshooting: ['Jets stopped? They pause after 20 minutes. Press Jets again.'],
		tips: ['No glass in or around the hot tub.', 'Children must be supervised at all times.']
	}
];

export const tourStops: TourStop[] = [
	{
		id: 'arrival',
		title: 'Arrival & Parking',
		emoji: '🚗',
		summary: "Welcome! Here's where to park and how to get inside.",
		details: [
			'Your door code is active from 3:00 PM on your arrival day. Find it in the Essentials section of this guide.'
		],
		applianceIds: []
	},
	{
		id: 'living-room',
		title: 'Living Room',
		emoji: '🛋️',
		summary:
			'The cozy heart of the house — a fireplace, the TV, and the thermostat for the whole house.',
		details: [],
		applianceIds: ['fireplace', 'thermostat', 'tv']
	},
	{
		id: 'kitchen',
		title: 'Kitchen',
		emoji: '🍳',
		summary: 'A full kitchen for cooking, plus an espresso machine for your morning coffee.',
		details: [],
		applianceIds: ['espresso-machine']
	},
	{
		id: 'garden',
		title: 'Garden',
		emoji: '🌿',
		summary: 'Step outside to the garden, home of the hot tub.',
		details: [],
		applianceIds: ['hot-tub']
	},
	{
		id: 'checkout',
		title: 'Checking Out',
		emoji: '👋',
		summary: 'Checkout is at 11:00 AM. A few quick steps before you go:',
		details: [],
		applianceIds: ['washer-dryer']
	}
];

export const activities: Activity[] = [
	{
		id: 'hike',
		name: 'Hike',
		emoji: '🥾',
		summary: 'Get outside and explore the trails nearby.',
		details: [
			'[ADD: Nearby trail names, distance from the house, and difficulty]',
			'Bring water and wear sturdy shoes.'
		]
	},
	{
		id: 'bonfire',
		name: 'Bonfire',
		emoji: '🔥',
		summary: "Gather around the fire pit for s'mores and stories.",
		details: [
			'[ADD: Where the fire pit is and where firewood and lighters are kept]',
			'Never leave the fire unattended.',
			'Fully put out the fire with water before going inside.'
		]
	},
	{
		id: 'yoga',
		name: 'Yoga',
		emoji: '🧘',
		summary: 'Start or end the day with a peaceful stretch.',
		details: ['[ADD: Where yoga mats are kept and a good spot to practice]']
	},
	{
		id: 'board-games',
		name: 'Board Games',
		emoji: '🎲',
		summary: 'Settle in for a game night.',
		details: [
			'[ADD: Where the games are kept]',
			"Please return all the pieces to their boxes when you're done."
		]
	},
	{
		id: 'hot-tub',
		name: 'Hot Tub',
		emoji: '♨️',
		summary: 'Unwind under the stars in the garden hot tub.',
		details: ['See the hot tub guide for how to use it and safety rules.'],
		applianceId: 'hot-tub'
	}
];

export const faqs: Faq[] = [
	{
		question: 'What time is checkout?',
		answer: 'Checkout is at 11:00 AM. See the checkout checklist in Essentials.'
	},
	{
		question: 'What should I do with used towels?',
		answer: 'Please leave used towels in the washer at checkout. No need to run it.'
	},
	{
		question: "What's the WiFi password?",
		answer: "You'll find the network name and password in the Essentials section."
	},
	{
		question: 'Can I check in early or check out late?',
		answer: '[ADD: Early check-in / late checkout policy]'
	},
	{
		question: 'Where do I put trash and recycling?',
		answer: '[ADD: Trash and recycling location and pickup days]'
	},
	{
		question: 'Are pets allowed?',
		answer: '[ADD: Pet policy]'
	}
];

export const defaultContent = { house, host, essentials, appliances, tourStops, activities, faqs };

export type SiteContent = typeof defaultContent;
