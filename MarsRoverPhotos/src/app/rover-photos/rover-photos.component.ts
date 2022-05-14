import { Component, OnInit } from '@angular/core';
import { MarsService } from '../services/mars.service';
import { MartianSol, MartianSolNoPhotos } from '../models/photos'; 


@Component({
  selector: 'app-rover-photos',
  templateUrl: './rover-photos.component.html',
  styleUrls: ['./rover-photos.component.css']
})
export class RoverPhotosComponent implements OnInit {

  pageTitle = 'Martian Sol List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  
  //created a list of sols to display on our page
  listOfSols:MartianSolNoPhotos[] = [];
  storedListOfSols:MartianSolNoPhotos[] = [];
  index = 0;

  solFilter:number = 0;

  constructor(private marsService: MarsService) {}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    //we will get the rover photos by the entered in sol (default will get them a random sol day, 
    //users can get a different sol day if they enter in a number)
    this.getRandomSolDay();
  }
  
  //will return a random number from 1-3000
  randomSolDay() {
    return Math.floor((Math.random() * 3000) + 1);
  }
  
  getRandomSolDay()
  {
    this.marsService.getMarsRoverPhotosBySol(this.randomSolDay()).subscribe(result => {
      //set the list of sols back to an empty list
      this.listOfSols = [];
      
      //since the way that nasa sends the data to us from their api is weird, i had to do this to display the images.
      for(let index:number = 0; index<result.photos.length; index++)
      {
        this.listOfSols.push(result.photos[index]);
      }

      this.storedListOfSols = this.listOfSols;
      console.log(this.listOfSols);
    });
  }

  getPhotosFromSol(solDay: number)
  {
    this.marsService.getMarsRoverPhotosBySol(solDay).subscribe(result => {

      //set the list of sols back to an empty list
      this.listOfSols = [];

      //once again, since the way that nasa sends the data to us from their api is weird, i had to do this to display the images.
      for(let index:number = 0; index<result.photos.length; index++)
      {
        this.listOfSols.push(result.photos[index]);
      }

      this.storedListOfSols = this.listOfSols;
      console.log(result);
    });
  }
}

