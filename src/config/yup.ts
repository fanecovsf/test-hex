import { setLocale } from 'yup';

setLocale({
  string: {
    email: 'Email inválido', // Mensagem padrão para .email()
    min: ({ min }) => `Deve ter pelo menos ${min} caracteres`, // Mensagem para .min()
    max: ({ max }) => `Deve ter no máximo ${max} caracteres`, // Mensagem para .max()
  },
  mixed: {
    required: ({ path }) => `O campo ${path} é obrigatório`, // Mensagem padrão para .required()
    notType: 'Formato inválido', // Mensagem para tipos incompatíveis
    oneOf: ({ values }) => `O valor deve ser um dos seguintes: ${values}`
  },
  array: {
    min: ({ min }) => `Deve ter pelo menos ${min} itens`, // Mensagem para .min() em arrays
    max: ({ max }) => `Deve ter no máximo ${max} itens`, // Mensagem para .max() em arrays
  },
});
