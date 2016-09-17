import { Component, OnInit } from '@angular/core';
import { TwitchUserListService, TwitchUser, OrderBy } from '../shared/index';

declare var Twitch: any;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  pipes: [OrderBy]
})
export class HomeComponent implements OnInit {

  TwitchUsers: TwitchUser[] = [];
  userNames: string[] = [];
  errorMessage: string;


  constructor(public twitchUserListService: TwitchUserListService) {}

  ngOnInit() {

    Twitch.init({clientId: 'bxz6xvq7rangjrvbqceowmnggccvw3p'}, function(error: any, status: any){
      console.log('Twitch initialized.');
    });
    this.getTwitchUsers();
    //Twitch.api({method: 'streams/twitch', params: {client_id: 'bxz6xvq7rangjrvbqceowmnggccvw3p'}}, function(error:any,response:any){});
  }

  getTwitchUsers() {
    this.twitchUserListService.GetUserNames()
                              .subscribe( userNames => this.userNames = userNames, error => this.errorMessage = <any>error );
    this.twitchUserListService.GetTwitchUsers()
                              .subscribe(twitchUsers => this.TwitchUsers = twitchUsers, error => this.errorMessage = <any>error);
  }

  // /**
  //  * Creates an instance of the HomeComponent with the injected
  //  * NameListService.
  //  *
  //  * @param {NameListService} nameListService - The injected NameListService.
  //  */
  // constructor(public nameListService: NameListService) {}

  // /**
  //  * Get the names OnInit
  //  */
  // ngOnInit() {
  //   this.getNames();
  // }

  // /**
  //  * Handle the nameListService observable
  //  */
  // getNames() {
  //   this.nameListService.get()
  //                    .subscribe(
  //                      names => this.names = names,
  //                      error =>  this.errorMessage = <any>error
  //                      );
  // }

  // /**
  //  * Pushes a new name onto the names array
  //  * @return {boolean} false to prevent default form submit behavior to refresh the page.
  //  */
  // addName(): boolean {
  //   // TODO: implement nameListService.post
  //   this.names.push(this.newName);
  //   this.newName = '';
  //   return false;
  // }

}
