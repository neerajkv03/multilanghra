import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit, AfterViewInit {
  constructor() {}
  @ViewChild('ahsm') ahsm: any;
  hraScoreChart: any;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.ahsm?.nativeElement) this.loadECharts(this.ahsm?.nativeElement);
  }
  loadECharts(elementRef: any) {
    if (elementRef) {
      this.hraScoreChart = echarts.init(elementRef);
      this.hraScoreChart.setOption({
        animationDuration: 6000,
        series: [
          {
            type: 'gauge',
            startAngle: 225,
            endAngle: -45,
            center: ['50%', '51%'],
            radius: '70%',
            min: 0,
            max: 900,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.2, '#D91313'],
                  [0.6, '#F76816'],
                  [0.9, '#86B517'],
                  [1, '#2CA61E'],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: '#000',
              fontSize: 9,
              distance: -27,
              rotate: 'tangential',
              fontWeight: 'bold',
            },
            pointer: {
              length: '90%',
              width: 5,
              offsetCenter: [0, 0],
              itemStyle: {
                color: '#000',
              },
            },
            anchor: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 450,
              },
            ],
          },
        ],
      });
    }
  }
}
