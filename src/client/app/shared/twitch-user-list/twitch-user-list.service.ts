import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class TwitchUser{
  name: string;
  logo: string;
  status: string;
}

/**
 * This class provides the TwitchUserList service with methods to read names and add names.
 */
@Injectable()
export class TwitchUserListService {

  /**
   * Creates a new TwitchUserListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  GetUserNames(): Observable<string[]> {
    return this.http.get('/assets/twitch-users.json')
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  GetTwitchUsers(): Observable<TwitchUser[]> {
    return this.http.get('/assets/twitch-users.json')
                    .map((res: Response) => res.json())
                    .map((twitchUsers:any[]) => {
                      let result:TwitchUser[] = [];
                      if(twitchUsers){
                        twitchUsers.forEach((twitchUser) => {
                          Twitch.api({method: `streams/${twitchUser}`, params: {client_id: 'bxz6xvq7rangjrvbqceowmnggccvw3p'}}, function(error:any,response:any){
                            if(response.stream){
                              let newTwitchUser: TwitchUser = new TwitchUser();
                              newTwitchUser.name = response.stream.channel.display_name;
                              newTwitchUser.logo = response.stream.channel.logo;
                              newTwitchUser.status = response.stream.channel.status;
                              result.push(newTwitchUser);
                            }
                            else{
                              Twitch.api({method: `channels/${twitchUser}`, params: {client_id: 'bxz6xvq7rangjrvbqceowmnggccvw3p'}}, function(error: any, response: any){
                                console.log(response);
                                let newTwitchUser: TwitchUser = new TwitchUser();
                                newTwitchUser.name = response.display_name;
                                newTwitchUser.logo = response.logo;
                                newTwitchUser.status = "Not currently streaming...";
                                result.push(newTwitchUser);
                              });
                            }
                          });
                        });
                      }
                      return result;
                    })
                    .catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res.json();
    
  }
  

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

