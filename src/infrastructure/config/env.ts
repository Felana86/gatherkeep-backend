export const env = {
  DATABASE_URL: process.env.DATABASE_URL || 'mysql://...',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecret',
  STRIPE_SECRET: process.env.STRIPE_SECRET || '',
};
