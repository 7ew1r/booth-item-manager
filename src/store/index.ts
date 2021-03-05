import BoothItem from "@/models/BoothItem";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface State {
  items: BoothItem[];
}

export interface Mutations {
  [key: string]: (state: State, payload?: any) => void;
}

export const state: State = {
  items: [
    new BoothItem(1, 954376, "オリジナル3Dモデル『キッシュ』", [
      "3Dモデル",
      "VRChat",
    ]),
    new BoothItem(2, 2495796, "オリジナル3Dモデル『レイニィ』ver.1.02", []),
    new BoothItem(3, 2645754, "オリジナル3Dモデル 　「ぷれっつぇる」", []),
  ],
};

export const mutations: Mutations = {
  addItem(state, item: BoothItem) {
    state.items.push(item);
  },
};

export default new Vuex.Store({
  state,
  mutations,
});
