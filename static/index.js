import { CreatloginePage } from "./login.js";
import { FetchProfile} from "./Profile.js";
import  {PageNotfound} from "./pagenotfound.js"





 const navigateTo = url =>{
  history.pushState(null,null,url);
  router()
};

const router = async() => {

  const routes = [
        {path: "/login", view:CreatloginePage},
          {path: "/profile", view:FetchProfile}
  ]
  let find = routes.map(route => {
      return {
          route: route,
          isMatch: location.pathname === route.path
      }
  })
  let match = find.find(findss => findss.isMatch)
  
  if (!match) {
      match ={
         route : {path:location.pathname,view:PageNotfound},
         isMatch: true 
      } 
  }
  
  match.route.view();

  
} 
 const item = localStorage.getItem('jwt')
 console.log(item);
 
 if (!item ){
  navigateTo("/login")
 }
  



