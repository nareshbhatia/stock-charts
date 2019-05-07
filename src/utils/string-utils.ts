export const errorToString = (error: any) =>
    error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : 'Something went wrong';
