
// Keep keys lowercase and singular to avoid typos across the app
export const CATEGORIES = [
  { key: 'men',     label: 'Men' },
  { key: 'women',   label: 'Women' },
  { key: 'home',    label: 'Home' },
  { key: 'kitchen', label: 'Kitchen' },
  { key: 'beauty',  label: 'Beauty' }
];

// A helper you can import anywhere
export const isValidCategory = (key) => CATEGORIES.some(c => c.key === key);
