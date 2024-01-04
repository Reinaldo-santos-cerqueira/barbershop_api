import { AppError } from '@middlewares';
import bcrypt from 'bcrypt';
export async function encryptValidatePassword(password: string): Promise<string> {
    const saltRounds = 10;
    const passwordStrongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:'",.<>?/\\|]).{10,}$/;
    if (!passwordStrongRegex.test(password)) {
        throw new AppError('Senha fraca precisa ter: 10 caracteres,pelo menos uma letra minúscula,pelo menos uma letra maiúscula,pelo menos um número e pelo menos um caractere especial', 400);
    }
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;

}