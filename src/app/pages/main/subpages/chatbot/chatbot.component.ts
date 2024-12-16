import { Component, OnInit } from '@angular/core';
import {
  faRotate,
  faRotateLeft,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RouteEndpoints } from '@constants/route-endpoints';
import { HttpsService } from '@services/https.service';
import * as HraQuestions from 'src/assets/data/hra-questions.json';
import { GlobalService } from '@services/global.service';

interface Question {
  QuestionId: string;
  Question: string;
  QuestionType: string;
  Options: string[];
  Answer: any[];
  AnswerValidation: any;
  AnswerNote: string;
  InvalidAnswerMssg: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {
  constructor(
    private globalService: GlobalService,
    private httpsService: HttpsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  lang: string = '';
  faRotate = faRotate;
  faRotateLeft = faRotateLeft;
  faCheck = faCheck;
  answerInput: FormControl = new FormControl(null, [Validators.required]);
  answerInputTwo: FormControl = new FormControl(null, []);
  questionsArray: Question[] = [];
  answeredQuestionsArray: Question[] = [];
  curentQuestionIndex: number = 0;
  currentQuestion: Question | any = null;
  minDobDate: Date = new Date();
  maxDobDate: Date = new Date();
  conversationId: string = '';

  ngOnInit(): void {
    this.lang = this.route.snapshot.params?.['lang'];
    this.questionsArray = Array.from(HraQuestions) as Question[];
    this.answeredQuestionsArray = (
      Array.from(HraQuestions) as Question[]
    )?.filter((question: Question) => question?.Answer?.length > 0);

    this.minDobDate = new Date('1947');
    this.maxDobDate = new Date(
      new Date().setFullYear(new Date().getFullYear() - 18)
    );

    this.loadCurrentQuestion();
  }
  getAnswers() {
    const { queryParams } = this.route.snapshot;
    if (
      queryParams?.['clientId'] &&
      queryParams?.['customerId'] &&
      queryParams?.['integerationId']
    ) {
      //   // this.httpsService
      //   //   .postRequest(RouteEndpoints.GET_QUESTIONS, {
      //   //     ClientID: queryParams?.['clientId'],
      //   //     IntegrationID: queryParams?.['integerationId'],
      //   //     CustomerID: queryParams?.['customerId'],
      //   //     conversationId: '',
      //   //     SurveyVersion: '1.0.0.0',
      //   //     Status: 'New',
      //   //   })
      //   //   .subscribe({
      //   //     next: (queRes: any) => {
      //   //       if (queRes?.questions?.length > 0) {
      this.httpsService
        .postRequest(RouteEndpoints.CREATE_CONVERSATION_ID, {
          ClientID: queryParams?.['clientId'],
          IntegrationID: queryParams?.['integerationId'],
          CustomerID: queryParams?.['customerId'],
          conversationId: '',
          SurveyVersion: '1.0.0.0',
          Status: 'New',
        })
        .subscribe({
          next: (conRes: any) => {
            if (conRes?.conversationId) {
              this.conversationId = conRes?.conversationId;
            }
          },
        });
      //   //         }
      //   //       },
      //   //     });
    }
  }
  loadCurrentQuestion() {
    setTimeout(() => {
      this.currentQuestion = null;
      window.scrollTo(0, document.body.scrollHeight);
    }, 50);
    setTimeout(() => {
      this.currentQuestion = this.questionsArray[this.curentQuestionIndex];
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 50);

      switch (this.currentQuestion?.QuestionType) {
        case 'date': {
          this.answerInput.patchValue(this.maxDobDate);
          break;
        }
        case 'number': {
          this.answerInput.patchValue(null);
          break;
        }
      }
    }, 1000);
  }
  isAnswerInvalid(): boolean {
    if (this.currentQuestion?.AnswerValidation?.length > 0) {
      if (this.currentQuestion?.QuestionId === 'ask_height') {
        return (
          this.answerInput.value < this.currentQuestion?.AnswerValidation[0] ||
          this.answerInput.value > this.currentQuestion?.AnswerValidation[1] ||
          this.answerInputTwo.value > 11
        );
      }
      return (
        this.answerInput.value < this.currentQuestion?.AnswerValidation[0] ||
        this.answerInput.value > this.currentQuestion?.AnswerValidation[1]
      );
    }
    return false;
  }
  saveQuestionAnswer() {
    const { queryParams } = this.route.snapshot;

    if (this.answerInput.valid && !this.isAnswerInvalid()) {
      switch (this.currentQuestion?.QuestionType) {
        case 'date': {
          const selectedDate = `${this.answerInput.value.getDate()}-${
            this.answerInput.value.getMonth() + 1
          }-${this.answerInput.value.getFullYear()}`;
          this.currentQuestion.Answer = [selectedDate];
          break;
        }
        case 'multiple': {
          this.currentQuestion.Answer = [
            this.answerInput?.value === 'None'
              ? 'None'
              : this.answerInput.value?.toString(),
          ];
          break;
        }
        default: {
          if (this.currentQuestion?.QuestionId === 'ask_height') {
            this.currentQuestion.Answer = [
              `${this.answerInput.value}.${this.answerInputTwo.value || 0}`,
            ];
          } else this.currentQuestion.Answer = [this.answerInput.value];
          break;
        }
      }
      this.answerInput.reset();
      this.answeredQuestionsArray.push(this.currentQuestion);
      this.curentQuestionIndex = this.curentQuestionIndex + 1;
      this.loadCurrentQuestion();

      // this.httpsService.postRequest(RouteEndpoints.SAVE_ANSWER, {
      //   ClientID: queryParams?.['clientId'],
      //   CustomerID: queryParams?.['customerId'],
      //   IntegrationID: queryParams?.['integerationId'],
      //   conversationId: this.conversationId,
      //   SurveyVersion: '1.0.0.0',
      //   Status: 'InProgress',
      //   AnswerJson: JSON.stringify({
      //     conversationId: '',
      //     ClientID: queryParams?.['clientId'],
      //     integrationID: queryParams?.['integerationId'],
      //     CustomerID: queryParams?.['customerId'],
      //     questionAnswer: [
      //       {
      //         createdAt: new Date(
      //           new Date().getTime() + 19800000
      //         ).toISOString(),
      //         updatedAt: new Date(
      //           new Date().getTime() + 19800000
      //         ).toISOString(),
      //         status: 'InProgress',
      //         QAndA: [
      //           {
      //             question_id: '',
      //             question: '',
      //             answerNLP: '13/12/2024',
      //             answerRAW: '13/12/2024'
      //           }
      //         ],
      //       },
      //     ],
      //   }),
      // });
    } else {
      this.globalService.triggerToastMessage(
        'error',
        this.currentQuestion?.InvalidAnswerMssg
      );
    }
  }
  previousQuestion(redo: boolean = false) {
    if (redo) {
      this.curentQuestionIndex = 0;
      this.answeredQuestionsArray = [];
      this.questionsArray = Array.from(HraQuestions) as Question[];
    } else {
      this.curentQuestionIndex = this.curentQuestionIndex - 1;
      this.answeredQuestionsArray.pop();
    }
    this.loadCurrentQuestion();
  }
}
