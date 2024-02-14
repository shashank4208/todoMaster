import { makeObservable, observable } from "mobx";
import TaskDataStore from "./TaskDataStore";
import ProfilStore from "./ProfileStore";

class RootStore{
    taskDataStore=new TaskDataStore()
    ProfilStore=new ProfilStore()
    
    constructor(){
        makeObservable(this,{
            taskDataStore:observable,
            ProfilStore:observable
        })
    }
}

const rootStore=new RootStore();

export default rootStore;