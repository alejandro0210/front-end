import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
 
  baseurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  

resgister(name: string, email: string, password: string): Observable<any>
{
 
  return this.http.post(
    `${this.baseurl}/api/register/`,
    { name, email, password},
    { headers: this.httpHeaders }
  );
}

login(email: string, password: string): Observable<any>
{
  return this.http.post(
    `${this.baseurl}/api/login/`,
    {email, password},
    { headers: this.httpHeaders }
  );
}

  getCurrentUser(id:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });

    return this.http.get(`${this.baseurl}/api/users/show/`+id, { headers });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }
    
 

    newPassword(email: string): Observable<any>
    {
      return this.http.put(
        `${this.baseurl}/api/newPassword/${email}`,{});
        //http://127.0.0.1:8000/api/newPassword/alex@gmail.com
    }

    actualizarRandomPassword(email: string): Observable<any>
    {
      // vamos a retornar el http porque es un put
      return this.http.put(
        //ponemos la ip base y le sumamos la ip del servicio de laravel y le sumamos el email de parametro del metodo para que le actualice a el la contraseña
        `${this.baseurl}/api/updateRandom/${email}`,{});
        // //http://127.0.0.1:8000/api/updateRandom/1@gmail.com
         }

    logout(): Observable<any>
    {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      });
  
      return this.http.delete(
        `${this.baseurl}/api/logout/`,
        { headers }
      );
    }

   
   
}



