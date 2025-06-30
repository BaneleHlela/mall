export function formatAddress(address: string): string[] {
    let formattedAddress: string[] = [];
  
    // Regex to detect Plus Codes (e.g., 732P+F4)
    const plusCodeRegex = /\b[A-Z0-9]{4}\+?[A-Z0-9]{2}\b/;
  
    // Check if the address contains a Plus Code
    if (plusCodeRegex.test(address)) {
      const plusCodeMatch = address.match(plusCodeRegex);
      if (plusCodeMatch) {
        const plusCode = plusCodeMatch[0];
        const location = address.replace(plusCode, '').trim();
        formattedAddress.push(`${plusCode}`);
        formattedAddress.push(`${location}`);
      }
    } else {
      // Handle regular addresses
      const addressParts = address.split(',').map(part => part.trim());
  
      // Organize the parts based on expected structure
      if (addressParts.length >= 4) {
        formattedAddress.push(`${addressParts[0]}, ${addressParts[1]}`);
        formattedAddress.push(`${addressParts[2]}, ${addressParts[3]}`);
        if (addressParts[4]) formattedAddress.push(addressParts[4]);
      } else {
        formattedAddress.push(addressParts.join(', '));
      }
    }
  
    return formattedAddress;
}
  
export function formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
  
    // Check if the cleaned string has exactly 10 digits
    if (cleaned.length === 10) {
      // Format the phone number as XXX-XXX-XXXX
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else {
      throw new Error('Invalid phone number. Please provide exactly 10 digits.');
    }
}



  