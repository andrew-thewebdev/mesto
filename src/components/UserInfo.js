export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, avatarSelector) {
    this._userNameSelector = userNameSelector;
    this._userDescriptionSelector = userDescriptionSelector;
    this._avatarSelector = avatarSelector;
    this._userName = document.querySelector(this._userNameSelector);
    this._userInfo = document.querySelector(this._userDescriptionSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    this._userData = {};
    this._userData['username'] = this._userName.textContent;
    this._userData['userinfo'] = this._userInfo.textContent;

    return this._userData;
  }

  setUserInfo(userdata) {
    // this._userName.textContent = userdata.username;
    // this._userInfo.textContent = userdata.userinfo;
    this._userName.textContent = userdata.name;
    this._userInfo.textContent = userdata.about;
  }

  setUserAvatar(link) {
    this._avatar.src = link;
  }
}
