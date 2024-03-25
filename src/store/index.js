import {createStore} from 'vuex'
import mutations from './mutations'
import {setStore} from "@/config/mUtils";

export default createStore({
  state: {
    the_order:[],
    the_cart: [],
    cur_shop: {},
    homePageScrollTop: 0,
    shopHeader: false,
    cartList: {}, // 加入购物车的商品列表
    shopDetail: null, //商家详情信息
    userInfo: null, //用户信息
    shopid: null,//商铺id
    cartId: null, //购物车id
    orderParam: null,//订单的参数
    orderMessage: null, //订单返回的信息
    orderDetail: null, //订单详情
    login: true,//是否登录
  },
  mutations: {
    setHomePageScrollTop (state, num) {
      state.homePageScrollTop = num
    },
    setShopHeader (state, b) {
      state.shopHeader = b
    },
    // storeUserInfo (state, info) {
    //   state.userInfo = info;
    //   state.login = true;
    //   setStore('user_id', info.user_id);
    // },
    ...mutations
  },
  actions: {},
  modules: {}
})
