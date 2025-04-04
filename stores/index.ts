import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", () => {
  const state = ref({});

  return {
    state,
  };
});
