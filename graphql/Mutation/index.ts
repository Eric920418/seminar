import homePageMutation from "./homePage";
import videoPageMutation from "./videoPage";
import paperPageMutation from "./paperPage";
import hostMutation from "./host";
import eventMutation from "./event";
import exhibitionPageMutation from "./exhibitionPage";

const Mutations = {
  ...homePageMutation,
  ...videoPageMutation,
  ...paperPageMutation,
  ...hostMutation,
  ...eventMutation,
  ...exhibitionPageMutation,
};

export default Mutations;
