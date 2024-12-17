import crypto from 'node:crypto';

export function hashUserPassword(password){
    const salt = crypto.randomBytes(16).toString('hex');

    const hashedPassword = crypto.scryptSync(password, salt, 64);

    return hashedPassword.toString('hex') + ':' + salt;
}


export function verifyPassword(storedPwd, suppliedPwd){
    const [hashedPassword, salt] = storedPwd.split(':');

    const hashedPwdBuf = Buffer.from(hashedPassword, 'hex'); //stored
    const suppliedPwdBuf = Buffer.from(suppliedPwd, salt, 64);

    return crypto.timingSafeEqual(hashedPwdBuf, suppliedPwdBuf);

}




