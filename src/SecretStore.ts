import { JsonDB, Config } from 'node-json-db';

export class SecretStore {
    private db: JsonDB;

    public TwitterUser: string;
    public TwitterPass: string;
    public TelegramAppId: number;
    public TelegramAppHash: string;
    public TelegramSession: string;
    public TelegramPhone: string;
    public TelegramPass: string;
    public TelegramSourceGroupName: string;
    public TelegramTargetGroupName: string;
    public PixivAccessToken:string
    public PixivRefreshToken:string;

    public constructor() {
        this.db = new JsonDB(new Config("secrets.json", true, true));
    }

    public async init() {
        var twitterConfig = await this.db.getData("/Twitter");
        var telegramConfig = await this.db.getData("/Telegram");
        var pixivConfig = await this.db.getData("/Pixiv");

        this.TwitterUser = twitterConfig.User;
        this.TwitterPass = twitterConfig.Pass;
        this.TelegramAppId = telegramConfig.AppId;
        this.TelegramAppHash = telegramConfig.AppHash;
        this.TelegramSession = telegramConfig.Session;
        this.TelegramPhone = telegramConfig.Phone;
        this.TelegramPass = telegramConfig.Pass;
        this.TelegramSourceGroupName = telegramConfig.SourceChatName;
        this.TelegramTargetGroupName = telegramConfig.TargetChatName;
        this.PixivAccessToken = pixivConfig.AccessToken;
        this.PixivRefreshToken = pixivConfig.RefreshToken;
    }

    public async SetTelegramSession (session:string) {
        await this.db.push("/Telegram/Session", session);
        this.TelegramSession = await this.db.getData("/Telegram/Session");
    }

    public async SetPixivRefreshToken (token:string) {
        await this.db.push("/Pixiv/RefreshToken", token);
        this.PixivRefreshToken = await this.db.getData("/Pixiv/RefreshToken");
    }
}