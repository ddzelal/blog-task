import config from "config";
import JWT from "../../../src/services/JWT";
import jsonwebtoken from "jsonwebtoken";

const [accessToken, refreshToken] = [config.get("jwt.accessToken"), config.get("jwt.accessTokenLife")];

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn().mockReturnValue("mockedToken"),
    verify: jest.fn().mockReturnValue({ userId: 1 }),
}));

describe("JWT Service", () => {
    const payload = { userId: 1 };
    const token = "mockedToken";
    const jwtService = new JWT();

    it("should generate an access token", () => {
        const generatedToken = jwtService.generateAccessToken(payload);
        expect(generatedToken).toBe(token);
        expect(jsonwebtoken.sign).toHaveBeenCalledWith(payload, accessToken, { expiresIn: refreshToken });
    });

    it("should verify an access token and return payload", () => {
        const verifiedPayload = jwtService.verifyAccessToken(token);
        expect(verifiedPayload).toEqual({ userId: 1 });
        expect(jsonwebtoken.verify).toHaveBeenCalledWith(token, accessToken);
    });
});
