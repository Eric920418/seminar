import homePageMutation from "./homePage";
import videoPageMutation from "./videoPage";
import paperPageMutation from "./paperPage";
import hostMutation from "./host";
import eventMutation from "./event";
import exhibitionPageMutation from "./exhibitionPage";
import workShopPageMutation from "./WorkShopPage";
import speechPageMutation from "./speechPage";
import forumPageMutation from "./forumPage";
import meetingPageMutation from "./meetingPage";
import logoMutation from "./logo";
import colorMutation from "./color";

const Mutations = {
  ...homePageMutation,
  ...videoPageMutation,
  ...paperPageMutation,
  ...hostMutation,
  ...eventMutation,
  ...exhibitionPageMutation,
  ...workShopPageMutation,
  ...speechPageMutation,
  ...forumPageMutation,
  ...meetingPageMutation,
  ...logoMutation,
  ...colorMutation,
};

export default Mutations;
