import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';

import { RouteEndpoints } from '@constants/route-endpoints';
import { HttpsService } from '@services/https.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  constructor(
    private httpsService: HttpsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  lang: string = '';

  ngOnInit(): void {
    this.lang = this.route.snapshot.params?.['lang'];
  }
  startHra() {
    const customerId = uuidv4();

    this.httpsService
      .postRequest(RouteEndpoints.GET_CLIENT_INTEGRATION_ID, {
        Client: 'NewHra',
      })
      .subscribe({
        next: (intRes: any) => {
          if (intRes?.IntegrationID) {
            this.httpsService
              .postRequest(RouteEndpoints.CREATE_CONVERSATION_ID, {
                CustomerID: customerId,
                IntegrationID: intRes?.IntegrationID,
                Status: 'New',
                SurveyVersion: '1.0.0.0',
              })
              .subscribe({
                next: (conRes: any) => {
                  if (conRes?.CustomerID) {
                    this.httpsService
                      .postRequest(RouteEndpoints.REGISTER_CLIENT, {
                        id: conRes?.CustomerID,
                        name: conRes?.CustomerID,
                        gender: 'MALE',
                        dob: '15/12/2024',
                      })
                      .subscribe({
                        next: (regRes: any) => {
                          if (
                            regRes?.StatusCode === 200 &&
                            regRes?.Flag === 1
                          ) {
                            this.router.navigate([`/${this.lang}/chatbot`], {
                              replaceUrl: true,
                              queryParams: {
                                clientId: 'ClientID',
                                customerId: conRes?.CustomerID,
                                integerationId: intRes?.IntegrationID,
                              },
                            });
                          }
                        },
                      });
                  }
                },
              });
          }
        },
      });
  }
}
