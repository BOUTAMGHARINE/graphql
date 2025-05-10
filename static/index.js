
import { CreatloginePage } from "./login.js";
import { FetchProfile } from "./Profile.js";
import { PageNotfound } from "./pagenotfound.js"


console.log(location.pathname);
const router = async () => {
  

  const routes = [
    { path: "/login", view: CreatloginePage },
    { path: "/profile", view: FetchProfile }
  ]
  let find = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  })
  let match = find.find(findss => findss.isMatch)
  console.log(match);
  

  if (!match) {
    match = {
      route: { path: location.pathname, view: PageNotfound },
      isMatch: true
    }
  }


  match.route.view();


}

export const navigateTo = url => {
  history.pushState(null, null, url);
  router()
};

const item = localStorage.getItem('jwt')

if (!item) {
  navigateTo("/login")
} else {
  navigateTo("/profile")
}





