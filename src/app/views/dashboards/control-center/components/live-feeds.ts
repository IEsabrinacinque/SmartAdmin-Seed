import { Component } from '@angular/core';
import { PanelCard } from '@app/components/panel-card';
import { Apexchart } from '@app/components/apexchart';
import {
  getLiveFeedsChartOptions,
  statisticsData,
} from '@/app/views/dashboards/control-center/components/data';
import { StatisticWidgetWithChart } from '@/app/views/dashboards/control-center/components/statistic-widget-with-chart';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-live-feeds',
  imports: [
    PanelCard,
    Apexchart,
    NgbProgressbarModule,
    StatisticWidgetWithChart,
  ],
  template: `
    <app-panel-card [panelLocked]="true" containerClass="panel-content-free">
      <h2 card-title>
        Live <span class="fw-light"><i>Feeds</i></span>
      </h2>
      <ng-content card-content>
        <div
          class="panel-content border-faded border-end-0 border-start-0 border-top-0 pt-0"
        >
          <div class="row g-3">
            <div class="col-12 col-lg-7 col-xl-8">
              <app-apexchart [getOptions]="getLiveFeedsChartOptions" />
            </div>
            <div class="col-12 col-lg-5 col-xl-4">
              <!-- ✅ Wrapper con overflow control -->
              <div class="progress-container">
                @for (task of tasks; track $index) {
                  <div class="d-flex mt-2 flex-wrap">
                    <span class="task-label">{{ task.label }}</span>
                    <span class="task-value ms-auto">{{ task.value }}</span>
                  </div>
                  <div class="progress-wrapper">
                    <ngb-progressbar
                      [value]="task.progress"
                      height="0.5rem"
                      [striped]="false"
                      [animated]="false"
                      [type]="task.color"
                      class="progress-sm mb-4 bg-opacity-75"
                    />
                  </div>
                }
              </div>

              <div class="row g-2">
                <div class="col-12 col-sm-6">
                  <button type="button" class="btn btn-default w-100">
                    Generate PDF
                  </button>
                </div>
                <div class="col-12 col-sm-6">
                  <button type="button" class="btn btn-default w-100">
                    Report a Bug
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel-content p-0">
          <div class="row row-grid g-0">
            @for (item of statisticsData; track $index) {
              <div class="col-12 col-md-6 col-xxl-3">
                <app-statistic-widget-with-chart [item]="item" />
              </div>
            }
          </div>
        </div>
      </ng-content>
    </app-panel-card>
  `,
  styles: `
    .progress-container {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }

    .progress-wrapper {
      width: 100%;
      max-width: 100%;
      overflow: hidden;
    }

    .progress-wrapper ::ng-deep ngb-progressbar,
    .progress-wrapper ::ng-deep .progress {
      width: 100% !important;
      max-width: 100% !important;
    }

    .task-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
      min-width: 0;
    }
    .chart-wrapper {
      width: 100%;
      overflow: visible;
    }
    .task-value {
      white-space: nowrap;
      flex-shrink: 0;
    }
  
    .panel-content-free {
      overflow: visible !important;
    }

    /* ApexCharts non deve essere tagliato */
    .panel-content-free .apexcharts-canvas,
    .panel-content-free svg {
      overflow: visible !important;
    }

    /* Evita tagli laterali */
    .panel-content-free {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }

    /* MOBILE: più respiro */
    @media (max-width: 767px) {
      .panel-content-free {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }
    }
  `,
})
export class LiveFeeds {
  protected readonly getLiveFeedsChartOptions = getLiveFeedsChartOptions;
  protected readonly statisticsData = statisticsData;

  tasks = [
    { label: 'My Tasks', value: '130 / 500', progress: 65, color: 'dark' },
    { label: 'Transferred', value: '440 TB', progress: 34, color: 'success' },
    { label: 'Resolved Issues', value: '77%', progress: 77, color: 'info' },
    {
      label: 'Testing Progress',
      value: '7 days',
      progress: 84,
      color: 'primary',
    },
  ];
}
