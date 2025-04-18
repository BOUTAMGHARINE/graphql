import { CreatloginePage } from "./login.js";
import { FetchProfile} from "./Profile.js";
import  {PageNotfound} from "./pagenotfound.js"



 export const navigateTo = url =>{
  history.pushState(null,null,url);
  router()
};

const router = async() => {
  console.log("HI");
  


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
router();
 const item = localStorage.getItem('jwt')
 
 if (!item ){
  navigateTo("/login")
 }
 navigateTo("/login")

  



