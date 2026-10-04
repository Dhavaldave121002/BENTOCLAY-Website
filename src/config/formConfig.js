// Web3Forms Configuration for Bentoclay Claytech
// All form submissions from the website will be delivered directly to the client's inbox: bentoclayclaytech@gmail.com

export const FORM_CONFIG = {
  accessKey: 'dcfc4aed-d7d9-42dc-82e1-e4fb82347a1a',
  clientEmail: 'bentoclayclaytech@gmail.com',
  apiUrl: 'https://api.web3forms.com/submit'
};

/**
 * Helper to generate direct 1-click Call and WhatsApp links for client phone numbers.
 * Provides clean clickable URLs recognized by Gmail, Outlook, and mobile mail clients.
 */
export const getDirectContactLinks = (phone) => {
  if (!phone || !String(phone).trim()) {
    return {
      cleanPhone: 'Not provided',
      callUrl: '',
      whatsappUrl: '',
      summaryText: ''
    };
  }

  const raw = String(phone).trim();
  const digitsOnly = raw.replace(/\D/g, '');

  if (!digitsOnly) {
    return {
      cleanPhone: raw,
      callUrl: '',
      whatsappUrl: '',
      summaryText: ''
    };
  }

  // Determine Call URL
  const cleanCall = raw.startsWith('+') ? `+${digitsOnly}` : (digitsOnly.length === 10 ? `+91${digitsOnly}` : `+${digitsOnly}`);
  const callUrl = `tel:${cleanCall}`;

  // Determine WhatsApp URL (wa.me accepts standard country code without + or leading zeros)
  let waNumber = digitsOnly;
  if (waNumber.length === 10) {
    waNumber = `91${waNumber}`;
  } else if (waNumber.length === 11 && waNumber.startsWith('0')) {
    waNumber = `91${waNumber.slice(1)}`;
  }
  const whatsappUrl = `https://wa.me/${waNumber}`;

  const summaryText =
    `\n\n-----------------------------------------\n` +
    `⚡ 1-CLICK ACTIONS:\n` +
    `📞 Call Client: ${callUrl}\n` +
    `💬 WhatsApp Client: ${whatsappUrl}\n` +
    `-----------------------------------------`;

  return {
    cleanPhone: cleanCall,
    callUrl,
    whatsappUrl,
    summaryText
  };
};



