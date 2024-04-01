// validator.ts
import validator from 'validator'

// Email validation using validator.js
export function isEmailValid(email: string | null | undefined): boolean {
   if (email === null || email === undefined || email.trim() === '') {
      // Consider an empty or null string as an invalid email
      return false
   }
   return validator.isEmail(email)
}

// Bangladeshi phone number validation
export function isBangladeshiPhoneNumberValid(phone: string): boolean {
   const phoneRegex = /^(?:\+?880|00880)?01[3-9]\d{8}$/
   return phoneRegex.test(phone)
}

// A utility function to check if a string variable is non-null, non-undefined, and non-empty
export function isVariableValid(variable: any): boolean {
   return variable !== null && variable !== undefined && variable.trim() !== ''
}
