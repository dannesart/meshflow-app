export type TService = {
  name: string;
  route: string;
  icon: string;
  webOnly: boolean;
  hasCategory: boolean;
  components: string[];
  category?: {
    components: string[];
  };
};
