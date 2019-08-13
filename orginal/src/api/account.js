const Account = {
  LogOnOrRegisterForCMS: "Account/Account.LogOnOrRegisterForCMS",
  LogOnForConnect: "Account/Account.LogOnForConnect",
  LogOnOrRegisterForCMSByPhone: "Account/Account.LogOnOrRegisterForCMSByPhone",
  LogOut: "Account/Account.LogOut"
};

const Member = {
  MemberCheckOriginalMobilePhone: "Account/Member.CheckOriginalMobilePhone",
  MemberCheckOriginalEmail: "Account/Member.CheckOriginalEmail",
  MemberBindPhone: "Account/Member.BindPhone",
  MemberBindEMail: "Account/Member.BindEMail"
};

const IndustryTag = {
  QueryAllIndustryTag: "Account/IndustryTag.QueryAll"
};
let accout = Object.assign({},
  Account,
  Member,
  IndustryTag
)
export default accout
