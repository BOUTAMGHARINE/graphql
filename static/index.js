
import { CreatloginePage } from "./login.js";
import { FetchProfile } from "./Profile.js";
import { PageNotfound } from "./pagenotfound.js"










export const navigateTo = url => {
  history.pushState(null, null, url);
  router()
};

console.log(location.pathname);
const router = async () => {
  

  const routes = [
    { path: "/login", view: CreatloginePage },
    { path: "/profile", view: FetchProfile },
    { path: "/", view: FetchProfile }
  ]
  let find = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  })
  let match = find.find(findss => findss.isMatch)
  console.log(match,"123");
  

  if (!match) {
    match = {
      route: { path: location.pathname, view: PageNotfound },
      isMatch: true
    }
  }


  match.route.view();


}
router()




