export type PhoneType = 'Celular' | 'Fixo' | 'WhatsApp';

export type User = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  phoneType: PhoneType;
};

