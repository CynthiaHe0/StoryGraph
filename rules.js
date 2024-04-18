var keys = {};
var socks = {};
//So append a letter for each sock. Use switch-case to 
//add flavor text for the ending?
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        //console.log(socks);
        //console.log(keys);
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { 
                if (choice.Sock){
                    if (socks[choice.Sock] == true){
                        continue;
                    }
                }
                this.engine.addChoice(choice.Text, choice);
            }
            if(locationData.Hidden && keys[locationData.Hidden_Unlock_Key]){
                if (locationData.Hidden[0].Sock && socks[locationData.Hidden[0].Sock] != true){
                    this.engine.addChoice(locationData.Hidden[0].Text, locationData.Hidden[0]);
                } else if (locationData.Hidden[0].Key && keys[locationData.Hidden[0].Key] != true){
                    console.log(locationData.Hidden[0].Key);
                    console.log(keys);
                    this.engine.addChoice(locationData.Hidden[0].Text, locationData.Hidden[0]);
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }
    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            if (choice.Key){
                keys[choice.Key] = true;
            }
            if (choice.Sock){
                socks[choice.Sock] = true;
            }
            if (choice.Blocked && keys[choice.Target_Key] == null){
                this.engine.gotoScene(Location, choice.Blocked);
            } else {
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}



class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');