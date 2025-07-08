export const ROUTE = {
  MAIN: '/',
  LOGIN: '/login',
  MY: '/my',
  ORDER: (productId: string | number = ':productId') => `/order/${productId}`,
  NOT_FOUND: '*',
} as const;