// Declare the module and types for authService.js
export function loginUser(username: string, password: string): Promise<{ token: string, message: string }>;
