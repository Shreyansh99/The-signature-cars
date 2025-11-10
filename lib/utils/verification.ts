/**
 * Verifies the car addition code against the environment variable
 * @param code The code to verify
 * @returns boolean indicating if the code is valid
 */
export function verifyCarCode(code: string): boolean {
  const expectedCode = process.env.NEXT_PUBLIC_CAR_ADD_VERIFICATION_CODE;
  
  if (!expectedCode) {
    console.error('CAR_ADD_VERIFICATION_CODE is not set in environment variables');
    return false;
  }
  
  return code === expectedCode;
}

/**
 * Middleware to verify the car addition code in API routes
 * @param req The Next.js API request
 * @returns An object with success status and error message if any
 */
export async function verifyCarCodeInRequest(req: Request): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { code } = await req.json();
    
    if (!code) {
      return { 
        success: false, 
        error: 'Verification code is required' 
      };
    }
    
    const isValid = verifyCarCode(code);
    
    if (!isValid) {
      return { 
        success: false, 
        error: 'Invalid verification code' 
      };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error verifying code:', error);
    return { 
      success: false, 
      error: 'Invalid request format' 
    };
  }
}
