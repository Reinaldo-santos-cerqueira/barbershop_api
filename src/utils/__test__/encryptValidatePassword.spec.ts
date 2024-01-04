/* eslint-disable @typescript-eslint/no-explicit-any */
import { encryptValidatePassword } from '../encryptValidatePassword';

describe('Testing to function encryptValidatePassword', () => {
    it('Should return a hashed password for a strong password', async () => {
        const strongPassword = 'Strong123!';

        const hashedPassword = await encryptValidatePassword(strongPassword);

        expect(hashedPassword).toBeDefined();
        expect(hashedPassword).not.toEqual(strongPassword);
    });
    it('Should throw an AppError for a weak password', async () => {
        const weakPassword = 'weak';
        try {
            await encryptValidatePassword(weakPassword);
        } catch (e: any) {
            expect(e.message).toBe('Senha fraca precisa ter: 10 caracteres,pelo menos uma letra minúscula,pelo menos uma letra maiúscula,pelo menos um número e pelo menos um caractere especial');
        }
    });
});