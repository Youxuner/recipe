export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public redirect?: boolean,
  ) {}

  public get token() {
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
      return null;
    return this._token;
  }

  public get tokenExpirationDate() {
    if (!this._tokenExpirationDate) return null;
    return this._tokenExpirationDate;
  }
}
