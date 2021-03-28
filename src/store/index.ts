import BoothItem from "@/models/BoothItem";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface State {
  items: BoothItem[];
}

export interface Context {
  commit: (name: string, body: any) => void;
}

export interface Mutations {
  [key: string]: (state: State, payload?: any) => void;
}

export interface Actions {
  [key: string]: (context: Context, payload?: any) => void;
}

export const state: State = {
  items: [
    new BoothItem({
      number: "954376",
      url: "https://booth.pm/ja/items/2848199",
      title: "オリジナル3Dモデル『キッシュ』",
      shopName: "",
      shopUrl: "",
      description: "",
      modules: [],
      tags: ["3Dモデル", "VRChat"],
    }),
    new BoothItem({
      number: "2495796",
      url: "https://booth.pm/ja/items/2495796",
      title: "オリジナル3Dモデル『レイニィ』ver.1.02",
      shopName: "",
      shopUrl: "",
      description: "",
      modules: [],
      tags: [],
    }),
    // new BoothItem(1, 954376, "オリジナル3Dモデル『キッシュ』", [
    //   "3Dモデル",
    //   "VRChat",
    // ]),
    // new BoothItem(2, 2495796, "オリジナル3Dモデル『レイニィ』ver.1.02", []),
    // new BoothItem(3, 2645754, "オリジナル3Dモデル 「ぷれっつぇる」", []),
  ],
};

export const mutations: Mutations = {
  addItem(state, item: BoothItem) {
    state.items.push(item);
  },
};

export const actions: Actions = {
  addItem({ commit }, item) {
    commit("addItem", item);
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
