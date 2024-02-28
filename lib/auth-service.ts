import axios, { AxiosInstance } from "axios";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 5000,
      timeoutErrorMessage: "Request timed out",
    });
  }

  login = async (username: string, password: string) => {
    const res = await this.instance.post("/login", { username, password });
    return {
      username: res.data.username,
      accessToken: res.data.accessToken,
      expiresAt: res.data.expiresAt,
    };
  }
}
