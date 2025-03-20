import homePageQuery from "./homePage";
import videoPageQuery from "./videoPage";
import paperQuery from "./paperPage";
import hostQuery from "./host";
import eventQuery from "./event";
import exhibitionPageQuery from "./exhibitionPage";

const Query = {
  ...homePageQuery,
  ...videoPageQuery,
  ...paperQuery,
  ...hostQuery,
  ...eventQuery,
  ...exhibitionPageQuery,
};

export default Query;
