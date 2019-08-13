const logon = {
  Logon: "CMS/User.Logon"
};

const search = {
  Search: "CMS/Search.Search",
  QueryHotTerms: "CMS/Search.QueryHotTerms",
  SearchTopRank: 'CMS/Search.SearchTopRank'
};

const article = {
  GetArticleDetail: "CMS/Article.GetUserArticleDetail",
  InsertArticle: "CMS/Article.Insert",
  ArticleQueryByPage: "CMS/Article.QueryByPage"
};

const category = {
  QueryCategory: "CMS/Category.Query"
};

const tag = {
  QueryTag: "CMS/Tag.Query",
  InsertTag: "CMS/Tag.Insert"
};

const good = {
  ToggleGood: "CMS/Good.ToggleGood",
  QueryArticleByPage: "CMS/Good.QueryArticleByPage",
  GoodMultiDelete: "CMS/Good.MultiDelete"
};

const user = {
  GetUserHomePage: "CMS/User.GetUserHomePage",
  UserEditBasicInfo: "CMS/User.EditBasicInfo",
  UserEditExtendInfo: "CMS/User.EditExtendInfo",
  UserGetUserExtendByUserId: "CMS/User.GetUserExtendByUserId",
  UserEditMobile: "CMS/User.EditMobile",
  UserEditEmail: "CMS/User.EditEmail",
  UserGetHomePage: "CMS/User.GetHomePage",
  UserGetById: "CMS/User.GetById"
};

const Fav = {
  QueryFavArticleByPage: "CMS/Fav.QueryFavArticleByPage",
  FavMultiDelete: "CMS/Fav.MultiDelete",
  ToggleFav: "CMS/Fav.ToggleFav"
};

const Comment = {
  QueryCommentArticleByPage: "CMS/Comment.QueryCommentArticleByPage"
};

const Enterprise = {
  enterpriseGetByUserId: "CMS/Enterprise.GetByUserId"
};

const Follow = {
  FollowQueryFollowUserByPage: "CMS/Follow.QueryFollowUserByPage",
  FollowQueryFollowedUserByPage: "CMS/Follow.QueryFollowedUserByPage",
  FollowQueryFanByPage: "CMS/Follow.QueryFanByPage",
  FollowToggleFollow: "CMS/Follow.ToggleFollow",
  FollowChangeCard: "CMS/Follow.ChangeCard",
  FollowQueryFollowArticleByPage: "CMS/Follow.QueryFollowArticleByPage"
};

const Notice = {
  NoticeQueryByPage: "CMS/Notice.QueryByPage",
  NoticeMultiSetRead: "CMS/Notice.MultiSetRead",
  NoticeGetUnReadRecord: "CMS/Notice.GetUnReadRecord"
};

const Complain = {
  Complain: "CMS/Complain.Complain"
};

const UserCard = {
  UserCardGetFollowUserCard: "CMS/UserCard.GetFollowUserCard",
  GetCardById: "CMS/UserCard.GetByUserId",
  EditUserCard: "CMS/UserCard.Edit"
};

const Payment = {
  SubscribeArticle: "CMS/Payment.SubscribeArticle",
  RewardArticle: "CMS/Payment.RewardArticle",
  PaymentGetById: "CMS/Payment.GetById",
  QueryPaymentByArticleId: "CMS/Payment.QueryByArticleId"
};

const ForwardRecord = {
  ForwardRecordInsert: "CMS/ForwardRecord.Insert"
};

let cms = Object.assign({},
  Complain,
  article,
  tag,
  category,
  good,
  search,
  logon,
  user,
  Fav,
  Comment,
  Follow,
  Notice,
  Enterprise,
  UserCard,
  Payment,
  ForwardRecord
)

export default cms
