import type { Config } from 'drizzle-kit'
export default {
	schema: './src/schema.ts',
	out: './src/drizzle',
	dialect: 'postgresql',
	strict: true,
	verbose: true,
	dbCredentials: {
		url: process.env.ZERO_UPSTREAM_DB as string,
	},
	schemaFilter: ['public', 'crm', 'marketing'],
} satisfies Config
