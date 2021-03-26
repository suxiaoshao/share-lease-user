import { State } from './state';
import { MutationTree } from 'vuex';
import { UserInfo } from '@/utils/http/user/getInfo';
import { CartProp } from '@/utils/store/state';
import { GoodProp } from '@/utils/http/good/goodList';
import router, { afterLoginPage } from '@/utils/plugins/router';

const mutations: MutationTree<State> = {
  login(state: State, userInfo: UserInfo | null) {
    if (userInfo !== null) {
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      window.localStorage.removeItem('userInfo');
      if (afterLoginPage.includes(router.app.$route.name ?? '*')) {
        router.push({ name: 'Home' }).then();
      }
    }
    state.userInfo = userInfo;
  },
  searchGood(state: State, content: string) {
    state.searchContent = content;
  },
  /**
   * 更新购物车内容
   * @param payload.method: 1(add) 2(del), 3(init), 4(change type)
   */
  updateCartGoods(state: State, payload: { good: GoodProp; method: number; orderType: 'buy' | 'rent' }) {
    if (payload.method === 1) {
      // 添加购物车
      let isNewGood = true;
      for (let i = 0; i < state.cartGoods.length; i += 1) {
        if (state.cartGoods[i].gid === payload.good.gid) {
          isNewGood = false;
          state.cartGoods[i].num += 1;
          break;
        }
      }

      if (isNewGood) {
        const item: CartProp = {
          ...payload.good,
          num: 1,
          orderType: 'buy',
        };
        state.cartGoods.unshift(item);
      }
      localStorage.setItem(`${state.userInfo?.email}-cart`, JSON.stringify(state.cartGoods));
    } else if (payload.method === 2) {
      // 删除货品
      for (let i = 0; i < state.cartGoods.length; i += 1) {
        if (state.cartGoods[i].gid === payload.good.gid) {
          if (state.cartGoods[i].num > 1) {
            state.cartGoods[i].num -= 1;
          } else {
            state.cartGoods.splice(i, 1);
          }
          localStorage.setItem(`${state.userInfo?.email}-cart`, JSON.stringify(state.cartGoods));
          break;
        }
      }
    } else if (payload.method === 3) {
      const items = localStorage.getItem(`${state.userInfo?.email}-cart`);
      if (items) {
        state.cartGoods = JSON.parse(items);
      }
    } else if (payload.method === 4) {
      // change type
      console.log('change');
      for (let i = 0; i < state.cartGoods.length; i += 1) {
        if (state.cartGoods[i].gid === payload.good.gid) {
          state.cartGoods[i].orderType = payload.orderType;
          localStorage.setItem(`${state.userInfo?.email}-cart`, JSON.stringify(state.cartGoods));
          break;
        }
      }
    }
    console.log(state.cartGoods);
  },
  /**
   * 购物车金额累计
   */
  cartMoneyCheck(state: State): void {
    let buyMoney = 0;
    let rentMoney = 0;
    for (let i = 0; i < state.cartGoods.length; i += 1) {
      if (state.cartGoods[i].orderType === 'buy') {
        buyMoney += state.cartGoods[i].num * state.cartGoods[i].price;
      } else {
        rentMoney += state.cartGoods[i].num * state.cartGoods[i].rent;
      }
    }
    state.cartBuyMoney = buyMoney;
    state.cartRentMoney = rentMoney;
  },
};

export default mutations;
