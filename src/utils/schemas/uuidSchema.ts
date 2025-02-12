import { string } from "yup";
import { uuidRegex } from "../regex";

export const uuidSchema = string().matches(uuidRegex, 'UUID inválido')
