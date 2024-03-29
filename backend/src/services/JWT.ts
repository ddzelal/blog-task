import jsonwebtoken, { SignOptions, JwtPayload } from "jsonwebtoken";
import config from "config";

interface ITokenService {
    generateAccessToken(payload: any): string;
    verifyAccessToken(token: string): JwtPayload | null;
}

class JWT implements ITokenService {
    private accessToken: string;
    private accessTokenLife: string;

    constructor() {
        this.accessToken = config.get("jwt.accessToken");
        this.accessTokenLife = config.get("jwt.accessTokenLife");
    }

    public generateAccessToken(payload: any): string {
        const options: SignOptions = { expiresIn: this.accessTokenLife };
        return jsonwebtoken.sign(payload, this.accessToken, options);
    }

    public verifyAccessToken(token: string): JwtPayload | null {
        try {
            return jsonwebtoken.verify(token, this.accessToken) as JwtPayload;
        } catch (error) {
            console.error("Token verification failed:", error);
            return null;
        }
    }
}

export default JWT;
