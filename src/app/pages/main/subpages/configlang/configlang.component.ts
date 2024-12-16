import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';

import { AWSService } from '@services/aws.service';
import { GlobalService } from '@services/global.service';

@Component({
  selector: 'app-configlang',
  templateUrl: './configlang.component.html',
  styleUrls: ['./configlang.component.scss'],
})
export class ConfiglangComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private awsService: AWSService,
    private globalService: GlobalService
  ) {}
  allAvailableTranslationLanguages: {
    value: string;
    label: string;
    translated: boolean;
  }[] = [
    { value: 'af', label: 'Afrikaans', translated: false },
    { value: 'ar', label: 'Arabic', translated: false },
    { value: 'bn', label: 'Bengali', translated: false },
    { value: 'zh', label: 'Chinese', translated: false },
    { value: 'cs', label: 'Czech', translated: false },
    { value: 'da', label: 'Danish', translated: false },
    { value: 'nl', label: 'Dutch', translated: false },
    { value: 'en', label: 'English', translated: true },
    { value: 'et', label: 'Estonian', translated: false },
    { value: 'fi', label: 'Finnish', translated: false },
    { value: 'fr', label: 'French', translated: false },
    { value: 'de', label: 'German', translated: false },
    { value: 'el', label: 'Greek', translated: false },
    { value: 'gu', label: 'Gujarati', translated: false },
    { value: 'he', label: 'Hebrew', translated: false },
    { value: 'hi', label: 'Hindi', translated: false },
    { value: 'hu', label: 'Hungarian', translated: false },
    { value: 'id', label: 'Indonesian', translated: false },
    { value: 'it', label: 'Italian', translated: false },
    { value: 'ja', label: 'Japanese', translated: false },
    { value: 'kn', label: 'Kannada', translated: false },
    { value: 'ko', label: 'Korean', translated: false },
    { value: 'lv', label: 'Latvian', translated: false },
    { value: 'lt', label: 'Lithuanian', translated: false },
    { value: 'ml', label: 'Malayalam', translated: false },
    { value: 'mr', label: 'Marathi', translated: false },
    { value: 'ms', label: 'Malay', translated: false },
    { value: 'no', label: 'Norwegian', translated: false },
    { value: 'fa', label: 'Persian', translated: false },
    { value: 'pl', label: 'Polish', translated: false },
    { value: 'pt', label: 'Portuguese', translated: false },
    { value: 'pa', label: 'Punjabi', translated: false },
    { value: 'ro', label: 'Romanian', translated: false },
    { value: 'ru', label: 'Russian', translated: false },
    { value: 'si', label: 'Sinhala', translated: false },
    { value: 'sk', label: 'Slovak', translated: false },
    { value: 'sl', label: 'Slovenian', translated: false },
    { value: 'es', label: 'Spanish', translated: false },
    { value: 'sv', label: 'Swedish', translated: false },
    { value: 'ta', label: 'Tamil', translated: false },
    { value: 'te', label: 'Telugu', translated: false },
    { value: 'th', label: 'Thai', translated: false },
    { value: 'tr', label: 'Turkish', translated: false },
    { value: 'uk', label: 'Ukrainian', translated: false },
    { value: 'ur', label: 'Urdu', translated: false },
    { value: 'vi', label: 'Vietnamese', translated: false },
  ];
  selectedLanguage: any = null;
  pageTranslationForm: FormGroup = this.fb.group({
    pageName: ['', [Validators.required]],
    pageId: [''],
    columnsArray: this.fb.array([
      this.fb.group({
        headerName: ['Translate Key'],
        languageCode: '',
        rowsArray: this.fb.array([
          this.fb.control('Header_Title', {
            validators: [Validators.required],
          }),
          this.fb.control('HRA_Para', {
            validators: [Validators.required],
          }),
          this.fb.control('Start_Hra', {
            validators: [Validators.required],
          }),
          this.fb.control('Start_Hra_Para', {
            validators: [Validators.required],
          }),
          this.fb.control('Disclaimer', {
            validators: [Validators.required],
          }),
          this.fb.control('Disclaimer_Para', {
            validators: [Validators.required],
          }),
        ]),
      }),
      this.fb.group({
        headerName: ['English'],
        languageCode: 'en',
        rowsArray: this.fb.array([
          this.fb.control('HOW HEALTHY ARE YOU REALLY?', {
            validators: [Validators.required],
          }),
          this.fb.control(
            'A health risk assessment (HRA) is a health questionnaire, used to provide individuals with an evaluation of their health risks and quality of life. Based on your responses to the questions in the HRA, we will provide you with a risk calculation or Health Score.',
            {
              validators: [Validators.required],
            }
          ),
          this.fb.control('Click here to start HRA', {
            validators: [Validators.required],
          }),
          this.fb.control(
            'This is a health risk assessment for you. Your Data is secure with us, please fill in the data to get an analysis on your Health and Health Score.',
            {
              validators: [Validators.required],
            }
          ),
          this.fb.control('DISCLAIMER', {
            validators: [Validators.required],
          }),
          this.fb.control(
            'The information in the survey questionnaire and the result is not intended or implied to be a substitute for professional medical advice, diagnosis of treatment. All content, including text, graphics, images and information, contained on or available through this questionnaire is for general information purposes only.',
            {
              validators: [Validators.required],
            }
          ),
        ]),
      }),
    ]),
  });
  get columnsArray(): FormArray {
    return this.pageTranslationForm.get('columnsArray') as FormArray;
  }

  ngOnInit(): void {
    // this.awsService
    //   .addDataToTable({
    //     name: 'configlang',
    //   })
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //     },
    //   });
    this.getPageDetails();
  }
  getPageDetails() {}
  getRowsArray(index: number): FormArray {
    return this.columnsArray?.at(index)?.get('rowsArray') as FormArray;
  }
  isLastTranslateKeyAndLastEnglishTranslationValid(): boolean {
    const lastTranslateKey = this.getRowsArray(0).at(
      this.getRowsArray(0).length - 1
    ) as FormControl;
    const lastEnglishTranslation = this.getRowsArray(1).at(
      this.getRowsArray(1).length - 1
    ) as FormControl;

    return (
      lastTranslateKey?.value !== '' && lastEnglishTranslation?.value !== ''
    );
  }
  isRowWiseTranslable(
    translateKeyControl: AbstractControl,
    translateKeyIndex: number,
    columnIndex: number
  ): boolean {
    return (
      translateKeyControl?.value &&
      this.getRowsArray(columnIndex + 1).controls[translateKeyIndex].value &&
      Array.from(this.getRowsArray(columnIndex + 2)?.controls || []).length > 0
    );
  }
  addTranslateKeyRow() {
    Array.from(this.columnsArray.controls).forEach((column, index) => {
      this.getRowsArray(index).push(this.fb.control(''));
    });
  }
  addLanguageColumn() {
    console.log(this.selectedLanguage);
    const englistColumns = this.getRowsArray(1);
    console.log(englistColumns);
    if (this.selectedLanguage) {
      const newRowsArray = this.fb.array([]);
      Array.from(this.getRowsArray(1)?.controls).forEach(() => {
        newRowsArray.push(
          this.fb.control('', {
            validators: [Validators.required],
          })
        );
      });
      this.columnsArray.push(
        this.fb.group({
          headerName: [this.selectedLanguage?.label],
          languageCode: [this.selectedLanguage?.value],
          rowsArray: newRowsArray,
        })
      );
      this.allAvailableTranslationLanguages =
        this.allAvailableTranslationLanguages.map((language) => {
          if (language.value === this.selectedLanguage.value) {
            language.translated = true;
          }
          return language;
        });
      this.selectedLanguage = null;
    }
  }
  translateText(
    targetLangCode: string,
    engText: string,
    control: AbstractControl
  ) {
    this.awsService
      .translateText({
        TargetLanguageCode: targetLangCode,
        Text: engText,
      })
      .subscribe({
        next: (res) => {
          if (res?.success) {
            control?.setValue(res?.data?.TranslatedText);
          } else this.globalService.triggerToastMessage('error', res?.message);
        },
        error: (err) => {
          this.globalService.triggerToastMessage('error', err?.message);
        },
      });
  }
  translateRowWiseText(rowIndex: number, all: boolean = false) {
    this.columnsArray.controls.forEach(
      (control: AbstractControl, columnIndex: number) => {
        if (columnIndex > 1) {
          const reqLanguageCode: string = control?.value?.languageCode;
          const reqEnglishText: string =
            this.getRowsArray(1).controls[rowIndex].value;
          const reqFormControl: AbstractControl =
            this.getRowsArray(columnIndex)?.controls[rowIndex];

          if (all || !reqFormControl.value) {
            this.translateText(reqLanguageCode, reqEnglishText, reqFormControl);
          }
        }
      }
    );
  }
  translateColWiseText(colIndex: number, all: boolean = false) {
    const reqLanguageCode: string = (
      this.columnsArray.at(colIndex) as AbstractControl
    )?.value?.languageCode;
    const reqFormArray: FormArray = this.getRowsArray(colIndex);

    reqFormArray?.controls.forEach(
      (reqFormControl: AbstractControl, rowIndex: number) => {
        const reqEnglishText: string =
          this.getRowsArray(1).controls[rowIndex].value;

        if (all || !reqFormControl.value) {
          this.translateText(reqLanguageCode, reqEnglishText, reqFormControl);
        }
      }
    );
  }
  deleteWholeRow(rowIndex: number) {
    this.columnsArray.controls.forEach((_, columnIndex: number) => {
      this.getRowsArray(columnIndex).removeAt(rowIndex);
    });
  }
  submitPageTranslation() {
    const pageTranslationFormValue = this.pageTranslationForm?.value;
    const columnsArrayValue = pageTranslationFormValue?.columnsArray;
    const tranlateKeyRowsArrayValue: any[] =
      columnsArrayValue?.shift()?.rowsArray;
    const languagesArray = columnsArrayValue;
    const saveObject: any = {
      pageName: pageTranslationFormValue?.pageName,
      pageId: pageTranslationFormValue?.pageId,
    };

    for (const eLangObj of languagesArray) {
      const rowsArrayValue = eLangObj?.rowsArray;
      saveObject[eLangObj.languageCode] = {};

      tranlateKeyRowsArrayValue?.forEach((eTransKey: string, index: number) => {
        saveObject[eLangObj.languageCode][eTransKey] = rowsArrayValue[index];
      });

      saveObject[eLangObj.languageCode] = JSON.stringify({
        ...saveObject[eLangObj.languageCode],
      });
    }

    console.log(saveObject);
  }
}
