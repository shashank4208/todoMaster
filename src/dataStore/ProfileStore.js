import { observable, action, makeObservable } from "mobx";
import axios from "axios";
import rootStore from "./RootStore";

class ProfilStore{
    access_token=localStorage.getItem('access_token');
    refresh_token=localStorage.getItem('refresh_token');
    userInfo=JSON.parse(localStorage.getItem('userInfo'));
    profileData= [];

    getProfile = async (access_token) => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: {
            "Authorization": `Bearer ${access_token}`
          }
        });
        const userInfo = {
          userData: response.data,
          taskData: rootStore.taskDataStore.copy_taskData
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));        
        this.profileData=response.data;
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile');
      }
    };

    constructor(){
        makeObservable(this,{
          userInfo:observable,
            profileData:observable,
            getProfile:action,
            access_token:observable,
            refresh_token:observable,
            clearData:action,
        })
    }

    clearData=()=>{
      this.access_token=null;
      this.refresh_token=null;
      this.profileData=null;
      localStorage.clear();
      
    }
}

export default ProfilStore